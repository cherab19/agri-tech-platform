import { apiClient } from '../apiClient';

export const ordersService = {
  // Order operations
  async createOrder(orderData, token) {
    return apiClient.post('/orders', orderData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getOrder(orderId, token) {
    return apiClient.get(`/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async updateOrder(orderId, updateData, token) {
    return apiClient.patch(`/orders/${orderId}`, updateData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async cancelOrder(orderId, reason, token) {
    return apiClient.patch(`/orders/${orderId}/cancel`, 
      { reason }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },

  // Order tracking
  async getOrderStatus(orderId, token) {
    return apiClient.get(`/orders/${orderId}/status`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getOrderTracking(orderId, token) {
    return apiClient.get(`/orders/${orderId}/tracking`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Order items
  async getOrderItems(orderId, token) {
    return apiClient.get(`/orders/${orderId}/items`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Bulk operations
  async getOrdersByStatus(status, token, filters = {}) {
    const queryParams = new URLSearchParams({ status, ...filters }).toString();
    return apiClient.get(`/orders?${queryParams}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};