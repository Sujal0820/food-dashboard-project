from pydantic import BaseModel

class Restaurant(BaseModel):
    name: str
    rating: str
    cuisine: str
