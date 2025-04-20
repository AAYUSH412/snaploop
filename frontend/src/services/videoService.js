import apiClient from './api';

// Video management and interactions
const videoService = {
  // Video retrieval
  getVideos: (page = 1, limit = 10) => apiClient.get(`/videos?page=${page}&limit=${limit}`),
  getVideoById: (id) => apiClient.get(`/videos/${id}`),
  getTrendingVideos: () => apiClient.get('/videos/trending'),
  getVideosByCategory: (categoryId) => apiClient.get(`/videos/category/${categoryId}`),
  
  // Video creation and management
  createVideo: (videoData) => apiClient.post('/videos', videoData),
  updateVideo: (id, videoData) => apiClient.put(`/videos/${id}`, videoData),
  deleteVideo: (id) => apiClient.delete(`/videos/${id}`),
  getUploadSignature: () => apiClient.get('/videos/upload-signature'),
  
  // Video interactions
  likeVideo: (id) => apiClient.put(`/videos/${id}/like`),
  addComment: (id, comment) => apiClient.post(`/videos/${id}/comments`, comment),
  deleteComment: (videoId, commentId) => apiClient.delete(`/videos/${videoId}/comments/${commentId}`),
  shareVideo: (id) => apiClient.put(`/videos/${id}/share`)
};

export default videoService;