import express from 'express';
import {
  submitMembershipApplication,
  verifyMemberCard,
} from '../controllers/membershipController.js';

const router = express.Router();

// Public Onboarding & QR Verification
router.post('/apply', submitMembershipApplication);
router.get('/verify/:applicationNumber', verifyMemberCard);

export default router;