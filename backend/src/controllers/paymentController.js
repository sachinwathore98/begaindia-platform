import crypto from 'crypto';
import Razorpay from 'razorpay';
import Membership from '../models/Membership.js';

// Initialize Razorpay instance
const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholderKey',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholderSecret',
  });
};

const PLAN_FEES = {
  'Basic Membership': 1199,
  'Business Membership': 2999,
  'Lifetime Membership': 11000,
  'Executive Membership': 21000,
};

// @desc    Create Razorpay Order for Membership Application
// @route   POST /api/payment/order
// @access  Public / Applicant
export const createPaymentOrder = async (req, res, next) => {
  try {
    const { membershipPlan, applicationId } = req.body;

    const amountInINR = PLAN_FEES[membershipPlan] || 1199;
    const amountInPaise = amountInINR * 100;

    const razorpay = getRazorpayInstance();
    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `RCPT_${Date.now()}`,
      notes: {
        applicationId: applicationId || 'NEW_MEMBER',
        membershipPlan,
      },
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: amountInINR,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholderKey',
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Verify Razorpay Payment Signature & Activate Member
// @route   POST /api/payment/verify
// @access  Public / Applicant
export const verifyPaymentSignature = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      applicationData,
    } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET || 'placeholderSecret';

    // Verify Cryptographic Signature
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isAuthentic = generatedSignature === razorpay_signature;

    if (!isAuthentic && process.env.NODE_ENV === 'production') {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed. Invalid cryptographic signature.',
      });
    }

    // Generate Official BEGA Credentials
    const currentYear = new Date().getFullYear();
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const officialApplicationNumber = `BEGA-${currentYear}-${randomSuffix}`;
    const invoiceNumber = `INV-${currentYear}-${Math.floor(10000 + Math.random() * 90000)}`;

    const planAmount = PLAN_FEES[applicationData.membershipPlan] || 1199;

    // Create / Update Member in DB
    const newMember = await Membership.create({
      ...applicationData,
      applicationNumber: officialApplicationNumber,
      membershipStatus: 'Active',
      paymentDetails: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        amountPaid: planAmount,
        invoiceNumber,
        paidAt: new Date(),
        paymentStatus: 'Success',
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Membership activated successfully!',
      member: {
        applicationNumber: officialApplicationNumber,
        name: newMember.name,
        companyName: newMember.companyName,
        membershipPlan: newMember.membershipPlan,
        membershipStatus: 'Active',
        district: newMember.district,
        taluka: newMember.taluka,
        paymentDetails: newMember.paymentDetails,
      },
    });
  } catch (error) {
    return next(error);
  }
};