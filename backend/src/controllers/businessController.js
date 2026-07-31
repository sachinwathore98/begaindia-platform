import BusinessProfile from '../models/BusinessProfile.js';

// @desc    Create or update current user's business profile
// @route   POST /api/business
// @access  Private
export const createOrUpdateBusinessProfile = async (req, res) => {
  try {
    const { companyName, category, gstNumber, city, state, description, website } = req.body;

    const profileFields = {
      userId: req.user.id,
      companyName,
      category,
      gstNumber,
      city,
      state,
      description,
      website,
    };

    // Attach logo path if file was uploaded
    if (req.file) {
      profileFields.logo = `/uploads/${req.file.filename}`;
    }

    let profile = await BusinessProfile.findOne({ userId: req.user.id });

    if (profile) {
      // Update existing profile
      profile = await BusinessProfile.findOneAndUpdate(
        { userId: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: 'Business profile updated successfully',
        data: profile,
      });
    }

    // Create new profile
    profile = await BusinessProfile.create(profileFields);
    res.status(201).json({
      success: true,
      message: 'Business profile submitted successfully',
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user's business profile
// @route   GET /api/business/me
// @access  Private
export const getMyBusinessProfile = async (req, res) => {
  try {
    const profile = await BusinessProfile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'No business profile found' });
    }
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all approved business profiles with search, filters & pagination
// @route   GET /api/business
// @access  Public
export const getBusinesses = async (req, res) => {
  try {
    const { search, category, city, page = 1, limit = 9 } = req.query;

    const query = { approvalStatus: 'APPROVED' };

    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) query.category = category;
    if (city) query.city = { $regex: city, $options: 'i' };

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await BusinessProfile.countDocuments(query);
    const businesses = await BusinessProfile.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: businesses.length,
      totalPages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      data: businesses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};