import Notification from '../models/Notification.js';

// @desc    Get Logged-in User's Notifications (User-specific + Broadcasts)
// @route   GET /api/notifications
// @access  Private
export const getMyNotifications = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Fetch notifications directed to this user OR global admin broadcasts (recipient: null)
    const notifications = await Notification.find({
      $or: [{ recipient: userId }, { recipient: null }],
    })
      .sort({ createdAt: -1 })
      .limit(30);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return res.status(200).json({
      success: true,
      unreadCount,
      data: notifications,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Mark Notification as Read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Notification marked as read',
      data: notification,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Create Admin Announcement / Broadcast Notification
// @route   POST /api/notifications/broadcast
// @access  Private (Admin)
export const createBroadcast = async (req, res, next) => {
  try {
    const { title, message, type, link, recipient } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: 'Title and message are required',
      });
    }

    const notification = await Notification.create({
      recipient: recipient || null, // null broadcasts to everyone
      title,
      message,
      type: type || 'Announcement',
      link: link || '',
    });

    return res.status(201).json({
      success: true,
      message: 'Notification broadcast created successfully!',
      data: notification,
    });
  } catch (error) {
    return next(error);
  }
};