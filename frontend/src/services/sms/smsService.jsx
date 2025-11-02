import { apiClient } from '../apiClient';

export const smsService = {
  // SMS sending operations
  async sendSMS(smsData, token) {
    return apiClient.post('/sms/send', smsData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async sendBulkSMS(bulkData, token) {
    return apiClient.post('/sms/bulk', bulkData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Template management
  async getSMSTemplates(token) {
    return apiClient.get('/sms/templates', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async updateSMSTemplate(templateId, templateData, token) {
    return apiClient.put(`/sms/templates/${templateId}`, templateData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // SMS delivery status
  async getSMSStatus(messageId, token) {
    return apiClient.get(`/sms/status/${messageId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async getSMSDeliveryReport(token, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiClient.get(`/sms/reports/delivery?${queryParams}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // SMS analytics
  async getSMSAnalytics(token, period = 'monthly') {
    return apiClient.get(`/sms/analytics?period=${period}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};