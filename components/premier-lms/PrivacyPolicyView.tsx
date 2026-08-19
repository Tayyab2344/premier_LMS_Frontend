'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  Globe,
  Database,
  Server,
  Users,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Search,
  ChevronRight,
  Scale,
  Download,
  Clock,
  Send,
  Check,
  BookOpen,
  UserCheck,
  FileCheck,
  Building,
  Mail,
  SlidersHorizontal,
  X,
  ExternalLink
} from 'lucide-react';

interface Section {
  id: string;
  number: string;
  title: string;
  badge?: string;
}

const SECTIONS: Section[] = [
  { id: 'data-controller', number: '01', title: 'Data Controller & Scope', badge: 'GDPR Art. 4' },
  { id: 'data-collected', number: '02', title: 'Categories of Data Processed', badge: 'Collection' },
  { id: 'lawful-basis', number: '03', title: 'Lawful Bases for Processing', badge: 'GDPR Art. 6' },
  { id: 'watermark-security', number: '04', title: 'Video & Screen Protection', badge: 'Security' },
  { id: 'sub-processors', number: '05', title: 'Sub-Processors & Data Sharing', badge: 'Third Parties' },
  { id: 'data-transfers', number: '06', title: 'International Data Transfers', badge: 'Cross-Border' },
  { id: 'data-retention', number: '07', title: 'Data Retention & Purging', badge: 'Schedules' },
  { id: 'data-rights', number: '08', title: 'Your Data Subject Rights', badge: 'GDPR & CCPA' },
  { id: 'cookies-policy', number: '09', title: 'Cookies & Telemetry', badge: 'ePrivacy' },
  { id: 'minors-protection', number: '10', title: 'Protection of Minors', badge: 'COPPA' },
  { id: 'security-standards', number: '11', title: 'Security Protocols', badge: 'ISO 27001' },
  { id: 'dpo-contact', number: '12', title: 'DPO Contact & Recourse', badge: 'Regulatory' },
];

