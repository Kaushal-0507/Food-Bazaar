const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5001; // Changed port to 5001

// Enable CORS for your frontend - allow any localhost port
app.use(cors({
  origin: /^http:\/\/localhost:\d+$/
}));

// Common headers for Swiggy API
const swiggyHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Referer': 'https://www.swiggy.com/',
  'Origin': 'https://www.swiggy.com'
};

// Default coordinates (Mumbai)
const DEFAULT_LAT = '19.4103104';
const DEFAULT_LNG = '72.8365911';

// Proxy endpoint for restaurant list
app.get('/api/restaurants', async (req, res) => {
  try {
    const lat = req.query.lat || DEFAULT_LAT;
    const lng = req.query.lng || DEFAULT_LNG;
    
    console.log('Fetching restaurants with coordinates:', lat, lng);
    
    const response = await axios.get(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
      { headers: swiggyHeaders }
    );
    
    console.log('Restaurant data received:', response.data ? 'Success' : 'No data');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching restaurants:', error.message);
    res.status(500).json({ error: 'Failed to fetch restaurants', details: error.message });
  }
});

// Proxy endpoint for menu
app.get('/api/menu', async (req, res) => {
  try {
    const { restaurantId } = req.query;
    console.log('Fetching menu for restaurant:', restaurantId);
    
    const response = await axios.get(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${DEFAULT_LAT}&lng=${DEFAULT_LNG}&restaurantId=${restaurantId}`,
      { headers: swiggyHeaders }
    );
    
    console.log('Menu data received:', response.data ? 'Success' : 'No data');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching menu:', error.message);
    res.status(500).json({ error: 'Failed to fetch menu', details: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 