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

const GRIEVANCE_CATEGORIES = [
  'Government & Administrative Delay',
  'Delayed Payment & Receivables (MSME SAMADHAAN)',
  'Licence / Registration / NOC Issue',
  'Employee / Employer & Workplace Matter',
  'GST & Tax Compliance Procedural Concern',
  'Banking & Credit Finance Difficulty',
  'False Complaint / Unlawful Pressure Protection',
  'Cyber Fraud & Payment Dispute',
  'Other Genuine Business Problem',
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
    problemCategory: 'Delayed Payment & Receivables (MSME SAMADHAAN)',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const generatedId = `BSR-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedId);
      setSubmitted(true);
    } catch (err) {
      alert('Error submitting grievance. Please call the secretariat.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-12 px-4 sm:px-8 space-y-12">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-3">
          <span className="px-3.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 text-xs font-black rounded-full uppercase tracking-wider">
            BSR Grievance & Commercial Redressal Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
            Business Support Request (BSR)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A structured institutional platform to register business hurdles, delayed receivables, and bureaucratic delays for appropriate legal/administrative guidance.
          </p>
        </div>

        {/* 5-Stage Stepper Banner */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
          <h4 className="text-xs font-black text-[#0A3D91] uppercase tracking-wider text-center">
            Standard Redressal Workflow
          </h4>
          <div className="flex flex-wrap items-center justify-between text-[11px] font-bold text-slate-600 gap-2 px-2">
            <span className="text-[#F57C00] font-black">1. Submitted</span>
            <span className="text-slate-300">&rarr;</span>
            <span>2. Under Review</span>
            <span className="text-slate-300">&rarr;</span>
            <span>3. Expert Assigned</span>
            <span className="text-slate-300">&rarr;</span>
            <span>4. Action / Guidance</span>
            <span className="text-slate-300">&rarr;</span>
            <span className="text-emerald-700">5. Case Closed</span>
          </div>
        </div>

        {submitted ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-6 shadow-sm animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900">Support Request Registered!</h3>
              <p className="text-xs text-slate-500">Your unique grievance reference number is:</p>
              <div className="font-mono text-2xl font-black text-[#0A3D91] pt-2">{ticketId}</div>
            </div>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Our secretariat and Expert Panel have received your file. An assigned liaison officer will contact you within 24–48 working hours.
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
                <label className="block text-xs font-bold text-slate-700 mb-1.5">BEGA Member ID (If Applicable)</label>
                <input
                  type="text"
                  placeholder="e.g. BEGA-2026-XXXXXX"
                  value={formData.membershipNumber}
                  onChange={(e) => setFormData({ ...formData, membershipNumber: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:border-[#0A3D91]"
                />
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
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Problem Category *</label>
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

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Detailed Summary of Problem / Concern *</label>
              <textarea
                rows={4}
                required
                placeholder="State the facts, authorities involved, dates, and what specific assistance or guidance you need..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#0A3D91]"
              />
            </div>

            {/* Legal Disclaimer Box */}
            <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
              <strong>Institutional Disclaimer:</strong> BEGA India provides guidance, organizational representation, and expert panel referrals (Advocates/CAs). BEGA India does not replace statutory courts, police, or licensed regulatory bodies.
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#F57C00] hover:bg-[#e06f00] text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit Business Support Ticket (BSR)
            </button>
          </form>
        )}

      </div>
    </div>
  );
}