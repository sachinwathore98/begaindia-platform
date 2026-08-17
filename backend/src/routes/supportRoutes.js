import express from 'express';
import {
  createSupportTicket,
  getTicketStatus,
  updateTicketStatus,
} from '../controllers/supportController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Public & Member endpoints
router.post('/tickets', createSupportTicket);
router.get('/tickets/:ticketId', getTicketStatus);

// Admin-only ticket triage
router.put('/tickets/:ticketId/status', protect, admin, updateTicketStatus);

export default router;