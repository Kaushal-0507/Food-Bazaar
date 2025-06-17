export const LOGO_URL =
  "https://s3.amazonaws.com/cdn.designcrowd.com/blog/39-Food-Delivery-Logos-That-Will-Leave-You-Hungry-For-More/food-delivery-by-simplepixelsl-brandcrowd.png";

export const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const RATING_ICON =
  "https://cdn2.iconfinder.com/data/icons/default-1/100/.svg-4-512.png";

export const FOOD_SLIDE_IMG =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";

export const MENU_CARD_IMG =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/";

// Default coordinates (Mumbai)
const DEFAULT_LAT = '19.4103104';
const DEFAULT_LNG = '72.8365911';

// Backend API base URL
const API_BASE_URL = import.meta.env.VITE_SWIGGY_API_URL || 'http://localhost:5001';

// Log the API URL for debugging
console.log('API Base URL:', API_BASE_URL);

// API endpoints
export const MENU_RES_URL = `${API_BASE_URL}/api/menu?restaurantId=`;
export const RESTAURANT_API = `${API_BASE_URL}/api/restaurants?lat=${DEFAULT_LAT}&lng=${DEFAULT_LNG}`;

// Log the full restaurant API URL for debugging
console.log('Restaurant API URL:', RESTAURANT_API);
