import express from 'express';
import {
  submitMembershipApplication,
  verifyMemberCard,
} from '../controllers/membershipController.js';

const router = express.Router();

router.post('/apply', submitMembershipApplication);
router.get('/verify/:applicationNumber', verifyMemberCard);

export default router;