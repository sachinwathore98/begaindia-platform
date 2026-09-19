// frontend/src/pages/public/Policies.jsx
import React from 'react';
import { ShieldAlert, FileText, Scale, Lock, AlertTriangle } from 'lucide-react';

export default function Policies() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-12 px-4 sm:px-8 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-2">
        <span className="px-3.5 py-1 bg-blue-50 border border-blue-200 text-[#0A3D91] text-xs font-black rounded-full uppercase tracking-wider">
          Legal & Governance Framework
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          BEGA India Terms & Conditions and Discipline Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Operating rules, member obligations, and statutory identity safeguards for Business Empowerment and Growth Association India.
        </p>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-xs text-slate-700 leading-relaxed font-medium">
        
        {/* Prior Permission Clause */}
        <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-rose-700 font-black text-sm uppercase">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            Prior Permission for Protests / Public Activities
          </div>
          <p className="text-rose-900">
            Any protest, hunger strike (fast), morcha, rally, demonstration, or similar public activity proposed to be conducted in the name of BEGA India or using its identity, name, logo, documents, or representation shall require prior written permission from the authorized authority of the Association. No member shall independently organize or represent such activity on behalf of BEGA India without approval.
          </p>
        </div>

        {/* Misuse of Identity Clause */}
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-amber-800 font-black text-sm uppercase">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            Misuse of Association Documents & Identity
          </div>
          <p className="text-amber-950">
            Any unauthorized use, misuse, alteration, duplication, circulation, or representation of BEGA India's official documents, letterheads, certificates, identity cards, logo, seal, or other organizational materials may result in appropriate disciplinary and/or legal action as applicable under the organization's rules and applicable law.
          </p>
        </div>

        {/* Core Terms */}
        <div className="space-y-4 pt-2">
          <h3 className="text-base font-black text-slate-900 uppercase tracking-wide">
            General Membership Terms & Service Disclaimers
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>Membership is subject to BEGA India rules, policies, and Section 8 constitutional objectives.</li>
            <li><strong>Membership fee is not a position fee:</strong> Membership does not automatically guarantee an organizational executive position.</li>
            <li>BEGA membership does not guarantee business revenue, employment, loans, subsidies, or government financial sanctions.</li>
            <li>Government schemes, certifications, and subsidies remain subject to the independent evaluation and approval of the competent government authority.</li>
            <li>Members must provide accurate and verifiable KYC and business documentation during enrollment.</li>
            <li>Member-to-member commercial transactions and B2B contracts remain the exclusive legal responsibility of the concerned commercial parties.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}