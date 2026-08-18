import React, { useState } from 'react';
import axios from 'axios';
import {
  Handshake,
  Send,
  Building2,
  CheckCircle2,
  ShieldCheck,
  X,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';

const INQUIRY_TYPES = [
  'Product Sourcing',
  'Dealership / Distributorship',
  'Joint Venture',
  'Vendor Supply',
  'Service Requirement',
];

export default function B2BConnectModal({ business, onClose }) {
  const [formData, setFormData] = useState({
    senderName: '',
    senderCompanyName: '',
    senderEmail: '',
    senderMobile: '',
    senderMembershipNumber: '',
    inquiryType: 'Product Sourcing',
    productOrServiceRequired: '',
    estimatedBudget: 'Negotiable',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...formData,
        receiverBusinessId: business._id || business.id || 'DIR-BUSINESS',
        receiverCompanyName: business.companyName,
        receiverEmail: business.email || 'info@begaindia.org',
        isSenderVerified: Boolean(formData.senderMembershipNumber.startsWith('BEGA-')),
      };

      const res = await axios.post(`${API_URL}/api/b2b/inquiries`, payload);
      if (res.data?.success) {
        setSuccessMsg(res.data.message);
        setTimeout(() => {
          setSuccessMsg('');
          onClose();
        }, 3000);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to dispatch inquiry. Please check details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in max-h-[90vh] overflow-y-auto font-sans">
        
        {/* Modal Header */}
        <div className="flex justify-between items-start border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-[#0A3D91] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 flex items-center gap-1 w-fit">
              <Handshake className="w-3 h-3" /> Member-to-Member B2B Matchmaking
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1 flex items-center gap-1.5">
              Connect with {business.companyName}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMsg ? (
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2 text-emerald-800">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-extrabold text-sm">Inquiry Dispatched Successfully!</h4>
            <p className="text-xs">{successMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kulkarni"
                  value={formData.senderName}
                  onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D91]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Your Enterprise / Company *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Industrial Solutions"
                  value={formData.senderCompanyName}
                  onChange={(e) => setFormData({ ...formData, senderCompanyName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D91]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Mobile Contact *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9876543210"
                  value={formData.senderMobile}
                  onChange={(e) => setFormData({ ...formData, senderMobile: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D91]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="procurement@company.com"
                  value={formData.senderEmail}
                  onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D91]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Inquiry Purpose *</label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D91] font-semibold text-slate-800"
                >
                  {INQUIRY_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">BEGA Member ID (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. BEGA-2026-102941"
                  value={formData.senderMembershipNumber}
                  onChange={(e) => setFormData({ ...formData, senderMembershipNumber: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D91] font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Required Product / Service Details *</label>
              <input
                type="text"
                required
                placeholder="e.g. 500 units CNC Precision Components / Month"
                value={formData.productOrServiceRequired}
                onChange={(e) => setFormData({ ...formData, productOrServiceRequired: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D91]"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Commercial Requirement Brief</label>
              <textarea
                rows={3}
                required
                placeholder="Specify your technical specifications, order volumes, or partnership terms..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D91]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0A3D91] hover:bg-[#083278] text-white font-extrabold rounded-xl shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              <Send className="w-4 h-4" />
              {loading ? 'Transmitting Request...' : 'Send Official B2B Inquiry'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}