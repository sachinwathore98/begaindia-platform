import React, { useState } from 'react';
import { BEGA_OBJECTIVES } from '../../data/objectivesData';
import {
  Target,
  ShieldCheck,
  TrendingUp,
  Scale,
  GraduationCap,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Search,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  'All',
  'Protection & Representation',
  'Business Growth',
  'Compliance & Legal',
  'Training & Skill',
  'Social Movement',
];

export default function Objectives() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filteredObjectives = BEGA_OBJECTIVES.filter((obj) => {
    const matchesCategory = activeCategory === 'All' || obj.category === activeCategory;
    const matchesSearch =
      obj.title.toLowerCase().includes(search.toLowerCase()) ||
      obj.marathi.toLowerCase().includes(search.toLowerCase()) ||
      obj.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-blue-100 text-[#0A3D91] text-xs font-extrabold rounded-full uppercase tracking-wider">
            Institutional Mission & Charter
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            28 Core Objectives of BEGA India
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            संस्थेची २८ मुख्य उद्दिष्टे — व्यवसाय संरक्षण, शासकीय समन्वय, B2B वाढ आणि सर्वांगीण सामाजिक विकास चळवळ.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search objectives in English / मराठी..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
            />
          </div>

          <div className="w-full md:w-auto flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeCategory === cat
                    ? 'bg-[#0A3D91] text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Objectives Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredObjectives.map((obj) => (
            <div
              key={obj.id}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#0A3D91] transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="w-7 h-7 rounded-xl bg-blue-50 text-[#0A3D91] font-black text-xs flex items-center justify-center border border-blue-100">
                    {obj.id}
                  </span>
                  <span className="px-2.5 py-0.5 bg-orange-50 text-[#F57C00] text-[10px] font-extrabold rounded-full border border-orange-100">
                    {obj.category}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                    {obj.title}
                  </h3>
                  <p className="text-xs font-bold text-[#0A3D91]">
                    {obj.marathi}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {obj.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active Institutional Wing
              </div>
            </div>
          ))}
        </div>

        {/* Why Join BEGA Banner */}
        <div className="bg-gradient-to-br from-[#0A3D91] via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#F57C00]">
              Value Proposition
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Why Should You Join BEGA India?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Experience the strength of collective unity, institutional legal backing, district help desks, and direct access to state-wide B2B market linkages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
            <div className="bg-white/10 p-4 rounded-2xl space-y-1 border border-white/10">
              <h4 className="font-extrabold text-amber-300">1. Instant Legal & Dispute Backing</h4>
              <p className="text-slate-300 text-[11px]">Free dispute mediation and expert legal counseling under the BSR Cell.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl space-y-1 border border-white/10">
              <h4 className="font-extrabold text-amber-300">2. High-Intent B2B Referrals</h4>
              <p className="text-slate-300 text-[11px]">Direct leads through the verified directory and annual Business Expos.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl space-y-1 border border-white/10">
              <h4 className="font-extrabold text-amber-300">3. Direct Government Coordination</h4>
              <p className="text-slate-300 text-[11px]">Fast-track scheme applications for PMEGP, CGTMSE, and PSI subsidies.</p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Link
              to="/join"
              className="px-6 py-3 bg-[#F57C00] hover:bg-[#e06f00] text-white text-xs font-extrabold rounded-xl shadow transition flex items-center gap-2"
            >
              Enroll as a Verified Member <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}