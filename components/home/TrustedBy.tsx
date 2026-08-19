'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import aicpaLogo from '@/assets/AICPA.png';
import accaLogo from '@/assets/acca.jpg';
import iffcaLogo from '@/assets/iffca.jpg';
import cimaLogo from '@/assets/cima.jpg';
import fbr3Logo from '@/assets/FBR3.webp';
import fbr5Logo from '@/assets/FBR5.webp';
import iotaLogo from '@/assets/iota.png';
import itiLogo from '@/assets/ITI-Logo.jpg';

const logos = [
  { name: 'AICPA', src: aicpaLogo, scaleClass: 'scale-[1.20]' },
  { name: 'ACCA', src: accaLogo, scaleClass: 'scale-[1.20]' },
  { name: 'IFFCA', src: iffcaLogo, scaleClass: 'scale-[1.20]' },
  { name: 'CIMA', src: cimaLogo, scaleClass: 'scale-[1.20]' },
  { name: 'FBR Portal', src: fbr3Logo, scaleClass: 'scale-[1.35]' },
  { name: 'FBR Tax', src: fbr5Logo, scaleClass: 'scale-[1.35]' },
  { name: 'IOTA', src: iotaLogo, scaleClass: 'scale-[1.20]' },
  { name: 'ITI', src: itiLogo, scaleClass: 'scale-[2.8]' },
];

const marqueeLogos = [...logos, ...logos];

export function TrustedBy() {
  return (
    <section className="py-14 bg-white border-y border-[#E6DFD0] overflow-hidden">
      <div className="section-container text-center mb-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-heading font-extrabold uppercase tracking-[0.2em] text-[#1B3B2C]"
        >
          Trusted by professionals from leading institutions &amp; organizations
        </motion.p>
      </div>

      {/* Infinite Continuous Right-to-Left Marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Soft Fade Edges */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          className="flex items-center gap-6 sm:gap-8 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 25,
            repeat: Infinity,
          }}
        >
          {marqueeLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="bg-white rounded-xl p-2 sm:p-2.5 flex items-center justify-center transition-all duration-300 w-36 sm:w-44 h-16 sm:h-20 shrink-0 hover:scale-105 overflow-hidden"
            >
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                className={`w-full h-full object-contain ${logo.scaleClass || 'scale-[1.35]'}`}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
