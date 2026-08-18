import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  MapPin,
  HeartHandshake,
  ArrowRight,
  Globe,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 font-sans border-t border-slate-800">
      
      {/* Top Banner Callout */}
      <div className="bg-[#0A3D91] text-white py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold tracking-tight">
              Join Maharashtra’s Premier Business & Social Movement
            </h3>
            <p className="text-xs text-blue-100 font-medium">
              An Association for Business. A Platform for People. A Movement for Social Development.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/join"
              className="px-5 py-2.5 bg-[#F57C00] hover:bg-[#e06f00] text-white font-extrabold text-xs rounded-xl shadow transition"
            >
              APPLY MEMBERSHIP
            </Link>
            <Link
              to="/support"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition"
            >
              REGISTER ISSUE
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
        
        {/* Col 1: Identity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#0A3D91] to-[#F57C00] rounded-xl flex items-center justify-center text-white font-black text-lg shadow">
              B
            </div>
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">BEGA INDIA</h2>
              <p className="text-[10px] text-[#F57C00] font-bold">व्यवसाय सक्षमीकरण व विकास संघटना</p>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed text-[11px] max-w-sm">
            Maharashtra’s comprehensive ecosystem for entrepreneurship protection, B2B market expansion, MSME policy guidance, and rural social transformation.
          </p>

          <div className="space-y-1 text-[11px] text-slate-400">
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#F57C00] shrink-0" />
              <span>Khinvasara August Highstreet, Ulkanagri, Ch. Sambhajinagar, MH - 431005</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#0A3D91] shrink-0" />
              <span>support@begaindia.org | contact@begaindia.org</span>
            </p>
          </div>
        </div>

        {/* Col 2: Core Wings */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-white uppercase tracking-widest text-[#F57C00]">
            Core Wings
          </h3>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/about" className="hover:text-white transition">About BEGA India</Link></li>
            <li><Link to="/membership" className="hover:text-white transition">Membership Tiers</Link></li>
            <li><Link to="/directory" className="hover:text-white transition">Business Directory</Link></li>
            <li><Link to="/support" className="hover:text-white transition">Grievance & BSR Cell</Link></li>
            <li><Link to="/seva" className="hover:text-white transition text-emerald-400 font-semibold">BEGA Seva (Social Wing)</Link></li>
          </ul>
        </div>

        {/* Col 3: Events & Knowledge */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-white uppercase tracking-widest text-[#F57C00]">
            Knowledge & Events
          </h3>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/events" className="hover:text-white transition">Upcoming Events & Meets</Link></li>
            <li><Link to="/expo" className="hover:text-white transition">BEGA Business Expo</Link></li>
            <li><Link to="/mahaadhiveshan" className="hover:text-white transition">Mahaadhiveshan</Link></li>
            <li><Link to="/schemes" className="hover:text-white transition">Government MSME Schemes</Link></li>
            <li><Link to="/knowledge" className="hover:text-white transition">Compliance Guides</Link></li>
          </ul>
        </div>

        {/* Col 4: Governance & Policies */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-white uppercase tracking-widest text-[#F57C00]">
            Governance & Legal
          </h3>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/leadership" className="hover:text-white transition">Leadership & Councils</Link></li>
            <li><Link to="/policies" className="hover:text-white transition">Terms & Conditions</Link></li>
            <li><Link to="/policies" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="/policies" className="hover:text-white transition">Code of Conduct</Link></li>
            <li><Link to="/policies" className="hover:text-white transition">Refund & Fee Policy</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal Stripe */}
      <div className="border-t border-slate-900 bg-black/40 py-4 px-4 sm:px-8 text-center text-[10px] text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {new Date().getFullYear()} BEGA INDIA (व्यवसाय सक्षमीकरण व विकास संघटना). All Rights Reserved.</p>
          <p className="text-slate-400">Tagline: Growth • Trust • Success</p>
        </div>
      </div>

    </footer>
  );
}