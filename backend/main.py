from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scraper import scrape_restaurantguru_data
from models import Restaurant
from typing import List
from scraper_zomato import scrape_zomato_data  # Add this import



app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/restaurants", response_model=List[Restaurant])
def get_restaurants():
    return scrape_restaurantguru_data()

@app.get("/api/zomato-restaurants")
def get_zomato_restaurants():
    try:
        data = scrape_zomato_data()
        return {"status": "success", "data": data}
    except Exception as e:
        return {"status": "error", "message": str(e)}
