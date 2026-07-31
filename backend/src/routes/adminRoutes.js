import express from 'express';
import { getPendingBusinesses, updateBusinessStatus } from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth and admin restrictions
router.use(protect);
router.use(authorize('ADMIN', 'SUPER_ADMIN'));

router.get('/pending-businesses', getPendingBusinesses);
router.put('/approve-business/:id', updateBusinessStatus);

export default router;