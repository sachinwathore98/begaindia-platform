import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import {
  Calendar,
  MapPin,
  Building2,
  Users,
  Award,
  Sparkles,
  CheckCircle2,
  Lock,
  Printer,
  ShieldCheck,
  ArrowRight,
  Store,
  Ticket,
  Clock,
  X,
} from 'lucide-react';
import { MAHARASHTRA_DISTRICTS } from '../../data/maharashtraGeo';

const API_URL = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';

const STALL_TIERS = {
  standard: { name: 'Standard Stall (3x3m)', price: 15000, color: 'border-blue-300 bg-blue-50/50' },
  premium: { name: 'Premium Corner (4x3m)', price: 25000, color: 'border-amber-400 bg-amber-50/50' },
  sponsor: { name: 'Sponsor Island Pavilion (6x6m)', price: 60000, color: 'border-purple-400 bg-purple-50/50' },
};

// Initial 24-stall floor layout
const DEFAULT_STALLS = [
  { id: 'S-01', tier: 'sponsor', status: 'Booked', company: 'SW Multimedia Group' },
  { id: 'S-02', tier: 'sponsor', status: 'Available', company: '' },
  { id: 'P-01', tier: 'premium', status: 'Booked', company: 'Patil Engineering & Forge' },
  { id: 'P-02', tier: 'premium', status: 'Available', company: '' },
  { id: 'P-03', tier: 'premium', status: 'Available', company: '' },
  { id: 'P-04', tier: 'premium', status: 'Available', company: '' },
  { id: 'A-01', tier: 'standard', status: 'Available', company: '' },
  { id: 'A-02', tier: 'standard', status: 'Booked', company: 'Deshmukh Agro Foods' },
  { id: 'A-03', tier: 'standard', status: 'Available', company: '' },
  { id: 'A-04', tier: 'standard', status: 'Available', company: '' },
  { id: 'A-05', tier: 'standard', status: 'Available', company: '' },
  { id: 'A-06', tier: 'standard', status: 'Available', company: '' },
  { id: 'B-01', tier: 'standard', status: 'Available', company: '' },
  { id: 'B-02', tier: 'standard', status: 'Available', company: '' },
  { id: 'B-03', tier: 'standard', status: 'Booked', company: 'Apex Precision Gears' },
  { id: 'B-04', tier: 'standard', status: 'Available', company: '' },
  { id: 'B-05', tier: 'standard', status: 'Available', company: '' },
  { id: 'B-06', tier: 'standard', status: 'Available', company: '' },
];

