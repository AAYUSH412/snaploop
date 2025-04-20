import express from 'express';
import {
  getVideos,
  getVideo,
  createVideo,
  updateVideo,
  deleteVideo,
  likeVideo,
  addComment,
  deleteComment,
  getTrendingVideos,
  getVideosByCategory,
  shareVideo,
  getUploadSignature
} from '../controllers/videoController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getVideos);
router.get('/trending', getTrendingVideos);
router.get('/category/:categoryId', getVideosByCategory);
router.get('/:id', getVideo);
router.put('/:id/share', shareVideo);

// Protected routes
router.post('/', protect, createVideo);
router.put('/:id', protect, updateVideo);
router.delete('/:id', protect, deleteVideo);
router.put('/:id/like', protect, likeVideo);
router.post('/:id/comments', protect, addComment);
router.delete('/:id/comments/:commentId', protect, deleteComment);
router.get('/upload-signature', protect, getUploadSignature);

export default router;