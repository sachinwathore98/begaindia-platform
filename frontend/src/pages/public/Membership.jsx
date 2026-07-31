// frontend/src/pages/public/Membership.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Membership() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const comparison = [
    { feature: 'Directory Listing', silver: 'Standard', gold: 'Featured', platinum: 'VIP Top-Tier' },
    { feature: 'B2B Networking Meets Access', silver: 'General Meets', gold: 'Priority Passes', platinum: 'VIP Pass & Summits' },
    { feature: 'Direct Business Matchmaking', silver: false, gold: true, platinum: true },
    { feature: 'Dedicated Relationship Manager', silver: false, gold: false, platinum: true },
    { feature: 'Banner & Social Promotions', silver: false, gold: '1 Campaign/mo', platinum: '3 Campaigns/mo' },
    { feature: 'Event QR Pass Allocation', silver: '1 Pass/Event', gold: '2 Passes/Event', platinum: '5 Passes/Event' },
    { feature: 'Investor & Partner Connect Sessions', silver: false, gold: false, platinum: true },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3 py-1 bg-orange-100 text-[#F57C00] rounded-full text-xs font-bold uppercase tracking-widest">
          Subscription Tiers
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Unlock the Full Power of BEGAINDIA
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Choose a tier that matches your business objectives. Scale up anytime as your network and revenue grow.
        </p>

        {/* Toggle */}
        <div className="pt-6 flex items-center justify-center gap-3">
          <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')}
            className="w-12 h-6 bg-slate-200 rounded-full p-1 relative transition"
          >
            <div
              className={`w-4 h-4 bg-[#F57C00] rounded-full transition-transform ${
                billingCycle === 'annually' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-semibold ${billingCycle === 'annually' ? 'text-slate-900' : 'text-slate-400'}`}>
            Annual Billing <span className="text-[#F57C00] font-bold">(Save 20%)</span>
          </span>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="p-5 text-xs font-bold text-slate-900 uppercase">Features & Benefits</th>
                <th className="p-5 text-center text-sm font-bold text-slate-800">
                  Silver <br />
                  <span className="text-xs font-normal text-slate-500">
                    {billingCycle === 'monthly' ? '₹999/mo' : '₹9,999/yr'}
                  </span>
                </th>
                <th className="p-5 text-center text-sm font-bold text-[#F57C00] bg-orange-50/50">
                  Gold (Popular) <br />
                  <span className="text-xs font-normal text-slate-500">
                    {billingCycle === 'monthly' ? '₹2,499/mo' : '₹24,999/yr'}
                  </span>
                </th>
                <th className="p-5 text-center text-sm font-bold text-[#0A3D91]">
                  Platinum <br />
                  <span className="text-xs font-normal text-slate-500">
                    {billingCycle === 'monthly' ? '₹4,999/mo' : '₹49,999/yr'}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {comparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition">
                  <td className="p-4 font-semibold text-slate-800">{row.feature}</td>
                  
                  {/* Silver */}
                  <td className="p-4 text-center">
                    {typeof row.silver === 'boolean' ? (
                      row.silver ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />
                    ) : (
                      <span className="text-slate-700 font-medium">{row.silver}</span>
                    )}
                  </td>

                  {/* Gold */}
                  <td className="p-4 text-center bg-orange-50/20 font-medium text-[#F57C00]">
                    {typeof row.gold === 'boolean' ? (
                      row.gold ? <Check className="w-4 h-4 text-[#F57C00] mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />
                    ) : (
                      <span>{row.gold}</span>
                    )}
                  </td>

                  {/* Platinum */}
                  <td className="p-4 text-center font-medium text-[#0A3D91]">
                    {typeof row.platinum === 'boolean' ? (
                      row.platinum ? <Check className="w-4 h-4 text-[#0A3D91] mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />
                    ) : (
                      <span>{row.platinum}</span>
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="p-4"></td>
                <td className="p-4 text-center">
                  <Link to="/register" className="inline-block px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold transition">
                    Select Silver
                  </Link>
                </td>
                <td className="p-4 text-center bg-orange-50/20">
                  <Link to="/register" className="inline-block px-4 py-2 bg-[#F57C00] hover:bg-[#e06f00] text-white rounded-xl font-bold transition shadow-md">
                    Select Gold
                  </Link>
                </td>
                <td className="p-4 text-center">
                  <Link to="/register" className="inline-block px-4 py-2 bg-[#0A3D91] hover:bg-[#083278] text-white rounded-xl font-bold transition">
                    Select Platinum
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}