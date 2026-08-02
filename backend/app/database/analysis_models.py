from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime,
    Text,
)

from sqlalchemy.sql import func

from .database import Base


class RepositoryAnalysis(Base):
    __tablename__ = "repository_analysis"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    repository_id = Column(
        Integer,
        ForeignKey("repositories.id"),
        nullable=False,
    )

    # Summary Information
    project_type = Column(String)

    frontend = Column(String)

    backend = Column(String)

    stack = Column(String)

    total_files = Column(Integer)

    estimated_size = Column(String)

    # Full Analysis JSON
    summary_json = Column(
        Text,
        default="{}",
    )

    scan_json = Column(
        Text,
        default="{}",
    )

    stack_json = Column(
        Text,
        default="[]",
    )

    tree_json = Column(
        Text,
        default="{}",
    )

    created_at = Column(
        DateTime,
        server_default=func.now(),
    )