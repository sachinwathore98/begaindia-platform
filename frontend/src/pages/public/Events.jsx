import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, QrCode, CheckCircle2, ShieldCheck, UserCheck } from 'lucide-react';

export default function Events() {
  const { user, token } = useSelector((state) => state.auth);
  const isAuthenticated = Boolean(token && user);
  const navigate = useNavigate();

  // State to track passes claimed during this session
  const [claimedPasses, setClaimedPasses] = useState([]);

  const events = [
    {
      id: 'EVT-101',
      title: 'National MSME Growth & Innovation Conclave 2026',
      date: 'August 25, 2026',
      time: '10:00 AM - 05:00 PM',
      location: 'Chhatrapati Sambhajinagar, Maharashtra',
      type: 'Summit & Conclave',
      description: 'Interactive keynote sessions with industrial leaders, investor pitching panels, and high-value B2B networking sessions.',
    },
    {
      id: 'EVT-102',
      title: 'B2B Founders & Traders Regional Meetup',
      date: 'September 10, 2026',
      time: '02:00 PM - 07:00 PM',
      location: 'Mumbai, Maharashtra',
      type: 'Networking Meet',
      description: 'Structured 1-on-1 business matching designed to help manufacturers, suppliers, and distributors collaborate.',
    },
    {
      id: 'EVT-103',
      title: 'Digital Transformation & AI for Indian MSMEs',
      date: 'September 18, 2026',
      time: '04:00 PM - 06:00 PM',
      location: 'Online Webinar (Zoom)',
      type: 'Webinar',
      description: 'Mastering digital marketing funnels, automated customer acquisition, and modern technology adoption.',
    },
  ];

  const handleAction = (eventId) => {
    if (!isAuthenticated) {
      // Unauthenticated public visitors must register/login first
      navigate('/login');
      return;
    }

    // Logged-in users directly claim the pass without re-registering
    if (!claimedPasses.includes(eventId)) {
      setClaimedPasses([...claimedPasses, eventId]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 font-sans">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="px-3 py-1 bg-orange-100 text-[#F57C00] rounded-full text-xs font-bold uppercase tracking-widest">
          BEGAINDIA Summits
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Upcoming Networking Events
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {isAuthenticated
            ? `Welcome back, ${user?.name}! Select any event below to directly claim your QR pass.`
            : 'Register for events, claim your QR Pass, and expand your business connections.'}
        </p>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {events.map((evt) => {
          const isPassClaimed = claimedPasses.includes(evt.id);

          return (
            <div
              key={evt.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:shadow-md transition"
            >
              {/* Event Details */}
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-blue-50 text-[#0A3D91] text-[10px] font-bold rounded-full uppercase">
                    {evt.type}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {evt.date}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900">{evt.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed">{evt.description}</p>

                <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {evt.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {evt.location}
                  </span>
                </div>
              </div>

              {/* Action Button Section */}
              <div className="w-full md:w-auto shrink-0 space-y-2 text-center">
                {isPassClaimed ? (
                  /* State 1: Pass Already Generated */
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2 text-center">
                    <span className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Pass Confirmed
                    </span>
                    <Link
                      to="/dashboard"
                      className="inline-block px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-xl transition"
                    >
                      View Pass in Dashboard
                    </Link>
                  </div>
                ) : (
                  /* State 2: Dynamic Action Button based on Authentication */
                  <button
                    onClick={() => handleAction(evt.id)}
                    className={`w-full md:w-auto px-6 py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm ${
                      isAuthenticated
                        ? 'bg-[#0A3D91] hover:bg-[#083278] text-white'
                        : 'bg-[#F57C00] hover:bg-[#e06f00] text-white'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    {isAuthenticated ? 'Get Pass' : 'Register & Get Pass'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}