import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, logout } = useAuth();

  const request = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
      const url = `${baseURL}${endpoint}`;

      const response = await fetch(url, config);
      
      if (response.status === 401) {
        // Token expired or invalid
        logout();
        throw new Error('Authentication failed. Please login again.');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err.message || 'An error occurred while making the request';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token, logout]);

  // HTTP method helpers
  const get = useCallback((endpoint, options = {}) => 
    request(endpoint, { ...options, method: 'GET' }), [request]);

  const post = useCallback((endpoint, data, options = {}) =>
    request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }), [request]);

  const put = useCallback((endpoint, data, options = {}) =>
    request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }), [request]);

  const patch = useCallback((endpoint, data, options = {}) =>
    request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    }), [request]);

  const del = useCallback((endpoint, options = {}) =>
    request(endpoint, { ...options, method: 'DELETE' }), [request]);

  const upload = useCallback((endpoint, formData, options = {}) => {
    const uploadOptions = {
      ...options,
      method: 'POST',
      body: formData,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };
    // Remove Content-Type for FormData to let browser set it with boundary
    delete uploadOptions.headers['Content-Type'];
    
    return request(endpoint, uploadOptions);
  }, [request, token]);

  const clearError = useCallback(() => setError(null), []);

  return {
    loading,
    error,
    get,
    post,
    put,
    patch,
    delete: del,
    upload,
    clearError,
  };
};