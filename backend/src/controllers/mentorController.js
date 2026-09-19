// backend/src/controllers/mentorController.js
import Mentorship from '../models/Mentorship.js';

// @desc    Register for Mentor-Mentee Program
// @route   POST /api/mentor/register
// @access  Private
export const registerMentorship = async (req, res, next) => {
  try {
    const { fullName, email, mobile, businessName, roleType, guidanceArea, experienceYears, objectiveSummary } = req.body;

    const entry = await Mentorship.create({
      user: req.user.id,
      fullName: fullName || req.user.name,
      email: email || req.user.email,
      mobile: mobile || req.user.mobile,
      businessName,
      roleType,
      guidanceArea,
      experienceYears,
      objectiveSummary,
    });

    return res.status(201).json({
      success: true,
      message: 'Mentorship enrollment received. Our secretariat is coordinating matchmaking.',
      data: entry,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Get All Mentorship Enrollments (Admin Only)
// @route   GET /api/mentor/all
// @access  Private/Admin
export const getMentorshipProfiles = async (req, res, next) => {
  try {
    const profiles = await Mentorship.find().populate('user', 'name email mobile').sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: profiles.length, data: profiles });
  } catch (error) {
    return next(error);
  }
};