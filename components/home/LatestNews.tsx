'use client';

import React, { useMemo } from 'react';
import { FileText, Building2, ReceiptText, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// ─── Data ─────────────────────────────────────────────────────────────────────
type Category = 'FBR SROs & Tax' | 'SECP Circulars' | 'Sales Tax & PRA' | 'Deadline';

interface NewsItem {
  id: string;
  title: string;
  category: Category;
  date: string;
  urgent: boolean;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'n1',
    title: 'FBR Circular No. 4 of 2026: Extension for Income Tax Return Filing & Wealth Reconciliation',
    category: 'FBR SROs & Tax',
    date: '2026-08-15',
    urgent: true,
  },
  {
    id: 'n2',
    title: 'SECP Notification: Mandatory Filing of Ultimate Beneficial Ownership (UBO) Disclosures',
    category: 'SECP Circulars',
    date: '2026-08-14',
    urgent: false,
  },
  {
    id: 'n3',
    title: 'Punjab Revenue Authority (PRA) & SRB Sales Tax Harmonization Framework Effective September',
    category: 'Sales Tax & PRA',
    date: '2026-08-12',
    urgent: false,
  },
  {
    id: 'n4',
    title: 'FBR Filing Deadline: Tax Year 2026 Return Submission Closes September 30 — Act Now',
    category: 'Deadline',
    date: '2026-08-16',
    urgent: true,
  },
];

// Ticker text with pipe separators
const TICKER_TEXTS = NEWS_ITEMS.map((n) => n.title).join('   |   ');

// ─── Category config ──────────────────────────────────────────────────────────
const CATEGORY_CONFIG: Record<
  Category,
  { Icon: React.FC<{ className?: string }>; color: string; bg: string; border: string }
> = {
  'FBR SROs & Tax':  { Icon: FileText,     color: 'text-[#1B3B2C]', bg: 'bg-[#1B3B2C]/8',  border: 'border-[#1B3B2C]/15' },
  'SECP Circulars':  { Icon: Building2,    color: 'text-[#8A6A1F]', bg: 'bg-[#D9A544]/10', border: 'border-[#D9A544]/20' },
  'Sales Tax & PRA': { Icon: ReceiptText,  color: 'text-[#1B3B2C]', bg: 'bg-[#1B3B2C]/8',  border: 'border-[#1B3B2C]/15' },
  'Deadline':        { Icon: Clock,        color: 'text-[#B4472F]', bg: 'bg-[#B4472F]/8',  border: 'border-[#B4472F]/20' },
};

// ─── Relative time ─────────────────────────────────────────────────────────────
function getRelativeTime(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffH  = Math.floor(diffMs / (1000 * 60 * 60));
  const diffD  = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffH < 1)  return 'Just now';
  if (diffH < 24) return `${diffH}h ago`;
  if (diffD === 1) return 'Yesterday';
  if (diffD < 7)  return `${diffD} days ago`;
  return new Date(dateStr).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' });
}

function isNew(dateStr: string): boolean {
  return Date.now() - new Date(dateStr).getTime() < 1000 * 60 * 60 * 48;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function LatestNews() {
  const sorted = useMemo(
    () =>
      [...NEWS_ITEMS].sort((a, b) => {
        if (a.urgent !== b.urgent) return a.urgent ? -1 : 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }),
    []
  );

  return (
    <section
      className="border-t border-b overflow-hidden"
      style={{ borderColor: '#E6DFD0', backgroundColor: '#FFFFFF' }}
      id="news"
    >

      {/* ── Ticker strip ───────────────────────────────────────────────────── */}
      <div className="overflow-hidden py-2.5" style={{ backgroundColor: '#1B3B2C' }}>
        <div className="flex items-center">
          {/* LIVE pill */}
          <div
            className="live-pill shrink-0 flex items-center gap-1.5 px-3.5 py-1 rounded-full select-none mx-4"
            style={{ backgroundColor: '#DC2626' }}
          >
            <span className="w-2 h-2 rounded-full bg-white opacity-90" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white">LIVE</span>
          </div>

          {/* Scrolling marquee */}
          <div className="overflow-hidden flex-1">
            <div className="marquee-track">
              <span className="text-[13px] font-body font-medium px-6" style={{ color: '#F3EBD8' }}>
                {TICKER_TEXTS}
              </span>
              <span className="text-[13px] font-body font-medium px-6" style={{ color: '#F3EBD8' }} aria-hidden>
                {TICKER_TEXTS}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section body ───────────────────────────────────────────────────── */}
      <div className="section-container py-7">

        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <span className="pulse-dot w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: '#1B3B2C' }} />
            <span className="text-base font-heading font-extrabold uppercase tracking-[0.1em]" style={{ color: '#1B3B2C' }}>
              Alerts &amp; Updates
            </span>
          </div>
          <Link
            href="/news"
            className="flex items-center gap-1 text-sm font-heading font-bold transition-colors group"
            style={{ color: '#8A6A1F' }}
          >
            View all
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* ── Unified rows container with flowing shimmer ─────────────────── */}
        <div
          className="rows-container rounded-2xl border overflow-hidden"
          style={{ borderColor: '#E6DFD0' }}
        >
          {sorted.map((item, index) => {
            const { Icon, color, bg, border } = CATEGORY_CONFIG[item.category];
            const showNew  = isNew(item.date);
            const relTime  = getRelativeTime(item.date);
            const isLast   = index === sorted.length - 1;

            return (
              <Link
                key={item.id}
                href="/news"
                className={`relative z-10 flex items-center gap-3 group transition-colors duration-150 hover:bg-[#1B3B2C]/[0.04] ${item.urgent ? 'urgent-pop' : ''}`}
                style={{
                  padding: '15px 16px',
                  backgroundColor: item.urgent ? '#FBF1E9' : 'transparent',
                  borderBottom: isLast ? 'none' : '1px solid #EDE7DA',
                }}
              >
                {/* Category icon */}
                <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${bg} border ${border}`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>

                {/* Category label */}
                <span
                  className={`shrink-0 hidden sm:block text-[10px] font-body font-bold uppercase tracking-wider w-24 truncate ${color}`}
                >
                  {item.category}
                </span>

                {/* Headline */}
                <p
                  className="flex-1 min-w-0 text-sm font-body font-semibold truncate transition-colors group-hover:opacity-80"
                  style={{ color: '#22301F' }}
                >
                  {item.title}
                </p>

                {/* Right badges + timestamp */}
                <div className="shrink-0 flex items-center gap-2 ml-2">
                  {/* NEW badge */}
                  {showNew && (
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md"
                      style={{ backgroundColor: '#1B3B2C', color: '#FFFFFF', letterSpacing: '0.08em' }}
                    >
                      NEW
                    </span>
                  )}
                  {/* URGENT badge */}
                  {item.urgent && (
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md"
                      style={{ backgroundColor: '#B4472F', color: '#FFFFFF', letterSpacing: '0.08em' }}
                    >
                      URGENT
                    </span>
                  )}
                  <span
                    className="text-[11px] font-body whitespace-nowrap hidden md:block"
                    style={{ color: '#8A7D66' }}
                  >
                    {relTime}
                  </span>
                  <ChevronRight
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-all"
                    style={{ color: '#C4B8A0' }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
