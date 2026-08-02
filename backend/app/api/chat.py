from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/chat", tags=["Chat"])


class ChatRequest(BaseModel):
    message: str


@router.post("/")
def chat(request: ChatRequest):
    message = request.message.lower()

    if any(word in message for word in ["hello", "hi", "hey"]):
        reply = (
            "Hello! 👋\n\n"
            "I'm DevMind AI.\n\n"
            "The AI engine is currently running in Demo Mode.\n\n"
            "Coming in v0.7:\n"
            "• Repository understanding\n"
            "• Code explanation\n"
            "• Documentation generation\n"
            "• AI-powered repository chat"
        )

    elif "repository" in message:
        reply = (
            "Repository Analysis is available.\n\n"
            "Upload a repository ZIP and DevMind will analyze:\n"
            "• Folder structure\n"
            "• Tech stack\n"
            "• Project summary"
        )

    elif "help" in message:
        reply = (
            "Available commands:\n\n"
            "• hello\n"
            "• repository\n"
            "• help\n\n"
            "Full AI capabilities arrive in DevMind v0.7."
        )

    else:
        reply = (
            "I'm currently running in Demo Mode.\n\n"
            "Natural language repository intelligence will be available in DevMind v0.7.\n\n"
            "Thanks for trying DevMind! 🚀"
        )

    return {
        "success": True,
        "response": reply
    }