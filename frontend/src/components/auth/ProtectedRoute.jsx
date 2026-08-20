import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ allowedRoles }) {
  const { user, token } = useSelector((state) => state.auth);
  const localToken = localStorage.getItem('token') || localStorage.getItem('accessToken');

  if (!token && !localToken) {
    return <Navigate to="/login" replace />;
  }

  const userRole = (user?.role || 'user').toLowerCase();
  
  if (allowedRoles) {
    const normalizedRoles = allowedRoles.map((r) => r.toLowerCase());
    if (!normalizedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
}