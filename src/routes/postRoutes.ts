import express from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from '../controllers/postController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getAllPosts).post(protect, createPost);

router
  .route('/:id')
  .get(protect, getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

export default router;
