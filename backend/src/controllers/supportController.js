// backend/src/controllers/supportController.js
import mongoose from 'mongoose';

const SUPPORT_DESKS = [
  'Business Growth Desk',
  'MSME & Startup Desk',
  'Government Scheme Desk',
  'GST & Tax Awareness Desk',
  'Legal Awareness Desk',
  'Employer Support Desk',
  'Payment Delay Support Desk',
  'Digital Business Desk',
  'Cyber Awareness Desk',
  'Women Entrepreneur Desk',
  'Youth Entrepreneur Desk',
  'Business Networking Desk',
  'Training & Skill Development Desk',
  'Market Linkage Desk',
];

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
      enum: SUPPORT_DESKS,
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

const generateSupportTicketId = () => {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `BSR-${year}-${randomDigits}`;
};

// @desc    Create new BSR ticket
// @route   POST /api/support/ticket
// @access  Public
export const createSupportTicket = async (req, res, next) => {
  try {
    const { fullName, membershipNumber, businessName, mobile, email, district, taluka, problemCategory, description } = req.body;

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

// @desc    Get status of single ticket by ID
// @route   GET /api/support/ticket/:ticketId
// @access  Public
export const getTicketStatus = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    const ticket = await SupportTicket.findOne({ ticketId: ticketId.trim().toUpperCase() });
    if (!ticket) return res.status(404).json({ success: false, message: 'No support ticket found with this Request ID.' });

    return res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    return next(error);
  }
};

// @desc    Update ticket status and remarks
// @route   PUT /api/support/ticket/:ticketId
// @access  Private/Admin
export const updateTicketStatus = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    const { status, assignedExpert, officialRemarks } = req.body;

    const ticket = await SupportTicket.findOneAndUpdate(
      { ticketId: ticketId.trim().toUpperCase() },
      { status, assignedExpert, officialRemarks },
      { new: true }
    );

    if (!ticket) return res.status(404).json({ success: false, message: 'Support ticket not found.' });

    return res.status(200).json({ success: true, message: 'Ticket status and assignment updated successfully.', data: ticket });
  } catch (error) {
    return next(error);
  }
};

// @desc    Get all tickets for Admin triage
// @route   GET /api/support/tickets/all
// @access  Private/Admin
export const getAllTickets = async (req, res, next) => {
  try {
    const tickets = await SupportTicket.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: tickets.length, data: tickets });
  } catch (error) {
    return next(error);
  }
};