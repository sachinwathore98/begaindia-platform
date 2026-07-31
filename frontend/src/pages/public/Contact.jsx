import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 font-sans">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="px-3 py-1 bg-blue-100 text-[#0A3D91] rounded-full text-xs font-bold uppercase tracking-widest">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">We are Here to Help You Grow</h1>
        <p className="text-xs sm:text-sm text-slate-600">Have questions about memberships, sponsorship, or business directory verification?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Info Box */}
        <div className="md:col-span-5 bg-[#0A3D91] text-white p-8 rounded-3xl space-y-6 shadow-xl">
          <h2 className="text-xl font-bold">BEGAINDIA Network HQ</h2>
          <p className="text-xs text-slate-200 leading-relaxed">
            Reach out to our support team or visit our office for partnership discussions.
          </p>

          <div className="space-y-4 pt-4 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#F57C00] shrink-0" />
              <span>Chhatrapati Sambhajinagar (Aurangabad), Maharashtra, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#F57C00] shrink-0" />
              <span>support@begaindia.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#F57C00] shrink-0" />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">Thank You!</h3>
              <p className="text-xs text-slate-600">Your message has been received. Our team will contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#0A3D91] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                  <input required type="tel" placeholder="+91 9876543210" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#0A3D91] outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input required type="email" placeholder="name@company.com" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#0A3D91] outline-none" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message / Inquiry</label>
                <textarea required rows={4} placeholder="How can we assist your business?" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#0A3D91] outline-none" />
              </div>

              <button type="submit" className="w-full py-3 bg-[#F57C00] hover:bg-[#e06f00] text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}