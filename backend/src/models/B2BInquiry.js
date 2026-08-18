import mongoose from 'mongoose';

const b2bInquirySchema = new mongoose.Schema(
  {
    inquiryId: { type: String, required: true, unique: true },
    receiverBusinessId: { type: String, required: true },
    receiverCompanyName: { type: String, required: true },
    receiverEmail: { type: String, required: true },

    // Sender Details
    senderName: { type: String, required: true },
    senderCompanyName: { type: String, required: true },
    senderEmail: { type: String, required: true },
    senderMobile: { type: String, required: true },
    senderMembershipNumber: { type: String, default: 'Unregistered Visitor' },
    isSenderVerified: { type: Boolean, default: false },

    // Inquiry Classification
    inquiryType: {
      type: String,
      required: true,
      enum: ['Product Sourcing', 'Dealership / Distributorship', 'Joint Venture', 'Vendor Supply', 'Service Requirement'],
    },
    productOrServiceRequired: { type: String, required: true },
    estimatedBudget: { type: String, default: 'Negotiable' },
    message: { type: String, required: true },

    status: {
      type: String,
      enum: ['New Lead', 'Contacted', 'In Discussion', 'Deal Concluded', 'Archived'],
      default: 'New Lead',
    },
  },
  { timestamps: true }
);

const B2BInquiry = mongoose.models.B2BInquiry || mongoose.model('B2BInquiry', b2bInquirySchema);
export default B2BInquiry;