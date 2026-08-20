import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  ShieldCheck,
  Building2,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  Store,
  LifeBuoy,
  ChevronRight,
  Zap,
  Globe2,
  Lock,
  ArrowUpRight,
  Scale,
  Handshake,
  Check,
  Briefcase,
  Play,
  Flame,
  BadgePercent,
  Search,
  Filter,
} from 'lucide-react';

const LIVE_NOTICES = [
  '⚡ BEGA Business Expo 2026: 500+ Exhibitors & 15,000+ Trade Delegates at CIDCO Grounds',
  '📢 New MSME Subsidy Desk: Fast-track PMEGP & PSI capital incentive documentation active',
  '🌱 One Month – One Village: Over 350 trees planted and 85 students supported this week',
  '🛡️ BSR Grievance Desk: 18 Industrial clearances and delayed payments resolved in 14 days',
];

const MEMBERSHIP_PLANS = [
  {
    id: 'Basic',
    name: 'Basic Membership',
    price: 999,
    formattedPrice: '₹999',
    period: '/year',
    popular: false,
    badge: 'Starter Pass',
    tagline: 'Essential digital identity & state networking for emerging entrepreneurs',
    color: 'from-blue-600/20 to-indigo-600/10 border-blue-500/30',
    benefits: [
      'Official Member Digital ID Badge with QR Verification',
      'Entry to District-Level B2B Networking & Trade Meets',
      'Regular MSME Subsidy & Tax Compliance Alerts',
      'Standard Access to BSR Support & Help Desk',
    ],
    cta: 'Get Starter ID',
    btnClass: 'bg-slate-800 hover:bg-slate-700 text-white',
  },
  {
    id: 'Business',
    name: 'Business Membership',
    price: 2499,
    formattedPrice: '₹2,499',
    period: '/year',
    popular: true,
    badge: 'Most Popular & Best Value',
    tagline: 'High-visibility listing, B2B lead generation & priority case handling',
    color: 'from-[#F57C00]/25 via-amber-500/15 to-[#0A3D91]/30 border-[#F57C00] ring-2 ring-orange-500/30 shadow-2xl shadow-orange-500/10',
    benefits: [
      'Verified Listing in the State Business Directory with Contact & Catalog',
      'Direct B2B Matchmaker Lead Inquiries & Buyer Linkages',
      'Priority Legal & CA Guidance for Delayed Payments & Licences',
      'VIP Delegate Conclave Access & Expo Stall Priority',
      'District & State Business Awards Eligibility',
    ],
    cta: 'Activate Business Tier',
    btnClass: 'bg-gradient-to-r from-[#F57C00] to-amber-500 hover:from-[#e06f00] hover:to-amber-600 text-slate-950 font-black shadow-lg shadow-orange-500/25',
  },
  {
    id: 'Lifetime',
    name: 'Lifetime Membership',
    price: 9999,
    formattedPrice: '₹9,999',
    period: 'one-time',
    popular: false,
    badge: 'Permanent Status',
    tagline: 'Permanent recognition, executive leadership access & VIP state conclave seating',
    color: 'from-purple-600/20 to-blue-600/10 border-purple-500/30',
    benefits: [
      'Permanent Lifetime Verified Badge on Digital Directory',
      'VIP Stage Access & Delegate Entry for All State Events',
      'Highest Priority Case Escalation in Grievance Cell',
      'Executive Invitation to Annual Business Leaders Roundtables',
    ],
    cta: 'Claim Lifetime Status',
    btnClass: 'bg-[#0A3D91] hover:bg-[#083278] text-white font-extrabold shadow-lg',
  },
];

const DIRECTORY_CATEGORIES = [
  { name: 'Manufacturing & Industrial', count: '1,420+ Units', icon: Building2, color: 'text-blue-400 bg-blue-500/10' },
  { name: 'Digital & IT Solutions', count: '850+ Agencies', icon: Zap, color: 'text-amber-400 bg-amber-500/10' },
  { name: 'Agro & Food Processing', count: '940+ Hubs', icon: Globe2, color: 'text-emerald-400 bg-emerald-500/10' },
  { name: 'Heavy Engineering & Auto', count: '620+ Plants', icon: Briefcase, color: 'text-rose-400 bg-rose-500/10' },
];

