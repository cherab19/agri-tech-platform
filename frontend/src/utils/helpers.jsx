import { USER_ROLES, ORDER_STATUS, DELIVERY_STATUS } from './constants';

// Date and time helpers
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return new Date(date).toLocaleDateString('en-ET', defaultOptions);
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-ET', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getRelativeTime = (date) => {
  const now = new Date();
  const diffInMs = now - new Date(date);
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return formatDate(date);
};

// String helpers
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

export const truncate = (str, length = 50) => {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.substr(0, length) + '...';
};

// Number helpers
export const formatNumber = (number, decimals = 0) => {
  return new Intl.NumberFormat('en-ET').format(
    parseFloat(number).toFixed(decimals)
  );
};

export const generateRandomId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Array helpers
export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
};

export const sortBy = (array, key, order = 'asc') => {
  return array.sort((a, b) => {
    let aValue = a[key];
    let bValue = b[key];

    // Handle nested keys (e.g., 'user.name')
    if (key.includes('.')) {
      const keys = key.split('.');
      aValue = keys.reduce((obj, k) => obj?.[k], a);
      bValue = keys.reduce((obj, k) => obj?.[k], b);
    }

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

export const uniqueBy = (array, key) => {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

// Object helpers
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const isEmpty = (obj) => {
  if (obj == null) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return !obj;
};

// Role and permission helpers
export const hasRole = (user, role) => {
  return user?.role === role;
};

export const hasAnyRole = (user, roles) => {
  return roles.includes(user?.role);
};

export const canAccess = (user, requiredRole) => {
  const roleHierarchy = {
    [USER_ROLES.ADMIN]: 4,
    [USER_ROLES.SYSTEM_STAFF]: 3,
    [USER_ROLES.DRIVER]: 2,
    [USER_ROLES.VENDOR]: 2,
    [USER_ROLES.FARMER]: 1
  };

  const userLevel = roleHierarchy[user?.role] || 0;
  const requiredLevel = roleHierarchy[requiredRole] || 0;

  return userLevel >= requiredLevel;
};

// Order status helpers
export const getNextOrderStatus = (currentStatus) => {
  const statusFlow = {
    [ORDER_STATUS.PENDING]: ORDER_STATUS.CONFIRMED,
    [ORDER_STATUS.CONFIRMED]: ORDER_STATUS.READY,
    [ORDER_STATUS.READY]: ORDER_STATUS.PICKED_UP,
    [ORDER_STATUS.PICKED_UP]: ORDER_STATUS.IN_TRANSIT,
    [ORDER_STATUS.IN_TRANSIT]: ORDER_STATUS.DELIVERED
  };

  return statusFlow[currentStatus];
};

export const isOrderCompleted = (status) => {
  return [ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED, ORDER_STATUS.DECLINED].includes(status);
};

export const isOrderActive = (status) => {
  return !isOrderCompleted(status);
};

// Delivery status helpers
export const getNextDeliveryStatus = (currentStatus) => {
  const statusFlow = {
    [DELIVERY_STATUS.ASSIGNED]: DELIVERY_STATUS.GOING_FOR_PICKUP,
    [DELIVERY_STATUS.GOING_FOR_PICKUP]: DELIVERY_STATUS.PICKED_UP,
    [DELIVERY_STATUS.PICKED_UP]: DELIVERY_STATUS.IN_TRANSIT,
    [DELIVERY_STATUS.IN_TRANSIT]: DELIVERY_STATUS.DELIVERED
  };

  return statusFlow[currentStatus];
};

// File helpers
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp']
  } = options;

  const errors = [];

  if (file.size > maxSize) {
    errors.push(`File size must be less than ${maxSize / 1024 / 1024}MB`);
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
  }

  const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    errors.push(`File extension must be one of: ${allowedExtensions.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// URL helpers
export const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, v));
      } else {
        searchParams.append(key, value);
      }
    }
  });

  return searchParams.toString();
};

export const getQueryParams = (url = window.location.search) => {
  const params = new URLSearchParams(url);
  const result = {};
  
  for (const [key, value] of params) {
    result[key] = value;
  }
  
  return result;
};

// Performance helpers
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

export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Localization helpers
export const getCurrentLanguage = () => {
  return localStorage.getItem('preferred_language') || 'en';
};

export const setCurrentLanguage = (language) => {
  localStorage.setItem('preferred_language', language);
};

// Error handling helpers
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data?.message || `Server error: ${error.response.status}`;
  } else if (error.request) {
    // Request made but no response received
    return 'Network error. Please check your connection.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred.';
  }
};

export const isNetworkError = (error) => {
  return !error.response && error.request;
};

export const isServerError = (error) => {
  return error.response && error.response.status >= 500;
};

export const isClientError = (error) => {
  return error.response && error.response.status >= 400 && error.response.status < 500;
};