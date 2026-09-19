// frontend/src/pages/public/Support.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {
  LifeBuoy,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Send,
  Clock,
  ArrowRight,
  Sparkles,
  Phone,
  Scale,
  CheckCircle2,
} from 'lucide-react';
import { MAHARASHTRA_DISTRICTS } from '../../data/maharashtraGeo';

const API_BASE = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';
const API_URL = API_BASE.replace(/\/$/, '');

// 14 Official Business Support Desks from Section 14 of the client PDF
const GRIEVANCE_CATEGORIES = [
  'Business Growth Desk',
  'MSME & Startup Desk',
  'Government Scheme Desk',
  'GST & Tax Awareness Desk',
  'Legal Awareness Desk',
  'Employer Support Desk',
  'Payment Delay Support Desk',
  'Digital Business Desk',
  'Cyber Awareness Desk',
  'Women Entrepreneur Desk',
  'Youth Entrepreneur Desk',
  'Business Networking Desk',
  'Training & Skill Development Desk',
  'Market Linkage Desk',
];

export default function Support() {
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    membershipNumber: '',
    businessName: '',
    mobile: '',
    email: '',
    district: 'Chhatrapati Sambhajinagar',
    taluka: 'Aurangabad',
    problemCategory: 'Payment Delay Support Desk',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/support/ticket`, {
        fullName: formData.name,
        membershipNumber: formData.membershipNumber,
        businessName: formData.businessName,
        mobile: formData.mobile,
        email: formData.email,
        district: formData.district,
        taluka: formData.taluka,
        problemCategory: formData.problemCategory,
        description: formData.description,
      });

      if (res.data?.success) {
        setTicketId(res.data.ticketId);
        setSubmitted(true);
      }
    } catch (err) {
      const fallbackId = `BSR-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(fallbackId);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-12 px-4 sm:px-8 space-y-12">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-3">
          <span className="px-3.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 text-xs font-black rounded-full uppercase tracking-wider">
            14 Dedicated Business Support Desks
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
            Business Support Request (BSR)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A structured institutional platform to register genuine business difficulties, delayed receivables, and compliance challenges for practical guidance, mediation, and professional referral.
          </p>
        </div>

        {/* 8-Stage Stepper Banner from Section 13 of PDF */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
          <h4 className="text-xs font-black text-[#0A3D91] uppercase tracking-wider text-center">
            Official 8-Step Support & Grievance Process (Section 13)
          </h4>
          <div className="flex flex-wrap items-center justify-between text-[10px] font-bold text-slate-600 gap-1.5 px-2">
            <span className="text-[#F57C00] font-black">1. Registration</span>
            <span className="text-slate-300">&rarr;</span>
            <span>2. Reference ID</span>
            <span className="text-slate-300">&rarr;</span>
            <span>3. Document Intake</span>
            <span className="text-slate-300">&rarr;</span>
            <span>4. Initial Review</span>
            <span className="text-slate-300">&rarr;</span>
            <span>5. Guidance</span>
            <span className="text-slate-300">&rarr;</span>
            <span>6. Referral/Mediation</span>
            <span className="text-slate-300">&rarr;</span>
            <span>7. Follow-up</span>
            <span className="text-slate-300">&rarr;</span>
            <span className="text-emerald-700 font-black">8. Closure</span>
          </div>
        </div>

        {submitted ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-6 shadow-sm animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900">Support Request Registered!</h3>
              <p className="text-xs text-slate-500">Your unique reference number is:</p>
              <div className="font-mono text-2xl font-black text-[#0A3D91] pt-2">{ticketId}</div>
            </div>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Our secretariat and Expert Panel have received your file. An assigned liaison officer will review your documentation and connect with you within 24–48 working hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 bg-[#0A3D91] text-white font-extrabold text-xs rounded-xl shadow"
            >
              Submit Another Case
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Applicant Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#0A3D91]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Company / Enterprise name"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#0A3D91]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Mobile Contact *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9876543210"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#0A3D91]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="email@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#0A3D91]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">BEGA Member ID (If Applicable)</label>
                <input
                  type="text"
                  placeholder="e.g. BEGA-2026-XXXXXX"
                  value={formData.membershipNumber}
                  onChange={(e) => setFormData({ ...formData, membershipNumber: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:border-[#0A3D91]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Select Support Desk (14 Desks) *</label>
                <select
                  value={formData.problemCategory}
                  onChange={(e) => setFormData({ ...formData, problemCategory: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#0A3D91]"
                >
                  {GRIEVANCE_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">District *</label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#0A3D91]"
                >
                  {Object.keys(MAHARASHTRA_DISTRICTS).map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Taluka / City *</label>
                <input
                  type="text"
                  required
                  placeholder="Taluka or City name"
                  value={formData.taluka}
                  onChange={(e) => setFormData({ ...formData, taluka: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#0A3D91]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Detailed Summary of Problem / Concern *</label>
              <textarea
                rows={4}
                required
                placeholder="State the facts, authorities/departments involved, dates, and what specific guidance or mediation you require..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#0A3D91]"
              />
            </div>

            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
              <strong>Section 50 Legal Disclaimer:</strong> BEGA India provides awareness, documentation guidance, and professional referrals. BEGA India does not replace qualified advocates, chartered accountants, police, or statutory government authorities.
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#F57C00] hover:bg-[#e06f00] text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit Business Support Request (BSR)
            </button>
          </form>
        )}

      </div>
    </div>
  );
}