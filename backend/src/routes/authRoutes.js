import express from 'express';
import { register } from '../controllers/authController.js'; // Adjust path if needed

const router = express.Router();

// Make sure it passes (req, res, next) properly
router.post('/register', register);

export default router;