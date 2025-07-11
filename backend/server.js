const express = require('express');
const cors = require('cors');
const axios = require('axios');
const compression = require('compression');

const app = express();
const PORT = 5001; // Changed port to 5001

// Enable compression for all responses
app.use(compression());

// Enable CORS for your frontend - allow both localhost and deployed domain
app.use(cors({
  origin: [
    /^http:\/\/localhost:\d+$/,
    'https://foodbazaar.vercel.app',
    'https://foodbazaar-git-main-kaushal0507.vercel.app',
    /^https:\/\/foodbazaar.*\.vercel\.app$/
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'Cache-Control']
}));

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
};

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
    
    // Check cache first
    const cacheKey = `restaurants_${lat}_${lng}`;
    const cachedData = getCachedData(cacheKey);
    
    if (cachedData) {
      console.log('Serving restaurants from cache');
      res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
      return res.json(cachedData);
    }
    
    console.log('Fetching restaurants with coordinates:', lat, lng);
    
    const response = await axios.get(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
      { 
        headers: swiggyHeaders,
        timeout: 10000 // 10 second timeout
      }
    );
    
    console.log('Restaurant data received:', response.data ? 'Success' : 'No data');
    
    // Cache the response
    setCachedData(cacheKey, response.data);
    
    // Set cache headers
    res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching restaurants:', error.message);
    res.status(500).json({ error: 'Failed to fetch restaurants', details: error.message });
  }
});

// Proxy endpoint for collection-based restaurant list
app.get('/api/restaurants/collection', async (req, res) => {
  try {
    const { collection } = req.query;
    
    if (!collection) {
      return res.status(400).json({ error: 'Collection ID is required' });
    }
    
    // Check cache first
    const cacheKey = `collection_${collection}`;
    const cachedData = getCachedData(cacheKey);
    
    if (cachedData) {
      console.log('Serving collection restaurants from cache');
      res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
      return res.json(cachedData);
    }
    
    console.log('Fetching restaurants for collection:', collection);
    
    const response = await axios.get(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${DEFAULT_LAT}&lng=${DEFAULT_LNG}&collection=${collection}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`,
      { 
        headers: swiggyHeaders,
        timeout: 10000 // 10 second timeout
      }
    );
    
    console.log('Collection restaurant data received:', response.data ? 'Success' : 'No data');
    
    // Cache the response
    setCachedData(cacheKey, response.data);
    
    // Set cache headers
    res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching collection restaurants:', error.message);
    res.status(500).json({ error: 'Failed to fetch collection restaurants', details: error.message });
  }
});

// Proxy endpoint for menu
app.get('/api/menu', async (req, res) => {
  try {
    const { restaurantId } = req.query;
    
    // Check cache first
    const cacheKey = `menu_${restaurantId}`;
    const cachedData = getCachedData(cacheKey);
    
    if (cachedData) {
      console.log('Serving menu from cache for restaurant:', restaurantId);
      res.set('Cache-Control', 'public, max-age=600'); // 10 minutes for menu
      return res.json(cachedData);
    }
    
    console.log('Fetching menu for restaurant:', restaurantId);
    
    const response = await axios.get(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${DEFAULT_LAT}&lng=${DEFAULT_LNG}&restaurantId=${restaurantId}`,
      { 
        headers: swiggyHeaders,
        timeout: 10000 // 10 second timeout
      }
    );
    
    console.log('Menu data received:', response.data ? 'Success' : 'No data');
    
    // Cache the response
    setCachedData(cacheKey, response.data);
    
    // Set cache headers
    res.set('Cache-Control', 'public, max-age=600'); // 10 minutes for menu
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching menu:', error.message);
    res.status(500).json({ error: 'Failed to fetch menu', details: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 