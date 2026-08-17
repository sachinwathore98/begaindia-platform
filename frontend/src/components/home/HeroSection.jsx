import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, ShieldCheck, Users, TrendingUp, Building } from 'lucide-react';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-[#0A3D91] to-slate-900 text-white py-16 sm:py-24 px-4 sm:px-8 overflow-hidden">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6">
        {/* Bilingual Header Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md text-xs font-extrabold text-[#F57C00] uppercase tracking-wider">
          <span>{t.orgFullName}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
          {t.hero.title}
        </h1>

        {/* Hero Subtitle */}
        <p className="text-xs sm:text-base text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
          {t.hero.subtitle}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            to="/join"
            className="px-6 py-3 bg-[#F57C00] hover:bg-[#e06f00] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center gap-2"
          >
            {t.hero.applyMembership} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/directory"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 backdrop-blur-sm transition"
          >
            {t.hero.exploreDirectory}
          </Link>
          <Link
            to="/support"
            className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition"
          >
            {t.hero.reportIssue}
          </Link>
        </div>

        {/* Highlights Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-white/10 max-w-4xl mx-auto text-left">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-[#F57C00] shrink-0" />
            <div>
              <p className="text-base font-extrabold">B2B Linkages</p>
              <p className="text-[10px] text-slate-300">Supplier to Retailer Chain[cite: 7, 8]</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#F57C00] shrink-0" />
            <div>
              <p className="text-base font-extrabold">Business Support</p>
              <p className="text-[10px] text-slate-300">Legal & GST Cell[cite: 7, 8]</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Building className="w-6 h-6 text-[#F57C00] shrink-0" />
            <div>
              <p className="text-base font-extrabold">Verified Directory</p>
              <p className="text-[10px] text-slate-300">District & Taluka Search[cite: 1, 4]</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-[#F57C00] shrink-0" />
            <div>
              <p className="text-base font-extrabold">BEGA Seva</p>
              <p className="text-[10px] text-slate-300">1 Month = 1 Village</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}