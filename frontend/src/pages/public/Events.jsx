import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight, ShieldCheck, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Events() {
  const events = [
    {
      id: 1,
      title: 'National MSME Growth & Innovation Conclave 2026',
      date: 'August 25, 2026',
      time: '10:00 AM - 05:00 PM',
      location: 'Chhatrapati Sambhajinagar, Maharashtra',
      type: 'Summit & Conclave',
      description: 'Interactive keynote sessions with industrial leaders, investor pitching panels, and high-value B2B networking sessions.',
    },
    {
      id: 2,
      title: 'B2B Founders & Traders Regional Meetup',
      date: 'September 10, 2026',
      time: '02:00 PM - 07:00 PM',
      location: 'Mumbai, Maharashtra',
      type: 'Networking Meet',
      description: 'Structured 1-on-1 business matching designed to help manufacturers, suppliers, and distributors collaborate.',
    },
    {
      id: 3,
      title: 'Digital Transformation & AI for Indian MSMEs',
      date: 'September 18, 2026',
      time: '04:00 PM - 06:00 PM',
      location: 'Online Webinar (Zoom)',
      type: 'Webinar',
      description: 'Mastering digital marketing funnels, automated customer acquisition, and modern technology adoption.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 font-sans">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="px-3 py-1 bg-orange-100 text-[#F57C00] rounded-full text-xs font-bold uppercase tracking-widest">
          BEGAINDIA Summits
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Upcoming Networking Events</h1>
        <p className="text-xs sm:text-sm text-slate-600">Register for events, claim your QR Pass, and expand your business connections.</p>
      </div>

      <div className="space-y-6">
        {events.map((evt) => (
          <div key={evt.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:shadow-md transition">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-blue-50 text-[#0A3D91] text-[10px] font-bold rounded-full uppercase">{evt.type}</span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {evt.date}</span>
              </div>

              <h2 className="text-lg font-bold text-slate-900">{evt.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{evt.description}</p>

              <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {evt.time}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {evt.location}</span>
              </div>
            </div>

            <Link
              to="/register"
              className="w-full md:w-auto px-6 py-3 bg-[#F57C00] hover:bg-[#e06f00] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shrink-0 shadow-sm"
            >
              <QrCode className="w-4 h-4" />
              Register & Get Pass
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}