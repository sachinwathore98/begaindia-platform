import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout & Route Guards
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Unauthorized from '../pages/auth/Unauthorized';

// Dashboard & Application Pages
import Dashboard from '../pages/Dashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Standard User & Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Admin Only Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      {/* Fallback Catch-All */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}