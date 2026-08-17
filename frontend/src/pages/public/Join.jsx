import React, { useState } from 'react';
import axios from 'axios';
import { MAHARASHTRA_DISTRICTS } from '../../data/maharashtraGeo';
import DigitalIDCard from '../../components/membership/DigitalIDCard';
import {
  User,
  Building2,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  CreditCard,
  Sparkles,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';

const MEMBERSHIP_TIERS = [
  { id: 'Basic', name: 'Basic Membership', fee: '₹999/yr', desc: 'Entry-level, digital ID, networking meets, and updates.' },
  { id: 'Business', name: 'Business Membership', fee: '₹2,499/yr', desc: 'Directory listing, B2B matchmaking, and expo pass discounts.' },
  { id: 'Lifetime', name: 'Lifetime Membership', fee: '₹9,999', desc: 'Permanent directory badge, VIP conclave access, and priority support.' },
  { id: 'Executive', name: 'Executive Membership', fee: 'By Appointment', desc: 'Committee leadership, taluka/district coordination responsibilities.' },
];

export default function Join() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [applicationCompleted, setApplicationCompleted] = useState(false);
  const [registeredData, setRegisteredData] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    fullName: '',
    email: '',
    mobile: '',
    district: 'Chhatrapati Sambhajinagar',
    taluka: 'Aurangabad',
    address: '',
    password: '',

    // Step 2: Business Info
    businessName: '',
    category: 'Digital & IT',
    businessType: 'Private Limited / Proprietorship',
    gstNumber: '',
    description: '',

    // Step 3: Membership Tier & Verification
    membershipType: 'Business',
    declaration: false,
  });

  const availableTalukas = MAHARASHTRA_DISTRICTS[formData.district] || [];

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

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!formData.declaration) {
      alert('Please agree to the BEGA India Code of Conduct and Declaration.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/membership/apply`, formData);

      if (res.data.success) {
        setRegisteredData({
          name: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          applicationNumber: res.data.applicationNumber,
          district: formData.district,
          taluka: formData.taluka,
          companyName: formData.businessName,
          membershipPlan: `${formData.membershipType} Membership`,
        });
        setApplicationCompleted(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Application submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="px-3 py-1 bg-blue-100 text-[#0A3D91] text-xs font-extrabold rounded-full uppercase tracking-wider">
            Online Membership Onboarding[cite: 5, 7]
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Join BEGA India — Empower Your Enterprise[cite: 7]
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Complete the 3-step application form to receive your verified Application Number and Digital Identity Card[cite: 2, 4, 7].
          </p>
        </div>

        {/* Stepper Progress Bar */}
        {!applicationCompleted && (
          <div className="flex items-center justify-center max-w-xl mx-auto">
            <div className="flex items-center w-full justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full -z-0"></div>
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#0A3D91] transition-all duration-300 -z-0"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              ></div>

              {/* Step 1 */}
              <div className={`relative z-10 flex flex-col items-center gap-1 ${currentStep >= 1 ? 'text-[#0A3D91]' : 'text-slate-400'}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${currentStep >= 1 ? 'bg-[#0A3D91] text-white' : 'bg-slate-200 text-slate-500'}`}>
                  1
                </div>
                <span className="text-[10px] font-bold uppercase">Personal Details[cite: 2, 4]</span>
              </div>

              {/* Step 2 */}
              <div className={`relative z-10 flex flex-col items-center gap-1 ${currentStep >= 2 ? 'text-[#0A3D91]' : 'text-slate-400'}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${currentStep >= 2 ? 'bg-[#0A3D91] text-white' : 'bg-slate-200 text-slate-500'}`}>
                  2
                </div>
                <span className="text-[10px] font-bold uppercase">Business Details</span>
              </div>

              {/* Step 3 */}
              <div className={`relative z-10 flex flex-col items-center gap-1 ${currentStep >= 3 ? 'text-[#0A3D91]' : 'text-slate-400'}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${currentStep >= 3 ? 'bg-[#0A3D91] text-white' : 'bg-slate-200 text-slate-500'}`}>
                  3
                </div>
                <span className="text-[10px] font-bold uppercase">Plan & Review[cite: 6, 7]</span>
              </div>
            </div>
          </div>
        )}

        {/* Application Successful Completion Card */}
        {applicationCompleted ? (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-8 text-center animate-in fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Application Submitted Successfully![cite: 7]
              </h2>
              <p className="text-xs text-slate-500">
                Your application has been registered with BEGA India. You can now use your Digital Identity Card[cite: 7].
              </p>
            </div>

            {/* Generated Member Card Display */}
            <DigitalIDCard memberData={registeredData} />
          </div>
        ) : (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md">
            
            {/* STEP 1: PERSONAL & LOCATION DETAILS */}
            {currentStep === 1 && (
              <form onSubmit={handleNext} className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
                  <User className="w-5 h-5 text-[#0A3D91]" />
                  Step 1: Personal & Contact Information[cite: 2, 4]
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name (Applicant) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Subhash Patil"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Account Password *</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      placeholder="Create login password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">District *</label>
                    <select
                      value={formData.district}
                      onChange={handleDistrictChange}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    >
                      {Object.keys(MAHARASHTRA_DISTRICTS).map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Taluka *</label>
                    <select
                      value={formData.taluka}
                      onChange={(e) => setFormData({ ...formData, taluka: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    >
                      {availableTalukas.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Complete Residential/Postal Address</label>
                  <input
                    type="text"
                    placeholder="Plot / Street / Area details"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
                  >
                    Next: Business Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: BUSINESS & GST DETAILS */}
            {currentStep === 2 && (
              <form onSubmit={handleNext} className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
                  <Building2 className="w-5 h-5 text-[#F57C00]" />
                  Step 2: Enterprise & Business Profile[cite: 4, 7]
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Business / Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Patil Industries & Traders"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Industry Sector / Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
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
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Business Legal Entity Type</label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    >
                      <option>Proprietorship</option>
                      <option>Partnership Firm</option>
                      <option>Private Limited Company</option>
                      <option>LLP (Limited Liability Partnership)</option>
                      <option>Self-Employed Professional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">GSTIN / Udyam Registration (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 27AAAAA0000A1Z5"
                      value={formData.gstNumber}
                      onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91] font-mono uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Products & Services Overview</label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of your products, market reach, and commercial services..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0A3D91]"
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
                    className="px-6 py-2.5 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
                  >
                    Next: Membership Tier <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: MEMBERSHIP TIER SELECTION & DECLARATION */}
            {currentStep === 3 && (
              <form onSubmit={handleSubmitApplication} className="space-y-6">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  Step 3: Select Membership Tier & Declaration[cite: 7]
                </h3>

                {/* Tier Selection Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {MEMBERSHIP_TIERS.map((tier) => {
                    const isSelected = formData.membershipType === tier.id;
                    return (
                      <div
                        key={tier.id}
                        onClick={() => setFormData({ ...formData, membershipType: tier.id })}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between gap-3 ${
                          isSelected
                            ? 'border-[#0A3D91] bg-blue-50/50 shadow-sm'
                            : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-xs font-extrabold text-slate-900">{tier.name}[cite: 7]</h4>
                            <p className="text-[11px] text-slate-500">{tier.desc}[cite: 7]</p>
                          </div>
                          <span className="text-xs font-extrabold text-[#0A3D91] bg-white px-2 py-0.5 rounded-lg border border-slate-200 shadow-sm">
                            {tier.fee}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="membershipType"
                            checked={isSelected}
                            onChange={() => setFormData({ ...formData, membershipType: tier.id })}
                            className="accent-[#0A3D91]"
                          />
                          <span className="text-[11px] font-bold text-slate-700">Select Plan</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Code of Conduct Declaration */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="declaration"
                      required
                      checked={formData.declaration}
                      onChange={(e) => setFormData({ ...formData, declaration: e.target.checked })}
                      className="mt-1 accent-[#0A3D91] shrink-0"
                    />
                    <label htmlFor="declaration" className="text-xs text-slate-600 leading-relaxed">
                      I hereby apply for membership in <strong>BEGA INDIA (व्यवसाय सक्षमीकरण व विकास संघटना)</strong>[cite: 7]. I confirm that the information provided is accurate and agree to adhere to the organization's Constitution, Code of Conduct, and Organizational Discipline[cite: 7].
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
                    className="px-8 py-3 bg-[#F57C00] hover:bg-[#e06f00] text-white text-xs font-extrabold rounded-xl shadow-lg transition flex items-center gap-2 disabled:opacity-50"
                  >
                    {loading ? 'Generating Application...' : 'Submit Application & Get Digital ID'}[cite: 7]
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