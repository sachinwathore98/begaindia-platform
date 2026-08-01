import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CheckBadgeIcon,
  SparklesIcon,
  CreditCardIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const API_URL = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';

const PLANS = [
  {
    key: 'basic',
    name: 'Basic Membership',
    monthlyPrice: 999,
    features: ['Directory Business Listing', 'Access to Networking Events', 'Member Dashboard'],
    badgeColor: 'bg-slate-100 text-slate-800',
  },
  {
    key: 'premium',
    name: 'Premium Membership',
    monthlyPrice: 2999,
    features: ['Featured Business Listing', 'Event Pass Discounts', 'Digital Brochure & Promotion', 'Direct Lead Generation'],
    badgeColor: 'bg-blue-900 text-white',
    popular: true,
  },
  {
    key: 'corporate',
    name: 'Corporate Membership',
    monthlyPrice: 9999,
    features: ['VIP Conclave Passes', 'Dedicated Relationship Manager', 'Global Partnership Desk', 'Sponsorship Opportunities'],
    badgeColor: 'bg-amber-500 text-slate-900',
  },
];

export default function MembershipModule() {
  const [duration, setDuration] = useState('monthly'); // 'monthly' | 'quarterly' | 'yearly'
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Inject Razorpay Checkout SDK Script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/payment/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setHistory(res.data.data);
    } catch (err) {
      console.error('Failed to load payment history:', err);
    }
  };

  const handleSubscribe = async (planKey) => {
    try {
      setLoading(true);

      // 1. Create Order
      const orderRes = await axios.post(
        `${API_URL}/api/payment/create-order`,
        { planKey, duration },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { orderId, amount, currency, key, planName } = orderRes.data;

      // 2. Open Razorpay Modal
      const options = {
        key: key || 'rzp_test_dummy_key',
        amount,
        currency,
        name: 'BEGAINDIA Network',
        description: `Upgrade to ${planName}`,
        order_id: orderId,
        handler: async (response) => {
          // 3. Verify Payment Signature
          const verifyRes = await axios.post(
            `${API_URL}/api/payment/verify`,
            {
              ...response,
              planName,
              duration,
              amount,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (verifyRes.data.success) {
            alert(`🎉 ${verifyRes.data.message}`);
            fetchPaymentHistory();
          }
        },
        theme: { color: '#0A3D91' },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      alert(err.response?.data?.message || 'Payment initiation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      
      {/* Header & Duration Selector */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Membership Plans & Subscriptions</h1>
          <p className="text-slate-500 text-sm">Choose the right business membership to unlock direct leads and event perks.</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          {['monthly', 'quarterly', 'yearly'].map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition ${
                duration === d ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {d} {d === 'yearly' && '(20% OFF)'}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => {
          let price = plan.monthlyPrice;
          if (duration === 'quarterly') price = Math.round(plan.monthlyPrice * 2.7);
          if (duration === 'yearly') price = Math.round(plan.monthlyPrice * 9.5);

          return (
            <div
              key={plan.key}
              className={`bg-white p-6 rounded-2xl border ${
                plan.popular ? 'border-blue-900 shadow-md ring-2 ring-blue-900/10' : 'border-slate-200 shadow-sm'
              } flex flex-col justify-between space-y-6 relative`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                  <SparklesIcon className="w-3 h-3 text-orange-400" /> Most Popular
                </span>
              )}

              <div className="space-y-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${plan.badgeColor}`}>
                  {plan.name}
                </span>

                <div>
                  <span className="text-3xl font-extrabold text-slate-900">₹{price.toLocaleString('en-IN')}</span>
                  <span className="text-slate-500 text-xs font-medium">/{duration}</span>
                </div>

                <ul className="space-y-2.5 pt-2">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckBadgeIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSubscribe(plan.key)}
                disabled={loading}
                className="w-full py-3 bg-blue-900 text-white font-bold text-sm rounded-xl hover:bg-blue-800 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <CreditCardIcon className="w-4 h-4" /> Buy / Upgrade Plan
              </button>
            </div>
          );
        })}
      </div>

      {/* Payment History Log */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <ClockIcon className="w-6 h-6 text-blue-900" />
          Payment & Transaction History
        </div>

        {history.length === 0 ? (
          <p className="text-sm text-slate-500 py-4 text-center">No transactions recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b">
                <tr>
                  <th className="p-3">Transaction ID</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {history.map((tx, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-mono font-semibold">{tx.id}</td>
                    <td className="p-3 font-semibold text-slate-900">{tx.planName}</td>
                    <td className="p-3 font-bold text-slate-900">₹{tx.amount}</td>
                    <td className="p-3">{tx.date}</td>
                    <td className="p-3">
                      <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-bold">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}