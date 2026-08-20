import React, { useState } from 'react';
import { MEDIA_COVERAGE, SUCCESS_STORIES } from '../../data/newsMediaData';
import {
  Newspaper,
  Award,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  MapPin,
  Calendar,
  Building2,
  Quote,
  Share2,
  Download,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewsAndMedia() {
  const [activeTab, setActiveTab] = useState('news'); // 'news' | 'stories'
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'BEGA Seva', 'Business Support', 'Events & Expo', 'MSME Subsidies'];

  const filteredNews = MEDIA_COVERAGE.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Banner */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-blue-100 text-[#0A3D91] text-xs font-extrabold rounded-full uppercase tracking-wider">
            Media Bureau & Member Milestones
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
            News, Press Coverage & Success Stories
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Stay updated with official press releases, regional media coverage, policy memorandums, and verified member growth transformations across Maharashtra.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="bg-slate-200/80 p-1.5 rounded-2xl flex flex-wrap gap-1.5 shadow-inner">
            <button
              onClick={() => setActiveTab('news')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                activeTab === 'news'
                  ? 'bg-[#0A3D91] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Newspaper className="w-4 h-4" /> Press Releases & Media Coverage
            </button>
            <button
              onClick={() => setActiveTab('stories')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                activeTab === 'stories'
                  ? 'bg-[#0A3D91] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4" /> Member Success Spotlights
            </button>
          </div>
        </div>

        {/* TAB 1: MEDIA & PRESS COVERAGE */}
        {activeTab === 'news' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedCategory === cat
                      ? 'bg-[#F57C00] text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* News Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNews.map((news) => (
                <div
                  key={news.id}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#0A3D91] transition flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-extrabold">
                      <span className="text-[#0A3D91] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 uppercase">
                        {news.publication}
                      </span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#F57C00]" /> {news.date}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                        {news.title}
                      </h2>
                      <p className="text-xs font-bold text-[#0A3D91]">
                        {news.marathiTitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {news.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-[11px]">
                    <span className="font-bold text-slate-500">{news.edition}</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      {news.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: MEMBER SUCCESS STORIES */}
        {activeTab === 'stories' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
            {SUCCESS_STORIES.map((story) => (
              <div
                key={story.id}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="p-2.5 bg-orange-50 text-[#F57C00] rounded-2xl border border-orange-100 shadow-inner">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-full border border-emerald-200">
                      {story.growthMetric}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-lg font-black text-slate-900">{story.companyName}</h2>
                    <p className="text-xs font-bold text-[#0A3D91]">{story.entrepreneurName}</p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#F57C00]" /> {story.district}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs">
                    <p className="italic text-slate-700 leading-relaxed font-medium">
                      "{story.quote}"
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {story.impactStory}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                  {story.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 bg-blue-50 text-[#0A3D91] text-[10px] font-bold rounded-full border border-blue-100"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Callout Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0A3D91] to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-black text-white">
              Want to Showcase Your Enterprise Growth Story?
            </h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Verified BEGA India members can submit case studies to be featured across our state publication bulletins and annual conclave whitepapers.
            </p>
          </div>

          <Link
            to="/join"
            className="px-6 py-3 bg-[#F57C00] hover:bg-[#e06f00] text-white text-xs font-extrabold rounded-xl shadow transition flex items-center gap-2 shrink-0"
          >
            Join as a Verified Member <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}