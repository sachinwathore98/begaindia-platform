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

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Unauthorized from '../pages/auth/Unauthorized';

// Protected Pages
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Dashboard from '../pages/Dashboard';

// Member Dashboard Modules
import ProfileManagement from '../pages/dashboard/ProfileManagement';
import EventModule from '../pages/dashboard/EventModule';
import MembershipModule from '../pages/dashboard/MembershipModule';
import NotificationModule from '../pages/dashboard/NotificationModule';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages wrapped with Global Layout Header & Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Auth Standalone Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Member Dashboard Routes */}
      <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<ProfileManagement />} />
          <Route path="events" element={<EventModule />} />
          <Route path="membership" element={<MembershipModule />} />
          <Route path="notifications" element={<NotificationModule />} />
        </Route>
      </Route>

      {/* Catch All Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}