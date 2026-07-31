import BusinessProfile from '../models/BusinessProfile.js';
import User from '../models/User.js';

// @desc    Get all pending business profile applications
// @route   GET /api/admin/pending-businesses
// @access  Private (ADMIN / SUPER_ADMIN)
export const getPendingBusinesses = async (req, res) => {
  try {
    const profiles = await BusinessProfile.find({ approvalStatus: 'PENDING' })
      .populate('userId', 'name email mobile');
    res.status(200).json({ success: true, count: profiles.length, data: profiles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Approve or reject a business profile
// @route   PUT /api/admin/approve-business/:id
// @access  Private (ADMIN / SUPER_ADMIN)
export const updateBusinessStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'APPROVED' or 'REJECTED'

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be APPROVED or REJECTED' });
    }

    const profile = await BusinessProfile.findByIdAndUpdate(
      req.params.id,
      { approvalStatus: status },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Business profile not found' });
    }

    res.status(200).json({
      success: true,
      message: `Business profile status updated to ${status}`,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};