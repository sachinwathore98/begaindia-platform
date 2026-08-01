import User from '../models/User.js';

// Sample Transaction Ledger Data (Simulating live Razorpay/Stripe webhooks & DB logs)
const transactions = [
  {
    id: 'pay_P001',
    orderId: 'bgn_rcpt_1001',
    userName: 'SACHIN SUBHASH WATHORE',
    email: 'sachinwathore7698@gmail.com',
    planName: 'Corporate Membership',
    amount: 9999,
    currency: 'INR',
    paymentStatus: 'Captured',
    paymentMethod: 'Razorpay UPI',
    date: '2026-08-01',
  },
  {
    id: 'pay_P002',
    orderId: 'bgn_rcpt_1002',
    userName: 'Neha Patil',
    email: 'neha.p@swdigitalhub.com',
    planName: 'Premium Membership',
    amount: 2999,
    currency: 'INR',
    paymentStatus: 'Captured',
    paymentMethod: 'Netbanking',
    date: '2026-07-28',
  },
  {
    id: 'pay_P003',
    orderId: 'bgn_rcpt_1003',
    userName: 'Rahul Deshmukh',
    email: 'rahul@trikaenergy.com',
    planName: 'Basic Membership',
    amount: 999,
    currency: 'INR',
    paymentStatus: 'Captured',
    paymentMethod: 'Credit Card',
    date: '2026-07-25',
  },
  {
    id: 'pay_P004',
    orderId: 'bgn_rcpt_1004',
    userName: 'Aniket Sharma',
    email: 'aniket@sharmatech.in',
    planName: 'Premium Membership',
    amount: 2999,
    currency: 'INR',
    paymentStatus: 'Failed',
    paymentMethod: 'Debit Card',
    date: '2026-07-20',
  },
  {
    id: 'pay_P005',
    orderId: 'bgn_rcpt_1005',
    userName: 'Priya Kulkarni',
    email: 'priya@kulkarni-designs.com',
    planName: 'Corporate Membership',
    amount: 9999,
    currency: 'INR',
    paymentStatus: 'Captured',
    paymentMethod: 'Razorpay UPI',
    date: '2026-07-15',
  },
];

// @desc    Get Revenue Financial Analytics & Breakdown
// @route   GET /api/admin/revenue/stats
// @access  Private/Admin
export const getRevenueStats = async (req, res, next) => {
  try {
    const successfulTx = transactions.filter((t) => t.paymentStatus === 'Captured');
    
    const grossRevenue = successfulTx.reduce((acc, curr) => acc + curr.amount, 0);
    const totalTransactions = transactions.length;
    const successfulCount = successfulTx.length;
    const failedCount = totalTransactions - successfulCount;
    const averageOrderValue = successfulCount > 0 ? Math.round(grossRevenue / successfulCount) : 0;

    // Breakdown by Membership Tier
    const tierBreakdown = {
      basic: successfulTx.filter((t) => t.planName.includes('Basic')).reduce((a, c) => a + c.amount, 0),
      premium: successfulTx.filter((t) => t.planName.includes('Premium')).reduce((a, c) => a + c.amount, 0),
      corporate: successfulTx.filter((t) => t.planName.includes('Corporate')).reduce((a, c) => a + c.amount, 0),
    };

    return res.status(200).json({
      success: true,
      stats: {
        grossRevenue,
        totalTransactions,
        successfulCount,
        failedCount,
        averageOrderValue,
      },
      tierBreakdown,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Get Transaction Ledger with Filters
// @route   GET /api/admin/revenue/transactions
// @access  Private/Admin
export const getTransactions = async (req, res, next) => {
  try {
    const { status, plan, search } = req.query;
    let filtered = [...transactions];

    if (status) {
      filtered = filtered.filter((t) => t.paymentStatus.toLowerCase() === status.toLowerCase());
    }

    if (plan) {
      filtered = filtered.filter((t) => t.planName.toLowerCase().includes(plan.toLowerCase()));
    }

    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.id.toLowerCase().includes(query) ||
          t.userName.toLowerCase().includes(query) ||
          t.email.toLowerCase().includes(query)
      );
    }

    return res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    return next(error);
  }
};