from dotenv import load_dotenv
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.chat import router as chat_router
from app.api.repository import router as repository_router
from app.api.repositories import router as repositories_router

from app.database.database import (
    Base,
    SessionLocal,
    engine,
)

from app.services.demo_initializer import initialize_demo

# --------------------------------------------------
# Load Environment Variables
# --------------------------------------------------

load_dotenv()

# --------------------------------------------------
# Create Database Tables
# --------------------------------------------------

Base.metadata.create_all(bind=engine)

# --------------------------------------------------
# FastAPI Application
# --------------------------------------------------

app = FastAPI(
    title="DevMind API",
    version="0.5.0",
)

# --------------------------------------------------
# Startup Event
# --------------------------------------------------

@app.on_event("startup")
def startup():

    db = SessionLocal()

    try:

        initialize_demo(db)

    finally:

        db.close()


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv(
            "FRONTEND_URL",
            "http://localhost:5173",
        )
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# Root
# --------------------------------------------------

@app.get("/")
def root():

    return {
        "application": "DevMind API",
        "version": "0.5.0",
        "status": "running",
    }


# --------------------------------------------------
# Health
# --------------------------------------------------

@app.get("/health")
def health():

    return {
        "status": "healthy",
    }


# --------------------------------------------------
# API Routes
# --------------------------------------------------

app.include_router(repository_router, prefix="/api")
app.include_router(repositories_router, prefix="/api")
app.include_router(chat_router, prefix="/api")