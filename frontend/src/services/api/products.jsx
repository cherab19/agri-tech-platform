import { apiClient } from './apiClient';

export const productsService = {
  // Product operations
  async getProducts(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiClient.get(`/products?${queryParams}`);
  },

  async getProduct(productId) {
    return apiClient.get(`/products/${productId}`);
  },

  async createProduct(productData, token) {
    return apiClient.post('/products', productData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async updateProduct(productId, productData, token) {
    return apiClient.put(`/products/${productId}`, productData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async deleteProduct(productId, token) {
    return apiClient.delete(`/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Product categories and types
  async getCategories() {
    return apiClient.get('/products/categories');
  },

  async getProductTypes() {
    return apiClient.get('/products/types');
  },

  // Product availability
  async checkProductAvailability(productId, quantity) {
    return apiClient.get(`/products/${productId}/availability?quantity=${quantity}`);
  },

  async updateProductStock(productId, stockData, token) {
    return apiClient.patch(`/products/${productId}/stock`, stockData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Product reviews and ratings
  async getProductReviews(productId, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiClient.get(`/products/${productId}/reviews?${queryParams}`);
  },

  async addProductReview(productId, reviewData, token) {
    return apiClient.post(`/products/${productId}/reviews`, reviewData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};