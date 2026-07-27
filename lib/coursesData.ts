export interface ModuleLesson {
  title: string;
  duration: string;
  type: 'video' | 'case_study' | 'practical_demo';
  isFree?: boolean;
}

export interface CurriculumModule {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: string;
  lessons: ModuleLesson[];
}

export interface CourseCaseStudy {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: string;
  toolsUsed: string[];
}

export interface CourseReview {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: 'Available' | 'Coming Soon';
  badge?: string;
  duration: string;
  weeksCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Beginner to Advanced' | 'Intermediate to Advanced' | 'Beginner to Intermediate';
  instructor: {
    name: string;
    title: string;
    avatar: string;
    bio: string;
    experience: string;
    teachingPhilosophy: string;
    expertise: string[];
    education: string[];
    certifications: string[];
    socials: {
      linkedin?: string;
      facebook?: string;
      youtube?: string;
    };
  };
  rating: number;
  reviewCount: number;
  ratingDistribution: { stars: number; count: number; percentage: number }[];
  studentsCount: number;
  price: number | null;
  originalPrice: number;
  discountPercent?: number;
  language: string;
  format: 'Mobile App + Live/Recorded Masterclass';
  thumbnail: string;
  shortDescription: string;
  fullDescription: string;
  whoIsThisFor: string[];
  learningObjectives: string[];
  careerOpportunities: string[];
  skillsIncluded: string[];
  requirements: string[];
  certificateInfo: {
    title: string;
    accreditation: string;
    features: string[];
  };
  modules: CurriculumModule[];
  projects: CourseCaseStudy[];
  reviews: CourseReview[];
  faqs: CourseFAQ[];
}

