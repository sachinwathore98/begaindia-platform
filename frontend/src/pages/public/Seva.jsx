import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartHandshake,
  Trees,
  GraduationCap,
  Sparkles,
  Users,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building,
  ArrowRight,
} from 'lucide-react';

const SEVA_FOCUS_AREAS = [
  { title: 'Education Support', desc: 'Needy student school kits, competitive exam guidance, digital classrooms, and scholarships.' },
  { title: 'Healthcare Camps', desc: 'Free diagnostic medical camps, preventive screenings, blood donation, and health insurance awareness.' },
  { title: 'Farmer Guidance', desc: 'Direct market linkages, organic technology workshops, weather alerts, and agricultural subsidy unlocking.' },
  { title: '500-Tree Sanctuaries', desc: 'Plantation of native trees with mandatory 3-year drip care and community maintenance agreements.' },
  { title: 'Cleanliness Campaigns', desc: 'Gram swachhata drives, rural solid waste segregation, and plastic reduction awareness.' },
  { title: 'Women & Youth Upliftment', desc: 'Self-help group skill-building, micro-enterprise training, and vocational certification.' },
];

export default function Seva() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-12 px-4 sm:px-8 space-y-16">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="px-3.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black rounded-full uppercase tracking-wider">
            Social Development Wing
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            BEGA Seva: "One Month – One Village"
          </h1>
          <p className="text-xs font-black text-[#F57C00] uppercase tracking-widest">
            Business Growth with Social Responsibility
          </p>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            We believe an empowered business community must uplift the surrounding society. Through organized corporate CSR and volunteer mobilization, we transform 1 village every month.
          </p>
        </div>

        {/* 5-Year Target Blueprint */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-2 shadow-sm">
            <span className="text-xs font-black uppercase text-[#F57C00]">Monthly Blueprint</span>
            <p className="text-3xl font-black text-slate-900">1 Month = 1 Village</p>
            <p className="text-xs text-slate-500">Comprehensive local needs analysis & execution</p>
          </div>
          <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-2 shadow-sm">
            <span className="text-xs font-black uppercase text-emerald-700">Annual Target</span>
            <p className="text-3xl font-black text-slate-900">12 Villages / Year</p>
            <p className="text-xs text-slate-500">Documented before/after impact scorecards</p>
          </div>
          <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-2 shadow-sm">
            <span className="text-xs font-black uppercase text-[#0A3D91]">5-Year Horizon</span>
            <p className="text-3xl font-black text-slate-900">60 Model Villages</p>
            <p className="text-xs text-slate-500">State-wide sustainable rural development</p>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-[#0A3D91] uppercase tracking-wider">Intervention Tracks</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">Six Core Pillars of BEGA Seva</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEVA_FOCUS_AREAS.map((f, idx) => (
              <div key={idx} className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-xs hover:shadow-md transition">
                <h3 className="text-base font-black text-slate-900">{f.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CSR Sponsorship Desk CTA */}
        <div className="bg-[#0A3D91] text-white p-8 sm:p-12 rounded-3xl shadow-xl text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black">Support & Adopt a Village Under 80G CSR</h2>
            <p className="text-xs sm:text-sm text-blue-100">
              Corporate packages starting from ₹25,000 for 500 trees to ₹1,50,000 for complete village transformation.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/sponsorship"
              className="px-8 py-3.5 bg-[#F57C00] hover:bg-[#e06f00] text-white font-black text-xs rounded-xl shadow transition"
            >
              Explore Sponsorship Packages
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}