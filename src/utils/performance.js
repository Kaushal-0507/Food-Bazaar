// Performance monitoring and optimization utilities

// Debounce function to limit API calls
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function to limit function calls
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Image preloader
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Batch preload images
export const preloadImages = (imageUrls) => {
  return Promise.all(imageUrls.map(url => preloadImage(url)));
};

// Performance monitoring
export const measurePerformance = (name, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
  return result;
};

// Async performance monitoring
export const measureAsyncPerformance = async (name, fn) => {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
  return result;
};

// Memory usage monitoring
export const logMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = performance.memory;
    console.log('Memory Usage:', {
      used: Math.round(memory.usedJSHeapSize / 1048576 * 100) / 100 + ' MB',
      total: Math.round(memory.totalJSHeapSize / 1048576 * 100) / 100 + ' MB',
      limit: Math.round(memory.jsHeapSizeLimit / 1048576 * 100) / 100 + ' MB'
    });
  }
};

// Network status monitoring
export const getNetworkInfo = () => {
  if ('connection' in navigator) {
    const connection = navigator.connection;
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    };
  }
  return null;
};

// Optimize images based on network conditions
export const getOptimizedImageUrl = (baseUrl, networkInfo) => {
  if (!networkInfo) return baseUrl;
  
  // Add quality parameter based on network speed
  const quality = networkInfo.effectiveType === 'slow-2g' || networkInfo.effectiveType === '2g' 
    ? 'q_auto,w_300' 
    : networkInfo.effectiveType === '3g' 
    ? 'q_auto,w_500' 
    : 'q_auto,w_660';
  
  return baseUrl.includes('?') 
    ? `${baseUrl}&${quality}` 
    : `${baseUrl}?${quality}`;
}; 