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
  Zap,
  Globe2,
  Scale,
  Handshake,
  Check,
  Briefcase,
  Search,
  BookOpen,
  GraduationCap,
  Trees,
  Flame,
  ChevronRight,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

const LIVE_NOTICES = [
  '⚡ BEGA Business Expo 2026: 500+ Exhibitors & 15,000+ Trade Delegates at CIDCO Grounds',
  '📢 MSME Capital Subsidies: Fast-track PMEGP, CGTMSE & Maharashtra PSI application window open',
  '🌱 One Month – One Village: 350+ native trees planted & 85 student kits distributed this month',
  '🛡️ BSR Support Desk: 18 Industrial clearances and payment default disputes resolved in 14 days',
];

const MEMBERSHIP_PLANS = [
  {
    id: 'Basic',
    name: 'Basic Membership',
    price: '₹999',
    period: '/year',
    popular: false,
    badge: 'Starter Pass',
    tagline: 'Essential digital identity verification & state-wide business network entry.',
    benefits: [
      'Official Member Digital ID Badge with QR Verification',
      'Entry to District-Level B2B Networking & Trade Meets',
      'Regular MSME Subsidy, Taxation & Regulatory Alerts',
      'Standard Access to BSR Grievance Redressal Desk',
      'Discounted Entry Passes for Seminars & Masterclasses',
    ],
    cta: 'Get Basic Membership',
    btnClass: 'bg-slate-900 hover:bg-slate-800 text-white',
    cardClass: 'border-slate-200/90 bg-white/90 hover:border-slate-300',
  },
  {
    id: 'Business',
    name: 'Business Membership',
    price: '₹2,499',
    period: '/year',
    popular: true,
    badge: 'Most Popular & Best Value',
    tagline: 'High-visibility directory placement, active B2B matchmaking & priority dispute routing.',
    benefits: [
      'Verified Listing in the State Business Directory with Catalog',
      'Direct B2B Referral Lead Matchmaker & Buyer Linkages',
      'Priority Legal & CA Guidance for Delayed Payments (MSME SAMADHAAN)',
      'VIP Delegate Conclave Pass & Priority Expo Stall Allotment',
      'Eligibility for District & State Business Excellence Awards',
      'Direct Participation in "One Month – One Village" CSR Drives',
    ],
    cta: 'Join as Business Member',
    btnClass: 'bg-gradient-to-r from-[#F57C00] to-amber-500 hover:from-[#e06f00] hover:to-amber-600 text-white font-black shadow-lg shadow-orange-500/20',
    cardClass: 'border-2 border-[#F57C00] bg-gradient-to-b from-orange-50/40 via-white to-white ring-4 ring-orange-500/10 shadow-2xl scale-[1.02] md:-translate-y-2',
  },
  {
    id: 'Lifetime',
    name: 'Lifetime Membership',
    price: '₹9,999',
    period: 'one-time',
    popular: false,
    badge: 'Permanent Status',
    tagline: 'Permanent directory verification, executive leadership circles & VIP conclave privileges.',
    benefits: [
      'Permanent Lifetime Verified Badge on Digital Directory',
      'VIP Stage Access & Delegate Entry for All State Conventions',
      'Highest Priority Fast-Track Case Escalation in Grievance Cell',
      'Executive Invitation to Annual Business Leaders Roundtables',
      'Featured Corporate Profile in State Annual Business Report',
    ],
    cta: 'Claim Lifetime Status',
    btnClass: 'bg-[#0A3D91] hover:bg-[#083278] text-white font-extrabold shadow-md',
    cardClass: 'border-slate-200/90 bg-white/90 hover:border-blue-300',
  },
  {
    id: 'Executive',
    name: 'Executive Membership',
    price: 'By Nomination',
    period: 'Term Based',
    popular: false,
    badge: 'Leadership Role',
    tagline: 'Committee leadership, taluka/district governance, policy advocacy & social oversight.',
    benefits: [
      'Official Committee Appointment Credentials & Authority',
      'Voting Rights and Agenda Formulation in Leadership Councils',
      'Direct Coordination with Local Administration & Government Desks',
      'Leadership Oversight for Taluka-Level BEGA Seva Village Drives',
    ],
    cta: 'Apply for Executive Role',
    btnClass: 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-extrabold',
    cardClass: 'border-amber-200 bg-gradient-to-b from-amber-50/30 to-white hover:border-amber-400',
  },
];

