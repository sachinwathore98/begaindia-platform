// src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  User,
  LifeBuoy,
  Sparkles,
  Flame,
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 font-sans shadow-sm bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* 1. SLIM TOP ANNOUNCEMENT STRIP */}
      <div className="bg-[#0A3D91] text-white py-1.5 px-4 sm:px-8 text-xs font-semibold flex justify-between items-center">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="px-2 py-0.5 bg-[#F57C00] text-white font-black text-[10px] rounded-full uppercase tracking-wider shrink-0 flex items-center gap-1 shadow-sm animate-pulse">
            <Flame className="w-3 h-3 fill-white" /> State Notice
          </span>
          <span className="truncate text-slate-100 text-[11px] sm:text-xs font-medium">
            BEGA Business Expo & Mahaadhiveshan 2026 — 500+ Exhibitors & Stall Allocations Now Open!
          </span>
        </div>
        <Link
          to="/expo"
          className="hidden md:inline-flex items-center gap-1 text-amber-300 hover:text-white font-bold text-xs shrink-0 transition"
        >
          Book Stall &rarr;
        </Link>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img
            src="/logo.png"
            alt="BEGAINDIA Logo"
            className="h-11 w-auto max-w-[160px] object-contain transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.nextSibling;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          {/* Fallback Icon Box if logo.png is missing */}
          <div
            className="w-11 h-11 bg-gradient-to-tr from-[#0A3D91] via-blue-700 to-[#F57C00] rounded-xl text-white font-black text-xl shadow-md shrink-0 items-center justify-center"
            style={{ display: 'none' }}
          >
            B
          </div>
          <div>
            <div className="text-base sm:text-lg font-black tracking-tight text-[#0A3D91] flex items-center gap-1">
              BEGA INDIA
            </div>
            <p className="text-[10px] text-[#F57C00] font-extrabold uppercase tracking-widest leading-none">
              Growth • Trust • Success
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6 text-[13px] font-bold text-slate-700">
          <Link
            to="/"
            className={`transition hover:text-[#0A3D91] ${
              isActive('/') ? 'text-[#0A3D91] font-black border-b-2 border-[#0A3D91] pb-0.5' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`transition hover:text-[#0A3D91] ${
              isActive('/about') ? 'text-[#0A3D91] font-black border-b-2 border-[#0A3D91] pb-0.5' : ''
            }`}
          >
            About Us
          </Link>
          <Link
            to="/membership"
            className={`transition hover:text-[#0A3D91] ${
              isActive('/membership') ? 'text-[#0A3D91] font-black border-b-2 border-[#0A3D91] pb-0.5' : ''
            }`}
          >
            Membership
          </Link>
          <Link
            to="/directory"
            className={`transition hover:text-[#0A3D91] ${
              isActive('/directory') ? 'text-[#0A3D91] font-black border-b-2 border-[#0A3D91] pb-0.5' : ''
            }`}
          >
            Business Directory
          </Link>
          <Link
            to="/seva"
            className={`transition hover:text-[#0A3D91] ${
              isActive('/seva') ? 'text-[#0A3D91] font-black border-b-2 border-[#0A3D91] pb-0.5' : ''
            }`}
          >
            BEGA Seva
          </Link>
          <Link
            to="/expo"
            className={`transition hover:text-[#0A3D91] ${
              isActive('/expo') ? 'text-[#0A3D91] font-black border-b-2 border-[#0A3D91] pb-0.5' : ''
            }`}
          >
            Expo & Conclave
          </Link>
          <Link
            to="/events"
            className={`transition hover:text-[#0A3D91] ${
              isActive('/events') ? 'text-[#0A3D91] font-black border-b-2 border-[#0A3D91] pb-0.5' : ''
            }`}
          >
            Events
          </Link>
        </div>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <Link
            to="/support"
            className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
          >
            <LifeBuoy className="w-3.5 h-3.5 text-rose-600" /> BSR Desk
          </Link>
          <Link
            to="/join"
            className="px-5 py-2 bg-gradient-to-r from-[#F57C00] to-amber-500 hover:from-[#e06f00] hover:to-amber-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all hover:scale-[1.02] flex items-center gap-1.5"
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

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="w-6 h-6 text-[#0A3D91]" /> : <Menu className="w-6 h-6 text-slate-800" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 text-xs font-bold animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200">
            <Link
              to="/join"
              onClick={() => setIsOpen(false)}
              className="py-3 bg-gradient-to-r from-[#F57C00] to-amber-500 text-white font-black text-center rounded-xl shadow"
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

          <div className="space-y-2.5 text-slate-700 text-sm">
            <Link to="/" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#0A3D91]">Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#0A3D91]">About BEGA</Link>
            <Link to="/objectives" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#0A3D91]">28 Core Objectives</Link>
            <Link to="/membership" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#0A3D91]">Membership Plans</Link>
            <Link to="/directory" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#0A3D91]">Business Directory</Link>
            <Link to="/support" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#0A3D91]">Business Support (BSR)</Link>
            <Link to="/seva" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#0A3D91]">BEGA Seva (CSR)</Link>
            <Link to="/expo" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#0A3D91]">Expo & Conclave</Link>
            <Link to="/events" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#0A3D91]">Events & Meets</Link>
            <Link to="/knowledge" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#0A3D91]">Govt Schemes Portal</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-1 hover:text-[#0A3D91]">Contact Secretariat</Link>
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