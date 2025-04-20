import axios from 'axios';

// Base API configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies to be sent with requests
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    // We'll still send the token in the header if it exists in localStorage
    // This provides dual authentication methods (cookie + token header)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 - Unauthorized errors (expired token, etc)
    if (error.response && error.response.status === 401) {
      // Clear invalid token
      localStorage.removeItem('token');
      
      // Get the current path to redirect back after login
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        // Redirect to login with the current path as a redirect parameter
        window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
      } else {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;