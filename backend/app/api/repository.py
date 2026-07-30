from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session

from app.services.scanner import scan_repository
from app.services.detector import detect_stack
from app.services.tree import build_tree
from app.services.summarizer import summarize_repository

from app.database.database import SessionLocal
from app.database.analysis_models import RepositoryAnalysis


router = APIRouter(
    prefix="/repository",
    tags=["Repository"],
)


@router.get("/analyze")
def analyze_repository(
    path: str,
    repository_id: int,
):
    db: Session = SessionLocal()

    try:
        # Scan repository
        scan = scan_repository(path)

        # Detect technologies
        stack = detect_stack(path)

        # Build folder tree
        tree = build_tree(path)

        # Generate summary
        summary = summarize_repository(
            path=path,
            scan=scan,
            stack=stack,
        )

        # Save analysis
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

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )

    finally:
        db.close()


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