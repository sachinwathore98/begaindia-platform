import mongoose from 'mongoose';

const businessProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Business category is required'],
      index: true,
    },
    gstNumber: {
      type: String,
      uppercase: true,
      trim: true,
      default: '',
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      index: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
    },
    description: {
      type: String,
      required: [true, 'Company description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    website: {
      type: String,
      trim: true,
      default: '',
    },
    logo: {
      type: String,
      default: '',
    },
    approvalStatus: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('BusinessProfile', businessProfileSchema);