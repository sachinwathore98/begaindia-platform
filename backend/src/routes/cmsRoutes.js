import express from 'express';
import {
  getActiveNotices,
  createNotice,
  deleteNotice,
  getAllNews,
  createNewsRelease,
  deleteNewsRelease,
} from '../controllers/cmsController.js';

const router = express.Router();

// Public lookups
router.get('/notices/active', getActiveNotices);
router.get('/news', getAllNews);

// Admin controls
router.post('/notices', createNotice);
router.delete('/notices/:id', deleteNotice);
router.post('/news', createNewsRelease);
router.delete('/news/:id', deleteNewsRelease);

export default router;