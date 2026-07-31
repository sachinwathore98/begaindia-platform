import React from 'react';
import { useSelector } from 'react-redux';
import { User, Shield, Building2 } from 'lucide-react';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              BEGAINDIA Business Networking Dashboard
            </p>
          </div>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold uppercase tracking-wider">
            {user?.role || 'User'}
          </span>
        </div>

        {/* User Details Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-indigo-600">
              <User className="w-5 h-5" />
              <span className="text-xs font-semibold">Account Info</span>
            </div>
            <p className="text-sm font-medium text-slate-800">{user?.email}</p>
            <p className="text-xs text-slate-500">{user?.mobile}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-emerald-600">
              <Shield className="w-5 h-5" />
              <span className="text-xs font-semibold">Verification Status</span>
            </div>
            <p className="text-sm font-medium text-slate-800">
              {user?.isVerified ? 'Verified Account' : 'Pending Verification'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-blue-600">
              <Building2 className="w-5 h-5" />
              <span className="text-xs font-semibold">Business Profile</span>
            </div>
            <p className="text-sm font-medium text-slate-800">Get Started</p>
          </div>
        </div>
      </div>
    </div>
  );
}