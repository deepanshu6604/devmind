from pathlib import Path

def detect_stack(path: str):
    root = Path(path)

    stack = []

    # Detect React
    if (root / "frontend" / "package.json").exists():
        stack.append("React")

    # Detect FastAPI
    if (root / "backend" / "app" / "main.py").exists():
        stack.append("FastAPI")

    return stack