import nodemailer from 'nodemailer';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

// Helper to generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// In-memory OTP store (email -> { otp, expiresAt, isVerified })
const otpStore = new Map();

// @desc    Send Registration OTP to Email
// @route   POST /api/auth/send-otp
// @access  Public
export const sendRegistrationOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Account with this email already exists' });
    }

    const otp = generateOTP();
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // Valid for 10 minutes
      isVerified: false,
    });

    // Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send Email
    await transporter.sendMail({
      from: '"BEGAINDIA Business Network" <no-reply@begaindia.com>',
      to: email,
      subject: 'BEGAINDIA Registration OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0A3D91;">BEGAINDIA Verification Code</h2>
          <p>Your 6-digit registration OTP code is:</p>
          <div style="font-size: 24px; font-weight: bold; color: #F57C00; letter-spacing: 4px; padding: 10px 0;">
            ${otp}
          </div>
          <p style="font-size: 12px; color: #777;">This code is valid for 10 minutes. Do not share it with anyone.</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'Verification OTP sent to email successfully',
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Verify Registration OTP
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyRegistrationOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    const record = otpStore.get(email);

    if (!record || record.otp !== otp || Date.now() > record.expiresAt) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP code' });
    }

    // Mark email as verified in store
    otpStore.set(email, { ...record, isVerified: true });

    return res.status(200).json({
      success: true,
      message: 'Email OTP verified successfully',
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Register a new user (Enforces Verified Email OTP)
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Check required fields
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Verify if OTP was verified for this email
    const record = otpStore.get(email);
    if (!record || !record.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email address has not been verified via OTP. Please verify email first.',
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { mobile }] });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or mobile already exists',
      });
    }

    // Create User
    const user = await User.create({
      name,
      email,
      mobile,
      password,
      isVerified: true,
    });

    // Clean up OTP record
    otpStore.delete(email);

    // Generate JWT token
    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter email and password' });
    }

    // Find user and select password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    return next(error);
  }
};