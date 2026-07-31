import crypto from 'crypto';
import { razorpayInstance } from '../config/razorpay.js';
import Subscription from '../models/Subscription.js';
import User from '../models/User.js';

// @desc    Create Razorpay Order
// @route   POST /api/payments/create-order
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { planName, amount } = req.body;

    if (!planName || !amount) {
      return res.status(400).json({ success: false, message: 'Plan name and amount are required' });
    }

    const options = {
      amount: amount * 100, // Convert INR to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: req.user.id,
        planName,
      },
    };

    const order = await razorpayInstance.orders.create(options);

    // Save pending subscription record
    await Subscription.create({
      userId: req.user.id,
      planName,
      amount,
      razorpayOrderId: order.id,
      status: 'PENDING',
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify Razorpay Signature
// @route   POST /api/payments/verify
// @access  Private
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder')
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    const startDate = new Date();
    const endDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 Year

    const subscription = await Subscription.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        status: 'ACTIVE',
        startDate,
        endDate,
      },
      { new: true }
    );

    // Upgrade user role
    await User.findByIdAndUpdate(req.user.id, { role: 'PREMIUM_MEMBER' });

    res.status(200).json({
      success: true,
      message: 'Payment verified and membership activated!',
      data: subscription,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};