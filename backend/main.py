from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {
        "project": "DevMind",
        "version": "0.5",
        "status": "Prototype"
    }