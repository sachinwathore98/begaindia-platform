import User from '../models/User.js';
import Business from '../models/Business.js';

// Helper to generate a unique Application Number: BEGA-YEAR-RANDOM
const generateApplicationNumber = () => {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `BEGA-${year}-${randomDigits}`;
};

// @desc    Submit Multi-Step Online Membership Application
// @route   POST /api/membership/apply
// @access  Public
export const submitMembershipApplication = async (req, res, next) => {
  try {
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
    } = req.body;

    const cleanEmail = email ? email.trim().toLowerCase() : '';

    // Check existing application/user
    const userExists = await User.findOne({ $or: [{ email: cleanEmail }, { mobile }] });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'An application or account with this email or mobile already exists.',
      });
    }

    const applicationNumber = generateApplicationNumber();

    // Create Member User Account
    const user = await User.create({
      name: fullName,
      email: cleanEmail,
      mobile,
      password: password || 'BegaMember@2026',
      role: 'user',
      applicationNumber,
      district,
      taluka,
      address,
      isVerified: true,
      membership: {
        plan: `${membershipType} Membership`,
        status: 'Active',
        startDate: new Date(),
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      },
    });

    // Create Corresponding Business Profile
    const business = await Business.create({
      user: user._id,
      companyName: businessName,
      category,
      businessType: businessType || 'Private Enterprise',
      gstNumber: gstNumber || '',
      description: description || 'Registered BEGA India Member Business',
      mobile,
      email: cleanEmail,
      district,
      taluka,
      address,
      status: 'Approved',
      isFeatured: membershipType === 'Lifetime' || membershipType === 'Executive',
    });

    return res.status(201).json({
      success: true,
      message: 'Membership Application Submitted Successfully!',
      applicationNumber,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        applicationNumber,
        district: user.district,
        taluka: user.taluka,
        membership: user.membership,
      },
      business: {
        id: business._id,
        companyName: business.companyName,
        category: business.category,
      },
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Verify Member Digital ID via QR Scan
// @route   GET /api/membership/verify/:applicationNumber
// @access  Public
export const verifyMemberCard = async (req, res, next) => {
  try {
    const { applicationNumber } = req.params;

    const user = await User.findOne({ applicationNumber }).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Invalid Membership Card. Application record not found.',
      });
    }

    const business = await Business.findOne({ user: user._id });

    return res.status(200).json({
      success: true,
      valid: true,
      member: {
        name: user.name,
        applicationNumber: user.applicationNumber,
        membershipPlan: user.membership?.plan,
        membershipStatus: user.membership?.status,
        district: user.district,
        taluka: user.taluka,
        companyName: business?.companyName || 'Individual Member',
        category: business?.category || 'General',
        validTill: user.membership?.expiryDate,
      },
    });
  } catch (error) {
    return next(error);
  }
};