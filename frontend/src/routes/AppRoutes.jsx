// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate, Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

// --- Page Imports ---
// Public Pages
import Home from '../pages/public/Home';
import BusinessDirectory from '../pages/public/BusinessDirectory';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Protected Member Pages
import MemberDashboard from '../pages/member/MemberDashboard';
import CreateBusinessProfile from '../pages/member/CreateBusinessProfile';
import MembershipPlans from '../pages/member/MembershipPlans';

// Protected Admin Pages
import AdminApprovalDashboard from '../pages/admin/AdminApprovalDashboard';

// Shared UI Icons
import { Building2, Shield, LogOut, User, LayoutDashboard, CreditCard, Sparkles } from 'lucide-react';

// ==========================================
// 1. Role-Based Protected Route Guard
// ==========================================
const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, token } = useSelector((state) => state.auth);

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

// ==========================================
// 2. Global Main Layout (Navbar & Footer)
// ==========================================
const MainLayout = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased text-slate-800">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg tracking-wider shadow-md shadow-indigo-600/20 group-hover:bg-indigo-700 transition">
              B
            </div>
            <span className="font-extrabold text-lg text-slate-900 tracking-tight">
              BEGAIN<span className="text-indigo-600">DIA</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
            <Link to="/directory" className="hover:text-indigo-600 transition">Business Directory</Link>
            <Link to="/membership" className="hover:text-indigo-600 transition">Membership Plans</Link>
          </nav>

          {/* Dynamic User Menu / Auth Buttons */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* Admin Quick Link */}
                {['ADMIN', 'SUPER_ADMIN'].includes(user?.role) && (
                  <Link
                    to="/admin/dashboard"
                    className="px-3 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl text-xs font-bold border border-amber-200 flex items-center gap-1.5 transition"
                  >
                    <Shield className="w-3.5 h-3.5" /> Admin Panel
                  </Link>
                )}

                {/* Member Dashboard Link */}
                <Link
                  to="/dashboard"
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                </Link>

                {/* User Avatar Badge */}
                <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <button
                    onClick={handleLogout}
                    title="Sign Out"
                    className="p-2 text-slate-400 hover:text-red-600 transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Page View Context */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 text-center text-xs text-slate-500 space-y-2">
        <p>© {new Date().getFullYear()} BEGAINDIA Business Networking Platform. All Rights Reserved.</p>
        <p className="text-slate-400">Developed by SW Digital Hub</p>
      </footer>
    </div>
  );
};

// ==========================================
// 3. Page Fallbacks & Error Views
// ==========================================
const UnauthorizedPage = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center space-y-3">
    <Shield className="w-12 h-12 text-red-500" />
    <h2 className="text-xl font-bold text-slate-900">Access Restricted</h2>
    <p className="text-xs text-slate-500 max-w-sm">
      You do not have administrative permissions to view this resource.
    </p>
    <Link to="/dashboard" className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold">
      Return to Dashboard
    </Link>
  </div>
);

const NotFoundPage = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center space-y-3">
    <Building2 className="w-12 h-12 text-slate-300" />
    <h2 className="text-xl font-bold text-slate-900">404 - Page Not Found</h2>
    <p className="text-xs text-slate-500 max-w-sm">
      The page or business resource you are looking for does not exist.
    </p>
    <Link to="/" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold">
      Back to Home
    </Link>
  </div>
);

// ==========================================
// 4. Central App Router Configuration
// ==========================================
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        
        {/* --- PUBLIC ROUTES --- */}
        <Route index element={<Home />} />
        <Route path="directory" element={<BusinessDirectory />} />
        <Route path="membership" element={<MembershipPlans />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<UnauthorizedPage />} />

        {/* --- PROTECTED MEMBER ROUTES --- */}
        <Route element={<ProtectedRoute allowedRoles={['VISITOR', 'MEMBER', 'PREMIUM_MEMBER', 'ORGANIZER', 'ADMIN', 'SUPER_ADMIN']} />}>
          <Route path="dashboard" element={<MemberDashboard />} />
          <Route path="create-business" element={<CreateBusinessProfile />} />
        </Route>

        {/* --- PROTECTED ADMIN ROUTES --- */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']} />}>
          <Route path="admin/dashboard" element={<AdminApprovalDashboard />} />
        </Route>

        {/* --- 404 CATCH-ALL --- */}
        <Route path="*" element={<NotFoundPage />} />

      </Route>
    </Routes>
  );
}