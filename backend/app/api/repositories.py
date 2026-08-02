from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.database.models import Repository

router = APIRouter(
    prefix="/repositories",
    tags=["Repositories"],
)


class RepositoryCreate(BaseModel):
    name: str
    description: str = ""
    language: str


@router.get("")
def get_repositories():
    db: Session = SessionLocal()

    try:
        repositories = db.query(Repository).all()
        return repositories

    finally:
        db.close()


@router.get("/{repository_id}")
def get_repository(repository_id: int):
    db: Session = SessionLocal()

    try:
        repository = (
            db.query(Repository)
            .filter(Repository.id == repository_id)
            .first()
        )

        if repository is None:
            return {"success": False}

        return repository

    finally:
        db.close()


@router.post("")
def create_repository(data: RepositoryCreate):
    db: Session = SessionLocal()

    try:
        repository = Repository(
            name=data.name,
            description=data.description,
            language=data.language,
            status="Ready",
        )

        db.add(repository)
        db.commit()
        db.refresh(repository)

        return repository

    finally:
        db.close()


@router.delete("/{repository_id}")
def delete_repository(repository_id: int):
    db: Session = SessionLocal()

    try:
        repository = (
            db.query(Repository)
            .filter(Repository.id == repository_id)
            .first()
        )

        if repository:
            db.delete(repository)
            db.commit()

        return {"success": True}

    finally:
        db.close()