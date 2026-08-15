import os
import shutil
import traceback
import uuid
import zipfile

from fastapi import APIRouter, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.database.analysis_models import RepositoryAnalysis
from app.database.database import SessionLocal
from app.services.detector import detect_stack
from app.services.scanner import scan_repository
from app.services.summarizer import summarize_repository
from app.services.tree import build_tree

router = APIRouter(
    prefix="/repository",
    tags=["Repository"],
)


# -----------------------------
# Analyze Local Repository
# -----------------------------
@router.get("/analyze")
def analyze_repository(
    path: str,
    repository_id: int,
):
    db: Session = SessionLocal()

    try:

        scan = scan_repository(path)

        stack = detect_stack(path)

        tree = build_tree(path)

        summary = summarize_repository(
            path=path,
            scan=scan,
            stack=stack,
        )

        analysis = RepositoryAnalysis(
            repository_id=repository_id,
            project_type=summary["project_type"],
            frontend=summary["frontend"],
            backend=summary["backend"],
            stack=", ".join(stack),
            total_files=scan["files"],
            estimated_size=summary["estimated_size"],
        )

        db.add(analysis)
        db.commit()
        db.refresh(analysis)

        return {
            "success": True,
            "analysis_id": analysis.id,
            "summary": summary,
            "scan": scan,
            "stack": stack,
            "tree": tree,
        }

    except Exception as e:

        db.rollback()

        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )

    finally:

        db.close()


# -----------------------------
# Analysis History
# -----------------------------
@router.get("/{repository_id}/history")
def get_analysis_history(repository_id: int):

    db: Session = SessionLocal()

    try:

        history = (
            db.query(RepositoryAnalysis)
            .filter(
                RepositoryAnalysis.repository_id == repository_id
            )
            .order_by(
                RepositoryAnalysis.created_at.desc()
            )
            .all()
        )

        return history

    finally:

        db.close()


# -----------------------------
# Upload ZIP Repository
# -----------------------------
@router.post("/upload")
def upload_repository(
    file: UploadFile = File(...)
):

    upload_dir = None
    extract_dir = None

    try:

        # Validate ZIP

        if not file.filename.lower().endswith(".zip"):

            raise HTTPException(
                status_code=400,
                detail="Only ZIP files are allowed.",
            )

        # Create folders

        folder_name = str(uuid.uuid4())

        upload_dir = os.path.join(
            "uploads",
            folder_name,
        )

        extract_dir = os.path.join(
            "temp",
            folder_name,
        )

        os.makedirs(
            upload_dir,
            exist_ok=True,
        )

        os.makedirs(
            extract_dir,
            exist_ok=True,
        )

        zip_path = os.path.join(
            upload_dir,
            file.filename,
        )

        # Save ZIP
#
 #       with open(
  #          zip_path,
   #         "wb",
    #    ) as buffer:
#
 #           shutil.copyfileobj(
  #              file.file,
   #             buffer,
    #        )
        contents = file.file.read()

        print("Received bytes:", len(contents))

        with open(zip_path, "wb") as buffer:
            buffer.write(contents)

        print("Saved bytes:", os.path.getsize(zip_path))

        print("=" * 60)
        print("Filename:", file.filename)
        print("Content-Type:", file.content_type)
        print("File object:", file.file)
        print("=" * 60)

        # Extract ZIP

        with zipfile.ZipFile(
            zip_path,
            "r",
        ) as zip_ref:

            zip_ref.extractall(
                extract_dir
            )

        # ------------------------
        # Detect actual project
        # ------------------------

        items = os.listdir(
            extract_dir
        )

        project_path = extract_dir

        if len(items) == 1:

            first_item = os.path.join(
                extract_dir,
                items[0],
            )

            if os.path.isdir(first_item):

                project_path = first_item

        print("\n")
        print("=" * 60)
        print("PROJECT PATH")
        print(project_path)
        print("=" * 60)
        print("\n")

        # ------------------------
        # Analysis
        # ------------------------

        scan = scan_repository(
            project_path
        )

        stack = detect_stack(
            project_path
        )

        tree = build_tree(
            project_path
        )

        summary = summarize_repository(
            path=project_path,
            scan=scan,
            stack=stack,
        )

        return {
            "success": True,
            "summary": summary,
            "scan": scan,
            "stack": stack,
            "tree": tree,
        }

    except Exception as e:

        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )

    finally:

        if upload_dir:

            shutil.rmtree(
                upload_dir,
                ignore_errors=True,
            )

        if extract_dir:

            shutil.rmtree(
                extract_dir,
                ignore_errors=True,
            )