import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';

// Register service worker for offline caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Performance optimization: Preload critical resources
const preloadCriticalResources = () => {
  // Preload the main API endpoint
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://foodbazaar-backend.onrender.com';
  document.head.appendChild(link);
  
  // Preload critical images
  const imageLink = document.createElement('link');
  imageLink.rel = 'preload';
  imageLink.as = 'image';
  imageLink.href = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/seo/Food_collectionbanner.png';
  document.head.appendChild(imageLink);
};

// Execute preloading
preloadCriticalResources();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 