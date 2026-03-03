// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Load HTML component into element
 * @param {string} componentPath - Path to component HTML file
 * @param {string} elementId - ID of element to load component into
 */
async function loadComponent(componentPath, elementId) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

/**
 * Format price to Indian Rupees
 * @param {number} price - Price to format
 * @returns {string} Formatted price in INR
 */
function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Format mileage in kilometers with comma separators
 * @param {number} mileage - Mileage value in kilometers
 * @returns {string} Formatted mileage
 */
function formatMileage(mileage) {
  return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " km";
}

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Truncate text to specific length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text with ellipsis
 */
function truncateText(text, maxLength = 100) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

/**
 * Generate URL-friendly slug from text
 * @param {string} text - Text to slugify
 * @returns {string} Slugified text
 */
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Parse URL query parameters
 * @returns {object} Query parameters object
 */
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const paramsObj = {};
  for (let [key, value] of params) {
    paramsObj[key] = value;
  }
  return paramsObj;
}

/**
 * Build query string from object
 * @param {object} params - Parameters object
 * @returns {string} Query string
 */
function buildQueryString(params) {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

/**
 * Redirect to URL with parameters
 * @param {string} url - Base URL
 * @param {object} params - Parameters object
 */
function redirectWithParams(url, params) {
  const queryString = buildQueryString(params);
  window.location.href = `${url}?${queryString}`;
}

/**
 * Get single query parameter
 * @param {string} paramName - Parameter name
 * @returns {string|null} Parameter value or null
 */
function getQueryParam(paramName) {
  const params = new URLSearchParams(window.location.search);
  return params.get(paramName);
}

/**
 * Check if string is valid email
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if string is valid phone number
 * @param {string} phone - Phone to validate
 * @returns {boolean} True if valid phone
 */
function isValidPhone(phone) {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result
 */
function validatePassword(password) {
  const result = {
    isValid: false,
    strength: 'Weak',
    errors: []
  };

  if (password.length < 8) {
    result.errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    result.errors.push('Password must contain uppercase letter');
  }
  if (!/[0-9]/.test(password)) {
    result.errors.push('Password must contain number');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    result.errors.push('Password must contain special character');
  }

  result.isValid = result.errors.length === 0;
  
  if (result.isValid) {
    result.strength = 'Strong';
  } else if (password.length >= 8) {
    result.strength = 'Medium';
  }

  return result;
}

/**
 * Debounce function
 * @param {function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {function} Debounced function
 */
function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 * @param {function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {function} Throttled function
 */
function throttle(func, limit = 300) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Show notification message
 * @param {string} message - Message to show
 * @param {string} type - Type (success, error, info, warning)
 * @param {number} duration - Duration in milliseconds
 */
function showNotification(message, type = 'info', duration = 3000) {
  const notificationId = `notification-${Date.now()}`;
  const notification = document.createElement('div');
  notification.id = notificationId;
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: ${type === 'success' ? '#4caf50' : type === 'error' ? '#ff6b6b' : '#2196F3'};
    color: white;
    padding: 15px 20px;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    animation: slideInRight 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, duration);
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} True if successful
 */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
function getInitials(name) {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
}

/**
 * Format date to readable format
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
function formatDate(date) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Smooth scroll to element
 * @param {HTMLElement|string} target - Element or selector
 */
function smoothScroll(target) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Get browser storage with error handling
 * @param {string} key - Storage key
 * @param {string} type - Storage type ('local' or 'session')
 * @returns {any} Stored value or null
 */
function getStorage(key, type = 'local') {
  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading storage:', error);
    return null;
  }
}

/**
 * Set browser storage with error handling
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 * @param {string} type - Storage type ('local' or 'session')
 */
function setStorage(key, value, type = 'local') {
  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error writing storage:', error);
  }
}

/**
 * Remove item from storage
 * @param {string} key - Storage key
 * @param {string} type - Storage type ('local' or 'session')
 */
function removeStorage(key, type = 'local') {
  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    storage.removeItem(key);
  } catch (error) {
    console.error('Error removing storage:', error);
  }
}

/**
 * Clear all storage
 * @param {string} type - Storage type ('local' or 'session')
 */
function clearStorage(type = 'local') {
  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    storage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
}
