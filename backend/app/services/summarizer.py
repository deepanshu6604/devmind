from pathlib import Path


def summarize_repository(path: str, scan, stack):
    root = Path(path)

    summary = {
        "project_name": root.name,
        "project_type": "Unknown",
        "frontend": None,
        "backend": None,
        "entry_points": {},
        "estimated_size": "Small",
    }

    # -------- Frontend --------
    if "React" in stack:
        summary["frontend"] = "React"

        if (root / "frontend" / "src" / "main.tsx").exists():
            summary["entry_points"]["frontend"] = "frontend/src/main.tsx"

    # -------- Backend --------
    if "FastAPI" in stack:
        summary["backend"] = "FastAPI"

        if (root / "backend" / "app" / "main.py").exists():
            summary["entry_points"]["backend"] = "backend/app/main.py"

    # -------- Project Type --------
    if summary["frontend"] and summary["backend"]:
        summary["project_type"] = "Full Stack Web Application"

    elif summary["frontend"]:
        summary["project_type"] = "Frontend Application"

    elif summary["backend"]:
        summary["project_type"] = "Backend Application"

    # -------- Project Size --------
    files = scan["files"]

    if files < 50:
        summary["estimated_size"] = "Small"

    elif files < 300:
        summary["estimated_size"] = "Medium"

    else:
        summary["estimated_size"] = "Large"

    return summary