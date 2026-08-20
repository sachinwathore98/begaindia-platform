import express from 'express';
import {
  submitMembershipApplication,
  verifyMemberCard,
} from '../controllers/membershipController.js';

const router = express.Router();

// Onboarding submission endpoint
router.post('/apply', submitMembershipApplication);

// Digital ID QR verification endpoint
router.get('/verify/:applicationNumber', verifyMemberCard);

export default router;