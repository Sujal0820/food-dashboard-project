import requests
from bs4 import BeautifulSoup

def scrape_restaurantguru_data():
    url = "https://restaurant-guru.in/Kolhapur"
    headers = {"User-Agent": "Mozilla/5.0"}
    resp = requests.get(url, headers=headers)
    soup = BeautifulSoup(resp.content, "html.parser")

    restaurants = []
    cards = soup.select("div.restaurant_row")

    for card in cards:
        try:
            # Extract name
            name_tag = card.select_one("h3.item__title")
            name = name_tag.text.strip() if name_tag else "N/A"

            # Extract cuisine
            category_tag = card.select_one("span.grey span")
            cuisine = category_tag.text.strip() if category_tag else "N/A"

            # Extract rating 
            rating_fill = card.select_one("div.rating-stars__fill")
            rating = "N/A"

            if rating_fill and "style" in rating_fill.attrs:
                style = rating_fill["style"]
                if "width" in style:
                    width_value = style.split("width:")[1].split("%")[0].strip()
                    rating = round(float(width_value) * 0.05, 1)  

            restaurants.append({
                "name": name,
                "rating": str(rating),
                "cuisine": cuisine
            })

        except Exception as e:
            print(f"[ERROR] Failed to parse a card: {e}")
            continue

    return restaurants
