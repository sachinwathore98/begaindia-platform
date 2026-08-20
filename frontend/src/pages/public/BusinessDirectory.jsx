import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Search, MapPin, Building2, Phone, Mail, ExternalLink, RotateCcw, AlertCircle, Loader2, ShieldCheck, Star } from 'lucide-react';

const API_BASE = (import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com').replace(/\/$/, '');

const CATEGORIES = [
  'All',
  'Manufacturing & Industrial',
  'Digital & IT Solutions',
  'Retail & Wholesale Trade',
  'Agro & Food Processing',
  'Real Estate & Construction',
  'Services & Professional Consulting',
];

const CITIES = ['Chhatrapati Sambhajinagar', 'Mumbai', 'Pune', 'Nashik', 'Nagpur', 'Jalna', 'Thane'];

export default function BusinessDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['publicBusinesses', { search: debouncedSearch, category: selectedCategory, city: selectedCity, page }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: '12',
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(selectedCategory !== 'All' && { category: selectedCategory }),
        ...(selectedCity && { district: selectedCity }),
      });

      try {
        const res = await axios.get(`${API_BASE}/api/business?${params.toString()}`);
        return res.data?.data || [];
      } catch (err) {
        try {
          const resFallback = await axios.get(`${API_BASE}/api/directory/search?${params.toString()}`);
          return resFallback.data?.data || [];
        } catch {
          return [];
        }
      }
    },
  });

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedCity('');
    setPage(1);
  };

  const businesses = Array.isArray(data) ? data : [];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-blue-50 text-[#0A3D91] text-xs font-extrabold rounded-full uppercase tracking-wider border border-blue-200">
            Verified Commercial Network
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            BEGA India Business Directory
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            Connect directly with verified manufacturers, suppliers, distributors, and service providers across Maharashtra.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/90 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search company name, product or service keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A3D91] text-slate-800 text-xs font-medium"
              />
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#0A3D91]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat === 'All' ? 'All Industry Sectors' : cat}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedCity}
                onChange={(e) => { setSelectedCity(e.target.value); setPage(1); }}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#0A3D91]"
              >
                <option value="">All Districts</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          {(searchTerm || selectedCategory !== 'All' || selectedCity) && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
              <span>Active filters applied</span>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-[#0A3D91] hover:underline font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Directory Listings Grid */}
        {isLoading ? (
          <div className="p-16 text-center bg-white rounded-3xl border border-slate-200 space-y-3 shadow-sm">
            <Loader2 className="w-8 h-8 animate-spin text-[#0A3D91] mx-auto" />
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Loading verified businesses...</p>
          </div>
        ) : isError ? (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
            <h3 className="text-sm font-semibold text-red-800">{error?.message || 'Failed to load directory'}</h3>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : businesses.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-3 shadow-sm">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Business Profiles Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No verified company profiles match your current search query. Try resetting filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((biz) => {
              const logoSrc = biz.logo?.startsWith('http') ? biz.logo : biz.logo ? `${API_BASE}${biz.logo}` : '';
              return (
                <div
                  key={biz._id || biz.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#0A3D91] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                        {logoSrc ? (
                          <img src={logoSrc} alt={biz.companyName} className="w-full h-full object-cover" />
                        ) : (
                          <Building2 className="w-6 h-6 text-slate-400" />
                        )}
                      </div>
                      <span className="px-3 py-1 bg-blue-50 text-[#0A3D91] font-extrabold text-[10px] rounded-full border border-blue-100 uppercase tracking-wider">
                        {biz.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-slate-900 line-clamp-1">{biz.companyName}</h3>
                      <p className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#F57C00] shrink-0" />
                        <span>{biz.taluka ? `${biz.taluka}, ` : ''}{biz.district || biz.city}</span>
                      </p>
                    </div>

                    {biz.description && (
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                        {biz.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[10px] flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Member
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {biz.mobile && (
                        <a
                          href={`tel:${biz.mobile}`}
                          className="w-1/2 py-2 bg-[#0A3D91] hover:bg-[#083278] text-white font-bold text-center text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5" /> Call
                        </a>
                      )}
                      {biz.email && (
                        <a
                          href={`mailto:${biz.email}`}
                          className="w-1/2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-center text-xs rounded-xl transition flex items-center justify-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5 text-slate-500" /> Email
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}