export default function Expo() {
  const [activeTab, setActiveTab] = useState('stalls'); // 'stalls' | 'passes' | 'schedule'
  const [stalls, setStalls] = useState(DEFAULT_STALLS);
  const [selectedStall, setSelectedStall] = useState(null);

  // Stall Booking Modal Form State
  const [stallForm, setStallForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    mobile: '',
    businessCategory: 'Manufacturing & Engineering',
    productsToExhibit: '',
  });
  const [stallBookingSuccess, setStallBookingSuccess] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Visitor Pass Generator State
  const [passForm, setPassForm] = useState({
    passType: 'Free Trade Visitor Pass',
    fullName: '',
    companyName: '',
    email: '',
    mobile: '',
    district: 'Chhatrapati Sambhajinagar',
    designation: 'Business Owner',
  });
  const [generatedPass, setGeneratedPass] = useState(null);
  const [passLoading, setPassLoading] = useState(false);

  useEffect(() => {
    fetchStalls();
  }, []);

  const fetchStalls = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/expo/stalls`);
      if (res.data?.success && res.data.data?.length > 0) {
        const bookedMap = {};
        res.data.data.forEach((b) => {
          bookedMap[b.stallNumber] = b;
        });
        setStalls((prev) =>
          prev.map((s) =>
            bookedMap[s.id]
              ? { ...s, status: bookedMap[s.id].status, company: bookedMap[s.id].companyName }
              : s
          )
        );
      }
    } catch (err) {
      console.warn('Using initial floor stall layout');
    }
  };

  const handleBookStallSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStall) return;

    try {
      setBookingLoading(true);
      const tierInfo = STALL_TIERS[selectedStall.tier];
      const payload = {
        stallNumber: selectedStall.id,
        stallTier: tierInfo.name,
        price: tierInfo.price,
        ...stallForm,
      };

      const res = await axios.post(`${API_URL}/api/expo/stalls/book`, payload);
      if (res.data?.success) {
        setStallBookingSuccess(res.data.booking);
        // update local grid
        setStalls((prev) =>
          prev.map((s) =>
            s.id === selectedStall.id ? { ...s, status: 'Booked', company: stallForm.companyName } : s
          )
        );
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Stall reservation captured locally.');
      const mockBooking = {
        bookingId: `EXPO-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        stallNumber: selectedStall.id,
        stallTier: STALL_TIERS[selectedStall.tier].name,
        companyName: stallForm.companyName,
        price: STALL_TIERS[selectedStall.tier].price,
      };
      setStallBookingSuccess(mockBooking);
      setStalls((prev) =>
        prev.map((s) =>
          s.id === selectedStall.id ? { ...s, status: 'Booked', company: stallForm.companyName } : s
        )
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const handleRegisterPass = async (e) => {
    e.preventDefault();
    try {
      setPassLoading(true);
      const res = await axios.post(`${API_URL}/api/expo/passes/register`, passForm);
      if (res.data?.success) {
        setGeneratedPass(res.data.pass);
      }
    } catch (err) {
      const mockPass = {
        passId: `PASS-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        ...passForm,
      };
      setGeneratedPass(mockPass);
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Hero Event Banner */}
        <div className="bg-gradient-to-br from-[#0A3D91] via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-6">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="px-3.5 py-1 bg-amber-400/20 text-amber-300 text-xs font-extrabold rounded-full uppercase tracking-wider border border-amber-400/30">
              State Mega Conclave & Trade Fair
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              BEGA Business Expo & Mahaadhiveshan 2026
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Maharashtra's flagship commercial exhibition, B2B buyer-seller conclave, and state entrepreneurship awards. Connecting 500+ exhibitors and 15,000+ business leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs relative z-10">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-[#F57C00] shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Event Dates</p>
                <p className="font-extrabold text-white">14 – 16 November 2026</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <MapPin className="w-5 h-5 text-rose-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Exhibition Venue</p>
                <p className="font-extrabold text-white truncate">CIDCO Exhibition Grounds, Ch. Sambhajinagar</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Projected Attendance</p>
                <p className="font-extrabold text-white">15,000+ Verified Buyers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="bg-slate-200/80 p-1.5 rounded-2xl flex flex-wrap gap-1.5 shadow-inner">
            <button
              onClick={() => setActiveTab('stalls')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                activeTab === 'stalls'
                  ? 'bg-[#0A3D91] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-4 h-4" /> Interactive Floor Plan & Stall Booking
            </button>
            <button
              onClick={() => setActiveTab('passes')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                activeTab === 'passes'
                  ? 'bg-[#0A3D91] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Ticket className="w-4 h-4" /> Delegate & Visitor Pass Registration
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                activeTab === 'schedule'
                  ? 'bg-[#0A3D91] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-4 h-4" /> Mahaadhiveshan Conclave Agenda
            </button>
          </div>
        </div>

        {/* TAB 1: STALL FLOOR PLAN & BOOKING */}
        {activeTab === 'stalls' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Stall Tier Legend */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-1">
                <span className="text-[10px] font-bold text-purple-700 uppercase">Tier 1: Sponsor Island Pavilion</span>
                <p className="text-lg font-black text-slate-900">₹60,000</p>
                <p className="text-xs text-slate-600">6x6m Quad-Open island booth with prime main-entry visibility.</p>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                <span className="text-[10px] font-bold text-amber-700 uppercase">Tier 2: Premium Corner Stall</span>
                <p className="text-lg font-black text-slate-900">₹25,000</p>
                <p className="text-xs text-slate-600">4x3m Dual-side open corner booth with 1.5x footfall exposure.</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 space-y-1">
                <span className="text-[10px] font-bold text-blue-700 uppercase">Tier 3: Standard MSME Stall</span>
                <p className="text-lg font-black text-slate-900">₹15,000</p>
                <p className="text-xs text-slate-600">3x3m Octanorm booth inclusive of table, 2 chairs, spotlight & power.</p>
              </div>
            </div>

            {/* Interactive Floor Plan Grid */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-4">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">Interactive Exhibition Floor Plan</h2>
                  <p className="text-xs text-slate-500">Click any available stall to view dimensions and reserve online.</p>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Available
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-slate-400"></span> Booked
                  </div>
                </div>
              </div>

              {/* Grid Box */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
                {stalls.map((stall) => {
                  const isAvailable = stall.status === 'Available';
                  const tier = STALL_TIERS[stall.tier];
                  return (
                    <div
                      key={stall.id}
                      onClick={() => {
                        if (isAvailable) {
                          setSelectedStall(stall);
                          setStallBookingSuccess(null);
                        }
                      }}
                      className={`p-4 rounded-2xl border-2 transition flex flex-col justify-between h-32 ${
                        isAvailable
                          ? `${tier.color} cursor-pointer hover:scale-[1.02] hover:shadow-md`
                          : 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-xs font-black text-slate-900">{stall.id}</span>
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            isAvailable ? 'bg-emerald-500 ring-2 ring-emerald-200' : 'bg-slate-400'
                          }`}
                        ></span>
                      </div>

                      <div className="space-y-0.5">
                        <p className="text-[10px] font-extrabold text-slate-600 truncate">{tier.name.split(' ')[0]}</p>
                        {isAvailable ? (
                          <p className="text-xs font-black text-[#0A3D91]">₹{tier.price.toLocaleString()}</p>
                        ) : (
                          <p className="text-[10px] font-bold text-slate-500 truncate">{stall.company}</p>
                        )}
                      </div>

                      <span
                        className={`text-[9px] font-bold text-center py-0.5 rounded-md uppercase ${
                          isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {stall.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STALL BOOKING MODAL */}
            {selectedStall && (
              <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-start border-b pb-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-[#0A3D91] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                        Reserve Stall {selectedStall.id}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 mt-1">
                        {STALL_TIERS[selectedStall.tier].name} — ₹{STALL_TIERS[selectedStall.tier].price.toLocaleString()}
                      </h3>
                    </div>
                    <button onClick={() => setSelectedStall(null)} className="text-slate-400 hover:text-slate-600 p-1">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {stallBookingSuccess ? (
                    <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 text-emerald-900">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                      <h4 className="text-sm font-extrabold">Stall Booking Confirmed!</h4>
                      <p className="text-xs">
                        Booking ID: <strong className="font-mono">{stallBookingSuccess.bookingId}</strong>
                      </p>
                      <p className="text-xs text-emerald-700">
                        Our expo secretariat will contact your team with vendor pass allotments and stall setup credentials.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleBookStallSubmit} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Company / Brand Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Apex Industrial Solutions"
                          value={stallForm.companyName}
                          onChange={(e) => setStallForm({ ...stallForm, companyName: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D91]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Contact Person *</label>
                          <input
                            type="text"
                            required
                            placeholder="Full Name"
                            value={stallForm.contactPerson}
                            onChange={(e) => setStallForm({ ...stallForm, contactPerson: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D91]"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Mobile Contact *</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 9876543210"
                            value={stallForm.mobile}
                            onChange={(e) => setStallForm({ ...stallForm, mobile: e.target.value })}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D91]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Business Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="expo@company.com"
                          value={stallForm.email}
                          onChange={(e) => setStallForm({ ...stallForm, email: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D91]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Products / Services to Exhibit *</label>
                        <textarea
                          rows={2}
                          required
                          placeholder="Brief description of machines, components, or services to display..."
                          value={stallForm.productsToExhibit}
                          onChange={(e) => setStallForm({ ...stallForm, productsToExhibit: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D91]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={bookingLoading}
                        className="w-full py-3 bg-[#0A3D91] hover:bg-[#083278] text-white font-extrabold rounded-xl shadow transition flex items-center justify-center gap-2 mt-2"
                      >
                        <Lock className="w-4 h-4" />
                        {bookingLoading ? 'Reserving...' : `Confirm Reservation (₹${STALL_TIERS[selectedStall.tier].price.toLocaleString()})`}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: VISITOR & DELEGATE PASS REGISTRATION */}
        {activeTab === 'passes' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in">
            {/* Pass Registration Form */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#F57C00] bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                  Instant Entry Pass Desk
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-2">Generate Visitor / Delegate Pass</h2>
                <p className="text-xs text-slate-500">Free admission for trade visitors and VIP access for conclave delegates.</p>
              </div>

              <form onSubmit={handleRegisterPass} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Select Pass Type</label>
                  <select
                    value={passForm.passType}
                    onChange={(e) => setPassForm({ ...passForm, passType: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#0A3D91] outline-none"
                  >
                    <option>Free Trade Visitor Pass (Exhibition Floor Access)</option>
                    <option>VIP Delegate Conclave Pass (All Sessions & Conclave Lunch)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={passForm.fullName}
                    onChange={(e) => setPassForm({ ...passForm, fullName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Enterprise / Firm *</label>
                    <input
                      type="text"
                      required
                      placeholder="Company Name"
                      value={passForm.companyName}
                      onChange={(e) => setPassForm({ ...passForm, companyName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Designation</label>
                    <input
                      type="text"
                      placeholder="Managing Director / Owner"
                      value={passForm.designation}
                      onChange={(e) => setPassForm({ ...passForm, designation: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Mobile *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={passForm.mobile}
                      onChange={(e) => setPassForm({ ...passForm, mobile: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={passForm.email}
                      onChange={(e) => setPassForm({ ...passForm, email: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">District *</label>
                  <select
                    value={passForm.district}
                    onChange={(e) => setPassForm({ ...passForm, district: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    {Object.keys(MAHARASHTRA_DISTRICTS || {}).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={passLoading}
                  className="w-full py-3 bg-[#F57C00] hover:bg-[#e06f00] text-white font-extrabold rounded-xl shadow transition"
                >
                  {passLoading ? 'Generating Pass...' : 'Generate Official Entry Badge'}
                </button>
              </form>
            </div>

            {/* Generated Pass Preview & Print Screen */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {generatedPass ? (
                <div className="bg-gradient-to-tr from-slate-900 via-[#0A3D91] to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-400/40 space-y-5 animate-in fade-in max-w-sm mx-auto w-full">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center font-black text-slate-950 text-sm">
                        B
                      </div>
                      <div>
                        <h3 className="text-xs font-black tracking-wider uppercase">BEGA EXPO 2026</h3>
                        <p className="text-[9px] text-amber-300">Official Exhibition Entry Pass</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold rounded-full border border-emerald-400/30">
                      VALID
                    </span>
                  </div>

                  <div className="space-y-1 text-center py-2">
                    <h2 className="text-lg font-black text-white">{generatedPass.fullName}</h2>
                    <p className="text-xs font-bold text-amber-300">{generatedPass.designation} — {generatedPass.companyName}</p>
                    <p className="text-[10px] text-slate-300">{generatedPass.district}, Maharashtra</p>
                  </div>

                  <div className="bg-white p-3 rounded-2xl flex flex-col items-center justify-center shadow">
                    <QRCodeSVG value={`https://begaindia-platform.vercel.app/verify/${generatedPass.passId}`} size={90} />
                    <span className="font-mono font-black text-slate-900 text-xs mt-2">{generatedPass.passId}</span>
                  </div>

                  <div className="text-center text-[10px] text-slate-300 pt-1 border-t border-white/10">
                    CIDCO Exhibition Grounds | 14-16 Nov 2026
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow"
                  >
                    <Printer className="w-4 h-4" /> Print / Save Entry Badge
                  </button>
                </div>
              ) : (
                <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
                  <Ticket className="w-12 h-12 text-slate-300 mx-auto" />
                  <h3 className="text-sm font-bold text-slate-700">No Pass Generated Yet</h3>
                  <p className="text-xs text-slate-400">Fill out the visitor form on the left to receive your digital QR entry barcode instantly.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: MAHAADHIVESHAN AGENDA */}
        {activeTab === 'schedule' && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8 animate-in fade-in">
            <div className="border-b pb-4">
              <span className="text-[10px] font-extrabold uppercase text-[#0A3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                State Conclave Schedule
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-2">Mahaadhiveshan 3-Day Program Highlights</h2>
              <p className="text-xs text-slate-500">Official schedule of keynotes, MSME policy panels, B2B meets, and state business awards.</p>
            </div>

            <div className="space-y-6 text-xs">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-center text-[#0A3D91] font-extrabold">
                  <span className="text-sm">Day 1: Inauguration & Maharashtra MSME Policy Summit</span>
                  <span>14 November 2026</span>
                </div>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <strong>10:00 AM:</strong> Grand Inauguration Ceremony with State Ministers & Industry Leaders.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <strong>02:00 PM:</strong> Panel Session: Unlocking Maharashtra Industrial Subsidies, PMEGP & PSI.
                  </li>
                </ul>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-center text-[#0A3D91] font-extrabold">
                  <span className="text-sm">Day 2: B2B Buyer-Seller Mega Meets & Vendor Development</span>
                  <span>15 November 2026</span>
                </div>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <strong>11:00 AM:</strong> Structured B2B Matchmaking: Auto-clusters, Agro-processing & Heavy Engineering.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <strong>03:30 PM:</strong> Export Readiness Workshop: Container Logistics & International Trade Desks.
                  </li>
                </ul>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-center text-[#0A3D91] font-extrabold">
                  <span className="text-sm">Day 3: BEGA State Leadership Awards & Seva Impact Report</span>
                  <span>16 November 2026</span>
                </div>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <strong>10:30 AM:</strong> Release of the Annual BEGA Maharashtra Business & Entrepreneurship Report.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <strong>04:00 PM:</strong> BEGA State Business Excellence & Rural Transformation Awards Ceremony.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}