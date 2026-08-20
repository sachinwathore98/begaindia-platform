import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import {
  User,
  Building2,
  CreditCard,
  Calendar,
  LogOut,
  Bell,
  Inbox,
  LayoutDashboard,
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navItems = [
    { label: 'Overview & Digital ID', path: '/dashboard', icon: LayoutDashboard, exact: true },
    { label: 'Business Profile', path: '/dashboard/profile', icon: Building2 },
    { label: 'Events & Entry Passes', path: '/dashboard/events', icon: Calendar },
    { label: 'B2B Trade Inbox', path: '/dashboard/inbox', icon: Inbox },
    { label: 'Membership Credentials', path: '/dashboard/membership', icon: CreditCard },
    { label: 'Notifications', path: '/dashboard/notifications', icon: Bell },
  ];

  const isNavActive = (item) => {
    if (item.exact) return location.pathname === '/dashboard' || location.pathname === '/dashboard/';
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-tr from-[#0A3D91] to-[#F57C00] rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow">
              B
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-white tracking-tight leading-none">BEGAINDIA</span>
              <span className="text-[9px] font-bold text-[#F57C00] tracking-widest uppercase">Member Portal</span>
            </div>
          </Link>

          <nav className="space-y-1.5 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isNavActive(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    active
                      ? 'bg-[#0A3D91] text-white shadow-sm font-bold'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#F57C00]' : 'text-slate-400'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F57C00] text-slate-950 flex items-center justify-center font-black text-xs uppercase shrink-0">
              {user?.name?.charAt(0) || 'M'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Member'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email || 'member@begaindia.org'}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-400 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Sub-Page Viewport */}
      <main className="flex-1 p-6 md:p-8 space-y-6 max-w-6xl mx-auto w-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}