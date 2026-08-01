import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ allowedRoles }) {
  const { user, token } = useSelector((state) => state.auth);
  const localToken = localStorage.getItem('token');

  // If no token exists in Redux or localStorage, redirect to Login
  if (!token && !localToken) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, verify match (default fallback to 'user')
  const userRole = user?.role || 'user';
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}