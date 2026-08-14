'use client';

import React from 'react';
import Image from 'next/image';
import aicpaLogo from '@/assets/AICPA.png';
import accaLogo from '@/assets/acca.jpg';
import iffcaLogo from '@/assets/iffca.jpg';
import cimaLogo from '@/assets/cima.jpg';

const logos = [
  { name: 'AICPA', src: aicpaLogo },
  { name: 'ACCA', src: accaLogo },
  { name: 'IFFCA', src: iffcaLogo },
  { name: 'CIMA', src: cimaLogo },
];

export function TrustedBy() {
  return (
    <section className="py-12 bg-premier-cream border-y border-border overflow-hidden">
      <div className="section-container text-center">
        <p className="text-xs font-heading font-semibold uppercase tracking-widest text-slate-500 mb-8">
          Trusted by professionals from leading institutions & organizations
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="bg-white border border-border/80 rounded-2xl px-6 py-4 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 w-40 sm:w-48 h-24"
            >
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                className="max-h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

