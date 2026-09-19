// backend/src/routes/businessRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { getMyBusinessProfile, updateBusinessProfile } from '../controllers/businessController.js';
import { searchDirectory } from '../controllers/directoryController.js';

const router = express.Router();

// Public business list/search
// Matches: GET /api/business?page=1&limit=12 AND GET /api/businesses?page=1&limit=12
router.get('/', searchDirectory);
router.get('/search', searchDirectory);

// Protected member profile routes
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