import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  ShieldCheck,
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';

export default function VerifyMember() {
  const { applicationNumber } = useParams();
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (applicationNumber) {
      verifyMembershipRecord(applicationNumber);
    }
  }, [applicationNumber]);

  const verifyMembershipRecord = async (appNo) => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get(`${API_URL}/api/membership/verify/${appNo.trim()}`);
      if (res.data?.success && res.data.member) {
        setMember(res.data.member);
      } else {
        setError('Membership validation record could not be confirmed.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Invalid or unrecognized BEGA India Membership ID. Please check the Application Number.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A3D91] mx-auto"></div>
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Verifying Digital ID Record...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8 font-sans flex items-center justify-center">
      <div className="max-w-xl w-full space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 bg-gradient-to-tr from-[#0A3D91] to-[#F57C00] rounded-2xl flex items-center justify-center font-extrabold text-white text-xl mx-auto shadow-md">
            B
          </div>
          <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
            BEGA INDIA
          </h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Digital Identity & Credibility Verification Desk
          </p>
        </div>

        {error ? (
          /* Error / Invalid ID State */
          <div className="bg-white p-8 rounded-3xl border border-rose-200 shadow-xl space-y-6 text-center animate-in fade-in">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <XCircle className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900">
                Unverified / Invalid Membership ID
              </h2>
              <p className="text-xs text-slate-500">
                Application Number: <span className="font-mono font-bold text-slate-700">{applicationNumber}</span>
              </p>
            </div>

            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 text-xs text-rose-800 leading-relaxed">
              {error}
            </div>

            <div className="pt-2">
              <Link
                to="/join"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-bold rounded-xl shadow transition"
              >
                Apply for Official Membership <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Verified Member Card Display */
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-6 animate-in fade-in relative overflow-hidden">
            
            {/* Top Verification Status Badge */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wide">
                    Verified Active Member
                  </h3>
                  <p className="text-[11px] font-semibold text-emerald-700">
                    Official Record Confirmed by BEGA India
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-extrabold rounded-full uppercase tracking-wider shadow-sm">
                Status: {member?.membershipStatus || 'Active'}
              </span>
            </div>

            {/* Member Profile Breakdown */}
            <div className="space-y-4 pt-2">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Member Full Name
                </span>
                <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
                  {member?.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Application / Member ID
                  </span>
                  <p className="font-mono font-extrabold text-[#0A3D91]">
                    {member?.applicationNumber}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Membership Tier
                  </span>
                  <p className="font-bold text-slate-800 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#F57C00]" />
                    {member?.membershipPlan}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Registered Enterprise
                  </span>
                  <p className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-4 h-4 text-[#0A3D91]" />
                    {member?.companyName}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#F57C00] shrink-0" />
                    <span>{member?.taluka}, {member?.district}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#0A3D91] shrink-0" />
                    <span>Valid Till: {member?.validTill ? new Date(member.validTill).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'August 2027'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Credibility Statement */}
            <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-2xl text-[11px] text-slate-600 space-y-1">
              <p className="font-bold text-[#0A3D91] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Organizational Discipline & Compliance:
              </p>
              <p className="leading-relaxed">
                This member is registered under the Business Empowerment and Growth Association (BEGA India) and is governed by organizational standards.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/directory"
                className="w-full sm:w-1/2 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold text-center rounded-xl transition"
              >
                Search Directory
              </Link>
              <Link
                to="/support"
                className="w-full sm:w-1/2 py-2.5 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-bold text-center rounded-xl transition"
              >
                Business Support Desk
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}