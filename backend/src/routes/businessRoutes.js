import express from 'express';
import {
  createOrUpdateBusinessProfile,
  getMyBusinessProfile,
  getBusinesses,
} from '../controllers/businessController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getBusinesses)
  .post(protect, upload.single('logo'), createOrUpdateBusinessProfile);

router.route('/me')
  .get(protect, getMyBusinessProfile);

export default router;