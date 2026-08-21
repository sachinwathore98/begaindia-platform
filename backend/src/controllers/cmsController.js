// backend/src/controllers/cmsController.js
import NoticeAlert from '../models/NoticeAlert.js';
import NewsRelease from '../models/NewsRelease.js';
import Notification from '../models/Notification.js';

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

// @desc    Admin: Create or Update Alert Notice & Broadcast to Members
// @route   POST /api/cms/notices
// @access  Private / Admin
export const createNotice = async (req, res, next) => {
  try {
    const { title, message, type, actionLink, actionText } = req.body;
    
    const notice = await NoticeAlert.create({
      title,
      message,
      type: type || 'General Announcement',
      actionLink: actionLink || '',
      actionText: actionText || 'Learn More',
      isActive: true,
    });

    // Automatically push global notification broadcast to all member dashboards instantly
    await Notification.create({
      recipient: null,
      title: `Notice: ${title}`,
      message,
      type: 'Announcement',
      link: actionLink || '',
    });

    return res.status(201).json({
      success: true,
      message: 'Notice published and broadcasted to all member dashboards successfully!',
      data: notice,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Admin: Delete Notice
// @route   DELETE /api/cms/notices/:id
// @access  Private / Admin
export const deleteNotice = async (req, res, next) => {
  try {
    await NoticeAlert.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Notice removed successfully.' });
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