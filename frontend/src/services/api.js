/**
 * API Service for VibeLearn
 * Handles communication with Django backend
 */

const API_BASE = '/api';

/**
 * Get CSRF token from cookies (needed for Django session auth)
 */
function getCsrfToken() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrftoken') {
      return value;
    }
  }
  return null;
}

/**
 * Make an API request with proper headers
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add CSRF token for non-GET requests
  if (options.method && options.method !== 'GET') {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      headers['X-CSRFToken'] = csrfToken;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Include cookies for session auth
  });

  const data = await response.json();

  if (!response.ok) {
    // Extract error message from Django response
    const errorMessage = data.error || 
      data.detail || 
      (data.username && data.username[0]) ||
      (data.email && data.email[0]) ||
      (data.password && data.password[0]) ||
      'Request failed';
    throw new Error(errorMessage);
  }

  return data;
}

/**
 * Auth API
 */
export const authApi = {
  /**
   * Register a new user
   */
  register: async (username, email, password, passwordConfirm) => {
    return apiRequest('/accounts/register/', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
        password_confirm: passwordConfirm,
      }),
    });
  },

  /**
   * Login user
   */
  login: async (username, password) => {
    return apiRequest('/accounts/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  /**
   * Logout user
   */
  logout: async () => {
    return apiRequest('/accounts/logout/', {
      method: 'POST',
    });
  },

  /**
   * Check if user is authenticated
   */
  checkAuth: async () => {
    return apiRequest('/accounts/check/');
  },

  /**
   * Get user profile
   */
  getProfile: async () => {
    return apiRequest('/accounts/profile/');
  },

  /**
   * Change password
   */
  changePassword: async (oldPassword, newPassword) => {
    return apiRequest('/accounts/change-password/', {
      method: 'POST',
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });
  },
};

export default apiRequest;

