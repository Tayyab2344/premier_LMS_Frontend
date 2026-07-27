'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const newsItems = [
  {
    id: 'n1',
    title: 'FBR Circular No. 4 of 2026: Extension for Income Tax Return Filing & Wealth Reconciliation',
    category: 'FBR SROs & Tax',
    date: 'July 24, 2026',
    desc: 'Official guidance on Tax Year 2026 return extensions, Active Taxpayer List (ATL) maintenance, and Section 37A capital gain rules.',
    gradient: 'from-blue-600 to-indigo-700',
    ref: 'FBR Circular No. 04/2026',
  },
  {
    id: 'n2',
    title: 'SECP Notification: Mandatory Filing of Ultimate Beneficial Ownership (UBO) Disclosures',
    category: 'SECP Circulars',
    date: 'July 18, 2026',
    desc: 'SECP mandates Form 45 filing on eServices portal for all incorporated companies to meet FATF & Anti-Money Laundering requirements.',
    gradient: 'from-purple-600 to-indigo-700',
    ref: 'SECP S.R.O. 582(I)/2026',
  },
  {
    id: 'n3',
    title: 'Punjab Revenue Authority (PRA) & SRB Sales Tax Harmonization Framework',
    category: 'Sales Tax & PRA',
    date: 'July 12, 2026',
    desc: 'Single-window sales tax input tax credit reconciliation between FBR IRIS, PRA, and SRB for services & corporate consultancies.',
    gradient: 'from-emerald-600 to-teal-700',
    ref: 'PRA Directive No. 12/2026',
  },
];

export function LatestNews() {
  return (
    <section className="section-padding bg-white border-t border-border" id="news">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary text-xs font-body font-semibold uppercase tracking-wider">
              Regulatory Updates
            </span>
            <h2 className="text-4xl sm:text-[48px] font-heading font-extrabold text-heading leading-[1.1]" style={{ letterSpacing: '-0.03em' }}>
              News &amp; Regulatory Insights
            </h2>
            <p className="text-body text-base">
              Stay updated with statutory circulars, High Court precedents, and practical tax guides authored by Raja Gulfam.
            </p>
          </div>

          <Link href="/news" className="btn-secondary !py-3 !px-6 shrink-0">
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
              className="bg-white rounded-3xl border border-border/90 overflow-hidden shadow-soft hover:shadow-card-hover hover:border-primary/40 transition-all duration-300 flex flex-col group"
            >
              <Link href="/news" className="flex flex-col h-full">
                {/* Graphic Banner */}
                <div className={`h-48 bg-gradient-to-br ${news.gradient} p-6 flex flex-col justify-between relative overflow-hidden text-white`}>
                  <span className="self-start px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-heading font-bold">
                    {news.category}
                  </span>
                  <div className="flex items-center justify-between text-white/80 text-xs">
                    <span className="flex items-center gap-1.5 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {news.date}
                    </span>
                    <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded font-mono">
                      {news.ref}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-heading font-bold text-heading leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-body text-xs leading-relaxed line-clamp-3">
                      {news.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <span className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-primary group-hover:translate-x-1 transition-transform">
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
