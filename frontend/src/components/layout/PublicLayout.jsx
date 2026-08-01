import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight, Menu, X, LayoutDashboard, UserCheck } from 'lucide-react';

export default function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // 1. Get Logged-in State from Redux
  const { token, user } = useSelector((state) => state.auth);
  const isAuthenticated = Boolean(token && user);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Membership Plans', path: '/membership' },
    { name: 'Business Directory', path: '/directory' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      {/* Top Announcement Banner */}
      <div className="bg-[#0A3D91] text-white text-[11px] py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="bg-[#F57C00] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
          New
        </span>
        <span>
          Join India's fastest growing business networking ecosystem. Registrations open for 2026 Summits!
        </span>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-3 group shrink-0">
            <img
              src="/logo.png"
              alt="BEGAINDIA Logo"
              className="h-14 w-auto max-w-[200px] object-contain drop-shadow-xs transition-transform group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextSibling;
                if (fallback) fallback.style.display = 'flex';
              }}
            />

            <div
              className="w-12 h-12 bg-gradient-to-tr from-[#0A3D91] via-[#083278] to-[#F57C00] rounded-xl text-white font-extrabold text-xl shadow-md shrink-0 items-center justify-center"
              style={{ display: 'none' }}
            >
              B
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-extrabold text-[#0A3D91] tracking-tight leading-none">
                BEGAINDIA
              </span>
              <span className="text-[10px] font-bold text-[#F57C00] tracking-widest uppercase mt-0.5">
                Business Network
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition ${
                  location.pathname === link.path
                    ? 'text-[#F57C00] font-bold border-b-2 border-[#F57C00] pb-1'
                    : 'text-slate-600 hover:text-[#0A3D91]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Dynamic Auth Header Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="px-5 py-2.5 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4 text-[#F57C00]" />
                Dashboard ({user?.name?.split(' ')[0]})
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-[#0A3D91] transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 bg-[#F57C00] hover:bg-[#e06f00] text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  Get Started
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-medium ${
                  location.pathname === link.path ? 'text-[#F57C00] font-bold' : 'text-slate-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-xs font-bold text-white bg-[#0A3D91] rounded-lg flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#F57C00]" />
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2 text-xs font-bold text-white bg-[#F57C00] rounded-lg"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="text-white font-extrabold text-lg flex items-center gap-2">
              <span className="w-7 h-7 bg-[#F57C00] rounded-lg flex items-center justify-center text-white text-xs font-bold">
                B
              </span>
              BEGAINDIA
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              India's premier subscription-based business networking and directory platform. Empowering entrepreneurs, MSMEs, traders, and enterprises.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/membership" className="hover:text-white transition">Membership Plans</Link></li>
              <li><Link to="/directory" className="hover:text-white transition">Business Directory</Link></li>
              <li><Link to="/events" className="hover:text-white transition">Events Schedule</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Legal & Support</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Help & Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Contact Us</h4>
            <p className="text-slate-400">BEGAINDIA Business Network</p>
            <p className="text-slate-400">Chhatrapati Sambhajinagar, Maharashtra, India</p>
            <p className="text-slate-400 mt-2">Email: support@begaindia.com</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 BEGAINDIA Platform. All Rights Reserved.</p>
          <p className="text-slate-500">Developed by <span className="text-slate-400 font-semibold">SW Digital Hub</span></p>
        </div>
      </footer>
    </div>
  );
}