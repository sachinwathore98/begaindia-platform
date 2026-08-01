import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BellIcon,
  MegaphoneIcon,
  CalendarIcon,
  SparklesIcon,
  CheckCircleIcon,
  EnvelopeOpenIcon,
} from '@heroicons/react/24/outline';

const API_URL = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';

export default function NotificationModule() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setNotifications(res.data.data);
        setUnreadCount(res.data.unreadCount);
      }
    } catch (err) {
      console.error('Failed to load notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const res = await axios.put(
        `${API_URL}/api/notifications/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Failed to update notification:', err);
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'Announcement':
        return {
          icon: <MegaphoneIcon className="w-5 h-5 text-orange-600" />,
          bg: 'bg-orange-50 border-orange-200 text-orange-800',
        };
      case 'Event':
        return {
          icon: <CalendarIcon className="w-5 h-5 text-blue-900" />,
          bg: 'bg-blue-50 border-blue-200 text-blue-900',
        };
      case 'Membership':
        return {
          icon: <SparklesIcon className="w-5 h-5 text-amber-600" />,
          bg: 'bg-amber-50 border-amber-200 text-amber-800',
        };
      default:
        return {
          icon: <BellIcon className="w-5 h-5 text-slate-600" />,
          bg: 'bg-slate-50 border-slate-200 text-slate-800',
        };
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'All') return true;
    if (filter === 'Unread') return !n.isRead;
    return n.type === filter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      
      {/* Header & Filter Controls */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <BellIcon className="w-8 h-8 text-blue-900" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Notifications & Broadcasts</h1>
            <p className="text-slate-500 text-sm">Stay updated on network conclaves, membership renewal alerts, and announcements.</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap bg-slate-100 p-1 rounded-xl">
          {['All', 'Unread', 'Announcement', 'Event', 'Membership'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filter === f ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
            <EnvelopeOpenIcon className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-700">No Notifications Found</h3>
            <p className="text-sm text-slate-500">You are all caught up on network broadcasts.</p>
          </div>
        ) : (
          filteredNotifications.map((n) => {
            const badge = getTypeBadge(n.type);

            return (
              <div
                key={n._id}
                className={`p-5 rounded-2xl border transition flex items-start justify-between gap-4 ${
                  n.isRead
                    ? 'bg-white border-slate-200 opacity-80'
                    : 'bg-blue-50/40 border-blue-200 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl border shrink-0 ${badge.bg}`}>
                    {badge.icon}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${badge.bg}`}>
                        {n.type}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(n.createdAt).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">{n.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{n.message}</p>

                    {n.link && (
                      <a
                        href={n.link}
                        className="inline-block pt-1 text-xs font-bold text-blue-900 hover:underline"
                      >
                        View Link $\rightarrow$
                      </a>
                    )}
                  </div>
                </div>

                {!n.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(n._id)}
                    className="p-2 text-slate-400 hover:text-emerald-600 transition shrink-0"
                    title="Mark as Read"
                  >
                    <CheckCircleIcon className="w-6 h-6" />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}