from pathlib import Path

IGNORE = {
    ".git",
    "node_modules",
    "__pycache__",
    ".venv",
    "venv",
}

def build_tree(path: str):

    root = Path(path)

    tree = []

    for item in root.iterdir():

        if item.name in IGNORE:
            continue

        tree.append({
            "name": item.name,
            "type": "folder" if item.is_dir() else "file"
        })

    return tree