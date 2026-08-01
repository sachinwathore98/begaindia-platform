import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  UserCircleIcon,
  CalendarIcon,
  SparklesIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Overview', path: '/dashboard', icon: HomeIcon, end: true },
  { name: 'Profile & Business Assets', path: '/dashboard/profile', icon: UserCircleIcon },
  { name: 'Events & Passes', path: '/dashboard/events', icon: CalendarIcon },
  { name: 'Membership & Payments', path: '/dashboard/membership', icon: SparklesIcon },
  { name: 'Notifications & Alerts', path: '/dashboard/notifications', icon: BellIcon },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen p-4 space-y-6">
      <div className="px-3 py-2">
        <span className="text-xl font-extrabold text-blue-900 tracking-tight">BEGAINDIA</span>
        <span className="text-[10px] font-bold text-orange-600 block uppercase tracking-wider">Member Portal</span>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}