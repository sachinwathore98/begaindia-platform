import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Globe, 
  Menu, 
  X, 
  User, 
  Building2, 
  LifeBuoy, 
  Calendar, 
  Award, 
  HeartHandshake, 
  Layers 
} from 'lucide-react';

export default function Header() {
  const { lang, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top Banner Bar */}
      <div className="bg-[#0A3D91] text-white text-[11px] font-medium py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 truncate">
            <span className="font-bold text-[#F57C00] tracking-wider uppercase">Tagline:</span>
            <span>{t.orgTagline}</span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:inline text-slate-200 truncate">{t.philosophy}</span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full text-xs font-bold transition text-amber-300 border border-white/20"
              title="Toggle English / मराठी"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'मराठी (MR)' : 'English (EN)'}</span>
            </button>

            <Link 
              to="/login" 
              className="hover:text-amber-300 font-semibold transition flex items-center gap-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t.nav.login}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-11 h-11 bg-gradient-to-tr from-[#0A3D91] to-[#F57C00] rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-md border border-blue-900/20">
            B
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold text-[#0A3D91] tracking-tight leading-tight">
              {t.orgName}
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-slate-700 leading-none">
              {t.orgFullName}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-bold text-slate-700">
          <NavLink to="/" className={({ isActive }) => `px-2.5 py-1.5 rounded-lg transition ${isActive ? 'text-[#0A3D91] bg-blue-50' : 'hover:text-[#0A3D91]'}`}>
            {t.nav.home}
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `px-2.5 py-1.5 rounded-lg transition ${isActive ? 'text-[#0A3D91] bg-blue-50' : 'hover:text-[#0A3D91]'}`}>
            {t.nav.about}
          </NavLink>
          <NavLink to="/membership" className={({ isActive }) => `px-2.5 py-1.5 rounded-lg transition ${isActive ? 'text-[#0A3D91] bg-blue-50' : 'hover:text-[#0A3D91]'}`}>
            {t.nav.membership}
          </NavLink>
          <NavLink to="/directory" className={({ isActive }) => `px-2.5 py-1.5 rounded-lg transition ${isActive ? 'text-[#0A3D91] bg-blue-50' : 'hover:text-[#0A3D91]'}`}>
            {t.nav.directory}
          </NavLink>
          <NavLink to="/support" className={({ isActive }) => `px-2.5 py-1.5 rounded-lg transition ${isActive ? 'text-[#0A3D91] bg-blue-50' : 'hover:text-[#0A3D91]'}`}>
            {t.nav.support}
          </NavLink>
          <NavLink to="/events" className={({ isActive }) => `px-2.5 py-1.5 rounded-lg transition ${isActive ? 'text-[#0A3D91] bg-blue-50' : 'hover:text-[#0A3D91]'}`}>
            {t.nav.events}
          </NavLink>
          <NavLink to="/seva" className={({ isActive }) => `px-2.5 py-1.5 rounded-lg transition ${isActive ? 'text-[#0A3D91] bg-blue-50' : 'hover:text-[#0A3D91]'}`}>
            {t.nav.seva}
          </NavLink>
        </nav>

        {/* Header Right Action CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/join"
            className="px-5 py-2.5 bg-gradient-to-r from-[#F57C00] to-[#E65100] hover:from-[#e06f00] hover:to-[#d84315] text-white text-xs font-extrabold rounded-xl shadow-md transition transform active:scale-95 uppercase tracking-wider"
          >
            {t.nav.joinBega}
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="p-2.5 bg-slate-50 rounded-lg">{t.nav.home}</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="p-2.5 bg-slate-50 rounded-lg">{t.nav.about}</Link>
            <Link to="/membership" onClick={() => setMobileMenuOpen(false)} className="p-2.5 bg-slate-50 rounded-lg">{t.nav.membership}</Link>
            <Link to="/directory" onClick={() => setMobileMenuOpen(false)} className="p-2.5 bg-slate-50 rounded-lg">{t.nav.directory}</Link>
            <Link to="/support" onClick={() => setMobileMenuOpen(false)} className="p-2.5 bg-slate-50 rounded-lg">{t.nav.support}</Link>
            <Link to="/events" onClick={() => setMobileMenuOpen(false)} className="p-2.5 bg-slate-50 rounded-lg">{t.nav.events}</Link>
            <Link to="/seva" onClick={() => setMobileMenuOpen(false)} className="p-2.5 bg-slate-50 rounded-lg col-span-2 text-emerald-700 bg-emerald-50">{t.nav.seva}</Link>
          </div>
          <Link
            to="/join"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center w-full py-3 bg-[#F57C00] text-white text-xs font-extrabold rounded-xl shadow uppercase tracking-wider"
          >
            {t.nav.joinBega}
          </Link>
        </div>
      )}
    </header>
  );
}