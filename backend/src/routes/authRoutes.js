// backend/src/routes/authRoutes.js
import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import {
  sendRegistrationOtp,
  verifyRegistrationOtp,
  registerUser,
  loginUser,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// One-time Admin Initializer & Password Recovery Route
router.get('/seed-admin', async (req, res) => {
  try {
    const adminEmail = 'admin@begaindia.org';
    const plainPassword = 'BegaAdmin@2026';

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    const adminUser = await User.findOneAndUpdate(
      { email: adminEmail },
      {
        $set: {
          name: 'BEGA Master Admin',
          email: adminEmail,
          mobile: '+917387877820',
          password: hashedPassword,
          role: 'admin',
          applicationNumber: 'BEGA-ADMIN-2026',
          district: 'Chhatrapati Sambhajinagar',
          taluka: 'Aurangabad',
          isVerified: true,
          isBlocked: false,
          membership: {
            plan: 'BEGA Central Core Committee',
            status: 'Active',
          },
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Master Admin account initialized successfully!',
      credentials: {
        email: adminEmail,
        password: plainPassword,
      },
      user: {
        id: adminUser._id,
        email: adminUser.email,
        role: adminUser.role,
        applicationNumber: adminUser.applicationNumber,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to seed admin',
      error: error.message,
    });
  }
});

// Authentication & OTP Routes
router.post('/send-otp', sendRegistrationOtp);
router.post('/verify-otp', verifyRegistrationOtp);
router.post('/register', registerUser);
router.post('/login', loginUser);

// Member Profile Verification Route
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;