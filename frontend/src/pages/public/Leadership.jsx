import React, { useState } from 'react';
import {
  LEADERSHIP_TIERS,
  GOVERNANCE_PILLARS,
} from '../../data/leadershipData';
import {
  ShieldCheck,
  Award,
  Users,
  Building2,
  Landmark,
  Scale,
  HeartHandshake,
  CheckCircle2,
  MapPin,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TABS = [
  { id: 'State', label: 'State Leadership (महाराष्ट्र)' },
  { id: 'Divisional', label: 'Divisional Boards (विभागीय)' },
  { id: 'District', label: 'District Presidents (जिल्हा)' },
  { id: 'ExpertPanels', label: 'Expert Panels & Cells (तज्ज्ञ कक्ष)' },
];

export default function Leadership() {
  const [activeTab, setActiveTab] = useState('State');

  const currentMembers = LEADERSHIP_TIERS[activeTab] || [];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-blue-100 text-[#0A3D91] text-xs font-extrabold rounded-full uppercase tracking-wider">
            Organizational Structure & Governance
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            Leadership Dedicated to Service & Growth
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            BEGA India operates on a strict multi-tier framework from apex state councils to taluka and village units, guided by accountability and grassroots impact.
          </p>
        </div>

        {/* Governance Principle Banner: Position ≠ Power */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0A3D91] to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border-2 border-amber-400/30 relative overflow-hidden space-y-6">
          <div className="max-w-3xl space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-amber-400/30">
              <Scale className="w-4 h-4" /> Core Institutional Principle
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white">
              Position ≠ Power (पद म्हणजे अधिकार नव्हे, तर जबाबदारी!)
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              In BEGA India, every post represents **Responsibility, Service, Accountability, and Discipline**. Office bearers are dedicated to protecting business interests, resolving trade disputes, and driving rural upliftment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/10 relative z-10">
            {GOVERNANCE_PILLARS.map((pillar, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-1">
                <p className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wide">{pillar.marathi}</p>
                <h3 className="text-xs font-bold text-white">{pillar.title}</h3>
                <p className="text-[11px] text-slate-300 leading-snug">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tier Tabs */}
        <div className="flex justify-center">
          <div className="bg-slate-200/80 p-1.5 rounded-2xl flex flex-wrap gap-1.5 shadow-inner">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-[#0A3D91] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#0A3D91] transition flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 bg-blue-50 text-[#0A3D91] text-[10px] font-extrabold rounded-full border border-blue-100 uppercase tracking-wider">
                    {member.level}
                  </span>
                  <span className="p-2 bg-slate-50 text-[#F57C00] rounded-xl border border-slate-100">
                    <Award className="w-4 h-4" />
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold text-[#0A3D91]">
                    {member.designation}
                  </p>
                  <p className="text-[11px] font-semibold text-[#F57C00] flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {member.cell}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F57C00] shrink-0" />
                <span className="truncate font-medium">{member.district}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout: Join Executive / Leadership Working Committees */}
        <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              Interested in Serving on Regional Leadership Committees?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              BEGA Executive Members are selected through a structured evaluation of business credentials, social commitment, and organizational discipline.
            </p>
          </div>

          <Link
            to="/join"
            className="px-6 py-3 bg-[#F57C00] hover:bg-[#e06f00] text-white text-xs font-extrabold rounded-xl shadow transition flex items-center gap-2 shrink-0"
          >
            Apply for Executive Membership <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}