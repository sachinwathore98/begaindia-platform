import Razorpay from 'razorpay';
import crypto from 'crypto';
import User from '../models/User.js';
import Business from '../models/Business.js';
import { sendMembershipEmail } from '../utils/notificationService.js';

const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_TOrMfwOx0P9Mma',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'ofxzo06srPJ61SzICLbtscS5',
  });
};

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Public
export const createOrder = async (req, res, next) => {
  try {
    const { amount, membershipPlan } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid payment amount.' });
    }

    const instance = getRazorpayInstance();
    const options = {
      amount: Math.round(Number(amount) * 100), // Razorpay requires paise
      currency: 'INR',
      receipt: `BEGA-RCPT-${Date.now()}`,
      notes: { membershipPlan: membershipPlan || 'Business Membership' },
    };

    const order = await instance.orders.create(options);
    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_TOrMfwOx0P9Mma',
    });
  } catch (error) {
    console.error('Razorpay Order Error:', error);
    return next(error);
  }
};

// @desc    Verify Razorpay Payment Signature & Activate Member
// @route   POST /api/payment/verify-payment
// @access  Public
export const verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData,
    } = req.body;

    // Cryptographic signature check
    const secret = process.env.RAZORPAY_KEY_SECRET || 'ofxzo06srPJ61SzICLbtscS5';
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Payment signature verification failed.' });
    }

    const {
      fullName,
      email,
      mobile,
      password,
      district,
      taluka,
      address,
      membershipType,
      businessName,
      category,
      businessType,
      gstNumber,
      description,
    } = formData;

    const cleanEmail = email ? email.trim().toLowerCase() : '';
    const cleanMobile = mobile ? mobile.trim() : '';

    let user = await User.findOne({ $or: [{ email: cleanEmail }, { mobile: cleanMobile }] });
    const year = new Date().getFullYear();
    const applicationNumber = `BEGA-${year}-${Math.floor(100000 + Math.random() * 900000)}`;

    if (!user) {
      user = await User.create({
        name: fullName.trim(),
        email: cleanEmail,
        mobile: cleanMobile,
        password: password || 'BegaMember@2026',
        role: 'user',
        applicationNumber,
        district: district || 'Chhatrapati Sambhajinagar',
        taluka: taluka || 'Aurangabad',
        address: address || '',
        isVerified: true,
        membership: {
          plan: `${membershipType || 'Business'} Membership`,
          status: 'Active',
          startDate: new Date(),
          expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
        },
      });

      await Business.create({
        user: user._id,
        companyName: businessName?.trim() || `${fullName.trim()} Enterprises`,
        category: category || 'Manufacturing & Industrial',
        businessType: businessType || 'Proprietorship',
        gstNumber: gstNumber ? gstNumber.trim().toUpperCase() : '',
        description: description || 'Registered BEGA India Member Business',
        mobile: cleanMobile,
        email: cleanEmail,
        district: district || 'Chhatrapati Sambhajinagar',
        taluka: taluka || 'Aurangabad',
        address: address || '',
        status: 'Approved',
        isFeatured: membershipType === 'Lifetime' || membershipType === 'Executive',
      });
    } else {
      user.membership.status = 'Active';
      user.membership.plan = `${membershipType || 'Business'} Membership`;
      user.membership.paymentId = razorpay_payment_id;
      user.membership.orderId = razorpay_order_id;
      await user.save();
    }

    sendMembershipEmail({
      toEmail: cleanEmail,
      fullName: user.name,
      companyName: businessName || `${user.name} Enterprises`,
      applicationNumber: user.applicationNumber,
      membershipPlan: user.membership.plan,
    }).catch((e) => console.error('Email dispatch error:', e));

    return res.status(200).json({
      success: true,
      message: 'Payment verified and membership activated!',
      applicationNumber: user.applicationNumber,
      paymentId: razorpay_payment_id,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        applicationNumber: user.applicationNumber,
        membership: user.membership,
      },
    });
  } catch (error) {
    console.error('Payment Verification Error:', error);
    return next(error);
  }
};