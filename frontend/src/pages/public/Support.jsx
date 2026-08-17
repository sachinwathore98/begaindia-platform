import React, { useState } from 'react';
import axios from 'axios';
import { MAHARASHTRA_DISTRICTS } from '../../data/maharashtraGeo';
import TicketStatusStepper from '../../components/support/TicketStatusStepper';
import {
  LifeBuoy,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Building2,
  FileText,
  User,
  ArrowRight,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';

const PROBLEM_CATEGORIES = [
  'Government / Administrative Issue',
  'Licence / Registration / NOC Issue',
  'GST / Taxation / Compliance Guidance',
  'Employee / Employer / Workplace Dispute',
  'Payment Delay / Commercial Recovery',
  'Cyber Fraud / Digital Payment Scam',
  'Other Genuine Business Concern',
];

export default function Support() {
  const [activeTab, setActiveTab] = useState('submit'); // 'submit' | 'track'

  // Submit Form State
  const [formData, setFormData] = useState({
    fullName: '',
    membershipNumber: '',
    businessName: '',
    mobile: '',
    email: '',
    district: 'Chhatrapati Sambhajinagar',
    taluka: 'Aurangabad',
    problemCategory: 'Government / Administrative Issue',
    description: '',
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState(null);

  // Track State
  const [searchTicketId, setSearchTicketId] = useState('');
  const [trackLoading, setTrackLoading] = useState(false);
  const [trackedTicket, setTrackedTicket] = useState(null);
  const [trackError, setTrackError] = useState('');

  const availableTalukas = MAHARASHTRA_DISTRICTS[formData.district] || [];

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    const talukas = MAHARASHTRA_DISTRICTS[selectedDistrict] || [];
    setFormData({
      ...formData,
      district: selectedDistrict,
      taluka: talukas[0] || '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitLoading(true);
      const res = await axios.post(`${API_URL}/api/support/tickets`, formData);
      if (res.data.success) {
        setGeneratedTicket(res.data.data);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit support request.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!searchTicketId.trim()) return;

    try {
      setTrackLoading(true);
      setTrackError('');
      setTrackedTicket(null);
      const res = await axios.get(`${API_URL}/api/support/tickets/${searchTicketId.trim()}`);
      if (res.data.success) {
        setTrackedTicket(res.data.data);
      }
    } catch (err) {
      setTrackError(err.response?.data?.message || 'Support request not found.');
    } finally {
      setTrackLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="text-center space-y-2">
          <span className="px-3.5 py-1 bg-blue-100 text-[#0A3D91] text-xs font-extrabold rounded-full uppercase tracking-wider">
            BEGA Grievance & Support Cell[cite: 7]
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Business Support Request (BSR)[cite: 1, 7]
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
            Submit legitimate business concerns regarding government procedures, licensing delays, taxation, payment disputes, or workplace issues for structured resolution and expert guidance[cite: 1, 7].
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center">
          <div className="bg-slate-200/80 p-1.5 rounded-2xl flex gap-1.5 shadow-inner">
            <button
              onClick={() => { setActiveTab('submit'); setGeneratedTicket(null); }}
              className={`px-6 py-2.5 rounded-xl text-xs font-extrabold transition ${
                activeTab === 'submit'
                  ? 'bg-[#0A3D91] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Submit Support Request
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`px-6 py-2.5 rounded-xl text-xs font-extrabold transition ${
                activeTab === 'track'
                  ? 'bg-[#0A3D91] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Track Request Status[cite: 2, 7]
            </button>
          </div>
        </div>

        {/* TAB 1: SUBMIT NEW TICKET */}
        {activeTab === 'submit' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
            {generatedTicket ? (
              <div className="text-center space-y-6 py-6 animate-in fade-in">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Support Request Registered Successfully![cite: 7]
                  </h3>
                  <p className="text-xs text-slate-500">
                    Your request has been routed to the regional coordination desk[cite: 7].
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-sm mx-auto space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Support Request ID[cite: 7]</span>
                  <p className="text-lg font-mono font-extrabold text-[#0A3D91] tracking-wider">
                    {generatedTicket.ticketId}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">Keep this ID to track your live status[cite: 2, 7].</p>
                </div>

                <TicketStatusStepper currentStatus={generatedTicket.status} />

                <button
                  onClick={() => {
                    setSearchTicketId(generatedTicket.ticketId);
                    setActiveTab('track');
                  }}
                  className="px-6 py-2.5 bg-[#F57C00] hover:bg-[#e06f00] text-white text-xs font-bold rounded-xl shadow transition"
                >
                  Track Live Pipeline[cite: 2, 7]
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b pb-3">
                  <h3 className="text-sm font-bold text-slate-900">Enter Problem & Enterprise Details[cite: 2, 7]</h3>
                  <p className="text-[11px] text-slate-500">All submissions are reviewed in accordance with organizational confidentiality standards[cite: 7].</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">BEGA Membership Number (If applicable)</label>
                    <input
                      type="text"
                      placeholder="e.g. BEGA-2026-891024"
                      value={formData.membershipNumber}
                      onChange={(e) => setFormData({ ...formData, membershipNumber: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91] font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Business / Firm Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Company name"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">District *</label>
                    <select
                      value={formData.district}
                      onChange={handleDistrictChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    >
                      {Object.keys(MAHARASHTRA_DISTRICTS).map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Taluka *</label>
                    <select
                      value={formData.taluka}
                      onChange={(e) => setFormData({ ...formData, taluka: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    >
                      {availableTalukas.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Problem / Concern Category *[cite: 7]</label>
                  <select
                    value={formData.problemCategory}
                    onChange={(e) => setFormData({ ...formData, problemCategory: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91] font-semibold text-[#0A3D91]"
                  >
                    {PROBLEM_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Description of Problem / Grievance *[cite: 2, 4]</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide specific details regarding the administrative delay, notice, commercial recovery issue, or workplace dispute..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                  />
                </div>

                {/* Legal Disclaimer Box */}
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] text-amber-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#F57C00]" />
                    Legal Notice & Disclaimer[cite: 7]:
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    BEGA India functions as an organizational support and referral platform[cite: 7]. BEGA does not replace statutory courts, police authorities, or licensed professionals (Advocates/CAs)[cite: 7]. Where appropriate, matters are referred to qualified panel experts[cite: 1, 7].
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="px-8 py-3 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-extrabold rounded-xl shadow-lg transition flex items-center gap-2 disabled:opacity-50"
                  >
                    {submitLoading ? 'Submitting...' : 'Submit Support Request'}[cite: 2] <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: TRACK STATUS */}
        {activeTab === 'track' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
            <form onSubmit={handleTrack} className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">Enter Your Support Request ID[cite: 2, 7]</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. BSR-2026-781924"
                  value={searchTicketId}
                  onChange={(e) => setSearchTicketId(e.target.value)}
                  className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91] font-mono uppercase"
                />
                <button
                  type="submit"
                  disabled={trackLoading}
                  className="px-6 py-3 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-extrabold rounded-xl shadow transition flex items-center gap-2 shrink-0 disabled:opacity-50"
                >
                  <Search className="w-4 h-4" /> {trackLoading ? 'Searching...' : 'Track'}
                </button>
              </div>
            </form>

            {trackError && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{trackError}</span>
              </div>
            )}

            {trackedTicket && (
              <div className="space-y-6 pt-4 border-t border-slate-100 animate-in fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Support Request[cite: 7]</span>
                    <h3 className="text-base font-mono font-extrabold text-[#0A3D91]">{trackedTicket.ticketId}</h3>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-[#0A3D91] text-xs font-extrabold rounded-full border border-blue-200">
                    Status: {trackedTicket.status}[cite: 4]
                  </span>
                </div>

                {/* 5-Stage Live Status Stepper */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <TicketStatusStepper currentStatus={trackedTicket.status} />
                </div>

                {/* Details Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-slate-400 font-semibold">Business / Member[cite: 4, 7]</span>
                    <p className="font-bold text-slate-900">{trackedTicket.businessName} ({trackedTicket.fullName})</p>
                    <p className="text-slate-500">{trackedTicket.taluka}, {trackedTicket.district}</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-slate-400 font-semibold">Assigned Cell / Expert[cite: 1, 4]</span>
                    <p className="font-bold text-slate-900">{trackedTicket.assignedExpert}</p>
                    <p className="text-slate-500">Category: {trackedTicket.problemCategory}[cite: 2, 4]</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-xs space-y-1">
                  <span className="font-bold text-[#0A3D91]">Official Coordinator Remarks[cite: 7]:</span>
                  <p className="text-slate-700 leading-relaxed">{trackedTicket.officialRemarks}</p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}