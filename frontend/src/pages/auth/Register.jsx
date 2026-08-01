import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Phone,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Building2,
} from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    companyName: '',
  });

  // OTP Verification States
  const [step, setStep] = useState('DETAILS'); // 'DETAILS' | 'OTP' | 'SUCCESS'
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Active Render backend API URL
  const API_BASE_URL = 'https://begaindia-api.onrender.com/api/auth';

  // Step 1: Send Real Email OTP via Backend
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.name) {
      setError('Please provide your full name and valid email address.');
      return;
    }

    setLoading(true);
    setError('');
    setInfoMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to dispatch OTP email.');
      }

      setInfoMessage(`Real-time OTP sent to ${formData.email}. Please check your inbox or spam folder.`);
      setStep('OTP');
    } catch (err) {
      setError(err.message || 'Unable to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify Real OTP Code via Backend
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!enteredOtp || enteredOtp.length !== 6) {
      setError('Please enter the 6-digit OTP code sent to your email.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: enteredOtp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid or expired OTP code.');
      }

      setIsVerified(true);
      setStep('SUCCESS');
    } catch (err) {
      setError(err.message || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Complete Account Creation
  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      setError('Please complete email OTP verification first.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      navigate('/login', { state: { registered: true } });
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#0A3D91] to-[#F57C00] rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-md">
              B
            </div>
            <span className="text-xl font-extrabold text-[#0A3D91] tracking-tight">BEGAINDIA</span>
          </Link>
          <h1 className="text-xl font-extrabold text-slate-900 pt-1">Create Verified Business Account</h1>
          <p className="text-xs text-slate-500">
            Real-time email OTP verification is required to prevent fake accounts.
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {infoMessage && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-[#0A3D91] text-center font-medium">
            {infoMessage}
          </div>
        )}

        {/* STEP 1: Form Details */}
        {step === 'DETAILS' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Sachin Subhash Wathore"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-[#0A3D91]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Business Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="begaindia559@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-[#0A3D91]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization Name</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="companyName"
                  required
                  placeholder="e.g. SW Digital Hub"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-[#0A3D91]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Contact Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  name="mobile"
                  required
                  placeholder="+91 8390876752"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-[#0A3D91]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Account Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-[#0A3D91]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0A3D91] hover:bg-[#083278] text-white font-bold text-xs rounded-xl transition shadow flex items-center justify-center gap-2"
            >
              {loading ? (
                'Sending OTP...'
              ) : (
                <>
                  <KeyRound className="w-4 h-4 text-[#F57C00]" />
                  Send Verification OTP to Email
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: Real OTP Code Verification */}
        {step === 'OTP' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 text-center">
                Enter 6-Digit Email OTP
              </label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono tracking-widest text-center text-slate-900 outline-none focus:ring-2 focus:ring-[#0A3D91]"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep('DETAILS')}
                className="w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-2/3 py-2.5 bg-[#F57C00] hover:bg-[#e06f00] text-white font-bold text-xs rounded-xl transition shadow flex items-center justify-center gap-1.5"
              >
                {loading ? 'Verifying...' : 'Verify Email OTP'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Registration Completion */}
        {step === 'SUCCESS' && (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Email Verified!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Click below to complete your account setup.
              </p>
            </div>

            <button
              onClick={handleCompleteRegistration}
              disabled={loading}
              className="w-full py-3 bg-[#0A3D91] hover:bg-[#083278] text-white font-bold text-xs rounded-xl transition shadow flex items-center justify-center gap-2"
            >
              {loading ? 'Creating Account...' : 'Complete Business Registration'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Already registered?{' '}
            <Link to="/login" className="text-[#0A3D91] font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}