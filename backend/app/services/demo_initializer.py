from sqlalchemy.orm import Session

from app.database.models import Repository
from app.database.analysis_models import RepositoryAnalysis

from app.services.scanner import scan_repository
from app.services.detector import detect_stack
from app.services.tree import build_tree
from app.services.summarizer import summarize_repository

import json
DEMO_PATH = "demo_repository/CareerAI"


def initialize_demo(db: Session):

    existing = (
        db.query(Repository)
        .filter(
            Repository.is_demo == 1
        )
        .first()
    )

    if existing:
        return

    print("Initializing Demo Repository...")

    scan = scan_repository(DEMO_PATH)

    stack = detect_stack(DEMO_PATH)

    tree = build_tree(DEMO_PATH)

    summary = summarize_repository(
        path=DEMO_PATH,
        scan=scan,
        stack=stack,
    )

    repository = Repository(
        name="CareerAI Demo",
        description="Explore DevMind using a fully analyzed demo project.",
        language=", ".join(stack),
        status="Analyzed",
        upload_path=DEMO_PATH,
        is_demo=1,
    )

    db.add(repository)
    db.commit()
    db.refresh(repository)

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

    print("Demo Repository Ready.")