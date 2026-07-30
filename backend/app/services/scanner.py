from pathlib import Path

IGNORE = {
    ".git",
    "__pycache__",
    "node_modules",
    ".venv",
    "venv",
    "dist",
    "build",
}

def scan_repository(path: str):
    root = Path(path)

    total_files = 0

    extensions = {}

    for file in root.rglob("*"):

        if any(part in IGNORE for part in file.parts):
            continue

        if file.is_file():
            total_files += 1

            ext = file.suffix.lower()

            extensions[ext] = extensions.get(ext, 0) + 1

    return {
        "files": total_files,
        "extensions": extensions,
    }