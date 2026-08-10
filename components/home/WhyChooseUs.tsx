'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

// Artisan Line Draw SVG Component
const LineDrawIcon = ({ iconType }: { iconType: string }) => {
  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.2, ease: 'easeInOut' },
        opacity: { duration: 0.3 },
      },
    },
  };

  const getPaths = () => {
    switch (iconType) {
      case 'video':
        return [
          'M23 7l-7 5 7 5V7z',
          'M14 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z',
        ];
      case 'film':
        return [
          'M19.82 2H4.18A2.18 2.18 0 0 0 2 4.18v15.64A2.18 2.18 0 0 0 4.18 22h15.64A2.18 2.18 0 0 0 22 19.82V4.18A2.18 2.18 0 0 0 19.82 2z',
          'M7 2v20',
          'M17 2v20',
          'M2 12h20',
        ];
      case 'user':
        return [
          'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
          'M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
          'M20 8v6',
          'M23 11h-6',
        ];
      case 'target':
        return [
          'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z',
          'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z',
          'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
        ];
      case 'award':
        return [
          'M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z',
          'M8.21 13.89L7 23l5-3 5 3-1.21-9.12',
        ];
      case 'clock':
        return [
          'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z',
          'M12 6v6l4 2',
        ];
      case 'spreadsheet':
        return [
          'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
          'M14 2v6h6',
          'M8 13h8',
          'M8 17h8',
        ];
      case 'users':
        return [
          'M17 21v-2a4 4 0 0 0-3-3.87',
          'M9 21v-2a4 4 0 0 0-4-4H3a4 4 0 0 0-4 4v2',
          'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
        ];
      default:
        return ['M12 2v20M2 12h20'];
    }
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#164E36"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      {getPaths().map((d, i) => (
        <motion.path key={i} d={d} variants={pathVariants} />
      ))}
    </svg>
  );
};

const reasons = [
  {
    iconType: 'video',
    title: 'Live Interactive Classes',
    desc: 'Engage directly with Raja Gulfam in real-time Q&A sessions during live masterclasses.',
  },
  {
    iconType: 'film',
    title: 'HD Recorded Lectures',
    desc: 'Never miss a lesson with 4K Ultra HD recorded archives accessible anytime, anywhere.',
  },
  {
    iconType: 'user',
    title: 'Expert Lead Instructor',
    desc: 'Learn directly from Raja Gulfam, possessing years of proven industry and academic mastery.',
  },
  {
    iconType: 'target',
    title: 'Practical Hands-on Learning',
    desc: 'Work on real-world case studies, financial models, and tax compliance scenarios.',
  },
  {
    iconType: 'award',
    title: 'Accredited Certificates',
    desc: 'Earn verifiable certificates to highlight your expertise on LinkedIn and resumes.',
  },
  {
    iconType: 'clock',
    title: '2 Months Post-Course Access',
    desc: 'Access all HD lectures and tax formats during the course and for 2 months after graduation on the Student Mobile App.',
  },
  {
    iconType: 'spreadsheet',
    title: 'FBR & SECP Portal Demos',
    desc: 'Learn practical execution through real FBR IRIS tax return filings, wealth reconciliations, and SECP company registrations.',
  },
  {
    iconType: 'users',
    title: 'Vibrant Peer Community',
    desc: 'Connect, network, and collaborate with thousands of ambitious professionals worldwide.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-white border-t border-border" id="why-choose-us">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-premier-green-50 text-premier-green text-xs font-heading font-semibold uppercase tracking-wider border border-premier-green/10"
          >
            Why Choose Premier LMS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-[48px] font-heading font-extrabold text-heading leading-[1.1]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Everything You Need To Master Your Craft
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-body text-base sm:text-lg"
          >
            A modern, comprehensive learning experience built to bridge theoretical concepts with real-world application.
          </motion.p>
        </div>

        {/* 8 Card Bento Grid with Cinematic Focus Pull & SVG Line Draw */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.4, filter: 'blur(12px)', scale: 0.98 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.1,
              }}
              className="bg-premier-cream/60 rounded-2xl p-7 border border-border/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between group cursor-pointer hover:bg-white hover:border-premier-green/40 hover:shadow-card-hover transition-all duration-300"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1 + 0.1 }}
                className="w-12 h-12 rounded-2xl bg-white border border-border/60 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-premier-green/30 group-hover:bg-premier-green-50 transition-all duration-300"
              >
                <LineDrawIcon iconType={reason.iconType} />
              </motion.div>

              <h3 className="text-lg font-heading font-bold text-slate-900 mb-2 group-hover:text-premier-green transition-colors duration-300">
                {reason.title}
              </h3>

              <p className="text-slate-600 text-xs leading-relaxed mt-auto font-body">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
