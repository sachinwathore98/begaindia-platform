// backend/src/models/Mentorship.js
import mongoose from 'mongoose';

const mentorshipSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    mobile: { type: String, required: true },
    businessName: { type: String, required: true },
    roleType: {
      type: String,
      required: true,
      enum: ['Mentor (Experienced Entrepreneur)', 'Mentee (New/Emerging Founder)'],
    },
    guidanceArea: {
      type: String,
      required: true,
      enum: [
        'Business Planning',
        'Sales & Marketing',
        'Finance & Working Capital',
        'Team & HR Management',
        'Branding & Visibility',
        'Business Expansion',
      ],
    },
    experienceYears: { type: Number, default: 1 },
    objectiveSummary: { type: String, required: true },
    pairingStatus: {
      type: String,
      default: 'Awaiting Match',
      enum: ['Awaiting Match', 'Matched', 'Active Guidance', 'Completed'],
    },
    assignedPartner: { type: String, default: 'Pending Panel Assignment' },
  },
  { timestamps: true }
);

const Mentorship =
  mongoose.models.Mentorship || mongoose.model('Mentorship', mentorshipSchema);

export default Mentorship;