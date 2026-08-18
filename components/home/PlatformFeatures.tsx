'use client';

import React from 'react';
import { StickyScrollFeatures, FeatureItem } from './StickyScrollFeatures';

const featureBlocks: FeatureItem[] = [
  {
    id: 'hd-masterclasses',
    title: 'HD Video Masterclasses & Reference Formats',
    bullets: [
      'Multi-speed HD playback (0.5x–2.0x)',
      'Tax calculation & Excel templates',
      '24/7 mobile app access',
    ],
    imageSrc: '/no1.png',
  },
  {
    id: 'fbr-secp-portal',
    title: 'FBR & SECP Case Studies',
    bullets: [
      'Authentic FBR IRIS return filings',
      'Step-by-step SECP company registrations',
      'Wealth reconciliation Excel formats',
    ],
    imageSrc: '/no2.png',
  },
  {
    id: 'accredited-diplomas',
    title: 'Accredited Digital Diplomas',
    bullets: [
      'Endorsed by Raja Gulfam & Co.',
      'Verifiable QR credential validation',
      'iOS & Android app sync',
    ],
    imageSrc: '/no3.png',
  },
];

export function PlatformFeatures() {
  return (
    <section className="section-padding bg-premier-cream border-t border-border" id="features">
      <div className="section-container space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-premier-green/10 text-premier-green text-xs font-body font-semibold uppercase tracking-wider border border-premier-green/15">
            Platform Features
          </span>
          <h2 className="text-4xl sm:text-[48px] font-heading font-extrabold text-heading leading-[1.1]" style={{ letterSpacing: '-0.03em' }}>
            State-of-the-Art Learning Tools
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Designed for busy working professionals, accountants, and advocates seeking practical mastery.
          </p>
        </div>

        {/* Sticky Scroll Scrollytelling Features */}
        <StickyScrollFeatures features={featureBlocks} />
      </div>
    </section>
  );
}
