// src/pages/admin/AdminApprovalDashboard.jsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../services/apiClient';
import { Building2, CheckCircle2, XCircle, MapPin, FileText, AlertCircle, Loader2, Globe } from 'lucide-react';

export default function AdminApprovalDashboard() {
  const queryClient = useQueryClient();
  const [actionError, setActionError] = useState('');

  // Fetch Pending Businesses
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['pendingBusinesses'],
    queryFn: async () => {
      const response = await apiClient.get('/admin/pending-businesses');
      return response.data || [];
    },
  });

  // Mutation for Approving/Rejecting Business
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return await apiClient.put(`/admin/approve-business/${id}`, { status });
    },
    onSuccess: () => {
      // Invalidate query to auto-refetch list after approval
      queryClient.invalidateQueries({ queryKey: ['pendingBusinesses'] });
      setActionError('');
    },
    onError: (err) => {
      setActionError(err.message || 'Failed to update business status');
    },
  });

  const handleStatusUpdate = (id, status) => {
    if (window.confirm(`Are you sure you want to mark this business as ${status}?`)) {
      statusMutation.mutate({ id, status });
    }
  };

  const pendingList = data || [];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Directory Moderation Desk</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Review and approve pending company profiles submitted by registered members.
            </p>
          </div>
          <div className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-xl text-xs font-bold border border-amber-200 self-start sm:self-auto">
            {pendingList.length} Approvals Pending
          </div>
        </div>

        {actionError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-600">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{actionError}</span>
          </div>
        )}

        {/* Content View */}
        {isLoading ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
            <p className="text-xs font-semibold text-slate-500">Loading pending applications...</p>
          </div>
        ) : isError ? (
          <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
            <p className="text-xs font-semibold text-red-600">{error?.message || 'Access denied or server error'}</p>
          </div>
        ) : pendingList.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">Queue is Clear!</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              There are no pending business profiles waiting for approval at this moment.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingList.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-slate-300 transition"
              >
                {/* Left Section: Company Info */}
                <div className="flex items-start gap-4 space-y-1">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                    {item.logo ? (
                      <img
                        src={`http://localhost:5000${item.logo}`}
                        alt={item.companyName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building2 className="w-8 h-8 text-slate-400" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{item.companyName}</h3>
                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-semibold rounded-md border border-indigo-100">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {item.city}, {item.state}
                      </span>
                      {item.gstNumber && (
                        <span className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                          GST: {item.gstNumber}
                        </span>
                      )}
                      {item.website && (
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-indigo-600 hover:underline"
                        >
                          <Globe className="w-3.5 h-3.5" /> Website
                        </a>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 max-w-xl pt-1 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="text-[11px] text-slate-400 pt-1">
                      Submitted by: <strong className="text-slate-700">{item.userId?.name}</strong> ({item.userId?.email} | {item.userId?.mobile})
                    </div>
                  </div>
                </div>

                {/* Right Section: Actions */}
                <div className="flex items-center gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <button
                    onClick={() => handleStatusUpdate(item._id, 'REJECTED')}
                    disabled={statusMutation.isPending}
                    className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border border-red-200/60 disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>

                  <button
                    onClick={() => handleStatusUpdate(item._id, 'APPROVED')}
                    disabled={statusMutation.isPending}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-sm disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve Listing
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}