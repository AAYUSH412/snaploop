import apiClient from './api';

// User authentication and management
const userService = {
  // Authentication
  register: (userData) => apiClient.post('/users/register', userData),
  login: (credentials) => apiClient.post('/users/login', credentials),
  logout: () => apiClient.get('/users/logout'),
  
  // User profile
  getCurrentUser: () => apiClient.get('/users/me'),
  updateProfile: (userData) => apiClient.put('/users/me', userData),
  uploadAvatar: (fileData) => apiClient.post('/users/avatar', fileData),
  
  // User discovery
  getUserByUsername: (username) => apiClient.get(`/users/${username}`),
  getUserVideos: (username) => apiClient.get(`/users/${username}/videos`),
  getLikedVideos: (username) => apiClient.get(`/users/${username}/liked-videos`),
  getSuggestedUsers: () => apiClient.get('/users/suggested')
};

export default userService;