import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  updateProfile,
  uploadAvatar,
  getUserByUsername,
  getUserVideos,
  getLikedVideos,
  getSuggestedUsers
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/suggested', getSuggestedUsers);
router.get('/:username', getUserByUsername);
router.get('/:username/videos', getUserVideos);
router.get('/:username/liked-videos', getLikedVideos);

// Protected routes
router.get('/me', protect, getMe);
router.put('/me', protect, updateProfile);
router.post('/avatar', protect, uploadAvatar);

export default router;