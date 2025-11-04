import { apiClient } from './apiClient';

export const authService = {
  // User authentication
  async login(credentials) {
    return apiClient.post('/auth/login/', credentials);
  },

  async register(userData) {
    return apiClient.post('/auth/register/', userData);
  },

  async verifyToken(token) {
    // Use the backend token verify endpoint which expects the token in the body
    return apiClient.post('/auth/token/verify/', { token });
  },

  async refreshToken(refreshToken) {
    return apiClient.post('/auth/token/refresh/', { refresh: refreshToken });
  },

  async logout(token) {
    return apiClient.post('/auth/logout/', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Profile management
  async updateProfile(profileData, token) {
    // Profile endpoints live under /users/profile/ in the backend
    return apiClient.put('/users/profile/', profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async changePassword(passwordData, token) {
    return apiClient.post('/auth/password/change/', passwordData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async requestPasswordReset(email) {
    return apiClient.post('/auth/forgot-password/', { email });
  },

  async resetPassword(resetData) {
    return apiClient.post('/auth/reset-password/', resetData);
  },

  // OTP verification
  async verifyOTP(otpData) {
    return apiClient.post('/auth/verify-otp/', otpData);
  },

  async resendOTP(email) {
    return apiClient.post('/auth/resend-otp/', { email });
  }
};