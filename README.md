# Food Dashboard Project 🍽️

This is a full-stack web application that scrapes restaurant data and displays it in a sortable, searchable, and paginated dashboard using **React + MUI** on the frontend and **FastAPI** on the backend.

---

## 🚀 Setup Instructions

### Backend (FastAPI)

1. **Install dependencies:**

   ```bash
   pip install -r requirements.txt

2. **Run the backend:**

  ```bash
  uvicorn main:app --reload
  ```

**Frontend (React + MUI)**
Navigate to the frontend folder:

```bash
cd frontend
Install dependencies:

npm install
```
Start the frontend:

```bash
npm start
```
The app will be available at http://localhost:3000

🧠 Approach
Web Scraping:
  Restaurant data is scraped using Selenium and undetected-chromedriver to avoid bot detection.
  Scraper targets RestaurantGuru or Zomato and collects fields like name, rating, price, cuisine, image URL, and delivery time.

Backend (FastAPI):
  Provides an API endpoint /restaurants that returns the scraped data as JSON. This is consumed by the frontend.

Frontend (React + MUI):
  Data is fetched using Axios and displayed in a clean MUI table with:
  Search/Filter by name
  Sorting by rating, name, price, etc.

🧱 Data Model
  Each restaurant object follows this structure:

{
  "name": "Domino's Pizza",
  "rating": 4.2,
  "cuisine": "Pizza, Italian, Desserts",
}
