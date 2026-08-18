export const GOVERNMENT_SCHEMES = [
  {
    id: 'pmegp',
    title: "Prime Minister's Employment Generation Programme (PMEGP)",
    provider: 'Central Government / KVIC',
    category: 'Subsidies & Project Loans',
    targetAudience: 'New Micro Enterprises & Manufacturing Units',
    maxBenefit: 'Up to 35% Capital Subsidy (Projects up to ₹50 Lakhs)',
    eligibility: [
      'Individuals above 18 years of age',
      'Minimum 8th standard pass for manufacturing units above ₹10 Lakhs and service units above ₹5 Lakhs',
      'Only for newly sanctioned micro-enterprises',
    ],
    benefits: [
      'Manufacturing projects funded up to ₹50 Lakhs',
      'Service sector projects funded up to ₹20 Lakhs',
      'Margin money subsidy of 15% to 35% depending on urban/rural and social category',
    ],
    requiredDocuments: [
      'Detailed Project Report (DPR)',
      'Government ID & Address Proof',
      'Educational Qualification Certificate',
      'Caste/Special Category Certificate (if applicable)',
      'Rural Area Certificate from local authority',
    ],
    officialUrl: 'https://www.kviconline.gov.in/pmegpeportal/',
  },
  {
    id: 'cgtmse',
    title: 'Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)',
    provider: 'Ministry of MSME & SIDBI',
    category: 'Collateral-Free Loans',
    targetAudience: 'Micro & Small Enterprises (New and Existing)',
    maxBenefit: 'Collateral-Free Credit up to ₹500 Lakhs',
    eligibility: [
      'New and existing Micro and Small Enterprises engaged in manufacturing or service activities',
      'Retail trade and educational institutions meeting MSME definition',
    ],
    benefits: [
      'Credit facility without collateral security or third-party guarantee',
      'Guarantee coverage ranging from 75% to 85% of the sanctioned amount',
      'Concessional guarantee fee for women-owned and aspirational district units',
    ],
    requiredDocuments: [
      'Udyam Registration Certificate',
      'KYC of Promoters/Directors',
      'Last 3 years audited financial statements / ITR',
      'Bank sanction letter and business cash flow projections',
    ],
    officialUrl: 'https://www.cgtmse.in/',
  },
  {
    id: 'mudra',
    title: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    provider: 'Central Government / All Scheduled Commercial Banks',
    category: 'Working Capital & Equipment Loans',
    targetAudience: 'Small Shopkeepers, Artisans, Traders & Food Vendors',
    maxBenefit: 'Loans up to ₹20 Lakhs (Tarun Plus Category)',
    eligibility: [
      'Non-Corporate Small Business Segment (NCSB)',
      'Proprietorship / Partnership firms in rural and urban areas',
    ],
    benefits: [
      'Shishu: Loans up to ₹50,000',
      'Kishore: Loans from ₹50,001 to ₹5,00,000',
      'Tarun: Loans from ₹5,00,001 to ₹20,00,000',
      'No processing fee for Shishu and Kishore loans',
    ],
    requiredDocuments: [
      'Udyam Registration',
      'Identity & Residence Proof',
      'Last 6 months bank statement',
      'Quotation of machinery / items to be purchased',
    ],
    officialUrl: 'https://www.mudra.org.in/',
  },
  {
    id: 'psi-maharashtra',
    title: 'Package Scheme of Incentives (PSI) Maharashtra',
    provider: 'Government of Maharashtra (DIC)',
    category: 'State Industrial Subsidies',
    targetAudience: 'Manufacturing Units in Vidarbha, Marathwada & North Maharashtra',
    maxBenefit: 'Up to 100% Industrial Promotion Subsidy (IPS) on Gross SGST',
    eligibility: [
      'MSME and Large Scale industrial units set up in Maharashtra',
      'Units investing in designated developmental zones (C, D, D+, and Vidarbha/Marathwada)',
    ],
    benefits: [
      'Industrial Promotion Subsidy (IPS) equivalent to 50% - 100% of Gross SGST paid',
      'Electricity Duty Exemption for 7 to 10 years',
      'Power tariff subsidy of ₹1 to ₹2 per unit',
      'Interest subsidy of 5% p.a. on eligible term loans',
    ],
    requiredDocuments: [
      'Udyam Registration / Industrial License',
      'Factory License & MPCB Consent to Operate',
      'Land Purchase / Lease Deed in MIDC/Private Zone',
      'Chartered Accountant certified capital investment details',
    ],
    officialUrl: 'https://mahakamgar.maharashtra.gov.in/',
  },
  {
    id: 'cclsss',
    title: 'Credit Linked Capital Subsidy Scheme for Technology Upgradation (CLCSS)',
    provider: 'Ministry of MSME',
    category: 'Technology & Modernization',
    targetAudience: 'Small Scale Industries adopting Well-Established Technologies',
    maxBenefit: '15% Upfront Capital Subsidy (Up to ₹15 Lakhs)',
    eligibility: [
      'Existing SSI units upgrading with approved state-of-the-art technology',
      'New units setting up with specified high-efficiency machinery',
    ],
    benefits: [
      '15% upfront capital subsidy on eligible plant and machinery investment',
      'Maximum limit of eligible loan calculation is ₹100 Lakhs',
    ],
    requiredDocuments: [
      'Udyam Registration',
      'Invoices / Technical specifications of imported or modernized machinery',
      'Bank appraisal report and sanction letter',
    ],
    officialUrl: 'https://my.msme.gov.in/',
  },
];

