import React from 'react';
import { CheckCircle2, Clock, UserCheck, ShieldAlert, CheckCircle } from 'lucide-react';

const STAGES = [
  { id: 'Submitted', label: '1. Submitted', icon: Clock },
  { id: 'Under Review', label: '2. Under Review', icon: ShieldAlert },
  { id: 'Assigned', label: '3. Assigned', icon: UserCheck },
  { id: 'Action / Guidance', label: '4. Action / Guidance', icon: CheckCircle2 },
  { id: 'Closed', label: '5. Closed', icon: CheckCircle },
];

export default function TicketStatusStepper({ currentStatus }) {
  const currentIndex = STAGES.findIndex((s) => s.id === currentStatus);
  const activeIndex = currentIndex !== -1 ? currentIndex : 0;

  return (
    <div className="py-4">
      <div className="flex items-center justify-between relative">
        {/* Background Track Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full -z-0"></div>
        {/* Active Progress Track */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#0A3D91] transition-all duration-500 -z-0"
          style={{ width: `${(activeIndex / (STAGES.length - 1)) * 100}%` }}
        ></div>

        {STAGES.map((stage, idx) => {
          const isPassed = idx <= activeIndex;
          const isCurrent = idx === activeIndex;
          const Icon = stage.icon;

          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  isCurrent
                    ? 'bg-[#F57C00] text-white ring-4 ring-orange-100 shadow-md scale-110'
                    : isPassed
                    ? 'bg-[#0A3D91] text-white shadow-sm'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`text-[10px] font-bold text-center tracking-tight hidden sm:block ${
                  isPassed ? 'text-[#0A3D91]' : 'text-slate-400'
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}