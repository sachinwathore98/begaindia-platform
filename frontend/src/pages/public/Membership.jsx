import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Check,
  Sparkles,
  ArrowRight,
  User,
  Building2,
  Award,
  Crown,
  HelpCircle,
} from 'lucide-react';

const MEMBERSHIP_PLANS = [
  {
    id: 'Basic',
    name: 'Basic Membership',
    price: '₹999',
    period: '/year',
    popular: false,
    badge: 'Starter Tier',
    description: 'For emerging entrepreneurs, traders, and small business operators joining Maharashtra\'s premier network.',
    benefits: [
      'Official Member Digital ID Badge with QR verification',
      'Entry to district-level networking and buyer-seller meets',
      'Regular regulatory, taxation, and MSME scheme alerts',
      'Access to standard Business Support Request (BSR) ticketing',
      'Discounted entry to state seminars and training workshops',
    ],
    cta: 'Apply for Basic',
    btnColor: 'bg-slate-800 hover:bg-slate-900 text-white',
    cardBorder: 'border-slate-200 bg-white shadow-sm',
  },
  {
    id: 'Business',
    name: 'Business Membership',
    price: '₹2,499',
    period: '/year',
    popular: true,
    badge: 'Most Popular & Best Value',
    description: 'For established MSMEs, manufacturers, and service firms seeking high directory visibility and B2B leads.',
    benefits: [
      'Verified Listing on the State Business Directory with contact & catalog',
      'Direct B2B referral matchmaker & procurement inquiry routing',
      'Dedicated case handling by Expert Panel (CA, Advocates, Tax advisors)',
      'VIP delegate pass & priority stall bookings at BEGA Business Expo',
      'Eligibility for Taluka, District & State Business Excellence Awards',
      'Direct participation in "One Month – One Village" CSR initiatives',
    ],
    cta: 'Get Business Membership',
    btnColor: 'bg-gradient-to-r from-[#F57C00] to-amber-500 hover:from-[#e06f00] hover:to-amber-600 text-white font-black shadow-md',
    cardBorder: 'border-2 border-[#F57C00] bg-white shadow-xl ring-4 ring-orange-500/10',
  },
  {
    id: 'Lifetime',
    name: 'Lifetime Membership',
    price: '₹9,999',
    period: 'one-time',
    popular: false,
    badge: 'Permanent Status',
    description: 'For established industrialists, corporate founders, and business leaders seeking permanent representation.',
    benefits: [
      'Permanent Lifetime Verified Badge on the digital directory',
      'VIP Stage Access & Delegate Entry for all future state events',
      'Highest priority resolution routing in the Business Grievance Desk',
      'Exclusive invitation to annual Business Leaders Roundtables',
      'Prominent corporate recognition in annual publications & reports',
    ],
    cta: 'Claim Lifetime Status',
    btnColor: 'bg-[#0A3D91] hover:bg-[#083278] text-white font-extrabold shadow-md',
    cardBorder: 'border-slate-200 bg-white shadow-sm',
  },
  {
    id: 'Executive',
    name: 'Executive Membership',
    price: 'By Appointment',
    period: 'Term Based',
    popular: false,
    badge: 'Leadership Role',
    description: 'For appointed committee chairs, taluka/district leaders, and industry federation representatives.',
    benefits: [
      'Official committee appointment credentials & administrative authority',
      'Voting rights and agenda formulation in leadership councils',
      'Direct coordination with local administration & government bodies',
      'Leadership oversight for taluka-level BEGA Seva village adoption drives',
    ],
    cta: 'Apply for Executive Role',
    btnColor: 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-extrabold',
    cardBorder: 'border-amber-200 bg-amber-50/30 shadow-sm',
  },
];

export default function Membership() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-12 px-4 sm:px-8 space-y-16">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-orange-50 text-[#F57C00] border border-orange-200 text-xs font-black rounded-full uppercase tracking-wider">
            Membership Architecture
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            BEGA India Membership Plans
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Join thousands of verified business owners across Maharashtra. Select the membership structure that fits your enterprise scaling goals.
          </p>
        </div>

        {/* Pricing Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`p-7 rounded-3xl border transition-all flex flex-col justify-between space-y-6 ${plan.cardBorder}`}
            >
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border bg-slate-100 text-slate-600 border-slate-200">
                  {plan.badge}
                </span>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">{plan.price}</span>
                    <span className="text-xs text-slate-500 font-bold">{plan.period}</span>
                  </div>
                  <p className="text-xs text-slate-600 pt-1 leading-relaxed">{plan.description}</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
                  <p className="font-extrabold text-slate-800 uppercase text-[10px]">Included Benefits:</p>
                  <ul className="space-y-2 text-slate-700">
                    {plan.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] leading-snug">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                to="/join"
                className={`w-full py-3.5 rounded-xl text-xs text-center shadow transition block ${plan.btnColor}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Member Service Promise Banner */}
        <div className="bg-[#0A3D91] text-white p-8 sm:p-12 rounded-3xl space-y-4 shadow-xl text-center">
          <span className="text-xs font-black uppercase text-amber-300 tracking-wider">
            Our Service Promise
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            Value • Relationship • Opportunity
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-3xl mx-auto leading-relaxed">
            BEGA India membership is designed to create genuine commercial and professional value: Network, Knowledge, Promotion, Opportunity, Guidance, and Institutional Representation.
          </p>
        </div>

      </div>
    </div>
  );
}