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
  Sparkles,
  Award,
  ArrowRight,
  Flame,
  ChevronDown,
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 font-sans shadow-sm bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      {/* 1. SLIM TOP ANNOUNCEMENT STRIP */}
      <div className="bg-[#0A3D91] text-white py-1.5 px-4 sm:px-8 text-xs font-semibold flex justify-between items-center">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="px-2 py-0.5 bg-[#F57C00] text-white font-black text-[10px] rounded uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Flame className="w-3 h-3 fill-white" /> State Notice
          </span>
          <span className="truncate text-slate-100 text-[11px] sm:text-xs font-medium">
            BEGA Business Expo & Mahaadhiveshan 2026 — 500+ Exhibitors & Stall Registrations at CIDCO Grounds!
          </span>
        </div>
        <Link
          to="/expo"
          className="hidden md:inline-flex items-center gap-1 text-amber-300 hover:text-white font-bold text-xs shrink-0 transition"
        >
          Book Stall &rarr;
        </Link>
      </div>

      {/* 2. MAIN NAVBAR */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 bg-gradient-to-tr from-[#0A3D91] via-blue-700 to-[#F57C00] rounded-xl flex items-center justify-center font-black text-white text-lg shadow-md group-hover:scale-105 transition-transform duration-300">
            B
          </div>
          <div>
            <div className="text-base sm:text-lg font-black tracking-tight text-[#0A3D91] flex items-center gap-1.5">
              BEGA INDIA
            </div>
            <p className="text-[10px] text-[#F57C00] font-extrabold uppercase tracking-widest leading-none">
              Growth • Trust • Success
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6 text-[13px] font-bold text-slate-700">
          <Link to="/" className={`hover:text-[#0A3D91] transition ${isActive('/') ? 'text-[#0A3D91] font-black' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`hover:text-[#0A3D91] transition ${isActive('/about') ? 'text-[#0A3D91] font-black' : ''}`}>
            About
          </Link>
          <Link to="/objectives" className={`hover:text-[#0A3D91] transition ${isActive('/objectives') ? 'text-[#0A3D91] font-black' : ''}`}>
            Objectives
          </Link>
          <Link to="/membership" className={`hover:text-[#0A3D91] transition ${isActive('/membership') ? 'text-[#0A3D91] font-black' : ''}`}>
            Membership
          </Link>
          <Link to="/directory" className={`hover:text-[#0A3D91] transition ${isActive('/directory') ? 'text-[#0A3D91] font-black' : ''}`}>
            Directory
          </Link>
          <Link to="/seva" className={`hover:text-[#0A3D91] transition ${isActive('/seva') ? 'text-[#0A3D91] font-black' : ''}`}>
            BEGA Seva
          </Link>
          <Link to="/expo" className={`hover:text-[#0A3D91] transition ${isActive('/expo') ? 'text-[#0A3D91] font-black' : ''}`}>
            Expo & Conclave
          </Link>
          <Link to="/events" className={`hover:text-[#0A3D91] transition ${isActive('/events') ? 'text-[#0A3D91] font-black' : ''}`}>
            Events
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            to="/support"
            className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
          >
            <LifeBuoy className="w-3.5 h-3.5 text-rose-600" /> Support Desk
          </Link>
          <Link
            to="/join"
            className="px-5 py-2 bg-[#F57C00] hover:bg-[#e06f00] text-white font-extrabold text-xs rounded-xl shadow-md transition-all hover:scale-[1.02] flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Join BEGA
          </Link>
          <Link
            to="/login"
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5" /> Login
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6 text-[#0A3D91]" /> : <Menu className="w-6 h-6 text-slate-800" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 text-xs font-bold animate-in slide-in-from-top duration-200 max-h-[80vh] overflow-y-auto shadow-xl">
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
              SUPPORT DESK
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
            <Link to="/events" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-[#0A3D91]">Events & Seminars</Link>
            <Link to="/news" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-[#0A3D91]">News & Success Stories</Link>
            <Link to="/knowledge" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-[#0A3D91]">Knowledge & Schemes</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-1.5 hover:text-[#0A3D91]">Contact Head Office</Link>
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