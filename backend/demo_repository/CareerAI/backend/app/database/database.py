from dotenv import load_dotenv

import os

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Load .env
load_dotenv()

# Database URL
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./devmind.db",
)

# Database Engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
)

# Session Factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# Base Model
Base = declarative_base()


# Dependency
def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()