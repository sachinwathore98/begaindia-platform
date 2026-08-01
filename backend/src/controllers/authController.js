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
      expiresAt: Date.now() + 10 * 60 * 1000, // Valid 10 mins
      isVerified: false,
    });

    // Configure Transporter with your Google App Credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'begaindia559@gmail.com',
        pass: process.env.EMAIL_PASS,
      },
    });

    // Dispatch Email
    await transporter.sendMail({
      from: `"BEGAINDIA Network" <${process.env.EMAIL_USER || 'begaindia559@gmail.com'}>`,
      to: email,
      subject: 'BEGAINDIA Registration OTP Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 500px; border: 1px solid #e2e8f0; rounded: 12px;">
          <h2 style="color: #0A3D91;">BEGAINDIA Business Network</h2>
          <p>Your 6-digit account verification code is:</p>
          <div style="font-size: 28px; font-weight: bold; color: #F57C00; letter-spacing: 6px; padding: 15px 0; text-align: center;">
            ${otp}
          </div>
          <p style="font-size: 12px; color: #64748b;">This code expires in 10 minutes. Do not share it with anyone.</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'Verification OTP sent to email successfully',
    });
  } catch (error) {
    console.error('[NODEMAILER ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email OTP: ' + (error.message || 'SMTP Server Error'),
    });
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

    // Mark email verified
    otpStore.set(email, { ...record, isVerified: true });

    return res.status(200).json({
      success: true,
      message: 'Email OTP verified successfully',
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const record = otpStore.get(email);
    if (!record || !record.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email address has not been verified via OTP. Please verify email first.',
      });
    }

    const userExists = await User.findOne({ $or: [{ email }, { mobile }] });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or mobile already exists',
      });
    }

    const user = await User.create({
      name,
      email,
      mobile,
      password,
      isVerified: true,
    });

    otpStore.delete(email);

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

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

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