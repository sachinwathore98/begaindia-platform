import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { getMyBusinessProfile, updateBusinessProfile } from '../controllers/businessController.js';

const router = express.Router();

router.get('/me', protect, getMyBusinessProfile);

router.put(
  '/update',
  protect,
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'brochure', maxCount: 1 },
    { name: 'gallery', maxCount: 10 },
  ]),
  updateBusinessProfile
);

export default router;