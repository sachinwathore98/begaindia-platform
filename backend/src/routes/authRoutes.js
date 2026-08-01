import express from 'express';
import {
  sendRegistrationOtp,
  verifyRegistrationOtp,
  registerUser,
  loginUser,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/send-otp', sendRegistrationOtp);
router.post('/verify-otp', verifyRegistrationOtp);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;