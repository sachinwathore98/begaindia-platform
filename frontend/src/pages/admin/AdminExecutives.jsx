// frontend/src/pages/admin/AdminExecutives.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  Building2,
  MapPin,
  Clock,
  ChevronRight,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';
const API_URL = API_BASE.replace(/\/$/, '');

// The 9-Stage Executive Workflow specified in Section 11 of the PDF
const SELECTION_STAGES = [
  'Application',
  'Eligibility Check',
  'Verification',
  'Interview / Discussion',
  'Selection',
  'Approval',
  'Appointment',
  'Performance Review',
  'Rejected',
];

const COMMITTEE_WINGS = [
  'All',
  'Central Core Committee',
  'State Core Committee',
  'Regional Karyakarini',
  'District Karyakarini',
  'Taluka Karyakarini',
  'Mahila Karyakarini (Women)',
  'Yuva Karyakarini (Youth)',
];

export default function AdminExecutives() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedWing, setSelectedWing] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);
  const [stageRemark, setStageRemark] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/membership/executive-applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.success) {
        setApplications(res.data.data);
        setFilteredApplications(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching executive applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    let result = [...applications];
    if (selectedWing !== 'All') {
      result = result.filter((a) => a.committeeLevel === selectedWing);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.fullName?.toLowerCase().includes(q) ||
          a.email?.toLowerCase().includes(q) ||
          a.businessName?.toLowerCase().includes(q) ||
          a.district?.toLowerCase().includes(q)
      );
    }
    setFilteredApplications(result);
  }, [search, selectedWing, applications]);

  const handleUpdateStage = async (id, newStage) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `${API_URL}/api/membership/executive-stage/${id}`,
        {
          selectionStage: newStage,
          officialRemarks: stageRemark || `Moved to stage: ${newStage}`,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data?.success) {
        setSelectedApp(null);
        setStageRemark('');
        fetchApplications();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update selection stage.');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0A3D91] to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <span className="px-3 py-1 bg-amber-400/20 text-amber-300 text-[10px] font-black rounded-full uppercase tracking-widest border border-amber-400/30">
            Sections 11 & 39–46: Karyakarini Governance
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">
            Executive Committee Selection Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Membership fee is not a position fee. Review candidate dossiers and manage the strict 9-step appointment workflow for Central, State, Mahila, and Yuva leadership.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-xs text-center">
          <span className="text-[10px] uppercase text-amber-300 font-bold block">Total In Review</span>
          <span className="text-xl font-black text-white">{applications.length} Dossiers</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search candidate name, business, district..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#0A3D91]"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedWing}
            onChange={(e) => setSelectedWing(e.target.value)}
            className="w-full sm:w-64 py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none"
          >
            {COMMITTEE_WINGS.map((wing) => (
              <option key={wing} value={wing}>
                {wing}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-black uppercase text-[10px]">
                <th className="p-4">Candidate & Enterprise</th>
                <th className="p-4">Target Committee Wing</th>
                <th className="p-4">Location</th>
                <th className="p-4">Experience</th>
                <th className="p-4">Current Workflow Stage</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredApplications.map((app) => (
                <tr key={app._id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4">
                    <div className="font-black text-slate-900">{app.fullName}</div>
                    <div className="text-[11px] text-amber-600 font-bold">{app.businessName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{app.email} • {app.mobile}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-blue-50 text-[#0A3D91] border border-blue-200 rounded-lg font-bold text-[11px]">
                      {app.committeeLevel}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{app.district}</div>
                    <div className="text-[11px] text-slate-400">{app.taluka}</div>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900">{app.experienceYears || 0} Years</span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        app.selectionStage === 'Appointment'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : app.selectionStage === 'Rejected'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {app.selectionStage}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedApp(app);
                        setStageRemark(app.officialRemarks || '');
                      }}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-[#F57C00] text-white font-bold text-xs rounded-xl shadow transition"
                    >
                      Manage Stage &rarr;
                    </button>
                  </td>
                </tr>
              ))}
              {filteredApplications.length === 0 && !loading && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">
                    No executive applications found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 9-Step Stage Transition Dossier Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="px-2.5 py-0.5 bg-blue-50 text-[#0A3D91] text-[10px] font-black rounded-full uppercase border border-blue-100">
                  {selectedApp.committeeLevel}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Candidate Dossier: {selectedApp.fullName}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedApp.businessName} • {selectedApp.district}, {selectedApp.taluka}
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            {/* Candidate Vision Statement */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1.5">
              <p className="font-black text-slate-700 uppercase text-[10px]">
                Applicant Vision Statement & Commercial Objectives:
              </p>
              <p className="text-slate-600 leading-relaxed italic">
                "{selectedApp.visionStatement}"
              </p>
            </div>

            {/* Visual 9-Step Selection Pipeline Tracker */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider">
                9-Step Selection Progression (Section 11)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SELECTION_STAGES.filter((s) => s !== 'Rejected').map((stage, idx) => {
                  const isCurrent = selectedApp.selectionStage === stage;
                  return (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => handleUpdateStage(selectedApp._id, stage)}
                      className={`p-2.5 rounded-xl text-left border transition flex items-center justify-between ${
                        isCurrent
                          ? 'bg-[#0A3D91] text-white border-[#0A3D91] shadow'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <span className="text-[9px] block opacity-75 font-bold">
                          Step {idx + 1}
                        </span>
                        <span className="text-[11px] font-bold block">{stage}</span>
                      </div>
                      {isCurrent && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Official Review Remarks & Reject Action */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-slate-700">
                Official Committee Verification Remarks
              </label>
              <textarea
                rows={2}
                value={stageRemark}
                onChange={(e) => setStageRemark(e.target.value)}
                placeholder="Enter background check remarks, interview feedback, or approval terms..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#0A3D91]"
              />
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => handleUpdateStage(selectedApp._id, 'Rejected')}
                  className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl transition border border-rose-200"
                >
                  Reject Candidature
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}