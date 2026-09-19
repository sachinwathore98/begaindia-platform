// backend/src/controllers/membershipController.js
import Membership from '../models/Membership.js';
import ExecutiveApplication from '../models/ExecutiveApplication.js';
import User from '../models/User.js';

// @desc    Verify Member Status by Application Number
// @route   GET /api/membership/verify/:applicationNumber
// @access  Public
export const verifyMemberStatus = async (req, res, next) => {
  try {
    const { applicationNumber } = req.params;
    const user = await User.findOne({ applicationNumber: applicationNumber.trim().toUpperCase() })
      .select('name companyName applicationNumber district taluka membership isVerified createdAt');

    if (!user) {
      return res.status(404).json({ success: false, message: 'No registered member found with this application number.' });
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
    const { fullName, email, mobile, businessName, committeeLevel, district, taluka, experienceYears, visionStatement } = req.body;

    const existing = await ExecutiveApplication.findOne({ user: req.user.id, committeeLevel });
    if (existing) {
      return res.status(400).json({ success: false, message: 'You have already submitted an application for this committee.' });
    }

    const application = await ExecutiveApplication.create({
      user: req.user.id,
      fullName: fullName || req.user.name,
      email: email || req.user.email,
      mobile: mobile || req.user.mobile,
      businessName,
      committeeLevel,
      district,
      taluka,
      experienceYears,
      visionStatement,
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
    const applications = await ExecutiveApplication.find().populate('user', 'name email mobile membership').sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: applications.length, data: applications });
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