export const COURSES_DATA: Course[] = [
  {
    id: 'c-1',
    slug: 'certified-income-tax-and-sales-tax-practitioner',
    title: 'Certified Income Tax & Sales Tax Practitioner Masterclass',
    category: 'Taxation & Compliance',
    status: 'Available',
    badge: 'Flagship Masterclass',
    duration: '12 Weeks (90+ Hours)',
    weeksCount: 12,
    level: 'Beginner to Advanced',
    instructor: {
      name: 'Raja Gulfam',
      title: 'Founder & Lead Instructor (Advocate High Court & ACMA)',
      avatar: '/about/founder-portrait.jpeg',
      bio: 'Raja Gulfam Kayani is a High Court Advocate, Associate Chartered Management Accountant (ACMA), and Executive Partner at Raja Gulfam & Co. With 10+ years of active litigation and tax advisory practice, he trains professionals in practical FBR filings, audit defense, and corporate legal compliance.',
      experience: '10+ Years in High Court Tax Litigation & Management Accounting',
      teachingPhilosophy: 'Practical execution on real FBR IRIS & SECP portals. Learn tax advisory by handling authentic client cases rather than reading static law textbooks.',
      expertise: ['Income Tax Ordinance 2001', 'Sales Tax Act 1990', 'FBR IRIS Portal Filing', 'Wealth Statement Reconciliation', 'FBR Audit Defense', 'Corporate Law & SECP'],
      education: ['ACMA — Institute of Cost & Management Accountants', 'LL.B — High Court Advocate', 'Income Tax Practitioner (ITP)'],
      certifications: ['Associate Chartered Management Accountant', 'Advocate High Court', 'General Secretary Hazara Tax Bar Association'],
      socials: {
        linkedin: 'https://linkedin.com',
        facebook: 'https://facebook.com',
        youtube: 'https://youtube.com',
      },
    },
    rating: 4.9,
    reviewCount: 342,
    ratingDistribution: [
      { stars: 5, count: 310, percentage: 91 },
      { stars: 4, count: 24, percentage: 7 },
      { stars: 3, count: 6, percentage: 1.5 },
      { stars: 2, count: 2, percentage: 0.5 },
      { stars: 1, count: 0, percentage: 0 },
    ],
    studentsCount: 1240,
    price: 30000,
    originalPrice: 50000,
    discountPercent: 40,
    language: 'Urdu & English',
    format: 'Mobile App + Live/Recorded Masterclass',
    thumbnail: '/about/fbr-seminar.jpeg',
    shortDescription: 'Master income tax filing, sales tax returns, FBR IRIS portal, corporate tax audits, wealth statements, withholding tax, and tax advisory for individuals and corporate clients on our Student Mobile App.',
    fullDescription: 'The Certified Income Tax & Sales Tax Practitioner Masterclass is a comprehensive 12-week professional program designed to transform accountants, legal graduates, and tax consultants into competent, independent tax advisory practitioners. Taught directly by Raja Gulfam Kayani, you will master the FBR IRIS portal, Income Tax Ordinance 2001, Sales Tax Act 1990, withholding tax compliance, wealth statement reconciliation, and FBR notice appeal representation. All live and recorded lectures are accessible 24/7 on our dedicated Premier LMS Student Mobile App.',
    whoIsThisFor: [
      'Accountants & Finance Officers wanting to master tax advisory and FBR filing',
      'Law graduates & Advocates seeking practical tax bar litigation training',
      'Business owners & Corporate Advisors aiming to handle company tax compliance independently',
      'Tax Practitioners preparing for Income Tax Bar Examinations and independent tax practice',
    ],
    learningObjectives: [
      'Operate the FBR IRIS portal for NTN registration, income tax filing, and sales tax returns',
      'Prepare individual, partnership (AOP), and corporate income tax calculations under Income Tax Ordinance 2001',
      'Execute wealth statement reconciliations and asset justification for high-net-worth clients',
      'Handle monthly Sales Tax e-filing (Annexure C, STRR, and Provincial Sales Tax Portals)',
      'Draft professional responses to FBR Audit Notices under Section 122 & 177',
      'Establish and manage an independent tax advisory consultancy practice',
    ],
    careerOpportunities: [
      'Independent Income Tax & Sales Tax Practitioner ($50,000 - $120,000+ / year practice)',
      'Corporate Tax Manager in Multinational Firms & Banks',
      'Senior Tax Bar Legal Advocate',
      'Chief Tax Consultant at Accounting & Law Firms',
    ],
    skillsIncluded: [
      'FBR IRIS Portal E-Filing',
      'Income Tax Ordinance 2001',
      'Sales Tax Act 1990',
      'Wealth Statement Reconciliation',
      'Withholding Tax Statements (Sec 165)',
      'FBR Audit Notice Appeals',
      'Corporate SECP Compliance',
      'Tax Bar Practice Management',
    ],
    requirements: [
      'Android or iOS Smartphone for the Premier LMS Student Mobile App (or Laptop/Desktop)',
      'Stable internet connection to stream live & recorded masterclasses',
      'Basic understanding of accounting principles or legal concepts',
      'No prior FBR tax filing experience required — we teach practical execution from ground zero!',
    ],
    certificateInfo: {
      title: 'Accredited Income Tax & Sales Tax Practitioner Diploma',
      accreditation: 'Issued & Verified by Premier LMS & Raja Gulfam & Co.',
      features: [
        'Unique serial number with public online verification portal',
        'Endorsed by practicing High Court Advocate & ACMA faculty',
        'Physical hardcopy certificate option delivered directly to your address',
      ],
    },
    modules: [
      {
        id: 'mod-1',
        number: 1,
        title: 'Module 1: Introduction to FBR Ecosystem & Tax Law Architecture',
        description: 'Understand the legal structure of FBR, IRIS portal registration, NTN creation, and tax profile verification.',
        duration: '2 Weeks · 8 Masterclasses',
        lessons: [
          { title: 'Overview of Tax Architecture in Pakistan & FBR Framework', duration: '35 min', type: 'video', isFree: true },
          { title: 'FBR IRIS Portal Registration & NTN Creation Demo', duration: '45 min', type: 'practical_demo', isFree: true },
          { title: 'Active Taxpayer List (ATL) Rules & Surcharge Procedures', duration: '50 min', type: 'video' },
          { title: 'Real Case Study: Restoring Inactive Taxpayers on ATL', duration: '60 min', type: 'case_study' },
        ],
      },
      {
        id: 'mod-2',
        number: 2,
        title: 'Module 2: Salaried & Individual Income Tax Return Filing',
        description: 'Master income tax calculations for salaried individuals, rental income, capital gains, and deduction allowances.',
        duration: '2 Weeks · 10 Masterclasses',
        lessons: [
          { title: 'Tax Rates & Computations for Salaried Individuals', duration: '45 min', type: 'video' },
          { title: 'Income from Property, Business & Other Sources', duration: '55 min', type: 'video' },
          { title: 'IRIS Return Filing Practical Walkthrough for Salaried Person', duration: '70 min', type: 'practical_demo' },
          { title: 'Real Case Study: Salaried Tax Refund Claims & Adjustment', duration: '50 min', type: 'case_study' },
        ],
      },
      {
        id: 'mod-3',
        number: 3,
        title: 'Module 3: Business Income Tax & Association of Persons (AOP)',
        description: 'Taxation for sole proprietors, partnerships, business expenses, depreciation schedules, and Minimum Tax Regime.',
        duration: '2 Weeks · 10 Masterclasses',
        lessons: [
          { title: 'Sole Proprietorship vs Partnership (AOP) Tax Framework', duration: '50 min', type: 'video' },
          { title: 'Allowable Business Expenses & Depreciation Schedules', duration: '60 min', type: 'video' },
          { title: 'Minimum Tax & Final Tax Regimes (Sec 113 & 153)', duration: '65 min', type: 'video' },
          { title: 'IRIS E-Filing Demo: Partnership Return Preparation', duration: '80 min', type: 'practical_demo' },
        ],
      },
      {
        id: 'mod-4',
        number: 4,
        title: 'Module 4: Wealth Statement (Sec 116) & Wealth Reconciliation',
        description: 'Learn the crucial art of wealth reconciliation, asset justification, foreign income disclosure, and gift deeds.',
        duration: '2 Weeks · 12 Masterclasses',
        lessons: [
          { title: 'Understanding Wealth Statement Architecture (Section 116)', duration: '50 min', type: 'video' },
          { title: 'Wealth Reconciliation Formula & Zero-Balance Mastery', duration: '75 min', type: 'video' },
          { title: 'Documenting Foreign Inflows, Banking Remittances & Gifts', duration: '60 min', type: 'case_study' },
          { title: 'IRIS Practical Demo: Wealth Statement Filing & Asset Adjustments', duration: '90 min', type: 'practical_demo' },
        ],
      },
      {
        id: 'mod-5',
        number: 5,
        title: 'Module 5: Sales Tax Act 1990 & Provincial Sales Tax Portals',
        description: 'Sales tax registration, tax invoices, monthly Annexure C filing, input tax adjustment, and PRA/SRB/KPRA compliance.',
        duration: '2 Weeks · 10 Masterclasses',
        lessons: [
          { title: 'Sales Tax Registration & Active Taxpayer List Requirements', duration: '45 min', type: 'video' },
          { title: 'Sales Tax Invoicing, Input vs Output Tax Calculations', duration: '60 min', type: 'video' },
          { title: 'IRIS Sales Tax Portal Walkthrough: Annexure C & Monthly Return', duration: '85 min', type: 'practical_demo' },
          { title: 'Provincial Sales Tax Services Compliance (PRA, SRB, KPRA)', duration: '70 min', type: 'video' },
        ],
      },
      {
        id: 'mod-6',
        number: 6,
        title: 'Module 6: Withholding Tax Compliance & Quarterly Statements',
        description: 'Withholding tax agent responsibilities, Sections 148 to 155, withholding tax collection, and Section 165 quarterly filing.',
        duration: '1 Week · 6 Masterclasses',
        lessons: [
          { title: 'Withholding Agent Obligations & Tax Rates Summary', duration: '50 min', type: 'video' },
          { title: 'IRIS E-Filing Demo: Section 165 Quarterly Withholding Statement', duration: '75 min', type: 'practical_demo' },
        ],
      },
      {
        id: 'mod-7',
        number: 7,
        title: 'Module 7: FBR Audit Notices, Notices Defense & Tax Appeals',
        description: 'Responding to FBR audit notices (Sec 122, 177, 214C), Commissioner Appeals (CIR Appeals), and Appellate Tribunal Representation.',
        duration: '1 Week · Masterclass',
        lessons: [
          { title: 'Replying to FBR Audit Notices & Document Drafting', duration: '60 min', type: 'case_study' },
          { title: 'Filing Appeals before CIR (Appeals) & Appellate Tribunal', duration: '80 min', type: 'practical_demo' },
        ],
      },
    ],
    projects: [
      {
        title: 'Wealth Reconciliation Case Study',
        description: 'Perform a full wealth statement reconciliation and asset justification for a high-net-worth individual with multiple property purchases and foreign remittances.',
        difficulty: 'Intermediate',
        estimatedHours: '10 Hours',
        toolsUsed: ['FBR IRIS Portal Demo', 'MS Excel Tax Calculators', 'Bank Statements'],
      },
      {
        title: 'Corporate Income Tax & Sales Tax Return Filing',
        description: 'Prepare and simulate monthly Sales Tax Annexure C returns and Annual Corporate Income Tax computation for a private limited trading company.',
        difficulty: 'Advanced',
        estimatedHours: '14 Hours',
        toolsUsed: ['FBR IRIS E-Filing System', 'Sales Tax Ledger Schedules', 'Financial Accounts'],
      },
      {
        title: 'FBR Notice Reply & Legal Appeals Drafting',
        description: 'Draft a formal legal response to an FBR Section 122 audit amendment notice challenging unexplained bank deposits.',
        difficulty: 'Advanced',
        estimatedHours: '12 Hours',
        toolsUsed: ['Income Tax Ordinance 2001 Manual', 'FBR Case Precedents', 'Legal Petition Templates'],
      },
    ],
    reviews: [
      {
        id: 'rev-1',
        name: 'Usman Ali Khan',
        role: 'Tax Consultant at Abbottabad Tax Bar',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Raja Gulfams practical tax masterclass transformed my practice. Studying FBR portal filing directly on the Student Mobile App allowed me to revise lectures during work hours.',
        helpfulCount: 42,
      },
      {
        id: 'rev-2',
        name: 'Ayesha Siddiqui',
        role: 'Senior Finance Officer',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
        rating: 5,
        date: '1 month ago',
        comment: 'The wealth statement reconciliation module is pure gold. Raja Gulfam explains complex legal sections in simple Urdu with practical FBR portal demos.',
        helpfulCount: 28,
      },
    ],
    faqs: [
      {
        question: 'How do I access the live and recorded classes on my smartphone?',
        answer: 'You can download the Premier LMS Student Mobile App on your Android or iOS smartphone. Simply log in with your credentials to stream live classes, re-watch HD recordings 24/7, download reference tax formats, and track your progress.',
      },
      {
        question: 'Do I receive a certificate upon course completion?',
        answer: 'Yes! Upon completing 100% of the course modules and practical case studies, you will receive an accredited Digital Diploma issued by Premier LMS & Raja Gulfam & Co. with a public verification URL.',
      },
      {
        question: 'Are classes live or recorded?',
        answer: 'The course offers a hybrid model: weekly interactive live masterclasses with Raja Gulfam for Q&A and practical case reviews, combined with 90+ hours of HD recorded video lectures available 24/7 in your Mobile App.',
      },
      {
        question: 'How long can I access the recorded classes after the course ends?',
        answer: 'You have full access to all live and recorded masterclasses, HD video lectures, and downloadable reference tax formats during the course duration plus 2 full months after course completion on the Premier LMS Student Mobile App.',
      },
    ],
  },
  {
    id: 'c-2',
    slug: 'corporate-law-and-secp-company-registration',
    title: 'Corporate Law & SECP Company Registration Masterclass',
    category: 'Corporate Law',
    status: 'Coming Soon',
    badge: 'Coming Soon',
    duration: '10 Weeks',
    weeksCount: 10,
    level: 'Intermediate',
    instructor: {
      name: 'Raja Gulfam',
      title: 'Founder & Lead Instructor (Advocate High Court)',
      avatar: '/about/founder-portrait.jpeg',
      bio: 'High Court Advocate specializing in Companies Act 2017 and corporate registration.',
      experience: '10+ Years Practice',
      teachingPhilosophy: 'Practical corporate legal advisory on official SECP eServices portals.',
      expertise: ['Companies Act 2017', 'SECP eServices Portal', 'Private Limited Incorporation', 'LLP Registration'],
      education: ['LL.B', 'ACMA'],
      certifications: ['Advocate High Court'],
      socials: { linkedin: 'https://linkedin.com' },
    },
    rating: 5.0,
    reviewCount: 0,
    ratingDistribution: [],
    studentsCount: 0,
    price: null,
    originalPrice: 50000,
    language: 'Urdu & English',
    format: 'Mobile App + Live/Recorded Masterclass',
    thumbnail: '/about/cima-certificate.jpeg',
    shortDescription: 'Master SECP company incorporation, Companies Act 2017 compliance, Form A/29 filings, Limited Liability Partnerships (LLP), single member companies, and corporate legal drafting.',
    fullDescription: 'Comprehensive training on SECP eServices portal, corporate name reservation, Memorandum & Articles of Association drafting, statutory returns, and share allotment filings.',
    whoIsThisFor: ['Corporate lawyers', 'Company secretaries', 'Chartered accountants', 'Business consultants'],
    learningObjectives: [
      'Incorporate Private Limited, SMC, and LLP companies on SECP portal',
      'Draft Memorandum and Articles of Association',
      'File annual corporate returns (Form A, Form 29, Form 21)',
    ],
    careerOpportunities: ['Corporate Legal Consultant', 'Company Secretary', 'SECP Compliance Specialist'],
    skillsIncluded: ['Companies Act 2017', 'SECP eServices Portal', 'Company Incorporation', 'Form A & 29 Filing', 'Corporate Minutes Drafting'],
    requirements: ['Mobile App access on Android/iOS or Laptop', 'Basic legal/business interest'],
    certificateInfo: { title: 'Corporate Law & SECP Practitioner Diploma', accreditation: 'Premier LMS', features: ['Public credential verification'] },
    modules: [],
    projects: [],
    reviews: [],
    faqs: [{ question: 'When will enrollment open?', answer: 'Launching in Q4 2026. Register for early bird notification inside our app.' }],
  },
  {
    id: 'c-3',
    slug: 'financial-accounting-and-bookkeeping-masterclass',
    title: 'Financial Accounting & Bookkeeping Masterclass',
    category: 'Accounting & Finance',
    status: 'Coming Soon',
    badge: 'Coming Soon',
    duration: '12 Weeks',
    weeksCount: 12,
    level: 'Beginner',
    instructor: {
      name: 'Raja Gulfam',
      title: 'Founder & Lead Instructor (ACMA)',
      avatar: '/about/founder-portrait.jpeg',
      bio: 'Associate Chartered Management Accountant leading financial accounting and reporting instruction.',
      experience: '10+ Years Practice',
      teachingPhilosophy: 'Master double-entry bookkeeping by analyzing real corporate financial statements.',
      expertise: ['IFRS Accounting Standards', 'Financial Statements', 'Tally & QuickBooks', 'General Ledger'],
      education: ['ACMA', 'LL.B'],
      certifications: ['Associate Chartered Management Accountant'],
      socials: { linkedin: 'https://linkedin.com' },
    },
    rating: 5.0,
    reviewCount: 0,
    ratingDistribution: [],
    studentsCount: 0,
    price: null,
    originalPrice: 50000,
    language: 'Urdu & English',
    format: 'Mobile App + Live/Recorded Masterclass',
    thumbnail: '/about/office-desk.jpeg',
    shortDescription: 'Master double-entry accounting, general ledger entries, trial balance, balance sheet preparation, income statements, cash flow statements, and IFRS reporting standards.',
    fullDescription: 'From core debits and credits to full corporate balance sheet finalization. Learn accounting systems, bank reconciliations, inventory valuation, and financial reporting.',
    whoIsThisFor: ['Accountants', 'Bookkeepers', 'Finance Executives', 'Small Business Owners'],
    learningObjectives: ['Prepare audited Balance Sheets and P&L statements', 'Execute monthly bank reconciliations', 'Apply International Financial Reporting Standards (IFRS)'],
    careerOpportunities: ['Chief Accountant', 'Financial Controller', 'Senior Bookkeeper'],
    skillsIncluded: ['Double-Entry Bookkeeping', 'IFRS Standards', 'Financial Statement Preparation', 'Bank Reconciliation', 'Ledger Finalization'],
    requirements: ['Mobile App access on Android/iOS or Laptop'],
    certificateInfo: { title: 'Financial Accounting Specialist Certificate', accreditation: 'Premier LMS', features: ['Verifiable diploma'] },
    modules: [],
    projects: [],
    reviews: [],
    faqs: [{ question: 'When will enrollment open?', answer: 'Launching in Q4 2026.' }],
  },
  {
    id: 'c-4',
    slug: 'forensic-audit-and-anti-money-laundering-laws',
    title: 'Forensic Audit & Anti-Money Laundering (AML) Laws',
    category: 'Audit & Fraud Investigation',
    status: 'Coming Soon',
    badge: 'Coming Soon',
    duration: '14 Weeks',
    weeksCount: 14,
    level: 'Intermediate to Advanced',
    instructor: {
      name: 'Raja Gulfam',
      title: 'Certified Fraud Investigator & High Court Advocate',
      avatar: '/about/founder-portrait.jpeg',
      bio: 'Financial forensic investigator and Anti-Money Laundering legal expert.',
      experience: '10+ Years Practice',
      teachingPhilosophy: 'Detect financial fraud and white-collar crime through systematic audit procedures.',
      expertise: ['Forensic Accounting', 'AML Act 2010', 'Financial Fraud Investigation', 'Bank Statement Audit'],
      education: ['Certified Fraud Investigator', 'ACMA', 'LL.B'],
      certifications: ['Certified Fraud Investigator', 'Anti-Money Laundering Specialist'],
      socials: { linkedin: 'https://linkedin.com' },
    },
    rating: 5.0,
    reviewCount: 0,
    ratingDistribution: [],
    studentsCount: 0,
    price: null,
    originalPrice: 599,
    language: 'Urdu & English',
    format: 'Mobile App + Live/Recorded Masterclass',
    thumbnail: '/about/fbr-award.jpeg',
    shortDescription: 'Learn financial fraud detection, forensic accounting techniques, Anti-Money Laundering (AML) Act compliance, suspicious transaction reporting (STR), and court evidence preparation.',
    fullDescription: 'Comprehensive training for financial auditors, bank compliance officers, and legal practitioners in investigating white-collar crimes, money trail analysis, and statutory audit representation.',
    whoIsThisFor: ['Internal Auditors', 'Bank Compliance Officers', 'Forensic Accountants', 'Advocates'],
    learningObjectives: ['Conduct forensic audits on corporate bank accounts', 'Comply with AML/CFT regulatory requirements', 'Prepare expert court testimony and evidence dossiers'],
    careerOpportunities: ['Forensic Auditor', 'Bank AML Compliance Manager', 'Financial Crime Investigator'],
    skillsIncluded: ['Forensic Accounting', 'AML Act 2010', 'Suspicious Transaction Reports (STR)', 'Fraud Risk Assessment', 'Litigation Evidence'],
    requirements: ['Mobile App access on Android/iOS or Laptop', 'Background in accounting, law, or banking'],
    certificateInfo: { title: 'Certified Forensic Audit Specialist', accreditation: 'Premier LMS', features: ['Hardcopy option'] },
    modules: [],
    projects: [],
    reviews: [],
    faqs: [{ question: 'When will enrollment open?', answer: 'Launching in Q1 2027.' }],
  },
  {
    id: 'c-5',
    slug: 'advanced-corporate-finance-and-management-accounting',
    title: 'Advanced Corporate Finance & Management Accounting',
    category: 'Financial Management',
    status: 'Coming Soon',
    badge: 'Coming Soon',
    duration: '16 Weeks',
    weeksCount: 16,
    level: 'Advanced',
    instructor: {
      name: 'Raja Gulfam',
      title: 'Founder & Lead Instructor (ACMA)',
      avatar: '/about/founder-portrait.jpeg',
      bio: 'Executive Partner at Raja Gulfam & Co. instructing management accounting and capital budgeting.',
      experience: '10+ Years Practice',
      teachingPhilosophy: 'Drive corporate profitability through variance analysis and strategic cost management.',
      expertise: ['Management Accounting', 'Costing Systems', 'Capital Budgeting', 'Financial Variance Analysis'],
      education: ['ACMA', 'LL.B'],
      certifications: ['Associate Chartered Management Accountant'],
      socials: { linkedin: 'https://linkedin.com' },
    },
    rating: 5.0,
    reviewCount: 0,
    ratingDistribution: [],
    studentsCount: 0,
    price: null,
    originalPrice: 50000,
    language: 'Urdu & English',
    format: 'Mobile App + Live/Recorded Masterclass',
    thumbnail: '/about/high-court.jpeg',
    shortDescription: 'Master cost accounting, marginal costing, standard costing, capital budgeting (NPV, IRR), working capital management, and financial decision-making for corporate executives.',
    fullDescription: 'Advanced management accounting strategies for CFOs, financial controllers, and senior decision-makers to optimize corporate capital structure and control operational costs.',
    whoIsThisFor: ['Financial Controllers', 'CFOs', 'Senior Accountants', 'ACMA Students'],
    learningObjectives: ['Calculate NPV, IRR, and payback periods for corporate investments', 'Implement standard costing and variance analysis', 'Optimize corporate working capital'],
    careerOpportunities: ['Chief Financial Officer (CFO)', 'Corporate Financial Controller', 'Management Accountant'],
    skillsIncluded: ['Cost Accounting', 'Capital Budgeting (NPV/IRR)', 'Variance Analysis', 'Marginal Costing', 'Financial Strategy'],
    requirements: ['Mobile App access on Android/iOS or Laptop'],
    certificateInfo: { title: 'Advanced Corporate Finance Specialist', accreditation: 'Premier LMS', features: ['Public verification URL'] },
    modules: [],
    projects: [],
    reviews: [],
    faqs: [{ question: 'When is launch expected?', answer: 'Scheduled for Q1 2027.' }],
  },
  {
    id: 'c-6',
    slug: 'customs-federal-excise-duty-and-sales-tax-audit',
    title: 'Customs, Federal Excise Duty (FED) & Indirect Tax Audit',
    category: 'Customs & Indirect Tax',
    status: 'Coming Soon',
    badge: 'Coming Soon',
    duration: '12 Weeks',
    weeksCount: 12,
    level: 'Intermediate to Advanced',
    instructor: {
      name: 'Raja Gulfam',
      title: 'Founder & Lead Instructor (Advocate High Court)',
      avatar: '/about/founder-portrait.jpeg',
      bio: 'High Court Advocate specializing in customs tariffs and federal excise litigation.',
      experience: '10+ Years Practice',
      teachingPhilosophy: 'Navigate import/export tariffs and customs clearance legal procedures.',
      expertise: ['Customs Act 1969', 'Federal Excise Act 2005', 'Import/Export Tariffs', 'Customs Appeal Tribunals'],
      education: ['LL.B High Court Advocate', 'ACMA'],
      certifications: ['Advocate High Court'],
      socials: { linkedin: 'https://linkedin.com' },
    },
    rating: 5.0,
    reviewCount: 0,
    ratingDistribution: [],
    studentsCount: 0,
    price: null,
    originalPrice: 449,
    language: 'Urdu & English',
    format: 'Mobile App + Live/Recorded Masterclass',
    thumbnail: '/about/fbr-seminar.jpeg',
    shortDescription: 'Master Customs Act 1969, Federal Excise Duty (FED) returns, import tariff classification, Goods Declaration (GD) filing, and customs audit representation.',
    fullDescription: 'Detailed practical training on Weboc customs portal, import valuation, customs duty exemptions, FED liability calculations, and representing clients before Customs Collectorate Appellate Benches.',
    whoIsThisFor: ['Customs Clearing Agents', 'Import/Export Managers', 'Indirect Tax Consultants', 'Legal Advocates'],
    learningObjectives: ['Classify goods under Pakistan Customs Tariff (PCT) codes', 'File Weboc Goods Declarations (GD)', 'Handle Federal Excise Duty compliance'],
    careerOpportunities: ['Customs Consultant', 'Import/Export Tax Manager', 'Indirect Tax Specialist'],
    skillsIncluded: ['Customs Act 1969', 'Federal Excise Act 2005', 'Weboc GD Filing', 'PCT Tariff Classification', 'Customs Appeals'],
    requirements: ['Mobile App access on Android/iOS or Laptop'],
    certificateInfo: { title: 'Customs & Indirect Tax Specialist Diploma', accreditation: 'Premier LMS', features: ['Verifiable diploma'] },
    modules: [],
    projects: [],
    reviews: [],
    faqs: [{ question: 'When is launch expected?', answer: 'Launching in Q2 2027.' }],
  },
  {
    id: 'c-7',
    slug: 'banking-credit-analysis-and-loan-portfolio-advisory',
    title: 'Banking, Credit Analysis & Financial Loan Advisory',
    category: 'Banking & Credit',
    status: 'Coming Soon',
    badge: 'Coming Soon',
    duration: '10 Weeks',
    weeksCount: 10,
    level: 'Beginner to Intermediate',
    instructor: {
      name: 'Raja Gulfam',
      title: 'Founder & Lead Instructor (Certified Financial Advisor)',
      avatar: '/about/founder-portrait.jpeg',
      bio: 'Certified Financial Advisor and corporate credit consultant.',
      experience: '10+ Years Practice',
      teachingPhilosophy: 'Structure commercial credit applications that secure bank approvals.',
      expertise: ['Bank Credit Proposal (CP)', 'Financial Ratio Analysis', 'Debt Restructuring', 'Collateral Valuation'],
      education: ['Certified Financial Advisor', 'ACMA', 'LL.B'],
      certifications: ['Certified Financial & Management Advisor'],
      socials: { linkedin: 'https://linkedin.com' },
    },
    rating: 5.0,
    reviewCount: 0,
    ratingDistribution: [],
    studentsCount: 0,
    price: null,
    originalPrice: 50000,
    language: 'Urdu & English',
    format: 'Mobile App + Live/Recorded Masterclass',
    thumbnail: '/about/office-desk.jpeg',
    shortDescription: 'Learn bank credit analysis, financial statement ratio analysis, commercial loan proposals, working capital lines, State Bank PR compliance, and debt restructuring.',
    fullDescription: 'Comprehensive training for corporate bankers, financial advisors, and CFOs in preparing bank credit proposals, evaluating borrower creditworthiness, and structuring commercial loan documentation.',
    whoIsThisFor: ['Commercial Bankers', 'Credit Analysts', 'Corporate Loan Advisors', 'Business Finance Consultants'],
    learningObjectives: ['Prepare comprehensive Credit Proposals (CP) for bank loans', 'Perform financial ratio analysis (Debt-Equity, DSCR, Current Ratio)', 'Comply with State Bank Prudential Regulations'],
    careerOpportunities: ['Commercial Credit Analyst', 'Corporate Banking Relationship Manager', 'Loan Advisory Consultant'],
    skillsIncluded: ['Bank Credit Proposals', 'Financial Ratio Analysis', 'DSCR & Cash Flow Modeling', 'SBP Prudential Regulations', 'Debt Restructuring'],
    requirements: ['Mobile App access on Android/iOS or Laptop'],
    certificateInfo: { title: 'Certified Banking & Credit Analyst', accreditation: 'Premier LMS', features: ['Credential endorsement'] },
    modules: [],
    projects: [],
    reviews: [],
    faqs: [{ question: 'When is launch expected?', answer: 'Launching in Q2 2027.' }],
  },
  {
    id: 'c-8',
    slug: 'cooperative-societies-and-ngo-legal-compliance',
    title: 'Cooperative Societies & Non-Profit (NGO) Legal Compliance',
    category: 'Corporate & NGO Laws',
    status: 'Coming Soon',
    badge: 'Coming Soon',
    duration: '10 Weeks',
    weeksCount: 10,
    level: 'Beginner to Intermediate',
    instructor: {
      name: 'Raja Gulfam',
      title: 'Cooperative Societies Expert & High Court Advocate',
      avatar: '/about/founder-portrait.jpeg',
      bio: 'Cooperative societies legal advisor and non-profit regulatory consultant.',
      experience: '10+ Years Practice',
      teachingPhilosophy: 'Ensure legal transparency and Registrar audit compliance for housing and non-profit societies.',
      expertise: ['Cooperative Societies Act', 'Section 42 NGO Registration', 'NPO Tax Exemption (Sec 2(36))', 'Registrar Audit'],
      education: ['LL.B High Court Advocate', 'ACMA'],
      certifications: ['Cooperative Societies Legal Expert'],
      socials: { linkedin: 'https://linkedin.com' },
    },
    rating: 5.0,
    reviewCount: 0,
    ratingDistribution: [],
    studentsCount: 0,
    price: null,
    originalPrice: 50000,
    language: 'Urdu & English',
    format: 'Mobile App + Live/Recorded Masterclass',
    thumbnail: '/about/cima-certificate.jpeg',
    shortDescription: 'Master Cooperative Societies Act registration, housing society audits, NPO/NGO Section 42 company incorporation, and FBR Section 2(36) tax exemption certificates.',
    fullDescription: 'Specialized legal training on forming cooperative societies, housing society elections, Registrar Cooperative audits, Section 42 non-profit incorporation, and obtaining FBR non-profit tax exemption status.',
    whoIsThisFor: ['Housing Society Legal Advisors', 'NGO Managers', 'Cooperative Auditors', 'Corporate Lawyers'],
    learningObjectives: ['Register Cooperative Housing Societies and Non-Profits', 'Obtain FBR 2(36) Tax Exemption status for trusts/NGOs', 'Conduct Registrar Cooperative statutory audits'],
    careerOpportunities: ['Cooperative Society Legal Advisor', 'NGO Compliance Officer', 'NPO Tax Consultant'],
    skillsIncluded: ['Cooperative Societies Act', 'Section 42 NPO Registration', 'FBR Tax Exemption 2(36)', 'Society Audit & By-Laws', 'Registrar Compliance'],
    requirements: ['Mobile App access on Android/iOS or Laptop'],
    certificateInfo: { title: 'Certified Cooperative & NGO Law Specialist', accreditation: 'Premier LMS', features: ['Public verification credential'] },
    modules: [],
    projects: [],
    reviews: [],
    faqs: [{ question: 'When is launch expected?', answer: 'Launching in Q3 2027.' }],
  },
  {
    id: 'c-9',
    slug: 'business-valuation-mergers-and-financial-modeling',
    title: 'Business Valuation, Mergers & Financial Modeling',
    category: 'Corporate Advisory',
    status: 'Coming Soon',
    badge: 'Coming Soon',
    duration: '12 Weeks',
    weeksCount: 12,
    level: 'Advanced',
    instructor: {
      name: 'Raja Gulfam',
      title: 'Founder & Lead Instructor (ACMA & Legal Advisor)',
      avatar: '/about/founder-portrait.jpeg',
      bio: 'Corporate M&A legal advisor and valuation practitioner.',
      experience: '10+ Years Practice',
      teachingPhilosophy: 'Model corporate transactions using Discounted Cash Flow (DCF) and SECP merger guidelines.',
      expertise: ['DCF Valuation', 'Mergers & Acquisitions', 'Financial Modeling in Excel', 'Due Diligence'],
      education: ['ACMA', 'LL.B'],
      certifications: ['Associate Chartered Management Accountant'],
      socials: { linkedin: 'https://linkedin.com' },
    },
    rating: 5.0,
    reviewCount: 0,
    ratingDistribution: [],
    studentsCount: 0,
    price: null,
    originalPrice: 50000,
    language: 'Urdu & English',
    format: 'Mobile App + Live/Recorded Masterclass',
    thumbnail: '/about/fbr-award.jpeg',
    shortDescription: 'Master Discounted Cash Flow (DCF) business valuation, financial modeling in Excel, corporate M&A due diligence, share valuation certificates, and SECP scheme of arrangement.',
    fullDescription: 'Advanced corporate finance training in building 3-statement financial models, valuing private companies, issuing SBP/SECP valuation certificates, and executing merger due diligence.',
    whoIsThisFor: ['Investment Bankers', 'Corporate Advisors', 'Chartered Accountants', 'M&A Lawyers'],
    learningObjectives: ['Build 3-statement financial models in Excel', 'Perform DCF and Comparable Company business valuations', 'Structure SECP Scheme of Arrangement M&A transactions'],
    careerOpportunities: ['Corporate Valuation Consultant', 'M&A Advisory Partner', 'Investment Analyst'],
    skillsIncluded: ['DCF Business Valuation', 'Excel Financial Modeling', 'M&A Due Diligence', 'SECP Scheme of Arrangement', 'Valuation Certificates'],
    requirements: ['Mobile App access on Android/iOS or Laptop'],
    certificateInfo: { title: 'Certified Business Valuation Specialist', accreditation: 'Premier LMS', features: ['Valuation portfolio endorsement'] },
    modules: [],
    projects: [],
    reviews: [],
    faqs: [{ question: 'When is launch expected?', answer: 'Launching in Q3 2027.' }],
  },
  {
    id: 'c-10',
    slug: 'tax-bar-practice-setup-and-independent-consultancy',
    title: 'Tax Bar Practice Setup & Independent Advisory Consultancy',
    category: 'Professional Practice',
    status: 'Coming Soon',
    badge: 'Coming Soon',
    duration: '8 Weeks',
    weeksCount: 8,
    level: 'Beginner to Intermediate',
    instructor: {
      name: 'Raja Gulfam',
      title: 'General Secretary Hazara Tax Bar Association & High Court Advocate',
      avatar: '/about/founder-portrait.jpeg',
      bio: 'General Secretary Hazara Tax Bar Association guiding young practitioners in setting up profitable tax advisory offices.',
      experience: '10+ Years Practice',
      teachingPhilosophy: 'From obtaining your Tax Bar License to managing high-fee corporate retainers.',
      expertise: ['Tax Bar Practice Management', 'Client Engagement Retainers', 'ITP Examination Preparation', 'Professional Ethics'],
      education: ['Advocate High Court', 'General Secretary Hazara Tax Bar Association'],
      certifications: ['General Secretary Hazara Tax Bar Association', 'ACMA'],
      socials: { linkedin: 'https://linkedin.com' },
    },
    rating: 5.0,
    reviewCount: 0,
    ratingDistribution: [],
    studentsCount: 0,
    price: null,
    originalPrice: 349,
    language: 'Urdu & English',
    format: 'Mobile App + Live/Recorded Masterclass',
    thumbnail: '/about/teaching-class.jpeg',
    shortDescription: 'Learn how to establish an independent tax consultancy firm, obtain Tax Bar License (ITP), acquire corporate clients, set retainer fee structures, and manage practice ethics.',
    fullDescription: 'Practical blueprint for young accountants and advocates on starting their tax consultancy firm, acquiring corporate retainers, managing client files, and scaling a reputable Tax Bar practice.',
    whoIsThisFor: ['New Income Tax Practitioners (ITPs)', 'Young Advocates starting tax practice', 'ACMA & ACCA graduates'],
    learningObjectives: ['Obtain Income Tax Practitioner (ITP) and Tax Bar Association membership', 'Draft corporate client retainer agreements', 'Scale an independent tax advisory firm'],
    careerOpportunities: ['Independent Tax Advisory Partner', 'Owner of Tax & Corporate Advisory Firm'],
    skillsIncluded: ['Tax Bar Licensing', 'Client Acquisition & Retainers', 'Office Practice Management', 'Professional Ethics', 'ITP Exam Preparation'],
    requirements: ['Mobile App access on Android/iOS or Laptop'],
    certificateInfo: { title: 'Tax Consultancy Practice Management Certificate', accreditation: 'Premier LMS', features: ['Tax Bar mentor endorsement'] },
    modules: [],
    projects: [],
    reviews: [],
    faqs: [{ question: 'When is launch expected?', answer: 'Launching in Q4 2027.' }],
  },
];

