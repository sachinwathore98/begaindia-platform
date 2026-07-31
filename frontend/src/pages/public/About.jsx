import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  Target,
  Award,
  ShieldCheck,
  Zap,
  Globe,
  ArrowRight,
  TrendingUp,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';

export default function About() {
  const pillars = [
    {
      icon: Users,
      title: 'Business Networking',
      description: 'Bridging the gap between entrepreneurs, MSMEs, traders, manufacturers, and corporate leaders across India.',
    },
    {
      icon: Target,
      title: 'Targeted Lead Generation',
      description: 'Facilitating direct B2B matchmaking, featured directory placement, and verified collaboration channels.',
    },
    {
      icon: Award,
      title: 'Event & Conclave Access',
      description: 'Hosting quarterly business summits, regional networking meets, and skill masterclasses with digital QR passes.',
    },
    {
      icon: ShieldCheck,
      title: 'Verified Business Directory',
      description: 'Ensuring every business profile on the platform undergoes authentic document verification to foster trust.',
    },
  ];

  const milestones = [
    { number: '5,000+', label: 'Registered Businesses' },
    { number: '120+', label: 'Conclaves & Meets Hosted' },
    { number: '15+', label: 'Key Industry Sectors' },
    { number: '98%', label: 'Member Satisfaction Rate' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-br from-[#0A3D91] via-[#09357d] to-[#052152] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-[400px] h-[400px] bg-[#F57C00]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <span className="px-3.5 py-1.5 bg-white/10 text-[#F57C00] rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">
            About BEGAINDIA
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Building India's Most Trusted <br />
            <span className="text-[#F57C00]">Business Ecosystem</span>
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            BEGAINDIA is a premier subscription-based business networking and directory platform designed to empower MSMEs, startups, manufacturers, and established enterprises through structured growth.
          </p>
        </div>
      </section>

      {/* ================= OUR MISSION & VISION ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-50 text-[#0A3D91] rounded-2xl flex items-center justify-center font-bold">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                To democratize business networking for Indian business owners by providing accessible, technology-driven tools. We aim to convert geographic barriers into strategic partnerships, helping local businesses expand regionally and nationally.
              </p>
            </div>
            <ul className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F57C00]" /> Empowering over 100,000+ MSMEs by 2030
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F57C00]" /> Delivering verified, spam-free B2B inquiries
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-orange-50 text-[#F57C00] rounded-2xl flex items-center justify-center font-bold">
                <Globe className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Our Vision</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                To become the central digital ecosystem for business growth in India—where every entrepreneur, trader, and corporate entity can discover trusted suppliers, gain media representation, and access capital or mentorship.
              </p>
            </div>
            <ul className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0A3D91]" /> Seamless integration of digital directory and offline meets
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0A3D91]" /> Driving local economy & 'Make in India' initiatives
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* ================= CORE PILLARS ================= */}
      <section className="py-16 bg-white border-y border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-[#F57C00] uppercase tracking-widest">Platform Foundations</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">What Drives BEGAINDIA</h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Our core modules are built to solve real-world business growth challenges faced by Indian entrepreneurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 hover:shadow-md transition space-y-3">
                  <div className="w-10 h-10 bg-[#0A3D91] text-white rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{pillar.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= STATS & MILESTONES ================= */}
      <section className="py-16 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {milestones.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#F57C00]">{item.number}</p>
              <p className="text-xs text-slate-300 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DEVELOPMENT PARTNER CREDITS ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-slate-900 to-[#0A3D91] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="px-3 py-1 bg-[#F57C00] text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
              Engineering Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Technology Partnered by SW Digital Hub</h2>
            <p className="text-slate-300 text-xs leading-relaxed">
              BEGAINDIA's enterprise architecture, secure authentication, Razorpay gateway integrations, and real-time dashboard experiences are crafted and maintained by <strong className="text-white">SW Digital Hub</strong>.
            </p>
          </div>
          <Link
            to="/register"
            className="px-8 py-3.5 bg-[#F57C00] hover:bg-[#e06f00] text-white font-bold rounded-xl shadow-lg transition text-xs shrink-0 flex items-center gap-2"
          >
            Join the Network Today
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}