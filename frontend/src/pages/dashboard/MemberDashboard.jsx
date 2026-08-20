import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  User,
  Building2,
  Award,
  Calendar,
  Ticket,
  LifeBuoy,
  FileCheck2,
  ShieldCheck,
  Printer,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Inbox,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MemberDashboard() {
  const [member, setMember] = useState(null);
  const [activeTab, setActiveTab] = useState('credentials'); // 'credentials' | 'leads' | 'tickets'

  useEffect(() => {
    const cached = localStorage.getItem('user');
    if (cached) {
      setMember(JSON.parse(cached));
    } else {
      setMember({
        name: 'Sachin Subhash Wathore',
        companyName: 'SW Multimedia Group',
        applicationNumber: 'BEGA-2026-849201',
        membershipPlan: 'Business Membership',
        membershipStatus: 'Active',
        district: 'Chhatrapati Sambhajinagar',
        taluka: 'Aurangabad',
        validTill: '2027-08-20T00:00:00.000Z',
      });
    }
  }, []);

  if (!member) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0A3D91]/40 to-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-black rounded-full uppercase tracking-wider">
            Verified Member Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">{member.name}</h1>
          <p className="text-xs text-amber-300 font-bold">{member.companyName} • {member.district}</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/support"
            className="px-4 py-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
          >
            <LifeBuoy className="w-4 h-4" /> BSR Grievance Desk
          </Link>
          <Link
            to="/directory"
            className="px-4 py-2.5 bg-[#F57C00] hover:bg-[#e06f00] text-slate-950 text-xs font-black rounded-xl shadow transition flex items-center gap-1.5"
          >
            <Building2 className="w-4 h-4" /> View in Directory
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('credentials')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition ${
            activeTab === 'credentials' ? 'bg-[#0A3D91] text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileCheck2 className="w-4 h-4 inline mr-1.5" /> Digital ID & Certificate
        </button>
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition ${
            activeTab === 'leads' ? 'bg-[#0A3D91] text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Inbox className="w-4 h-4 inline mr-1.5" /> B2B Referral Inbox (3)
        </button>
      </div>

      {/* TAB 1: CREDENTIALS */}
      {activeTab === 'credentials' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Digital Badge */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-[#0A3D91] to-slate-950 border-2 border-amber-400/40 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden space-y-6">
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center font-black text-slate-950 text-base shadow-lg">
                  B
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">BEGA INDIA</h3>
                  <p className="text-[9px] text-amber-300 font-bold">व्यवसाय सक्षमीकरण व विकास संघटना</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-black rounded-full border border-emerald-400/30">
                ACTIVE
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Member Name</p>
              <h4 className="text-lg font-black text-white">{member.name}</h4>
              <p className="text-xs font-bold text-amber-300">{member.companyName}</p>
              <p className="text-[11px] text-slate-300">{member.district}, Maharashtra</p>
            </div>

            <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center shadow-lg text-slate-950">
              <QRCodeSVG value={`https://begaindia-platform.vercel.app/verify/${member.applicationNumber}`} size={120} />
              <span className="font-mono font-black text-xs mt-2 text-[#0A3D91]">{member.applicationNumber}</span>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print Verified ID Card
            </button>
          </div>

          {/* Quick Metrics & Next Conclave Access */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Membership Tier</span>
                <p className="text-base font-black text-amber-400">{member.membershipPlan}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Directory Badge</span>
                <p className="text-base font-black text-emerald-400">BEGA Verified</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Expo Privilege</span>
                <p className="text-base font-black text-blue-400">VIP Pass Active</p>
              </div>
            </div>

            {/* Upcoming Event Invitation */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-extrabold rounded-full border border-blue-500/20">
                  State Conclave Delegate Pass
                </span>
                <span className="text-xs text-slate-400 font-bold">14-16 Nov 2026</span>
              </div>
              <h3 className="text-lg font-black text-white">BEGA Mahaadhiveshan & Business Expo 2026</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Venue: CIDCO Exhibition Grounds, Ch. Sambhajinagar. Your VIP Delegate pass is included with your {member.membershipPlan}.
              </p>
              <Link
                to="/expo"
                className="inline-flex items-center gap-1.5 text-xs font-black text-[#F57C00] hover:underline"
              >
                Access Stall Booking Floor Plan <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: B2B LEADS */}
      {activeTab === 'leads' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-extrabold text-white">Incoming B2B Inquiries & Product Matchmaking</h2>
          <div className="space-y-3">
            {[
              { sender: 'Patil Forgings', requirement: 'Requirement for Industrial IT Infrastructure & Automation', date: 'Yesterday' },
              { sender: 'Deshmukh Agro', requirement: 'Seeking bulk packaging vendor & distributor tie-up', date: '2 days ago' },
            ].map((lead, idx) => (
              <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-white">{lead.sender}</h3>
                  <p className="text-xs text-slate-400">{lead.requirement}</p>
                </div>
                <span className="text-xs font-bold text-slate-500">{lead.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}