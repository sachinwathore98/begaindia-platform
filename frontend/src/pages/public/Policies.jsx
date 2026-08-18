import React, { useState } from 'react';
import { POLICY_SECTIONS } from '../../data/policyData';
import {
  ShieldCheck,
  FileText,
  Lock,
  Scale,
  RefreshCw,
  Clock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TABS = [
  { id: 'terms', label: 'Terms & Conditions', icon: FileText },
  { id: 'privacy', label: 'Privacy Policy', icon: Lock },
  { id: 'codeOfConduct', label: 'Code of Conduct', icon: Scale },
  { id: 'refundPolicy', label: 'Refund Policy', icon: RefreshCw },
];

export default function Policies() {
  const [activeTab, setActiveTab] = useState('terms');
  const policy = POLICY_SECTIONS[activeTab];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 bg-blue-100 text-[#0A3D91] text-xs font-extrabold rounded-full uppercase tracking-wider">
            Institutional Governance & Compliance
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Association Policies & Rules
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Read our governing framework, privacy guarantees, ethical code of conduct, and terms of service.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center">
          <div className="bg-slate-200/80 p-1.5 rounded-2xl flex flex-wrap gap-1.5 shadow-inner">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-[#0A3D91] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8 animate-in fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold text-[#F57C00] uppercase tracking-wider">
                {policy.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                {policy.title}
              </h2>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>Effective: {policy.lastUpdated}</span>
            </div>
          </div>

          <div className="space-y-6">
            {policy.content.map((sec, idx) => (
              <div key={idx} className="space-y-2 text-xs">
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0A3D91] shrink-0" />
                  {sec.heading}
                </h3>
                <p className="text-slate-600 leading-relaxed pl-6">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span>Questions regarding institutional compliance or bylaws?</span>
            <Link
              to="/contact"
              className="px-4 py-2 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0"
            >
              Contact Legal Secretariat <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}