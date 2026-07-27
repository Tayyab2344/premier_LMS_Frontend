'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Newspaper,
  Calendar,
  Clock,
  Search,
  ArrowRight,
  ChevronRight,
  Filter,
  CheckCircle2,
  FileText,
  X,
  BookOpen,
  Mail,
  ShieldCheck,
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

const categories = [
  'All Updates',
  'FBR SROs & Income Tax',
  'SECP Circulars',
  'Sales Tax & PRA',
  'Customs & FED',
  'High Court Rulings',
  'Academy News',
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Updates');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const featured = newsArticles.find((a) => a.featured) || newsArticles[0];

  const filteredArticles = newsArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All Updates' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      {/* ── Breadcrumb & Hero Header ───────────────────────── */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-16 border-b border-slate-800">
        <div className="section-container space-y-6">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-heading">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary-300 font-semibold">News &amp; Regulatory Updates</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary-300 text-xs font-heading font-bold uppercase tracking-wider">
              <Newspaper className="w-3.5 h-3.5" />
              Pakistani Tax &amp; Corporate Regulatory Hub
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
              FBR SROs, SECP Circulars &amp; Tax Law Updates
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Authoritative statutory analysis, court precedents, and practical compliance walkthroughs published directly by Advocate High Court &amp; ACMA Raja Gulfam.
            </p>
          </div>
        </div>
      </section>

      <div className="section-container space-y-12 mt-10">
        {/* ── Featured Article Card Banner ──────────────────── */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 grid lg:grid-cols-12 gap-0"
          >
            <div className="lg:col-span-7 relative min-h-[280px] lg:min-h-[400px] bg-slate-900">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3.5 py-1 rounded-full bg-primary text-white text-xs font-heading font-extrabold uppercase tracking-wider shadow-sm">
                  ★ Featured Regulatory Update
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-body">
                  <span className="font-heading font-bold text-primary uppercase tracking-wider">
                    {featured.category}
                  </span>
                  <div className="flex items-center gap-3 text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime}
                    </span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-heading leading-snug hover:text-primary transition-colors cursor-pointer" onClick={() => setActiveArticle(featured)}>
                  {featured.title}
                </h2>

                <p className="text-body text-sm leading-relaxed line-clamp-3">
                  {featured.summary}
                </p>

                {featured.officialRef && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-heading flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate">Ref: {featured.officialRef}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border bg-slate-200 shrink-0">
                    <Image
                      src={featured.authorImage}
                      alt={featured.author}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-bold text-heading">{featured.author}</h4>
                    <p className="text-[10px] text-body">{featured.authorTitle}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveArticle(featured)}
                  className="btn-primary !py-2.5 !px-4 text-xs font-heading font-bold flex items-center gap-1.5"
                >
                  Read Full Article
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Search & Category Filter Bar ─────────────────── */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-border shadow-soft">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FBR SROs, SECP circulars, court rulings..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-heading focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <Filter className="w-4 h-4 text-primary shrink-0 hidden sm:block" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-slate-100 text-body hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Articles Grid ────────────────────────────────── */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-bold text-heading">
              Latest Regulatory Publications ({filteredArticles.length})
            </h3>
            {selectedCategory !== 'All Updates' && (
              <button
                onClick={() => {
                  setSelectedCategory('All Updates');
                  setSearchQuery('');
                }}
                className="text-xs text-primary hover:underline font-heading font-semibold"
              >
                Clear Filters
              </button>
            )}
          </div>

          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-2xl border border-border p-12 text-center space-y-3">
              <FileText className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-base font-heading font-bold text-heading">No regulatory updates match your search</h4>
              <p className="text-xs text-body">Try searching for terms like "FBR", "SECP", "Sales Tax", or "High Court".</p>
              <button
                onClick={() => {
                  setSelectedCategory('All Updates');
                  setSearchQuery('');
                }}
                className="btn-secondary !py-2 text-xs font-heading font-bold"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl border border-border overflow-hidden shadow-soft hover:shadow-card-hover hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Thumbnail Image Header */}
                    <div className="relative h-48 bg-slate-900 overflow-hidden cursor-pointer" onClick={() => setActiveArticle(article)}>
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                      <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                        <span className="self-start px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-primary text-[11px] font-heading font-extrabold uppercase shadow-sm">
                          {article.category}
                        </span>

                        <div className="flex items-center justify-between text-xs text-white/90 font-medium font-mono">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-amber-300" />
                            {article.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-blue-200" />
                            {article.readTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Article Body */}
                    <div className="p-6 space-y-3">
                      <h3
                        onClick={() => setActiveArticle(article)}
                        className="text-base font-heading font-bold text-heading group-hover:text-primary transition-colors leading-snug line-clamp-2 cursor-pointer"
                      >
                        {article.title}
                      </h3>

                      <p className="text-body text-xs leading-relaxed line-clamp-3">
                        {article.summary}
                      </p>

                      {article.officialRef && (
                        <div className="pt-2">
                          <span className="inline-block text-[10px] font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 truncate max-w-full">
                            Ref: {article.officialRef}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Article Footer */}
                  <div className="p-6 pt-0 space-y-4">
                    <div className="pt-4 border-t border-border/60 flex items-center justify-between">
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
                        <span className="text-xs font-heading font-semibold text-heading truncate max-w-[120px]">
                          {article.author}
                        </span>
                      </div>

                      <button
                        onClick={() => setActiveArticle(article)}
                        className="text-xs font-heading font-bold text-primary hover:text-primary-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                      >
                        Read More
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* ── Weekly FBR & SECP Newsletter Signup ───────────── */}
        <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 border border-slate-800 shadow-card relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-body font-bold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              Weekly Regulatory Digest
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
              Get Instant FBR Circulars &amp; SECP SRO Alerts in Your Inbox
            </h3>
            <p className="text-slate-300 text-sm font-body leading-relaxed">
              Join over 4,500+ tax practitioners, corporate lawyers, and accountants in Pakistan who receive weekly statutory summaries and practical filing guides written by Raja Gulfam.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-body font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                Thank you! You are now subscribed to Premier LMS Weekly Regulatory Updates.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email (e.g. practitioner@domain.pk)"
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="btn-accent !py-3 !px-6 text-xs font-body font-bold whitespace-nowrap justify-center"
                >
                  Subscribe for Free
                </button>
              </form>
            )}

            <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-2 font-mono">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> No spam. Unsubscribe anytime.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Article Detail Modal ──────────────────────────── */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-card border border-border relative my-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary-50 text-primary text-xs font-heading font-extrabold uppercase">
                    {activeArticle.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {activeArticle.date} · {activeArticle.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-heading leading-tight">
                  {activeArticle.title}
                </h2>

                {activeArticle.officialRef && (
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-heading flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary shrink-0" />
                    <span>Official Reference: <strong>{activeArticle.officialRef}</strong></span>
                  </div>
                )}
              </div>

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
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>Premier LMS Faculty</span>
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="p-5 rounded-2xl bg-primary-50/60 border border-primary-100 space-y-3">
                <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-primary">
                  Key Practitioner Takeaways
                </h4>
                <ul className="space-y-2 text-xs text-heading font-medium">
                  {activeArticle.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main Content Paragraphs */}
              <div className="space-y-4 text-sm text-heading leading-relaxed font-sans border-t border-border pt-4">
                {activeArticle.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Related Masterclass Callout */}
              <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-amber-300">
                    Master Practical Compliance
                  </span>
                  <h4 className="text-sm font-heading font-bold text-white">
                    Enroll in Raja Gulfam's Tax &amp; Corporate Diploma
                  </h4>
                </div>
                <Link
                  href="/courses/certified-income-tax-and-sales-tax-practitioner"
                  className="btn-primary text-xs !py-2.5 !px-5 whitespace-nowrap shrink-0"
                >
                  View Course Details
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
