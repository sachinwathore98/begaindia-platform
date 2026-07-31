// src/pages/member/MembershipPlans.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { loadRazorpayScript } from '../../utils/loadRazorpay';
import { setCredentials } from '../../store/slices/authSlice';
import { Check, ShieldCheck, Zap, Star, Loader2, AlertCircle } from 'lucide-react';

const PLANS = [
  {
    id: 'BASIC',
    name: 'Basic Networker',
    price: 1999,
    duration: '1 Year',
    features: [
      'Standard Business Directory Listing',
      'Connect with up to 20 Businesses/mo',
      'Access to Public Community Events',
      'Basic Analytics Dashboard',
    ],
    isPopular: false,
  },
  {
    id: 'PREMIUM',
    name: 'Premium Growth',
    price: 4999,
    duration: '1 Year',
    features: [
      'Featured Top-Tier Directory Placement',
      'Unlimited Business Connections',
      'Priority Registration for Premium Expos',
      'Verified Gold Badge on Business Profile',
      'Direct Messaging & Inquiry Leads',
      'Dedicated Customer Support',
    ],
    isPopular: true,
  },
];

export default function MembershipPlans() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loadingPlan, setLoadingPlan] = useState(null);
  const [error, setError] = useState('');

  const handleSubscribe = async (plan) => {
    setLoadingPlan(plan.id);
    setError('');

    // 1. Load Razorpay SDK
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      setError('Razorpay SDK failed to load. Please check your internet connection.');
      setLoadingPlan(null);
      return;
    }

    try {
      // 2. Request backend to create Razorpay Order
      const orderResponse = await apiClient.post('/payments/create-order', {
        planName: plan.id,
        amount: plan.price,
      });

      const { order } = orderResponse;

      // 3. Configure Razorpay Modal Options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_YourKeyHere',
        amount: order.amount,
        currency: order.currency,
        name: 'BEGAINDIA Business Platform',
        description: `Upgrade to ${plan.name}`,
        image: '/logo.png',
        order_id: order.id,
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.mobile || '',
        },
        theme: {
          color: '#4F46E5', // Indigo-600
        },
        handler: async function (response) {
          try {
            // 4. Verify payment signature on backend
            const verifyRes = await apiClient.post('/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.success) {
              // Update local Redux state with upgraded role
              const updatedUser = { ...user, role: 'PREMIUM_MEMBER' };
              dispatch(setCredentials({ user: updatedUser, token }));

              // Redirect to Dashboard
              navigate('/dashboard', { state: { paymentSuccess: true } });
            }
          } catch (err) {
            setError(err.message || 'Payment verification failed.');
          } finally {
            setLoadingPlan(null);
          }
        },
        modal: {
          ondismiss: function () {
            setLoadingPlan(null);
          },
        },
      };

      const razorpayWindow = new window.Razorpay(options);
      razorpayWindow.open();
    } catch (err) {
      setError(err.message || 'Failed to initialize payment process.');
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">
            Membership Plans
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Accelerate Your Business Network
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
            Choose a plan to unlock high-intent business leads, verified company status, and networking expos.
          </p>
        </div>

        {error && (
          <div className="max-w-xl mx-auto p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-600">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-4">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl p-8 border ${
                plan.isPopular
                  ? 'border-indigo-600 ring-2 ring-indigo-600/20 shadow-xl'
                  : 'border-slate-200/80 shadow-sm'
              } flex flex-col justify-between space-y-6`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 right-8 bg-indigo-600 text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide flex items-center gap-1 shadow-md">
                  <Star className="w-3 h-3 fill-current" /> Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Billed annually</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900">₹{plan.price.toLocaleString()}</span>
                  <span className="text-xs font-semibold text-slate-500">/ {plan.duration}</span>
                </div>

                <ul className="space-y-3 pt-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSubscribe(plan)}
                disabled={loadingPlan === plan.id || user?.role === 'PREMIUM_MEMBER'}
                className={`w-full py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  user?.role === 'PREMIUM_MEMBER'
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : plan.isPopular
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {loadingPlan === plan.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : user?.role === 'PREMIUM_MEMBER' ? (
                  'Current Plan Active'
                ) : (
                  <>
                    <Zap className="w-4 h-4" /> Subscribe Now
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}