import { apiClient } from '../apiClient';

export const telebirrService = {
  // TeleBirr payment integration
  async initiatePayment(paymentData, token) {
    return apiClient.post('/payments/telebirr/initiate', paymentData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async verifyPayment(reference, token) {
    return apiClient.get(`/payments/telebirr/verify/${reference}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getPaymentStatus(reference, token) {
    return apiClient.get(`/payments/telebirr/status/${reference}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async handleCallback(callbackData) {
    return apiClient.post('/payments/telebirr/callback', callbackData);
  },

  // Refund operations
  async initiateRefund(refundData, token) {
    return apiClient.post('/payments/telebirr/refund', refundData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Webhook handling (for server-to-server communication)
  async registerWebhook(webhookData, token) {
    return apiClient.post('/payments/telebirr/webhook', webhookData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};