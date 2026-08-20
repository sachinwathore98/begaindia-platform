import React, { useState } from 'react';
import {
  Store,
  Calendar,
  MapPin,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  FileCheck,
} from 'lucide-react';

const STALL_TIERS = [
  { name: 'Standard Stall (3x3m)', price: '₹15,000', specs: '1 Table, 2 Chairs, Spotlights, Power Point, Directory Mention', popular: false },
  { name: 'Premium Stall (6x3m)', price: '₹28,000', specs: 'Corner Location, 2 Tables, 4 Chairs, VIP Conclave Entry, Stage Mention', popular: true },
  { name: 'Sponsor Pavilion (9x6m)', price: '₹65,000', specs: 'Main Entrance Island, LED Display Wall, Corporate Branding, Conclave Speaker Slot', popular: false },
];

export default function Expo() {
  const [selectedTier, setSelectedTier] = useState('Premium Stall (6x3m)');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-12 px-4 sm:px-8 space-y-16">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="px-3.5 py-1 bg-purple-50 text-purple-800 border border-purple-200 text-xs font-black rounded-full uppercase tracking-wider">
            Flagship Annual Conclave & Trade Fair
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            BEGA Business Expo & Mahaadhiveshan 2026
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Maharashtra's premier commercial expo bringing together 500+ exhibitors, 15,000+ business buyers, corporate founders, and MSME leaders.
          </p>
        </div>

        {/* Event Quick Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-1">
            <Calendar className="w-6 h-6 text-[#F57C00] mx-auto mb-2" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Dates</span>
            <p className="text-lg font-black text-slate-900">14 – 16 November 2026</p>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-1">
            <MapPin className="w-6 h-6 text-[#0A3D91] mx-auto mb-2" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Venue</span>
            <p className="text-lg font-black text-slate-900">CIDCO Exhibition Grounds, Ch. Sambhajinagar</p>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-1">
            <Users className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Delegates</span>
            <p className="text-lg font-black text-slate-900">15,000+ Trade Visitors</p>
          </div>
        </div>

        {/* Stall Booking Matrix */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-[#F57C00] uppercase tracking-wider">Exhibition Spaces</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">Book Your Commercial Stall</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STALL_TIERS.map((stall, idx) => (
              <div
                key={idx}
                className={`p-7 rounded-3xl border bg-white transition flex flex-col justify-between space-y-6 ${
                  stall.popular ? 'border-[#F57C00] shadow-xl ring-2 ring-orange-500/20' : 'border-slate-200 shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  <h3 className="text-lg font-black text-slate-900">{stall.name}</h3>
                  <p className="text-3xl font-black text-[#0A3D91]">{stall.price}</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium pt-2 border-t border-slate-100">
                    {stall.specs}
                  </p>
                </div>

                <a
                  href="/contact"
                  className={`w-full py-3 rounded-xl text-xs font-black text-center shadow transition block ${
                    stall.popular ? 'bg-[#F57C00] hover:bg-[#e06f00] text-white' : 'bg-[#0A3D91] hover:bg-[#083278] text-white'
                  }`}
                >
                  Reserve Stall
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}