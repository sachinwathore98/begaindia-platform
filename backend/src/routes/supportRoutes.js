// backend/src/routes/supportRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
import {
  createSupportTicket,
  getTicketStatus,
  updateTicketStatus,
  getAllTickets,
} from '../controllers/supportController.js';

const router = express.Router();

// Public submission & tracking
router.post('/ticket', createSupportTicket);
router.get('/ticket/:ticketId', getTicketStatus);

// Admin-only operations
router.get('/tickets/all', protect, admin, getAllTickets);
router.put('/ticket/:ticketId', protect, admin, updateTicketStatus);

export default router;