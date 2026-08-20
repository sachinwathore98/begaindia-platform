import express from 'express';
import { createPaymentOrder, verifyPaymentSignature } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-order', createPaymentOrder);
router.post('/verify-payment', verifyPaymentSignature);

// Maintain backwards compatibility aliases if needed
router.post('/order', createPaymentOrder);
router.post('/verify', verifyPaymentSignature);

export default router;