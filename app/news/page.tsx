'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileText,
  X,
  BookOpen,
  Mail,
  ShieldCheck,
  Award,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorTitle: string;
  authorImage: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  image: string;
  featured?: boolean;
  officialRef?: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    slug: 'fbr-income-tax-return-deadline-extension-2026',
    title: 'FBR Circular No. 4 of 2026: Extension for Income Tax Return Filing & Wealth Reconciliation',
    category: 'FBR SROs & Income Tax',
    date: 'July 24, 2026',
    readTime: '5 min read',
    author: 'Raja Gulfam',
    authorTitle: 'Advocate High Court & ACMA',
    authorImage: '/about/founder-portrait.jpeg',
    summary: 'The Federal Board of Revenue (FBR) has issued official guidance regarding tax year 2026 returns. Key procedural changes apply to Active Taxpayer List (ATL) maintenance and Section 37A capital gain reconciliations.',
    featured: true,
    officialRef: 'FBR Circular No. 04 / C.No.1(2)R&S/2026',
    image: '/about/fbr-seminar.jpeg',
    keyTakeaways: [
      'Automatic extension granted for individual tax returns under Section 214A.',
      'Active Taxpayer List (ATL) surcharge calculation updated for late filers.',
      'Mandatory wealth reconciliation format enforced on FBR IRIS portal v2.4.',
    ],
    content: [
      'The Federal Board of Revenue (FBR) has formally issued Circular No. 04 of 2026 providing detailed compliance procedural relief for individual tax filers, business enterprises, and salaried individuals for Tax Year 2026.',
      'Under Section 214A of the Income Tax Ordinance 2001, the Member In-Charge of Inland Revenue Operations confirmed that electronic tax return filing servers on the IRIS portal have been upgraded to accommodate wealth statement reconciliations without system timeouts during peak hours.',
      'Advocate Raja Gulfam notes: "Tax practitioners must pay special attention to Section 111 (Unexplained Income & Assets) cross-checks. FBR integrated data matching algorithms now compare bank transaction volumes against declared income automatically prior to issuing ATL verification certificates."',
    ],
  },
  {
    id: 'news-2',
    slug: 'secp-mandatory-digital-beneficial-ownership-filing',
    title: 'SECP Notification: Mandatory Filing of Ultimate Beneficial Ownership (UBO) for Private Limited Companies',
    category: 'SECP Circulars',
    date: 'July 18, 2026',
    readTime: '7 min read',
    author: 'Raja Gulfam',
    authorTitle: 'Advocate High Court & ACMA',
    authorImage: '/about/founder-portrait.jpeg',
    summary: 'Securities and Exchange Commission of Pakistan mandates all incorporated companies to update Form 45 on eServices portal to comply with FATF & Anti-Money Laundering regulations.',
    officialRef: 'SECP S.R.O. 582(I)/2026',
    image: '/about/cima-certificate.jpeg',
    keyTakeaways: [
      'Form 45 filing now mandatory for all single-member and private limited companies.',
      'Failure to report foreign beneficial owners incurs daily statutory penalties under Companies Act 2017.',
      'Updated eServices portal integration walkthrough available on Premier LMS Student Mobile App.',
    ],
    content: [
      'In line with national anti-money laundering frameworks and FATF compliance standards, the Securities and Exchange Commission of Pakistan (SECP) has issued S.R.O. 582(I)/2026, directing all corporate entities to submit updated Ultimate Beneficial Ownership disclosures.',
      'Company secretaries and legal practitioners are required to verify ultimate individual owners holding 10% or more voting rights or capital shares.',
      'Advocate Raja Gulfam emphasizes: "Corporate consultants must review Form 45 and Form A/29 filings simultaneously to prevent corporate compliance default notices from the registrar of companies."',
    ],
  },
  {
    id: 'news-3',
    slug: 'pra-srb-sales-tax-on-services-harmonization-2026',
    title: 'Punjab Revenue Authority (PRA) & SRB Sales Tax Harmonization Framework 2026',
    category: 'Sales Tax & PRA',
    date: 'July 12, 2026',
    readTime: '6 min read',
    author: 'Raja Gulfam',
    authorTitle: 'Advocate High Court & ACMA',
    authorImage: '/about/founder-portrait.jpeg',
    summary: 'A comprehensive guide on resolving cross-provincial sales tax input adjustments between FBR (IRIS), PRA, and Sindh Revenue Board (SRB) for IT services, logistics, and consultancies.',
    officialRef: 'PRA Directive No. 12 / Sales Tax 2026',
    image: '/about/office-desk.jpeg',
    keyTakeaways: [
      'Single Sales Tax Portal integration protocol finalized between provincial revenue authorities.',
      'Annexure C sales tax input tax credit claiming rules clarified for multi-provincial services.',
      'Withholding tax regulations under Punjab Sales Tax on Services Act updated for FY2026.',
    ],
    content: [
      'The Punjab Revenue Authority (PRA) along with the Sindh Revenue Board (SRB) and Khyber Pakhtunkhwa Revenue Authority (KPRA) have established an updated single-window sales tax return reconciliation framework.',
      'This harmonization resolves long-standing double-taxation issues faced by IT exporters, logistics providers, and corporate advisory firms operating across provincial boundaries.',
      'Raja Gulfam explains: "Input tax credit claims under Annexure C are now cross-matched across provincial databases. Mismatches will trigger automated withholding tax audit notices if not reconciled correctly on monthly returns."',
    ],
  },
  {
    id: 'news-4',
    slug: 'customs-act-valuation-rulings-and-fed-revisions',
    title: 'Customs Valuation Ruling 2026 & Federal Excise Duty (FED) Tariff Adjustments',
    category: 'Customs & FED',
    date: 'June 30, 2026',
    readTime: '8 min read',
    author: 'Raja Gulfam',
    authorTitle: 'Advocate High Court & ACMA',
    authorImage: '/about/founder-portrait.jpeg',
    summary: 'Analysis of the latest Customs Valuation Rulings issued by the Directorate General of Valuation, Karachi, impact on imported industrial raw materials and FED compliance.',
    officialRef: 'Valuation Ruling No. 1892 / 2026',
    image: '/about/fbr-award.jpeg',
    keyTakeaways: [
      'Revised ITP (Import Trade Price) values implemented at Karachi Ports & WebOC portal.',
      'Section 25A customs valuation appeal procedure updated for aggrieved importers.',
      'New FED rates applicable on telecommunication, financial services, and luxury goods.',
    ],
    content: [
      'The Directorate General of Customs Valuation, Karachi, has released Valuation Ruling No. 1892/2026 adjusting import trade prices across key chemical, electronic, and industrial raw material lines.',
      'Importers and customs cleared agents must adjust WebOC GD entries accordingly to prevent consignment clearance delays and demurrage penalties.',
      'Advocate Raja Gulfam advises: "Where assessed values exceed actual transaction values, importers have 30 days to file revision petitions under Section 25D of the Customs Act 1969 before the Director General."',
    ],
  },
  {
    id: 'news-5',
    slug: 'high-court-precedent-section-111-unexplained-income',
    title: 'Lahore High Court Precedent: Reassessment Standards Under Section 111 (Unexplained Income)',
    category: 'High Court Rulings',
    date: 'June 20, 2026',
    readTime: '10 min read',
    author: 'Raja Gulfam',
    authorTitle: 'Advocate High Court & ACMA',
    authorImage: '/about/founder-portrait.jpeg',
    summary: 'Landmark ruling clarifying burden of proof on Inland Revenue officers prior to issuing notices under Section 111(1)(b) of the Income Tax Ordinance 2001.',
    officialRef: 'LHC Tax Reference No. 412 / 2026',
    image: '/about/high-court.jpeg',
    keyTakeaways: [
      'Inland Revenue officers cannot issue arbitrary Section 111 notices without tangible evidence.',
      'Bank credit entries alone do not constitute concealed income without prior inquiry.',
      'Reaffirmation of taxpayer rights during appellate tribunal proceedings.',
    ],
    content: [
      'In a landmark tax reference judgement, the Honorable Lahore High Court ruled that Inland Revenue officers must record concrete reasons to believe prior to invoking Section 111 (Unexplained Income & Investment).',
      'The court set aside arbitrary tax demands based solely on total bank credit turnover, emphasizing that gross turnover differs legally from taxable net income.',
      'Raja Gulfam remarks: "This High Court precedent provides strong protection for tax practitioners defending clients against ungrounded audit notices before the Commissioner Appeals and Appellate Tribunal."',
    ],
  },
  {
    id: 'news-6',
    slug: 'premier-lms-mobile-app-update-v2',
    title: 'Premier LMS Mobile App V2 Released: Offline HD Recordings & FBR Template Downloads',
    category: 'Academy News',
    date: 'June 10, 2026',
    readTime: '4 min read',
    author: 'Raja Gulfam',
    authorTitle: 'Advocate High Court & ACMA',
    authorImage: '/about/founder-portrait.jpeg',
    summary: 'Students can now download official FBR return filing Excel templates, wealth reconciliation sheets, and watch offline live class recordings directly inside the mobile app.',
    officialRef: 'Premier LMS Release Notes v2.4.0',
    image: '/about/teaching-class.jpeg',
    keyTakeaways: [
      'Offline video playback enabled for all enrolled diploma students.',
      'Direct download of FBR tax return filing Excel models & SECP draft formats.',
      'Real-time push notifications for live Q&A sessions with Raja Gulfam.',
    ],
    content: [
      'Premier LMS has officially rolled out version 2.4.0 of its Student Mobile App on iOS App Store and Google Play Store.',
      'The update introduces direct offline lesson viewing, interactive legal case file downloads, and real-time push alerts whenever FBR or SECP issues urgent regulatory circulars.',
      'All enrolled students receive immediate access to 24/7 HD recordings, wealth statement calculators, and accredited diploma verification badges.',
    ],
  },
];

