import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import {
  User,
  Building2,
  ShieldCheck,
  CreditCard,
  Calendar,
  LogOut,
  PlusCircle,
  QrCode,
  TrendingUp,
  FileText,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 p-5 flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div className="space-y-6">
          {/* Logo / Platform Name */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-tr from-[#0A3D91] to-[#F57C00] rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow">
              B
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-white tracking-tight leading-none">BEGAINDIA</span>
              <span className="text-[9px] font-bold text-[#F57C00] tracking-widest uppercase">Member Portal</span>
            </div>
          </Link>

          {/* Nav Menu Items */}
          <nav className="space-y-1.5 pt-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'overview'
                  ? 'bg-[#0A3D91] text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" /> Overview
            </button>

            <button
              onClick={() => setActiveTab('business')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'business'
                  ? 'bg-[#0A3D91] text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" /> Business Profile
            </button>

            <button
              onClick={() => setActiveTab('membership')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'membership'
                  ? 'bg-[#0A3D91] text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <CreditCard className="w-4 h-4" /> Subscription & Plan
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'events'
                  ? 'bg-[#0A3D91] text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" /> My Event Passes
            </button>
          </nav>
        </div>

        {/* User Profile Footer & Logout */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F57C00] text-white flex items-center justify-center font-bold text-xs uppercase shrink-0">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'User'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2 bg-slate-800 hover:bg-red-600/20 hover:text-red-400 text-slate-400 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 space-y-6 max-w-6xl mx-auto w-full">
        {/* Welcome Top Banner */}
        <div className="bg-gradient-to-r from-[#0A3D91] to-blue-900 text-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 bg-white/10 text-[#F57C00] rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/20">
              BEGAINDIA Member Dashboard
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold mt-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-xs text-slate-200 mt-1">
              Manage your business profile, networking subscriptions, and event access codes.
            </p>
          </div>

          <span className="px-3.5 py-1.5 bg-[#F57C00] text-white font-extrabold rounded-full text-xs uppercase tracking-wider shrink-0 shadow-sm">
            Role: {user?.role || 'User'}
          </span>
        </div>

        {/* Dynamic Tab Views */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Action Alert Banner */}
            {!user?.isVerified && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-4 text-xs text-amber-800">
                <div className="flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>
                    Your business profile verification is currently <strong>Pending</strong>. Complete your business details to publish on the public directory.
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('business')}
                  className="px-3.5 py-1.5 bg-[#F57C00] hover:bg-[#e06f00] text-white font-bold rounded-xl shrink-0 transition"
                >
                  Complete Profile
                </button>
              </div>
            )}

            {/* Quick Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-indigo-600">
                  <span className="text-xs font-semibold text-slate-500">Account Details</span>
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 truncate">{user?.email}</p>
                  <p className="text-xs text-slate-500">{user?.mobile || 'No Mobile Registered'}</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-emerald-600">
                  <span className="text-xs font-semibold text-slate-500">Verification Status</span>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {user?.isVerified ? 'Verified Enterprise' : 'Pending Verification'}
                  </p>
                  <p className="text-xs text-slate-500">Requires Document Upload</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-[#F57C00]">
                  <span className="text-xs font-semibold text-slate-500">Active Membership</span>
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900">Free Tier</p>
                  <button
                    onClick={() => setActiveTab('membership')}
                    className="text-xs font-bold text-[#0A3D91] hover:underline flex items-center gap-1"
                  >
                    Upgrade <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Events Section */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#0A3D91]" />
                  Upcoming BEGAINDIA Summits
                </h2>
                <Link to="/events" className="text-xs font-bold text-[#F57C00] hover:underline">
                  Browse All Events
                </Link>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 bg-blue-100 text-[#0A3D91] rounded-full text-[10px] font-bold uppercase">
                    Summit
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">
                    National MSME Growth & Innovation Conclave 2026
                  </h3>
                  <p className="text-xs text-slate-500">August 25, 2026 • Ch. Sambhajinagar, MH</p>
                </div>
                <Link
                  to="/events"
                  className="px-4 py-2 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-bold rounded-xl shrink-0 transition"
                >
                  Get QR Pass
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Business Profile Tab */}
        {activeTab === 'business' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Business Profile Registration</h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your company information to publish your listing in the BEGAINDIA Business Directory.
              </p>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Business Name</label>
                  <input
                    type="text"
                    placeholder="e.g. SW Digital Hub"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Industry Category</label>
                  <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]">
                    <option>Digital & IT</option>
                    <option>Manufacturing</option>
                    <option>Real Estate</option>
                    <option>Energy & Power</option>
                    <option>Services & Consulting</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Business Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City & Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Ch. Sambhajinagar, MH"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe your products, services, and target clientele..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                />
              </div>

              <button
                type="button"
                className="px-6 py-2.5 bg-[#F57C00] hover:bg-[#e06f00] text-white font-bold rounded-xl text-xs transition shadow"
              >
                Save Business Profile
              </button>
            </form>
          </div>
        )}

        {/* Membership Subscription Tab */}
        {activeTab === 'membership' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Upgrade Subscription Plan</h2>
              <p className="text-xs text-slate-500 mt-1">
                Select a membership tier to unlock B2B directory visibility, event passes, and lead generation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="text-base font-bold text-slate-900">Silver Tier</h3>
                <p className="text-2xl font-extrabold text-[#0A3D91]">₹999 <span className="text-xs font-normal text-slate-500">/mo</span></p>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li>• Standard Directory Listing</li>
                  <li>• 1 General Event Pass</li>
                </ul>
                <button className="w-full py-2 bg-[#0A3D91] text-white text-xs font-bold rounded-xl transition">
                  Subscribe Silver
                </button>
              </div>

              <div className="p-5 bg-orange-50/50 rounded-2xl border border-[#F57C00] space-y-4 relative">
                <span className="absolute -top-2.5 right-4 bg-[#F57C00] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Popular
                </span>
                <h3 className="text-base font-bold text-slate-900">Gold Tier</h3>
                <p className="text-2xl font-extrabold text-[#F57C00]">₹2,499 <span className="text-xs font-normal text-slate-500">/mo</span></p>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li>• Featured Directory Listing</li>
                  <li>• Priority Event Pass Code</li>
                  <li>• Direct B2B Matchmaking</li>
                </ul>
                <button className="w-full py-2 bg-[#F57C00] hover:bg-[#e06f00] text-white text-xs font-bold rounded-xl transition shadow">
                  Subscribe Gold
                </button>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="text-base font-bold text-slate-900">Platinum Tier</h3>
                <p className="text-2xl font-extrabold text-slate-900">₹4,999 <span className="text-xs font-normal text-slate-500">/mo</span></p>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li>• Top VIP Directory Badge</li>
                  <li>• VIP Conclave Summits Pass</li>
                  <li>• Dedicated Relationship Manager</li>
                </ul>
                <button className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-xl transition">
                  Subscribe Platinum
                </button>
              </div>
            </div>
          </div>
        )}

        {/* My Event Passes Tab */}
        {activeTab === 'events' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">My Registered Event QR Passes</h2>
              <p className="text-xs text-slate-500 mt-1">
                Show your digital pass QR code at the event check-in desk for entry.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold uppercase">
                  Pass Active
                </span>
                <h3 className="text-base font-bold text-slate-900">National MSME Growth & Innovation Conclave</h3>
                <p className="text-xs text-slate-500">Date: Aug 25, 2026 | Location: Ch. Sambhajinagar</p>
              </div>

              <div className="w-24 h-24 bg-white p-2 rounded-xl border border-slate-300 flex flex-col items-center justify-center shrink-0 shadow-xs">
                <QrCode className="w-16 h-16 text-slate-800" />
                <span className="text-[9px] font-mono text-slate-500 mt-1">BEGA-2026-88</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}