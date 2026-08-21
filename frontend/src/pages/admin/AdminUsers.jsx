// frontend/src/pages/admin/AdminUsers.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ShieldCheck, UserX, Trash2, CheckCircle2, User } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';
const API_URL = API_BASE.replace(/\/$/, '');

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/admin/users?search=${search}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.success) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching users', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const handleApproveMembership = async (userId, planName) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `${API_URL}/api/admin/users/${userId}/approve-membership`,
        { planName, durationDays: 365 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data?.success) {
        alert(res.data.message);
        fetchUsers();
      }
    } catch (err) {
      alert('Failed to update membership');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900">Member & User Accounts</h1>
          <p className="text-xs text-slate-500 font-medium">Search, moderate, and upgrade member tiers across Maharashtra.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#0A3D91]"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px]">
                <th className="p-4">Member Name</th>
                <th className="p-4">Contact & District</th>
                <th className="p-4">Membership Plan</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4">
                    <div className="font-black text-slate-900">{u.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{u.email}</div>
                  </td>
                  <td className="p-4">
                    <div>{u.mobile}</div>
                    <div className="text-[11px] text-slate-500">{u.district || 'Chhatrapati Sambhajinagar'}</div>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-[#0A3D91] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                      {u.membership?.plan || 'Basic Membership'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                      u.membership?.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {u.membership?.status || 'Pending'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleApproveMembership(u._id, 'Business Membership')}
                      className="px-3 py-1.5 bg-[#F57C00] text-white font-bold rounded-lg shadow-xs hover:bg-[#e06f00] transition"
                      title="Upgrade to Business Membership"
                    >
                      Approve Business
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="p-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition inline-flex items-center"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && !loading && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400">No user accounts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}