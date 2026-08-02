from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from .database import Base


class Repository(Base):
    __tablename__ = "repositories"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    description = Column(String, default="")

    language = Column(String, nullable=False)

    status = Column(String, default="Ready")

    upload_path = Column(
        String,
        default="",
    )

    is_demo = Column(
        Integer,
        default=0,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )