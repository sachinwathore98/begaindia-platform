import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Building2,
  Calendar,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Search,
  Briefcase,
  ChevronRight,
  PhoneCall,
  ShieldCheck,
  Star,
} from 'lucide-react';

export default function Home() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  // Membership Tier Data from SRS
  const plans = [
    {
      name: 'Silver',
      badge: 'Starter',
      priceMonthly: '₹999',
      priceAnnually: '₹9,999',
      description: 'Ideal for early-stage startups & individual professionals looking to connect.',
      popular: false,
      features: [
        'Standard Business Directory Listing',
        'Access to General Networking Events',
        'Basic Member Dashboard Access',
        'Community Forum & Support',
        'Monthly Email Newsletters',
      ],
      buttonText: 'Get Started with Silver',
      buttonStyle: 'border border-[#0A3D91] text-[#0A3D91] hover:bg-slate-100',
    },
    {
      name: 'Gold',
      badge: 'Most Popular',
      priceMonthly: '₹2,499',
      priceAnnually: '₹24,999',
      description: 'Perfect for growing MSMEs and businesses expanding their regional presence.',
      popular: true,
      features: [
        'Everything in Silver Tier',
        'Featured Business Directory Listing',
        'Priority Pass for Business Events',
        'Direct Member-to-Member B2B Connect',
        'Business Promotion & Banner Highlights',
        'Quarterly Growth Workshops',
      ],
      buttonText: 'Join Gold Tier',
      buttonStyle: 'bg-[#F57C00] text-white hover:bg-[#e06f00] shadow-md',
    },
    {
      name: 'Platinum',
      badge: 'Enterprise',
      priceMonthly: '₹4,999',
      priceAnnually: '₹49,999',
      description: 'Designed for established enterprises, manufacturers, and scale-ups.',
      popular: false,
      features: [
        'Everything in Gold Tier',
        'Top-Tier VIP Directory Listing',
        'VIP Access to Exclusive Leader Summits',
        'Dedicated Business Matchmaking Manager',
        'Media & Press Coverage Highlights',
        'Investor & Partner Connect Sessions',
      ],
      buttonText: 'Unlock Platinum',
      buttonStyle: 'bg-[#0A3D91] text-white hover:bg-[#083278]',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gradient-to-br from-[#0A3D91] via-[#09357d] to-[#052152] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Ambient Accents */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-[500px] h-[500px] bg-[#F57C00]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#F57C00]">
              <Sparkles className="w-4 h-4 text-[#F57C00]" />
              <span>India's Premier Business Networking Ecosystem</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Connecting Businesses. <br />
              <span className="text-[#F57C00]">Creating Opportunities.</span>
            </h1>

            <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Join thousands of entrepreneurs, MSMEs, traders, and enterprises. Expand your market reach, attend verified B2B summits, and accelerate revenue through collaborative networking.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#F57C00] hover:bg-[#e06f00] text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
              >
                Become a Member
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/directory"
                className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-xl backdrop-blur-sm transition flex items-center justify-center gap-2 text-sm"
              >
                <Search className="w-4 h-4" />
                Explore Directory
              </Link>
            </div>

            {/* Micro Stats */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">5,000+</p>
                <p className="text-xs text-slate-300">Active Businesses</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">120+</p>
                <p className="text-xs text-slate-300">Annual Events</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">98%</p>
                <p className="text-xs text-slate-300">Member Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Hero Card Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white text-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-100">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0A3D91] text-white flex items-center justify-center font-bold">
                    BI
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">BEGAINDIA Network</h3>
                    <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Verified Ecosystem
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-[#F57C00]/10 text-[#F57C00] rounded-full text-[10px] font-bold">
                  B2B Growth
                </span>
              </div>

              {/* Sample Members Inside Visual Card */}
              <div className="space-y-3 py-4">
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-8 h-8 p-1.5 bg-blue-100 text-[#0A3D91] rounded-lg" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">Trika Energy Ltd</p>
                      <p className="text-[10px] text-slate-500">Manufacturing & Energy</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">Gold</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-8 h-8 p-1.5 bg-orange-100 text-[#F57C00] rounded-lg" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">SW Digital Hub</p>
                      <p className="text-[10px] text-slate-500">Digital Marketing Agency</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">Platinum</span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-[#0A3D91] to-blue-800 rounded-2xl text-white text-center space-y-2">
                <p className="text-xs font-semibold">Your Next Business Deal Awaits</p>
                <Link
                  to="/register"
                  className="inline-block w-full py-2 bg-[#F57C00] hover:bg-[#e06f00] rounded-lg text-xs font-bold transition shadow"
                >
                  Create Your Business Profile Now
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= CORE MODULE BENEFIT HIGHLIGHTS ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <p className="text-xs font-bold text-[#F57C00] uppercase tracking-widest">Why Choose BEGAINDIA</p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Empowering Business Owners Across India
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            We provide the complete digital & offline infrastructure you need to get noticed, establish trusted partnerships, and drive sustainable revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 hover:shadow-lg transition space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#0A3D91] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Verified B2B Network</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Connect directly with verified decision-makers, business founders, traders, and corporate buyers.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 hover:shadow-lg transition space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#F57C00] flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Featured Business Directory</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Showcase your products and services in our searchable directory to thousands of active monthly visitors.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 hover:shadow-lg transition space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#0A3D91] flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Exclusive Summits & Meets</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gain pass codes and QR access to offline networking meets, industry expos, and digital masterclasses.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 hover:shadow-lg transition space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#F57C00] flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Accelerated Lead Growth</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gain direct inquiries, business leads, and strategic collaboration requests through your custom member dashboard.
            </p>
          </div>

        </div>
      </section>

      {/* ================= MEMBERSHIP PLANS & PRICING ================= */}
      <section className="py-20 bg-slate-900 text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <p className="text-xs font-bold text-[#F57C00] uppercase tracking-widest">Membership Plans</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold">Choose Your Path to Business Growth</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Select a flexible plan designed to support your current business scale and networking objectives.
            </p>

            {/* Billing Cycle Toggle */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
                Monthly Billing
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')}
                className="w-12 h-6 bg-slate-800 rounded-full p-1 border border-slate-700 relative transition"
              >
                <div
                  className={`w-4 h-4 bg-[#F57C00] rounded-full transition-transform ${
                    billingCycle === 'annually' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-xs font-semibold ${billingCycle === 'annually' ? 'text-white' : 'text-slate-400'}`}>
                Annual Billing <span className="text-[#F57C00] text-[10px] font-bold">(Save 20%)</span>
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative bg-slate-800/90 rounded-3xl p-8 border flex flex-col justify-between transition hover:-translate-y-1 ${
                  plan.popular
                    ? 'border-[#F57C00] shadow-2xl shadow-[#F57C00]/10 ring-2 ring-[#F57C00]'
                    : 'border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F57C00] text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow">
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">
                      {billingCycle === 'monthly' ? plan.priceMonthly : plan.priceAnnually}
                    </span>
                    <span className="text-xs text-slate-400">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-slate-700/80">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#F57C00] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Link
                    to="/register"
                    className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= UPCOMING EVENTS MODULE ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-xs font-bold text-[#F57C00] uppercase tracking-widest">Connect Offline & Online</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Upcoming Business Events</h2>
          </div>
          <Link
            to="/events"
            className="mt-4 md:mt-0 text-xs font-bold text-[#0A3D91] hover:text-[#F57C00] flex items-center gap-1 transition"
          >
            View All Events Schedule <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition space-y-4 p-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-blue-50 text-[#0A3D91] rounded-full text-[10px] font-bold uppercase">
                Annual Summit
              </span>
              <span className="text-xs font-semibold text-slate-500">Aug 25, 2026</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">National MSME Growth & Innovation Conclave</h3>
            <p className="text-xs text-slate-600">
              Interactive keynote sessions with industry leaders, investor pitching panels, and high-value networking sessions.
            </p>
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-700">Ch. Sambhajinagar, MH</span>
              <Link to="/events" className="text-xs font-bold text-[#F57C00] hover:underline">
                Get QR Pass
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition space-y-4 p-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-orange-50 text-[#F57C00] rounded-full text-[10px] font-bold uppercase">
                Networking Meet
              </span>
              <span className="text-xs font-semibold text-slate-500">Sep 10, 2026</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">B2B Founders & Traders Meetup</h3>
            <p className="text-xs text-slate-600">
              Structured 1-on-1 business matching designed to help manufacturers, suppliers, and distributors collaborate.
            </p>
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-700">Mumbai, MH</span>
              <Link to="/events" className="text-xs font-bold text-[#F57C00] hover:underline">
                Get QR Pass
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition space-y-4 p-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-[10px] font-bold uppercase">
                Webinar
              </span>
              <span className="text-xs font-semibold text-slate-500">Sep 18, 2026</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Digital Transformation for Local Enterprises</h3>
            <p className="text-xs text-slate-600">
              Mastering digital marketing, automated customer acquisition, and scale-up strategies for Indian MSMEs.
            </p>
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-700">Online Event</span>
              <Link to="/events" className="text-xs font-bold text-[#F57C00] hover:underline">
                Register Free
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-12">
        <div className="bg-gradient-to-r from-[#0A3D91] to-blue-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Ready to Expand Your Business Network Across India?
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm">
              Join thousands of business owners driving growth, establishing credibility, and closing deals today.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-3.5 bg-[#F57C00] hover:bg-[#e06f00] text-white font-bold rounded-xl shadow-lg transition text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                Register Your Business Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/20"
              >
                <PhoneCall className="w-4 h-4" />
                Contact Sales Team
              </Link>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}