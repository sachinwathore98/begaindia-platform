// frontend/src/components/member/MemberIdCard.jsx
import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Printer, ShieldCheck, MapPin, Building2, Award } from 'lucide-react';

export default function MemberIdCard({ user }) {
  const cardRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const planName = user?.membership?.plan || 'BEGA Basic Membership';
  const appNumber = user?.applicationNumber || 'BEGA-2026-000000';
  const memberName = user?.name || 'Authorized Member';
  const companyName = user?.companyName || 'Registered Enterprise';
  const district = user?.district || 'Chhatrapati Sambhajinagar';
  const verifyUrl = `https://begaindia-platform.vercel.app/verify/${appNumber}`;

  return (
    <div className="space-y-4">
      {/* Printable ID Card Container */}
      <div
        ref={cardRef}
        className="w-full max-w-sm mx-auto bg-gradient-to-br from-slate-950 via-[#0A3D91] to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-amber-400/50 relative overflow-hidden space-y-5 print:border print:shadow-none print:m-0"
      >
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#F57C00]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Branding Strip */}
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#F57C00] to-amber-400 rounded-xl flex items-center justify-center font-black text-slate-950 text-lg shadow">
              B
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-white">BEGA INDIA</h3>
              <p className="text-[9px] text-amber-300 font-bold uppercase tracking-wider">
                Section 8 Registered
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-black rounded-full border border-emerald-400/30">
            ACTIVE
          </span>
        </div>

        {/* Member Details */}
        <div className="space-y-1">
          <span className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider">
            Verified Member
          </span>
          <h4 className="text-lg font-black text-white">{memberName}</h4>
          <p className="text-xs font-bold text-amber-300">{companyName}</p>
          <p className="text-[10px] text-slate-300 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#F57C00]" /> {district}, Maharashtra
          </p>
        </div>

        {/* ID Number & QR Block */}
        <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex justify-between items-center gap-3">
          <div className="space-y-1 text-[10px]">
            <div>
              <span className="text-slate-400 block font-bold text-[8px] uppercase">
                Member ID
              </span>
              <span className="font-mono font-bold text-amber-300 text-xs">
                {appNumber}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-bold text-[8px] uppercase">
                Tier Plan
              </span>
              <span className="font-bold text-white leading-tight block">
                {planName}
              </span>
            </div>
          </div>
          <div className="bg-white p-1.5 rounded-xl shadow shrink-0">
            <QRCodeSVG value={verifyUrl} size={60} />
          </div>
        </div>

        {/* Footer Motto */}
        <div className="pt-2 border-t border-white/10 text-center">
          <p className="text-[9px] text-slate-300 uppercase font-bold tracking-widest">
            GROWTH • TRUST • SUCCESS
          </p>
        </div>
      </div>

      {/* Print Action Trigger */}
      <div className="text-center print:hidden">
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-[#F57C00] text-white text-xs font-black rounded-xl shadow transition"
        >
          <Printer className="w-4 h-4" /> Print / Download ID Badge
        </button>
      </div>
    </div>
  );
}