import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  amountPaid: { type: Number, default: 0 },
  invoiceNumber: { type: String },
  paidAt: { type: Date, default: Date.now },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Success', 'Failed', 'Refunded'],
    default: 'Pending',
  },
});

const membershipSchema = new mongoose.Schema(
  {
    applicationNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
    },
    membershipPlan: {
      type: String,
      required: true,
      enum: [
        'Basic Membership',
        'Business Membership',
        'Lifetime Membership',
        'Executive Membership',
      ],
      default: 'Business Membership',
    },
    membershipStatus: {
      type: String,
      enum: ['Pending', 'Active', 'Under Review', 'Expired', 'Suspended'],
      default: 'Active',
    },
    district: {
      type: String,
      required: true,
      default: 'Chhatrapati Sambhajinagar',
    },
    taluka: {
      type: String,
      required: true,
      default: 'Aurangabad',
    },
    businessCategory: {
      type: String,
      default: 'Manufacturing & Engineering',
    },
    gstNumber: {
      type: String,
      trim: true,
      default: '',
    },
    udyamNumber: {
      type: String,
      trim: true,
      default: '',
    },
    validTill: {
      type: Date,
      default: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 Year Default
    },
    paymentDetails: paymentSchema,
  },
  { timestamps: true }
);

const Membership =
  mongoose.models.Membership || mongoose.model('Membership', membershipSchema);

export default Membership;