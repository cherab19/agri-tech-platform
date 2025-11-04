import { apiClient } from '../apiClient';

export const driversService = {
  // Delivery management
  async getAssignedOrders(driverId, token) {
    return apiClient.get(`/drivers/${driverId}/orders/assigned`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async updateDeliveryStatus(orderId, statusData, token) {
    return apiClient.patch(`/orders/${orderId}/delivery-status`, statusData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getDeliveryDetails(orderId, token) {
    return apiClient.get(`/orders/${orderId}/driver-view`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Driver availability
  async updateDriverAvailability(driverId, available, token) {
    return apiClient.patch(`/drivers/${driverId}/availability`, 
      { available }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },

  async updateDriverLocation(driverId, locationData, token) {
    return apiClient.patch(`/drivers/${driverId}/location`, locationData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Delivery history and earnings
  async getDeliveryHistory(driverId, token, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiClient.get(`/drivers/${driverId}/deliveries/history?${queryParams}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getEarningsReport(driverId, token, period = 'monthly') {
    return apiClient.get(`/drivers/${driverId}/earnings?period=${period}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getDriverProfile(driverId, token) {
    return apiClient.get(`/drivers/${driverId}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async updateDriverProfile(driverId, profileData, token) {
    return apiClient.put(`/drivers/${driverId}/profile`, profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Vehicle management
  async updateVehicleInfo(driverId, vehicleData, token) {
    return apiClient.put(`/drivers/${driverId}/vehicle`, vehicleData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};