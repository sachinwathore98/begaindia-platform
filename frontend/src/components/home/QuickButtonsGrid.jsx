import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  UserPlus, 
  CreditCard, 
  Building2, 
  LifeBuoy, 
  AlertTriangle, 
  HeartHandshake, 
  Store, 
  Landmark, 
  Calendar, 
  GraduationCap, 
  Award 
} from 'lucide-react';

const buttonsConfig = [
  { key: 'joinBega', label: 'JOIN BEGA', path: '/join', icon: UserPlus, color: 'from-[#0A3D91] to-blue-800 text-white border-blue-900' },
  { key: 'membership', label: 'MEMBERSHIP', path: '/membership', icon: CreditCard, color: 'from-slate-900 to-slate-800 text-white border-slate-950' },
  { key: 'directory', label: 'BUSINESS DIRECTORY', path: '/directory', icon: Building2, color: 'from-[#F57C00] to-orange-700 text-white border-orange-800' },
  { key: 'businessSupport', label: 'BUSINESS SUPPORT', path: '/support', icon: LifeBuoy, color: 'from-blue-700 to-blue-900 text-white border-blue-800' },
  { key: 'registerIssue', label: 'REGISTER BUSINESS ISSUE', path: '/support#issue', icon: AlertTriangle, color: 'from-rose-600 to-rose-800 text-white border-rose-900' },
  { key: 'begaSeva', label: 'BEGA SEVA', path: '/seva', icon: HeartHandshake, color: 'from-emerald-700 to-emerald-900 text-white border-emerald-800' },
  { key: 'begaExpo', label: 'BEGA EXPO', path: '/expo', icon: Store, color: 'from-amber-600 to-amber-800 text-white border-amber-900' },
  { key: 'mahaadhiveshan', label: 'BEGA MAHAADHIVESHAN', path: '/mahaadhiveshan', icon: Landmark, color: 'from-indigo-800 to-indigo-950 text-white border-indigo-950' },
  { key: 'events', label: 'EVENTS', path: '/events', icon: Calendar, color: 'from-cyan-700 to-cyan-900 text-white border-cyan-800' },
  { key: 'training', label: 'TRAINING', path: '/training', icon: GraduationCap, color: 'from-violet-700 to-violet-950 text-white border-violet-900' },
  { key: 'awards', label: 'AWARDS', path: '/awards', icon: Award, color: 'from-yellow-600 to-amber-700 text-white border-amber-800' },
];

export default function QuickButtonsGrid() {
  const { t } = useLanguage();

  return (
    <section className="bg-slate-50 py-10 px-4 sm:px-8 border-y border-slate-200">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-[#0A3D91]">
              Quick Access Hub
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Direct access to all major BEGA India digital wings and support modules[cite: 7, 8].
            </p>
          </div>
        </div>

        {/* 11 Buttons Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {buttonsConfig.map((btn) => {
            const Icon = btn.icon;
            return (
              <Link
                key={btn.key}
                to={btn.path}
                className={`p-3.5 rounded-2xl bg-gradient-to-br ${btn.color} border shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center text-center gap-2 group hover:-translate-y-0.5 active:translate-y-0`}
              >
                <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="text-[11px] font-extrabold leading-tight tracking-wide">
                  {btn.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}