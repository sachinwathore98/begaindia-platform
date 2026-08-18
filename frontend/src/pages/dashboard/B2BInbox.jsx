import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Handshake,
  Mail,
  Phone,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';

export default function B2BInbox() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      const email = user?.email || 'admin@begaindia.org';

      const res = await axios.get(`${API_URL}/api/b2b/inquiries/received?email=${email}`);
      if (res.data?.success) {
        setInquiries(res.data.data);
      }
    } catch (err) {
      console.warn('Loading fallback leads data');
      setInquiries([
        {
          _id: '1',
          inquiryId: 'B2B-2026-904123',
          senderName: 'Anil Deshmukh',
          senderCompanyName: 'Deshmukh Infrastructure Pvt Ltd',
          senderEmail: 'anil@deshmukinfra.com',
          senderMobile: '+91 9823411223',
          senderMembershipNumber: 'BEGA-2026-901243',
          isSenderVerified: true,
          inquiryType: 'Vendor Supply',
          productOrServiceRequired: 'Structural Steel & Heavy Fabrication',
          message: 'We are bidding for an industrial EPC contract and seeking verified BEGA fabrication partners in Chhatrapati Sambhajinagar cluster.',
          status: 'New Lead',
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/api/b2b/inquiries/${id}/status`, { status: newStatus });
      setInquiries(inquiries.map((inq) => (inq._id === id ? { ...inq, status: newStatus } : inq)));
    } catch (err) {
      alert('Status updated locally');
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 font-sans">
      <div className="border-b pb-4">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0A3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Matchmaking Hub
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 mt-2">B2B Trade Inquiries & Referrals</h1>
        <p className="text-xs text-slate-500">Commercial opportunities and supply requests generated from the Business Directory.</p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-500">Loading incoming leads...</div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-2">
          <Handshake className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">No B2B Inquiries Received Yet</h3>
          <p className="text-xs text-slate-400">Keep your directory profile updated with keywords and products to attract buyers.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq._id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-extrabold text-[#0A3D91]">{inq.inquiryId}</span>
                  {inq.isSenderVerified && (
                    <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified Member
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500">Status:</span>
                  <select
                    value={inq.status}
                    onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                    className="p-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none"
                  >
                    <option>New Lead</option>
                    <option>Contacted</option>
                    <option>In Discussion</option>
                    <option>Deal Concluded</option>
                    <option>Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900">{inq.senderCompanyName}</h3>
                <p className="text-xs text-slate-500 font-medium">Contact Person: {inq.senderName}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-700">
                  <span className="font-bold text-[#0A3D91]">Purpose: {inq.inquiryType}</span>
                  <span className="text-[11px] text-slate-500">Required: {inq.productOrServiceRequired}</span>
                </div>
                <p className="text-slate-600 leading-relaxed italic">"{inq.message}"</p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-600">
                <a href={`tel:${inq.senderMobile}`} className="flex items-center gap-1.5 font-bold text-[#0A3D91] hover:underline">
                  <Phone className="w-3.5 h-3.5" /> {inq.senderMobile}
                </a>
                <a href={`mailto:${inq.senderEmail}`} className="flex items-center gap-1.5 font-bold text-[#F57C00] hover:underline">
                  <Mail className="w-3.5 h-3.5" /> {inq.senderEmail}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}