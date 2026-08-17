import React from 'react';
import HeroSection from '../../components/home/HeroSection';
import QuickButtonsGrid from '../../components/home/QuickButtonsGrid';
import { useLanguage } from '../../context/LanguageContext';
import { 
  TrendingUp, 
  ShieldCheck, 
  Landmark, 
  HelpCircle, 
  Briefcase, 
  Rocket, 
  Trees, 
  HeartHandshake, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const { t } = useLanguage();

  const sixPillars = [
    { title: t.pillars.growth, desc: 'Training, marketing awareness, networking, B2B opportunities, and scaling support.', icon: TrendingUp },
    { title: t.pillars.protection, desc: 'Legal awareness, documentation guidance, fraud awareness, and expert referrals.', icon: ShieldCheck },
    { title: t.pillars.govConnect, desc: 'MSME schemes, licences, permissions, compliance assistance, and administrative representation.', icon: Landmark },
    { title: t.pillars.resolution, desc: 'Structured support request cell, mediation, and specialist guidance for business disputes.', icon: HelpCircle },
    { title: t.pillars.opportunity, desc: 'BEGA Expo, buyer-seller meetings, market linkages, and corporate supply-chain integration.', icon: Briefcase },
    { title: t.pillars.development, desc: 'Startup incubation, women and young entrepreneur mentorship, and digital transformation.', icon: Rocket },
  ];

  return (
    <div className="space-y-0 font-sans">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. 11 Primary Quick Action Buttons Grid */}
      <QuickButtonsGrid />

      {/* 3. Six Core Pillars Section */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#F57C00] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Core Foundation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t.pillars.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sixPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#0A3D91] hover:shadow-md transition space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0A3D91] flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. BEGA Seva Flagship Banner: One Month - One Village */}
      <section className="bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 text-white py-14 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider rounded-full border border-emerald-500/30">
              {t.seva.title}[cite: 7]
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t.seva.flagship}[cite: 1, 7]
            </h2>
            <p className="text-xs text-emerald-200 font-semibold">
              {t.seva.target}[cite: 7]
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.seva.desc}[cite: 7]
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              to="/seva"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs rounded-xl shadow transition text-center"
            >
              View Village Impact Scorecards[cite: 1, 7]
            </Link>
            <Link
              to="/volunteer"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 text-center"
            >
              Join as Volunteer[cite: 7, 8]
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}