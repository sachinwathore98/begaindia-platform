// frontend/src/components/layout/AdminLayout.jsx
import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  DollarSign,
  FileText,
  LifeBuoy,
  LogOut,
  ArrowLeft,
} from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Member Users', path: '/admin/users', icon: Users },
    { label: 'Directory Moderation', path: '/admin/directory', icon: Building2 },
    { label: 'Revenue & Ledger', path: '/admin/revenue', icon: DollarSign },
    { label: 'CMS & Ticker', path: '/admin/cms', icon: FileText },
    { label: 'Support & BSR', path: '/admin/support', icon: LifeBuoy },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#0A3D91] to-[#F57C00] rounded-xl flex items-center justify-center font-black text-white text-base shadow">
              B
            </div>
            <div>
              <h3 className="text-sm font-black text-white">BEGAINDIA</h3>
              <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Admin Control</p>
            </div>
          </div>

          <nav className="space-y-1.5 text-xs font-bold">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    isActive
                      ? 'bg-[#F57C00] text-white shadow-md'
                      : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-800 space-y-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-black transition flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Logout Admin
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center md:hidden">
          <div className="font-black text-[#0A3D91]">BEGAINDIA Admin</div>
          <button onClick={handleLogout} className="text-xs font-bold text-rose-600">Logout</button>
        </header>

        <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}