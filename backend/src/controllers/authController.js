import { 
  TransactionalEmailsApi, 
  SendSmtpEmail, 
  TransactionalEmailsApiApiKeys 
} from '@getbrevo/brevo';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

// Helper to generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// In-memory OTP store (email -> { otp, expiresAt, isVerified })
const otpStore = new Map();

// @desc    Send Registration OTP to Email (Instant via Brevo API)
// @route   POST /api/auth/send-otp
// @access  Public
export const sendRegistrationOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if user already exists
    const userExists = await User.findOne({ email: cleanEmail });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Account with this email already exists' });
    }

    const otp = generateOTP();
    otpStore.set(cleanEmail, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // Valid for 10 minutes
      isVerified: false,
    });

    // Initialize Brevo Transactional Email API Instance per-request (or globally)
    const apiInstance = new TransactionalEmailsApi();
    apiInstance.setApiKey(
      TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    // Configure Brevo SendSmtpEmail Payload
    const sendSmtpEmail = new SendSmtpEmail();
    sendSmtpEmail.subject = `${otp} is your BEGAINDIA Verification Code`;
    sendSmtpEmail.sender = { 
      name: "BEGAINDIA Business Network", 
      email: process.env.EMAIL_FROM || "begaindia559@gmail.com" 
    };
    sendSmtpEmail.to = [{ email: cleanEmail }];
    sendSmtpEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 24px; color: #1e293b; max-width: 480px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
        <div style="margin-bottom: 20px;">
          <span style="font-size: 20px; font-weight: 800; color: #0A3D91; letter-spacing: -0.5px;">BEGAINDIA</span>
          <span style="font-size: 10px; font-weight: 700; color: #F57C00; text-transform: uppercase; margin-left: 6px;">Business Network</span>
        </div>
        <h3 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 8px 0;">Verify your email address</h3>
        <p style="font-size: 13px; color: #475569; margin: 0 0 20px 0; line-height: 1.5;">
          Use the 6-digit code below to complete your business registration on BEGAINDIA.
        </p>
        <div style="background-color: #f8fafc; border: 1px border-dashed #cbd5e1; border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 20px;">
          <span style="font-size: 32px; font-weight: 800; color: #F57C00; letter-spacing: 8px; font-family: monospace;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 11px; color: #94a3b8; margin: 0; text-align: center;">
          This code expires in 10 minutes. If you didn't request this email, please ignore it.
        </p>
      </div>
    `;

    // Send email via Brevo REST API
    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return res.status(200).json({
      success: true,
      message: 'Verification OTP sent to email successfully',
    });
  } catch (error) {
    console.error('[BREVO API ERROR]', error?.response?.body || error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email OTP: ' + (error?.response?.body?.message || error.message || 'Email Service Error'),
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

    const cleanEmail = email.trim().toLowerCase();
    const record = otpStore.get(cleanEmail);

    if (!record || record.otp !== otp.trim() || Date.now() > record.expiresAt) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP code' });
    }

    // Mark email verified
    otpStore.set(cleanEmail, { ...record, isVerified: true });

    return res.status(200).json({
      success: true,
      message: 'Email OTP verified successfully',
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Register new user (Enforces Verified Email OTP)
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const record = otpStore.get(cleanEmail);

    if (!record || !record.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email address has not been verified via OTP. Please verify email first.',
      });
    }

    const userExists = await User.findOne({ $or: [{ email: cleanEmail }, { mobile }] });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or mobile already exists',
      });
    }

    const user = await User.create({
      name,
      email: cleanEmail,
      mobile,
      password,
      isVerified: true,
    });

    otpStore.delete(cleanEmail);

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

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail }).select('+password');
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