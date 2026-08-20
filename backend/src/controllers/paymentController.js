import crypto from 'crypto';
import Razorpay from 'razorpay';
import Membership from '../models/Membership.js';

const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error('Razorpay credentials missing in environment variables');
  }

  return new Razorpay({ key_id, key_secret });
};

const PLAN_FEES = {
  'Basic Membership': 1199,
  'Business Membership': 2999,
  'Lifetime Membership': 11000,
  'Executive Membership': 21000,
};

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Public / Applicant
export const createPaymentOrder = async (req, res, next) => {
  try {
    const { amount, currency = 'INR', membershipPlan, receipt } = req.body;

    // Calculate amount in paise (min 100 paise = 1 INR)
    let calculatedAmount = amount ? Number(amount) * 100 : (PLAN_FEES[membershipPlan] || 1199) * 100;

    if (!calculatedAmount || calculatedAmount < 100) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount. Minimum payable amount is 100 paise (₹1.00).',
      });
    }

    const razorpay = getRazorpayInstance();
    const options = {
      amount: Math.round(calculatedAmount),
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: {
        membershipPlan: membershipPlan || 'Standard',
      },
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Razorpay Order Creation Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create Razorpay order',
    });
  }
};

// @desc    Verify Razorpay Signature & Activate Membership
// @route   POST /api/payment/verify-payment
// @access  Public / Applicant
export const verifyPaymentSignature = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      applicationData,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment verification fields.',
      });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    // HMAC-SHA256 verification
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed: Signature mismatch.',
      });
    }

    // Process database record if applicationData is passed
    let memberRecord = null;
    if (applicationData) {
      const year = new Date().getFullYear();
      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      const applicationNumber = `BEGA-${year}-${randomSuffix}`;
      const invoiceNumber = `INV-${year}-${Math.floor(10000 + Math.random() * 90000)}`;

      memberRecord = await Membership.create({
        ...applicationData,
        applicationNumber,
        membershipStatus: 'Active',
        paymentDetails: {
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          amountPaid: (PLAN_FEES[applicationData.membershipPlan] || 1199),
          invoiceNumber,
          paidAt: new Date(),
          paymentStatus: 'Success',
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Payment verified and captured successfully.',
      member: memberRecord,
    });
  } catch (error) {
    console.error('Razorpay Signature Verification Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error verifying signature',
    });
  }
};