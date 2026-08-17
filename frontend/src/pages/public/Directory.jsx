import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MAHARASHTRA_DISTRICTS } from '../../data/maharashtraGeo';
import {
  Building2,
  Search,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Star,
  ExternalLink,
  Filter,
  CheckCircle2,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';

const CATEGORIES = [
  'All',
  'Manufacturing & Industrial',
  'Digital & IT Solutions',
  'Retail & Wholesale Trade',
  'Agro & Food Processing',
  'Real Estate & Construction',
  'Services & Professional Consulting',
];

export default function Directory() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedTaluka, setSelectedTaluka] = useState('All');

  const talukaList =
    selectedDistrict !== 'All' ? ['All', ...(MAHARASHTRA_DISTRICTS[selectedDistrict] || [])] : ['All'];

  useEffect(() => {
    fetchDirectory();
  }, [searchTerm, selectedCategory, selectedDistrict, selectedTaluka]);

  const fetchDirectory = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (selectedDistrict !== 'All') params.append('district', selectedDistrict);
      if (selectedTaluka !== 'All') params.append('taluka', selectedTaluka);

      const res = await axios.get(`${API_URL}/api/directory/search?${params.toString()}`);
      if (res.data.success) {
        setBusinesses(res.data.data);
      }
    } catch (err) {
      console.error('Directory fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedTaluka('All');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-blue-100 text-[#0A3D91] text-xs font-extrabold rounded-full uppercase tracking-wider">
            Verified B2B Network[cite: 7, 8]
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            BEGA India Business Directory[cite: 7]
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Connect directly with verified manufacturers, traders, distributors, and service providers across Maharashtra[cite: 7, 8].
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search business, products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Industry Sectors' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* District Filter */}
            <div>
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
              >
                <option value="All">All Districts</option>
                {Object.keys(MAHARASHTRA_DISTRICTS).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Taluka Filter */}
            <div>
              <select
                value={selectedTaluka}
                onChange={(e) => setSelectedTaluka(e.target.value)}
                disabled={selectedDistrict === 'All'}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91] disabled:opacity-50"
              >
                {talukaList.map((t) => (
                  <option key={t} value={t}>
                    {t === 'All' ? 'All Talukas' : t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0A3D91]"></div>
          </div>
        ) : businesses.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-2">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">No Business Listings Found</h3>
            <p className="text-xs">Try clearing some search filters or searching with a different term[cite: 2, 4].</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((b) => (
              <div
                key={b._id}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#0A3D91] transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-[#0A3D91] text-[10px] font-bold rounded-full border border-blue-100 uppercase">
                      {b.category}[cite: 4]
                    </span>
                    {b.isFeatured && (
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-[9px] font-extrabold rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Featured[cite: 1]
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                      {b.companyName}[cite: 4]
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {b.user?.name || 'Authorized Member'}[cite: 2, 4]
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {b.description || 'Verified enterprise registered under BEGA India.'}[cite: 4]
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#F57C00] shrink-0" />
                    <span className="truncate">{b.taluka}, {b.district}[cite: 4]</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#0A3D91] shrink-0" />
                    <span>{b.mobile || b.user?.mobile}[cite: 2, 4]</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <a
                      href={`tel:${b.mobile || b.user?.mobile}`}
                      className="w-1/2 py-2 bg-[#0A3D91] hover:bg-[#083278] text-white font-bold text-center text-xs rounded-xl shadow-sm transition"
                    >
                      Call Now
                    </a>
                    <a
                      href={`https://wa.me/${(b.mobile || b.user?.mobile || '').replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-1/2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-center text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-1"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}