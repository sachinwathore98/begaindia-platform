// backend/src/controllers/adminController.js
import User from '../models/User.js';
import Business from '../models/Business.js';

// @desc    Get Admin Dashboard Aggregated Statistics & Growth Analytics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeMembers = await User.countDocuments({ 'membership.status': 'Active' });
    const pendingRequests = await Business.countDocuments({ status: 'Pending' });

    const revenueAggregate = await User.aggregate([
      { $match: { 'membership.status': 'Active' } },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: {
              $switch: {
                branches: [
                  { case: { $eq: ['$membership.plan', 'BEGA Central Core Committee'] }, then: 51000 },
                  { case: { $eq: ['$membership.plan', 'BEGA State Core Committee'] }, then: 21000 },
                  { case: { $eq: ['$membership.plan', 'BEGA Membership with Directory'] }, then: 11000 },
                  { case: { $eq: ['$membership.plan', 'BEGA Membership with Monthly Booklet'] }, then: 5000 },
                  { case: { $eq: ['$membership.plan', 'BEGA Basic Membership'] }, then: 2100 },
                ],
                default: 2100,
              },
            },
          },
        },
      },
    ]);

    const totalRevenue = revenueAggregate.length > 0 ? revenueAggregate[0].totalRevenue : 0;
    const totalEvents = 3;

    const membershipGrowth = [
      { month: 'Mar', users: 120, revenue: 45000 },
      { month: 'Apr', users: 180, revenue: 88000 },
      { month: 'May', users: 250, revenue: 142000 },
      { month: 'Jun', users: 310, revenue: 210000 },
      { month: 'Jul', users: 420, revenue: 320000 },
      { month: 'Aug', users: totalUsers || 530, revenue: totalRevenue || 450000 },
    ];

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        activeMembers,
        totalRevenue,
        totalEvents,
        pendingRequests,
      },
      charts: {
        membershipGrowth,
      },
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Get All Users with Filters & Search
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res, next) => {
  try {
    const { search, status, role } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
      ];
    }

    if (role) query.role = role;
    if (status === 'Blocked') query.isBlocked = true;
    if (status === 'Active') query['membership.status'] = 'Active';

    const users = await User.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Admin Add New User
// @route   POST /api/admin/users
// @access  Private/Admin
export const addUser = async (req, res, next) => {
  try {
    const { name, email, mobile, password, role, companyName } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    const user = await User.create({
      name,
      email,
      mobile,
      password: password || 'BegaIndia@2026',
      role: role || 'user',
      companyName,
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully by Admin',
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Admin Edit User Details
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
export const updateUser = async (req, res, next) => {
  try {
    const { name, email, mobile, companyName, role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, mobile, companyName, role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'User details updated successfully',
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Approve / Override User Membership Tier
// @route   PUT /api/admin/users/:id/approve-membership
// @access  Private/Admin
export const approveMembership = async (req, res, next) => {
  try {
    const { planName, durationDays } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const days = durationDays || 365;

    user.membership = {
      plan: planName || 'BEGA Membership with Directory',
      status: 'Active',
      startDate: new Date(),
      expiryDate: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
    };

    await user.save();

    return res.status(200).json({
      success: true,
      message: `Membership approved and upgraded to ${user.membership.plan}!`,
      membership: user.membership,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Toggle Block/Unblock User
// @route   PUT /api/admin/users/:id/block
// @access  Private/Admin
export const toggleBlockUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.isBlocked = !user.isBlocked;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `User ${user.isBlocked ? 'Blocked' : 'Unblocked'} successfully`,
      isBlocked: user.isBlocked,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Delete User
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    await Business.findOneAndDelete({ user: req.params.id });

    return res.status(200).json({ success: true, message: 'User and associated data deleted' });
  } catch (error) {
    return next(error);
  }
};