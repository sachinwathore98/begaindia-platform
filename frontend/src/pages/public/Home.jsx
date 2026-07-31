// src/pages/public/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/80 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
            <Zap className="w-3.5 h-3.5 text-indigo-600" /> Connecting Businesses Nationwide
          </span>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            The Premier Network for Growing <span className="text-indigo-600">Enterprises</span>
          </h1>

          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Register your company, showcase verified business services, connect with key industry leaders, and discover growth opportunities across India.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
            >
              Join the Network <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/directory"
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4 text-slate-500" /> Explore Directory
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Verified Profiles</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every business profile undergoes admin verification to maintain trust and prevent spam.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Direct Networking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Connect directly with verified decision-makers, agency owners, and service providers.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Exclusive Expos</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlock access to premium networking expos, business conferences, and lead exchanges.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}