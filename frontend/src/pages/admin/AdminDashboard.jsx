// frontend/src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Users,
  Building2,
  DollarSign,
  ShieldCheck,
  AlertCircle,
  FileText,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';
const API_URL = API_BASE.replace(/\/$/, '');

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeMembers: 0,
    totalRevenue: 0,
    totalEvents: 3,
    pendingRequests: 0,
  });

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data?.success) {
          setStats(res.data.stats);
        }
      } catch (err) {
        console.error('Failed to load admin stats', err);
      }
    };
    fetchAdminStats();
  }, []);

  return (
    <div className="space-y-8 font-sans">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0A3D91] to-blue-800 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <span className="px-3 py-1 bg-amber-400/20 text-amber-300 text-[10px] font-black rounded-full uppercase tracking-widest border border-amber-400/30">
            Master Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">BEGAINDIA Administration Portal</h1>
          <p className="text-xs sm:text-sm text-slate-200">
            Manage member verifications, moderate directory listings, oversee revenue, and update public CMS notices.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/directory"
            className="px-5 py-2.5 bg-[#F57C00] hover:bg-[#e06f00] text-white font-extrabold text-xs rounded-xl shadow transition"
          >
            Moderate Directory ({stats.pendingRequests})
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0A3D91] flex items-center justify-center font-black">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Live Sync</span>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">{stats.totalUsers}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Registered Users</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#F57C00] flex items-center justify-center font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Active Tier</span>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">{stats.activeMembers}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Paid Members</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Razorpay Live</span>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">₹{stats.totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Gross Platform Revenue</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center font-black">
              <AlertCircle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">Action Req</span>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">{stats.pendingRequests}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Pending Directory Profiles</p>
          </div>
        </div>
      </div>

      {/* Quick Navigation Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/users"
          className="p-6 bg-white border border-slate-200 rounded-3xl space-y-3 hover:shadow-md transition group"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0A3D91] flex items-center justify-center group-hover:scale-105 transition">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-900">Manage Members & Users</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Search member records, update membership tiers, and manage account statuses across all 36 districts.
          </p>
        </Link>

        <Link
          to="/admin/directory"
          className="p-6 bg-white border border-slate-200 rounded-3xl space-y-3 hover:shadow-md transition group"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F57C00] flex items-center justify-center group-hover:scale-105 transition">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-900">Directory & Company Approvals</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Review business profile submissions, inspect GSTIN details, and toggle featured directory statuses.
          </p>
        </Link>

        <Link
          to="/admin/cms"
          className="p-6 bg-white border border-slate-200 rounded-3xl space-y-3 hover:shadow-md transition group"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 transition">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-900">CMS & Notice Ticker</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Update homepage hero headlines, publish breaking live broadcast notices, and manage press releases.
          </p>
        </Link>
      </div>
    </div>
  );
}