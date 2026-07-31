import React, { useState } from 'react';
import { Search, MapPin, Building2, Phone, Mail, Filter, CheckCircle2 } from 'lucide-react';

export default function Directory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Manufacturing', 'Digital & IT', 'Real Estate', 'Energy & Power', 'Services'];

  const sampleBusinesses = [
    {
      id: 1,
      name: 'SW Digital Hub',
      category: 'Digital & IT',
      location: 'Ch. Sambhajinagar, MH',
      tier: 'Platinum',
      description: 'Full-service digital marketing agency, performance advertising, lead generation funnels, and software solutions.',
      phone: '+91 9876543210',
      email: 'contact@swdigitalhub.com',
      // Dynamic SVG Brand Logo
      logoText: 'SW',
      logoBg: 'bg-[#0A3D91]',
      logoTextColor: 'text-white',
    },
    {
      id: 2,
      name: 'Trika Energy Drink',
      category: 'Energy & Power',
      location: 'Pune, MH',
      tier: 'Gold',
      description: 'Next-generation beverage brand specializing in natural energy formulation and retail distribution.',
      phone: '+91 9876543211',
      email: 'info@trikaenergy.com',
      logoText: 'TRIKA',
      logoBg: 'bg-[#F57C00]',
      logoTextColor: 'text-white',
    },
    {
      id: 3,
      name: 'SW Multimedia',
      category: 'Digital & IT',
      location: 'Ch. Sambhajinagar, MH',
      tier: 'Platinum',
      description: 'Leading IT training, placement institution, scriptwriting, and creative video production agency.',
      phone: '+91 9876543212',
      email: 'info@swmultimedia.com',
      logoText: 'SWM',
      logoBg: 'bg-gradient-to-tr from-[#0A3D91] to-blue-600',
      logoTextColor: 'text-white',
    },
    {
      id: 4,
      name: '24 ELITE Developers',
      category: 'Real Estate',
      location: 'Ch. Sambhajinagar, MH',
      tier: 'Gold',
      description: 'Premium commercial and residential real estate development and modern 3D architectural visualization.',
      phone: '+91 9876543213',
      email: 'sales@24elite.com',
      logoText: '24E',
      logoBg: 'bg-emerald-600',
      logoTextColor: 'text-white',
    },
  ];

  const filtered = sampleBusinesses.filter((b) => {
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="px-3 py-1 bg-blue-100 text-[#0A3D91] rounded-full text-xs font-bold uppercase tracking-widest">
          Verified Business Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Discover Trusted Indian Enterprises
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Connect directly with verified founders, suppliers, and corporate partners.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by company name, keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-[#0A3D91] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Business Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                {/* Custom Brand Logo Box */}
                <div
                  className={`w-12 h-12 rounded-xl ${b.logoBg} ${b.logoTextColor} flex items-center justify-center font-extrabold text-xs tracking-wider shadow-sm shrink-0 uppercase`}
                >
                  {b.logoText}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    {b.name}
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  </h3>
                  <span className="text-xs text-slate-500">{b.category}</span>
                </div>
              </div>

              {/* Membership Tier Badge */}
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                  b.tier === 'Platinum'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-orange-100 text-[#F57C00]'
                }`}
              >
                {b.tier} Member
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{b.description}</p>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {b.location}
              </span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {b.phone}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}