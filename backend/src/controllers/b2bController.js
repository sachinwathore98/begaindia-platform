import B2BInquiry from '../models/B2BInquiry.js';

// @desc    Send a Structured B2B Matchmaking Inquiry
// @route   POST /api/b2b/inquiries
// @access  Public / Member
export const sendB2BInquiry = async (req, res, next) => {
  try {
    const {
      receiverBusinessId,
      receiverCompanyName,
      receiverEmail,
      senderName,
      senderCompanyName,
      senderEmail,
      senderMobile,
      senderMembershipNumber,
      isSenderVerified,
      inquiryType,
      productOrServiceRequired,
      estimatedBudget,
      message,
    } = req.body;

    const year = new Date().getFullYear();
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const inquiryId = `B2B-${year}-${randomCode}`;

    const inquiry = await B2BInquiry.create({
      inquiryId,
      receiverBusinessId,
      receiverCompanyName,
      receiverEmail: receiverEmail.trim().toLowerCase(),
      senderName,
      senderCompanyName,
      senderEmail: senderEmail.trim().toLowerCase(),
      senderMobile,
      senderMembershipNumber: senderMembershipNumber || 'Unregistered Visitor',
      isSenderVerified: Boolean(isSenderVerified),
      inquiryType,
      productOrServiceRequired,
      estimatedBudget,
      message,
      status: 'New Lead',
    });

    return res.status(201).json({
      success: true,
      message: 'Your B2B Introduction request has been delivered to the business owner!',
      inquiry,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Get Received B2B Inquiries for Member Dashboard
// @route   GET /api/b2b/inquiries/received
// @access  Private / Member
export const getReceivedInquiries = async (req, res, next) => {
  try {
    const { email, businessId } = req.query;
    let filter = {};

    if (email) filter.receiverEmail = email.trim().toLowerCase();
    if (businessId) filter.receiverBusinessId = businessId;

    const inquiries = await B2BInquiry.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Update B2B Inquiry Status
// @route   PUT /api/b2b/inquiries/:id/status
// @access  Private / Member
export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const inquiry = await B2BInquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    return res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    return next(error);
  }
};