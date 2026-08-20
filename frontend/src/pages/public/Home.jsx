import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  Store,
  LifeBuoy,
  FileCheck2,
  GraduationCap,
  Trees,
  Briefcase,
  Layers,
  Scale,
  Handshake,
  Check,
  Star,
  Globe2,
} from 'lucide-react';

const MEMBERSHIP_PLANS = [
  {
    id: 'Basic',
    name: 'Basic Membership',
    price: '₹999',
    period: '/year',
    popular: false,
    badge: 'Starter Entry',
    description: 'For emerging entrepreneurs and independent traders seeking entry into Maharashtra\'s business network.',
    benefits: [
      'Official BEGA Member Digital Identity Badge with QR Code',
      'Entry to district-level networking and buyer-seller meets',
      'Regular regulatory, taxation, and MSME scheme notifications',
      'Standard access to the Business Support Grievance Cell (BSR)',
      'Member registration discounts on seminars and workshops',
    ],
    cta: 'Select Basic Plan',
    buttonColor: 'bg-slate-800 hover:bg-slate-700 text-white',
  },
  {
    id: 'Business',
    name: 'Business Membership',
    price: '₹2,499',
    period: '/year',
    popular: true,
    badge: 'Most Popular & Best Value',
    description: 'For active MSMEs, manufacturers, and service enterprises looking to scale visibility, sales, and B2B linkages.',
    benefits: [
      'Verified listing on the State Business Directory with contact & catalog',
      'B2B referral lead matchmaker & priority procurement requests',
      'Dedicated case handling by the Expert Panel (CA, Advocates, Tax advisors)',
      'VIP delegate pass & stall booking priority at BEGA Business Expo',
      'Eligibility for District & State Business Excellence Awards',
      'Direct participation in "One Month – One Village" CSR initiatives',
    ],
    cta: 'Join as Business Member',
    buttonColor: 'bg-gradient-to-r from-[#F57C00] to-amber-500 hover:from-[#e06f00] hover:to-amber-600 text-slate-950 font-black',
  },
  {
    id: 'Lifetime',
    name: 'Lifetime Membership',
    price: '₹9,999',
    period: 'one-time',
    popular: false,
    badge: 'Permanent Status',
    description: 'For established industrialists, corporate founders, and business leaders seeking permanent representation.',
    benefits: [
      'Permanent Lifetime Verified Badge on the digital business directory',
      'VIP stage access & conclave delegate pass for all future state events',
      'Highest priority resolution routing in the Business Grievance Desk',
      'Invitation to the executive BEGA Business Leaders Roundtables',
      'Prominent corporate recognition in annual state publications and reports',
    ],
    cta: 'Secure Lifetime Status',
    buttonColor: 'bg-[#0A3D91] hover:bg-[#083278] text-white font-extrabold',
  },
  {
    id: 'Executive',
    name: 'Executive Membership',
    price: 'By Appointment',
    period: 'Term Based',
    popular: false,
    badge: 'Leadership Role',
    description: 'For appointed committee chairs, taluka/district leaders, and industry federation representatives.',
    benefits: [
      'Official committee appointment credentials & administrative authority',
      'Voting rights and agenda formulation in divisional leadership councils',
      'Direct coordination with local municipal and state government departments',
      'Leadership oversight for taluka-level BEGA Seva village adoption drives',
    ],
    cta: 'Apply for Executive Role',
    buttonColor: 'bg-slate-800 hover:bg-slate-700 text-amber-400 font-extrabold border border-amber-500/30',
  },
];

