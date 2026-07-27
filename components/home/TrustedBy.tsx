'use client';

import React from 'react';

const partners = [
  'National Tax Society',
  'AICPA Institute',
  'Global Accounting Alliance',
  'Corporate Finance Guild',
  'FinTech Academy',
  'Chartered Tax Council',
  'International Audit Forum',
  'Executive Learning Network',
];

export function TrustedBy() {
  return (
    <section className="py-12 bg-surface-secondary border-y border-border overflow-hidden">
      <div className="section-container mb-6 text-center">
        <p className="text-xs font-heading font-semibold uppercase tracking-widest text-body">
          Trusted by professionals from leading institutions & organizations
        </p>
      </div>

      <div className="relative flex overflow-x-hidden">
        {/* Gradient fades */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-surface-secondary to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-surface-secondary to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-x gap-12 items-center whitespace-nowrap" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
          {[...partners, ...partners].map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-border/60 shadow-soft text-heading font-heading font-bold text-sm tracking-tight opacity-75 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-default"
            >
              <div className="w-2 h-2 rounded-full bg-primary" />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
