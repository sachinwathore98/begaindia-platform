import Business from '../models/Business.js';

// @desc    Search & Filter Public Business Directory
// @route   GET /api/directory/search
// @access  Public
export const searchDirectory = async (req, res, next) => {
  try {
    const { search, category, district, taluka, page = 1, limit = 12 } = req.query;

    let query = { status: 'Approved' };

    // Text search on Business Name, Products, Services, or Description
    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (district && district !== 'All') {
      query.district = district;
    }

    if (taluka && taluka !== 'All') {
      query.taluka = taluka;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Business.countDocuments(query);

    const businesses = await Business.find(query)
      .populate('user', 'name email mobile membership isVerified')
      .sort({ isFeatured: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    return res.status(200).json({
      success: true,
      count: businesses.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      data: businesses,
    });
  } catch (error) {
    return next(error);
  }
};