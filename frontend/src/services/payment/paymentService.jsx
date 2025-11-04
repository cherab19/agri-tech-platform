import { apiClient } from '../apiClient';

export const paymentService = {
  // Generic payment operations
  async processPayment(paymentMethod, paymentData, token) {
    const endpoint = `/payments/${paymentMethod}/process`;
    return apiClient.post(endpoint, paymentData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getPaymentMethods() {
    return apiClient.get('/payments/methods');
  },

  // Transaction management
  async getTransaction(transactionId, token) {
    return apiClient.get(`/payments/transactions/${transactionId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getTransactionsByUser(userId, token, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiClient.get(`/payments/transactions/user/${userId}?${queryParams}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Invoice generation
  async generateInvoice(orderId, token) {
    return apiClient.get(`/payments/invoice/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async downloadInvoice(invoiceId, token) {
    return apiClient.get(`/payments/invoice/${invoiceId}/download`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob'
    });
  },

  // Payment analytics
  async getPaymentAnalytics(token, period = 'monthly') {
    return apiClient.get(`/payments/analytics?period=${period}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Security and fraud detection
  async validatePayment(paymentData, token) {
    return apiClient.post('/payments/validate', paymentData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};