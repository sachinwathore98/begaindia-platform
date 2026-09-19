// frontend/src/pages/public/Membership.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ShieldCheck, Award, Users, BookOpen, Star, Building2, ArrowRight } from 'lucide-react';

const MEMBERSHIP_PLANS = [
  {
    id: 'plan-1',
    name: 'BEGA Basic Membership',
    price: '₹2,100',
    period: '/year',
    badge: 'Plan 1',
    description: 'Foundation entry for business empowerment and certified state-wide networking.',
    benefits: [
      'Official BEGA Membership Status',
      'Official BEGA Branded T-Shirt',
      'Digital & Physical Identity Card with QR Verification',
      'Member Networking Opportunities Across Districts',
      'Entry to Eligible BEGA Programs and Activities',
    ],
    popular: false,
    cta: 'Select Basic Plan',
    buttonClass: 'bg-slate-900 hover:bg-slate-800 text-white',
    cardClass: 'border-slate-200 bg-white shadow-sm',
  },
  {
    id: 'plan-2',
    name: 'BEGA Membership with Monthly Booklet',
    price: '₹5,000',
    period: '/year',
    badge: 'Plan 2',
    description: 'Continuous knowledge enrichment, scheme updates, and regular print booklets.',
    benefits: [
      'All Basic Membership Benefits Included',
      'BEGA Monthly Knowledge & Business Booklet',
      'Regular Organisational & Regulatory Updates',
      'Government Scheme & Tax Compliance Briefs',
      'Additional Regional Networking Opportunities',
      'Priority Access to Training Seminars',
    ],
    popular: false,
    cta: 'Select Booklet Plan',
    buttonClass: 'bg-[#0A3D91] hover:bg-[#083278] text-white',
    cardClass: 'border-slate-200 bg-white shadow-sm',
  },
  {
    id: 'plan-3',
    name: 'BEGA Membership with Directory',
    price: '₹11,000',
    period: '/year',
    badge: 'Plan 3 • Most Popular',
    description: 'Maximum market visibility, state directory listing, catalog links, and B2B linkages.',
    benefits: [
      'All Basic Membership Benefits Included',
      'BEGA Monthly Business Booklet Subscription',
      'Verified BEGA Business Directory Inclusion',
      'Dedicated Company Profile & Product Catalog Listing',
      'Business Visibility, Lead Gen & Promotional Opportunities',
      'Direct Buyer-Seller Linkage & Referrals',
    ],
    popular: true,
    cta: 'Get Directory Listing',
    buttonClass: 'bg-[#F57C00] hover:bg-[#e06f00] text-white shadow-lg shadow-orange-500/20',
    cardClass: 'border-2 border-[#F57C00] bg-orange-50/20 shadow-xl scale-[1.02]',
  },
  {
    id: 'plan-4',
    name: 'BEGA State Core Committee',
    price: '₹21,000',
    period: 'Subject to Selection',
    badge: 'Plan 4 • Leadership',
    description: 'State-level leadership, policy participation, and developmental oversight.',
    benefits: [
      'All Basic Membership Benefits Included',
      'State-Level Organisational Participation',
      'Leadership and Entrepreneur Development Platforms',
      'Direct Representation in State Conclaves & Conventions',
      'Committee Responsibility (Subject to 9-step selection & approval)',
    ],
    popular: false,
    cta: 'Apply for State Committee',
    buttonClass: 'bg-blue-900 hover:bg-blue-800 text-white',
    cardClass: 'border-slate-200 bg-white shadow-sm',
  },
  {
    id: 'plan-5',
    name: 'BEGA Central Core Committee',
    price: '₹51,000',
    period: 'Subject to Selection',
    badge: 'Plan 5 • National Council',
    description: 'Central-level governance, national expansion, and high-level representation.',
    benefits: [
      'All Basic Membership Benefits Included',
      'Central-Level National Organisational Participation',
      'National Networking with Industry Pioneers',
      'Leadership & Strategic Policy Formulation',
      'Central Programmes & State Coordination Authority',
      'Committee Responsibility (Subject to 9-step selection & approval)',
    ],
    popular: false,
    cta: 'Apply for Central Committee',
    buttonClass: 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white',
    cardClass: 'border-2 border-amber-300 bg-amber-50/20 shadow-md',
  },
];

export default function Membership() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-12 px-4 sm:px-8 space-y-16 max-w-7xl mx-auto">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 bg-blue-50 border border-blue-200 text-[#0A3D91] text-xs font-black rounded-full uppercase tracking-wider">
          Section 8 Registered Organisation Structure
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Official BEGA India Membership Plans
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          CONNECT → LEARN → COLLABORATE → GROW. Choose the appropriate membership tier to accelerate your enterprise across Maharashtra and Pan-India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 items-stretch">
        {MEMBERSHIP_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`p-6 rounded-3xl border flex flex-col justify-between space-y-6 transition-all ${plan.cardClass}`}
          >
            <div className="space-y-4">
              <span className="text-[9px] font-black uppercase px-2.5 py-1 rounded-full bg-white border border-slate-200 block text-center">
                {plan.badge}
              </span>
              <div className="space-y-1 text-center">
                <h3 className="text-sm font-black text-slate-900 leading-snug">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 pt-1">
                  <span className="text-2xl font-black text-slate-900">{plan.price}</span>
                  <span className="text-[10px] text-slate-500 font-bold">{plan.period}</span>
                </div>
                <p className="text-[11px] text-slate-500 pt-1 leading-relaxed">{plan.description}</p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                <p className="font-extrabold text-slate-800 uppercase text-[9px]">Included Privileges:</p>
                <ul className="space-y-2 text-slate-600">
                  {plan.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-[10.5px] leading-tight">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              to="/join"
              className={`w-full py-3 rounded-xl text-xs text-center font-black shadow transition block ${plan.buttonClass}`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm max-w-4xl mx-auto space-y-4 text-xs text-slate-600">
        <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider text-center">
          Official Membership & Executive Selection Philosophy
        </h4>
        <p className="leading-relaxed text-center">
          <strong>Important Disclaimer (Section 10 & 11):</strong> Membership fee is not a position fee. Payment of membership fee does not automatically guarantee an executive organisational position. All Committee appointments (State, Central, Mahila, Yuva, District, Taluka) follow a strict 9-step selection workflow based on eligibility, verification, and formal appointment.
        </p>
      </div>
    </div>
  );
}