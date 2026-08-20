// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../components/layout/PublicLayout';

// Public Pages
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Membership from '../pages/public/Membership';
import Directory from '../pages/public/BusinessDirectory';
import Events from '../pages/public/Events';
import Contact from '../pages/public/Contact';
import Join from '../pages/public/Join';
import Support from '../pages/public/Support';
import Seva from '../pages/public/Seva';
import Knowledge from '../pages/public/Knowledge';
import VerifyMember from '../pages/public/VerifyMember';
import Leadership from '../pages/public/Leadership';
import Policies from '../pages/public/Policies';
import Objectives from '../pages/public/Objectives';
import Expo from '../pages/public/Expo';
import Sponsorship from '../pages/public/Sponsorship';
import NewsAndMedia from '../pages/public/NewsAndMedia';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Unauthorized from '../pages/auth/Unauthorized';

// Protected Route Guard
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Member Dashboard Main View
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
import SupportAdmin from '../pages/admin/SupportAdmin';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/objectives" element={<Objectives />} />
        <Route path="/why-bega" element={<Objectives />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/join" element={<Join />} />
        <Route path="/verify/:applicationNumber" element={<VerifyMember />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/support" element={<Support />} />
        <Route path="/expo" element={<Expo />} />
        <Route path="/mahaadhiveshan" element={<Expo />} />
        <Route path="/events" element={<Events />} />
        <Route path="/seva" element={<Seva />} />
        <Route path="/volunteer" element={<Seva />} />
        <Route path="/sponsorship" element={<Sponsorship />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/schemes" element={<Knowledge />} />
        <Route path="/news" element={<NewsAndMedia />} />
        <Route path="/media" element={<NewsAndMedia />} />
        <Route path="/success-stories" element={<NewsAndMedia />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/terms" element={<Policies />} />
        <Route path="/privacy" element={<Policies />} />
        <Route path="/code-of-conduct" element={<Policies />} />
        <Route path="/refund-policy" element={<Policies />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Member Dashboard Sub-routes */}
      <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<EventModule />} />
          <Route path="profile" element={<ProfileManagement />} />
          <Route path="events" element={<EventModule />} />
          <Route path="membership" element={<MembershipModule />} />
          <Route path="notifications" element={<NotificationModule />} />
        </Route>
      </Route>

      {/* Admin Panel Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/directory" element={<DirectoryAndEventsAdmin />} />
        <Route path="/admin/revenue" element={<RevenueAdmin />} />
        <Route path="/admin/cms" element={<CMSAdmin />} />
        <Route path="/admin/support" element={<SupportAdmin />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}