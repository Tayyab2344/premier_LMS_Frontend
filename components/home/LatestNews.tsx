'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import no1Img from '@/assets/no1.png';
import no2Img from '@/assets/no2.png';
import no3Img from '@/assets/no3.png';

const newsItems = [
  {
    id: 'n1',
    title: 'FBR Circular No. 4 of 2026: Extension for Income Tax Return Filing & Wealth Reconciliation',
    category: 'FBR SROs & Tax',
    date: 'July 24, 2026',
    desc: 'Official guidance on Tax Year 2026 return extensions, Active Taxpayer List (ATL) maintenance, and Section 37A capital gain rules.',
    ref: 'FBR Circular No. 04/2026',
    image: no1Img,
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    id: 'n2',
    title: 'SECP Notification: Mandatory Filing of Ultimate Beneficial Ownership (UBO) Disclosures',
    category: 'SECP Circulars',
    date: 'July 18, 2026',
    desc: 'SECP mandates Form 45 filing on eServices portal for all incorporated companies to meet FATF & Anti-Money Laundering requirements.',
    ref: 'SECP S.R.O. 582(I)/2026',
    image: no2Img,
    badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
  },
  {
    id: 'n3',
    title: 'Punjab Revenue Authority (PRA) & SRB Sales Tax Harmonization Framework',
    category: 'Sales Tax & PRA',
    date: 'July 12, 2026',
    desc: 'Single-window sales tax input tax credit reconciliation between FBR IRIS, PRA, and SRB for services & corporate consultancies.',
    ref: 'PRA Directive No. 12/2026',
    image: no3Img,
    badgeColor: 'bg-blue-400/20 text-blue-300 border-blue-400/30',
  },
];

export function LatestNews() {
  return (
    <section className="py-24 bg-[#091B13] text-white border-t border-emerald-900/40 relative overflow-hidden" id="news">
      {/* Ambient Radial Background Lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-700/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-heading font-extrabold text-white leading-[1.15]"
              style={{ letterSpacing: '-0.03em' }}
            >
              News &amp; Regulatory Insights
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-emerald-100/80 text-base sm:text-lg"
            >
              Stay updated with statutory circulars, High Court precedents, and practical tax guides authored by Raja Gulfam.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/news"
              className="inline-flex items-center gap-2 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-heading font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20 group"
            >
              View News Hub
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* 3 Distinct Image Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((news, i) => (
            <motion.article
              key={news.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#0D241A] rounded-3xl border border-emerald-800/40 overflow-hidden shadow-2xl hover:border-emerald-500/50 hover:shadow-emerald-950/50 transition-all duration-300 flex flex-col group relative"
            >
              <Link href="/news" className="flex flex-col h-full">
                {/* Image Container with Zoom Effect & Gradient Overlay */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D241A] via-[#0D241A]/40 to-transparent" />

                  {/* Category Pill Overlay */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-heading font-bold backdrop-blur-md border ${news.badgeColor}`}>
                      {news.category}
                    </span>
                  </div>

                  {/* Ref Tag Overlay */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-[10px] font-mono bg-black/60 backdrop-blur-md text-emerald-200 px-2.5 py-1 rounded-md border border-white/10">
                      {news.ref}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#0D241A]">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400/80 text-xs font-mono">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{news.date}</span>
                    </div>

                    <h3 className="text-lg font-heading font-bold text-white leading-snug group-hover:text-emerald-300 transition-colors line-clamp-2">
                      {news.title}
                    </h3>

                    <p className="text-emerald-100/70 text-xs leading-relaxed line-clamp-3 font-body">
                      {news.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-emerald-800/40 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-emerald-400 group-hover:text-white transition-colors">
                      Read Full Report <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <ExternalLink className="w-4 h-4 text-emerald-600 group-hover:text-emerald-400 transition-colors" />
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

