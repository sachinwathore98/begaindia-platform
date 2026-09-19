// frontend/src/pages/dashboard/EventModule.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Calendar,
  MapPin,
  Ticket,
  Download,
  CheckCircle2,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';

export default function EventModule() {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/events`);
        if (res.data?.success) setAllEvents(res.data.data);
      } catch (err) {
        console.error('Failed to load events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0A3D91]" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6 font-sans">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-black text-slate-900">Events & Conclave Registration</h1>
        <p className="text-slate-500 text-xs">Register for BEGA Business Expos and regional conventions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allEvents.map((evt) => (
          <div
            key={evt._id || evt.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <span className="bg-blue-50 text-[#0A3D91] text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
                {evt.eventType || evt.category || 'Business Event'}
              </span>
              <h3 className="text-base font-black text-slate-900">{evt.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{evt.description}</p>
              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#F57C00]" />
                  <span>{new Date(evt.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{evt.venue || evt.district}</span>
                </div>
              </div>
            </div>
            <a
              href="/events"
              className="w-full py-2.5 bg-slate-900 hover:bg-[#F57C00] text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4" /> Delegate Pass Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}