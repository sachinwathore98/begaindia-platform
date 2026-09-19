// frontend/src/pages/dashboard/NotificationModule.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Bell,
  Megaphone,
  Calendar,
  Sparkles,
  CheckCircle2,
  Mail,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';

export default function NotificationModule() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/api/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data?.success) {
          setNotifications(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load notifications:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0A3D91]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 font-sans">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-[#0A3D91]" />
          <div>
            <h1 className="text-xl font-black text-slate-900">Notifications & Broadcasts</h1>
            <p className="text-slate-500 text-xs">Official announcements, scheme deadlines, and conclave schedules.</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center space-y-2">
            <Mail className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-black text-slate-700">No New Broadcasts</h3>
            <p className="text-xs text-slate-500">You are up to date on all association notices.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs flex items-start gap-3"
            >
              <Megaphone className="w-5 h-5 text-[#F57C00] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-black text-slate-900">{n.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}