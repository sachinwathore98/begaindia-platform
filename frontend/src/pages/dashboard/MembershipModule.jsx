// frontend/src/pages/dashboard/MembershipModule.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import {
  Award,
  Download,
  Printer,
  ShieldCheck,
  Building2,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';
const API_URL = API_BASE.replace(/\/$/, '');

export default function MembershipModule() {
  const [activeTab, setActiveTab] = useState('card'); // 'card' | 'certificate' | 'booklet'
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await axios.get(`${API_URL}/api/membership/my-membership`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data?.success) {
            setUser({
              ...res.data.data.user,
              membershipPlan: res.data.data.user.membership?.plan || 'BEGA Basic Membership',
              membershipStatus: res.data.data.user.membership?.status || 'Active',
            });
            return;
          }
        }
      } catch (err) {
        console.warn('Using local fallback member profile');
      }

      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser({
          ...parsed,
          membershipPlan: parsed.membership?.plan || 'BEGA Membership with Directory',
          membershipStatus: parsed.membership?.status || 'Active',
        });
      } else {
        setUser({
          name: 'Sachin Wathore',
          companyName: 'SW Multimedia & Digital Hub',
          applicationNumber: 'BEGA-2026-108492',
          membershipPlan: 'BEGA Membership with Directory',
          membershipStatus: 'Active',
          district: 'Chhatrapati Sambhajinagar',
          taluka: 'Aurangabad',
          validTill: 'Valid / Annual Active',
          joinedDate: '15 January 2026',
        });
      }
      setLoading(false);
    };

    fetchMemberDetails();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (loading && !user) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 font-bold">
        Loading verified credentials...
      </div>
    );
  }

  const planName = user?.membershipPlan || 'BEGA Basic Membership';
  const isBookletEligible = planName !== 'BEGA Basic Membership';

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0A3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Section 9 • Official Credentials
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">
            Digital ID, Certificate & Monthly Booklet
          </h1>
          <p className="text-xs text-slate-500">
            Export your verified BEGA India membership ID card, view your framed certificate, and read monthly regulatory issues.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="px-5 py-2.5 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
        >
          <Printer className="w-4 h-4 text-amber-400" /> Print / Save PDF
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('card')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
            activeTab === 'card'
              ? 'bg-[#0A3D91] text-white shadow-sm font-black'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Digital ID Card
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('certificate')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
            activeTab === 'certificate'
              ? 'bg-[#0A3D91] text-white shadow-sm font-black'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Award className="w-4 h-4" /> Official Certificate
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('booklet')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
            activeTab === 'booklet'
              ? 'bg-[#0A3D91] text-white shadow-sm font-black'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Monthly Booklet Vault
        </button>
      </div>

      {/* TAB 1: DIGITAL ID CARD */}
      {activeTab === 'card' && (
        <div className="space-y-6 max-w-md mx-auto pt-4 print:pt-0">
          <div className="bg-gradient-to-tr from-[#0A3D91] via-blue-900 to-slate-950 text-white rounded-3xl p-6 shadow-2xl border-2 border-amber-400/40 relative overflow-hidden space-y-4 print:border-slate-800">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gradient-to-tr from-[#F57C00] to-amber-400 rounded-lg flex items-center justify-center font-black text-slate-950 text-sm shadow">
                  B
                </div>
                <div>
                  <h2 className="text-xs font-black tracking-wider uppercase text-white leading-tight">
                    BEGA INDIA
                  </h2>
                  <p className="text-[9px] text-amber-300 font-semibold leading-none">
                    Section 8 Registered
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold rounded-full border border-emerald-400/30">
                {user?.membershipStatus || 'ACTIVE'}
              </span>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center text-white text-xl font-bold uppercase shadow-inner shrink-0">
                {user?.name?.charAt(0) || 'M'}
              </div>
              <div className="space-y-0.5 min-w-0">
                <h3 className="text-sm font-extrabold text-white truncate">{user?.name}</h3>
                <p className="text-xs text-amber-300 font-semibold truncate flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 shrink-0" /> {user?.companyName || `${user?.name} Enterprises`}
                </p>
                <p className="text-[10px] text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#F57C00] shrink-0" /> {user?.district || 'Chhatrapati Sambhajinagar'}, MH
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex justify-between items-center gap-2">
              <div className="space-y-1 text-[10px]">
                <div>
                  <span className="text-slate-400 uppercase text-[9px] block font-bold">Member ID</span>
                  <span className="font-mono font-extrabold text-amber-300 text-xs">
                    {user?.applicationNumber || 'BEGA-2026-ACTIVE'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase text-[9px] block font-bold">Tier Plan</span>
                  <span className="font-bold text-white leading-tight block">{planName}</span>
                </div>
              </div>

              <div className="bg-white p-2 rounded-xl shadow shrink-0">
                <QRCodeSVG
                  value={`https://begaindia-platform.vercel.app/verify/${user?.applicationNumber || 'BEGA-2026-ACTIVE'}`}
                  size={65}
                  level="M"
                />
              </div>
            </div>

            <div className="text-center text-[9px] text-slate-300 border-t border-white/10 pt-2 font-medium">
              GROWTH • TRUST • SUCCESS | CONNECT → LEARN → COLLABORATE → GROW
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MEMBERSHIP CERTIFICATE */}
      {activeTab === 'certificate' && (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border-8 border-double border-slate-200 shadow-xl max-w-3xl mx-auto space-y-6 text-center text-slate-800 relative print:border-4 print:shadow-none">
          <div className="flex justify-between items-center border-b-2 border-[#0A3D91]/20 pb-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-[#0A3D91] to-[#F57C00] rounded-xl flex items-center justify-center font-black text-white text-xl">
              B
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-black text-[#0A3D91] tracking-widest uppercase">
                Business Empowerment and Growth Association India
              </h2>
              <p className="text-xs font-bold text-slate-600">
                Section 8 Company • व्यवसाय सक्षमीकरण व विकास संघटना
              </p>
            </div>
            <div className="w-12 h-12" />
          </div>

          <div className="py-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F57C00] bg-orange-50 px-4 py-1.5 rounded-full border border-orange-200">
              Certificate of Membership
            </span>
          </div>

          <p className="text-xs text-slate-500 italic">This is to officially certify that</p>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900 border-b-2 border-slate-200 pb-1 max-w-md mx-auto">
              {user?.companyName || `${user?.name} Enterprises`}
            </h3>
            <p className="text-xs font-bold text-[#0A3D91] pt-1">
              Represented by: {user?.name}
            </p>
          </div>

          <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
            is an officially enrolled enterprise member of <strong>BEGA INDIA</strong> under the{' '}
            <strong>{planName}</strong> schedule for the jurisdiction of{' '}
            <strong>{user?.district || 'Chhatrapati Sambhajinagar'}, Maharashtra</strong>.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-8 text-xs border-t border-slate-200">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Membership ID</span>
              <span className="font-mono font-extrabold text-slate-800">
                {user?.applicationNumber || 'BEGA-2026-ACTIVE'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Issued On</span>
              <span className="font-bold text-slate-800">15 January 2026</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Authorized Signatory</span>
              <span className="font-bold text-[#0A3D91]">Secretariat, BEGA India</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MONTHLY BOOKLET VAULT (PLAN 2, 3, 4, 5) */}
      {activeTab === 'booklet' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="px-2.5 py-0.5 bg-blue-50 text-[#0A3D91] text-[10px] font-black rounded-full uppercase">
                Section 9 • Knowledge Subscription
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                BEGA Monthly Business & Regulatory Booklet
              </h2>
              <p className="text-xs text-slate-500">
                Exclusive editions covering MSME subsidies, GST court orders on payment delays, and export linkages.
              </p>
            </div>
            {isBookletEligible ? (
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full">
                Active Subscription
              </span>
            ) : (
              <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold rounded-full">
                Plan 2+ Required
              </span>
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
                  className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-[#0A3D91] uppercase">{book.edition}</span>
                    <h4 className="text-sm font-black text-slate-900 leading-snug">{book.title}</h4>
                    <p className="text-[11px] text-slate-500">{book.date} • {book.pages}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert(`Downloading ${book.edition}...`)}
                    className="w-full py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5 text-[#0A3D91]" /> Download PDF
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-amber-50/50 rounded-2xl border border-amber-200 text-center space-y-2 text-xs text-amber-900">
              <p className="font-bold">Booklet Subscription Not Included in Basic Membership</p>
              <p className="text-slate-600">
                Upgrade to <strong>Plan 2 (₹5,000)</strong>, <strong>Plan 3 (₹11,000)</strong>, or an Executive Committee plan to gain access to all digital and print monthly issues.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}