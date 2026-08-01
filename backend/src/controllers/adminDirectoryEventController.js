import Business from '../models/Business.js';

// Sample in-memory event database store (or bind to your Event Mongoose schema)
let adminEvents = [
  {
    id: 'evt-101',
    title: 'BEGAINDIA National Business Conclave 2026',
    date: '2026-08-25',
    time: '10:00 AM IST',
    location: 'Chhatrapati Sambhajinagar Grand Hall, Maharashtra',
    category: 'Networking',
    description: 'An exclusive gathering of entrepreneurs, startup founders, and business leaders across Maharashtra.',
    status: 'Published',
    registrationsCount: 42,
  },
  {
    id: 'evt-102',
    title: 'Digital Growth & AI Strategy Workshop',
    date: '2026-09-10',
    time: '02:00 PM IST',
    location: 'Online Masterclass (Zoom)',
    category: 'Workshop',
    description: 'Learn how to leverage generative AI, automation, and funnel architecture for corporate scaling.',
    status: 'Published',
    registrationsCount: 18,
  },
];

// ==========================================
// 🏢 BUSINESS DIRECTORY MANAGEMENT
// ==========================================

// @desc    Get All Business Listings for Admin Moderation
// @route   GET /api/admin/directory
// @access  Private/Admin
export const getAdminDirectory = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    let query = {};

    if (status) query.status = status;
    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
      ];
    }

    const businesses = await Business.find(query).populate('user', 'name email mobile').sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: businesses.length,
      data: businesses,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Approve or Reject Company Profile
// @route   PUT /api/admin/directory/:id/status
// @access  Private/Admin
export const updateDirectoryStatus = async (req, res, next) => {
  try {
    const { status, rejectionReason } = req.body; // status: 'Approved' | 'Rejected' | 'Pending'

    const business = await Business.findByIdAndUpdate(
      req.params.id,
      { status, rejectionReason: rejectionReason || '' },
      { new: true }
    );

    if (!business) {
      return res.status(404).json({ success: false, message: 'Business profile not found' });
    }

    return res.status(200).json({
      success: true,
      message: `Business profile set to ${status}!`,
      data: business,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Toggle Featured Company Status
// @route   PUT /api/admin/directory/:id/feature
// @access  Private/Admin
export const toggleFeaturedCompany = async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ success: false, message: 'Business profile not found' });
    }

    business.isFeatured = !business.isFeatured;
    await business.save();

    return res.status(200).json({
      success: true,
      message: `Company ${business.isFeatured ? 'marked as Featured' : 'removed from Featured'}`,
      isFeatured: business.isFeatured,
    });
  } catch (error) {
    return next(error);
  }
};

// ==========================================
// 📅 EVENT MANAGEMENT
// ==========================================

// @desc    Get All Admin Managed Events
// @route   GET /api/admin/events
// @access  Private/Admin
export const getAdminEvents = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      count: adminEvents.length,
      data: adminEvents,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Create New Event
// @route   POST /api/admin/events
// @access  Private/Admin
export const createEvent = async (req, res, next) => {
  try {
    const { title, date, time, location, category, description } = req.body;

    const newEvent = {
      id: `evt-${Date.now()}`,
      title,
      date,
      time,
      location,
      category: category || 'Networking',
      description,
      status: 'Published',
      registrationsCount: 0,
    };

    adminEvents.unshift(newEvent);

    return res.status(201).json({
      success: true,
      message: 'Event created successfully!',
      data: newEvent,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Update Event
// @route   PUT /api/admin/events/:id
// @access  Private/Admin
export const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, date, time, location, category, description, status } = req.body;

    const index = adminEvents.findIndex((e) => e.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    adminEvents[index] = {
      ...adminEvents[index],
      title: title || adminEvents[index].title,
      date: date || adminEvents[index].date,
      time: time || adminEvents[index].time,
      location: location || adminEvents[index].location,
      category: category || adminEvents[index].category,
      description: description || adminEvents[index].description,
      status: status || adminEvents[index].status,
    };

    return res.status(200).json({
      success: true,
      message: 'Event updated successfully!',
      data: adminEvents[index],
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Delete Event
// @route   DELETE /api/admin/events/:id
// @access  Private/Admin
export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    adminEvents = adminEvents.filter((e) => e.id !== id);

    return res.status(200).json({
      success: true,
      message: 'Event deleted successfully!',
    });
  } catch (error) {
    return next(error);
  }
};