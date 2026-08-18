import React, { useState, useEffect, useRef } from 'react';
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
} from 'lucide-react';

export default function MembershipModule() {
  const [activeTab, setActiveTab] = useState('card'); // 'card' | 'certificate'
  const [user, setUser] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser({
        name: 'Sachin Wathore',
        companyName: 'SW Multimedia & Digital Hub',
        applicationNumber: 'BEGA-2026-108492',
        membershipPlan: 'Lifetime Membership',
        membershipStatus: 'Active',
        district: 'Chhatrapati Sambhajinagar',
        taluka: 'Aurangabad',
        validTill: 'Lifetime / Valid',
        joinedDate: '15 January 2026',
      });
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!user) return null;

  return (
    <div className="p-6 md:p-8 space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0A3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Official Credentials
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            Digital ID & Membership Certificate
          </h1>
          <p className="text-xs text-slate-500">
            View, verify, and export your official BEGA India membership credentials and certificate.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
        >
          <Printer className="w-4 h-4 text-amber-400" /> Print / Save PDF
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('card')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition ${
            activeTab === 'card'
              ? 'bg-[#0A3D91] text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Digital ID Card
        </button>
        <button
          onClick={() => setActiveTab('certificate')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition ${
            activeTab === 'certificate'
              ? 'bg-[#0A3D91] text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Official Certificate
        </button>
      </div>

      {/* TAB 1: DIGITAL ID CARD */}
      {activeTab === 'card' && (
        <div className="space-y-6 max-w-md mx-auto pt-4">
          <div className="bg-gradient-to-tr from-[#0A3D91] via-blue-900 to-slate-950 text-white rounded-3xl p-6 shadow-2xl border-2 border-amber-400/40 relative overflow-hidden space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gradient-to-tr from-[#F57C00] to-amber-400 rounded-lg flex items-center justify-center font-black text-white text-sm shadow">
                  B
                </div>
                <div>
                  <h2 className="text-xs font-black tracking-wider uppercase text-white leading-tight">BEGA INDIA</h2>
                  <p className="text-[9px] text-amber-300 font-semibold leading-none">व्यवसाय सक्षमीकरण व विकास संघटना</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold rounded-full border border-emerald-400/30">
                {user.membershipStatus}
              </span>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center text-white text-xl font-bold uppercase shadow-inner shrink-0">
                {user.name?.charAt(0) || 'M'}
              </div>
              <div className="space-y-0.5 min-w-0">
                <h3 className="text-sm font-extrabold text-white truncate">{user.name}</h3>
                <p className="text-xs text-amber-300 font-semibold truncate flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 shrink-0" /> {user.companyName}
                </p>
                <p className="text-[10px] text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#F57C00] shrink-0" /> {user.taluka}, {user.district}
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex justify-between items-center gap-2">
              <div className="space-y-1 text-[10px]">
                <div>
                  <span className="text-slate-400 uppercase text-[9px] block font-bold">Member ID</span>
                  <span className="font-mono font-extrabold text-amber-300 text-xs">{user.applicationNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase text-[9px] block font-bold">Plan Tier</span>
                  <span className="font-bold text-white">{user.membershipPlan}</span>
                </div>
              </div>

              <div className="bg-white p-2 rounded-xl shadow shrink-0">
                <QRCodeSVG
                  value={`https://begaindia-platform.vercel.app/verify/${user.applicationNumber}`}
                  size={65}
                  level="M"
                />
              </div>
            </div>

            <div className="text-center text-[9px] text-slate-300 border-t border-white/10 pt-2 font-medium">
              Growth • Trust • Success | Validated Digital Identity Card
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MEMBERSHIP CERTIFICATE */}
      {activeTab === 'certificate' && (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border-8 border-double border-slate-200 shadow-xl max-w-3xl mx-auto space-y-6 text-center text-slate-800 relative">
          
          <div className="flex justify-between items-center border-b-2 border-[#0A3D91]/20 pb-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-[#0A3D91] to-[#F57C00] rounded-xl flex items-center justify-center font-black text-white text-xl">
              B
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-black text-[#0A3D91] tracking-widest uppercase">
                Business Empowerment and Growth Association
              </h2>
              <p className="text-xs font-bold text-slate-600">व्यवसाय सक्षमीकरण व विकास संघटना (BEGA INDIA)</p>
            </div>
            <div className="w-12 h-12"></div>
          </div>

          <div className="py-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F57C00] bg-orange-50 px-4 py-1.5 rounded-full border border-orange-200">
              Certificate of Membership
            </span>
          </div>

          <p className="text-xs text-slate-500 italic">This is to officially certify that</p>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900 border-b-2 border-slate-200 pb-1 max-w-md mx-auto">
              {user.companyName}
            </h3>
            <p className="text-xs font-bold text-[#0A3D91] pt-1">
              Represented by: {user.name}
            </p>
          </div>

          <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
            is an officially enrolled member of <strong>BEGA INDIA</strong> under the <strong>{user.membershipPlan}</strong> tier for the jurisdiction of <strong>{user.district}, Maharashtra</strong>.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-8 text-xs border-t border-slate-200">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Membership ID</span>
              <span className="font-mono font-extrabold text-slate-800">{user.applicationNumber}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Issued On</span>
              <span className="font-bold text-slate-800">{user.joinedDate}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Authorized Signatory</span>
              <span className="font-bold text-[#0A3D91]">State Secretary, BEGA</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}