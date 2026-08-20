import NoticeAlert from '../models/NoticeAlert.js';
import NewsRelease from '../models/NewsRelease.js';

// @desc    Get Active Notices for Frontend Marquee / Header Alert
// @route   GET /api/cms/notices/active
// @access  Public
export const getActiveNotices = async (req, res, next) => {
  try {
    const notices = await NoticeAlert.find({ isActive: true }).sort({ priority: -1, createdAt: -1 });
    return res.status(200).json({ success: true, count: notices.length, data: notices });
  } catch (error) {
    return next(error);
  }
};

// @desc    Admin: Create or Update Alert Notice
// @route   POST /api/cms/notices
// @access  Private / Admin
export const createNotice = async (req, res, next) => {
  try {
    const notice = await NoticeAlert.create(req.body);
    return res.status(201).json({ success: true, message: 'Notice alert published!', data: notice });
  } catch (error) {
    return next(error);
  }
};

// @desc    Admin: Toggle or Delete Notice
// @route   DELETE /api/cms/notices/:id
// @access  Private / Admin
export const deleteNotice = async (req, res, next) => {
  try {
    await NoticeAlert.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Notice removed.' });
  } catch (error) {
    return next(error);
  }
};

// @desc    Get All News & Media Releases
// @route   GET /api/cms/news
// @access  Public
export const getAllNews = async (req, res, next) => {
  try {
    const news = await NewsRelease.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: news.length, data: news });
  } catch (error) {
    return next(error);
  }
};

// @desc    Admin: Publish News / Press Release
// @route   POST /api/cms/news
// @access  Private / Admin
export const createNewsRelease = async (req, res, next) => {
  try {
    const news = await NewsRelease.create(req.body);
    return res.status(201).json({ success: true, message: 'News release published!', data: news });
  } catch (error) {
    return next(error);
  }
};

// @desc    Admin: Delete News Release
// @route   DELETE /api/cms/news/:id
// @access  Private / Admin
export const deleteNewsRelease = async (req, res, next) => {
  try {
    await NewsRelease.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'News release deleted.' });
  } catch (error) {
    return next(error);
  }
};