export default function Home() {
  const [activeNoticeIdx, setActiveNoticeIdx] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  // Rotate ticker notices smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNoticeIdx((prev) => (prev + 1) % LIVE_NOTICES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-[#F57C00] selection:text-slate-950 overflow-x-hidden">
      
      {/* 1. DYNAMIC TICKER PULSE BAR */}
      <div className="bg-gradient-to-r from-[#0A3D91] via-slate-900 to-[#0A3D91] border-b border-white/10 py-2.5 px-4 sm:px-8 text-xs font-bold">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="px-2.5 py-0.5 rounded-full bg-[#F57C00] text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shrink-0 animate-pulse">
              <Flame className="w-3 h-3 fill-slate-950" /> Live Feed
            </span>
            <p className="truncate text-slate-200 text-xs transition-all duration-500">
              {LIVE_NOTICES[activeNoticeIdx]}
            </p>
          </div>
          <Link to="/news" className="hidden sm:flex items-center gap-1 text-amber-300 hover:text-white font-extrabold text-[11px] shrink-0">
            View Updates &rarr;
          </Link>
        </div>
      </div>

      {/* 2. DYNAMIC HERO SECTION WITH GLOW & METRICS */}
      <section className="relative pt-12 pb-20 px-4 sm:px-8 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#0A3D91]/40 via-amber-500/10 to-transparent blur-[120px] pointer-events-none -z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-12">
          
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-amber-400 text-xs font-black uppercase tracking-widest backdrop-blur-xl shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#F57C00]" /> Maharashtra's Largest Business & Social Ecosystem
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
              Scale Your Business.<br />
              <span className="bg-gradient-to-r from-blue-400 via-amber-300 to-[#F57C00] bg-clip-text text-transparent drop-shadow-sm">
                Protect Your Rights. Connect for Growth.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
              Join 15,000+ verified entrepreneurs, manufacturers, and startups across 36 districts. Get verified digital credentials, unlock state MSME subsidies, access B2B matchmaking, and resolve regulatory hurdles fast.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
              <Link
                to="/join"
                className="px-8 py-4 bg-gradient-to-r from-[#F57C00] to-amber-500 hover:from-[#e06f00] hover:to-amber-600 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
              >
                Get Verified Membership <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/directory"
                className="px-7 py-4 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white font-extrabold text-xs rounded-2xl backdrop-blur-md shadow-lg transition-all flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-amber-400" /> Explore Business Directory
              </Link>
              <Link
                to="/support"
                className="px-6 py-4 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 font-extrabold text-xs rounded-2xl transition flex items-center gap-2"
              >
                <LifeBuoy className="w-4 h-4 text-rose-400" /> Register Grievance
              </Link>
            </div>
          </div>

          {/* Interactive Floating Stats Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 max-w-5xl mx-auto">
            <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-3xl backdrop-blur-md text-center space-y-1 hover:border-slate-700 transition">
              <p className="text-3xl sm:text-4xl font-black text-white">15,000+</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Verified Enterprises</p>
            </div>
            <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-3xl backdrop-blur-md text-center space-y-1 hover:border-slate-700 transition">
              <p className="text-3xl sm:text-4xl font-black text-amber-400">36 Districts</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Maharashtra Coverage</p>
            </div>
            <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-3xl backdrop-blur-md text-center space-y-1 hover:border-slate-700 transition">
              <p className="text-3xl sm:text-4xl font-black text-emerald-400">₹4.2 Cr+</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Subsidies Facilitated</p>
            </div>
            <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-3xl backdrop-blur-md text-center space-y-1 hover:border-slate-700 transition">
              <p className="text-3xl sm:text-4xl font-black text-blue-400">60 Villages</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">5-Year Seva Target</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. DYNAMIC INTERACTIVE MEMBERSHIP MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 relative">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-[#0A3D91]/40 border border-blue-400/30 text-blue-300 text-xs font-black rounded-full uppercase tracking-wider">
            Membership Onboarding
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Choose Your Level of Empowerment
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Instant digital ID issuance, direct B2B directory exposure, and priority dispute assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`p-8 rounded-3xl border bg-gradient-to-b ${plan.color} backdrop-blur-xl transition-all duration-300 flex flex-col justify-between space-y-8 relative overflow-hidden group hover:scale-[1.02]`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#F57C00] text-slate-950 text-[10px] font-black uppercase px-4 py-1 rounded-bl-2xl tracking-wider shadow">
                  FEATURED TIER
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
                    {plan.badge}
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">{plan.name}</h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-medium">{plan.tagline}</p>
                </div>

                <div className="flex items-baseline gap-1.5 pt-2 border-t border-white/10">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">{plan.formattedPrice}</span>
                  <span className="text-xs text-slate-400 font-bold">{plan.period}</span>
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-[11px] font-extrabold uppercase text-slate-300 tracking-wider">Core Deliverables:</p>
                  <ul className="space-y-2.5 text-xs text-slate-200">
                    {plan.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                to="/join"
                className={`w-full py-4 rounded-2xl text-xs text-center transition-all block ${plan.btnClass}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DISCOVER VERIFIED BUSINESS DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="bg-slate-900/60 border border-slate-800 p-8 sm:p-12 rounded-3xl space-y-8 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                B2B Marketplace & Directory
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white">Find Verified Suppliers & Buyers</h2>
              <p className="text-xs text-slate-400">Explore manufacturers, distributors, and certified MSMEs across Maharashtra.</p>
            </div>
            <Link
              to="/directory"
              className="px-5 py-2.5 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-extrabold rounded-xl shadow transition flex items-center gap-1.5 shrink-0"
            >
              Browse All 36 Districts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DIRECTORY_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={idx}
                  to="/directory"
                  className="p-5 bg-slate-950 border border-slate-800/80 rounded-2xl space-y-3 hover:border-slate-600 transition group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white group-hover:text-amber-400 transition">{cat.name}</h3>
                    <p className="text-xs text-slate-400 font-bold mt-0.5">{cat.count}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. BEGA SEVA: "ONE MONTH – ONE VILLAGE" IMPACT HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-[#0A3D91]/30 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8 relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <span className="px-3.5 py-1 bg-emerald-500/10 text-emerald-300 text-xs font-black rounded-full uppercase tracking-wider border border-emerald-500/20">
              Grassroots Social Transformation
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              BEGA Seva: Transforming 1 Village Every Month
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              We connect business leaders with verified rural development: establishing smart school classrooms, planting 500-tree sanctuaries, and conducting free diagnostic health camps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-5 bg-slate-950/70 border border-white/10 rounded-2xl space-y-1">
              <span className="text-[10px] font-black uppercase text-amber-400">Monthly Milestone</span>
              <p className="text-xl font-black text-white">1 Month = 1 Village</p>
              <p className="text-[11px] text-slate-400">Complete needs analysis & execution</p>
            </div>
            <div className="p-5 bg-slate-950/70 border border-white/10 rounded-2xl space-y-1">
              <span className="text-[10px] font-black uppercase text-emerald-400">Annual Target</span>
              <p className="text-xl font-black text-white">12 Villages / Year</p>
              <p className="text-[11px] text-slate-400">Comprehensive ecological & health aid</p>
            </div>
            <div className="p-5 bg-slate-950/70 border border-white/10 rounded-2xl space-y-1">
              <span className="text-[10px] font-black uppercase text-blue-400">Five-Year Vision</span>
              <p className="text-xl font-black text-white">60 Model Villages</p>
              <p className="text-[11px] text-slate-400">State-wide rural transformation blueprint</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
            <Link
              to="/seva"
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded-xl shadow-lg transition flex items-center gap-1.5"
            >
              View Village Scorecards <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/sponsorship"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs rounded-xl border border-white/20 transition"
            >
              Sponsor a Village (80G CSR Desk)
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION: FINAL CONVERSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-12">
        <div className="bg-gradient-to-r from-slate-900 via-[#0A3D91] to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ready to Accelerate Your Enterprise?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Join over 15,000 business leaders across Maharashtra today. Receive your verified Digital ID card and directory placement immediately.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/join"
              className="px-8 py-4 bg-[#F57C00] hover:bg-[#e06f00] text-slate-950 font-black text-xs rounded-2xl shadow-xl transition flex items-center gap-2"
            >
              ENROLL IN BEGA INDIA <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-2xl border border-slate-700 transition"
            >
              Contact State Secretariat
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}