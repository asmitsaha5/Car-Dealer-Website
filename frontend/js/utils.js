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

function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

function formatMileage(mileage) {
  return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " km";
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function truncateText(text, maxLength = 100) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const paramsObj = {};
  for (let [key, value] of params) {
    paramsObj[key] = value;
  }
  return paramsObj;
}

function buildQueryString(params) {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

function redirectWithParams(url, params) {
  const queryString = buildQueryString(params);
  window.location.href = `${url}?${queryString}`;
}

function getQueryParam(paramName) {
  const params = new URLSearchParams(window.location.search);
  return params.get(paramName);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

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

function throttle(func, limit = 300) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

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

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

function getInitials(name) {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
}

function formatDate(date) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function smoothScroll(target) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

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

function setStorage(key, value, type = 'local') {
  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error writing storage:', error);
  }
}

function removeStorage(key, type = 'local') {
  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    storage.removeItem(key);
  } catch (error) {
    console.error('Error removing storage:', error);
  }
}

function clearStorage(type = 'local') {
  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    storage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
}