export const KNOWLEDGE_GUIDES = [
  {
    id: 'gst-compliance-checklist',
    title: 'Essential GST Compliance & Input Tax Credit (ITC) Safeguards',
    category: 'Taxation & Legal',
    readTime: '6 min read',
    summary: 'A step-by-step practical guide on monthly GSTR-1 and GSTR-3B reconciliation, avoiding Section 16(4) ITC disallowance, and managing e-way bill compliance.',
    content: `1. Reconcile GSTR-2B with Purchase Registers monthly before filing GSTR-3B.
2. Ensure supplier payments are completed within 180 days to avoid mandatory ITC reversal under Rule 37.
3. Validate HSN codes and tax rates on all outbound tax invoices to mitigate mismatch notices.
4. Always generate Part-B of E-Way Bills before actual dispatch of consignments exceeding ₹50,000.`,
  },
  {
    id: 'cyber-fraud-prevention',
    title: 'Protecting MSMEs from Commercial Cyber Fraud & Digital Payment Scams',
    category: 'Cybersecurity & Finance',
    readTime: '5 min read',
    summary: 'Prevent corporate financial theft, vendor impersonation email scams, fraudulent QR codes, and unauthorized payment gateway API access.',
    content: `1. Implement mandatory Dual-Factor Authentication (2FA) across all net banking and GST portals.
2. Establish a verbal callback policy with vendors before altering bank disbursement account details.
3. In case of fraudulent transfers, immediately report within the golden hour to National Cyber Crime helpline 1930 and file an official ticket under BEGA Support Cell.`,
  },
  {
    id: 'labour-laws-msme',
    title: 'Maharashtra Shops & Establishments Act (Gumasta) & EPF/ESIC Thresholds',
    category: 'Labour & HR Compliance',
    readTime: '8 min read',
    summary: 'Clear guidelines on employee safety norms, statutory bonus obligations, gratuity provisions, and threshold applicability for EPF (20+ employees) and ESIC (10+ employees).',
    content: `1. Renew Gumasta licenses or submit annual returns on the Aaple Sarkar portal.
2. Maintain mandatory digital attendance registers and wage slips compliant with state norms.
3. Ensure ESIC coverage for all employees earning gross salaries up to ₹21,000 per month.`,
  },
  {
    id: 'digital-marketing-b2b',
    title: 'B2B Lead Generation Funnels for Manufacturers & Industrial Suppliers',
    category: 'Marketing & Sales',
    readTime: '7 min read',
    summary: 'Leveraging digital directories, search engine optimization, Google Business profiles, and WhatsApp Business API pipelines for high-value client acquisitions.',
    content: `1. Optimize Google Business Profile with verified GST address, catalog photos, and client reviews.
2. Run targeted Meta and LinkedIn ad campaigns focusing on specific industrial clusters (e.g., Waluj, Chakan, Bhosari).
3. Use automated WhatsApp broadcast catalogs for monthly product price lists and technical brochures.`,
  },
];

export const BUSINESS_TOOLKITS = [
  {
    id: 'hr-onboarding-kit',
    title: 'Standard Employee Onboarding & Appointment Letter Template',
    format: 'DOCX / PDF',
    size: '180 KB',
    description: 'Legally compliant employment contracts, probation clauses, confidentiality agreements, and HR joining checklists.',
  },
  {
    id: 'b2b-commercial-agreement',
    title: 'B2B Supplier & Vendor Purchase Agreement Format',
    format: 'DOCX',
    size: '220 KB',
    description: 'Standard master service agreement covering delivery timelines, payment default terms, warranty clauses, and dispute arbitration.',
  },
  {
    id: 'annual-compliance-calendar',
    title: 'Annual MSME Statutory & Tax Compliance Calendar 2026',
    format: 'PDF / XLSX',
    size: '310 KB',
    description: 'Month-by-month calendar highlighting due dates for GST, Income Tax Advance payments, TDS, EPF, ESIC, and ROC filings.',
  },
  {
    id: 'dpr-bank-loan-template',
    title: 'Detailed Project Report (DPR) Format for Bank Loans & PMEGP',
    format: 'XLSX / DOCX',
    size: '450 KB',
    description: 'Financial projection model including DSCR calculations, break-even analysis, capital expenditure schedules, and working capital estimation.',
  },
];