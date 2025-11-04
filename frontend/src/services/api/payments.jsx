import { apiClient } from '../apiClient';

export const paymentsService = {
  // Payment processing
  async initiatePayment(paymentData, token) {
    return apiClient.post('/payments/initiate', paymentData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async confirmPayment(confirmationData, token) {
    return apiClient.post('/payments/confirm', confirmationData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async verifyPayment(reference, token) {
    return apiClient.get(`/payments/verify/${reference}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Payment history
  async getPaymentHistory(userId, token, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiClient.get(`/payments/history/${userId}?${queryParams}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getPaymentDetails(paymentId, token) {
    return apiClient.get(`/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Refunds and disputes
  async requestRefund(refundData, token) {
    return apiClient.post('/payments/refund', refundData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getRefundStatus(refundId, token) {
    return apiClient.get(`/payments/refund/${refundId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Payouts
  async getPayouts(userId, token, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiClient.get(`/payments/payouts/${userId}?${queryParams}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async requestPayout(payoutData, token) {
    return apiClient.post('/payments/payout-request', payoutData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};