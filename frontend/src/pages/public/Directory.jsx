import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Search,
  Building2,
  MapPin,
  ShieldCheck,
  Phone,
  Mail,
  ExternalLink,
  Filter,
  CheckCircle2,
  ArrowRight,
  Store,
  Tag,
} from 'lucide-react';
import { MAHARASHTRA_DISTRICTS } from '../../data/maharashtraGeo';

const API_BASE = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';
const API_URL = API_BASE.replace(/\/$/, '');

const SECTORS = [
  'All Sectors',
  'Manufacturing & Industrial',
  'Digital & IT Solutions',
  'Retail & Wholesale Trade',
  'Agro & Food Processing',
  'Real Estate & Construction',
  'Services & Professional Consulting',
  'Heavy Engineering & Auto',
];

const INITIAL_DIRECTORY = [
  {
    _id: '1',
    companyName: 'SW Multimedia Group',
    ownerName: 'Sachin Subhash Wathore',
    category: 'Digital & IT Solutions',
    businessType: 'Proprietorship',
    district: 'Chhatrapati Sambhajinagar',
    taluka: 'Aurangabad',
    description: 'Premier digital transformation, enterprise web architecture, software engineering, and corporate branding agency.',
    mobile: '+91 9876543210',
    email: 'contact@swmultimedia.com',
    status: 'Approved',
    isVerified: true,
  },
  {
    _id: '2',
    companyName: 'Patil Precision Forgings Pvt Ltd',
    ownerName: 'Rajesh Patil',
    category: 'Manufacturing & Industrial',
    businessType: 'Private Limited',
    district: 'Chhatrapati Sambhajinagar',
    taluka: 'Waluj MIDC',
    description: 'High-tensile automotive forged components, CNC precision machining, and industrial mechanical supplies.',
    mobile: '+91 9822012345',
    email: 'info@patilforgings.in',
    status: 'Approved',
    isVerified: true,
  },
  {
    _id: '3',
    companyName: 'Sahyadri Organic Agro Processing',
    ownerName: 'Sunita Deshmukh',
    category: 'Agro & Food Processing',
    businessType: 'LLP',
    district: 'Nashik',
    taluka: 'Niphad',
    description: 'Certified organic spice extraction, cold-pressed oils, and bulk agricultural food packaging for export.',
    mobile: '+91 9423098765',
    email: 'sales@sahyadriagro.com',
    status: 'Approved',
    isVerified: true,
  },
  {
    _id: '4',
    companyName: 'NovaTech Solar & Automation EPC',
    ownerName: 'Kishore Joshi',
    category: 'Services & Professional Consulting',
    businessType: 'Private Limited',
    district: 'Pune',
    category: 'Real Estate & Construction',
    taluka: 'Chakan MIDC',
    description: 'Industrial rooftop solar EPC, electrical automation, energy audits, and green power infrastructure.',
    mobile: '+91 9765432100',
    email: 'projects@novatech.co.in',
    status: 'Approved',
    isVerified: true,
  },
];

export default function Directory() {
  const [businesses, setBusinesses] = useState(INITIAL_DIRECTORY);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedSector, setSelectedSector] = useState('All Sectors');

  useEffect(() => {
    axios
      .get(`${API_URL}/api/business`)
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setBusinesses(res.data.data);
        }
      })
      .catch(() => console.log('Using local directory index'));
  }, []);

  const filteredBusinesses = businesses.filter((b) => {
    const matchesSearch =
      b.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDistrict =
      selectedDistrict === 'All Districts' || b.district === selectedDistrict;

    const matchesSector =
      selectedSector === 'All Sectors' || b.category === selectedSector;

    return matchesSearch && matchesDistrict && matchesSector;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-12 px-4 sm:px-8 space-y-12">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black rounded-full uppercase tracking-wider">
            State B2B Marketplace
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
            Maharashtra Business Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Explore verified MSMEs, manufacturers, traders, and service providers across all 36 districts of Maharashtra.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search business name, product, keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#0A3D91]"
              />
            </div>

            {/* District Filter */}
            <div>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#0A3D91]"
              >
                <option>All Districts</option>
                {Object.keys(MAHARASHTRA_DISTRICTS).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Sector Filter */}
            <div>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#0A3D91]"
              >
                {SECTORS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Directory Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBusinesses.map((b) => (
            <div
              key={b._id}
              className="bg-white border border-slate-200 rounded-3xl p-7 space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#F57C00] tracking-wider">
                      {b.category}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-0.5">{b.companyName}</h3>
                    <p className="text-xs text-slate-500 font-bold">Owner: {b.ownerName || 'BEGA Member'}</p>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> VERIFIED MEMBER
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {b.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 pt-2 border-t border-slate-100">
                  <MapPin className="w-4 h-4 text-[#0A3D91]" />
                  <span>{b.taluka ? `${b.taluka}, ` : ''}{b.district}, Maharashtra</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold">
                <a
                  href={`tel:${b.mobile}`}
                  className="px-4 py-2 bg-blue-50 text-[#0A3D91] rounded-xl hover:bg-blue-100 transition flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Enterprise
                </a>
                <a
                  href={`mailto:${b.email}`}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" /> Inquiry
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}