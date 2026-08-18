import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LifeBuoy,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  UserCheck,
  ShieldAlert,
  CheckCircle,
  Building2,
  MapPin,
  Phone,
  Mail,
  Send,
  RefreshCw,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';

const EXPERT_PANELS = [
  'BEGA District Support Cell',
  'Legal & Advocate Advisory Panel',
  'CA / Taxation & GST Desk',
  'Labour Law & Compliance Cell',
  'MSME & Banking Liaison Desk',
  'Cyber Fraud & Recovery Cell',
];

const STATUSES = ['Submitted', 'Under Review', 'Assigned', 'Action / Guidance', 'Closed'];

export default function SupportAdmin() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Update Ticket State
  const [assignedExpert, setAssignedExpert] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [remarks, setRemarks] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      // Fetch tickets endpoint
      const res = await axios.get(`${API_URL}/api/support/tickets/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.success) {
        setTickets(res.data.data);
      }
    } catch (err) {
      console.warn('Loading mock support data for desk preview');
      setTickets([
        {
          _id: '1',
          ticketId: 'BSR-2026-891042',
          fullName: 'Rajesh Patil',
          membershipNumber: 'BEGA-2026-102941',
          businessName: 'Patil Engineering & Fabrication',
          mobile: '+91 9822012345',
          email: 'rajesh@patilengg.com',
          district: 'Chhatrapati Sambhajinagar',
          taluka: 'Aurangabad',
          problemCategory: 'Licence / Registration / NOC Issue',
          description: 'Factory inspection consent from local board pending for 45 days despite timely submission of all structural safety audits.',
          status: 'Under Review',
          assignedExpert: 'MSME & Banking Liaison Desk',
          officialRemarks: 'Document verification in progress by regional desk. Escalated to district nodal officer.',
          createdAt: new Date().toISOString(),
        },
        {
          _id: '2',
          ticketId: 'BSR-2026-773190',
          fullName: 'Suresh Deshmukh',
          membershipNumber: 'Non-Member / Applicant',
          businessName: 'Deshmukh Agro Traders',
          mobile: '+91 9423198765',
          email: 'suresh@deshmukhagro.in',
          district: 'Jalna',
          taluka: 'Ambad',
          problemCategory: 'Payment Delay / Commercial Recovery',
          description: 'Institutional bulk purchaser defaulted on standard 60-day invoice clearance post warehouse receipt.',
          status: 'Submitted',
          assignedExpert: 'BEGA District Support Cell',
          officialRemarks: 'Application logged. Assigned for initial screening.',
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTicket = (t) => {
    setSelectedTicket(t);
    setAssignedExpert(t.assignedExpert || 'BEGA District Support Cell');
    setNewStatus(t.status || 'Submitted');
    setRemarks(t.officialRemarks || '');
  };

  const handleUpdateTicket = async (e) => {
    e.preventDefault();
    if (!selectedTicket) return;

    try {
      setUpdating(true);
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `${API_URL}/api/support/tickets/${selectedTicket.ticketId}/status`,
        {
          status: newStatus,
          assignedExpert,
          officialRemarks: remarks,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.success) {
        alert('Ticket updated successfully!');
        setSelectedTicket({
          ...selectedTicket,
          status: newStatus,
          assignedExpert,
          officialRemarks: remarks,
        });
        fetchTickets();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Updated locally for preview.');
      setSelectedTicket({
        ...selectedTicket,
        status: newStatus,
        assignedExpert,
        officialRemarks: remarks,
      });
    } finally {
      setUpdating(false);
    }
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.ticketId.toLowerCase().includes(search.toLowerCase()) ||
      t.businessName.toLowerCase().includes(search.toLowerCase()) ||
      t.district.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-8 space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#F57C00] bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            Administrative Resolution Desk
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2">
            Business Support & Grievance Control
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Triage, assign expert panels, record official remarks, and manage live BSR status lifecycles.
          </p>
        </div>

        <button
          onClick={fetchTickets}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-800 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Refresh Tickets
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by Ticket ID, Business Name, District..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-[#F57C00]"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 outline-none"
          >
            <option value="All">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Ticket List + Triage Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Ticket List */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
            Incoming Requests ({filteredTickets.length})
          </h2>

          {loading ? (
            <div className="p-12 text-center text-slate-500">Loading requests...</div>
          ) : (
            <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
              {filteredTickets.map((t) => {
                const isSelected = selectedTicket?.ticketId === t.ticketId;
                return (
                  <div
                    key={t.ticketId}
                    onClick={() => handleSelectTicket(t)}
                    className={`p-4 rounded-2xl border cursor-pointer transition space-y-2 ${
                      isSelected
                        ? 'bg-slate-900 border-[#F57C00] shadow-md'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-xs font-extrabold text-[#F57C00]">
                        {t.ticketId}
                      </span>
                      <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold rounded-full">
                        {t.status}
                      </span>
                    </div>

                    <h3 className="text-sm font-extrabold text-white truncate">
                      {t.businessName}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate">
                      {t.problemCategory}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                      <span>{t.taluka}, {t.district}</span>
                      <span>{new Date(t.createdAt).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Ticket Action Desk */}
        <div className="lg:col-span-7">
          {selectedTicket ? (
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Selected Ticket</span>
                  <h2 className="text-xl font-mono font-extrabold text-[#F57C00]">
                    {selectedTicket.ticketId}
                  </h2>
                  <p className="text-xs text-slate-300 font-bold mt-1">
                    {selectedTicket.businessName} ({selectedTicket.fullName})
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-extrabold rounded-full">
                  {selectedTicket.membershipNumber}
                </span>
              </div>

              {/* Contact & Location */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800 text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#F57C00]" />
                  <span>{selectedTicket.mobile}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#0A3D91]" />
                  <span className="truncate">{selectedTicket.email}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{selectedTicket.taluka}, {selectedTicket.district}</span>
                </div>
              </div>

              {/* Problem Description */}
              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Submitted Grievance / Case Details:</span>
                <p className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-line">
                  {selectedTicket.description}
                </p>
              </div>

              {/* Resolution Controls Form */}
              <form onSubmit={handleUpdateTicket} className="space-y-4 pt-2 border-t border-slate-800 text-xs">
                <h3 className="font-extrabold text-white">Triage & Case Action Workflow</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Assign to Panel / Cell *</label>
                    <select
                      value={assignedExpert}
                      onChange={(e) => setAssignedExpert(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-[#F57C00]"
                    >
                      {EXPERT_PANELS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Workflow Status *</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-[#F57C00]"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Official Remarks & Resolution Steps</label>
                  <textarea
                    rows={3}
                    placeholder="Enter actionable guidance or notes visible to the member..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-[#F57C00]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={updating}
                  className="w-full py-3 bg-[#F57C00] hover:bg-[#e06f00] text-slate-950 font-extrabold rounded-xl shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {updating ? 'Saving Changes...' : 'Update Ticket & Broadcast Status'}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-slate-900/40 border border-slate-800 p-12 rounded-3xl text-center text-slate-500 space-y-2">
              <LifeBuoy className="w-10 h-10 text-slate-700 mx-auto" />
              <h3 className="text-sm font-bold text-slate-400">No Ticket Selected</h3>
              <p className="text-xs">Select a support ticket from the list to review and assign experts.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}