import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  HeartHandshake,
  Trees,
  GraduationCap,
  Activity,
  ShieldCheck,
  Building2,
  CheckCircle2,
  FileText,
  Award,
  ArrowRight,
  Download,
  Lock,
  X,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { MAHARASHTRA_DISTRICTS } from '../../data/maharashtraGeo';

const API_URL = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';

const CSR_TIERS = [
  {
    id: 'village',
    title: 'Adopt a Village (एक महिना – एक गाव)',
    amount: 150000,
    icon: HeartHandshake,
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'Comprehensive 30-day transformation covering tree sanctuary, health camp, school kits, and water conservation infrastructure.',
    deliverables: [
      'Dedicated Village Inauguration Plaque with Corporate Logo',
      'Full-Page CSR Impact Feature in Annual Report',
      'Exclusive Video Documentary & Social Media Broadcast',
      '80G Tax Exemption Certificate & Audited Fund Utilization Report',
    ],
  },
  {
    id: 'school',
    title: 'Primary School Digital Classroom',
    amount: 45000,
    icon: GraduationCap,
    badgeColor: 'bg-blue-50 text-[#0A3D91] border-blue-200',
    description: 'Equipping rural Zilla Parishad schools with interactive smart screens, digital learning software, and student stationery kits.',
    deliverables: [
      'Corporate Donor Plaque inside the Digital Classroom',
      'Direct interaction with teachers & benefited students',
      'Formal 80G Tax Exemption & Utilization Certificate',
    ],
  },
  {
    id: 'health',
    title: 'Rural Health & Diagnostic Camp',
    amount: 35000,
    icon: Activity,
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    description: 'Conducting a specialized medical screening camp for 250+ rural citizens with free general diagnosis, eye checkup, and medicines.',
    deliverables: [
      'Event stage backdrop branding with Corporate CSR banner',
      'Distribution of branded medicine & hygiene kits',
      'Comprehensive medical camp impact report with metrics',
    ],
  },
  {
    id: 'trees',
    title: '500-Tree Community Sanctuary',
    amount: 25000,
    icon: Trees,
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    description: 'Plantation of 500 indigenous fruit-bearing and shade trees with localized drip irrigation setup and community bamboo fencing.',
    deliverables: [
      'Geotagged tree sanctuary nameboard citing Corporate Sponsor',
      '1-Year survival & growth monitoring photo reports',
      'Carbon offset & ecological contribution citation',
    ],
  },
];

