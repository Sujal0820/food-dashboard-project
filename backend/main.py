from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scraper import scrape_restaurantguru_data
from models import Restaurant
from typing import List

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/restaurants", response_model=List[Restaurant])
def get_restaurants():
    return scrape_restaurantguru_data()
