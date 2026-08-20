import Sponsorship from '../models/Sponsorship.js';

// @desc    Submit Corporate CSR Sponsorship Pledge
// @route   POST /api/sponsorship/pledge
// @access  Public
export const submitSponsorshipPledge = async (req, res, next) => {
  try {
    const {
      packageTier,
      sponsorshipAmount,
      companyName,
      cinNumber,
      companyPan,
      gstNumber,
      authorizedPerson,
      email,
      mobile,
      preferredDistrict,
      preferredTaluka,
      requires80GReceipt,
    } = req.body;

    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const sponsorshipId = `CSR-${year}-${randomSuffix}`;

    const sponsorship = await Sponsorship.create({
      sponsorshipId,
      packageTier,
      sponsorshipAmount: Number(sponsorshipAmount),
      companyName,
      cinNumber,
      companyPan: companyPan?.toUpperCase(),
      gstNumber: gstNumber?.toUpperCase(),
      authorizedPerson,
      email: email.trim().toLowerCase(),
      mobile,
      preferredDistrict,
      preferredTaluka,
      requires80GReceipt: Boolean(requires80GReceipt),
      status: 'Pledge Submitted',
    });

    return res.status(201).json({
      success: true,
      message: 'CSR Sponsorship pledge logged successfully!',
      sponsorship,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Get All Recognized CSR Partners & Donor Roll
// @route   GET /api/sponsorship/donor-roll
// @access  Public
export const getDonorRoll = async (req, res, next) => {
  try {
    const donors = await Sponsorship.find({
      status: { $in: ['MoU Signed', 'Funds Received', 'Impact Executed'] },
    })
      .select('companyName packageTier preferredDistrict sponsorshipAmount impactMilestone createdAt')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: donors.length,
      data: donors,
    });
  } catch (error) {
    return next(error);
  }
};