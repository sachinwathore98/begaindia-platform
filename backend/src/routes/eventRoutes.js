import express from 'express';
import { getEvents, registerForEvent, bookExpoStall } from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getEvents);
router.post('/:id/register', registerForEvent);
router.post('/:id/book-stall', bookExpoStall);

export default router;