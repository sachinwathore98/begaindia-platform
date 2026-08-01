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
  QrCode,
  Lock,
  Mail,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MapPin,
  Clock,
  Zap,
  ArrowRight,
  PlusCircle,
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dashboard Sidebar Navigation State
  const [activeTab, setActiveTab] = useState('events'); // Default active tab is Events & Passes

  // Claimed Event Passes State
  const [claimedPasses, setClaimedPasses] = useState(['EVT-101']); // Pre-claimed 1 pass for demo

  // Business Profile Form State
  const [companyName, setCompanyName] = useState('SW Digital Hub');
  const [category, setCategory] = useState('Digital & IT');
  const [mobile, setMobile] = useState('+91 8390876752');
  const [city, setCity] = useState('Chhatrapati Sambhajinagar, MH');
  const [description, setDescription] = useState('Full-service digital marketing agency, performance advertising, and software solutions.');
  const [logoUrl, setLogoUrl] = useState('/logo.png');
  const [profileSaved, setProfileSaved] = useState(false);

  // Security & Password OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Sample Upcoming Events Catalog inside Dashboard
  const upcomingEvents = [
    {
      id: 'EVT-101',
      title: 'National MSME Growth & Innovation Conclave 2026',
      date: 'August 25, 2026',
      time: '10:00 AM - 05:00 PM',
      location: 'Chhatrapati Sambhajinagar, MH',
      type: 'Summit & Conclave',
      passCode: 'BEGA-2026-881',
      description: 'Keynote panels with industrial leaders, B2B investor speed-networking, and startup pitch showcase.',
    },
    {
      id: 'EVT-102',
      title: 'B2B Founders & Traders Regional Meetup',
      date: 'September 10, 2026',
      time: '02:00 PM - 07:00 PM',
      location: 'Mumbai, MH',
      type: 'Networking Meet',
      passCode: 'BEGA-2026-902',
      description: 'Structured 1-on-1 business matching designed for manufacturers, suppliers, and regional distributors.',
    },
    {
      id: 'EVT-103',
      title: 'Digital Transformation & AI for Indian MSMEs',
      date: 'September 18, 2026',
      time: '04:00 PM - 06:00 PM',
      location: 'Online Live Masterclass',
      type: 'Webinar',
      passCode: 'BEGA-2026-303',
      description: 'Mastering digital growth funnels, automated customer acquisition, and modern technology adoption.',
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleClaimPass = (eventId) => {
    if (!claimedPasses.includes(eventId)) {
      setClaimedPasses([...claimedPasses, eventId]);
    }
  };

  const handleSaveBusinessProfile = (e) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 4000);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleVerifyAndChangePassword = (e) => {
    e.preventDefault();
    if (enteredOtp === '123456' || enteredOtp.length === 6) {
      setPasswordSuccess(true);
      setOtpSent(false);
      setEnteredOtp('');
      setNewPassword('');
      setTimeout(() => setPasswordSuccess(false), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 p-5 flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div className="space-y-6">
          {/* Logo / Portal Branding */}
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-tr from-[#0A3D91] to-[#F57C00] rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow">
              B
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-white tracking-tight leading-none">BEGAINDIA</span>
              <span className="text-[9px] font-bold text-[#F57C00] tracking-widest uppercase">Member Portal</span>
            </div>
          </Link>

          {/* Navigation Options */}
          <nav className="space-y-1.5 pt-4">
            <button
              onClick={() => setActiveTab('events')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'events'
                  ? 'bg-[#0A3D91] text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#F57C00]" /> Events & Entry Passes
            </button>

            <button
              onClick={() => setActiveTab('membership')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'membership'
                  ? 'bg-[#0A3D91] text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <CreditCard className="w-4 h-4" /> Subscription Plans
            </button>

            <button
              onClick={() => setActiveTab('business')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'business'
                  ? 'bg-[#0A3D91] text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" /> Business Profile & Directory
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'overview'
                  ? 'bg-[#0A3D91] text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" /> Account Info
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'security'
                  ? 'bg-[#0A3D91] text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Lock className="w-4 h-4" /> Security & Email OTP
            </button>
          </nav>
        </div>

        {/* Member Profile Footer & Logout */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F57C00] text-white flex items-center justify-center font-bold text-xs uppercase shrink-0">
              {user?.name?.charAt(0) || 'S'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'SACHIN SUBHASH WATHORE'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email || 'sachinwathore7698@gmail.com'}</p>
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

      {/* Main Dashboard Content */}
      <main className="flex-1 p-6 md:p-8 space-y-6 max-w-6xl mx-auto w-full">
        
        {/* Welcome Top Banner */}
        <div className="bg-gradient-to-r from-[#0A3D91] to-blue-900 text-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 bg-white/10 text-[#F57C00] rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/20">
              Logged-in Member Portal
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold mt-2">
              Welcome back, {user?.name || 'SACHIN SUBHASH WATHORE'}!
            </h1>
            <p className="text-xs text-slate-200 mt-1">
              Enrol for upcoming summits, claim QR entry passes, upgrade subscription plans, and publish your company profile.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold rounded-full text-xs">
              Active Session
            </span>
          </div>
        </div>

        {/* TAB 1: EVENTS & ENTRY PASSES (Primary Focal Point) */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            
            {/* My Active Entry Passes */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-[#0A3D91]" />
                    My Active Event QR Passes ({claimedPasses.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Present these digital passes at entry verification desks for instant event access.
                  </p>
                </div>
              </div>

              {claimedPasses.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-xs text-slate-500">
                  You haven't claimed any event passes yet. Browse the upcoming events schedule below to enrol instantly!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingEvents
                    .filter((evt) => claimedPasses.includes(evt.id))
                    .map((evt) => (
                      <div
                        key={evt.id}
                        className="p-5 bg-gradient-to-br from-slate-900 to-[#0A3D91] text-white rounded-2xl flex items-center justify-between gap-4 shadow-md"
                      >
                        <div className="space-y-1.5">
                          <span className="px-2.5 py-0.5 bg-[#F57C00] text-white text-[9px] font-bold rounded-full uppercase">
                            Pass Confirmed
                          </span>
                          <h3 className="text-sm font-bold text-white leading-tight">{evt.title}</h3>
                          <p className="text-[11px] text-slate-300">{evt.date} • {evt.location}</p>
                          <p className="text-[10px] font-mono text-amber-300 pt-1">Pass Code: {evt.passCode}</p>
                        </div>

                        <div className="w-20 h-20 bg-white p-1.5 rounded-xl flex flex-col items-center justify-center shrink-0 text-slate-900 shadow">
                          <QrCode className="w-14 h-14" />
                          <span className="text-[8px] font-bold font-mono">VERIFIED</span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Catalog of Upcoming Events */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#F57C00]" />
                  Upcoming BEGAINDIA Summits & Meets
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click <strong>"Get Pass"</strong> on any event to directly enrol and generate your entry pass into your dashboard.
                </p>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((evt) => {
                  const isClaimed = claimedPasses.includes(evt.id);

                  return (
                    <div
                      key={evt.id}
                      className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-300 transition"
                    >
                      <div className="space-y-2 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 bg-blue-100 text-[#0A3D91] text-[10px] font-bold rounded-full uppercase">
                            {evt.type}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {evt.date}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900">{evt.title}</h3>
                        <p className="text-xs text-slate-600">{evt.description}</p>

                        <p className="text-xs text-slate-500 flex items-center gap-1 pt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" /> {evt.location} ({evt.time})
                        </p>
                      </div>

                      <div className="shrink-0">
                        {isClaimed ? (
                          <span className="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-1.5 border border-emerald-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            Pass Claimed
                          </span>
                        ) : (
                          <button
                            onClick={() => handleClaimPass(evt.id)}
                            className="px-6 py-2.5 bg-[#F57C00] hover:bg-[#e06f00] text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
                          >
                            <QrCode className="w-4 h-4" />
                            Get Pass
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SUBSCRIPTION PLANS */}
        {activeTab === 'membership' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Subscription Plans & Upgrades</h2>
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
                <button className="w-full py-2 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl">
                  Standard Plan
                </button>
              </div>

              <div className="p-5 bg-orange-50/50 rounded-2xl border border-[#F57C00] space-y-4 relative">
                <span className="absolute -top-2.5 right-4 bg-[#F57C00] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Active Member
                </span>
                <h3 className="text-base font-bold text-slate-900">Gold Tier</h3>
                <p className="text-2xl font-extrabold text-[#F57C00]">₹2,499 <span className="text-xs font-normal text-slate-500">/mo</span></p>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li>• Featured Directory Listing</li>
                  <li>• Priority Event Pass Code</li>
                  <li>• Direct B2B Matchmaking</li>
                </ul>
                <button className="w-full py-2 bg-[#F57C00] text-white text-xs font-bold rounded-xl shadow cursor-default">
                  Active Plan
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
                <button className="w-full py-2 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-bold rounded-xl transition">
                  Upgrade to Platinum
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BUSINESS PROFILE & PUBLIC DIRECTORY LISTING */}
        {activeTab === 'business' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Company Profile & Directory Listing</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Updates saved here will automatically publish to the public BEGAINDIA Business Directory for everyone to view.
                </p>
              </div>
              <Link
                to="/directory"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#0A3D91] text-xs font-bold rounded-xl transition flex items-center gap-1.5"
              >
                View Live Directory <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {profileSaved && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Business details and logo updated successfully! Your company is live on the public directory.</span>
              </div>
            )}

            <form onSubmit={handleSaveBusinessProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Business Name</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Industry Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                  >
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Business Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location / City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Logo URL / Asset Path</label>
                <input
                  type="text"
                  placeholder="/logo.png or https://domain.com/logo.png"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Overview & Offerings</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#F57C00] hover:bg-[#e06f00] text-white font-bold rounded-xl text-xs transition shadow"
              >
                Publish & Save Company Details
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: ACCOUNT OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-indigo-600">
                  <span className="text-xs font-semibold text-slate-500">Account Email</span>
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 truncate">{user?.email || 'sachinwathore7698@gmail.com'}</p>
                  <p className="text-xs text-slate-500">{user?.mobile || '+91 8390876752'}</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-emerald-600">
                  <span className="text-xs font-semibold text-slate-500">Verification Status</span>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Active Member</p>
                  <p className="text-xs text-emerald-600 font-semibold">Verified Profile</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-[#F57C00]">
                  <span className="text-xs font-semibold text-slate-500">Current Plan</span>
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900">Gold Tier</p>
                  <button
                    onClick={() => setActiveTab('membership')}
                    className="text-xs font-bold text-[#0A3D91] hover:underline flex items-center gap-1"
                  >
                    Upgrade <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SECURITY & EMAIL OTP */}
        {activeTab === 'security' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Email OTP Verification & Security</h2>
              <p className="text-xs text-slate-500 mt-1">
                Request an OTP sent to your email address (<strong>{user?.email || 'sachinwathore7698@gmail.com'}</strong>) to update your login credentials.
              </p>
            </div>

            {passwordSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Password updated successfully! You can now use your new password for future sign-ins.</span>
              </div>
            )}

            <div className="space-y-4 max-w-md">
              {!otpSent ? (
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <p className="text-xs text-slate-700 font-medium">
                    Click below to dispatch a 6-digit OTP code to your registered email.
                  </p>
                  <button
                    onClick={handleSendOtp}
                    className="w-full py-2.5 bg-[#0A3D91] hover:bg-[#083278] text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-[#F57C00]" />
                    Send OTP to Email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVerifyAndChangePassword} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-[#0A3D91]">
                    An OTP code has been sent to <strong>{user?.email || 'sachinwathore7698@gmail.com'}</strong>. (Use code: <strong>123456</strong>)
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Enter 6-Digit OTP</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="123456"
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91] font-mono tracking-widest text-center"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      placeholder="Enter new strong password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#F57C00] hover:bg-[#e06f00] text-white font-bold text-xs rounded-xl transition shadow"
                  >
                    Verify OTP & Update Password
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}