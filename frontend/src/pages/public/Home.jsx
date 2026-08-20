// src/pages/public/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import HeroSlider from '../../components/home/HeroSlider';
import {
  TrendingUp,
  ShieldCheck,
  Building2,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  Calendar,
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
  CheckCircle2,
  Flame,
  MapPin,
} from 'lucide-react';

const LIVE_NOTICES = [
  '⚡ BEGA Business Expo 2026: 500+ Exhibitors & 15,000+ Trade Delegates at CIDCO Grounds',
  '📢 MSME Capital Subsidies: Fast-track PMEGP, CGTMSE & Maharashtra PSI application window open',
  '🌱 One Month – One Village: 350+ native trees planted & 85 student kits distributed this month',
  '🛡️ BSR Support Desk: 18 Industrial clearances and payment default disputes resolved in 14 days',
];

const QUICK_PORTALS = [
  { label: 'Join BEGA', path: '/join', icon: Sparkles, color: 'bg-orange-50 text-[#F57C00] border-orange-200 hover:bg-orange-100' },
  { label: 'Membership Plans', path: '/membership', icon: Award, color: 'bg-blue-50 text-[#0A3D91] border-blue-200 hover:bg-blue-100' },
  { label: 'Business Directory', path: '/directory', icon: Building2, color: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100' },
  { label: 'Grievance Desk', path: '/support', icon: LifeBuoy, color: 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100' },
  { label: 'BEGA Seva (CSR)', path: '/seva', icon: Trees, color: 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100' },
  { label: 'Business Expo', path: '/expo', icon: Store, color: 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100' },
  { label: 'Events & Meets', path: '/events', icon: Calendar, color: 'bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100' },
  { label: 'Schemes & Guides', path: '/knowledge', icon: BookOpen, color: 'bg-teal-50 text-teal-900 border-teal-200 hover:bg-teal-100' },
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
    cta: 'Select Basic Plan',
    btnClass: 'bg-slate-900 hover:bg-slate-800 text-white',
    cardClass: 'border-slate-200 bg-white hover:shadow-md',
  },
  {
    id: 'Business',
    name: 'Business Membership',
    price: '₹2,499',
    period: '/year',
    popular: true,
    badge: 'Most Popular & Best ROI',
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
    cardClass: 'border-slate-200 bg-white hover:shadow-md',
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
    btnClass: 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-extrabold',
    cardClass: 'border-amber-200 bg-amber-50/30 hover:shadow-md',
  },
];

const BENEFIT_TABS = [
  {
    id: 'b2b',
    title: 'B2B Trade & Growth',
    icon: TrendingUp,
    badge: 'Revenue Expansion',
    heading: 'Expand Your Supplier & Buyer Pipeline Across 36 Districts',
    description:
      'BEGA India provides a verified B2B matchmaker engine. Connect your tools, forged components, agricultural produce, or IT services directly with bulk procurement teams without middleman commissions.',
    points: [
      'Verified digital directory placement with clickable catalog links',
      'Priority matchmaking at quarterly regional buyer-seller meets',
      'Exclusive access to the annual BEGA Business Expo with 15,000+ trade buyers',
    ],
    highlight: 'Over ₹18 Crore in business contracts facilitated in regional clusters.',
  },
  {
    id: 'protection',
    title: 'Legal & Dispute Redressal',
    icon: ShieldCheck,
    badge: 'BSR Cell',
    heading: 'Institutional Defense Against Payment Defaults & Undue Pressure',
    description:
      'Never fight bureaucratic delays or vendor payment defaults alone. The BEGA Business Support Request (BSR) Cell assigns dedicated Advocates and Chartered Accountants to represent your interests.',
    points: [
      'Fast-track legal representation under MSME SAMADHAAN (45-day payment recovery)',
      'Guidance on false workplace complaints, labor disputes, and contract arbitration',
      'Direct representation before local municipal bodies, DIC, and licensing authorities',
    ],
    highlight: '100% legal & constitutional dispute resolution process.',
  },
  {
    id: 'subsidies',
    title: 'Govt Schemes & Subsidies',
    icon: Scale,
    badge: 'Capital Unlocking',
    heading: 'Claim Central & Maharashtra State Industrial Subsidies',
    description:
      'Our dedicated government scheme liaison desk helps micro and small businesses claim capital subsidies, interest concessions, and collateral-free banking credit.',
    points: [
      'PMEGP 15%–35% capital subsidy facilitation on new manufacturing & service units',
      'CGTMSE collateral-free credit guarantees up to ₹5 Crore with SIDBI partner banks',
      'Maharashtra Package Scheme of Incentives (PSI): Gross SGST refunds & power tariff waivers',
    ],
    highlight: '₹4.2 Crore+ in state subsidies already facilitated for member units.',
  },
  {
    id: 'training',
    title: 'Training & Recognition',
    icon: Award,
    badge: 'Skill & Prestige',
    heading: 'Executive Masterclasses, Digital Automation & State Awards',
    description:
      'Upskill your business operations with hands-on masterclasses covering digital funnels, automated invoicing, export logistics, and compete for prestigious state awards.',
    points: [
      'Hands-on training in digital marketing funnels, GST compliance, and HR systems',
      'Eligibility for annual Taluka, District, and Maharashtra State Business Excellence Awards',
      'Networking with industry pioneers and venture leaders at annual conclaves',
    ],
    highlight: 'Official credential badges and state-wide press release recognition.',
  },
];

const DIRECTORY_CATEGORIES = [
  { name: 'Manufacturing & Industrial', count: '1,420+ Units', icon: Building2, color: 'text-blue-700 bg-blue-50 border-blue-100' },
  { name: 'Digital & IT Solutions', count: '850+ Agencies', icon: Zap, color: 'text-amber-700 bg-amber-50 border-amber-100' },
  { name: 'Agro & Food Processing', count: '940+ Hubs', icon: Globe2, color: 'text-emerald-700 bg-emerald-700/10 border-emerald-100' },
  { name: 'Heavy Engineering & Auto', count: '620+ Plants', icon: Briefcase, color: 'text-rose-700 bg-rose-50 border-rose-100' },
];

export default function Home() {
  const [noticeIdx, setNoticeIdx] = useState(0);
  const [activeBenefit, setActiveBenefit] = useState('b2b');

  useEffect(() => {
    const timer = setInterval(() => {
      setNoticeIdx((prev) => (prev + 1) % LIVE_NOTICES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const selectedTab = BENEFIT_TABS.find((t) => t.id === activeBenefit) || BENEFIT_TABS[0];
  const TabIcon = selectedTab.icon;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#F57C00] selection:text-white space-y-16 py-6 overflow-x-hidden">
      
      {/* 1. SLIM TICKER BROADCAST */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white border border-slate-200/90 shadow-xs rounded-2xl py-2 px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="px-2 py-0.5 rounded-full bg-[#F57C00] text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shrink-0 animate-pulse">
              <Flame className="w-3 h-3 fill-white" /> Live Broadcast
            </span>
            <p className="truncate text-xs font-semibold text-slate-700">
              {LIVE_NOTICES[noticeIdx]}
            </p>
          </div>
          <Link to="/news" className="hidden sm:flex items-center gap-1 text-[#0A3D91] hover:underline font-extrabold text-[11px] shrink-0">
            View Updates &rarr;
          </Link>
        </div>
      </div>

      {/* 2. HERO SLIDER (ASSETS 1-4) RIGHT BELOW NAVBAR */}
      <HeroSlider />

      {/* 3. DYNAMIC 2-COLUMN SPLIT HERO SECTION */}
      <section className="relative px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0A3D91] text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#F57C00]" /> Business Empowerment & Growth Network
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-[1.12] tracking-tight">
              Protecting Your Rights.<br />
              <span className="bg-gradient-to-r from-[#0A3D91] via-blue-700 to-[#F57C00] bg-clip-text text-transparent">
                Accelerating Business Growth Across Maharashtra.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium max-w-xl">
              Connect with 15,000+ verified manufacturers, traders, and MSMEs across 36 districts. Get verified digital credentials, claim government subsidies, and fast-track commercial dispute resolution.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/join"
                className="px-6 py-3.5 bg-gradient-to-r from-[#F57C00] to-amber-500 hover:from-[#e06f00] hover:to-amber-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                JOIN BEGA NOW <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/membership"
                className="px-5 py-3.5 bg-[#0A3D91] hover:bg-[#083278] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all hover:scale-[1.02]"
              >
                MEMBERSHIP PLANS
              </Link>
              <Link
                to="/support"
                className="px-4 py-3.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-extrabold text-xs rounded-xl transition flex items-center gap-1.5"
              >
                <LifeBuoy className="w-4 h-4 text-rose-600" /> BSR Helpdesk
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/80 text-left">
              <div>
                <p className="text-xl font-black text-[#0A3D91]">36</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Districts Active</p>
              </div>
              <div>
                <p className="text-xl font-black text-[#F57C00]">15,000+</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Enterprise Pool</p>
              </div>
              <div>
                <p className="text-xl font-black text-emerald-700">₹4.2 Cr+</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Subsidies Claimed</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-gradient-to-br from-slate-900 via-[#0A3D91] to-slate-950 text-white rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-amber-400/40 relative overflow-hidden space-y-5">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#F57C00]/20 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-gradient-to-tr from-[#F57C00] to-amber-400 rounded-xl flex items-center justify-center font-black text-slate-950 text-base shadow">
                    B
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-white">BEGA INDIA</h3>
                    <p className="text-[9px] text-amber-300 font-semibold">Verified Enterprise Pass</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-black rounded-full border border-emerald-400/30">
                  ACTIVE
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider">Representative</span>
                <h4 className="text-base font-black text-white">Sachin Subhash Wathore</h4>
                <p className="text-xs font-bold text-amber-300">SW Multimedia & Digital Hub</p>
                <p className="text-[10px] text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#F57C00]" /> Chhatrapati Sambhajinagar, MH
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex justify-between items-center gap-2">
                <div className="space-y-1 text-[10px]">
                  <div>
                    <span className="text-slate-400 block font-bold text-[8px] uppercase">Member Number</span>
                    <span className="font-mono font-bold text-amber-300">BEGA-2026-849201</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold text-[8px] uppercase">Plan Level</span>
                    <span className="font-bold text-white">Business Membership</span>
                  </div>
                </div>
                <div className="bg-white p-1.5 rounded-xl shadow shrink-0">
                  <QRCodeSVG value="https://begaindia-platform.vercel.app/verify/BEGA-2026-849201" size={54} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/join"
                  className="w-full py-2 bg-gradient-to-r from-[#F57C00] to-amber-500 text-slate-950 text-center font-black text-[11px] rounded-xl shadow transition"
                >
                  Get Your Digital ID
                </Link>
                <Link
                  to="/directory"
                  className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-center font-bold text-[11px] rounded-xl border border-white/20 transition"
                >
                  Verify Directory
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. QUICK PORTALS TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex justify-between items-center px-1">
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
              Direct Digital Wings
            </span>
            <span className="text-[11px] font-bold text-[#0A3D91]">
              Instant Access
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {QUICK_PORTALS.map((portal, idx) => {
              const Icon = portal.icon;
              return (
                <Link
                  key={idx}
                  to={portal.path}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 shadow-xs hover:shadow-sm ${portal.color}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="text-[11px] font-extrabold leading-tight">{portal.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE VALUE MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 bg-blue-50 border border-blue-200 text-[#0A3D91] text-xs font-black rounded-full uppercase tracking-wider">
            Commercial Advantages
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            Why Business Owners Choose BEGA India
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Explore the actionable commercial solutions provided to registered enterprises.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {BENEFIT_TABS.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeBenefit === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveBenefit(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#0A3D91] text-white shadow-md font-black'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="px-2.5 py-0.5 bg-orange-50 text-[#F57C00] border border-orange-200 rounded-full text-[10px] font-black uppercase tracking-wider">
              {selectedTab.badge}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {selectedTab.heading}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {selectedTab.description}
            </p>

            <ul className="space-y-2 pt-1 text-xs text-slate-700 font-semibold">
              {selectedTab.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/join"
                className="px-5 py-2.5 bg-[#F57C00] hover:bg-[#e06f00] text-white font-black text-xs rounded-xl shadow transition flex items-center gap-1.5"
              >
                Claim This Advantage <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[11px] font-bold text-slate-500 italic">
                {selectedTab.highlight}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-[#0A3D91] to-slate-950 text-white rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                <TabIcon className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[9px] font-bold rounded-full">
                VERIFIED STATUS
              </span>
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-black text-white">{selectedTab.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedTab.highlight}</p>
            </div>
            <div className="p-3 bg-white/10 rounded-xl flex justify-between items-center text-xs font-bold text-amber-300">
              <span>All 36 Districts</span>
              <span>100% Redressal</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MEMBERSHIP TIERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 bg-orange-50 border border-orange-200 text-[#F57C00] text-xs font-black rounded-full uppercase tracking-wider">
            Membership Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            Choose the Right Membership Plan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Instant digital ID verification, marketing exposure, government scheme guidance, and dedicated dispute redressal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 sm:p-7 rounded-3xl border transition-all flex flex-col justify-between space-y-6 ${plan.cardClass}`}
            >
              <div className="space-y-4">
                <span
                  className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                    plan.popular
                      ? 'bg-orange-100 text-[#F57C00] border-orange-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {plan.badge}
                </span>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 pt-1">
                    <span className="text-3xl font-black text-slate-900">{plan.price}</span>
                    <span className="text-xs text-slate-500 font-bold">{plan.period}</span>
                  </div>
                  <p className="text-xs text-slate-600 pt-1 leading-relaxed font-medium">{plan.tagline}</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
                  <p className="font-extrabold text-slate-800 uppercase text-[10px]">What is Included:</p>
                  <ul className="space-y-2 text-slate-700">
                    {plan.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] leading-snug">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                to="/join"
                className={`w-full py-3.5 rounded-xl text-xs text-center shadow transition block font-bold ${plan.btnClass}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 7. VERIFIED DIRECTORY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="bg-white border border-slate-200/90 p-6 sm:p-10 rounded-3xl space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                B2B Marketplace & Directory
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Find Verified Suppliers & Buyers</h2>
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
                  className={`p-5 rounded-2xl border transition hover:shadow-md hover:scale-[1.02] group ${cat.color}`}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-[#0A3D91] transition">{cat.name}</h3>
                  <p className="text-xs text-slate-600 font-bold mt-0.5">{cat.count}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. BEGA SEVA: ONE MONTH ONE VILLAGE BLUEPRINT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-br from-[#0A3D91] via-blue-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
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
              <p className="text-[11px] text-slate-300">Surveys, health camps & school aid</p>
            </div>
            <div className="p-5 bg-white/10 rounded-2xl border border-white/15 space-y-1 backdrop-blur-md">
              <p className="text-emerald-300 uppercase text-[10px]">Annual Impact</p>
              <p className="text-xl font-black text-white">12 Months = 12 Villages</p>
              <p className="text-[11px] text-slate-300">Documented before/after scorecards</p>
            </div>
            <div className="p-5 bg-white/10 rounded-2xl border border-white/15 space-y-1 backdrop-blur-md">
              <p className="text-blue-300 uppercase text-[10px]">Five-Year Goal</p>
              <p className="text-xl font-black text-white">5 Years = 60 Villages</p>
              <p className="text-[11px] text-slate-300">State-wide rural transformation</p>
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

      {/* 9. FINAL ENROLLMENT CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-4">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
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