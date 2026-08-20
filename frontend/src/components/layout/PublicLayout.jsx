import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      {/* 1. Official Sticky Navbar with Marquee & Sub-portals */}
      <Navbar />

      {/* 2. Page Content Viewport */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* 3. Official 5-Column English Footer */}
      <Footer />
    </div>
  );
}