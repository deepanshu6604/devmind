from pydantic import BaseModel


class RepositoryCreate(BaseModel):
    name: str
    path: str
    language: str
    status: str


class RepositoryResponse(RepositoryCreate):
    id: int

    class Config:
        from_attributes = True