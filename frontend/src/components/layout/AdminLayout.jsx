// frontend/src/components/layout/AdminLayout.jsx
import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Building2,
  DollarSign,
  FileText,
  LifeBuoy,
  Briefcase,
  UserCheck,
  Calendar,
  LogOut,
  ArrowLeft,
  Menu,
  X,
} from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Member Users', path: '/admin/users', icon: Users },
    { label: 'Executive Pipeline', path: '/admin/executives', icon: ShieldCheck },
    { label: 'Directory Moderation', path: '/admin/directory', icon: Building2 },
    { label: 'Events & Expos', path: '/admin/events', icon: Calendar },
    { label: 'Career Connect', path: '/admin/careers', icon: Briefcase },
    { label: 'Mentorship Wing', path: '/admin/mentorship', icon: UserCheck },
    { label: 'Revenue & Ledger', path: '/admin/revenue', icon: DollarSign },
    { label: 'CMS & Ticker', path: '/admin/cms', icon: FileText },
    { label: 'Support & 14 Desks', path: '/admin/support', icon: LifeBuoy },
  ];

  const renderNavLinks = () => (
    <nav className="space-y-1 text-xs font-bold">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.path === '/admin'
            ? location.pathname === '/admin'
            : location.pathname.startsWith(item.path);

        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
              isActive
                ? 'bg-[#F57C00] text-white shadow-md'
                : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      {/* Desktop Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#0A3D91] to-[#F57C00] rounded-xl flex items-center justify-center font-black text-white text-base shadow">
              B
            </div>
            <div>
              <h3 className="text-sm font-black text-white leading-none">BEGA INDIA</h3>
              <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mt-1">
                Admin Control
              </p>
            </div>
          </div>

          {renderNavLinks()}
        </div>

        <div className="p-6 border-t border-slate-800 space-y-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Public Site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-black transition flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Logout Admin
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Mobile Header Bar */}
        <header className="bg-white border-b border-slate-200 px-4 py-3.5 flex justify-between items-center md:hidden sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-[#0A3D91]" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="font-black text-[#0A3D91] text-sm">BEGA INDIA Admin</div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="text-xs font-bold text-rose-600 hover:text-rose-800"
          >
            Logout
          </button>
        </header>

        {/* Mobile Slide-Out Drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-slate-900 text-slate-300 p-5 space-y-4 border-b border-slate-800 shadow-xl z-20">
            {renderNavLinks()}
            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs font-bold">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Public Site
              </Link>
            </div>
          </div>
        )}

        <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}