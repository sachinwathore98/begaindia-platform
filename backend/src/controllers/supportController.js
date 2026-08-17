import mongoose from 'mongoose';

// Support Ticket Schema definition
const supportTicketSchema = new mongoose.Schema(
  {
    ticketId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    membershipNumber: { type: String, default: 'Non-Member / Applicant' },
    businessName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    district: { type: String, required: true },
    taluka: { type: String, required: true },
    problemCategory: {
      type: String,
      required: true,
      enum: [
        'Government / Administrative Issue',
        'Licence / Registration / NOC Issue',
        'GST / Taxation / Compliance Guidance',
        'Employee / Employer / Workplace Dispute',
        'Payment Delay / Commercial Recovery',
        'Cyber Fraud / Digital Payment Scam',
        'Other Genuine Business Concern',
      ],
    },
    description: { type: String, required: true },
    status: {
      type: String,
      default: 'Submitted',
      enum: ['Submitted', 'Under Review', 'Assigned', 'Action / Guidance', 'Closed'],
    },
    assignedExpert: { type: String, default: 'BEGA District Support Cell' },
    officialRemarks: { type: String, default: 'Your request has been logged and assigned to the verification desk.' },
  },
  { timestamps: true }
);

const SupportTicket = mongoose.models.SupportTicket || mongoose.model('SupportTicket', supportTicketSchema);

// Helper to generate Support Request ID (BSR-YEAR-RANDOM)
const generateSupportTicketId = () => {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `BSR-${year}-${randomDigits}`;
};

// @desc    Submit a Business Support / Grievance Request
// @route   POST /api/support/tickets
// @access  Public / Member
export const createSupportTicket = async (req, res, next) => {
  try {
    const {
      fullName,
      membershipNumber,
      businessName,
      mobile,
      email,
      district,
      taluka,
      problemCategory,
      description,
    } = req.body;

    if (!fullName || !businessName || !mobile || !email || !problemCategory || !description) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    const ticketId = generateSupportTicketId();

    const ticket = await SupportTicket.create({
      ticketId,
      fullName,
      membershipNumber: membershipNumber || 'Non-Member / Emerging Business',
      businessName,
      mobile,
      email: email.trim().toLowerCase(),
      district,
      taluka,
      problemCategory,
      description,
      status: 'Submitted',
      assignedExpert: 'BEGA District Support Cell',
      officialRemarks: 'Support request logged successfully. Under initial review by regional coordinator.',
    });

    return res.status(201).json({
      success: true,
      message: 'Business Support Request submitted successfully.',
      ticketId: ticket.ticketId,
      data: ticket,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Track Support Ticket by Ticket ID
// @route   GET /api/support/tickets/:ticketId
// @access  Public
export const getTicketStatus = async (req, res, next) => {
  try {
    const { ticketId } = req.params;

    const ticket = await SupportTicket.findOne({ ticketId: ticketId.trim().toUpperCase() });
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'No support ticket found with this Request ID. Please verify and try again.',
      });
    }

    return res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Admin: Update Ticket Status & Assign Expert
// @route   PUT /api/support/tickets/:ticketId/status
// @access  Private / Admin
export const updateTicketStatus = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    const { status, assignedExpert, officialRemarks } = req.body;

    const ticket = await SupportTicket.findOneAndUpdate(
      { ticketId: ticketId.trim().toUpperCase() },
      { status, assignedExpert, officialRemarks },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Support ticket not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Ticket status and assignment updated successfully.',
      data: ticket,
    });
  } catch (error) {
    return next(error);
  }
};