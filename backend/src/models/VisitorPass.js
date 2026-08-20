import mongoose from 'mongoose';

const visitorPassSchema = new mongoose.Schema(
  {
    passId: { type: String, required: true, unique: true, index: true },
    passType: {
      type: String,
      required: true,
      enum: ['Free Trade Visitor Pass', 'VIP Delegate Conclave Pass'],
    },
    fullName: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    mobile: { type: String, required: true, trim: true },
    district: { type: String, required: true },
    designation: { type: String, default: 'Business Owner' },
  },
  { timestamps: true }
);

const VisitorPass = mongoose.models.VisitorPass || mongoose.model('VisitorPass', visitorPassSchema);
export default VisitorPass;