export function PrivacyPolicyView() {
  const [activeSection, setActiveSection] = useState<string>('data-controller');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRightsModalOpen, setIsRightsModalOpen] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Form State for Privacy Rights Request
  const [requestType, setRequestType] = useState<string>('access');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [country, setCountry] = useState<string>('Pakistan');
  const [requestDetails, setRequestDetails] = useState<string>('');

  // ScrollSpy for TOC
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleRightsFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsRightsModalOpen(false);
      setFullName('');
      setEmail('');
      setRequestDetails('');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 font-body relative overflow-hidden pb-24 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-emerald-600/10 via-indigo-600/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-2/3 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Section */}
      <header className="relative pt-12 pb-10 border-b border-slate-800/80 bg-[#090D16]/80 backdrop-blur-md">
        <div className="section-container">
          
          {/* Breadcrumb & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-emerald-400">Legal Governance</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-slate-200">Privacy Policy</span>
            </div>

            {/* International Compliance Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> GDPR & CCPA Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                <Lock className="w-3.5 h-3.5 text-indigo-400" /> ISO/IEC 27001 Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono">
                v2.4 (August 2026)
              </span>
            </div>
          </div>

          {/* Title & Headline */}
          <div className="max-w-4xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
              Global Privacy Policy & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">Data Protection Framework</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
              Premier Academy ("we", "us", "our"), founded and led by <span className="text-white font-semibold">Raja Gulfam</span>, is committed to safeguarding personal data and respecting privacy rights across all jurisdictions in compliance with international data protection regulations.
            </p>
          </div>

          {/* Document Control Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Metadata info */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" /> Effective Date: <strong className="text-slate-200 font-medium">August 1, 2026</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Building className="w-4 h-4 text-emerald-400" /> Data Controller: <strong className="text-slate-200 font-medium">Premier Academy Ltd.</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-emerald-400" /> DPO Email: <strong className="text-emerald-400 font-medium">privacy@premierlms.com</strong>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative min-w-[240px] flex-1 sm:flex-initial">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search policy clauses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#121826]/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Data Rights Button */}
              <button
                onClick={() => setIsRightsModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors shadow-lg shadow-emerald-500/20"
              >
                <UserCheck className="w-4 h-4" /> Exercise Privacy Rights
              </button>

              {/* Print Button */}
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
                title="Print or export as PDF"
              >
                <Printer className="w-4 h-4 text-slate-300" /> Print Policy
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Layout */}
      <main className="section-container pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sticky Navigation / Table of Contents */}
          <aside className="lg:col-span-4 sticky top-6 space-y-4">
            <div className="p-5 rounded-2xl bg-[#121826]/60 backdrop-blur-md border border-slate-800/80 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-400" /> Table of Contents
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {SECTIONS.length} Sections
                </span>
              </div>

              <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
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
                      onClick={() => setActiveSection(sec.id)}
                      className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all duration-200 ${
                        isActive
                          ? 'bg-emerald-500/15 border border-emerald-500/40 text-white font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className={`font-mono text-[11px] px-1.5 py-0.5 rounded ${
                          isActive ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'bg-slate-800/80 text-slate-500'
                        }`}>
                          {sec.number}
                        </span>
                        <span className="truncate">{sec.title}</span>
                      </div>
                      {sec.badge && (
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded shrink-0 ml-1 ${
                          isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {sec.badge}
                        </span>
                      )}
                    </a>
                  );
                })}
              </nav>

              {/* DPO Quick Contact Box */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-indigo-950/40 to-slate-900/80 border border-indigo-500/30 space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Need Privacy Clarification?
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Our Data Protection Officer team responds to formal privacy queries within 24-48 hours.
                </p>
                <a
                  href="mailto:privacy@premierlms.com"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold hover:underline pt-1"
                >
                  Email DPO Office <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </aside>

          {/* Right Main Policy Content */}
          <div className="lg:col-span-8 space-y-10">

            {/* Global Notice Callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900/90 to-indigo-950/30 border border-emerald-500/30 shadow-lg space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-400 font-semibold text-sm">
                <Globe className="w-5 h-5" /> Executive Summary & Compliance Declaration
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                This document sets forth the global privacy principles governing all websites, learning management systems, web platforms, and mobile applications operated by <strong className="text-white">Premier Academy</strong>. Whether you are accessing our courses from the European Union, United States, United Kingdom, Pakistan, or globally, we adhere strictly to transparent data collection, robust encryption, non-surveillance principles, and explicit user control over personal data.
              </p>
            </div>

            {/* Section 1 */}
            <section id="data-controller" className="scroll-mt-28 space-y-4 p-6 sm:p-8 rounded-2xl bg-[#121826]/60 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/30 transition-colors shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center">
                    01
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                    Data Controller Identification & Scope
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  GDPR Article 4(7)
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                For the purposes of applicable data protection laws, including the European Union General Data Protection Regulation (EU GDPR 2016/679), the UK Data Protection Act 2018, and the California Consumer Privacy Act (CCPA/CPRA), the designated Data Controller responsible for your personal data is:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <Building className="w-4 h-4" /> Corporate Entity
                  </div>
                  <div className="text-sm font-semibold text-white">Premier Academy Legal Operations</div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    Premier Corporate Tower, Main Boulevard, Pakistan<br />
                    Founder & Executive Instructor: Raja Gulfam
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Data Protection Officer (DPO)
                  </div>
                  <div className="text-sm font-semibold text-white">Office of Privacy Governance</div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    Direct Email: <a href="mailto:dpo@premierlms.com" className="text-emerald-400 hover:underline">dpo@premierlms.com</a><br />
                    Response Guarantee: Within 30 Calendar Days
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
                This policy applies to all registered students, course attendees, website visitors, mobile application users, and prospective applicants seeking professional accreditation through Premier Academy.
              </p>
            </section>

            {/* Section 2 */}
            <section id="data-collected" className="scroll-mt-28 space-y-4 p-6 sm:p-8 rounded-2xl bg-[#121826]/60 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/30 transition-colors shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center">
                    02
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                    Categories of Personal Data We Process
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Data Categorization
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We collect personal data directly provided by you, as well as data generated automatically during your interaction with our learning infrastructure:
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: '1. Identity & Account Credentials',
                    icon: Users,
                    desc: 'Full name, email address, phone number, national tax identification/CNIC (where required for certified tax compliance reporting), profile photo, user account password hashes (salted Argon2/bcrypt).',
                  },
                  {
                    title: '2. Educational & Assessment Telemetry',
                    icon: BookOpen,
                    desc: 'Course enrollments, quiz submission scores, video watch progress, live Zoom seminar attendance records, assignment attachments, and digital certificate verification tokens.',
                  },
                  {
                    title: '3. Billing & Payment Information',
                    icon: FileText,
                    desc: 'Payment card metadata, billing address, transaction IDs, payment status. Note: Full payment card details are processed directly by PCI-DSS Level 1 certified payment gateways (Stripe/Bank Gateways) and are NEVER stored on Premier Academy servers.',
                  },
                  {
                    title: '4. Forensic Screen Protection Telemetry',
                    icon: Eye,
                    desc: 'Dynamic video overlay session metadata including user email, active session timestamp, IP address, and playback token used exclusively to prevent unauthorized copying of proprietary tax materials.',
                  },
                  {
                    title: '5. Technical & Network Diagnostics',
                    icon: Server,
                    desc: 'IP address, browser type and version, operating system, system language, geographic country code, referring URLs, device identifiers, and server diagnostic access logs.',
                  },
                ].map((cat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-start gap-3.5">
                    <cat.icon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-white">{cat.title}</div>
                      <p className="text-xs text-slate-300 leading-relaxed">{cat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3 */}
            <section id="lawful-basis" className="scroll-mt-28 space-y-4 p-6 sm:p-8 rounded-2xl bg-[#121826]/60 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/30 transition-colors shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center">
                    03
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                    Lawful Bases for Processing (GDPR Article 6)
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Legal Justification
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We only collect and process personal data when we have an explicit lawful basis under International Privacy Law:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/70 border border-emerald-500/20 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Performance of Contract
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Processing necessary to deliver enrolled course modules, issue certificates, process course payments, and provide student support.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-indigo-500/20 space-y-2">
                  <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Legitimate Interest
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Preventing fraud, safeguarding intellectual property, watermarking proprietary lecture content, and optimizing platform performance.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-700 space-y-2">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-emerald-400" /> Legal Compliance
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Fulfilling corporate tax audits, financial recordkeeping obligations, and responding to lawful subpoenas or court orders.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-700 space-y-2">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-indigo-400" /> Explicit Consent
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Sending promotional updates, newsletters, or third-party partner offers. Consent may be revoked at any time via settings.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="watermark-security" className="scroll-mt-28 space-y-4 p-6 sm:p-8 rounded-2xl bg-[#121826]/60 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/30 transition-colors shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center">
                    04
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                    Forensic Screen Protection & Anti-Piracy Watermarking
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  IP Safeguard Notice
                </span>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm leading-relaxed space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <AlertTriangle className="w-4 h-4 shrink-0" /> Dynamic Forensic Watermarking Transparency Notice
                </div>
                <p>
                  To protect the proprietary tax models, financial frameworks, and confidential curriculum created by <strong className="text-white">Raja Gulfam</strong>, Premier Academy embeds a dynamic, semi-transparent forensic watermark during video stream rendering.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The watermark displays the logged-in student's email address and current IP address across random coordinates on the video player. This telemetry:
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside pl-2">
                <li>Is used strictly for deterrence against screen recording and illegal redistribution.</li>
                <li>Is dynamically generated in-memory and is never sold or shared with external advertisers.</li>
                <li>Operates under Premier Academy's legitimate interest (GDPR Art. 6(1)(f)) to protect intellectual property against illegal piracy.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="sub-processors" className="scroll-mt-28 space-y-4 p-6 sm:p-8 rounded-2xl bg-[#121826]/60 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/30 transition-colors shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center">
                    05
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                    Third-Party Sub-Processors & Data Sharing
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Disclosure Table
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We engage trusted third-party service providers (sub-processors) to perform operational infrastructure functions. All sub-processors are bound by strict Data Processing Agreements (DPAs) incorporating standard contractual clauses:
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                      <th className="py-3 px-4">Sub-Processor</th>
                      <th className="py-3 px-4">Role / Function</th>
                      <th className="py-3 px-4">Data Center Location</th>
                      <th className="py-3 px-4">Transfer Safeguard</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-semibold text-white">Amazon Web Services (AWS)</td>
                      <td className="py-3 px-4">Cloud Server Hosting & Encrypted Database Storage</td>
                      <td className="py-3 px-4">US / EU Regions</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-emerald-400">EU-US DPF / SCCs</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-semibold text-white">Cloudflare Inc.</td>
                      <td className="py-3 px-4">CDN, DDoS Mitigation & Web Security Firewall</td>
                      <td className="py-3 px-4">Global Edge Network</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-emerald-400">ISO 27001 / SCCs</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-semibold text-white">Stripe & Local Gateways</td>
                      <td className="py-3 px-4">PCI-DSS Payment Processing & Invoicing</td>
                      <td className="py-3 px-4">US / Global</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-emerald-400">PCI Level 1 / SCCs</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-semibold text-white">Zoom Video Communications</td>
                      <td className="py-3 px-4">Live Masterclass Webinar Broadcasting</td>
                      <td className="py-3 px-4">Global Network</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-emerald-400">SOC 2 Type II / SCCs</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-semibold text-white">Postmark / SendGrid</td>
                      <td className="py-3 px-4">Transactional Email & Admission Notifications</td>
                      <td className="py-3 px-4">US East</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-emerald-400">TLS 1.3 / SCCs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 6 */}
            <section id="data-transfers" className="scroll-mt-28 space-y-4 p-6 sm:p-8 rounded-2xl bg-[#121826]/60 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/30 transition-colors shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center">
                    06
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                    International Cross-Border Data Transfers
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Global Safeguards
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                As a global tax and accounting academy serving students worldwide, personal data may be accessed or transferred across international borders. Whenever cross-border transfers occur, we implement European Commission-approved Standard Contractual Clauses (SCCs) alongside technical measures (end-to-end TLS encryption and AES-256 data at rest) to guarantee equivalent data protection.
              </p>
            </section>

            {/* Section 7 */}
            <section id="data-retention" className="scroll-mt-28 space-y-4 p-6 sm:p-8 rounded-2xl bg-[#121826]/60 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/30 transition-colors shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center">
                    07
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                    Data Retention & Automated Purge Schedules
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Storage Limits
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Personal data is retained only for the duration necessary to fulfill the purposes outlined in this policy or to comply with statutory legal requirements:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <div className="text-emerald-400 font-bold">Active Account Profile</div>
                  <div className="text-slate-200 font-medium">Duration of Active Enrollment + 2 Years</div>
                  <p className="text-slate-400 text-[11px]">Maintained to enable course re-access and certification verification.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <div className="text-indigo-300 font-bold">Financial Audit Records</div>
                  <div className="text-slate-200 font-medium">7 Years (Statutory Tax Requirement)</div>
                  <p className="text-slate-400 text-[11px]">Invoices, payment receipts, and tax reporting logs.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <div className="text-teal-300 font-bold">Web Telemetry & Logs</div>
                  <div className="text-slate-200 font-medium">180 Calendar Days</div>
                  <p className="text-slate-400 text-[11px]">Server access logs and security diagnostic telemetry.</p>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="data-rights" className="scroll-mt-28 space-y-4 p-6 sm:p-8 rounded-2xl bg-[#121826]/60 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/30 transition-colors shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center">
                    08
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                    Your Data Subject Rights (GDPR & CCPA Framework)
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Enforceable Rights
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Under European Union GDPR, UK GDPR, and California CCPA/CPRA, you are entitled to execute the following enforceable privacy rights without fee or penalty:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { title: 'Right to Access & Portability', desc: 'Request a machine-readable JSON/CSV export of all personal data held in your account profile.' },
                  { title: 'Right to Erasure ("Right to be Forgotten")', desc: 'Request permanent deletion of your profile and data (subject to statutory financial retention exemptions).' },
                  { title: 'Right to Rectification', desc: 'Correct inaccurate or incomplete educational profile details at any time directly or via support.' },
                  { title: 'Right to Object & Opt-Out', desc: 'Opt out of marketing communications or object to legitimate interest processing.' },
                  { title: 'Right to Non-Discrimination', desc: 'We do not discriminate or deny service quality if you exercise any legal privacy right.' },
                  { title: 'Do Not Sell / Share My Data', desc: 'Premier Academy DOES NOT sell or rent personal data to commercial brokers.' },
                ].map((r, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">{r.title}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <button
                  onClick={() => setIsRightsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-500/20"
                >
                  <UserCheck className="w-4 h-4" /> Open Data Rights Portal
                </button>
              </div>
            </section>

            {/* Section 9 */}
            <section id="cookies-policy" className="scroll-mt-28 space-y-4 p-6 sm:p-8 rounded-2xl bg-[#121826]/60 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/30 transition-colors shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center">
                    09
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                    Cookies & Telemetry Disclosure
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  ePrivacy Directive
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We use strictly necessary cookies to maintain session authentication, alongside performance telemetry to analyze video playback stability. You may manage your preference choices below:
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white">Strictly Necessary Cookies</span>
                    <p className="text-slate-400 text-[11px]">Required for login security, CSRF protection, and course player state.</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase">Always Active</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white">Performance & Analytics Telemetry</span>
                    <p className="text-slate-400 text-[11px]">Helps us monitor stream buffering speeds and system error rates.</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 font-bold text-[10px] uppercase">User Opt-In</span>
                </div>
              </div>
            </section>

            {/* Section 10 */}
            <section id="minors-protection" className="scroll-mt-28 space-y-4 p-6 sm:p-8 rounded-2xl bg-[#121826]/60 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/30 transition-colors shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center">
                    10
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                    Protection of Minors (COPPA Compliance)
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Age Restriction
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Premier Academy provides professional accounting, tax strategy, and audit training designed for adults. We do not knowingly collect personal data from individuals under 16 years of age. If we learn that a user under 16 has submitted personal data without verified parental consent, we will purge the account immediately.
              </p>
            </section>

            {/* Section 11 */}
            <section id="security-standards" className="scroll-mt-28 space-y-4 p-6 sm:p-8 rounded-2xl bg-[#121826]/60 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/30 transition-colors shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center">
                    11
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                    Security Protocols & Breach Notification
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  AES-256 / TLS 1.3
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We employ industry-leading administrative, technical, and physical safeguards including AES-256 database encryption at rest, TLS 1.3 encrypted network transit, strict role-based authorization, and automated vulnerability scanning. In the unlikely event of a security breach affecting your personal data, we guarantee notification to affected users and supervisory authorities within <strong>72 hours</strong> as mandated by GDPR Article 33.
              </p>
            </section>

            {/* Section 12 */}
            <section id="dpo-contact" className="scroll-mt-28 space-y-4 p-6 sm:p-8 rounded-2xl bg-[#121826]/60 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/30 transition-colors shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center">
                    12
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                    DPO Office Contact & Regulatory Recourse
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Regulatory Authorities
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                If you have questions, concerns, or unresolved grievances regarding our processing of your personal data, please contact our Data Protection Officer directly:
              </p>

              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="text-sm font-semibold text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400" /> Data Protection & Governance Directorate
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <div><strong>Email:</strong> privacy@premierlms.com / dpo@premierlms.com</div>
                  <div><strong>Address:</strong> Office of Legal & Privacy Governance, Premier Corporate Tower, Main Boulevard, Pakistan</div>
                  <div><strong>Founder Supervision:</strong> Raja Gulfam Executive Secretariat</div>
                </div>
                <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                  If you are residing in the European Economic Area (EEA) or UK and feel your privacy grievance has not been satisfactorily addressed, you retain the statutory right to lodge a formal complaint with your local Data Protection Authority (e.g., the UK Information Commissioner's Office - ICO or EU EDPB Member State Authorities).
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Data Rights Exercise Request Modal */}
      <AnimatePresence>
        {isRightsModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl rounded-2xl bg-[#121826] border border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsRightsModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                  <UserCheck className="w-3.5 h-3.5" /> Formal Data Subject Request (DSR)
                </div>
                <h3 className="text-xl font-heading font-bold text-white">
                  Exercise Your International Privacy Rights
                </h3>
                <p className="text-xs text-slate-300">
                  Submit a formal request under GDPR or CCPA. Our Data Protection Office will verify identity and process your application within 30 days.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <div className="text-base font-bold text-white">Request Successfully Submitted</div>
                  <p className="text-xs text-slate-300">
                    A confirmation ticket has been dispatched to your email address. Our DPO will contact you shortly if identity verification is required.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRightsFormSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Request Type</label>
                    <select
                      value={requestType}
                      onChange={(e) => setRequestType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="access">Access & Data Export (Receive copy of my data)</option>
                      <option value="erasure">Erasure / Account Deletion ("Right to be Forgotten")</option>
                      <option value="rectification">Rectification (Correct inaccurate info)</option>
                      <option value="optout">Opt-Out of Marketing & Telemetry</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Muhammad Ali"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Registered Account Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@example.com"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Country of Residence</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Specific Request Details / Instructions</label>
                    <textarea
                      rows={3}
                      value={requestDetails}
                      onChange={(e) => setRequestDetails(e.target.value)}
                      placeholder="Please specify any particular dates, courses, or data elements..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsRightsModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors"
                    >
                      Submit Official Request
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
