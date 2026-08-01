import React, { useState, useEffect } from 'react';
import {
  Building2,
  Calendar,
  CheckCircle,
  XCircle,
  Star,
  Plus,
  Trash2,
  Edit,
  MapPin,
  Clock,
  Search,
} from 'lucide-react';
import {
  getAdminDirectory,
  updateDirectoryStatus,
  toggleFeaturedCompany,
  getAdminEvents,
  createAdminEvent,
  updateAdminEvent,
  deleteAdminEvent,
} from '../../services/adminService';

export default function DirectoryAndEventsAdmin() {
  const [activeTab, setActiveTab] = useState('directory'); // 'directory' | 'events'
  
  // Directory state
  const [directory, setDirectory] = useState([]);
  const [directorySearch, setDirectorySearch] = useState('');
  const [directoryFilter, setDirectoryFilter] = useState('');

  // Events state
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    category: 'Networking',
    description: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTab === 'directory') fetchDirectory();
    if (activeTab === 'events') fetchEvents();
  }, [activeTab, directorySearch, directoryFilter]);

  const fetchDirectory = async () => {
    try {
      setLoading(true);
      const res = await getAdminDirectory(directorySearch, directoryFilter);
      if (res.success) setDirectory(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await getAdminEvents();
      if (res.success) setEvents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Directory Moderation Actions
  const handleApprove = async (id) => {
    const res = await updateDirectoryStatus(id, 'Approved');
    if (res.success) fetchDirectory();
  };

  const handleReject = async (id) => {
    const reason = prompt('Enter rejection reason for company profile:');
    if (!reason) return;
    const res = await updateDirectoryStatus(id, 'Rejected', reason);
    if (res.success) fetchDirectory();
  };

  const handleToggleFeature = async (id) => {
    const res = await toggleFeaturedCompany(id);
    if (res.success) fetchDirectory();
  };

  // Event Actions
  const handleSaveEvent = async (e) => {
    e.preventDefault();
    try {
      if (editingEventId) {
        await updateAdminEvent(editingEventId, eventForm);
      } else {
        await createAdminEvent(eventForm);
      }
      setShowEventModal(false);
      setEditingEventId(null);
      setEventForm({ title: '', date: '', time: '', location: '', category: 'Networking', description: '' });
      fetchEvents();
    } catch (err) {
      alert('Failed to save event');
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm('Delete this event?')) {
      const res = await deleteAdminEvent(id);
      if (res.success) fetchEvents();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-8 space-y-6 font-sans">
      
      {/* Top Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            Admin Moderation
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2">Business Directory & Event Management</h1>
        </div>

        <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'directory' ? 'bg-orange-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" /> Company Directory
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'events' ? 'bg-orange-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" /> Events Engine
          </button>
        </div>
      </div>

      {/* TAB 1: DIRECTORY MODERATION */}
      {activeTab === 'directory' && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-lg font-bold text-white">Public Directory Submissions</h2>

            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search company or location..."
                  value={directorySearch}
                  onChange={(e) => setDirectorySearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none"
                />
              </div>

              <select
                value={directoryFilter}
                onChange={(e) => setDirectoryFilter(e.target.value)}
                className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending Approval</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3">Company Details</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Contact Person</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {directory.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3">
                      <p className="font-bold text-white flex items-center gap-2">
                        {b.companyName}
                        {b.isFeatured && (
                          <span className="bg-amber-500/20 text-amber-400 text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400" /> Featured
                          </span>
                        )}
                      </p>
                      <p className="text-[11px] text-slate-400">{b.address || 'Address not provided'}</p>
                    </td>
                    <td className="p-3 font-medium">{b.category}</td>
                    <td className="p-3">{b.user?.name || 'Member'}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        b.status === 'Approved' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        b.status === 'Rejected' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                        'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {b.status || 'Pending'}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleToggleFeature(b._id)}
                        className="p-1.5 bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-slate-950 rounded-lg transition"
                        title="Toggle Featured Badge"
                      >
                        <Star className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleApprove(b._id)}
                        className="p-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 rounded-lg transition"
                        title="Approve Listing"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReject(b._id)}
                        className="p-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-slate-950 rounded-lg transition"
                        title="Reject Listing"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: EVENTS ENGINE */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Scheduled Summits & Events</h2>
            <button
              onClick={() => {
                setEditingEventId(null);
                setEventForm({ title: '', date: '', time: '', location: '', category: 'Networking', description: '' });
                setShowEventModal(true);
              }}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Create Event
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((evt) => (
              <div key={evt.id} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="bg-blue-950 text-blue-300 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-800">
                    {evt.category}
                  </span>
                  <span className="text-xs font-bold text-amber-400">
                    {evt.registrationsCount} Registrations
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{evt.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{evt.description}</p>

                <div className="space-y-1 text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    <span>{evt.date} • {evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    <span>{evt.location}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setEditingEventId(evt.id);
                      setEventForm({
                        title: evt.title,
                        date: evt.date,
                        time: evt.time,
                        location: evt.location,
                        category: evt.category,
                        description: evt.description,
                      });
                      setShowEventModal(true);
                    }}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(evt.id)}
                    className="p-2 bg-rose-950 text-rose-300 hover:bg-rose-900 rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Create/Edit Event */}
      {showEventModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-lg w-full space-y-4">
            <h3 className="text-lg font-bold text-white">
              {editingEventId ? 'Edit Event' : 'Create New Event'}
            </h3>

            <form onSubmit={handleSaveEvent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Time *</label>
                  <input
                    type="text"
                    required
                    placeholder="10:00 AM IST"
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Venue / Location *</label>
                <input
                  type="text"
                  required
                  placeholder="Full location or Zoom link"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="w-1/2 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-orange-500 hover:bg-orange-600 text-slate-950 font-extrabold rounded-xl"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}