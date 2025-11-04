// Local storage utility functions
export const storageService = {
  // Basic storage operations
  setItem(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
      return false;
    }
  },

  getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error getting localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  },

  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  // Specific application storage
  getAuthToken() {
    return this.getItem('auth_token');
  },

  setAuthToken(token) {
    return this.setItem('auth_token', token);
  },

  removeAuthToken() {
    return this.removeItem('auth_token');
  },

  getUserData() {
    return this.getItem('user_data');
  },

  setUserData(userData) {
    return this.setItem('user_data', userData);
  },

  removeUserData() {
    return this.removeItem('user_data');
  },

  // Cart management
  getCartItems() {
    return this.getItem('cart_items', []);
  },

  setCartItems(cartItems) {
    return this.setItem('cart_items', cartItems);
  },

  clearCart() {
    return this.removeItem('cart_items');
  },

  // Language preferences
  getLanguage() {
    return this.getItem('preferred_language', 'en');
  },

  setLanguage(language) {
    return this.setItem('preferred_language', language);
  },

  // Theme preferences
  getTheme() {
    return this.getItem('preferred_theme', 'light');
  },

  setTheme(theme) {
    return this.setItem('preferred_theme', theme);
  },

  // Utility methods
  exists(key) {
    return localStorage.getItem(key) !== null;
  },

  getKeys() {
    return Object.keys(localStorage);
  },

  getSize() {
    let total = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  }
};