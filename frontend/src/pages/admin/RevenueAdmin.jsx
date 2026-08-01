import React, { useState, useEffect } from 'react';
import {
  IndianRupee,
  TrendingUp,
  Download,
  CreditCard,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  PieChart,
} from 'lucide-react';
import { getRevenueStats, getAdminTransactions } from '../../services/adminService';

export default function RevenueAdmin() {
  const [stats, setStats] = useState({
    grossRevenue: 0,
    totalTransactions: 0,
    successfulCount: 0,
    failedCount: 0,
    averageOrderValue: 0,
  });
  const [tierBreakdown, setTierBreakdown] = useState({ basic: 0, premium: 0, corporate: 0 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [planFilter, setPlanFilter] = useState('');

  useEffect(() => {
    fetchFinancials();
  }, [search, statusFilter, planFilter]);

  const fetchFinancials = async () => {
    try {
      setLoading(true);
      const [statsRes, txRes] = await Promise.all([
        getRevenueStats(),
        getAdminTransactions(search, statusFilter, planFilter),
      ]);

      if (statsRes.success) {
        setStats(statsRes.stats);
        setTierBreakdown(statsRes.tierBreakdown);
      }
      if (txRes.success) setTransactions(txRes.data);
    } catch (err) {
      console.error('Failed to load revenue data:', err);
    } finally {
      setLoading(false);
    }
  };

  // CSV Report Generator Engine
  const exportToCSV = () => {
    if (transactions.length === 0) {
      alert('No transaction records available to export.');
      return;
    }

    const headers = ['Transaction ID', 'Order ID', 'Member Name', 'Email', 'Plan Tier', 'Amount (INR)', 'Payment Status', 'Payment Method', 'Date'];

    const rows = transactions.map((t) => [
      t.id,
      t.orderId,
      `"${t.userName}"`,
      t.email,
      `"${t.planName}"`,
      t.amount,
      t.paymentStatus,
      t.paymentMethod,
      t.date,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    // Create Download Link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `BEGAINDIA_Revenue_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (loading && transactions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-950 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-8 space-y-8 font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Financial Audit
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2">Revenue Analytics & Transaction Ledger</h1>
          <p className="text-slate-400 text-xs mt-1">Track membership subscription payments, tier revenues, and export CSV audit reports.</p>
        </div>

        <button
          onClick={exportToCSV}
          className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <Download className="w-4 h-4 text-amber-300" /> Export CSV Financial Report
        </button>
      </div>

      {/* Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-semibold text-slate-400">Gross Revenue</span>
            <IndianRupee className="w-5 h-5" />
          </div>
          <p className="text-3xl font-extrabold text-white">₹{stats.grossRevenue.toLocaleString('en-IN')}</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-blue-400">
            <span className="text-xs font-semibold text-slate-400">Avg. Order Value (AOV)</span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-3xl font-extrabold text-white">₹{stats.averageOrderValue.toLocaleString('en-IN')}</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-semibold text-slate-400">Successful Captured Payments</span>
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-3xl font-extrabold text-white">{stats.successfulCount} <span className="text-xs text-slate-500 font-medium">/ {stats.totalTransactions} Total</span></p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-rose-400">
            <span className="text-xs font-semibold text-slate-400">Failed Transactions</span>
            <XCircle className="w-5 h-5" />
          </div>
          <p className="text-3xl font-extrabold text-white">{stats.failedCount}</p>
        </div>
      </div>

      {/* Revenue Breakdown by Tier */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <PieChart className="w-5 h-5 text-amber-400" />
          Membership Tier Revenue Breakdown
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between font-semibold text-slate-400">
              <span>Basic Tier (₹999)</span>
              <span className="text-white font-bold">₹{tierBreakdown.basic.toLocaleString('en-IN')}</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-slate-400 h-full"
                style={{ width: `${stats.grossRevenue ? (tierBreakdown.basic / stats.grossRevenue) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between font-semibold text-slate-400">
              <span>Premium Tier (₹2,999)</span>
              <span className="text-amber-400 font-bold">₹{tierBreakdown.premium.toLocaleString('en-IN')}</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full"
                style={{ width: `${stats.grossRevenue ? (tierBreakdown.premium / stats.grossRevenue) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between font-semibold text-slate-400">
              <span>Corporate Tier (₹9,999)</span>
              <span className="text-emerald-400 font-bold">₹{tierBreakdown.corporate.toLocaleString('en-IN')}</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full"
                style={{ width: `${stats.grossRevenue ? (tierBreakdown.corporate / stats.grossRevenue) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Ledger Table */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-amber-500" />
            Transaction Ledger
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search transaction ID or member..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            >
              <option value="">All Statuses</option>
              <option value="Captured">Captured / Success</option>
              <option value="Failed">Failed</option>
            </select>

            {/* Plan Filter */}
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            >
              <option value="">All Tiers</option>
              <option value="Basic">Basic Tier</option>
              <option value="Premium">Premium Tier</option>
              <option value="Corporate">Corporate Tier</option>
            </select>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Tx ID / Order</th>
                <th className="p-3">Member Details</th>
                <th className="p-3">Plan Purchased</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3">
                    <p className="font-mono font-bold text-white">{t.id}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{t.orderId}</p>
                  </td>
                  <td className="p-3">
                    <p className="font-bold text-white">{t.userName}</p>
                    <p className="text-[11px] text-slate-400">{t.email}</p>
                  </td>
                  <td className="p-3 font-medium text-slate-300">{t.planName}</td>
                  <td className="p-3 font-extrabold text-white">₹{t.amount.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-slate-400">{t.paymentMethod}</td>
                  <td className="p-3 text-slate-400">{t.date}</td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        t.paymentStatus === 'Captured'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}
                    >
                      {t.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}