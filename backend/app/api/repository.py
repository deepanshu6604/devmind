import os
import shutil
import traceback
import zipfile
import json
from fastapi import (
    APIRouter,
    File,
    Form,
    HTTPException,
    UploadFile,
)

from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.database.models import Repository
from app.database.analysis_models import RepositoryAnalysis

from app.services.scanner import scan_repository
from app.services.detector import detect_stack
from app.services.tree import build_tree
from app.services.summarizer import summarize_repository


router = APIRouter(
    prefix="/repository",
    tags=["Repository"],
)


# ==========================================================
# Analyze Existing Repository
# ==========================================================

@router.get("/analyze")
def analyze_repository(
    path: str,
    repository_id: int,
):

    db: Session = SessionLocal()

    try:

        repository = (
            db.query(Repository)
            .filter(
                Repository.id == repository_id
            )
            .first()
        )

        if repository is None:

            raise HTTPException(
                status_code=404,
                detail="Repository not found."
            )

        scan = scan_repository(path)

        stack = detect_stack(path)

        tree = build_tree(path)

        summary = summarize_repository(
            path=path,
            scan=scan,
            stack=stack,
        )

        repository.status = "Analyzed"

        repository.language = ", ".join(stack)

        repository.upload_path = path

        analysis = RepositoryAnalysis(

            repository_id=repository.id,

            project_type=summary["project_type"],

            frontend=summary["frontend"],

            backend=summary["backend"],

            stack=", ".join(stack),

            total_files=scan["files"],

            estimated_size=summary["estimated_size"],

            summary_json=json.dumps(summary),

            scan_json=json.dumps(scan),

            stack_json=json.dumps(stack),

            tree_json=json.dumps(tree),

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


# ==========================================================
# Repository Analysis History
# ==========================================================

@router.get("/{repository_id}/history")
def get_analysis_history(
    repository_id: int,
):

    db: Session = SessionLocal()

    try:

        history = (

            db.query(
                RepositoryAnalysis
            )

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




# ==========================================================
# Latest Repository Analysis
# ==========================================================

@router.get("/{repository_id}/latest-analysis")
def get_latest_analysis(repository_id: int):

    db: Session = SessionLocal()

    try:

        analysis = (
            db.query(RepositoryAnalysis)
            .filter(
                RepositoryAnalysis.repository_id == repository_id
            )
            .order_by(
                RepositoryAnalysis.created_at.desc()
            )
            .first()
        )

        if analysis is None:

            raise HTTPException(
                status_code=404,
                detail="No analysis found.",
            )

        import json

        return {

            "success": True,

            "analysis_id": analysis.id,

            "summary": json.loads(
                analysis.summary_json
            ),

            "scan": json.loads(
                analysis.scan_json
            ),

            "stack": json.loads(
                analysis.stack_json
            ),

            "tree": json.loads(
                analysis.tree_json
            ),

            "created_at": analysis.created_at,

        }

    finally:

        db.close()



# ==========================================================
# Upload Repository ZIP
# ==========================================================

@router.post("/upload")
def upload_repository(
    repository_id: int = Form(...),
    file: UploadFile = File(...),
):

    db: Session = SessionLocal()

    repository_folder = None

    try:

        repository = (
            db.query(Repository)
            .filter(
                Repository.id == repository_id
            )
            .first()
        )

        if repository is None:

            raise HTTPException(
                status_code=404,
                detail="Repository not found.",
            )

        if not file.filename.lower().endswith(".zip"):

            raise HTTPException(
                status_code=400,
                detail="Only ZIP files are allowed.",
            )

        # -----------------------------------------
        # Permanent Repository Folder
        # -----------------------------------------

        repository_folder = os.path.join(
            "uploads",
            f"repository_{repository.id}",
        )

        if os.path.exists(repository_folder):

            shutil.rmtree(repository_folder)

        os.makedirs(
            repository_folder,
            exist_ok=True,
        )

        # -----------------------------------------
        # Save Uploaded ZIP
        # -----------------------------------------

        zip_path = os.path.join(
            repository_folder,
            file.filename,
        )

        with open(
            zip_path,
            "wb",
        ) as buffer:

            shutil.copyfileobj(
                file.file,
                buffer,
            )

        # -----------------------------------------
        # Extract ZIP
        # -----------------------------------------

        source_folder = os.path.join(
            repository_folder,
            "source",
        )

        os.makedirs(
            source_folder,
            exist_ok=True,
        )

        with zipfile.ZipFile(
            zip_path,
            "r",
        ) as zip_ref:

            zip_ref.extractall(
                source_folder,
            )

        os.remove(zip_path)

        # -----------------------------------------
        # Detect Actual Project Folder
        # -----------------------------------------

        project_path = source_folder

        items = os.listdir(
            source_folder,
        )

        if len(items) == 1:

            first_item = os.path.join(
                source_folder,
                items[0],
            )

            if os.path.isdir(first_item):

                project_path = first_item

        print("=" * 60)
        print("PROJECT PATH")
        print(project_path)
        print("=" * 60)

        # -----------------------------------------
        # Scan Repository
        # -----------------------------------------

        scan = scan_repository(
            project_path,
        )

        stack = detect_stack(
            project_path,
        )

        tree = build_tree(
            project_path,
        )

        summary = summarize_repository(
            path=project_path,
            scan=scan,
            stack=stack,
        )


                # -----------------------------------------
        # Update Repository
        # -----------------------------------------

        repository.status = "Analyzed"

        repository.language = ", ".join(stack)

        repository.upload_path = project_path

        # -----------------------------------------
        # Save Analysis
        # -----------------------------------------

        analysis = RepositoryAnalysis(

            repository_id=repository.id,

            project_type=summary["project_type"],

            frontend=summary["frontend"],

            backend=summary["backend"],

            stack=", ".join(stack),

            total_files=scan["files"],

            estimated_size=summary["estimated_size"],

            summary_json=json.dumps(summary),

            scan_json=json.dumps(scan),

            stack_json=json.dumps(stack),

            tree_json=json.dumps(tree),

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