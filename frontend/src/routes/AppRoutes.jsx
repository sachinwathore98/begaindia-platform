import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../components/layout/PublicLayout';

// Public Pages
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Membership from '../pages/public/Membership';
import Directory from '../pages/public/Directory';
import Events from '../pages/public/Events';
import Contact from '../pages/public/Contact';
import Join from '../pages/public/Join';
import Support from '../pages/public/Support';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Unauthorized from '../pages/auth/Unauthorized';

// Protected Route Guard
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Member Dashboard Pages & Sub-Modules
import Dashboard from '../pages/Dashboard';
import ProfileManagement from '../pages/dashboard/ProfileManagement';
import EventModule from '../pages/dashboard/EventModule';
import MembershipModule from '../pages/dashboard/MembershipModule';
import NotificationModule from '../pages/dashboard/NotificationModule';

// Admin Panel Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import DirectoryAndEventsAdmin from '../pages/admin/DirectoryAndEventsAdmin';
import RevenueAdmin from '../pages/admin/RevenueAdmin';
import CMSAdmin from '../pages/admin/CMSAdmin';

export default function AppRoutes() {
  return (
    <Routes>
      {/* ----------------- Public Layout Routes ----------------- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Onboarding, BSR Support & Social Wing */}
        <Route path="/join" element={<Join />} />
        <Route path="/support" element={<Support />} />
        <Route path="/seva" element={<Home />} /> {/* Link to BEGA Seva section / page */}
        <Route path="/expo" element={<Events />} /> {/* BEGA Business Expo portal */}
        <Route path="/mahaadhiveshan" element={<Events />} /> {/* BEGA Mahaadhiveshan portal */}
      </Route>

      {/* ----------------- Authentication Routes ----------------- */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* ----------------- Member Dashboard Routes ----------------- */}
      <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="profile" element={<ProfileManagement />} />
          <Route path="events" element={<EventModule />} />
          <Route path="membership" element={<MembershipModule />} />
          <Route path="notifications" element={<NotificationModule />} />
        </Route>
      </Route>

      {/* ----------------- Admin Panel Routes ----------------- */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/directory" element={<DirectoryAndEventsAdmin />} />
        <Route path="/admin/revenue" element={<RevenueAdmin />} />
        <Route path="/admin/cms" element={<CMSAdmin />} />
      </Route>

      {/* ----------------- Wildcard Catch-all ----------------- */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}