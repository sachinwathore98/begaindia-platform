import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 font-sans border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0A3D91] rounded-xl flex items-center justify-center font-black text-white text-base">
                B
              </div>
              <div>
                <h3 className="text-base font-black text-white">BEGA INDIA</h3>
                <p className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                  Business Empowerment & Growth Association
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              A professional, development-oriented association connecting business growth, legal protection, B2B matchmaking, and grassroots social transformation.
            </p>

            <div className="text-xs font-black text-amber-400 tracking-widest uppercase pt-2">
              Growth • Trust • Success
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition">About BEGA</Link></li>
              <li><Link to="/objectives" className="hover:text-white transition">28 Core Objectives</Link></li>
              <li><Link to="/membership" className="hover:text-white transition">Membership Plans</Link></li>
              <li><Link to="/directory" className="hover:text-white transition">Business Directory</Link></li>
              <li><Link to="/support" className="hover:text-white transition">Business Support Cell</Link></li>
              <li><Link to="/awards" className="hover:text-white transition">Annual Business Awards</Link></li>
            </ul>
          </div>

          {/* Programs & Wings */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Programs & Wings</h4>
            <ul className="space-y-2">
              <li><Link to="/seva" className="hover:text-white transition">BEGA Seva (Social Wing)</Link></li>
              <li><Link to="/seva" className="hover:text-white transition">One Month – One Village</Link></li>
              <li><Link to="/expo" className="hover:text-white transition">BEGA Business Expo</Link></li>
              <li><Link to="/expo" className="hover:text-white transition">BEGA Mahaadhiveshan</Link></li>
              <li><Link to="/schemes" className="hover:text-white transition">Government Scheme Portal</Link></li>
              <li><Link to="/sponsorship" className="hover:text-white transition">Corporate CSR & Village Desk</Link></li>
            </ul>
          </div>

          {/* Governance & Contact */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Contact & Legal</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F57C00] shrink-0 mt-0.5" />
                <span>Khinvasara August Highstreet, Ulkanagri, Chhatrapati Sambhajinagar</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0A3D91] shrink-0" />
                <span>secretariat@begaindia.org</span>
              </li>
              <li><Link to="/policies" className="hover:text-white transition">Privacy Policy & Terms</Link></li>
              <li><Link to="/policies" className="hover:text-white transition">Code of Conduct & Ethics</Link></li>
              <li><Link to="/policies" className="hover:text-white transition">Grievance & Redressal Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>&copy; {new Date().getFullYear()} BEGA INDIA. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="/policies" className="hover:text-slate-300">Constitution</Link>
            <Link to="/policies" className="hover:text-slate-300">Disclaimer</Link>
            <Link to="/contact" className="hover:text-slate-300">Support Desk</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}