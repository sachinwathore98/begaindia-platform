import ExpoBooking from '../models/ExpoBooking.js';
import VisitorPass from '../models/VisitorPass.js';

// @desc    Get All Booked Stalls
// @route   GET /api/expo/stalls
// @access  Public
export const getStallGrid = async (req, res, next) => {
  try {
    const bookings = await ExpoBooking.find({ status: { $ne: 'Cancelled' } }).select('stallNumber stallTier companyName status');
    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Book a Stall
// @route   POST /api/expo/stalls/book
// @access  Public
export const bookStall = async (req, res, next) => {
  try {
    const {
      stallNumber,
      stallTier,
      companyName,
      contactPerson,
      email,
      mobile,
      businessCategory,
      productsToExhibit,
      price,
    } = req.body;

    const existing = await ExpoBooking.findOne({ stallNumber, status: { $ne: 'Cancelled' } });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Stall ${stallNumber} has already been reserved. Please choose another stall.`,
      });
    }

    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const bookingId = `EXPO-${year}-${randomSuffix}`;

    const booking = await ExpoBooking.create({
      bookingId,
      stallNumber,
      stallTier,
      companyName,
      contactPerson,
      email,
      mobile,
      businessCategory,
      productsToExhibit,
      price: Number(price),
      status: 'Reserved',
      paymentStatus: 'Pending',
    });

    return res.status(201).json({
      success: true,
      message: `Stall ${stallNumber} reserved successfully! Booking ID: ${bookingId}`,
      booking,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Register Visitor / Delegate Pass
// @route   POST /api/expo/passes/register
// @access  Public
export const registerVisitorPass = async (req, res, next) => {
  try {
    const { passType, fullName, companyName, email, mobile, district, designation } = req.body;

    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const passId = `PASS-${year}-${randomSuffix}`;

    const pass = await VisitorPass.create({
      passId,
      passType: passType || 'Free Trade Visitor Pass',
      fullName,
      companyName,
      email,
      mobile,
      district,
      designation: designation || 'Business Owner',
    });

    return res.status(201).json({
      success: true,
      message: 'Visitor pass issued successfully!',
      pass,
    });
  } catch (error) {
    return next(error);
  }
};