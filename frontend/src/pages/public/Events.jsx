// frontend/src/pages/public/Events.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Calendar,
  MapPin,
  Clock,
  Tag,
  Users,
  Ticket,
  CheckCircle2,
  Building2,
  ArrowRight,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';
const API_URL = API_BASE.replace(/\/$/, '');

const EVENT_TABS = [
  'All',
  'BEGA Mahaadhiveshan',
  'BEGA Business Expo',
  'B2B Meet',
  'State Seminar',
  'District Training',
];

export default function Events() {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    companyName: '',
  });
  const [passData, setPassData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/events?eventType=${activeTab}`);
        if (res.data?.success) {
          setEvents(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load events', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [activeTab]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;
    try {
      const res = await axios.post(
        `${API_URL}/api/events/${selectedEvent._id}/register`,
        registerForm
      );
      if (res.data?.success) {
        setPassData(res.data.pass);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to register for this event.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-12 px-4 sm:px-8 space-y-12 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 bg-blue-50 border border-blue-200 text-[#0A3D91] text-xs font-black rounded-full uppercase tracking-wider">
          Events & Conventions
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Conclaves, Expos & Regional Meets
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Explore state-level conventions, commercial business expos, B2B buyer-seller meets, and regional training programs.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {EVENT_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === tab
                ? 'bg-[#0A3D91] text-white shadow-md font-black'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-2">
                <span className="px-2.5 py-0.5 bg-blue-50 text-[#0A3D91] border border-blue-100 rounded-full text-[10px] font-black uppercase">
                  {event.eventType}
                </span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full">
                  {event.isFree ? 'Free Pass' : `Pass: ₹${event.registrationFee}`}
                </span>
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900 leading-snug">
                  {event.title}
                </h3>
                {event.theme && (
                  <p className="text-xs font-bold text-amber-600 mt-1">
                    Theme: {event.theme}
                  </p>
                )}
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {event.description}
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#F57C00]" />
                  <span>{new Date(event.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
                </div>
                {event.time && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{event.time}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{event.venue || event.district}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedEvent(event);
                setPassData(null);
              }}
              className="w-full py-2.5 bg-slate-900 hover:bg-[#F57C00] text-white font-black text-xs rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <Ticket className="w-3.5 h-3.5" /> Register / Delegate Pass
            </button>
          </div>
        ))}
      </div>

      {events.length === 0 && !loading && (
        <div className="text-center py-12 text-slate-400 text-xs">
          No events found in this category.
        </div>
      )}

      {/* Registration Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {passData ? 'Delegate Pass Confirmed' : `Register: ${selectedEvent.title}`}
                </h3>
                <p className="text-xs text-slate-500">{selectedEvent.venue || selectedEvent.district}</p>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                &times;
              </button>
            </div>

            {passData ? (
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <div>
                  <h4 className="text-sm font-black text-emerald-950">Registration Confirmed!</h4>
                  <p className="text-xs text-emerald-800">Your pass reference number:</p>
                  <p className="font-mono text-base font-black text-[#0A3D91] mt-1">{passData.passId}</p>
                </div>
                <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-emerald-200/60">
                  <p><strong>Delegate:</strong> {passData.attendeeName}</p>
                  <p><strong>Organization:</strong> {passData.companyName}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3 text-xs font-medium">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 pb-1">Delegate Name *</label>
                  <input
                    type="text"
                    required
                    value={registerForm.fullName}
                    onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    placeholder="Enter delegate full name"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 pb-1">Company / Enterprise Name</label>
                  <input
                    type="text"
                    value={registerForm.companyName}
                    onChange={(e) => setRegisterForm({ ...registerForm, companyName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    placeholder="Firm or enterprise name"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 pb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    placeholder="delegate@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 pb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={registerForm.mobile}
                    onChange={(e) => setRegisterForm({ ...registerForm, mobile: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#F57C00] hover:bg-[#e06f00] text-white font-black text-xs rounded-xl shadow transition"
                >
                  Confirm Delegate Registration
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}