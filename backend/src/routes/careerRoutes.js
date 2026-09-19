// backend/src/routes/careerRoutes.js
import express from 'express';
import { getJobListings, createJobPosting, applyForJob } from '../controllers/careerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/jobs', getJobListings);
router.post('/jobs', protect, createJobPosting);
router.post('/apply/:jobId', applyForJob);

export default router;