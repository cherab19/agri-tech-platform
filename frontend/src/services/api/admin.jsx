import { apiClient } from '../apiClient';

export const adminService = {
  // User management
  async getAllUsers(token, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiClient.get(`/admin/users?${queryParams}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getUserDetails(userId, token) {
    return apiClient.get(`/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async updateUserRole(userId, roleData, token) {
    return apiClient.patch(`/admin/users/${userId}/role`, roleData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async suspendUser(userId, reason, token) {
    return apiClient.patch(`/admin/users/${userId}/suspend`, 
      { reason }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },

  async activateUser(userId, token) {
    return apiClient.patch(`/admin/users/${userId}/activate`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Order management
  async getAllOrders(token, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiClient.get(`/admin/orders?${queryParams}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getOrderAnalytics(token, period = 'monthly') {
    return apiClient.get(`/admin/analytics/orders?period=${period}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Financial management
  async getFinancialReports(token, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiClient.get(`/admin/financials/reports?${queryParams}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async calculateCommissions(token, period) {
    return apiClient.get(`/admin/financials/commissions?period=${period}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async processPayouts(payoutData, token) {
    return apiClient.post('/admin/financials/payouts', payoutData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async approvePayout(payoutId, token) {
    return apiClient.patch(`/admin/financials/payouts/${payoutId}/approve`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Platform settings
  async getPlatformSettings(token) {
    return apiClient.get('/admin/settings', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async updatePlatformSettings(settings, token) {
    return apiClient.put('/admin/settings', settings, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async updateCommissionRate(rateData, token) {
    return apiClient.patch('/admin/settings/commission', rateData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // System management
  async getSystemMetrics(token) {
    return apiClient.get('/admin/metrics', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getAuditLogs(token, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiClient.get(`/admin/audit-logs?${queryParams}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};