import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

import {
  getAdminStats,
  getAllUsers,
  addUser,
  updateUser,
  toggleBlockUser,
  approveMembership,
  deleteUser,
} from '../controllers/adminController.js';

import {
  getAdminDirectory,
  updateDirectoryStatus,
  toggleFeaturedCompany,
  getAdminEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/adminDirectoryEventController.js';

import {
  getRevenueStats,
  getTransactions,
} from '../controllers/adminRevenueController.js';

import {
  getCMSData,
  updateCMSData,
} from '../controllers/adminCMSController.js';

const router = express.Router();

// Allow public GET for home rendering, protect PUT for admin updates
router.get('/cms', getCMSData);

// Admin Authorized Operations
router.use(protect, admin);

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.post('/users', addUser);
router.put('/users/:id', updateUser);
router.put('/users/:id/block', toggleBlockUser);
router.put('/users/:id/approve-membership', approveMembership);
router.delete('/users/:id', deleteUser);

router.get('/directory', getAdminDirectory);
router.put('/directory/:id/status', updateDirectoryStatus);
router.put('/directory/:id/feature', toggleFeaturedCompany);

router.get('/events', getAdminEvents);
router.post('/events', createEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

router.get('/revenue/stats', getRevenueStats);
router.get('/revenue/transactions', getTransactions);

// CMS Update
router.put('/cms', updateCMSData);

export default router;