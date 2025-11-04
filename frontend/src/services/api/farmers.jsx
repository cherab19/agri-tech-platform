
import { apiClient } from '../apiClient';

export const farmersService = {
  // Product management
  async getProducts(farmerId, token) {
    return apiClient.get(`/farmers/${farmerId}/products`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async addProduct(productData, token) {
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

  async toggleProductAvailability(productId, available, token) {
    return apiClient.patch(`/products/${productId}/availability`, 
      { available }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },

  // Order management
  async getIncomingOrders(farmerCooperativeId, token) {
    return apiClient.get(`/farmers/${farmerCooperativeId}/orders/incoming`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async updateOrderStatus(orderId, statusData, token) {
    return apiClient.patch(`/orders/${orderId}`, statusData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Transactions and payments
  async getTransactions(farmerCooperativeId, token, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiClient.get(`/farmers/${farmerCooperativeId}/transactions?${queryParams}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getEarningsSummary(farmerCooperativeId, token) {
    return apiClient.get(`/farmers/${farmerCooperativeId}/earnings`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Cooperative management
  async getCooperativeMembers(cooperativeId, token) {
    return apiClient.get(`/cooperatives/${cooperativeId}/members`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async updateCooperativeProfile(cooperativeId, profileData, token) {
    return apiClient.put(`/cooperatives/${cooperativeId}`, profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};