// backend/src/controllers/careerController.js
import JobPosting from '../models/JobPosting.js';

// @desc    Get All Active Job Postings
// @route   GET /api/career/jobs
// @access  Public
export const getJobListings = async (req, res, next) => {
  try {
    const { district, jobType, search } = req.query;
    let query = { status: 'Active' };

    if (district && district !== 'All') query.district = district;
    if (jobType && jobType !== 'All') query.jobType = jobType;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const jobs = await JobPosting.find(query).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    return next(error);
  }
};

// @desc    Create a Job Posting (Employers & MSMEs)
// @route   POST /api/career/jobs
// @access  Private
export const createJobPosting = async (req, res, next) => {
  try {
    const { title, companyName, location, district, jobType, experienceLevel, salaryRange, description, contactEmail, contactMobile } = req.body;

    const job = await JobPosting.create({
      title,
      companyName,
      postedBy: req.user?._id,
      location,
      district: district || 'Chhatrapati Sambhajinagar',
      jobType: jobType || 'Full Time',
      experienceLevel,
      salaryRange,
      description,
      contactEmail,
      contactMobile,
    });

    return res.status(201).json({
      success: true,
      message: 'Job posting published live on BEGA Job & Career Connect!',
      data: job,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Apply for a Job Opening
// @route   POST /api/career/apply/:jobId
// @access  Public
export const applyForJob = async (req, res, next) => {
  try {
    const { fullName, email, mobile, resumeUrl } = req.body;
    const job = await JobPosting.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job posting not found.' });
    }

    job.applicants.push({ fullName, email, mobile, resumeUrl });
    await job.save();

    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully to employer!',
    });
  } catch (error) {
    return next(error);
  }
};