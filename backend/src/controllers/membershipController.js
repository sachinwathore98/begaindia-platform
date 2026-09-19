// backend/src/controllers/membershipController.js
import Membership from '../models/Membership.js';
import ExecutiveApplication from '../models/ExecutiveApplication.js';
import User from '../models/User.js';

// @desc    Submit / Register Membership Application
// @route   POST /api/membership/apply
// @access  Public
export const submitMembershipApplication = async (req, res, next) => {
  try {
    const {
      name,
      companyName,
      email,
      mobile,
      membershipPlan,
      district,
      taluka,
      businessCategory,
      gstNumber,
      udyamNumber,
    } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and mobile are required.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanMobile = mobile.trim();

    const year = new Date().getFullYear();
    const applicationNumber = `BEGA-${year}-${Math.floor(100000 + Math.random() * 900000)}`;

    const membership = await Membership.create({
      applicationNumber,
      name: name.trim(),
      companyName: (companyName || `${name.trim()} Enterprises`).trim(),
      email: cleanEmail,
      mobile: cleanMobile,
      membershipPlan: membershipPlan || 'BEGA Membership with Directory',
      membershipStatus: 'Pending',
      district: district || 'Chhatrapati Sambhajinagar',
      taluka: taluka || 'Aurangabad',
      businessCategory: businessCategory || 'Manufacturing & Engineering',
      gstNumber: gstNumber ? gstNumber.trim().toUpperCase() : '',
      udyamNumber: udyamNumber ? udyamNumber.trim().toUpperCase() : '',
    });

    return res.status(201).json({
      success: true,
      message: 'Membership application submitted successfully.',
      data: membership,
      applicationNumber,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Get Current Logged-in User's Membership Details
// @route   GET /api/membership/my-membership
// @access  Private
export const getMembershipDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('membership name email mobile applicationNumber district');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const membership = await Membership.findOne({ email: user.email });

    return res.status(200).json({
      success: true,
      data: {
        user,
        membershipRecord: membership || null,
      },
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Verify Member Status by Application Number (QR / Public check)
// @route   GET /api/membership/verify/:applicationNumber
// @access  Public
export const verifyMemberStatus = async (req, res, next) => {
  try {
    const { applicationNumber } = req.params;
    const cleanAppNum = applicationNumber.trim().toUpperCase();

    let user = await User.findOne({ applicationNumber: cleanAppNum })
      .select('name companyName applicationNumber district taluka membership isVerified createdAt');

    if (!user) {
      const record = await Membership.findOne({ applicationNumber: cleanAppNum });
      if (!record) {
        return res.status(404).json({
          success: false,
          message: 'No registered member found with this application number.',
        });
      }
      return res.status(200).json({ success: true, data: record });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Submit Executive Karyakarini Application (9-Step Selection Process)
// @route   POST /api/membership/executive-apply
// @access  Private
export const submitExecutiveApplication = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      mobile,
      businessName,
      committeeLevel,
      district,
      taluka,
      experienceYears,
      visionStatement,
    } = req.body;

    const existing = await ExecutiveApplication.findOne({ user: req.user.id, committeeLevel });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted an application for this committee.',
      });
    }

    const application = await ExecutiveApplication.create({
      user: req.user.id,
      fullName: fullName || req.user.name,
      email: (email || req.user.email).trim().toLowerCase(),
      mobile: mobile || req.user.mobile,
      businessName: businessName || `${req.user.name} Enterprises`,
      committeeLevel,
      district: district || req.user.district,
      taluka: taluka || req.user.taluka,
      experienceYears: Number(experienceYears) || 0,
      visionStatement: visionStatement || 'Committed to business growth and community empowerment.',
      selectionStage: 'Eligibility Check',
    });

    return res.status(201).json({
      success: true,
      message: 'Executive Karyakarini application submitted successfully. Undergoing 9-step selection workflow.',
      data: application,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Get All Executive Applications (Admin Only)
// @route   GET /api/membership/executive-applications
// @access  Private/Admin
export const getExecutiveApplications = async (req, res, next) => {
  try {
    const applications = await ExecutiveApplication.find()
      .populate('user', 'name email mobile membership')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Update Executive Selection Stage
// @route   PUT /api/membership/executive-stage/:id
// @access  Private/Admin
export const updateExecutiveStage = async (req, res, next) => {
  try {
    const { selectionStage, officialRemarks } = req.body;
    const application = await ExecutiveApplication.findByIdAndUpdate(
      req.params.id,
      { selectionStage, officialRemarks },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application record not found.' });
    }

    if (selectionStage === 'Appointment') {
      await User.findByIdAndUpdate(application.user, { role: 'executive' });
    }

    return res.status(200).json({
      success: true,
      message: `Application advanced to stage: ${selectionStage}`,
      data: application,
    });
  } catch (error) {
    return next(error);
  }
};