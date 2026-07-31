// src/pages/member/MemberDashboard.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Building2, CreditCard, ShieldCheck, Plus, ExternalLink } from 'lucide-react';

export default function MemberDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[11px] font-bold rounded-full uppercase tracking-wider">
              {user?.role || 'Member'} Account
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Welcome, {user?.name || 'User'}!
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage your company listing, subscription tier, and networking status.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/create-business"
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/20 transition"
            >
              <Plus className="w-4 h-4" /> Add / Edit Business
            </Link>
          </div>
        </div>

        {/* Quick Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <Building2 className="w-6 h-6 text-indigo-600" />
              <span className="text-[11px] font-bold text-slate-400">STATUS</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Business Profile</h3>
              <p className="text-xs text-slate-500 mt-0.5">Register or edit your company listing.</p>
            </div>
            <Link to="/create-business" className="text-xs font-semibold text-indigo-600 flex items-center gap-1 hover:underline pt-2">
              Manage Profile <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <CreditCard className="w-6 h-6 text-indigo-600" />
              <span className="text-[11px] font-bold text-slate-400">TIER</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Membership Tier</h3>
              <p className="text-xs text-slate-500 mt-0.5">Current plan: {user?.role === 'PREMIUM_MEMBER' ? 'Premium Member' : 'Standard Visitor'}</p>
            </div>
            <Link to="/membership" className="text-xs font-semibold text-indigo-600 flex items-center gap-1 hover:underline pt-2">
              Upgrade Membership <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <ShieldCheck className="w-6 h-6 text-indigo-600" />
              <span className="text-[11px] font-bold text-slate-400">DIRECTORY</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Explore Network</h3>
              <p className="text-xs text-slate-500 mt-0.5">Search verified companies across India.</p>
            </div>
            <Link to="/directory" className="text-xs font-semibold text-indigo-600 flex items-center gap-1 hover:underline pt-2">
              Open Directory <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}