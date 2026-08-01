import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CalendarIcon,
  MapPinIcon,
  TicketIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const API_URL = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';

export default function EventModule() {
  const [allEvents, setAllEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState('');
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' | 'my-events'

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      setLoading(true);
      const [allRes, myRes] = await Promise.all([
        axios.get(`${API_URL}/api/events`),
        axios.get(`${API_URL}/api/events/my-events`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (allRes.data.success) setAllEvents(allRes.data.data);
      if (myRes.data.success) setMyEvents(myRes.data.data);
    } catch (err) {
      console.error('Failed to load events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      setRegistering(eventId);
      const res = await axios.post(
        `${API_URL}/api/events/register`,
        { eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        fetchEventData();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    } finally {
      setRegistering('');
    }
  };

  const handleDownloadPass = async (eventId, title) => {
    try {
      const response = await axios.get(`${API_URL}/api/events/${eventId}/pass`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `BEGAINDIA-Pass-${title.replace(/\s+/g, '-')}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to download pass. Make sure you are registered.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  const isRegistered = (eventId) => myEvents.some((e) => e.id === eventId);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      
      {/* Header & Tabs */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Event Management</h1>
          <p className="text-slate-500 text-sm">Register for upcoming business conclaves and download entry passes.</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === 'browse' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setActiveTab('my-events')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === 'my-events' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Registrations ({myEvents.length})
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(activeTab === 'browse' ? allEvents : myEvents).map((evt) => {
          const registered = isRegistered(evt.id);

          return (
            <div key={evt.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="bg-blue-50 text-blue-900 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
                    {evt.category}
                  </span>
                  {registered && (
                    <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                      <CheckCircleIcon className="w-4 h-4" /> Registered
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900">{evt.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{evt.description}</p>

                <div className="space-y-1.5 pt-2 text-xs font-medium text-slate-500">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-slate-400" />
                    <span>{evt.date} • {evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 text-slate-400" />
                    <span>{evt.location}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex gap-3">
                {registered ? (
                  <button
                    onClick={() => handleDownloadPass(evt.id, evt.title)}
                    className="w-full py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" /> Download Ticket Pass
                  </button>
                ) : (
                  <button
                    onClick={() => handleRegister(evt.id)}
                    disabled={registering === evt.id}
                    className="w-full py-2.5 bg-blue-900 text-white font-bold text-sm rounded-xl hover:bg-blue-800 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <TicketIcon className="w-4 h-4" />
                    {registering === evt.id ? 'Registering...' : 'Register Now'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}