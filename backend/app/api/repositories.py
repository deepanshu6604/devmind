from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.database.models import Repository

router = APIRouter(prefix="/repositories", tags=["Repositories"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_repositories():
    db: Session = SessionLocal()

    repositories = db.query(Repository).all()

    db.close()

    return repositories

@router.get("/{repository_id}")
def get_repository(repository_id: int):
    db: Session = SessionLocal()

    repository = (
        db.query(Repository)
        .filter(Repository.id == repository_id)
        .first()
    )

    db.close()

    if repository is None:
        return {"success": False}

    return repository


@router.post("/")
def create_repository(data: dict):
    db: Session = SessionLocal()

    repository = Repository(
        name=data["name"],
        path=data["path"],
        language=data.get("language", "Unknown"),
        status="Ready",
    )

    db.add(repository)
    db.commit()
    db.refresh(repository)

    db.close()

    return repository


@router.delete("/{repository_id}")
def delete_repository(repository_id: int):
    db: Session = SessionLocal()

    repository = db.query(Repository).filter(
        Repository.id == repository_id
    ).first()

    if repository:
        db.delete(repository)
        db.commit()

    db.close()

    return {"success": True}