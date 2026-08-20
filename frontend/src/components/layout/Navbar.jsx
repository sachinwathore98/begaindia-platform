import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  User,
  ShieldCheck,
  Building2,
  Calendar,
  Store,
  HeartHandshake,
  LifeBuoy,
  FileText,
  Sparkles,
  Award,
  BookOpen,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 font-sans shadow-2xl">
      {/* 1. TOP LIVE NOTIFICATION MARQUEE STRIP */}
      <div className="bg-[#072d6b] text-white py-1.5 px-4 sm:px-8 text-xs font-bold flex justify-between items-center border-b border-blue-900/50">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="px-2 py-0.5 bg-[#F57C00] text-slate-950 font-black text-[10px] rounded uppercase tracking-wider shrink-0 animate-pulse">
            State Notice
          </span>
          <span className="truncate text-slate-200 text-[11px] sm:text-xs">
            BEGA Business Expo & Mahaadhiveshan 2026 — 500+ Exhibitors & Stall Registrations Now Open at CIDCO Exhibition Grounds!
          </span>
        </div>
        <Link
          to="/expo"
          className="hidden md:inline-flex items-center gap-1 text-amber-300 hover:text-white font-black text-xs shrink-0 transition"
        >
          Book Stall &rarr;
        </Link>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <nav className="bg-slate-950/95 backdrop-blur-md text-slate-100 border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo & Full English Identity */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 bg-gradient-to-tr from-[#0A3D91] via-blue-600 to-[#F57C00] rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              B
            </div>
            <div>
              <div className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                BEGA INDIA
              </div>
              <p className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest">
                Growth • Trust • Success
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-5 text-[12px] font-extrabold text-slate-300">
            <Link to="/" className={`hover:text-white transition ${isActive('/') ? 'text-amber-400 font-black' : ''}`}>
              Home
            </Link>
            <Link to="/about" className={`hover:text-white transition ${isActive('/about') ? 'text-amber-400 font-black' : ''}`}>
              About Us
            </Link>
            <Link to="/objectives" className={`hover:text-white transition ${isActive('/objectives') ? 'text-amber-400 font-black' : ''}`}>
              Objectives
            </Link>
            <Link to="/membership" className={`hover:text-white transition ${isActive('/membership') ? 'text-amber-400 font-black' : ''}`}>
              Membership
            </Link>
            <Link to="/directory" className={`hover:text-white transition ${isActive('/directory') ? 'text-amber-400 font-black' : ''}`}>
              Directory
            </Link>
            <Link to="/support" className={`hover:text-white transition ${isActive('/support') ? 'text-amber-400 font-black' : ''}`}>
              Business Support
            </Link>
            <Link to="/seva" className={`hover:text-white transition ${isActive('/seva') ? 'text-amber-400 font-black' : ''}`}>
              BEGA Seva
            </Link>
            <Link to="/expo" className={`hover:text-white transition ${isActive('/expo') ? 'text-amber-400 font-black' : ''}`}>
              Expo & Conclave
            </Link>
            <Link to="/events" className={`hover:text-white transition ${isActive('/events') ? 'text-amber-400 font-black' : ''}`}>
              Events
            </Link>
            <Link to="/news" className={`hover:text-white transition ${isActive('/news') ? 'text-amber-400 font-black' : ''}`}>
              News
            </Link>
          </div>

          {/* Primary Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <Link
              to="/join"
              className="px-5 py-2.5 bg-gradient-to-r from-[#F57C00] to-amber-500 hover:from-[#e06f00] hover:to-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-lg hover:shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> JOIN BEGA
            </Link>
            <Link
              to="/support"
              className="px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-extrabold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <LifeBuoy className="w-3.5 h-3.5 text-rose-400" /> Support Desk
            </Link>
            <Link
              to="/login"
              className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" /> Login
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* 3. STICKY SUB-BAR WITH 11 PRIMARY QUICK ACTION BUTTONS */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-2 overflow-x-auto scrollbar-none hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[11px] font-black uppercase whitespace-nowrap">
          <span className="text-slate-500 text-[10px] font-bold tracking-wider mr-1">Direct Portals:</span>
          <Link to="/join" className="px-3 py-1 bg-orange-500/20 text-[#F57C00] border border-orange-500/30 rounded-lg hover:bg-orange-500/30 transition">
            JOIN BEGA
          </Link>
          <Link to="/membership" className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition">
            MEMBERSHIP
          </Link>
          <Link to="/directory" className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/30 transition">
            BUSINESS DIRECTORY
          </Link>
          <Link to="/support" className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-lg hover:bg-rose-500/30 transition">
            REGISTER BUSINESS ISSUE
          </Link>
          <Link to="/seva" className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg hover:bg-amber-500/30 transition">
            BEGA SEVA
          </Link>
          <Link to="/expo" className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition">
            BEGA EXPO
          </Link>
          <Link to="/expo" className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 transition">
            MAHAADHIVESHAN
          </Link>
          <Link to="/events" className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg hover:bg-indigo-500/30 transition">
            EVENTS
          </Link>
          <Link to="/training" className="px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-lg hover:bg-teal-500/30 transition">
            TRAINING
          </Link>
          <Link to="/awards" className="px-3 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/30 transition">
            AWARDS
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="xl:hidden bg-slate-950 border-b border-slate-800 px-6 py-6 space-y-4 text-xs font-bold animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <Link
              to="/join"
              onClick={() => setIsOpen(false)}
              className="py-3 bg-[#F57C00] text-slate-950 font-black text-center rounded-xl shadow"
            >
              JOIN BEGA NOW
            </Link>
            <Link
              to="/support"
              onClick={() => setIsOpen(false)}
              className="py-3 bg-rose-500/20 text-rose-300 border border-rose-500/30 font-black text-center rounded-xl"
            >
              SUBMIT ISSUE
            </Link>
          </div>

          <div className="space-y-2 text-slate-300 text-sm">
            <Link to="/" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-white">Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-white">About BEGA</Link>
            <Link to="/objectives" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-white">28 Core Objectives</Link>
            <Link to="/membership" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-white">Membership Plans & Pricing</Link>
            <Link to="/directory" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-white">State Business Directory</Link>
            <Link to="/support" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-white">Business Support Desk (BSR)</Link>
            <Link to="/seva" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-white">BEGA Seva (Social Movement)</Link>
            <Link to="/expo" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-white">BEGA Business Expo & Conclave</Link>
            <Link to="/events" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-white">State & District Seminars</Link>
            <Link to="/training" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-white">Training & Workshops</Link>
            <Link to="/awards" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-white">Annual Business Awards</Link>
            <Link to="/schemes" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-white">Government Schemes Portal</Link>
            <Link to="/sponsorship" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-white">Corporate CSR & Village Desk</Link>
            <Link to="/leadership" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-white">Organizational Leadership</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-white">Head Office Contact</Link>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 bg-slate-900 text-slate-200 border border-slate-700 font-extrabold text-center rounded-xl flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" /> Member Portal Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}