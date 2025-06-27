import requests
import json
from bs4 import BeautifulSoup

def scrape_zomato_data():
    url = "https://www.zomato.com/pune/mothers-kitchen-pimple-nilakh/order"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return {"error": "Failed to fetch page"}

    soup = BeautifulSoup(response.text, "html.parser")

    script_tags = soup.find_all("script", type="application/ld+json")

    for script in script_tags:
        try:
            data = json.loads(script.string)
            if data.get("@type") == "Restaurant":
                result = {
                    "name": data.get("name"),
                    "rating": data.get("aggregateRating", {}).get("ratingValue"),
                    "cuisine": data.get("servesCuisine"),
                    "priceRange": data.get("priceRange"),
                    "address": data.get("address", {}).get("streetAddress"),
                }
                return result
        except Exception:
            continue

    return {"error": "Restaurant JSON-LD data not found"}

if __name__ == "__main__":
    print(scrape_zomato_data())
