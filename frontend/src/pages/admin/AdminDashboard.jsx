import React, { useState, useEffect } from 'react';
import {
  Users,
  ShieldCheck,
  IndianRupee,
  Calendar,
  Clock,
  UserPlus,
  Search,
  Lock,
  CheckCircle,
  Trash2,
  Edit,
  Sparkles,
} from 'lucide-react';
import {
  getAdminStats,
  getAllUsers,
  createAdminUser,
  toggleBlockUser,
  approveMembership,
  deleteUser,
} from '../../services/adminService';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeMembers: 0,
    totalRevenue: 0,
    totalEvents: 0,
    pendingRequests: 0,
  });
  const [charts, setCharts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for Add User Modal
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    mobile: '',
    companyName: '',
    role: 'user',
  });

  useEffect(() => {
    fetchData();
  }, [search, statusFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes] = await Promise.all([
        getAdminStats(),
        getAllUsers(search, statusFilter),
      ]);

      if (statsRes.success) {
        setStats(statsRes.stats);
        setCharts(statsRes.charts.membershipGrowth);
      }
      if (usersRes.success) setUsers(usersRes.data);
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await createAdminUser(newUser);
      if (res.success) {
        setShowAddModal(false);
        setNewUser({ name: '', email: '', mobile: '', companyName: '', role: 'user' });
        fetchData();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create user');
    }
  };

  const handleToggleBlock = async (id) => {
    try {
      const res = await toggleBlockUser(id);
      if (res.success) fetchData();
    } catch (err) {
      alert('Action failed');
    }
  };

  const handleApproveMembership = async (id) => {
    const plan = prompt('Enter Plan Name (e.g., Premium Membership, Corporate Membership):', 'Premium Membership');
    if (!plan) return;

    try {
      const res = await approveMembership(id, plan);
      if (res.success) {
        alert(res.message);
        fetchData();
      }
    } catch (err) {
      alert('Membership approval failed');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this user?')) {
      try {
        const res = await deleteUser(id);
        if (res.success) fetchData();
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-8 space-y-8 font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            Control Center
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2">BEGAINDIA Admin Dashboard</h1>
          <p className="text-slate-400 text-xs mt-1">Platform metrics, user management engine, and membership approvals.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4 text-orange-400" /> Add New User
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-blue-400">
            <span className="text-xs font-semibold text-slate-400">Total Users</span>
            <Users className="w-5 h-5" />
          </div>
          <p className="text-2xl font-extrabold text-white">{stats.totalUsers}</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-semibold text-slate-400">Active Members</span>
            <ShieldCheck className="w-5 h-5" />
          </div>
          <p className="text-2xl font-extrabold text-white">{stats.activeMembers}</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-semibold text-slate-400">Total Revenue</span>
            <IndianRupee className="w-5 h-5" />
          </div>
          <p className="text-2xl font-extrabold text-white">₹{stats.totalRevenue.toLocaleString('en-IN')}</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-indigo-400">
            <span className="text-xs font-semibold text-slate-400">Active Events</span>
            <Calendar className="w-5 h-5" />
          </div>
          <p className="text-2xl font-extrabold text-white">{stats.totalEvents}</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-rose-400">
            <span className="text-xs font-semibold text-slate-400">Pending Requests</span>
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-2xl font-extrabold text-white">{stats.pendingRequests}</p>
        </div>
      </div>

      {/* User Management Section */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-500" />
            User Management Engine
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search name, email, company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-orange-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-orange-500"
            >
              <option value="">All Users</option>
              <option value="Active">Active Members</option>
              <option value="Blocked">Blocked Users</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">User Details</th>
                <th className="p-3">Company</th>
                <th className="p-3">Membership Plan</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3">
                    <p className="font-bold text-white">{u.name}</p>
                    <p className="text-[11px] text-slate-400">{u.email} • {u.mobile || 'No Mobile'}</p>
                  </td>
                  <td className="p-3 font-medium text-slate-300">{u.companyName || 'N/A'}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 bg-blue-950 text-blue-300 border border-blue-800 rounded-full font-semibold text-[11px]">
                      {u.membership?.plan || 'Free Account'}
                    </span>
                  </td>
                  <td className="p-3">
                    {u.isBlocked ? (
                      <span className="px-2.5 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-full font-bold text-[10px]">
                        Blocked
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-full font-bold text-[10px]">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleApproveMembership(u._id)}
                      className="p-1.5 bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-slate-950 rounded-lg transition"
                      title="Approve / Upgrade Membership"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleToggleBlock(u._id)}
                      className={`p-1.5 rounded-lg transition ${
                        u.isBlocked
                          ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950'
                          : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-slate-950'
                      }`}
                      title={u.isBlocked ? 'Unblock User' : 'Block User'}
                    >
                      <Lock className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="p-1.5 bg-slate-800 text-slate-400 hover:bg-rose-600 hover:text-white rounded-lg transition"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add User */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Add New User (Admin Override)</h3>

            <form onSubmit={handleAddUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={newUser.mobile}
                  onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Company Name</label>
                <input
                  type="text"
                  value={newUser.companyName}
                  onChange={(e) => setNewUser({ ...newUser, companyName: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-orange-500"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-orange-500 hover:bg-orange-600 text-slate-950 font-extrabold rounded-xl"
                >
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}