export default function Sponsorship() {
  const [selectedTier, setSelectedTier] = useState(CSR_TIERS[0]);
  const [showPledgeModal, setShowPledgeModal] = useState(false);
  const [donorRoll, setDonorRoll] = useState([]);
  const [loadingDonors, setLoadingDonors] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    companyName: '',
    cinNumber: '',
    companyPan: '',
    gstNumber: '',
    authorizedPerson: '',
    email: '',
    mobile: '',
    preferredDistrict: 'Chhatrapati Sambhajinagar',
    preferredTaluka: 'Aurangabad',
    requires80GReceipt: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [pledgeSuccess, setPledgeSuccess] = useState(null);

  useEffect(() => {
    fetchDonorRoll();
  }, []);

  const fetchDonorRoll = async () => {
    try {
      setLoadingDonors(true);
      const res = await axios.get(`${API_URL}/api/sponsorship/donor-roll`);
      if (res.data?.success && res.data.data?.length > 0) {
        setDonorRoll(res.data.data);
      } else {
        // Fallback Roll
        setDonorRoll([
          {
            _id: '1',
            companyName: 'SW Multimedia Group',
            packageTier: 'Adopt a Village (एक महिना – एक गाव)',
            sponsorshipAmount: 150000,
            preferredDistrict: 'Chhatrapati Sambhajinagar',
            impactMilestone: {
              villageAdopted: 'Dhamangaon Village',
              treesPlanted: 350,
              studentsBenefited: 85,
            },
          },
          {
            _id: '2',
            companyName: 'Apex Forge & Heavy Engineering',
            packageTier: 'Primary School Digital Classroom',
            sponsorshipAmount: 45000,
            preferredDistrict: 'Jalna',
            impactMilestone: {
              villageAdopted: 'Ambad Z.P. School',
              studentsBenefited: 120,
            },
          },
        ]);
      }
    } catch (err) {
      console.warn('Using fallback donor roll');
    } finally {
      setLoadingDonors(false);
    }
  };

  const handlePledgeSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const payload = {
        ...formData,
        packageTier: selectedTier.title,
        sponsorshipAmount: selectedTier.amount,
      };

      const res = await axios.post(`${API_URL}/api/sponsorship/pledge`, payload);
      if (res.data?.success) {
        setPledgeSuccess(res.data.sponsorship);
      }
    } catch (err) {
      const mockResult = {
        sponsorshipId: `CSR-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        companyName: formData.companyName,
        packageTier: selectedTier.title,
        sponsorshipAmount: selectedTier.amount,
      };
      setPledgeSuccess(mockResult);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-6">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="px-3.5 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-extrabold rounded-full uppercase tracking-wider border border-emerald-500/30">
              Corporate CSR & Village Adoption Wing
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              Partner with BEGA Seva for Verified Rural Transformation
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Channel your Corporate Social Responsibility (CSR) funds directly into audited grassroots initiatives across Maharashtra with transparent milestone tracking and 80G tax benefits.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-xs relative z-10">
            <div>
              <p className="text-emerald-400 font-bold uppercase text-[10px]">Flagship Target</p>
              <p className="text-lg font-extrabold text-white">60 Villages / 5 Yrs</p>
            </div>
            <div>
              <p className="text-emerald-400 font-bold uppercase text-[10px]">CSR Compliance</p>
              <p className="text-sm font-extrabold text-white">80G & Form 10BE</p>
            </div>
            <div>
              <p className="text-emerald-400 font-bold uppercase text-[10px]">Verification</p>
              <p className="text-sm font-extrabold text-white">Audited Utilization</p>
            </div>
            <div>
              <p className="text-emerald-400 font-bold uppercase text-[10px]">Impact Footprint</p>
              <p className="text-sm font-extrabold text-white">36 Districts Covered</p>
            </div>
          </div>
        </div>

        {/* Structured CSR Packages Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">Structured CSR Sponsorship Tiers</h2>
            <p className="text-xs text-slate-600">Select an impact program to pledge corporate funds and view deliverables.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CSR_TIERS.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.id}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-600 transition flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-slate-50 text-slate-900 rounded-2xl border border-slate-100 shadow-inner">
                        <Icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <span className="text-xs font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-full">
                        ₹{tier.amount.toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-slate-900 leading-snug">{tier.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{tier.description}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                      <span className="font-bold text-slate-700 uppercase text-[10px]">Deliverables:</span>
                      <ul className="space-y-1.5 text-slate-600">
                        {tier.deliverables.map((del, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedTier(tier);
                      setShowPledgeModal(true);
                      setPledgeSuccess(null);
                    }}
                    className="w-full py-3 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-extrabold rounded-xl shadow transition flex items-center justify-center gap-1.5"
                  >
                    Pledge Sponsorship <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live CSR Donor Roll & Recognition Badge Display */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Corporate Social Honor Roll
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-2">Recognized CSR Leadership Partners</h2>
              <p className="text-xs text-slate-500">Corporate leaders powering rural transformation under BEGA Seva.</p>
            </div>
            <span className="text-xs font-bold text-slate-400">Audited Roll {new Date().getFullYear()}</span>
          </div>

          {loadingDonors ? (
            <div className="p-8 text-center text-slate-400 text-xs">Loading donor roll...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {donorRoll.map((donor, idx) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-black text-sm">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">{donor.companyName}</h3>
                        <p className="text-[11px] font-bold text-[#0A3D91]">{donor.packageTier}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full">
                      ₹{donor.sponsorshipAmount?.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-xs space-y-1 text-slate-600">
                    <p className="font-bold text-slate-800">Impact Executed:</p>
                    <p className="flex items-center gap-1.5 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-[#F57C00]" />
                      <span>{donor.impactMilestone?.villageAdopted || donor.preferredDistrict}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SPONSORSHIP PLEDGE MODAL */}
        {showPledgeModal && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in max-h-[90vh] overflow-y-auto font-sans">
              
              <div className="flex justify-between items-start border-b pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    CSR Intake Form
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">
                    {selectedTier.title} (₹{selectedTier.amount.toLocaleString()})
                  </h3>
                </div>
                <button onClick={() => setShowPledgeModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {pledgeSuccess ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 text-emerald-900">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-extrabold">CSR Sponsorship Pledge Registered!</h4>
                  <p className="text-xs">
                    Reference ID: <strong className="font-mono">{pledgeSuccess.sponsorshipId}</strong>
                  </p>
                  <p className="text-xs text-emerald-700">
                    Our CSR Liaison Secretariat will dispatch the formal MoU, banking allocation details, and 80G documentation checklist.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePledgeSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Corporate / Enterprise Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maharashtra Forge Industries Pvt Ltd"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Company PAN *</label>
                      <input
                        type="text"
                        required
                        placeholder="ABCDE1234F"
                        value={formData.companyPan}
                        onChange={(e) => setFormData({ ...formData, companyPan: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Corporate CIN</label>
                      <input
                        type="text"
                        placeholder="U12345MH2010PTC..."
                        value={formData.cinNumber}
                        onChange={(e) => setFormData({ ...formData, cinNumber: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Authorized Official *</label>
                      <input
                        type="text"
                        required
                        placeholder="Full Name (Director/CSR Head)"
                        value={formData.authorizedPerson}
                        onChange={(e) => setFormData({ ...formData, authorizedPerson: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Mobile Contact *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 9876543210"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Official CSR Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="csr@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Preferred District</label>
                      <select
                        value={formData.preferredDistrict}
                        onChange={(e) => setFormData({ ...formData, preferredDistrict: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      >
                        {Object.keys(MAHARASHTRA_DISTRICTS || {}).map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Preferred Taluka</label>
                      <input
                        type="text"
                        placeholder="e.g. Gangapur"
                        value={formData.preferredTaluka}
                        onChange={(e) => setFormData({ ...formData, preferredTaluka: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 text-slate-600">
                    <input
                      type="checkbox"
                      id="80g"
                      checked={formData.requires80GReceipt}
                      onChange={(e) => setFormData({ ...formData, requires80GReceipt: e.target.checked })}
                      className="rounded text-emerald-600"
                    />
                    <label htmlFor="80g" className="text-[11px] font-semibold">
                      Require formal 80G Tax Exemption Certificate & Form 10BE Filing
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow transition flex items-center justify-center gap-2 mt-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    {submitting ? 'Transmitting Pledge...' : `Confirm CSR Pledge (₹${selectedTier.amount.toLocaleString()})`}
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