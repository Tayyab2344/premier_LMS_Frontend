'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';

const newsItems = [
  {
    id: 'n1',
    title: 'FBR Circular No. 4 of 2026: Extension for Income Tax Return Filing & Wealth Reconciliation',
    category: 'FBR SROs & Tax',
    date: 'July 24, 2026',
    desc: 'Official guidance on Tax Year 2026 return extensions, Active Taxpayer List (ATL) maintenance, and Section 37A capital gain rules.',
    headerBg: 'bg-gradient-to-br from-premier-green-dark via-premier-green to-premier-green-dark',
    badgeColor: 'bg-premier-gold/20 text-premier-gold border-premier-gold/40',
    ref: 'FBR Circular No. 04/2026',
  },
  {
    id: 'n2',
    title: 'SECP Notification: Mandatory Filing of Ultimate Beneficial Ownership (UBO) Disclosures',
    category: 'SECP Circulars',
    date: 'July 18, 2026',
    desc: 'SECP mandates Form 45 filing on eServices portal for all incorporated companies to meet FATF & Anti-Money Laundering requirements.',
    headerBg: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    ref: 'SECP S.R.O. 582(I)/2026',
  },
  {
    id: 'n3',
    title: 'Punjab Revenue Authority (PRA) & SRB Sales Tax Harmonization Framework',
    category: 'Sales Tax & PRA',
    date: 'July 12, 2026',
    desc: 'Single-window sales tax input tax credit reconciliation between FBR IRIS, PRA, and SRB for services & corporate consultancies.',
    headerBg: 'bg-gradient-to-br from-[#0F3524] via-premier-green to-[#0a2318]',
    badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
    ref: 'PRA Directive No. 12/2026',
  },
];

export function LatestNews() {
  return (
    <section className="section-padding bg-premier-cream border-t border-border" id="news">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-premier-green-50 text-premier-green text-xs font-heading font-semibold uppercase tracking-wider border border-premier-green/10">
              Regulatory Updates
            </span>
            <h2 className="text-4xl sm:text-[48px] font-heading font-extrabold text-heading leading-[1.1]" style={{ letterSpacing: '-0.03em' }}>
              News &amp; Regulatory Insights
            </h2>
            <p className="text-body text-base sm:text-lg">
              Stay updated with statutory circulars, High Court precedents, and practical tax guides authored by Raja Gulfam.
            </p>
          </div>

          <Link href="/news" className="btn-secondary !py-3 !px-6 shrink-0 focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream">
            View News Page
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 News Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((news, i) => (
            <motion.article
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl border border-border/80 overflow-hidden shadow-card hover:shadow-card-hover hover:border-premier-green/40 transition-all duration-300 flex flex-col group"
            >
              <Link href="/news" className="flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-white">
                {/* Branded Dark Header Banner */}
                <div className={`h-48 ${news.headerBg} p-6 flex flex-col justify-between relative overflow-hidden text-white`}>
                  <div className="flex items-center justify-between z-10">
                    <span className={`px-3.5 py-1 rounded-full text-xs font-heading font-bold backdrop-blur-md border ${news.badgeColor}`}>
                      {news.category}
                    </span>
                    <FileText className="w-5 h-5 opacity-40 text-white" />
                  </div>

                  <div className="flex items-center justify-between text-white/90 text-xs z-10 font-body">
                    <span className="flex items-center gap-1.5 font-mono font-medium">
                      <Calendar className="w-3.5 h-3.5 text-premier-gold" />
                      {news.date}
                    </span>
                    <span className="text-[10px] bg-white/10 backdrop-blur-sm border border-white/15 px-2.5 py-0.5 rounded-full font-mono text-white/90">
                      {news.ref}
                    </span>
                  </div>
                </div>

                {/* Card Body in Crisp White for High Contrast */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-white">
                  <div className="space-y-2">
                    <h3 className="text-base font-heading font-bold text-slate-900 leading-snug group-hover:text-premier-green transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 font-body">
                      {news.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/60">
                    <span className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-premier-green group-hover:translate-x-1 transition-transform">
                      Read Complete Update <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