const ELEVEN_REASONS = [
  { title: 'Business Growth', desc: 'Structured scaling roadmaps, market expansion masterclasses, and revenue acceleration support.' },
  { title: 'Business Networking', desc: 'Build direct connections with 15,000+ verified entrepreneurs, OEM buyers, and bulk distributors.' },
  { title: 'Expert Guidance', desc: 'Direct access to experienced Chartered Accountants, Corporate Advocates, and Senior Bankers.' },
  { title: 'Training & Mentorship', desc: '14+ specialized training tracks spanning Digital Marketing, Export, Compliance, and Finance.' },
  { title: 'Government Schemes', desc: 'End-to-end guidance in claiming capital subsidies and incentives under PMEGP, CGTMSE, and PSI.' },
  { title: 'Legal & Dispute Protection', desc: 'Institutional representation against unfair trade pressure, false complaints, and regulatory delays.' },
  { title: 'BSR Grievance Cell', desc: 'Fast-track institutional resolution desk for delayed commercial payments, licences, and NOCs.' },
  { title: 'Market & B2B Linkages', desc: 'Direct supply-chain matchmaking connecting manufacturers with retailers and procurement teams.' },
  { title: 'State Expos & Conclaves', desc: 'Showcase machines and products to over 15,000 trade visitors at the annual BEGA Business Expo.' },
  { title: 'Social Impact (BEGA Seva)', desc: 'Channel your CSR contribution transparently through the "One Month – One Village" rural initiative.' },
  { title: 'State Recognition', desc: 'Compete for prestigious Taluka, District, and Maharashtra State Business Excellence Awards.' },
];

