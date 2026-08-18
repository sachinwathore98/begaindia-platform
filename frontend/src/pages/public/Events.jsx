import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import { MAHARASHTRA_DISTRICTS } from '../../data/maharashtraGeo';
import {
  Calendar,
  MapPin,
  Clock,
  Ticket,
  Store,
  Landmark,
  GraduationCap,
  Users,
  CheckCircle2,
  Printer,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';

const EVENT_FILTERS = [
  'All',
  'BEGA Mahaadhiveshan',
  'BEGA Business Expo',
  'B2B Meet',
  'State Seminar',
  'District Training',
];

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  // Attendee Pass Registration Modal
  const [selectedEventForPass, setSelectedEventForPass] = useState(null);
  const [passForm, setPassForm] = useState({ fullName: '', email: '', mobile: '', companyName: '' });
  const [generatedPass, setGeneratedPass] = useState(null);
  const [passLoading, setPassLoading] = useState(false);

  // Stall Booking Modal
  const [selectedEventForStall, setSelectedEventForStall] = useState(null);
  const [selectedStallNumber, setSelectedStallNumber] = useState('');
  const [stallForm, setStallForm] = useState({ companyName: '', email: '' });
  const [stallSuccess, setStallSuccess] = useState('');
  const [stallLoading, setStallLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [selectedType, selectedDistrict]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedType !== 'All') params.append('eventType', selectedType);
      if (selectedDistrict !== 'All') params.append('district', selectedDistrict);

      const res = await axios.get(`${API_URL}/api/events?${params.toString()}`);
      if (res.data.success) {
        setEvents(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterPass = async (e) => {
    e.preventDefault();
    try {
      setPassLoading(true);
      const res = await axios.post(`${API_URL}/api/events/${selectedEventForPass._id}/register`, passForm);
      if (res.data.success) {
        setGeneratedPass(res.data.pass);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed.');
    } finally {
      setPassLoading(false);
    }
  };

  const handleBookStall = async (e) => {
    e.preventDefault();
    if (!selectedStallNumber) {
      alert('Please choose a stall number.');
      return;
    }
    try {
      setStallLoading(true);
      const res = await axios.post(`${API_URL}/api/events/${selectedEventForStall._id}/book-stall`, {
        stallNumber: selectedStallNumber,
        companyName: stallForm.companyName,
        email: stallForm.email,
      });
      if (res.data.success) {
        setStallSuccess(res.data.message);
        fetchEvents();
        setTimeout(() => {
          setStallSuccess('');
          setSelectedEventForStall(null);
        }, 3000);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Stall booking failed.');
    } finally {
      setStallLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-blue-100 text-[#0A3D91] text-xs font-extrabold rounded-full uppercase tracking-wider">
            Events & Conventions
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Conclaves, Expos & Regional Meets[cite: 7]
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Explore state-level conventions, commercial business expos, B2B buyer-seller meets, and regional training programs[cite: 7, 8].
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-center">
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {EVENT_FILTERS.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedType === type
                    ? 'bg-[#0A3D91] text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
            >
              <option value="All">All Districts</option>
              {Object.keys(MAHARASHTRA_DISTRICTS).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0A3D91]"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-2">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">No Scheduled Events Found</h3>
            <p className="text-xs">Try selecting a different event type or clearing regional filters[cite: 2, 4].</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {events.map((evt) => (
              <div
                key={evt._id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#0A3D91] transition flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex justify-between items-start gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-[#0A3D91] text-[11px] font-extrabold rounded-full border border-blue-100 uppercase tracking-wider">
                      {evt.eventType}
                    </span>
                    <span className="text-xs font-extrabold text-[#F57C00] bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100">
                      {evt.isFree ? 'Free Pass' : `Pass: ₹${evt.registrationFee}`}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      Theme: "{evt.theme}"[cite: 7]
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#0A3D91] shrink-0" />
                      <span className="font-bold text-slate-800">
                        {new Date(evt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#0A3D91] shrink-0" />
                      <span>{evt.time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#F57C00] shrink-0" />
                      <span className="truncate">{evt.venue}, {evt.district}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="bg-slate-50 p-4 border-t border-slate-100 flex flex-wrap gap-2 justify-end">
                  {evt.stalls && evt.stalls.length > 0 && (
                    <button
                      onClick={() => {
                        setSelectedEventForStall(evt);
                        setSelectedStallNumber('');
                      }}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                    >
                      <Store className="w-4 h-4 text-amber-400" /> Book Expo Stall[cite: 7]
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setSelectedEventForPass(evt);
                      setGeneratedPass(null);
                    }}
                    className="px-6 py-2.5 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-extrabold rounded-xl shadow transition flex items-center gap-1.5"
                  >
                    <Ticket className="w-4 h-4" /> Claim Entry Pass[cite: 7]
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PASS REGISTRATION MODAL */}
        {selectedEventForPass && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-[#0A3D91]" />
                  Delegate Pass Registration[cite: 7]
                </h3>
                <button
                  onClick={() => setSelectedEventForPass(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              {generatedPass ? (
                <div className="space-y-4 text-center">
                  <div className="p-6 bg-gradient-to-br from-[#0A3D91] to-slate-900 text-white rounded-3xl border-2 border-amber-400/40 space-y-4 shadow-xl">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">BEGA Pass</span>
                      <span className="text-[10px] font-mono text-slate-300">{generatedPass.passId}</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-base font-extrabold text-white leading-tight">{generatedPass.eventTitle}</h4>
                      <p className="text-xs text-amber-300 font-bold">{generatedPass.attendeeName}</p>
                      <p className="text-[11px] text-slate-300">{generatedPass.companyName}</p>
                    </div>

                    <div className="bg-white p-3 rounded-2xl w-fit mx-auto shadow">
                      <QRCodeSVG value={generatedPass.passId} size={110} level="H" />
                    </div>

                    <div className="text-[10px] text-slate-300 space-y-0.5 border-t border-white/10 pt-2">
                      <p className="font-semibold">{generatedPass.venue}</p>
                      <p>{generatedPass.time}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4 text-amber-400" /> Print / Save PDF Pass
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegisterPass} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={passForm.fullName}
                      onChange={(e) => setPassForm({ ...passForm, fullName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Company / Enterprise Name</label>
                    <input
                      type="text"
                      placeholder="Your business name"
                      value={passForm.companyName}
                      onChange={(e) => setPassForm({ ...passForm, companyName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
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
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D91]"
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
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D91]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={passLoading}
                    className="w-full py-3 bg-[#0A3D91] hover:bg-[#083278] text-white font-extrabold rounded-xl shadow transition mt-2 disabled:opacity-50"
                  >
                    {passLoading ? 'Generating...' : 'Confirm Registration & Download Pass'}[cite: 7]
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* STALL BOOKING MODAL */}
        {selectedEventForStall && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Store className="w-5 h-5 text-amber-600" />
                  Commercial Stall Booking[cite: 7]
                </h3>
                <button
                  onClick={() => setSelectedEventForStall(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              {stallSuccess ? (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-xs text-center font-bold">
                  {stallSuccess}
                </div>
              ) : (
                <form onSubmit={handleBookStall} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Select Available Stall *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedEventForStall.stalls.map((s) => (
                        <div
                          key={s.stallNumber}
                          onClick={() => !s.isBooked && setSelectedStallNumber(s.stallNumber)}
                          className={`p-2.5 rounded-xl border-2 text-center cursor-pointer transition ${
                            s.isBooked
                              ? 'bg-slate-100 border-slate-200 opacity-50 cursor-not-allowed'
                              : selectedStallNumber === s.stallNumber
                              ? 'border-[#0A3D91] bg-blue-50'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <p className="font-extrabold">{s.stallNumber}</p>
                          <p className="text-[10px] text-slate-500">{s.category}</p>
                          <p className="text-[10px] font-bold text-[#0A3D91]">₹{s.price}</p>
                          {s.isBooked && <span className="text-[9px] text-rose-600 font-bold">Booked</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Company / Exhibitor Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Manufacturing Ltd."
                      value={stallForm.companyName}
                      onChange={(e) => setStallForm({ ...stallForm, companyName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Official Contact Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="exhibits@company.com"
                      value={stallForm.email}
                      onChange={(e) => setStallForm({ ...stallForm, email: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={stallLoading}
                    className="w-full py-3 bg-[#F57C00] hover:bg-[#e06f00] text-white font-extrabold rounded-xl shadow transition mt-2 disabled:opacity-50"
                  >
                    {stallLoading ? 'Reserving...' : 'Reserve Selected Stall'}[cite: 7]
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}