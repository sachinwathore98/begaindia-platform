import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getEvents,
  registerForEvent,
  getMyEvents,
  downloadEventPass,
} from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getEvents);
router.post('/register', protect, registerForEvent);
router.get('/my-events', protect, getMyEvents);
router.get('/:eventId/pass', protect, downloadEventPass);

export default router;