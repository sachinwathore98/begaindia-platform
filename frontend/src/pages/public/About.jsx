import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  TrendingUp,
  Globe2,
  Users,
  Target,
  Sparkles,
  Award,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
  Scale,
  Briefcase,
  Layers,
} from 'lucide-react';
import { ABOUT_DATA } from '../../data/aboutData';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans space-y-16 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="px-3.5 py-1 bg-blue-50 text-[#0A3D91] border border-blue-200 text-xs font-black rounded-full uppercase tracking-wider">
            Institutional Background
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            About BEGA INDIA
          </h1>
          <p className="text-xs font-black text-[#F57C00] uppercase tracking-widest">
            Business Empowerment and Growth Association • Growth • Trust • Success
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
            {ABOUT_DATA.aboutSummary}
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0A3D91] flex items-center justify-center font-black">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Our Vision</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {ABOUT_DATA.vision}
            </p>
            <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100 text-xs font-bold text-[#0A3D91]">
              "Empowered Businesses. Stronger Communities. A Better Nation."
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F57C00] flex items-center justify-center font-black">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Our Mission</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {ABOUT_DATA.mission}
            </p>
            <div className="p-3.5 bg-orange-50/50 rounded-2xl border border-orange-100 text-xs font-bold text-[#F57C00]">
              "Empower Businesses. Connect People. Create Opportunities. Serve Society. Build the Nation."
            </div>
          </div>
        </div>

        {/* Core Philosophy Equation Banner */}
        <div className="bg-[#0A3D91] text-white p-8 sm:p-12 rounded-3xl space-y-4 shadow-xl text-center">
          <span className="text-xs font-black uppercase text-amber-300 tracking-wider">
            Foundational Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            Business Development With Social Responsibility
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-4xl mx-auto leading-relaxed font-mono">
            {ABOUT_DATA.philosophy}
          </p>
        </div>

        {/* 15 Core Values Grid */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-[#F57C00] uppercase tracking-wider">Ethical Compass</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">15 Core Values of BEGA India</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ABOUT_DATA.coreValues.map((val, idx) => (
              <div key={idx} className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-xs hover:shadow-md transition">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-blue-50 text-[#0A3D91] flex items-center justify-center font-black text-xs">
                    {idx + 1}
                  </span>
                  <h3 className="text-base font-black text-slate-900">{val.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}