const ELEVEN_REASONS = [
  { title: 'Business Growth', desc: 'Structured growth roadmaps, revenue acceleration workshops, and scaling support.' },
  { title: 'Business Networking', desc: 'Build direct connections with 15,000+ verified entrepreneurs, buyers, and suppliers.' },
  { title: 'Expert Guidance', desc: 'Direct access to experienced Chartered Accountants, Legal Counsel, and Bankers.' },
  { title: 'Training & Mentorship', desc: '14+ specialized training tracks spanning Digital Marketing, Export, HR, and Finance.' },
  { title: 'Government Schemes', desc: 'Assistance in securing capital subsidies and incentives under PMEGP, CGTMSE, and PSI.' },
  { title: 'Legal & Regulatory Protection', desc: 'Institutional representation against unfair pressure, false complaints, and bureaucratic delays.' },
  { title: 'BSR Support Cell', desc: 'Fast-track resolution desk for delayed commercial payments, licences, and NOCs.' },
  { title: 'Market & B2B Linkages', desc: 'Direct supply-chain linkages connecting manufacturers, distributors, and bulk buyers.' },
  { title: 'State Expos & Conclaves', desc: 'Showcase products to over 15,000 visitors at the annual BEGA Business Expo.' },
  { title: 'Social Participation', desc: 'Channel your CSR impact through the "One Month – One Village" development drive.' },
  { title: 'State Recognition', desc: 'Compete for prestigious Taluka, District, and Maharashtra State Business Awards.' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans space-y-24 py-8 overflow-hidden">
      
      {/* 1. HERO BANNER & VALUE PROPOSITION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-8">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-[#F57C00] text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> State Business Empowerment & Growth Network
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
            Protecting Your Business Rights.<br />
            <span className="bg-gradient-to-r from-blue-400 via-amber-300 to-[#F57C00] bg-clip-text text-transparent">
              Empowering Enterprise Growth Across Maharashtra.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Business Empowerment and Growth Association (BEGA India) is an institutional platform dedicated to commercial protection, government scheme unlocking, B2B market expansion, and grassroots social transformation.
          </p>

          <div className="text-xs font-black text-amber-400 tracking-widest uppercase py-1">
            Growth • Trust • Success
          </div>

          {/* Primary Action Buttons Grid */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/join"
              className="px-8 py-4 bg-gradient-to-r from-[#F57C00] to-amber-500 hover:from-[#e06f00] hover:to-amber-600 text-slate-950 font-black text-sm rounded-2xl shadow-xl hover:shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              JOIN BEGA NOW <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/membership"
              className="px-6 py-4 bg-[#0A3D91] hover:bg-[#083278] text-white font-extrabold text-xs rounded-2xl shadow-xl transition"
            >
              VIEW MEMBERSHIP PLANS
            </Link>
            <Link
              to="/directory"
              className="px-6 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-extrabold text-xs rounded-2xl transition"
            >
              EXPLORE BUSINESS DIRECTORY
            </Link>
            <Link
              to="/support"
              className="px-6 py-4 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-extrabold text-xs rounded-2xl transition flex items-center gap-1.5"
            >
              <LifeBuoy className="w-4 h-4 text-rose-400" /> REGISTER BUSINESS ISSUE
            </Link>
          </div>
        </div>

        {/* Live Key Metrics Ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-amber-400">36</p>
            <p className="text-xs text-slate-400 font-bold uppercase">Districts Covered</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-white">15,000+</p>
            <p className="text-xs text-slate-400 font-bold uppercase">Business Network</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-emerald-400">₹4.2 Cr+</p>
            <p className="text-xs text-slate-400 font-bold uppercase">Subsidies Facilitated</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-blue-400">60</p>
            <p className="text-xs text-slate-400 font-bold uppercase">Villages / 5-Yr Target</p>
          </div>
        </div>
      </section>

      {/* 2. MEMBERSHIP TIERS — THE CONVERSION ENGINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-orange-500/10 text-[#F57C00] border border-orange-500/20 text-xs font-black rounded-full uppercase tracking-wider">
            Membership Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Choose the Right Membership for Your Enterprise
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Every membership tier delivers practical commercial value: instant digital identity verification, marketing exposure, government scheme advocacy, and dedicated problem-solving desks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 sm:p-8 rounded-3xl border transition-all flex flex-col justify-between space-y-6 ${
                plan.popular
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-[#0A3D91]/30 border-[#F57C00] shadow-2xl ring-2 ring-orange-500/20'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span
                    className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                      plan.popular
                        ? 'bg-orange-500/20 text-[#F57C00] border-orange-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-white">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">{plan.price}</span>
                    <span className="text-xs text-slate-400 font-bold">{plan.period}</span>
                  </div>
                  <p className="text-xs text-slate-400 pt-1 leading-relaxed">{plan.description}</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-800 text-xs">
                  <p className="font-extrabold text-slate-300 uppercase text-[10px]">What is Included:</p>
                  <ul className="space-y-2 text-slate-300">
                    {plan.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] leading-snug">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                to="/join"
                className={`w-full py-3.5 rounded-xl text-xs font-black text-center shadow transition block ${plan.buttonColor}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY JOIN BEGA? (11 CORE ADVANTAGES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-black rounded-full uppercase tracking-wider">
            Enterprise Advantages
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Why Business Owners Choose BEGA India
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A 360-degree ecosystem built to address daily commercial hurdles while expanding trade opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ELEVEN_REASONS.map((reason, idx) => (
            <div
              key={idx}
              className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-2 hover:border-slate-700 transition"
            >
              <div className="w-9 h-9 rounded-xl bg-[#0A3D91]/50 border border-blue-500/30 flex items-center justify-center font-black text-amber-400 text-xs shadow-inner">
                {idx + 1}
              </div>
              <h3 className="text-base font-black text-white">{reason.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{reason.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SIX CORE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-black rounded-full uppercase tracking-wider">
            Foundational Matrix
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            The Six Core Pillars of BEGA India
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <TrendingUp className="w-8 h-8 text-[#F57C00]" />
            <h3 className="text-lg font-black text-white">1. Business Growth</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Training, marketing awareness, networking, B2B opportunities, and commercial development across all 36 districts of Maharashtra.
            </p>
          </div>

          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <ShieldCheck className="w-8 h-8 text-blue-400" />
            <h3 className="text-lg font-black text-white">2. Business Protection</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Legal awareness, proper documentation guidance, fraud alerts, and institutional representation against unlawful harassment.
            </p>
          </div>

          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <Scale className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-black text-white">3. Government Connect</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unlocking MSME capital subsidies, PMEGP, CGTMSE credit guarantees, industrial licences, and administrative representations.
            </p>
          </div>

          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <LifeBuoy className="w-8 h-8 text-rose-400" />
            <h3 className="text-lg font-black text-white">4. Problem Resolution</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Structured BSR grievance ticketing, commercial mediation, delayed payment recovery, and verified Expert Panel referrals.
            </p>
          </div>

          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <Handshake className="w-8 h-8 text-purple-400" />
            <h3 className="text-lg font-black text-white">5. Business Opportunities</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              BEGA Business Expo, buyer-seller conclaves, state trade expos, procurement matching, and verified supplier networks.
            </p>
          </div>

          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <Globe2 className="w-8 h-8 text-cyan-400" />
            <h3 className="text-lg font-black text-white">6. Grassroots Development</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Startup mentorship, women entrepreneurship cell, youth innovation, and the flagship "One Month – One Village" social movement.
            </p>
          </div>
        </div>
      </section>

      {/* 5. BEGA SEVA — ONE MONTH ONE VILLAGE BLUEPRINT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-br from-[#0A3D91] via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="px-3.5 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-black rounded-full uppercase tracking-wider border border-emerald-500/30">
              Flagship Social Movement
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              BEGA Seva: "One Month – One Village" Transformation
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              BEGA India believes business growth and social responsibility must move together. Through structured corporate sponsorships and volunteer mobilization, we transform 1 village every month.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold pt-2">
            <div className="p-4 bg-slate-950/60 rounded-2xl border border-white/10 space-y-1">
              <p className="text-amber-400 uppercase text-[10px]">Monthly Commitment</p>
              <p className="text-lg font-black text-white">1 Month = 1 Village</p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-2xl border border-white/10 space-y-1">
              <p className="text-emerald-400 uppercase text-[10px]">Annual Impact</p>
              <p className="text-lg font-black text-white">12 Months = 12 Villages</p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-2xl border border-white/10 space-y-1">
              <p className="text-blue-400 uppercase text-[10px]">Five-Year Goal</p>
              <p className="text-lg font-black text-white">5 Years = 60 Villages</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
            <Link
              to="/seva"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded-xl shadow transition"
            >
              Explore Village Impact Reports
            </Link>
            <Link
              to="/sponsorship"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs rounded-xl border border-white/20 transition"
            >
              Sponsor a Village (80G CSR Desk)
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FINAL ENROLLMENT CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-[#0A3D91] to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Ready to Accelerate Your Enterprise?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Join over 15,000 business leaders, manufacturers, and startups across Maharashtra today. Receive your verified Digital ID card and directory placement immediately.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/join"
              className="px-8 py-4 bg-[#F57C00] hover:bg-[#e06f00] text-slate-950 font-black text-xs rounded-xl shadow-xl transition flex items-center gap-2"
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