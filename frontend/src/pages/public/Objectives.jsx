// frontend/src/pages/public/Objectives.jsx
import React from 'react';
import {
  ShieldCheck,
  Building2,
  Users,
  Award,
  Scale,
  DollarSign,
  Briefcase,
  AlertTriangle,
  FileText,
  LifeBuoy,
  BookOpen,
  Sparkles,
} from 'lucide-react';

const OBJECTIVES = [
  {
    num: 1,
    title: 'Protection of Business Rights and Interests',
    desc: 'Work to protect and promote the legitimate professional interests of entrepreneurs, business owners, traders and self-employed persons through organised guidance, coordination and appropriate representation.',
  },
  {
    num: 2,
    title: 'Government and Administrative Representation',
    desc: 'Support entrepreneurs facing genuine government or administrative difficulties through documented submissions, communication, representation and appropriate follow-up.',
  },
  {
    num: 3,
    title: 'Local-Level Business Support',
    desc: 'Where businesses face unnecessary pressure, harassment or interference at the local level, provide organisational guidance and appropriate referral support.',
  },
  {
    num: 4,
    title: 'Training, Advice, Mentorship and Skill Development',
    desc: 'Conduct training, workshops, mentorship, counselling and skill-development programmes for new and experienced entrepreneurs.',
  },
  {
    num: 5,
    title: 'Exhibitions, Trade Activities and B2B Opportunities',
    desc: 'Create business opportunities through exhibitions, trade activities, conferences, workshops, B2B meetings and related business programmes.',
  },
  {
    num: 6,
    title: 'MSME, Startup and Government Support Awareness',
    desc: 'Disseminate relevant information regarding MSMEs, startups, government policies, rules, benefits and business-support initiatives.',
  },
  {
    num: 7,
    title: 'Networking and Collaboration',
    desc: 'Develop meaningful business networks, referrals, collaboration, knowledge sharing, supply partnerships and professional relationships.',
  },
  {
    num: 8,
    title: 'New Entrepreneur Guidance',
    desc: 'Provide basic technical, business and procedural guidance to persons who wish to start a new business.',
  },
  {
    num: 9,
    title: 'Business Problems and Grievance Platform',
    desc: 'Create an organised platform where business owners can present genuine problems, complaints, difficulties and suggestions.',
  },
  {
    num: 10,
    title: 'Legal Awareness and Referral',
    desc: 'Create awareness regarding basic business-related legal matters and provide referral to qualified legal professionals where specialised advice is required.',
  },
  {
    num: 11,
    title: 'Banking and Financial Awareness',
    desc: 'Create awareness and coordination opportunities regarding banks, financial institutions, credit, loans and financial literacy.',
  },
  {
    num: 12,
    title: 'Digital Business Empowerment',
    desc: 'Promote awareness and training regarding digital marketing, e-commerce, GST, accounting, online tools and technology adoption.',
  },
  {
    num: 13,
    title: 'Women and Youth Entrepreneurship',
    desc: 'Conduct special development, training, mentorship and networking programmes for women and young entrepreneurs.',
  },
  {
    num: 14,
    title: 'Policy Suggestions and Representation',
    desc: 'Present business-related issues, suggestions and improvement proposals to relevant authorities wherever appropriate.',
  },
  {
    num: 15,
    title: 'Research and Surveys',
    desc: 'Conduct research, surveys and studies to understand business needs, challenges, market trends and development opportunities.',
  },
  {
    num: 16,
    title: 'Employer Support',
    desc: 'Provide awareness, guidance, mediation and professional referral for employers facing genuine employee-related complaints, pressure, disputes or workplace concerns.',
  },
  {
    num: 17,
    title: 'Employer-Employee Awareness',
    desc: 'Promote awareness regarding duties, responsibilities, workplace processes, applicable rules and responsible employer-employee relations.',
  },
  {
    num: 18,
    title: 'Support Against False Allegations or Pressure',
    desc: 'Provide documentation guidance, awareness and professional referral in situations involving false allegations, intimidation, mental pressure or similar genuine business concerns.',
  },
  {
    num: 19,
    title: 'Mediation and Lawful Dispute Resolution',
    desc: 'Encourage communication, mediation and lawful dispute-resolution processes for employer-employee and other business disputes.',
  },
  {
    num: 20,
    title: 'Tax and Compliance Awareness',
    desc: 'Create awareness regarding GST, Income Tax, local taxes and compliance, with referral to qualified professionals for specialised matters.',
  },
  {
    num: 21,
    title: 'Licence, Registration and NOC Support',
    desc: 'Provide guidance regarding licences, registrations, NOCs, compliance processes and related administrative difficulties.',
  },
  {
    num: 22,
    title: 'Payment Delay Support',
    desc: 'Provide guidance regarding documentation, communication and available lawful or commercial remedies for delayed business payments.',
  },
  {
    num: 23,
    title: 'Labour-Law and Workplace Awareness',
    desc: 'Create awareness regarding applicable labour-related rules, responsibilities and dispute-resolution processes.',
  },
  {
    num: 24,
    title: 'Emergency Business Support',
    desc: 'Provide guidance and coordination during natural disasters, market downturns, policy changes or serious business emergencies.',
  },
  {
    num: 25,
    title: 'Ethical Business Practices',
    desc: 'Promote transparency, responsible conduct, customer respect, compliance and ethical business culture.',
  },
  {
    num: 26,
    title: 'Local Administration Coordination',
    desc: 'Promote appropriate communication and coordination with municipal bodies, local administration and other relevant institutions.',
  },
  {
    num: 27,
    title: 'Insurance and Social Security Awareness',
    desc: 'Create awareness regarding insurance, accident protection, health-related protection, retirement planning and social-security options.',
  },
  {
    num: 28,
    title: 'Supply Chain and Market Linkage',
    desc: 'Promote vendor connections, distribution opportunities, market access, sales opportunities and supply-chain linkages through networking, B2B meetings, exhibitions and business-connect programmes.',
  },
];

export default function Objectives() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-12 px-4 sm:px-8 space-y-12 max-w-7xl mx-auto">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 bg-blue-50 border border-blue-200 text-[#0A3D91] text-xs font-black rounded-full uppercase tracking-wider">
          Section 52: Statutory Charter
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          28 Core Objectives of BEGA India
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          CONNECT → LEARN → COLLABORATE → GROW. Established under the Companies Act as a Section 8 Company to defend, develop, and accelerate enterprise across Maharashtra and India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {OBJECTIVES.map((obj) => (
          <div
            key={obj.num}
            className="p-6 bg-white border border-slate-200 rounded-3xl shadow-xs hover:shadow-md transition space-y-2.5 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0A3D91] to-[#F57C00] text-white flex items-center justify-center font-black text-sm shrink-0 shadow">
              {obj.num}
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-slate-900 leading-snug">
                {obj.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {obj.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}