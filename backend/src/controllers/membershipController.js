import User from '../models/User.js';
import Business from '../models/Business.js';
import { sendMembershipEmail } from '../utils/notificationService.js';

// Helper to generate unique Application Number
const generateApplicationNumber = () => {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `BEGA-${year}-${randomDigits}`;
};

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

    if (!fullName || !email || !mobile) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, and mobile number.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanMobile = mobile.trim();

    const userExists = await User.findOne({ $or: [{ email: cleanEmail }, { mobile: cleanMobile }] });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'An application or account with this email or mobile number already exists.',
      });
    }

    const applicationNumber = generateApplicationNumber();

    const user = await User.create({
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
      },
    });

    const business = await Business.create({
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

    // Fire automated email receipt (non-blocking)
    sendMembershipEmail({
      toEmail: cleanEmail,
      fullName: user.name,
      companyName: business.companyName,
      applicationNumber: user.applicationNumber,
      membershipPlan: user.membership.plan,
    }).catch((e) => console.error('Background email worker error:', e));

    return res.status(201).json({
      success: true,
      message: 'Membership Application Submitted Successfully!',
      applicationNumber,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        applicationNumber: user.applicationNumber,
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
    console.error('Membership Application Error:', error);
    return next(error);
  }
};