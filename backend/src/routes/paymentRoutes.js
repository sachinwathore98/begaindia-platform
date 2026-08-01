import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createOrder, verifyPayment, getPaymentHistory } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.get('/history', protect, getPaymentHistory);

export default router;