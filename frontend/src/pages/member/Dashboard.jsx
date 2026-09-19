// frontend/src/pages/member/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import MemberIdCard from '../../components/member/MemberIdCard';
import {
  ShieldCheck,
  Building2,
  BookOpen,
  Award,
  LifeBuoy,
  FileText,
  Briefcase,
  UserCheck,
  ArrowRight,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';
const API_URL = API_BASE.replace(/\/$/, '');

export default function MemberDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('credentials'); // 'credentials' | 'booklet' | 'directory' | 'support'

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch User Profile & Membership Details
        const res = await axios.get(`${API_URL}/api/membership/my-membership`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.success) {
          setUser(res.data.data.user);
        }

        // Fetch Member Business Profile
        const bizRes = await axios.get(`${API_URL}/api/business/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (bizRes.data?.success) {
          setBusiness(bizRes.data.data);
        }
      } catch (err) {
        console.error('Failed to load member profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-500 text-xs font-bold">
        Loading verified member portal...
      </div>
    );
  }

  const planName = user?.membership?.plan || 'BEGA Basic Membership';
  const isBookletEligible =
    planName !== 'BEGA Basic Membership'; // Plan 2, 3, 4, 5
  const isDirectoryEligible =
    planName.includes('Directory') ||
    planName.includes('Committee') ||
    planName.includes('Central') ||
    planName.includes('State'); // Plan 3, 4, 5

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-8 px-4 sm:px-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome Header */}
      <div className="bg-gradient-to-r from-[#0A3D91] via-blue-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-black rounded-full uppercase tracking-wider border border-emerald-500/30">
              Verified Enterprise Member
            </span>
            <span className="text-slate-300 text-xs font-mono">
              ID: {user?.applicationNumber || 'BEGA-2026-ACTIVE'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Welcome back, {user?.name || 'Member'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            {business?.companyName || 'Enterprise Profile'} • {user?.district || 'Chhatrapati Sambhajinagar'}, Maharashtra
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="px-4 py-2 bg-amber-400/20 border border-amber-400/30 text-amber-300 font-black text-xs rounded-xl">
            {planName}
          </span>
          <Link
            to="/support"
            className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
          >
            <LifeBuoy className="w-3.5 h-3.5" /> 14 BSR Desks
          </Link>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('credentials')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'credentials'
              ? 'bg-[#0A3D91] text-white shadow-md font-black'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Award className="w-4 h-4" /> Official Identity & Badge
        </button>

        <button
          onClick={() => setActiveTab('booklet')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'booklet'
              ? 'bg-[#0A3D91] text-white shadow-md font-black'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Monthly Knowledge Booklet
        </button>

        <button
          onClick={() => setActiveTab('directory')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'directory'
              ? 'bg-[#0A3D91] text-white shadow-md font-black'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" /> Directory Listing Status
        </button>

        <button
          onClick={() => setActiveTab('support')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'support'
              ? 'bg-[#0A3D91] text-white shadow-md font-black'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <LifeBuoy className="w-4 h-4" /> My BSR Tickets
        </button>
      </div>

      {/* TAB 1: OFFICIAL IDENTITY BADGE & CREDENTIALS */}
      {activeTab === 'credentials' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <MemberIdCard user={user} />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <h3 className="text-base font-black text-slate-900">
                Your Active Tier Privileges ({planName})
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                As a registered participant of BEGA India, your organization has access to verified commercial networks, regional summits, and institutional dispute routing across Maharashtra.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                  <div className="flex items-center gap-2 text-[#0A3D91] font-black text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Member Identity Card
                  </div>
                  <p className="text-[11px] text-slate-500">QR-code verifiable credentials across all 36 districts.</p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                  <div className="flex items-center gap-2 text-[#0A3D91] font-black text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> BEGA Branded T-Shirt
                  </div>
                  <p className="text-[11px] text-slate-500">Official membership apparel dispatched via secretariat.</p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                  <div className="flex items-center gap-2 text-[#0A3D91] font-black text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 14 Business Support Desks
                  </div>
                  <p className="text-[11px] text-slate-500">Guidance on payment delays, GST, and administrative hurdles.</p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                  <div className="flex items-center gap-2 text-[#0A3D91] font-black text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Career & Mentorship Wing
                  </div>
                  <p className="text-[11px] text-slate-500">Post jobs and enroll in 1-on-1 entrepreneur pairings.</p>
                </div>
              </div>
            </div>

            {/* Philosophy & Executive Candidature Callout */}
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/60 rounded-3xl p-6 space-y-3">
              <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Sections 10 & 11 • Executive Governance
              </span>
              <h4 className="text-sm font-black text-slate-900">
                Interested in Committee Leadership?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Membership fee is not a position fee. If you wish to take up organizational responsibility in the Central, State, Mahila, or Yuva Karyakarini, you can submit your dossier through the 9-step selection workflow.
              </p>
              <Link
                to="/membership"
                className="inline-flex items-center gap-1 text-xs font-black text-[#0A3D91] hover:underline pt-1"
              >
                Learn About Executive Selection &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BEGA MONTHLY BOOKLET (PLAN 2, 3, 4, 5) */}
      {activeTab === 'booklet' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="px-2.5 py-0.5 bg-blue-50 text-[#0A3D91] text-[10px] font-black rounded-full uppercase">
                Section 9 • Knowledge Subscription
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                BEGA Monthly Business & Regulatory Booklet
              </h2>
              <p className="text-xs text-slate-500">
                Monthly dossiers covering MSME schemes, tax amendments, court orders on payment delays, and export linkages.
              </p>
            </div>

            {isBookletEligible ? (
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full">
                Active Subscription
              </span>
            ) : (
              <Link
                to="/membership"
                className="px-4 py-2 bg-[#F57C00] text-white text-xs font-black rounded-xl shadow"
              >
                Upgrade to Plan 2 (₹5,000)
              </Link>
            )}
          </div>

          {isBookletEligible ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  edition: 'September 2026 Edition',
                  title: 'Industrial Subsidies & MSME SAMADHAAN Fast-Tracks',
                  date: 'September 01, 2026',
                  pages: '32 Pages • PDF',
                },
                {
                  edition: 'August 2026 Edition',
                  title: 'GST E-Invoicing Updates & State Package of Incentives (PSI)',
                  date: 'August 01, 2026',
                  pages: '28 Pages • PDF',
                },
                {
                  edition: 'July 2026 Edition',
                  title: 'Digital Marketing & B2B Supply Chain Architecture',
                  date: 'July 01, 2026',
                  pages: '30 Pages • PDF',
                },
              ].map((book, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-[#0A3D91] uppercase">
                      {book.edition}
                    </span>
                    <h4 className="text-sm font-black text-slate-900 leading-snug">
                      {book.title}
                    </h4>
                    <p className="text-[11px] text-slate-500">{book.date} • {book.pages}</p>
                  </div>
                  <button
                    onClick={() => alert(`Downloading ${book.edition}...`)}
                    className="w-full py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5 text-[#0A3D91]" /> Download Monthly Issue
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <h3 className="text-sm font-black text-slate-900">
                Booklet Subscription Not Included in Basic Plan
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                The BEGA Monthly Booklet is included in <strong>Plan 2 (₹5,000)</strong>, <strong>Plan 3 (₹11,000)</strong>, and Executive Committee plans. Upgrade your plan to receive print and digital editions.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DIRECTORY LISTING STATUS (PLAN 3, 4, 5) */}
      {activeTab === 'directory' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-black rounded-full uppercase">
                Section 19 • B2B Market Linkage
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                State Business Directory Placement
              </h2>
              <p className="text-xs text-slate-500">
                Publicly discoverable company profile, product catalog, and direct B2B inquiries across 36 districts.
              </p>
            </div>

            {isDirectoryEligible ? (
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full">
                Plan 3 Inclusion Verified
              </span>
            ) : (
              <Link
                to="/membership"
                className="px-4 py-2 bg-[#F57C00] text-white text-xs font-black rounded-xl shadow"
              >
                Upgrade to Plan 3 (₹11,000)
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">
                Listed Company Dossier
              </h4>
              <div className="space-y-1">
                <p className="text-base font-black text-slate-900">{business?.companyName || user?.companyName}</p>
                <p className="text-xs text-slate-600">{business?.category || 'Manufacturing & Industrial'}</p>
                <p className="text-xs text-slate-500">{business?.district || user?.district}, Maharashtra</p>
                {business?.gstNumber && (
                  <p className="text-[11px] font-mono text-slate-700">GST: {business.gstNumber}</p>
                )}
              </div>
              <div className="pt-2">
                <Link
                  to="/directory"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#0A3D91] hover:underline"
                >
                  View on Public Directory <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">
                Profile Verification Status
              </h4>
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" /> Live & Visible on Public Platform
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your company profile is published in the state business index. Trade buyers, institutions, and fellow BEGA members can search and connect directly with you.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BSR SUPPORT DESK TICKETS */}
      {activeTab === 'support' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="px-2.5 py-0.5 bg-rose-50 text-rose-800 text-[10px] font-black rounded-full uppercase">
                Section 14 • 14 Business Support Desks
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                Your Registered Support Requests (BSR)
              </h2>
              <p className="text-xs text-slate-500">
                Track the 8-step redressal status of your commercial, delayed payment, and administrative submissions.
              </p>
            </div>
            <Link
              to="/support"
              className="px-4 py-2 bg-[#0A3D91] text-white text-xs font-black rounded-xl shadow"
            >
              Submit New Request (BSR)
            </Link>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-black rounded-md">
                  Payment Delay Support Desk
                </span>
                <h4 className="text-sm font-black text-slate-900 mt-2">
                  Sample Registered Case: BSR-2026-849201
                </h4>
                <p className="text-xs text-slate-500">
                  Logged on September 12, 2026 • Assigned to: Regional CA / Legal Advisory Desk
                </p>
              </div>
              <span className="px-2.5 py-1 bg-blue-50 text-[#0A3D91] text-[10px] font-black rounded-full border border-blue-200">
                Action / Guidance
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              "Documentation for outstanding receivables submitted for formal notice drafting under MSME SAMADHAAN framework."
            </p>
          </div>
        </div>
      )}
    </div>
  );
}