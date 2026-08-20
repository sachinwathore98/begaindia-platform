import React, { useState } from 'react';
import {
  LifeBuoy,
  CheckCircle2,
  Clock,
  Send,
  ShieldCheck,
  Filter,
  UserCheck,
  Building,
  RefreshCw,
} from 'lucide-react';

const INITIAL_TICKETS = [
  {
    id: 'BSR-2026-904123',
    applicantName: 'Kishore Joshi',
    companyName: 'NovaTech Automation',
    district: 'Pune',
    category: 'Government / Administrative Issue',
    description: 'MIDC Chakan unit expansion NOC pending clearance past statutory 30-day window.',
    status: 'Under Review',
    expert: 'CA & Legal Liaison Cell',
    date: '19 Aug 2026',
  },
  {
    id: 'BSR-2026-441829',
    applicantName: 'Sunita Deshmukh',
    companyName: 'Sahyadri Organic Agro',
    district: 'Nashik',
    category: 'Delayed Payment Recovery',
    description: '₹4.2 Lakh commercial payment default from wholesale buyer beyond 45-day MSME SAMADHAAN limit.',
    status: 'Assigned',
    expert: 'MSME Arbitration Panel',
    date: '18 Aug 2026',
  },
];

export default function SupportAdmin() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState(INITIAL_TICKETS[0]);
  const [statusInput, setStatusInput] = useState(INITIAL_TICKETS[0].status);
  const [expertInput, setExpertInput] = useState(INITIAL_TICKETS[0].expert);
  const [resolutionNotes, setResolutionNotes] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id ? { ...t, status: statusInput, expert: expertInput } : t
      )
    );
    setSelectedTicket({ ...selectedTicket, status: statusInput, expert: expertInput });
    alert(`Ticket ${selectedTicket.id} updated to ${statusInput}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10 font-sans space-y-6">
      
      <div className="flex justify-between items-center border-b border-slate-800 pb-5">
        <div>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-black rounded-full uppercase tracking-wider">
            Admin Master Control
          </span>
          <h1 className="text-2xl font-black text-white mt-1">BSR Grievance & Resolution Desk</h1>
        </div>
        <div className="text-xs font-bold text-slate-400">Jurisdiction: State Committee (Maharashtra)</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Ticket List */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Incoming Grievances ({tickets.length})</h2>
          {tickets.map((t) => (
            <div
              key={t.id}
              onClick={() => {
                setSelectedTicket(t);
                setStatusInput(t.status);
                setExpertInput(t.expert);
              }}
              className={`p-5 rounded-2xl border cursor-pointer transition space-y-2 ${
                selectedTicket.id === t.id
                  ? 'bg-slate-900 border-[#F57C00] shadow-lg ring-1 ring-orange-500/20'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs font-black text-amber-400">{t.id}</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                  {t.status}
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-white">{t.companyName}</h3>
              <p className="text-xs text-slate-400 line-clamp-2">{t.description}</p>
              <div className="text-[10px] text-slate-500 font-bold">{t.district} • {t.date}</div>
            </div>
          ))}
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-[10px] font-black uppercase text-amber-400">Active Case Resolution</span>
            <h2 className="text-xl font-black text-white mt-1">{selectedTicket.id} — {selectedTicket.applicantName}</h2>
            <p className="text-xs text-slate-400 mt-1">{selectedTicket.category}</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            {selectedTicket.description}
          </div>

          <form onSubmit={handleUpdate} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Update Status</label>
                <select
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                >
                  <option>Submitted</option>
                  <option>Under Review</option>
                  <option>Assigned</option>
                  <option>Action / Guidance</option>
                  <option>Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Assign Expert Panel</label>
                <select
                  value={expertInput}
                  onChange={(e) => setExpertInput(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                >
                  <option>CA & Taxation Desk</option>
                  <option>Legal & Labour Law Panel</option>
                  <option>MSME Arbitration Panel</option>
                  <option>DIC & Government Liaison</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Resolution Directives / Guidance Note</label>
              <textarea
                rows={3}
                placeholder="Enter official resolution notes to broadcast to member..."
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#F57C00] hover:bg-[#e06f00] text-slate-950 font-black rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Commit Resolution & Notify Member
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}