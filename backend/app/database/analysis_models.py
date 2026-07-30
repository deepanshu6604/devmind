from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func

from .database import Base


class RepositoryAnalysis(Base):
    __tablename__ = "repository_analysis"

    id = Column(Integer, primary_key=True, index=True)

    repository_id = Column(
        Integer,
        ForeignKey("repositories.id"),
    )

    project_type = Column(String)

    frontend = Column(String)

    backend = Column(String)

    stack = Column(String)

    total_files = Column(Integer)

    estimated_size = Column(String)

    created_at = Column(
        DateTime,
        server_default=func.now(),
    )