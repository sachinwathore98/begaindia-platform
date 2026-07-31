import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, LayoutDashboard } from 'lucide-react';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm p-8 text-center space-y-6">
        
        {/* Warning Icon Badge */}
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-100">
          <ShieldAlert className="w-8 h-8" />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Access Restricted</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            You do not have the required permissions or administrative access to view this resource on BEGAINDIA.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <Link
            to="/dashboard"
            className="w-full py-2.5 bg-[#0A3D91] hover:bg-[#083278] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition shadow-sm"
          >
            <LayoutDashboard className="w-4 h-4" />
            Return to Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}