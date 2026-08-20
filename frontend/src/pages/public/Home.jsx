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
  Lock,
  ArrowUpRight,
  Scale,
  Handshake,
  Check,
  Briefcase,
  Search,
  BookOpen,
  GraduationCap,
  Trees,
} from 'lucide-react';

const MEMBERSHIP_PLANS = [
  {
    id: 'Basic',
    name: 'Basic Membership',
    price: '₹999',
    period: '/year',
    popular: false,
    badge: 'Starter Pass',
    tagline: 'Entry-level credentials, digital membership card, state notifications & network meets.',
    benefits: [
      'Official Member Digital ID Badge with QR Verification',
      'Entry to District-Level B2B Networking & Trade Meets',
      'Regular MSME Subsidy, Taxation & Regulatory Alerts',
      'Standard Access to BSR Support & Help Desk',
      'Discounted Entry to State Seminars & Workshops',
    ],
    cta: 'Get Basic Membership',
    buttonColor: 'bg-slate-800 hover:bg-slate-900 text-white',
    cardBorder: 'border-slate-200 bg-white shadow-sm',
  },
  {
    id: 'Business',
    name: 'Business Membership',
    price: '₹2,499',
    period: '/year',
    popular: true,
    badge: 'Most Popular & Best Value',
    tagline: 'Verified directory listing, B2B matchmaking, expert legal routing & expo discounts.',
    benefits: [
      'Verified Listing in the State Business Directory with Contact & Catalog',
      'Direct B2B Matchmaker Lead Inquiries & Buyer Linkages',
      'Priority Legal & CA Guidance for Delayed Payments & Licences',
      'VIP Delegate Conclave Pass & Expo Stall Booking Priority',
      'Eligibility for District & State Business Excellence Awards',
      'Direct Participation in "One Month – One Village" CSR Initiatives',
    ],
    cta: 'Join as Business Member',
    buttonColor: 'bg-gradient-to-r from-[#F57C00] to-amber-500 hover:from-[#e06f00] hover:to-amber-600 text-white font-black shadow-md',
    cardBorder: 'border-2 border-[#F57C00] bg-white shadow-xl ring-4 ring-orange-500/10',
  },
  {
    id: 'Lifetime',
    name: 'Lifetime Membership',
    price: '₹9,999',
    period: 'one-time',
    popular: false,
    badge: 'Permanent Status',
    tagline: 'Permanent directory badge, VIP conclave seating & executive roundtables.',
    benefits: [
      'Permanent Lifetime Verified Badge on Digital Directory',
      'VIP Stage Access & Delegate Entry for All State Events',
      'Highest Priority Case Escalation in Grievance Cell',
      'Executive Invitation to Annual Business Leaders Roundtables',
      'Prominent Feature in the Annual State Business & Seva Report',
    ],
    cta: 'Claim Lifetime Status',
    buttonColor: 'bg-[#0A3D91] hover:bg-[#083278] text-white font-extrabold shadow-md',
    cardBorder: 'border-slate-200 bg-white shadow-sm',
  },
  {
    id: 'Executive',
    name: 'Executive Membership',
    price: 'By Appointment',
    period: 'Term Based',
    popular: false,
    badge: 'Leadership Role',
    tagline: 'Committee leadership, district governance, policy advocacy & social oversight.',
    benefits: [
      'Official Committee Appointment Credentials & Administrative Authority',
      'Voting Rights and Agenda Formulation in Leadership Councils',
      'Direct Coordination with Local Administration & Government Bodies',
      'Leadership Oversight for Taluka-Level BEGA Seva Village Adoption',
    ],
    cta: 'Apply for Executive Role',
    buttonColor: 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-extrabold',
    cardBorder: 'border-amber-200 bg-amber-50/30 shadow-sm',
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

const DIRECTORY_CATEGORIES = [
  { name: 'Manufacturing & Industrial', count: '1,420+ Units', icon: Building2, color: 'text-blue-700 bg-blue-50 border-blue-100' },
  { name: 'Digital & IT Solutions', count: '850+ Agencies', icon: Zap, color: 'text-amber-700 bg-amber-50 border-amber-100' },
  { name: 'Agro & Food Processing', count: '940+ Hubs', icon: Globe2, color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
  { name: 'Heavy Engineering & Auto', count: '620+ Plants', icon: Briefcase, color: 'text-rose-700 bg-rose-50 border-rose-100' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#F57C00] selection:text-white space-y-20 py-8">
      
      {/* 1. HERO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-10">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0A3D91] text-xs font-black uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#F57C00]" /> Business Empowerment and Growth Association
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
            Protecting Your Business Rights.<br />
            <span className="text-[#0A3D91]">
              Empowering Enterprise Growth Across Maharashtra.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            BEGA India connects entrepreneurs, MSMEs, traders, and startups with verified B2B networking, government subsidy unlocking, commercial grievance resolution (BSR), and grassroots social development.
          </p>

          <div className="text-xs font-black text-[#F57C00] tracking-widest uppercase">
            Growth • Trust • Success
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
            <Link
              to="/join"
              className="px-8 py-4 bg-[#F57C00] hover:bg-[#e06f00] text-white font-black text-xs rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              JOIN BEGA NOW <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/membership"
              className="px-6 py-4 bg-[#0A3D91] hover:bg-[#083278] text-white font-extrabold text-xs rounded-xl shadow-md transition"
            >
              VIEW MEMBERSHIP PLANS
            </Link>
            <Link
              to="/directory"
              className="px-6 py-4 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-extrabold text-xs rounded-xl shadow-xs transition"
            >
              EXPLORE BUSINESS DIRECTORY
            </Link>
            <Link
              to="/support"
              className="px-6 py-4 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-extrabold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <LifeBuoy className="w-4 h-4 text-rose-600" /> REGISTER BUSINESS ISSUE
            </Link>
          </div>
        </div>

        {/* Live Key Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 max-w-5xl mx-auto">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-1 shadow-sm">
            <p className="text-3xl font-black text-[#0A3D91]">36</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Districts Covered</p>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-1 shadow-sm">
            <p className="text-3xl font-black text-[#F57C00]">15,000+</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Business Network</p>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-1 shadow-sm">
            <p className="text-3xl font-black text-emerald-700">₹4.2 Cr+</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Subsidies Facilitated</p>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-1 shadow-sm">
            <p className="text-3xl font-black text-purple-700">60</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Villages / 5-Yr Target</p>
          </div>
        </div>
      </section>

      {/* 2. MEMBERSHIP TIERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-orange-50 border border-orange-200 text-[#F57C00] text-xs font-black rounded-full uppercase tracking-wider">
            Membership Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Choose the Right Membership for Your Enterprise
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Instant digital ID verification, marketing exposure, government scheme guidance, and dedicated grievance resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`p-7 rounded-3xl border transition-all flex flex-col justify-between space-y-6 ${plan.cardBorder}`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span
                    className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                      plan.popular
                        ? 'bg-orange-100 text-[#F57C00] border-orange-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">{plan.price}</span>
                    <span className="text-xs text-slate-500 font-bold">{plan.period}</span>
                  </div>
                  <p className="text-xs text-slate-600 pt-1 leading-relaxed">{plan.tagline}</p>
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
                className={`w-full py-3.5 rounded-xl text-xs text-center shadow transition block ${plan.buttonColor}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY JOIN BEGA? (11 REASONS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-blue-50 border border-blue-200 text-[#0A3D91] text-xs font-black rounded-full uppercase tracking-wider">
            Enterprise Advantages
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Why Business Owners Choose BEGA India
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A comprehensive ecosystem built to resolve daily commercial hurdles while unlocking new trade avenues.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ELEVEN_REASONS.map((reason, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-slate-200 rounded-3xl space-y-2 hover:shadow-md transition"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-black text-[#0A3D91] text-xs">
                {idx + 1}
              </div>
              <h3 className="text-base font-black text-slate-900">{reason.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{reason.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SIX CORE PILLARS */}
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
          <div className="p-7 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xs">
            <TrendingUp className="w-8 h-8 text-[#F57C00]" />
            <h3 className="text-lg font-black text-slate-900">1. Business Growth</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Training, marketing awareness, networking, B2B opportunities, and commercial development across all 36 districts of Maharashtra.
            </p>
          </div>

          <div className="p-7 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xs">
            <ShieldCheck className="w-8 h-8 text-[#0A3D91]" />
            <h3 className="text-lg font-black text-slate-900">2. Business Protection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Legal awareness, proper documentation guidance, fraud alerts, and institutional representation against unlawful harassment.
            </p>
          </div>

          <div className="p-7 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xs">
            <Scale className="w-8 h-8 text-emerald-600" />
            <h3 className="text-lg font-black text-slate-900">3. Government Connect</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlocking MSME capital subsidies, PMEGP, CGTMSE credit guarantees, industrial licences, and administrative representations.
            </p>
          </div>

          <div className="p-7 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xs">
            <LifeBuoy className="w-8 h-8 text-rose-600" />
            <h3 className="text-lg font-black text-slate-900">4. Problem Resolution</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Structured BSR grievance ticketing, commercial mediation, delayed payment recovery, and verified Expert Panel referrals.
            </p>
          </div>

          <div className="p-7 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xs">
            <Handshake className="w-8 h-8 text-purple-600" />
            <h3 className="text-lg font-black text-slate-900">5. Business Opportunities</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              BEGA Business Expo, buyer-seller conclaves, state trade expos, procurement matching, and verified supplier networks.
            </p>
          </div>

          <div className="p-7 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xs">
            <Globe2 className="w-8 h-8 text-cyan-600" />
            <h3 className="text-lg font-black text-slate-900">6. Grassroots Development</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Startup mentorship, women entrepreneurship cell, youth innovation, and the flagship "One Month – One Village" social movement.
            </p>
          </div>
        </div>
      </section>

      {/* 5. STATE BUSINESS DIRECTORY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="bg-white border border-slate-200 p-8 sm:p-12 rounded-3xl space-y-8 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                B2B Marketplace & Directory
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900">Find Verified Suppliers & Buyers</h2>
              <p className="text-xs text-slate-600">Explore manufacturers, distributors, and certified MSMEs across Maharashtra.</p>
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
                  className={`p-5 rounded-2xl border transition hover:shadow-md group ${cat.color}`}
                >
                  <Icon className="w-6 h-6 mb-3" />
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-[#0A3D91] transition">{cat.name}</h3>
                  <p className="text-xs text-slate-600 font-bold mt-0.5">{cat.count}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. BEGA SEVA — ONE MONTH ONE VILLAGE BLUEPRINT */}
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
            <div className="p-5 bg-white/10 rounded-2xl border border-white/15 space-y-1">
              <p className="text-amber-300 uppercase text-[10px]">Monthly Commitment</p>
              <p className="text-xl font-black text-white">1 Month = 1 Village</p>
              <p className="text-[11px] text-slate-300">Complete needs analysis & execution</p>
            </div>
            <div className="p-5 bg-white/10 rounded-2xl border border-white/15 space-y-1">
              <p className="text-emerald-300 uppercase text-[10px]">Annual Impact</p>
              <p className="text-xl font-black text-white">12 Months = 12 Villages</p>
              <p className="text-[11px] text-slate-300">Comprehensive ecological & health aid</p>
            </div>
            <div className="p-5 bg-white/10 rounded-2xl border border-white/15 space-y-1">
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

      {/* 7. FINAL ENROLLMENT CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-10">
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