const DIRECTORY_CATEGORIES = [
  { name: 'Manufacturing & Industrial', count: '1,420+ Units', icon: Building2, color: 'text-blue-700 bg-blue-50 border-blue-100' },
  { name: 'Digital & IT Solutions', count: '850+ Agencies', icon: Zap, color: 'text-amber-700 bg-amber-50 border-amber-100' },
  { name: 'Agro & Food Processing', count: '940+ Hubs', icon: Globe2, color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
  { name: 'Heavy Engineering & Auto', count: '620+ Plants', icon: Briefcase, color: 'text-rose-700 bg-rose-50 border-rose-100' },
];

export default function Home() {
  const [noticeIdx, setNoticeIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setNoticeIdx((prev) => (prev + 1) % LIVE_NOTICES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#F57C00] selection:text-white space-y-24 py-6 overflow-x-hidden">
      
      {/* 1. DYNAMIC TICKER PULSE BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm rounded-2xl py-2.5 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="px-2.5 py-0.5 rounded-full bg-[#F57C00] text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shrink-0 animate-pulse">
              <Flame className="w-3 h-3 fill-white" /> Live Broadcast
            </span>
            <p className="truncate text-xs font-semibold text-slate-700 transition-all duration-500">
              {LIVE_NOTICES[noticeIdx]}
            </p>
          </div>
          <Link to="/news" className="hidden sm:flex items-center gap-1 text-[#0A3D91] hover:underline font-extrabold text-[11px] shrink-0">
            View Updates &rarr;
          </Link>
        </div>
      </div>

      {/* 2. HERO BANNER WITH GRADIENT GLOW */}
      <section className="relative pt-4 pb-12 px-4 sm:px-8">
        {/* Subtle Ambient Light Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-200/40 via-orange-100/30 to-transparent blur-[140px] pointer-events-none -z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-10 text-center">
          
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0A3D91] text-xs font-black uppercase tracking-widest shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#F57C00]" /> Business Empowerment and Growth Association
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Protecting Your Business Rights.<br />
              <span className="bg-gradient-to-r from-[#0A3D91] via-blue-700 to-[#F57C00] bg-clip-text text-transparent">
                Empowering Enterprise Growth Across Maharashtra.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Join 15,000+ verified entrepreneurs, manufacturers, traders, and startups across 36 districts. Get verified digital ID credentials, access B2B matchmaking, unlock MSME subsidies, and fast-track dispute resolutions.
            </p>

            <div className="text-xs font-black text-[#F57C00] tracking-widest uppercase py-1">
              Growth • Trust • Success
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-3.5 pt-2">
              <Link
                to="/join"
                className="px-8 py-4 bg-gradient-to-r from-[#F57C00] to-amber-500 hover:from-[#e06f00] hover:to-amber-600 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
              >
                JOIN BEGA NOW <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/membership"
                className="px-7 py-4 bg-[#0A3D91] hover:bg-[#083278] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg hover:shadow-blue-900/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                VIEW MEMBERSHIP PLANS
              </Link>
              <Link
                to="/directory"
                className="px-7 py-4 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-extrabold text-xs sm:text-sm rounded-2xl shadow-xs hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-[#0A3D91]" /> EXPLORE DIRECTORY
              </Link>
              <Link
                to="/support"
                className="px-6 py-4 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-extrabold text-xs sm:text-sm rounded-2xl transition flex items-center gap-1.5"
              >
                <LifeBuoy className="w-4 h-4 text-rose-600" /> REGISTER ISSUE
              </Link>
            </div>
          </div>

          {/* Interactive Floating Metric Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-3xl text-center space-y-1 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
              <p className="text-3xl sm:text-4xl font-black text-[#0A3D91]">36</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Districts Covered</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-3xl text-center space-y-1 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300">
              <p className="text-3xl sm:text-4xl font-black text-[#F57C00]">15,000+</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Business Network</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-3xl text-center space-y-1 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300">
              <p className="text-3xl sm:text-4xl font-black text-emerald-700">₹4.2 Cr+</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Subsidies Unlocked</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-3xl text-center space-y-1 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300">
              <p className="text-3xl sm:text-4xl font-black text-purple-700">60</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Villages / 5-Yr Target</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. DYNAMIC MEMBERSHIP CONVERSION TIERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-orange-50 border border-orange-200 text-[#F57C00] text-xs font-black rounded-full uppercase tracking-wider">
            Membership Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900">
            Choose the Right Plan for Your Enterprise
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Instant digital ID verification, verified directory marketing, state subsidy advocacy, and dedicated problem-solving desks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`p-7 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-6 ${plan.cardClass}`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span
                    className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${
                      plan.popular
                        ? 'bg-[#F57C00] text-white border-orange-600 shadow-sm'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 pt-1">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">{plan.price}</span>
                    <span className="text-xs text-slate-500 font-bold">{plan.period}</span>
                  </div>
                  <p className="text-xs text-slate-600 pt-1 leading-relaxed font-medium">{plan.tagline}</p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs">
                  <p className="font-extrabold text-slate-800 uppercase text-[10px] tracking-wider">Included Benefits:</p>
                  <ul className="space-y-2 text-slate-700">
                    {plan.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[11px] leading-snug">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                to="/join"
                className={`w-full py-3.5 rounded-xl text-xs text-center transition-all block font-bold ${plan.btnClass}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY JOIN BEGA? (11 ADVANTAGES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-blue-50 border border-blue-200 text-[#0A3D91] text-xs font-black rounded-full uppercase tracking-wider">
            Enterprise Advantages
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Why Business Owners Choose BEGA India
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            A comprehensive institutional ecosystem built to resolve daily commercial hurdles while expanding trade opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ELEVEN_REASONS.map((reason, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-slate-200/90 rounded-3xl space-y-3 hover:shadow-md hover:border-slate-300 transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-black text-[#0A3D91] text-xs group-hover:bg-[#0A3D91] group-hover:text-white transition-colors">
                {idx + 1}
              </div>
              <h3 className="text-base font-black text-slate-900">{reason.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{reason.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SIX CORE PILLARS MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black rounded-full uppercase tracking-wider">
            Foundational Matrix
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            The Six Core Pillars of BEGA India
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-8 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xs hover:border-orange-300 transition">
            <TrendingUp className="w-8 h-8 text-[#F57C00]" />
            <h3 className="text-lg font-black text-slate-900">1. Business Growth</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Training, marketing awareness, networking, B2B opportunities, and commercial development across all 36 districts of Maharashtra.
            </p>
          </div>

          <div className="p-8 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xs hover:border-blue-300 transition">
            <ShieldCheck className="w-8 h-8 text-[#0A3D91]" />
            <h3 className="text-lg font-black text-slate-900">2. Business Protection</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Legal awareness, proper documentation guidance, fraud alerts, and institutional representation against unlawful harassment.
            </p>
          </div>

          <div className="p-8 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xs hover:border-emerald-300 transition">
            <Scale className="w-8 h-8 text-emerald-600" />
            <h3 className="text-lg font-black text-slate-900">3. Government Connect</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Unlocking MSME capital subsidies, PMEGP, CGTMSE credit guarantees, industrial licences, and administrative representations.
            </p>
          </div>

          <div className="p-8 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xs hover:border-rose-300 transition">
            <LifeBuoy className="w-8 h-8 text-rose-600" />
            <h3 className="text-lg font-black text-slate-900">4. Problem Resolution</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Structured BSR grievance ticketing, commercial mediation, delayed payment recovery, and verified Expert Panel referrals.
            </p>
          </div>

          <div className="p-8 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xs hover:border-purple-300 transition">
            <Handshake className="w-8 h-8 text-purple-600" />
            <h3 className="text-lg font-black text-slate-900">5. Business Opportunities</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              BEGA Business Expo, buyer-seller conclaves, state trade expos, procurement matching, and verified supplier networks.
            </p>
          </div>

          <div className="p-8 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xs hover:border-cyan-300 transition">
            <Globe2 className="w-8 h-8 text-cyan-600" />
            <h3 className="text-lg font-black text-slate-900">6. Grassroots Development</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Startup mentorship, women entrepreneurship cell, youth innovation, and the flagship "One Month – One Village" social movement.
            </p>
          </div>
        </div>
      </section>

      {/* 6. STATE DIRECTORY EXPLORER PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="bg-white border border-slate-200/90 p-8 sm:p-12 rounded-3xl space-y-8 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                B2B Marketplace & Directory
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900">Find Verified Suppliers & Buyers</h2>
              <p className="text-xs text-slate-600 font-medium">Explore manufacturers, distributors, and certified MSMEs across Maharashtra.</p>
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
                  className={`p-6 rounded-2xl border transition hover:shadow-md hover:scale-[1.02] group ${cat.color}`}
                >
                  <Icon className="w-7 h-7 mb-3" />
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-[#0A3D91] transition">{cat.name}</h3>
                  <p className="text-xs text-slate-600 font-bold mt-0.5">{cat.count}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. BEGA SEVA: ONE MONTH ONE VILLAGE BLUEPRINT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-br from-[#0A3D91] via-blue-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="px-3.5 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-black rounded-full uppercase tracking-wider border border-emerald-500/30">
              Flagship Social Movement
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              BEGA Seva: "One Month – One Village" Transformation
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              We believe business growth and social responsibility must move together. Through structured corporate sponsorships and volunteer mobilization, we transform 1 village every month.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold pt-2">
            <div className="p-5 bg-white/10 rounded-2xl border border-white/15 space-y-1 backdrop-blur-md">
              <p className="text-amber-300 uppercase text-[10px]">Monthly Commitment</p>
              <p className="text-xl font-black text-white">1 Month = 1 Village</p>
              <p className="text-[11px] text-slate-300">Needs survey, water & health delivery</p>
            </div>
            <div className="p-5 bg-white/10 rounded-2xl border border-white/15 space-y-1 backdrop-blur-md">
              <p className="text-emerald-300 uppercase text-[10px]">Annual Impact</p>
              <p className="text-xl font-black text-white">12 Months = 12 Villages</p>
              <p className="text-[11px] text-slate-300">Documented before/after impact scorecards</p>
            </div>
            <div className="p-5 bg-white/10 rounded-2xl border border-white/15 space-y-1 backdrop-blur-md">
              <p className="text-blue-300 uppercase text-[10px]">Five-Year Goal</p>
              <p className="text-xl font-black text-white">5 Years = 60 Villages</p>
              <p className="text-[11px] text-slate-300">State-wide rural transformation blueprint</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/15">
            <Link
              to="/seva"
              className="px-6 py-3.5 bg-[#F57C00] hover:bg-[#e06f00] text-white font-black text-xs rounded-xl shadow transition"
            >
              Explore Village Impact Reports
            </Link>
            <Link
              to="/sponsorship"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs rounded-xl border border-white/25 transition"
            >
              Sponsor a Village (80G CSR Desk)
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ready to Accelerate Your Enterprise?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Join over 15,000 business leaders, manufacturers, and startups across Maharashtra today. Receive your verified Digital ID card and directory placement immediately.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/join"
              className="px-8 py-4 bg-[#F57C00] hover:bg-[#e06f00] text-white font-black text-xs rounded-xl shadow-lg transition flex items-center gap-2"
            >
              ENROLL IN BEGA INDIA <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition"
            >
              Speak with Head Office
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}