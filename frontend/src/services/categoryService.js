import apiClient from './api';

// Category management
const categoryService = {
  // Get all categories
  getCategories: () => apiClient.get('/categories'),
  
  // Get a single category by ID
  getCategory: (id) => apiClient.get(`/categories/${id}`),
  
  // Admin functions (protected routes)
  createCategory: (categoryData) => apiClient.post('/categories', categoryData),
  updateCategory: (id, categoryData) => apiClient.put(`/categories/${id}`, categoryData),
  deleteCategory: (id) => apiClient.delete(`/categories/${id}`)
};

export default categoryService;