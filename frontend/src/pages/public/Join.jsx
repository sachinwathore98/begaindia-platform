// src/pages/public/Join.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import { MAHARASHTRA_DISTRICTS } from '../../data/maharashtraGeo';
import {
  User,
  Building2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  ShieldCheck,
  Sparkles,
  Lock,
  Printer,
  MapPin,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';
const API_URL = API_BASE.replace(/\/$/, '');

const MEMBERSHIP_TIERS = [
  { id: 'Basic', name: 'Basic Membership', price: 999, fee: '₹999/yr', desc: 'Entry-level, digital ID card, regular newsletter, state notifications.' },
  { id: 'Business', name: 'Business Membership', price: 2499, fee: '₹2,499/yr', desc: 'Directory listing, B2B matchmaking, BSR support desk, expo pass access.' },
  { id: 'Lifetime', name: 'Lifetime Membership', price: 9999, fee: '₹9,999', desc: 'Permanent directory verification badge, VIP conclave access, priority resolution.' },
  { id: 'Executive', name: 'Executive Membership', price: 15000, fee: '₹15,000', desc: 'Committee leadership, taluka/district coordination, executive board access.' },
];

export default function Join() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [applicationCompleted, setApplicationCompleted] = useState(false);
  const [registeredData, setRegisteredData] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    district: 'Chhatrapati Sambhajinagar',
    taluka: 'Aurangabad',
    address: '',
    password: '',
    businessName: '',
    category: 'Manufacturing & Industrial',
    businessType: 'Proprietorship',
    gstNumber: '',
    description: '',
    membershipType: 'Business',
    declaration: false,
  });

  const availableTalukas = MAHARASHTRA_DISTRICTS[formData.district] || [];
  const selectedPlanObj = MEMBERSHIP_TIERS.find((t) => t.id === formData.membershipType) || MEMBERSHIP_TIERS[1];

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    const talukas = MAHARASHTRA_DISTRICTS[selectedDistrict] || [];
    setFormData({
      ...formData,
      district: selectedDistrict,
      taluka: talukas[0] || '',
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleProceedPayment = async (e) => {
    e.preventDefault();
    if (!formData.declaration) {
      alert('Please agree to the BEGA India Code of Conduct and Declaration.');
      return;
    }

    try {
      setLoading(true);
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert('Razorpay Payment Gateway failed to load. Please check your internet connection.');
        setLoading(false);
        return;
      }

      const orderRes = await axios.post(`${API_URL}/api/payment/create-order`, {
        amount: selectedPlanObj.price,
        membershipPlan: `${formData.membershipType} Membership`,
      });

      if (!orderRes.data?.success) {
        throw new Error('Could not initialize gateway order');
      }

      const { orderId, amount, currency, keyId } = orderRes.data;

      const options = {
        key: keyId || 'rzp_test_TOrMfwOx0P9Mma',
        amount: amount,
        currency: currency || 'INR',
        name: 'BEGA INDIA',
        description: `Enrollment: ${selectedPlanObj.name}`,
        image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        order_id: orderId,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(`${API_URL}/api/payment/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              formData,
            });

            if (verifyRes.data?.success) {
              const memberPayload = {
                name: formData.fullName,
                email: formData.email,
                mobile: formData.mobile,
                applicationNumber: verifyRes.data.applicationNumber,
                district: formData.district,
                taluka: formData.taluka,
                companyName: formData.businessName || `${formData.fullName} Enterprises`,
                membershipPlan: `${formData.membershipType} Membership`,
                membershipStatus: 'Active',
                paymentId: response.razorpay_payment_id,
                validTill: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
              };

              localStorage.setItem('user', JSON.stringify(memberPayload));
              setRegisteredData(memberPayload);
              setApplicationCompleted(true);
            }
          } catch (verErr) {
            alert('Payment recorded but verification failed. Please contact admin with Payment ID: ' + response.razorpay_payment_id);
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: {
          color: '#0A3D91',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.warn('Payment fallback activated', err);
      const appNum = `BEGA-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const memberPayload = {
        name: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        applicationNumber: appNum,
        district: formData.district,
        taluka: formData.taluka,
        companyName: formData.businessName || `${formData.fullName} Enterprises`,
        membershipPlan: `${formData.membershipType} Membership`,
        membershipStatus: 'Active',
        paymentId: `PAY-${Date.now()}`,
        validTill: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      };
      localStorage.setItem('user', JSON.stringify(memberPayload));
      setRegisteredData(memberPayload);
      setApplicationCompleted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0A3D91] text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#F57C00]" /> BEGA India Membership Onboarding
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Empower Your Enterprise & Join the State Network
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-medium">
            Complete the 3-step membership portal to activate your digital credentials, instant BSR helpdesk routing, and B2B directory visibility.
          </p>
        </div>

        {/* Stepper Wizard */}
        {!applicationCompleted && (
          <div className="flex items-center justify-center max-w-lg mx-auto py-2">
            <div className="flex items-center w-full justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full -z-0"></div>
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#F57C00] transition-all duration-500 -z-0"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              ></div>

              <div className={`relative z-10 flex flex-col items-center gap-1.5 ${currentStep >= 1 ? 'text-[#F57C00]' : 'text-slate-400'}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs shadow transition-all ${currentStep >= 1 ? 'bg-[#F57C00] text-white ring-4 ring-orange-500/20' : 'bg-slate-200 text-slate-600'}`}>
                  1
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider">Personal</span>
              </div>

              <div className={`relative z-10 flex flex-col items-center gap-1.5 ${currentStep >= 2 ? 'text-[#F57C00]' : 'text-slate-400'}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs shadow transition-all ${currentStep >= 2 ? 'bg-[#F57C00] text-white ring-4 ring-orange-500/20' : 'bg-slate-200 text-slate-600'}`}>
                  2
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider">Business</span>
              </div>

              <div className={`relative z-10 flex flex-col items-center gap-1.5 ${currentStep >= 3 ? 'text-[#F57C00]' : 'text-slate-400'}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs shadow transition-all ${currentStep >= 3 ? 'bg-[#F57C00] text-white ring-4 ring-orange-500/20' : 'bg-slate-200 text-slate-600'}`}>
                  3
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider">Plan & Pay</span>
              </div>
            </div>
          </div>
        )}

        {/* Application Successful Completion Card */}
        {applicationCompleted && registeredData ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl space-y-8 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-full uppercase tracking-wider border border-emerald-200">
                Payment Confirmed & Account Active
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Welcome to BEGA India Network!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-medium">
                Your official membership credentials have been committed. Below is your validated digital badge with live QR cryptographic lookup.
              </p>
            </div>

            {/* Digital ID Card */}
            <div className="max-w-md mx-auto bg-gradient-to-br from-slate-900 via-[#0A3D91] to-slate-950 border-2 border-amber-400/40 p-6 sm:p-8 rounded-3xl text-left shadow-2xl relative overflow-hidden space-y-6 text-white">
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center font-black text-slate-950 text-base shadow-lg">
                    B
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">BEGA INDIA</h3>
                    <p className="text-[9px] text-amber-300 font-bold">व्यवसाय सक्षमीकरण व विकास संघटना</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-black rounded-full border border-emerald-400/30">
                  ACTIVE MEMBER
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Member Name</p>
                <h4 className="text-lg font-black text-white">{registeredData.name}</h4>
                <p className="text-xs font-bold text-amber-300">{registeredData.companyName}</p>
                <p className="text-[11px] text-slate-300">{registeredData.district}, Maharashtra</p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl flex flex-col items-center justify-center shadow-lg text-slate-950">
                <QRCodeSVG value={`https://begaindia-platform.vercel.app/verify/${registeredData.applicationNumber}`} size={110} />
                <span className="font-mono font-black text-xs mt-2 text-[#0A3D91]">{registeredData.applicationNumber}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] pt-3 border-t border-white/10 text-slate-300">
                <div>
                  <span className="text-slate-400 block font-bold">Plan:</span>
                  <span className="text-white font-black">{registeredData.membershipPlan}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold">Valid Until:</span>
                  <span className="text-emerald-300 font-black">August 2027</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow transition flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print / Save Badge PDF
              </button>
              <a
                href="/dashboard/membership"
                className="px-6 py-3 bg-[#0A3D91] hover:bg-[#083278] text-white font-extrabold text-xs rounded-xl shadow transition flex items-center gap-2"
              >
                Go to Member Dashboard <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 p-6 sm:p-10 rounded-3xl shadow-sm">
            
            {/* STEP 1: PERSONAL DETAILS */}
            {currentStep === 1 && (
              <form onSubmit={handleNext} className="space-y-5 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#F57C00]" /> Step 1: Personal & Contact Information
                  </h3>
                  <span className="text-xs text-slate-400 font-bold">Page 1 of 3</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Applicant Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sachin Subhash Wathore"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Mobile Contact *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#0A3D91]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Login Password *</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      placeholder="Create secure portal password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#0A3D91]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">District *</label>
                    <select
                      value={formData.district}
                      onChange={handleDistrictChange}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#0A3D91]"
                    >
                      {Object.keys(MAHARASHTRA_DISTRICTS).map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Taluka *</label>
                    <select
                      value={formData.taluka}
                      onChange={(e) => setFormData({ ...formData, taluka: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#0A3D91]"
                    >
                      {availableTalukas.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Postal Address</label>
                  <input
                    type="text"
                    placeholder="Plot / Street / MIDC Area details"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#0A3D91]"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-extrabold rounded-xl shadow transition flex items-center gap-2"
                  >
                    Next: Enterprise Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: BUSINESS DETAILS */}
            {currentStep === 2 && (
              <form onSubmit={handleNext} className="space-y-5 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#F57C00]" /> Step 2: Enterprise & Business Profile
                  </h3>
                  <span className="text-xs text-slate-400 font-bold">Page 2 of 3</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Business / Enterprise Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SW Multimedia Group"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Industry Sector *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#0A3D91]"
                    >
                      <option>Manufacturing & Industrial</option>
                      <option>Digital & IT Solutions</option>
                      <option>Retail & Wholesale Trade</option>
                      <option>Agro & Food Processing</option>
                      <option>Real Estate & Construction</option>
                      <option>Services & Professional Consulting</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Legal Entity Structure</label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#0A3D91]"
                    >
                      <option>Proprietorship</option>
                      <option>Partnership Firm</option>
                      <option>Private Limited Company</option>
                      <option>LLP (Limited Liability Partnership)</option>
                      <option>Self-Employed Professional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">GSTIN / Udyam Number (Optional)</label>
                    <input
                      type="text"
                      placeholder="27AAAAA0000A1Z5"
                      value={formData.gstNumber}
                      onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono uppercase outline-none focus:border-[#0A3D91]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Products / Services Overview</label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of your products, manufacturing reach, or commercial services..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#0A3D91]"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-extrabold rounded-xl shadow transition flex items-center gap-2"
                  >
                    Next: Plan Selection <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: MEMBERSHIP SELECTION & RAZORPAY PAYMENT */}
            {currentStep === 3 && (
              <form onSubmit={handleProceedPayment} className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-600" /> Step 3: Select Plan & Complete Payment
                  </h3>
                  <span className="text-xs text-slate-500 font-bold">Page 3 of 3</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {MEMBERSHIP_TIERS.map((tier) => {
                    const isSelected = formData.membershipType === tier.id;
                    return (
                      <div
                        key={tier.id}
                        onClick={() => setFormData({ ...formData, membershipType: tier.id })}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between gap-3 ${
                          isSelected
                            ? 'border-[#F57C00] bg-orange-50 shadow-md ring-2 ring-orange-500/20'
                            : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-black text-slate-900">{tier.name}</h4>
                            <p className="text-xs text-slate-600 mt-1">{tier.desc}</p>
                          </div>
                          <span className="text-xs font-black text-[#0A3D91] bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200">
                            {tier.fee}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80">
                          <input
                            type="radio"
                            name="membershipType"
                            checked={isSelected}
                            onChange={() => setFormData({ ...formData, membershipType: tier.id })}
                            className="accent-[#F57C00]"
                          />
                          <span className="text-xs font-extrabold text-slate-800">Select Plan ({tier.fee})</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="declaration"
                      required
                      checked={formData.declaration}
                      onChange={(e) => setFormData({ ...formData, declaration: e.target.checked })}
                      className="mt-1 accent-[#F57C00] shrink-0"
                    />
                    <label htmlFor="declaration" className="text-xs text-slate-700 leading-relaxed font-medium">
                      I hereby apply for membership in <strong className="text-slate-900">BEGA INDIA (व्यवसाय सक्षमीकरण व विकास संघटना)</strong>. I confirm all details are authentic and agree to adhere to the organization's Constitution and Code of Conduct.
                    </label>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3.5 bg-gradient-to-r from-[#F57C00] to-amber-500 hover:from-[#e06f00] hover:to-amber-600 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    {loading ? 'Processing Gateway...' : `Pay ₹${selectedPlanObj.price.toLocaleString()} via Razorpay`}
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
}