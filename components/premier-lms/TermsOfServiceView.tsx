'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Scale,
  ShieldAlert,
  BookOpen,
  DollarSign,
  AlertTriangle,
  Printer,
  Search,
  ChevronRight,
  Lock,
  Clock,
  Building,
  Mail,
  X,
  CheckCircle2,
  ExternalLink,
  Users
} from 'lucide-react';

interface Section {
  id: string;
  number: string;
  title: string;
  badge?: string;
}

const SECTIONS: Section[] = [
  { id: 'acceptance', number: '01', title: 'Acceptance of Terms & Binding Contract', badge: 'Enforceable' },
  { id: 'account-security', number: '02', title: 'Account Registration & Security', badge: 'Single User' },
  { id: 'enrollment-refunds', number: '03', title: 'Enrollment, Fees & Refund Policy', badge: '7-Day Guarantee' },
  { id: 'intellectual-property', number: '04', title: 'Proprietary IP & Video Licensing', badge: 'Raja Gulfam IP' },
  { id: 'acceptable-use', number: '05', title: 'Acceptable Use & Code of Conduct', badge: 'Conduct' },
  { id: 'academic-integrity', number: '06', title: 'Academic Integrity & Certification', badge: 'Proctoring' },
  { id: 'platform-availability', number: '07', title: 'Platform SLA & Uptime Availability', badge: '99.9% Target' },
  { id: 'disclaimers-liability', number: '08', title: 'Disclaimers & Limitation of Liability', badge: 'Liability Cap' },
  { id: 'indemnification', number: '09', title: 'User Indemnification Obligations', badge: 'Legal Defense' },
  { id: 'dispute-resolution', number: '10', title: 'Dispute Resolution & Binding Arbitration', badge: 'Jurisdiction' },
  { id: 'amendments', number: '11', title: 'Amendments & Modifications', badge: 'Updates' },
  { id: 'legal-contact', number: '12', title: 'Official Legal Contact & Notices', badge: 'Governance' },
];

