// backend/src/routes/mentorRoutes.js
import express from 'express';
import { registerMentorship, getMentorshipProfiles } from '../controllers/mentorController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/register', protect, registerMentorship);
router.get('/all', protect, admin, getMentorshipProfiles);

export default router;