export function mapBackendCourseToFrontend(c: any): Course {
  const slug = c.id || c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const durHours = c.duration || 36;
  return {
    id: c.id,
    slug: slug,
    title: c.name,
    category: c.category || 'Tax & Accounting',
    status: c.isActive ? 'Available' : 'Coming Soon',
    badge: c.badge || (c.discountedFee === 0 ? 'Free' : undefined),
    duration: `${durHours} Hours`,
    weeksCount: Math.ceil(durHours / 3),
    level: (c.level as any) || 'Intermediate',
    instructor: {
      name: c.instructorName || 'Raja Gulfam',
      title: c.instructorTitle || 'Advocate High Court & ACMA',
      avatar: c.instructorImage || '/about/founder-portrait.jpeg',
      bio: c.instructorBio || 'Leading tax consultant, Advocate High Court, and General Secretary Hazara Tax Bar Association with decades of practice.',
      experience: '15+ Years Active Legal Practice',
      teachingPhilosophy: 'Practical case study based legal & tax training.',
      expertise: ['Income Tax Filing', 'Sales Tax', 'Corporate Compliance', 'Appellate Litigation'],
      education: ['Advocate High Court', 'ACMA', 'General Secretary Hazara Tax Bar Association'],
      certifications: ['High Court Bar License', 'ACMA Practitioner'],
      socials: { linkedin: '' },
    },
    rating: 4.9,
    reviewCount: c.reviews?.length || 120,
    ratingDistribution: [
      { stars: 5, percentage: 85, count: 102 },
      { stars: 4, percentage: 10, count: 12 },
      { stars: 3, percentage: 5, count: 6 },
    ],
    studentsCount: c.enrollments?.length || 1500,
    price: c.discountedFee ?? 30000,
    originalPrice: c.originalFee || 50000,
    language: c.language || 'Urdu & English',
    format: 'Mobile App + Live/Recorded Masterclass',
    thumbnail: c.thumbnail || '/about/teaching-class.jpeg',
    shortDescription: c.description || 'Comprehensive professional practitioner masterclass.',
    fullDescription: c.longDescription || c.description || 'Complete practitioner masterclass providing hands-on knowledge.',
    whoIsThisFor: ['Tax Practitioners', 'Advocates & Legal Consultants', 'Accountants & Finance Managers'],
    learningObjectives: c.whatYouWillLearn || ['Master tax compliance', 'Navigate corporate laws', 'Execute filing independently'],
    careerOpportunities: ['Tax & Corporate Consultant', 'Senior Tax Manager', 'Independent Legal Practitioner'],
    skillsIncluded: c.whatYouWillLearn || ['Tax Filing', 'FBR Compliance', 'Corporate Litigation'],
    requirements: c.requirements || ['Mobile App access on Android/iOS or Computer'],
    certificateInfo: {
      title: `${c.name} Certification`,
      accreditation: 'Premier LMS & Raja Gulfam Academy',
      features: ['Verifiable Certificate ID', 'Mobile App downloadable PDF'],
    },
    modules: c.modules && c.modules.length > 0 ? c.modules.map((m: any, idx: number) => ({
      id: m.id || `mod-${idx}`,
      number: idx + 1,
      title: m.title,
      description: `Module ${idx + 1} curriculum breakdown`,
      duration: `${m.lessons?.reduce((acc: number, l: any) => acc + (l.duration || 15), 0) || 60} mins`,
      lessons: m.lessons?.map((l: any) => ({
        title: l.title,
        duration: `${l.duration || 15} Mins`,
        type: 'video',
        isFree: l.isPreview || false,
      })) || [],
    })) : [
      {
        id: 'mod-1',
        number: 1,
        title: 'Core Fundamentals & Legal Regulations',
        description: 'Introduction to regulatory requirements, portals, and filing systems.',
        duration: '2 Hours',
        lessons: [
          { title: 'Overview & Portal Setup', duration: '30 Mins', type: 'video', isFree: true },
          { title: 'Filing Workflow & Calculations', duration: '45 Mins', type: 'video', isFree: false },
        ],
      },
    ],
    projects: [],
    reviews: c.reviews && c.reviews.length > 0 ? c.reviews.map((r: any, idx: number) => ({
      id: r.id || `rev-${idx}`,
      name: r.name,
      role: 'Enrolled Student',
      avatar: '/about/founder-portrait.jpeg',
      rating: r.rating || 5,
      date: r.date || 'Recent',
      comment: r.content,
      helpfulCount: 15,
    })) : [],
    faqs: [{ question: 'How do I access this course?', answer: 'Once enrolled, instant full access is granted on the Premier LMS Student Mobile App.' }],
  };
}
