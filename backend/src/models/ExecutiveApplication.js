// backend/src/models/ExecutiveApplication.js
import mongoose from 'mongoose';

const executiveApplicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    mobile: { type: String, required: true },
    businessName: { type: String, required: true },
    committeeLevel: {
      type: String,
      required: true,
      enum: [
        'Central Core Committee',
        'State Core Committee',
        'Regional Karyakarini',
        'District Karyakarini',
        'Taluka Karyakarini',
        'Mahila Karyakarini (Women)',
        'Yuva Karyakarini (Youth)',
        'Regular Karyakarini',
      ],
    },
    district: { type: String, required: true },
    taluka: { type: String, required: true },
    experienceYears: { type: Number, default: 0 },
    visionStatement: { type: String, required: true },
    selectionStage: {
      type: String,
      default: 'Application',
      enum: [
        'Application',
        'Eligibility Check',
        'Verification',
        'Interview / Discussion',
        'Selection',
        'Approval',
        'Appointment',
        'Performance Review',
        'Rejected',
      ],
    },
    officialRemarks: { type: String, default: 'Application received and pending eligibility verification.' },
  },
  { timestamps: true }
);

const ExecutiveApplication =
  mongoose.models.ExecutiveApplication ||
  mongoose.model('ExecutiveApplication', executiveApplicationSchema);

export default ExecutiveApplication;