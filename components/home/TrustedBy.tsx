'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
    <section className="py-14 bg-white border-y border-[#E6DFD0] overflow-hidden">
      <div className="section-container text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-heading font-extrabold uppercase tracking-[0.2em] text-[#1B3B2C] mb-9"
        >
          Trusted by professionals from leading institutions &amp; organizations
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0.35, scale: 0.96 }}
              animate={{
                opacity: [0.35, 1, 0.35],
                scale: [0.96, 1.04, 0.96],
              }}
              transition={{
                duration: 2.8 + index * 0.7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.5,
              }}
              whileHover={{ scale: 1.08, opacity: 1 }}
              className="bg-[#FAF6EE] border-2 border-[#1B3B2C] shadow-[4px_4px_0px_#1B3B2C] hover:shadow-[7px_7px_0px_#1B3B2C] rounded-2xl px-6 py-4 flex items-center justify-center transition-all duration-300 w-40 sm:w-48 h-24"
            >
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                className="max-h-14 w-auto object-contain rounded-lg bg-white p-2 border border-[#E6DFD0]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

