import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, Download, Printer, Building2, MapPin, CheckCircle2 } from 'lucide-react';

export default function DigitalIDCard({ memberData }) {
  const cardRef = useRef(null);

  const verificationUrl = `${window.location.origin}/verify/${memberData?.applicationNumber || 'BEGA-2026-000000'}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      {/* The Printable/Exportable Digital Card Canvas */}
      <div
        ref={cardRef}
        className="relative bg-gradient-to-br from-[#0A3D91] via-slate-900 to-[#0A3D91] text-white rounded-3xl p-6 shadow-2xl border-2 border-amber-400/40 overflow-hidden font-sans"
      >
        {/* Holographic Accent Pattern */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#F57C00]/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

        {/* Card Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#0A3D91] to-[#F57C00] rounded-xl flex items-center justify-center font-extrabold text-white text-lg shadow border border-white/30">
              B
            </div>
            <div>
              <h3 className="text-sm font-extrabold tracking-tight text-white leading-tight">BEGA INDIA</h3>
              <p className="text-[9px] font-bold text-amber-300 uppercase tracking-widest leading-none">
                व्यवसाय सक्षमीकरण व विकास संघटना
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-extrabold rounded-full uppercase flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Verified
          </span>
        </div>

        {/* Member Profile Body */}
        <div className="relative z-10 py-5 flex items-center gap-5">
          {/* Member Photo / Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#F57C00] to-amber-500 text-white flex items-center justify-center font-black text-2xl uppercase shadow-md border-2 border-white/40">
              {memberData?.name?.charAt(0) || 'M'}
            </div>
            <span className="absolute -bottom-2 -right-1 bg-amber-400 text-slate-950 text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase">
              ID
            </span>
          </div>

          {/* Member Details */}
          <div className="space-y-1 overflow-hidden">
            <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {memberData?.membershipPlan || 'Business Member'}
            </p>
            <h4 className="text-base font-extrabold text-white truncate">
              {memberData?.name || 'Member Name'}
            </h4>
            <p className="text-xs text-amber-300 font-semibold flex items-center gap-1 truncate">
              <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              {memberData?.companyName || 'Registered Enterprise'}
            </p>
            <p className="text-[11px] text-slate-300 flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              {memberData?.taluka}, {memberData?.district}
            </p>
          </div>
        </div>

        {/* Card Footer with Verified QR Code */}
        <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-2xl p-3 flex items-center justify-between border border-white/10">
          <div className="space-y-0.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Application / Member ID</span>
            <p className="text-xs font-mono font-extrabold text-amber-400 tracking-wider">
              {memberData?.applicationNumber || 'BEGA-2026-XXXXXX'}
            </p>
            <p className="text-[8px] text-slate-400 font-medium">Valid Till: August 2027</p>
          </div>

          {/* QR Code */}
          <div className="bg-white p-1.5 rounded-xl shadow-md shrink-0">
            <QRCodeSVG value={verificationUrl} size={54} level="M" />
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handlePrint}
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl border border-slate-700 shadow transition flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4 text-amber-400" /> Print Digital ID
        </button>
      </div>
    </div>
  );
}