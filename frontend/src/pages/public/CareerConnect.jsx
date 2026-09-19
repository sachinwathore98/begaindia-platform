// frontend/src/pages/public/CareerConnect.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, MapPin, Search, Building2, CheckCircle2, UserCheck, Send } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';
const API_URL = API_BASE.replace(/\/$/, '');

export default function CareerConnect() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicant, setApplicant] = useState({ fullName: '', email: '', mobile: '' });
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/career/jobs?district=${district}&search=${search}`);
        if (res.data?.success) setJobs(res.data.data);
      } catch (e) {
        console.error('Error fetching jobs', e);
      }
    };
    fetchJobs();
  }, [search, district]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;
    try {
      const res = await axios.post(`${API_URL}/api/career/apply/${selectedJob._id}`, applicant);
      if (res.data?.success) {
        setSuccessMsg(res.data.message);
        setApplicant({ fullName: '', email: '', mobile: '' });
        setTimeout(() => setSuccessMsg(''), 5000);
      }
    } catch (err) {
      alert('Application failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-12 px-4 sm:px-8 space-y-12 max-w-7xl mx-auto">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="px-3.5 py-1 bg-blue-50 border border-blue-200 text-[#0A3D91] text-xs font-black rounded-full uppercase tracking-wider">
          Connecting Employers, Job Seekers & Professionals
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          BEGA Job & Career Connect
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Connecting manufacturers, MSMEs, startups, and service firms with skilled talent across 36 districts of Maharashtra.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search role, skills, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#0A3D91]"
          />
        </div>
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="w-full sm:w-60 py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
        >
          <option value="All">All Maharashtra Districts</option>
          <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar</option>
          <option value="Pune">Pune</option>
          <option value="Nashik">Nashik</option>
          <option value="Nagpur">Nagpur</option>
          <option value="Mumbai">Mumbai</option>
        </select>
      </div>

      {/* Job Grid & Modal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 bg-blue-50 text-[#0A3D91] text-[10px] font-bold rounded-full border border-blue-100 uppercase">
                {job.jobType}
              </span>
              <h3 className="text-base font-black text-slate-900">{job.title}</h3>
              <p className="text-xs text-amber-600 font-bold flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> {job.companyName}
              </p>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" /> {job.location}, {job.district}
              </p>
              <p className="text-xs text-slate-600 line-clamp-3 pt-1">{job.description}</p>
            </div>
            <button
              onClick={() => setSelectedJob(job)}
              className="w-full py-2.5 bg-slate-900 hover:bg-[#F57C00] text-white font-black text-xs rounded-xl transition"
            >
              Apply Now
            </button>
          </div>
        ))}
        {jobs.length === 0 && (
          <div className="col-span-3 text-center py-12 text-slate-400 text-xs">
            No job openings found matching your criteria.
          </div>
        )}
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-black text-slate-900">Apply for {selectedJob.title}</h3>
                <p className="text-xs text-slate-500">{selectedJob.companyName} • {selectedJob.district}</p>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-slate-400 hover:text-slate-700 font-bold">&times;</button>
            </div>

            {successMsg ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {successMsg}
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-3 text-xs font-medium">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 pb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={applicant.fullName}
                    onChange={(e) => setApplicant({ ...applicant, fullName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 pb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={applicant.email}
                    onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 pb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={applicant.mobile}
                    onChange={(e) => setApplicant({ ...applicant, mobile: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#F57C00] text-white font-black text-xs rounded-xl shadow transition"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}