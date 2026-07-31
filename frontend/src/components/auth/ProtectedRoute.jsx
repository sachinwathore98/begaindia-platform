import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ allowedRoles = ['user', 'admin'] }) {
  const { user, token } = useSelector((state) => state.auth);
  const location = useLocation();

  // 1. If not authenticated, send to login
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. If user role is not permitted for this route, send to unauthorized
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. User is authorized
  return <Outlet />;
}