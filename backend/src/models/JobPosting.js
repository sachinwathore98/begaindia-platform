// backend/src/models/JobPosting.js
import mongoose from 'mongoose';

const jobPostingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    location: { type: String, required: true },
    district: { type: String, required: true, default: 'Chhatrapati Sambhajinagar' },
    jobType: {
      type: String,
      enum: ['Full Time', 'Part Time', 'Internship', 'Apprenticeship'],
      default: 'Full Time',
    },
    experienceLevel: { type: String, default: '0-2 Years' },
    salaryRange: { type: String, default: 'Competitive' },
    description: { type: String, required: true },
    contactEmail: { type: String, required: true, lowercase: true },
    contactMobile: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Closed'], default: 'Active' },
    applicants: [
      {
        fullName: String,
        email: String,
        mobile: String,
        resumeUrl: String,
        appliedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const JobPosting =
  mongoose.models.JobPosting || mongoose.model('JobPosting', jobPostingSchema);

export default JobPosting;