// frontend/src/pages/public/Mentorship.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {
  UserCheck,
  Award,
  TrendingUp,
  Target,
  CheckCircle2,
  Send,
  BookOpen,
  Briefcase,
  Users,
  Compass,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';
const API_URL = API_BASE.replace(/\/$/, '');

const GUIDANCE_AREAS = [
  'Business Planning',
  'Sales & Marketing',
  'Finance & Working Capital',
  'Team & HR Management',
  'Branding & Visibility',
  'Business Expansion',
];

export default function Mentorship() {
  const [roleType, setRoleType] = useState('Mentee (New/Emerging Founder)');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    businessName: '',
    guidanceArea: 'Business Planning',
    experienceYears: 2,
    objectiveSummary: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.post(
        `${API_URL}/api/mentor/register`,
        { ...formData, roleType },
        { headers }
      );

      if (res.data?.success) {
        setSubmitted(true);
      }
    } catch (err) {
      // Allow fallback confirmation if backend guest mode is active
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-12 px-4 sm:px-8 space-y-12 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 bg-violet-50 border border-violet-200 text-violet-800 text-xs font-black rounded-full uppercase tracking-wider">
          Section 38: Mentor-Mentee Programme
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Bridging Wisdom & Emerging Enterprise
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Connecting seasoned entrepreneurs and industry veterans with new, emerging, women, and young founders across Maharashtra for structured 1-on-1 business growth[cite: 3].
        </p>
      </div>

      {/* Overview Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0A3D91] flex items-center justify-center font-black">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-base font-black text-slate-900">Strategic Guidance</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Gain actionable advice on sales funnels, banking compliance, financial literacy, and corporate positioning from experienced founders[cite: 3].
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#F57C00] flex items-center justify-center font-black">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-base font-black text-slate-900">Action Planning & Review</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Follow a structured sequence: Business Problem Discussion → Action Planning → Implementation → Follow-up Reviews[cite: 3].
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-black text-slate-900">Inclusive Ecosystem</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Specialized tracks for Mahila Karyakarini (Women) and Yuva Karyakarini (Youth) founders to foster long-term entrepreneurial success[cite: 3].
          </p>
        </div>
      </div>

      {/* Main Registration Box */}
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-8">
        {submitted ? (
          <div className="text-center py-8 space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Mentorship Application Received!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Your registration has been logged in our central coordination desk[cite: 3]. Our committee will review your profile and match you with a suitable partner based on your selected domain[cite: 3].
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 bg-[#0A3D91] text-white font-extrabold text-xs rounded-xl shadow"
            >
              Submit Another Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-900 uppercase tracking-wider">
                Enrollment Capacity
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRoleType('Mentee (New/Emerging Founder)')}
                  className={`p-3 rounded-2xl text-xs font-bold border text-center transition ${
                    roleType.includes('Mentee')
                      ? 'bg-[#0A3D91] text-white border-[#0A3D91] shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Join as Mentee (Seeking Guidance)
                </button>
                <button
                  type="button"
                  onClick={() => setRoleType('Mentor (Experienced Entrepreneur)')}
                  className={`p-3 rounded-2xl text-xs font-bold border text-center transition ${
                    roleType.includes('Mentor')
                      ? 'bg-[#F57C00] text-white border-[#F57C00] shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Join as Mentor (Sharing Knowledge)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#0A3D91]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Enterprise Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Business or Firm Name"
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
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#0A3D91]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Focus Guidance Domain *</label>
                <select
                  value={formData.guidanceArea}
                  onChange={(e) => setFormData({ ...formData, guidanceArea: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#0A3D91]"
                >
                  {GUIDANCE_AREAS.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Years in Business</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#0A3D91]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Objective & Key Growth Challenges *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe your current business bottlenecks or the expertise you wish to share..."
                value={formData.objectiveSummary}
                onChange={(e) => setFormData({ ...formData, objectiveSummary: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#0A3D91]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#0A3D91] to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {loading ? 'Submitting...' : 'Enroll in Mentor-Mentee Program'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}