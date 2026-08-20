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
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans space-y-16 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* HERO BANNER */}
        <div className="text-center space-y-6 max-w-4xl mx-auto pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#F57C00] text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> State Business Empowerment & Growth Network
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
            Connecting Enterprises.<br />
            <span className="bg-gradient-to-r from-blue-400 via-amber-300 to-[#F57C00] bg-clip-text text-transparent">
              Empowering Sustainable Growth.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Business Empowerment and Growth Association (BEGA India) connects business growth, legal protection, B2B matchmaking, training, and grassroots social transformation.
          </p>

          <div className="text-xs font-black text-amber-400 tracking-widest uppercase">
            Growth • Trust • Success
          </div>

          {/* Primary Action Buttons Grid */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link
              to="/join"
              className="px-7 py-3.5 bg-[#F57C00] hover:bg-[#e06f00] text-slate-950 font-black text-xs rounded-xl shadow-xl transition flex items-center gap-2"
            >
              JOIN BEGA <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/membership"
              className="px-6 py-3.5 bg-[#0A3D91] hover:bg-[#083278] text-white font-extrabold text-xs rounded-xl shadow-xl transition"
            >
              MEMBERSHIP PLANS
            </Link>
            <Link
              to="/directory"
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-extrabold text-xs rounded-xl transition"
            >
              BUSINESS DIRECTORY
            </Link>
            <Link
              to="/support"
              className="px-6 py-3.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-extrabold text-xs rounded-xl transition"
            >
              REGISTER BUSINESS ISSUE
            </Link>
          </div>
        </div>

        {/* 11 PRIMARY QUICK NAVIGATION TILES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { title: 'JOIN BEGA', link: '/join', color: 'border-orange-500/30 bg-orange-500/10 text-[#F57C00]' },
            { title: 'MEMBERSHIP', link: '/membership', color: 'border-blue-500/30 bg-blue-500/10 text-blue-400' },
            { title: 'DIRECTORY', link: '/directory', color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' },
            { title: 'SUPPORT DESK', link: '/support', color: 'border-rose-500/30 bg-rose-500/10 text-rose-400' },
            { title: 'BEGA SEVA', link: '/seva', color: 'border-amber-500/30 bg-amber-500/10 text-amber-400' },
            { title: 'BUSINESS EXPO', link: '/expo', color: 'border-purple-500/30 bg-purple-500/10 text-purple-400' },
            { title: 'CONCLAVE', link: '/expo', color: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400' },
            { title: 'EVENTS', link: '/events', color: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400' },
            { title: 'TRAINING', link: '/training', color: 'border-teal-500/30 bg-teal-500/10 text-teal-400' },
            { title: 'AWARDS', link: '/awards', color: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400' },
            { title: 'SCHEMES', link: '/schemes', color: 'border-green-500/30 bg-green-500/10 text-green-400' },
            { title: 'LEADERSHIP', link: '/leadership', color: 'border-slate-700 bg-slate-900 text-slate-300' },
          ].map((btn, i) => (
            <Link
              key={i}
              to={btn.link}
              className={`p-4 rounded-2xl border text-center font-black text-xs transition hover:scale-105 shadow-md flex items-center justify-center ${btn.color}`}
            >
              {btn.title}
            </Link>
          ))}
        </div>

        {/* CORE PILLARS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 shadow-lg">
            <TrendingUp className="w-8 h-8 text-[#F57C00]" />
            <h3 className="text-lg font-black text-white">Business Development</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Structured B2B matchmaking, buyer-seller conclaves, state trade expos, and export readiness workshops for MSMEs and startups.
            </p>
          </div>

          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 shadow-lg">
            <ShieldCheck className="w-8 h-8 text-blue-400" />
            <h3 className="text-lg font-black text-white">Business Support (BSR)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated grievance resolution cell addressing delayed payments, municipal licences, GST awareness, and administrative representation.
            </p>
          </div>

          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 shadow-lg">
            <Building2 className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-black text-white">BEGA Seva (Social Wing)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Flagship "One Month – One Village" rural transformation initiative covering smart classrooms, health camps, and 500-tree sanctuaries.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}