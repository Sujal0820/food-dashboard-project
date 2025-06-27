import { Card, CardContent, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ZomatoCard() {
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/zomato-restaurants")
      .then((res) => setRestaurant(res.data.data))
      .catch((err) => console.error("Failed to fetch Zomato data", err));
  }, []);

  if (!restaurant || restaurant.error) {
    return <Typography color="error">Restaurant data not available.</Typography>;
  }

  return (
    <Paper sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {restaurant.name}
          </Typography>
          <Typography variant="body1"><b>Rating: </b>{restaurant.rating || "N/A"}</Typography>
          <Typography variant="body1"><b>Cuisine: </b>{restaurant.cuisine || "N/A"}</Typography>
          <Typography variant="body1"><b>Price Range: </b>{restaurant.priceRange || "N/A"}</Typography>
          <Typography variant="body1"><b>Address: </b>{restaurant.address || "N/A"}</Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}
