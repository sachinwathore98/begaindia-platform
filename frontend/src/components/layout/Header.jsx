import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  User,
  ShieldCheck,
  ChevronDown,
  Building2,
  Calendar,
  Store,
  HeartHandshake,
  LifeBuoy,
  FileText,
  Sparkles,
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-slate-950 text-slate-100 border-b border-slate-800 sticky top-0 z-50 font-sans">
      {/* Top Notification Marquee Bar */}
      <div className="bg-[#0A3D91] text-white py-1.5 px-4 text-xs font-bold flex justify-between items-center">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="px-2 py-0.5 bg-amber-400 text-slate-950 font-black text-[10px] rounded uppercase">
            Announcement
          </span>
          <span className="truncate">
            BEGA Mahaadhiveshan & Business Expo 2026 — Stall allocations now open at CIDCO Grounds!
          </span>
        </div>
        <Link to="/expo" className="hidden sm:inline text-amber-300 hover:underline text-[11px] font-black shrink-0">
          Book Stall &rarr;
        </Link>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex justify-between items-center">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-[#0A3D91] to-[#F57C00] rounded-xl flex items-center justify-center font-black text-white text-lg shadow-md group-hover:scale-105 transition">
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
        <div className="hidden lg:flex items-center gap-6 text-xs font-extrabold">
          <Link to="/" className="text-slate-300 hover:text-white transition">
            Home
          </Link>
          <Link to="/about" className="text-slate-300 hover:text-white transition">
            About Us
          </Link>
          <Link to="/objectives" className="text-slate-300 hover:text-white transition">
            Objectives
          </Link>
          <Link to="/membership" className="text-slate-300 hover:text-white transition">
            Membership
          </Link>
          <Link to="/directory" className="text-slate-300 hover:text-white transition">
            Directory
          </Link>
          <Link to="/support" className="text-slate-300 hover:text-white transition">
            Business Support
          </Link>
          <Link to="/seva" className="text-slate-300 hover:text-white transition">
            BEGA Seva
          </Link>
          <Link to="/expo" className="text-slate-300 hover:text-white transition">
            Expo & Conclave
          </Link>
          <Link to="/events" className="text-slate-300 hover:text-white transition">
            Events
          </Link>
        </div>

        {/* Action CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/join"
            className="px-4 py-2 bg-[#F57C00] hover:bg-[#e06f00] text-slate-950 font-black text-xs rounded-xl shadow transition"
          >
            Join BEGA
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5" /> Portal Login
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4 text-xs font-bold animate-in slide-in-from-top duration-200">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white py-1">
            Home
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white py-1">
            About Us
          </Link>
          <Link to="/objectives" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white py-1">
            28 Core Objectives
          </Link>
          <Link to="/membership" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white py-1">
            Membership Plans
          </Link>
          <Link to="/directory" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white py-1">
            Business Directory
          </Link>
          <Link to="/support" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white py-1">
            Business Support Desk (BSR)
          </Link>
          <Link to="/seva" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white py-1">
            BEGA Seva (Social Development)
          </Link>
          <Link to="/expo" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white py-1">
            BEGA Business Expo & Conclave
          </Link>
          <Link to="/events" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white py-1">
            Events & Seminars
          </Link>
          <Link to="/news" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white py-1">
            News & Success Stories
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white py-1">
            Contact Head Office
          </Link>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <Link
              to="/join"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 bg-[#F57C00] text-slate-950 font-black text-center rounded-xl"
            >
              Join BEGA Now
            </Link>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 bg-slate-800 text-white font-bold text-center rounded-xl border border-slate-700"
            >
              Member Portal Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}