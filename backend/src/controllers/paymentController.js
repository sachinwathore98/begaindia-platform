import Razorpay from 'razorpay';
import crypto from 'crypto';
import User from '../models/User.js';

// Initialize Razorpay Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_dummy_secret',
});

// Membership Plans Config
const PLANS = {
  basic: { name: 'Basic Membership', amount: 999 }, // In INR
  premium: { name: 'Premium Membership', amount: 2999 },
  corporate: { name: 'Corporate Membership', amount: 9999 },
};

// In-memory payment logs
const paymentLogs = new Map();

// @desc    Create Razorpay Order for Membership Subscription
// @route   POST /api/payment/create-order
// @access  Private
export const createOrder = async (req, res, next) => {
  try {
    const { planKey, duration } = req.body; // duration: 'monthly' | 'quarterly' | 'yearly'
    const plan = PLANS[planKey];

    if (!plan) {
      return res.status(400).json({ success: false, message: 'Invalid membership plan selected' });
    }

    // Apply Duration Multiplier
    let multiplier = 1;
    if (duration === 'quarterly') multiplier = 2.7; // ~10% discount
    if (duration === 'yearly') multiplier = 9.5;    // ~20% discount

    const totalAmount = Math.round(plan.amount * multiplier);

    const options = {
      amount: totalAmount * 100, // Amount in paise
      currency: 'INR',
      receipt: `bgn_rcpt_${Date.now()}`,
      notes: {
        userId: req.user.id,
        planName: plan.name,
        duration,
      },
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      planName: plan.name,
    });
  } catch (error) {
    console.error('[RAZORPAY CREATE ORDER ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create payment order: ' + (error.message || 'Payment Service Error'),
    });
  }
};

// @desc    Verify Razorpay Signature & Upgrade User Membership
// @route   POST /api/payment/verify
// @access  Private
export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planName, duration, amount } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'rzp_test_dummy_secret')
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature. Transaction failed.' });
    }

    // Update User Membership Status in Database
    const user = await User.findById(req.user.id);
    if (user) {
      user.membership = {
        plan: planName,
        status: 'Active',
        duration,
        startDate: new Date(),
        expiryDate: new Date(Date.now() + (duration === 'yearly' ? 365 : duration === 'quarterly' ? 90 : 30) * 24 * 60 * 60 * 1000),
      };
      await user.save();
    }

    // Save to Payment History
    const userHistory = paymentLogs.get(req.user.id) || [];
    const record = {
      id: razorpay_payment_id,
      orderId: razorpay_order_id,
      planName,
      amount: amount / 100,
      date: new Date().toLocaleDateString('en-IN'),
      status: 'Success',
    };
    userHistory.unshift(record);
    paymentLogs.set(req.user.id, userHistory);

    return res.status(200).json({
      success: true,
      message: `Successfully upgraded to ${planName}!`,
      membership: user?.membership,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Get User Payment History
// @route   GET /api/payment/history
// @access  Private
export const getPaymentHistory = async (req, res, next) => {
  try {
    const history = paymentLogs.get(req.user.id) || [];
    return res.status(200).json({ success: true, data: history });
  } catch (error) {
    return next(error);
  }
};