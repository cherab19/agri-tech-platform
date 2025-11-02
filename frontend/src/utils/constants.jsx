// Application constants
export const APP_CONSTANTS = {
  APP_NAME: 'Agar Agritech',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@agaragritech.com',
  SUPPORT_PHONE: '+251-911-234-567',
  COMPANY_ADDRESS: 'Addis Ababa, Ethiopia',
};

// User roles
export const USER_ROLES = {
  FARMER: 'farmer',
  VENDOR: 'vendor',
  DRIVER: 'driver',
  ADMIN: 'admin',
  SYSTEM_STAFF: 'system_staff'
};

// Order statuses
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  READY: 'ready',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  DECLINED: 'declined'
};

// Delivery statuses
export const DELIVERY_STATUS = {
  ASSIGNED: 'assigned',
  GOING_FOR_PICKUP: 'going_for_pickup',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered'
};

// Payment statuses
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
};

// Payment methods
export const PAYMENT_METHODS = {
  TELEBIRR: 'telebirr',
  CASH: 'cash',
  BANK_TRANSFER: 'bank_transfer'
};

// Product categories
export const PRODUCT_CATEGORIES = {
  VEGETABLES: 'Vegetables',
  FRUITS: 'Fruits',
  GRAINS: 'Grains',
  LEGUMES: 'Legumes',
  SPICES: 'Spices',
  COFFEE: 'Coffee',
  TEA: 'Tea',
  DAIRY: 'Dairy',
  POULTRY: 'Poultry',
  OTHER: 'Other'
};

// Measurement units
export const MEASUREMENT_UNITS = {
  KILOGRAM: 'kg',
  GRAM: 'g',
  POUND: 'lb',
  PIECE: 'piece',
  BUNDLE: 'bundle',
  CRATE: 'crate',
  LITER: 'liter'
};

// Ethiopian regions
export const ETHIOPIAN_REGIONS = [
  'Addis Ababa',
  'Oromia',
  'Amhara',
  'Tigray',
  'SNNPR',
  'Somali',
  'Afar',
  'Dire Dawa',
  'Harari',
  'Benishangul-Gumuz',
  'Gambela'
];

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    VERIFY: '/auth/verify',
    REFRESH: '/auth/refresh'
  },
  PRODUCTS: {
    BASE: '/products',
    AVAILABLE: '/products/available',
    CATEGORIES: '/products/categories'
  },
  ORDERS: {
    BASE: '/orders',
    TRACKING: '/orders/:id/tracking'
  },
  PAYMENTS: {
    INITIATE: '/payments/initiate',
    VERIFY: '/payments/verify',
    TELEBIRR: '/payments/telebirr'
  },
  SMS: {
    SEND: '/sms/send',
    TEMPLATES: '/sms/templates'
  }
};

// Validation constants
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^(\+251|0)[1-9][0-9]{8}$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50
};

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  DISPLAY_WITH_TIME: 'DD/MM/YYYY HH:mm',
  API: 'YYYY-MM-DD',
  API_WITH_TIME: 'YYYY-MM-DDTHH:mm:ssZ'
};

// Currency
export const CURRENCY = {
  SYMBOL: 'ETB',
  CODE: 'ETB',
  NAME: 'Ethiopian Birr'
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  CART_ITEMS: 'cart_items',
  LANGUAGE: 'preferred_language',
  THEME: 'preferred_theme'
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please login to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  PAYMENT_FAILED: 'Payment failed. Please try again.',
  ORDER_FAILED: 'Failed to place order. Please try again.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful! Please check your email.',
  ORDER_SUCCESS: 'Order placed successfully!',
  PAYMENT_SUCCESS: 'Payment completed successfully!',
  PROFILE_UPDATE: 'Profile updated successfully!',
  PASSWORD_CHANGE: 'Password changed successfully!'
};