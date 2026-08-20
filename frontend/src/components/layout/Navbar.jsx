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
  Flame,
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 font-sans shadow-md bg-white">
      {/* 1. TOP LIVE NOTIFICATION MARQUEE STRIP */}
      <div className="bg-[#0A3D91] text-white py-1.5 px-4 sm:px-8 text-xs font-bold flex justify-between items-center">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="px-2.5 py-0.5 bg-[#F57C00] text-white font-black text-[10px] rounded uppercase tracking-wider shrink-0 animate-pulse flex items-center gap-1">
            <Flame className="w-3 h-3 fill-white" /> State Notice
          </span>
          <span className="truncate text-slate-100 text-[11px] sm:text-xs">
            BEGA Business Expo & Mahaadhiveshan 2026 — 500+ MSME Exhibitors & Stall Allocations Now Open at CIDCO Exhibition Grounds!
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
      <nav className="bg-white/95 backdrop-blur-md text-slate-800 border-b border-slate-200 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo & Full Identity */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 bg-gradient-to-tr from-[#0A3D91] via-blue-600 to-[#F57C00] rounded-xl flex items-center justify-center font-black text-white text-xl shadow-md group-hover:scale-105 transition-transform duration-300">
              B
            </div>
            <div>
              <div className="text-base sm:text-lg font-black tracking-tight text-[#0A3D91] flex items-center gap-1.5">
                BEGA INDIA
              </div>
              <p className="text-[10px] text-[#F57C00] font-extrabold uppercase tracking-widest">
                Growth • Trust • Success
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-5 text-[12px] font-extrabold text-slate-700">
            <Link to="/" className={`hover:text-[#0A3D91] transition ${isActive('/') ? 'text-[#F57C00] font-black' : ''}`}>
              Home
            </Link>
            <Link to="/about" className={`hover:text-[#0A3D91] transition ${isActive('/about') ? 'text-[#F57C00] font-black' : ''}`}>
              About Us
            </Link>
            <Link to="/objectives" className={`hover:text-[#0A3D91] transition ${isActive('/objectives') ? 'text-[#F57C00] font-black' : ''}`}>
              Objectives
            </Link>
            <Link to="/membership" className={`hover:text-[#0A3D91] transition ${isActive('/membership') ? 'text-[#F57C00] font-black' : ''}`}>
              Membership
            </Link>
            <Link to="/directory" className={`hover:text-[#0A3D91] transition ${isActive('/directory') ? 'text-[#F57C00] font-black' : ''}`}>
              Directory
            </Link>
            <Link to="/support" className={`hover:text-[#0A3D91] transition ${isActive('/support') ? 'text-[#F57C00] font-black' : ''}`}>
              Business Support
            </Link>
            <Link to="/seva" className={`hover:text-[#0A3D91] transition ${isActive('/seva') ? 'text-[#F57C00] font-black' : ''}`}>
              BEGA Seva
            </Link>
            <Link to="/expo" className={`hover:text-[#0A3D91] transition ${isActive('/expo') ? 'text-[#F57C00] font-black' : ''}`}>
              Expo & Conclave
            </Link>
            <Link to="/events" className={`hover:text-[#0A3D91] transition ${isActive('/events') ? 'text-[#F57C00] font-black' : ''}`}>
              Events
            </Link>
            <Link to="/news" className={`hover:text-[#0A3D91] transition ${isActive('/news') ? 'text-[#F57C00] font-black' : ''}`}>
              News
            </Link>
          </div>

          {/* Primary Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <Link
              to="/join"
              className="px-5 py-2.5 bg-[#F57C00] hover:bg-[#e06f00] text-white font-black text-xs rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> JOIN BEGA
            </Link>
            <Link
              to="/support"
              className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-extrabold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <LifeBuoy className="w-3.5 h-3.5 text-rose-600" /> Support Desk
            </Link>
            <Link
              to="/login"
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" /> Login
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="w-6 h-6 text-[#0A3D91]" /> : <Menu className="w-6 h-6 text-slate-800" />}
          </button>
        </div>
      </nav>

      {/* 3. STICKY SUB-BAR WITH 11 PRIMARY QUICK ACTION BUTTONS */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-8 py-2 overflow-x-auto scrollbar-none hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[11px] font-black uppercase whitespace-nowrap">
          <span className="text-slate-500 text-[10px] font-bold tracking-wider mr-1">Direct Portals:</span>
          <Link to="/join" className="px-3 py-1 bg-orange-100 text-[#F57C00] border border-orange-200 rounded-lg hover:bg-orange-200 transition">
            JOIN BEGA
          </Link>
          <Link to="/membership" className="px-3 py-1 bg-blue-100 text-[#0A3D91] border border-blue-200 rounded-lg hover:bg-blue-200 transition">
            MEMBERSHIP
          </Link>
          <Link to="/directory" className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg hover:bg-emerald-200 transition">
            BUSINESS DIRECTORY
          </Link>
          <Link to="/support" className="px-3 py-1 bg-rose-100 text-rose-800 border border-rose-200 rounded-lg hover:bg-rose-200 transition">
            REGISTER BUSINESS ISSUE
          </Link>
          <Link to="/seva" className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-200 rounded-lg hover:bg-amber-200 transition">
            BEGA SEVA
          </Link>
          <Link to="/expo" className="px-3 py-1 bg-purple-100 text-purple-800 border border-purple-200 rounded-lg hover:bg-purple-200 transition">
            BEGA EXPO
          </Link>
          <Link to="/expo" className="px-3 py-1 bg-cyan-100 text-cyan-900 border border-cyan-200 rounded-lg hover:bg-cyan-200 transition">
            MAHAADHIVESHAN
          </Link>
          <Link to="/events" className="px-3 py-1 bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-lg hover:bg-indigo-200 transition">
            EVENTS
          </Link>
          <Link to="/training" className="px-3 py-1 bg-teal-100 text-teal-900 border border-teal-200 rounded-lg hover:bg-teal-200 transition">
            TRAINING
          </Link>
          <Link to="/awards" className="px-3 py-1 bg-yellow-100 text-yellow-900 border border-yellow-200 rounded-lg hover:bg-yellow-200 transition">
            AWARDS
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 text-xs font-bold animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200">
            <Link
              to="/join"
              onClick={() => setIsOpen(false)}
              className="py-3 bg-[#F57C00] text-white font-black text-center rounded-xl shadow"
            >
              JOIN BEGA NOW
            </Link>
            <Link
              to="/support"
              onClick={() => setIsOpen(false)}
              className="py-3 bg-rose-50 text-rose-700 border border-rose-200 font-black text-center rounded-xl"
            >
              SUBMIT ISSUE
            </Link>
          </div>

          <div className="space-y-2 text-slate-700 text-sm">
            <Link to="/" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-[#0A3D91]">Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-[#0A3D91]">About BEGA</Link>
            <Link to="/objectives" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-[#0A3D91]">28 Core Objectives</Link>
            <Link to="/membership" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-[#0A3D91]">Membership Plans & Pricing</Link>
            <Link to="/directory" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-[#0A3D91]">State Business Directory</Link>
            <Link to="/support" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-[#0A3D91]">Business Support Desk (BSR)</Link>
            <Link to="/seva" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-[#0A3D91]">BEGA Seva (Social Movement)</Link>
            <Link to="/expo" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-[#0A3D91]">BEGA Business Expo & Conclave</Link>
            <Link to="/events" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-[#0A3D91]">State & District Seminars</Link>
            <Link to="/training" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-[#0A3D91]">Training & Workshops</Link>
            <Link to="/awards" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-[#0A3D91]">Annual Business Awards</Link>
            <Link to="/schemes" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-[#0A3D91]">Government Schemes Portal</Link>
            <Link to="/sponsorship" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-[#0A3D91]">Corporate CSR & Village Desk</Link>
            <Link to="/leadership" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-[#0A3D91]">Organizational Leadership</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-[#0A3D91]">Head Office Contact</Link>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 bg-slate-100 text-slate-800 border border-slate-300 font-extrabold text-center rounded-xl flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" /> Member Portal Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}