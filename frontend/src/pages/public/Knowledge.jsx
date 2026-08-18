import React, { useState } from 'react';
import {
  GOVERNMENT_SCHEMES,
  KNOWLEDGE_GUIDES,
  BUSINESS_TOOLKITS,
} from '../../data/knowledgeRepository';
import {
  BookOpen,
  Landmark,
  FileText,
  Search,
  ExternalLink,
  Download,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building,
  HelpCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function Knowledge() {
  const [activeTab, setActiveTab] = useState('schemes'); // 'schemes' | 'guides' | 'toolkit'

  // Schemes Search & Filter State
  const [schemeSearch, setSchemeSearch] = useState('');
  const [selectedSchemeCategory, setSelectedSchemeCategory] = useState('All');
  const [selectedScheme, setSelectedScheme] = useState(null);

  // Guides Search State
  const [guideSearch, setGuideSearch] = useState('');
  const [activeGuideModal, setActiveGuideModal] = useState(null);

  // Scheme Categories
  const SCHEME_CATEGORIES = [
    'All',
    'Subsidies & Project Loans',
    'Collateral-Free Loans',
    'Working Capital & Equipment Loans',
    'State Industrial Subsidies',
    'Technology & Modernization',
  ];

  // Filtered Schemes
  const filteredSchemes = GOVERNMENT_SCHEMES.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(schemeSearch.toLowerCase()) ||
      s.provider.toLowerCase().includes(schemeSearch.toLowerCase()) ||
      s.targetAudience.toLowerCase().includes(schemeSearch.toLowerCase());
    const matchesCategory =
      selectedSchemeCategory === 'All' || s.category === selectedSchemeCategory;
    return matchesSearch && matchesCategory;
  });

  // Filtered Guides
  const filteredGuides = KNOWLEDGE_GUIDES.filter(
    (g) =>
      g.title.toLowerCase().includes(guideSearch.toLowerCase()) ||
      g.category.toLowerCase().includes(guideSearch.toLowerCase()) ||
      g.summary.toLowerCase().includes(guideSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Header */}
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-blue-100 text-[#0A3D91] text-xs font-extrabold rounded-full uppercase tracking-wider">
            Knowledge Centre & Policy Hub
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Government Schemes & Business Toolkit
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Explore verified central and state MSME schemes, compliance guides, legal frameworks, and downloadable business templates.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="bg-slate-200/80 p-1.5 rounded-2xl flex flex-wrap gap-1.5 shadow-inner">
            <button
              onClick={() => setActiveTab('schemes')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                activeTab === 'schemes'
                  ? 'bg-[#0A3D91] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Landmark className="w-4 h-4" /> Government Schemes ({GOVERNMENT_SCHEMES.length})
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                activeTab === 'guides'
                  ? 'bg-[#0A3D91] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Compliance & Knowledge Guides ({KNOWLEDGE_GUIDES.length})
            </button>
            <button
              onClick={() => setActiveTab('toolkit')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                activeTab === 'toolkit'
                  ? 'bg-[#0A3D91] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" /> Downloadable Business Toolkit ({BUSINESS_TOOLKITS.length})
            </button>
          </div>
        </div>

        {/* TAB 1: GOVERNMENT SCHEMES REPOSITORY */}
        {activeTab === 'schemes' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 justify-between items-center">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search scheme name, subsidy, loans..."
                  value={schemeSearch}
                  onChange={(e) => setSchemeSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                />
              </div>

              <div className="w-full md:w-auto flex flex-wrap gap-1.5">
                {SCHEME_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedSchemeCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      selectedSchemeCategory === cat
                        ? 'bg-[#F57C00] text-white shadow-sm'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Schemes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#0A3D91] transition flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <span className="px-3 py-1 bg-blue-50 text-[#0A3D91] text-[10px] font-extrabold rounded-full border border-blue-100 uppercase tracking-wider">
                        {scheme.provider}
                      </span>
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold rounded-full border border-emerald-200">
                        {scheme.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                        {scheme.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold mt-1">
                        Audience: {scheme.targetAudience}
                      </p>
                    </div>

                    <div className="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200/80 space-y-1">
                      <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">Key Benefit Limit</span>
                      <p className="text-xs font-extrabold text-amber-950">{scheme.maxBenefit}</p>
                    </div>

                    {/* Eligibility Highlights */}
                    <div className="space-y-1.5 text-xs text-slate-600">
                      <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Eligibility Highlights:
                      </h4>
                      <ul className="space-y-1 pl-5 list-disc text-[11px] text-slate-600">
                        {scheme.eligibility.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedScheme(scheme)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition"
                    >
                      View Documents & Details
                    </button>
                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm"
                    >
                      Official Portal <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: COMPLIANCE & KNOWLEDGE GUIDES */}
        {activeTab === 'guides' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search articles on GST, labour laws, fraud prevention..."
                  value={guideSearch}
                  onChange={(e) => setGuideSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-extrabold text-slate-500 uppercase">
                      <span className="px-2.5 py-0.5 bg-blue-50 text-[#0A3D91] rounded-full border border-blue-100">
                        {guide.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> {guide.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                      {guide.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {guide.summary}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveGuideModal(guide)}
                    className="w-full py-2.5 bg-slate-50 hover:bg-[#0A3D91] hover:text-white text-[#0A3D91] text-xs font-bold rounded-xl transition border border-slate-200 flex items-center justify-center gap-1.5"
                  >
                    Read Full Advisory <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DOWNLOADABLE BUSINESS TOOLKITS */}
        {activeTab === 'toolkit' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BUSINESS_TOOLKITS.map((toolkit) => (
                <div
                  key={toolkit.id}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-extrabold text-slate-500 uppercase">
                      <span className="px-2.5 py-0.5 bg-orange-50 text-[#F57C00] rounded-full border border-orange-100">
                        Format: {toolkit.format}
                      </span>
                      <span>Size: {toolkit.size}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                      {toolkit.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {toolkit.description}
                    </p>
                  </div>

                  <button
                    onClick={() => alert(`Downloading template: ${toolkit.title}`)}
                    className="w-full py-2.5 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-amber-400" /> Download Toolkit Asset
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DETAILED SCHEME MODAL */}
        {selectedScheme && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200 space-y-5 animate-in fade-in max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start border-b pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#0A3D91] bg-blue-50 px-2 py-0.5 rounded-md">
                    {selectedScheme.provider}
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                    {selectedScheme.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedScheme(null)}
                  className="text-slate-400 hover:text-slate-600 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Benefits */}
              <div className="space-y-2 text-xs">
                <h4 className="font-extrabold text-slate-900">Key Subsidies & Benefits:</h4>
                <ul className="space-y-1 pl-5 list-disc text-slate-600">
                  {selectedScheme.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              {/* Required Documents Checklist */}
              <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Required Application Documents:
                </h4>
                <ul className="space-y-1 pl-5 list-disc text-slate-600">
                  {selectedScheme.requiredDocuments.map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setSelectedScheme(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                >
                  Close
                </button>
                <a
                  href={selectedScheme.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow"
                >
                  Visit Official Application Desk <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* DETAILED ADVISORY MODAL */}
        {activeGuideModal && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in">
              <div className="flex justify-between items-start border-b pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#F57C00] bg-orange-50 px-2 py-0.5 rounded-md">
                    {activeGuideModal.category}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">
                    {activeGuideModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveGuideModal(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                {activeGuideModal.content}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveGuideModal(null)}
                  className="px-5 py-2.5 bg-[#0A3D91] text-white text-xs font-bold rounded-xl shadow transition"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}