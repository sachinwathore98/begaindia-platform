import React, { useState } from 'react';
import { BEGA_OBJECTIVES } from '../../data/objectivesData';
import { ShieldCheck, Search, Filter, Sparkles } from 'lucide-react';

export default function Objectives() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Protection & Representation',
    'Training & Development',
    'Business Opportunities',
    'Government Connect',
    'Compliance & Legal',
  ];

  const filteredObjectives = BEGA_OBJECTIVES.filter((obj) => {
    const matchesCategory = activeCategory === 'All' || obj.category === activeCategory;
    const matchesSearch =
      obj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obj.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-black rounded-full uppercase tracking-wider">
            Institutional Framework
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            28 Core Objectives of BEGA India
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            The fundamental institutional guidelines established to protect business rights, foster entrepreneurship, and drive grassroots rural development.
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search any objective (e.g. licences, delayed payments, taxation, training)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-white outline-none focus:border-[#F57C00]"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeCategory === cat
                    ? 'bg-[#F57C00] text-slate-950 font-black shadow'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Objectives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredObjectives.map((obj) => (
            <div
              key={obj.id}
              className="p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 hover:border-slate-700 transition"
            >
              <div className="flex justify-between items-center">
                <span className="w-8 h-8 rounded-xl bg-[#0A3D91] text-white flex items-center justify-center font-black text-xs">
                  {obj.id}
                </span>
                <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  {obj.category}
                </span>
              </div>
              <h3 className="text-base font-black text-white leading-snug">{obj.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{obj.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}