// API client configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Helpful debug info when requests fail or are mis-routed.
    // Keep this lightweight in production by using console.debug.
    console.debug('[apiClient] request', { url, method: config.method || 'GET', headers: config.headers });

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        // Try to capture any JSON error body, otherwise read as text.
        let errorBody = null;
        try {
          errorBody = await response.json();
        } catch (e) {
          try {
            errorBody = await response.text();
          } catch (ee) {
            errorBody = null;
          }
        }

        const msg = (errorBody && (errorBody.message || JSON.stringify(errorBody))) || `HTTP error! status: ${response.status}`;
        const err = new Error(msg);
        // Attach extra fields for callers/tests to inspect programmatically.
        err.status = response.status;
        err.url = url;
        err.body = errorBody;
        console.error('[apiClient] request failed', { url, status: response.status, body: errorBody });
        throw err;
      }

      // Some endpoints return no JSON (204); handle that gracefully.
      const text = await response.text();
      try {
        return text ? JSON.parse(text) : null;
      } catch (e) {
        // If response is not JSON, return raw text
        return text;
      }
    } catch (error) {
      // Ensure we surface the url on unexpected network errors as well
      if (!error.url) error.url = url;
      console.error('API request failed:', error);
      throw error;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  patch(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();