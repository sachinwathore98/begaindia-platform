import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      trim: true,
      default: '',
    },
    designation: {
      type: String,
      trim: true,
      default: '',
    },
    gstNumber: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      default: 'Information Technology',
    },
    address: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    logo: {
      type: String,
      default: '',
    },
    brochure: {
      type: String,
      default: '',
    },
    gallery: {
      type: [String],
      default: [],
    },
    documents: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Business = mongoose.model('Business', businessSchema);
export default Business;