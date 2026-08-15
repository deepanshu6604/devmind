from fastapi import APIRouter

from app.services.scanner import scan_repository
from app.services.detector import detect_stack
from app.services.tree import build_tree

router = APIRouter()

@router.get("/analyze")
def analyze(path: str):

    return {
        "scan": scan_repository(path),
        "stack": detect_stack(path),
        "tree": build_tree(path),
    }