export function TermsOfServiceView() {
  const [activeSection, setActiveSection] = useState<string>('acceptance');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // ScrollSpy for Right Content Scroll Container
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerTop = container.getBoundingClientRect().top;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const elTop = el.getBoundingClientRect().top - containerTop;
          if (elTop <= 180) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection(id);
    const targetEl = document.getElementById(id);
    const container = scrollContainerRef.current;
    if (targetEl && container) {
      const containerTop = container.getBoundingClientRect().top;
      const targetTop = targetEl.getBoundingClientRect().top;
      const offset = targetTop - containerTop + container.scrollTop - 20;
      container.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-body relative selection:bg-emerald-500/20 selection:text-emerald-900">
      
      {/* Light Header Section */}
      <header className="relative pt-[118px] pb-8 border-b border-slate-200 bg-white shadow-sm">
        <div className="section-container">
          
          {/* Breadcrumb & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href="/" className="hover:text-emerald-700 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-emerald-800 font-bold">Legal Governance</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900">Terms & Conditions</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <Scale className="w-3.5 h-3.5 text-emerald-600" /> Legally Binding Agreement
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold">
                <Lock className="w-3.5 h-3.5 text-indigo-600" /> Raja Gulfam Proprietary License
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono">
                v2.4 (August 2026)
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="max-w-4xl space-y-3">
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
              Terms & Conditions of <span className="text-emerald-800">Educational Service</span>
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl">
              These Terms & Conditions govern your access to and use of all course content, live seminars, digital learning management systems, and professional accreditation services provided by <strong className="text-slate-900 font-semibold">Premier Academy</strong> under executive instruction of <strong className="text-slate-900 font-semibold">Raja Gulfam</strong>.
            </p>
          </div>

          {/* Document Controls Bar */}
          <div className="mt-8 pt-5 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" /> Effective Date: <strong className="text-slate-900 font-medium">August 1, 2026</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Building className="w-4 h-4 text-emerald-600" /> Corporate Entity: <strong className="text-slate-900 font-medium">Premier Academy Ltd.</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-emerald-600" /> Legal Email: <strong className="text-emerald-700 font-semibold">legal@premierlms.com</strong>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search Clause */}
              <div className="relative min-w-[240px] flex-1 sm:flex-initial">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search terms clauses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100/80 border border-slate-300 text-xs text-slate-900 placeholder-slate-500 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Print Button */}
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-300 transition-colors shadow-sm"
                title="Print or export as PDF"
              >
                <Printer className="w-4 h-4 text-slate-600" /> Print Terms
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Main Container with Static TOC (Left) & Independently Scrolling Content (Right) */}
      <main className="section-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* STATIC / STICKY TABLE OF CONTENTS (LEFT SIDEBAR) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-[125px] space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-md">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" /> Table of Contents
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                  {SECTIONS.length} Sections
                </span>
              </div>

              <nav className="space-y-1 max-h-[calc(100vh-260px)] overflow-y-auto pr-1">
                {SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  const isMatched = searchQuery
                    ? sec.title.toLowerCase().includes(searchQuery.toLowerCase())
                    : true;

                  if (!isMatched) return null;

                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => scrollToSection(sec.id, e)}
                      className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all duration-200 ${
                        isActive
                          ? 'bg-emerald-50 border border-emerald-300/80 text-emerald-900 font-bold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className={`font-mono text-[11px] px-1.5 py-0.5 rounded ${
                          isActive ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 text-slate-500 font-medium'
                        }`}>
                          {sec.number}
                        </span>
                        <span className="truncate">{sec.title}</span>
                      </div>
                      {sec.badge && (
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded shrink-0 ml-1 ${
                          isActive ? 'bg-emerald-100 text-emerald-800 font-semibold' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {sec.badge}
                        </span>
                      )}
                    </a>
                  );
                })}
              </nav>

              {/* Quick Legal Support Box */}
              <div className="mt-5 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold">
                  <Scale className="w-4 h-4 text-emerald-600" /> Have Contract Questions?
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Our legal governance counsel is available to answer student licensing or corporate agreement queries.
                </p>
                <a
                  href="mailto:legal@premierlms.com"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-bold hover:underline pt-1"
                >
                  Contact Legal Secretariat <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </aside>

          {/* SCROLLING CONTENT AREA (RIGHT SIDEBAR) */}
          <div
            ref={scrollContainerRef}
            className="lg:col-span-8 lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto pr-1 space-y-8 scroll-smooth"
          >

            {/* Legal Notice Card */}
            <div className="p-6 rounded-2xl bg-white border border-indigo-200 shadow-md space-y-3">
              <div className="flex items-center gap-2.5 text-indigo-950 font-bold text-sm">
                <ShieldAlert className="w-5 h-5 text-indigo-600" /> Important Notice of Enforceable Agreement
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                BY CREATING AN ACCOUNT, ENROLLING IN A COURSE, WATCHING LECTURE VIDEOS, OR USING ANY PREMIER ACADEMY PLATFORM SERVICES, YOU AGREE TO BE BOUND BY ALL TERMS AND CONDITIONS CONTAINED HEREIN. IF YOU DO NOT AGREE TO THESE TERMS, YOU MUST NOT ACCESS OR USE THE PLATFORM.
              </p>
            </div>

            {/* Section 1 */}
            <section id="acceptance" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono font-bold text-sm flex items-center justify-center">
                    01
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                    Acceptance of Terms & Binding Legal Contract
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Enforceability
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                This document constitutes a legally binding agreement between you ("Student", "Learner", or "User") and Premier Academy Ltd., including its founder, directors, instructors, and affiliates.
              </p>

              <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Eligibility:</strong> You represent and warrant that you are at least 18 years of age (or have reached the age of majority in your jurisdiction) and possess full legal capacity to enter into binding contracts.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Electronic Signature:</strong> Clicking "Enroll Now", registering an account, or logging into our learning environment constitutes your valid electronic signature.</span>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="account-security" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono font-bold text-sm flex items-center justify-center">
                    02
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                    User Account Registration & Security Rules
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Single User Rule
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-emerald-800 uppercase flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-600" /> Sole Named Entitlement
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Each course enrollment grants access strictly to ONE named individual. Sharing account credentials, passwords, or session tokens with colleagues or third parties is strictly prohibited.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-indigo-800 uppercase flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-indigo-600" /> Security Responsibility
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    You are solely responsible for maintaining the confidentiality of your login credentials. You agree to notify Premier Academy immediately upon discovering any unauthorized access.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="enrollment-refunds" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono font-bold text-sm flex items-center justify-center">
                    03
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                    Course Enrollment, Fees & 7-Day Refund Policy
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                  Money-Back Guarantee
                </span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs sm:text-sm space-y-1.5">
                <div className="font-bold text-emerald-900 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" /> 7-Day Unconditional Money-Back Guarantee
                </div>
                <p className="leading-relaxed text-slate-600">
                  We stand behind the quality of Raja Gulfam's corporate tax and financial accounting masterclasses. If you are not satisfied within <strong>7 calendar days</strong> of initial course enrollment (and provided you have completed less than 25% of the video curriculum), you may request a 100% full refund.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-600 pt-2">
                <div><strong>Currency & Taxes:</strong> All course fees are stated exclusive of applicable sales tax, VAT, or local withholding tax unless explicitly indicated.</div>
                <div><strong>Non-Refundable Items:</strong> Issued digital completion certificates, 1-on-1 private coaching sessions, and downloaded proprietary Excel tax templates are strictly non-refundable once accessed.</div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="intellectual-property" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono font-bold text-sm flex items-center justify-center">
                    04
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                    Proprietary Intellectual Property & Video Licensing
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  Copyright Covenants
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                All course lectures, video streams, audio recordings, financial modeling spreadsheets, tax guides, slides, logos, and instructional materials are the exclusive intellectual property of <strong className="text-slate-900">Raja Gulfam & Premier Academy</strong> protected under international copyright treaties.
              </p>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-slate-700 space-y-2">
                <div className="font-bold text-amber-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> Strict Prohibitions & Forensic Anti-Piracy Covenants
                </div>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>You are granted a revocable, non-exclusive, non-transferable personal license to view content solely for your individual professional education.</li>
                  <li><strong>Prohibited Actions:</strong> Screen recording, video capture, ripping, public broadcasting, re-selling, uploading to torrents/Telegram, or sharing login access is strictly illegal.</li>
                  <li><strong>Forensic Watermark Consent:</strong> You explicitly consent to dynamic overlay watermarking displaying your account details across video streams to deter unauthorized distribution.</li>
                  <li>Violators will face immediate account termination without refund, permanent revocation of certificates, and legal prosecution seeking statutory copyright damages.</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section id="acceptable-use" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono font-bold text-sm flex items-center justify-center">
                    05
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                    Acceptable Use Policy & Community Standards
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Student Conduct
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                When participating in live Zoom masterclasses, student discussion boards, or interacting with fellow professionals:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900">Professional Civility</div>
                  <p className="text-slate-600">Harassment, hate speech, disruptive behavior in live Q&A sessions, or offensive conduct will result in instant ejection.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900">System Security Integrity</div>
                  <p className="text-slate-600">Attempting to reverse-engineer API endpoints, inject malicious scripts, or probe infrastructure is prohibited.</p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="academic-integrity" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono font-bold text-sm flex items-center justify-center">
                    06
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                    Academic Integrity, Exam Proctoring & Certification
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Accreditation
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Certificates of completion issued by Premier Academy reflect verified professional competence. To maintain certificate value:
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside pl-2">
                <li>Students must complete all required modules and achieve minimum passing scores on final exams independently.</li>
                <li>Impersonation, hiring third parties to complete exams, or submitting plagiarized assignments is ground for certificate cancellation.</li>
                <li>Employers and third-party verifiers can authenticate digital certificates via our public cryptographic verification lookup.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="platform-availability" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono font-bold text-sm flex items-center justify-center">
                    07
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                    Platform Availability & 99.9% Uptime Target SLA
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 font-semibold">
                  SLA Target
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We strive to maintain a 99.9% platform uptime for online course streaming and dashboard access. Scheduled maintenance windows are performed during low-traffic periods with advance notice. We are not liable for internet connectivity disruptions occurring beyond our cloud infrastructure boundaries.
              </p>
            </section>

            {/* Section 8 */}
            <section id="disclaimers-liability" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono font-bold text-sm flex items-center justify-center">
                    08
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                    Educational Disclaimers & Limitation of Liability
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Liability Cap
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600 space-y-3">
                <div className="font-bold text-slate-900">1. Educational Disclaimer (Not Personal Tax or Legal Advice)</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All lectures, tax strategies, and financial models provided by Raja Gulfam and Premier Academy are for general educational purposes only. They do not constitute formal personalized tax advisory, legal counsel, or financial auditing services for specific corporate entities.
                </p>

                <div className="font-bold text-slate-900 pt-2 border-t border-slate-200">2. Aggregate Liability Cap</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PREMIER ACADEMY AND RAJA GULFAM SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES. OUR MAXIMUM AGGREGATE LIABILITY ARISING FROM OR RELATED TO YOUR USE OF THE PLATFORM SHALL NOT EXCEED THE TOTAL FEES PAID BY YOU TO PREMIER ACADEMY IN THE PRECEDING TWELVE (12) MONTHS.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section id="indemnification" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono font-bold text-sm flex items-center justify-center">
                    09
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                    User Defense & Indemnification Obligations
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Indemnity
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You agree to defend, indemnify, and hold harmless Premier Academy Ltd., Raja Gulfam, its officers, directors, employees, and agents from and against any third-party claims, liabilities, losses, damages, and expenses (including reasonable attorneys' fees) arising out of or in connection with your breach of these Terms, unauthorized content distribution, or violation of third-party rights.
              </p>
            </section>

            {/* Section 10 */}
            <section id="dispute-resolution" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono font-bold text-sm flex items-center justify-center">
                    10
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                    Dispute Resolution, Mandatory Arbitration & Governing Law
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 font-semibold">
                  Jurisdiction
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                In the event of any controversy, claim, or dispute arising out of or relating to these Terms:
              </p>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>1. Informal Negotiation:</strong> The parties agree to first attempt to resolve any dispute informally by contacting <a href="mailto:legal@premierlms.com" className="text-emerald-700 font-semibold hover:underline">legal@premierlms.com</a> for at least 30 calendar days prior to initiating formal legal proceedings.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>2. Binding Individual Arbitration:</strong> If informal negotiation fails, disputes shall be settled by final and binding arbitration administered in accordance with standard commercial arbitration rules.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>3. Class Action Waiver:</strong> YOU AND PREMIER ACADEMY AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS ACTION.
                </div>
              </div>
            </section>

            {/* Section 11 */}
            <section id="amendments" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono font-bold text-sm flex items-center justify-center">
                    11
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                    Amendments & Modifications to Terms
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Version Governance
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We reserve the right to modify these Terms at any time to reflect updates in international legal standards, technology, or business operations. Material updates will be notified via email or dashboard alert 30 days prior to taking effect. Continued platform access after effective date constitutes acceptance.
              </p>
            </section>

            {/* Section 12 */}
            <section id="legal-contact" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono font-bold text-sm flex items-center justify-center">
                    12
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                    Official Legal Contact & Notices
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Governance
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                For formal legal notices, copyright claims, or contract inquiries, please direct correspondence to:
              </p>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-emerald-600" /> Office of Corporate Governance & Legal Affairs
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div><strong>Legal Inquiries Email:</strong> legal@premierlms.com</div>
                  <div><strong>General Support Email:</strong> support@premierlms.com</div>
                  <div><strong>Physical Address:</strong> Legal Directorate, Premier Corporate Tower, Main Boulevard, Pakistan</div>
                  <div><strong>Founder & Managing Director:</strong> Raja Gulfam</div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
