import Business from '../models/Business.js';
import User from '../models/User.js';

// @desc    Get or Create Logged-in User's Business Profile
// @route   GET /api/business/me
// @access  Private
export const getMyBusinessProfile = async (req, res, next) => {
  try {
    let business = await Business.findOne({ user: req.user.id });

    if (!business) {
      // Return default draft profile if none exists
      return res.status(200).json({
        success: true,
        data: {
          companyName: '',
          designation: '',
          gstNumber: '',
          address: '',
          description: '',
          logo: '',
          brochure: '',
          gallery: [],
          documents: [],
        },
      });
    }

    return res.status(200).json({ success: true, data: business });
  } catch (error) {
    return next(error);
  }
};

// @desc    Update Business Profile & Media Assets
// @route   PUT /api/business/update
// @access  Private
export const updateBusinessProfile = async (req, res, next) => {
  try {
    const { companyName, designation, gstNumber, address, description, category } = req.body;

    let business = await Business.findOne({ user: req.user.id });

    const updatedData = {
      user: req.user.id,
      companyName,
      designation,
      gstNumber,
      address,
      description,
      category,
    };

    // Process Files if Uploaded
    if (req.files) {
      if (req.files.logo?.[0]) {
        updatedData.logo = `/uploads/${req.files.logo[0].filename}`;
      }
      if (req.files.brochure?.[0]) {
        updatedData.brochure = `/uploads/${req.files.brochure[0].filename}`;
      }
      if (req.files.gallery) {
        const newImages = req.files.gallery.map((file) => `/uploads/${file.filename}`);
        updatedData.gallery = business?.gallery ? [...business.gallery, ...newImages] : newImages;
      }
    }

    if (business) {
      business = await Business.findOneAndUpdate({ user: req.user.id }, updatedData, { new: true });
    } else {
      business = await Business.create(updatedData);
    }

    // Also sync user name/company if updated
    await User.findByIdAndUpdate(req.user.id, { companyName });

    return res.status(200).json({
      success: true,
      message: 'Business Profile updated successfully!',
      data: business,
    });
  } catch (error) {
    return next(error);
  }
};