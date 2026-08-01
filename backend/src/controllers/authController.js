// backend/src/controllers/authController.js
const nodemailer = require('nodemailer');

// Helper to generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// In-memory or Redis OTP store
const otpStore = new Map();

// 1. Send Registration OTP
exports.sendRegistrationOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email address is required' });

  const otp = generateOTP();
  otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 }); // Valid 10 mins

  // Nodemailer transporter config
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // e.g. support@begaindia.com
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"BEGAINDIA Network" <no-reply@begaindia.com>',
    to: email,
    subject: 'BEGAINDIA Registration OTP Verification',
    html: `<h3>Your BEGAINDIA Account Verification Code is: <strong>${otp}</strong></h3><p>Valid for 10 minutes.</p>`,
  });

  res.status(200).json({ message: 'OTP dispatched successfully to email' });
};

// 2. Verify OTP
exports.verifyRegistrationOtp = async (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore.get(email);

  if (!record || record.otp !== otp || Date.now() > record.expiresAt) {
    return res.status(400).json({ message: 'Invalid or expired OTP code' });
  }

  otpStore.delete(email);
  res.status(200).json({ message: 'Email verified successfully' });
};