import { apiClient } from './apiClient';

export const vendorsService = {
  // Product catalog
  async getAvailableProducts(filters = {}) {
    // Use the canonical products list endpoint and request only available items by default
    const merged = { ...filters };
    if (!('available_only' in merged)) merged.available_only = true;
    const queryParams = new URLSearchParams(merged).toString();
    return apiClient.get(`/products?${queryParams}`);
  },

  async getProductDetails(productId) {
    return apiClient.get(`/products/${productId}`);
  },

  // Order management
  async placeOrder(orderData, token) {
    return apiClient.post('/orders', orderData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getVendorOrders(vendorCooperativeId, token, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiClient.get(`/vendors/${vendorCooperativeId}/orders?${queryParams}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getOrderDetails(orderId, token) {
    return apiClient.get(`/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async cancelOrder(orderId, reason, token) {
    return apiClient.patch(`/orders/${orderId}/cancel`, 
      { reason }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },

  // Cart management (temporary server-side cart)
  async saveCart(cartData, token) {
    return apiClient.post('/cart/save', cartData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getSavedCart(vendorCooperativeId, token) {
    return apiClient.get(`/vendors/${vendorCooperativeId}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Delivery tracking
  async trackDelivery(orderId, token) {
    return apiClient.get(`/orders/${orderId}/tracking`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getDeliveryDrivers(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiClient.get(`/drivers/available?${queryParams}`);
  },

  // Vendor profile and analytics
  async getVendorProfile(vendorCooperativeId, token) {
    return apiClient.get(`/vendors/${vendorCooperativeId}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async updateVendorProfile(vendorCooperativeId, profileData, token) {
    return apiClient.put(`/vendors/${vendorCooperativeId}/profile`, profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getPurchaseHistory(vendorCooperativeId, token, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiClient.get(`/vendors/${vendorCooperativeId}/purchase-history?${queryParams}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};