export default function NewsPage() {
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  // Lock background scroll when article modal is active
  useEffect(() => {
    if (activeArticle) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [activeArticle]);

  const leadStory = newsArticles[0];
  const secondaryStories = newsArticles.slice(1, 3);
  const sidebarBriefings = newsArticles.slice(1);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-[115px] pb-20">
      <div className="section-container space-y-10">

        {/* ── Main Gazette Editorial Grid (8 cols Main Lead Story + 4 cols Regulatory Sidebar) ── */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* LEFT 8 COLUMNS: Lead Front Page Story + Secondary Headlines */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Main Lead Story Card */}
            {leadStory && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden cursor-pointer" onClick={() => setActiveArticle(leadStory)}>
                  <Image
                    src={leadStory.image}
                    alt={leadStory.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  
                  <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-xs text-white/90 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-300" />
                      {leadStory.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-200" />
                      {leadStory.readTime}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-heading font-bold text-premier-green uppercase tracking-wider">
                      {leadStory.category}
                    </span>
                    <h2
                      onClick={() => setActiveArticle(leadStory)}
                      className="text-lg sm:text-xl font-heading font-extrabold text-heading leading-snug group-hover:text-premier-green transition-colors cursor-pointer"
                    >
                      {leadStory.title}
                    </h2>
                  </div>

                  {leadStory.officialRef && (
                    <div className="p-2.5 rounded-xl bg-premier-green-50/60 border border-premier-green/20 text-xs font-mono text-heading flex items-center gap-2">
                      <FileText className="w-4 h-4 text-premier-green shrink-0" />
                      <span className="truncate">Ref: <strong>{leadStory.officialRef}</strong></span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-border bg-slate-200 shrink-0">
                        <Image
                          src={leadStory.authorImage}
                          alt={leadStory.author}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-heading font-bold text-heading">{leadStory.author}</h4>
                        <p className="text-[10px] text-body">{leadStory.authorTitle}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveArticle(leadStory)}
                      className="btn-primary !py-1.5 !px-3.5 !text-xs font-heading font-bold flex items-center gap-1.5"
                    >
                      Read Full Article
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Secondary Highlight Stories Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {secondaryStories.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-3xl border border-border overflow-hidden shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group p-5 space-y-4"
                >
                  <div className="space-y-3">
                    <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-900 cursor-pointer" onClick={() => setActiveArticle(article)}>
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    </div>

                    <span className="inline-block text-xs font-heading font-bold text-premier-green uppercase tracking-wider">
                      {article.category}
                    </span>

                    <h3
                      onClick={() => setActiveArticle(article)}
                      className="text-base font-heading font-bold text-heading group-hover:text-premier-green transition-colors leading-snug line-clamp-2 cursor-pointer"
                    >
                      {article.title}
                    </h3>

                    {article.officialRef && (
                      <div className="pt-1">
                        <span className="inline-block text-[10px] font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 truncate max-w-full">
                          Ref: {article.officialRef}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden border border-border bg-slate-200 shrink-0">
                        <Image
                          src={article.authorImage}
                          alt={article.author}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <span className="text-xs font-heading font-semibold text-heading truncate max-w-[100px]">
                        {article.author}
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveArticle(article)}
                      className="text-premier-green font-heading font-bold hover:underline flex items-center gap-1"
                    >
                      Read Article <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT 4 COLUMNS: Regulatory SRO Bulletins & News Briefings Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-border p-6 shadow-soft space-y-5 sticky top-28">
              
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  
                  <h3 className="font-heading font-bold text-heading text-sm uppercase tracking-wider">
                    Regulatory  Bulletins
                  </h3>
                </div>
                
              </div>

              <div className="space-y-3.5 divide-y divide-border">
                {sidebarBriefings.map((article, index) => (
                  <div
                    key={article.id}
                    onClick={() => setActiveArticle(article)}
                    className="pt-3.5 first:pt-0 group cursor-pointer space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span className="font-bold text-premier-green">#{String(index + 1).padStart(2, '0')}</span>
                      <span>{article.category}</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-heading font-bold text-heading group-hover:text-premier-green transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h4>

                    {article.officialRef && (
                      <p className="text-[10px] font-mono text-slate-500 truncate bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                        {article.officialRef}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                      <span>{article.date}</span>
                      <span className="text-premier-green font-heading font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        View Brief <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* ── Section: Full Publication Gazette Cards (Image on Left, Text on Right) ── */}
        <div className="pt-8 space-y-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-heading font-extrabold text-heading">
                All Gazette Publications & Case Rulings ({newsArticles.length})
              </h3>
              <p className="text-xs text-body mt-0.5">Explore detailed tax circulars, SECP notifications, and High Court reference judgements</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {newsArticles.map((article) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl border border-border overflow-hidden shadow-soft hover:shadow-card-hover hover:border-premier-green/40 transition-all duration-300 grid sm:grid-cols-12 items-stretch group"
              >
                {/* Left Column: Picture */}
                <div
                  onClick={() => setActiveArticle(article)}
                  className="sm:col-span-5 relative min-h-[200px] sm:min-h-full bg-slate-900 overflow-hidden cursor-pointer"
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    sizes="(max-width: 640px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Right Column: Text Content */}
                <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Header Info: Category, Date, ReadTime */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-body">
                      <span className="px-3 py-0.5 rounded-full bg-premier-green-50 text-premier-green text-[11px] font-heading font-extrabold uppercase">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-premier-green" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {article.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => setActiveArticle(article)}
                      className="text-base sm:text-lg font-heading font-bold text-heading group-hover:text-premier-green transition-colors leading-snug line-clamp-2 cursor-pointer"
                    >
                      {article.title}
                    </h3>

                    {/* Ref Tag */}
                    {article.officialRef && (
                      <div className="pt-1">
                        <span className="inline-block text-[10px] font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 truncate max-w-full">
                          Ref: {article.officialRef}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Footer: Author & Read More */}
                  <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-border bg-slate-200 shrink-0">
                        <Image
                          src={article.authorImage}
                          alt={article.author}
                          fill
                          className="object-cover object-top"
                          sizes="28px"
                        />
                      </div>
                      <span className="text-xs font-heading font-semibold text-heading truncate max-w-[110px]">
                        {article.author}
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveArticle(article)}
                      className="text-xs font-heading font-bold text-premier-green hover:text-premier-green-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      Read More
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Weekly FBR & SECP Newsletter Signup ───────────── */}
        <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 border border-slate-800 shadow-card relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-premier-green/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-premier-gold/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-premier-gold text-xs font-heading font-bold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              Weekly Regulatory Digest
            </span>

            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight leading-snug">
              Stay ahead of FBR Tax Amendments & SECP Corporate Circulars
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-body">
              Join 4,500+ tax consultants, chartered accountants, and finance managers who receive our weekly legal compliance summary delivered directly to their inbox.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs font-heading font-semibold">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>Thank you! You are now subscribed to Premier Regulatory Digest updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your professional email..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-premier-gold focus:ring-1 focus:ring-premier-gold"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-premier-gold text-slate-950 hover:bg-amber-400 text-xs font-heading font-extrabold tracking-wide uppercase shadow-md transition-all whitespace-nowrap justify-center focus:outline-none focus:ring-2 focus:ring-premier-gold focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  Subscribe for Free
                </button>
              </form>
            )}

            <div className="flex items-center gap-4 text-xs text-slate-300 pt-2 font-body font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> No spam. Unsubscribe anytime.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Article Detail Modal ──────────────────────────── */}
      <AnimatePresence>
        {activeArticle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] h-full flex flex-col rounded-3xl overflow-hidden bg-white shadow-2xl relative max-w-3xl w-full border border-border"
            >
              {/* 1. FIXED TOP HEADER BAR */}
              <div className="shrink-0 bg-white border-b border-border p-6 flex items-center justify-between z-20">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-premier-green-50 text-premier-green text-xs font-heading font-extrabold uppercase">
                    {activeArticle.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {activeArticle.date} · {activeArticle.readTime}
                  </span>
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 2. FREELY SCROLLABLE CONTENT BODY */}
              <div
                tabIndex={0}
                ref={(el) => el?.focus()}
                onWheel={(e) => e.stopPropagation()}
                className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-6 custom-modal-scrollbar focus:outline-none"
              >
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-heading leading-tight">
                  {activeArticle.title}
                </h2>

                {activeArticle.officialRef && (
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-heading flex items-center gap-2">
                    <FileText className="w-4 h-4 text-premier-green shrink-0" />
                    <span>Official Reference: <strong>{activeArticle.officialRef}</strong></span>
                  </div>
                )}

                {/* Cover Image */}
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-900">
                  <Image
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Author & Citation */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border bg-slate-200 shrink-0">
                      <Image
                        src={activeArticle.authorImage}
                        alt={activeArticle.author}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-heading font-bold text-heading">{activeArticle.author}</h4>
                      <p className="text-[11px] text-body">{activeArticle.authorTitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <BookOpen className="w-4 h-4 text-premier-green" />
                    <span>Verified Legal Analysis</span>
                  </div>
                </div>

                {/* Key Takeaways */}
                {activeArticle.keyTakeaways && activeArticle.keyTakeaways.length > 0 && (
                  <div className="p-5 rounded-2xl bg-premier-green-50/70 border border-premier-green/20 space-y-3">
                    <h4 className="text-xs font-heading font-bold text-premier-green uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Key Compliance Takeaways
                    </h4>
                    <ul className="space-y-2">
                      {activeArticle.keyTakeaways.map((takeaway, idx) => (
                        <li key={idx} className="text-xs text-heading flex items-start gap-2">
                          <span className="text-premier-green font-bold">•</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Article Paragraphs */}
                <div className="space-y-4 text-body text-xs sm:text-sm leading-relaxed border-t border-border pt-4">
                  {activeArticle.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {/* Modal Actions */}
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="px-5 py-2.5 rounded-xl border border-border text-xs font-heading font-bold text-heading hover:bg-slate-50 transition-colors"
                  >
                    Close Article
                  </button>

                  <Link
                    href="/admission"
                    onClick={() => setActiveArticle(null)}
                    className="btn-primary !py-2.5 !px-5 text-xs font-heading font-bold"
                  >
                    Enroll in Tax & Accounting Diploma
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
