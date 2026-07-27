'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Video, FileSpreadsheet, Award } from 'lucide-react';

const featureBlocks = [
  {
    title: 'HD Video Masterclasses & Reference Tax Formats',
    subtitle: 'High Definition Learning Experience',
    desc: 'Stream high-clarity video masterclasses on your Student Mobile App. Access downloadable reference tax calculation formats, Excel templates, and case study files.',
    bullets: [
      'Multi-speed HD video playback (0.5x to 2.0x)',
      'Reference tax calculation templates & Excel schedules',
      'Available 24/7 on Premier LMS Student Mobile App',
    ],
    icon: Video,
    imageBg: 'from-blue-500 to-indigo-600',
    align: 'left',
  },
  {
    title: 'FBR & SECP Portal Case Studies & Practical Execution',
    subtitle: 'Master Through Real-World Portals',
    desc: 'Apply your tax and legal knowledge directly by following real FBR IRIS tax return filings, wealth reconciliations, and SECP company incorporation walk-throughs on our Student Mobile App.',
    bullets: [
      'Authentic FBR IRIS tax return filing demonstrations',
      'Step-by-step SECP company registration walk-throughs',
      'Wealth statement reconciliation case studies with Excel formats',
    ],
    icon: FileSpreadsheet,
    imageBg: 'from-emerald-500 to-teal-600',
    align: 'right',
  },
  {
    title: 'Accredited Digital Diplomas & Public Verification',
    subtitle: 'Get Recognized Professionally',
    desc: 'Earn official verifiable digital diplomas upon completing course modules, accessible anytime on your Premier LMS Student Mobile App.',
    bullets: [
      'Accredited diplomas endorsed by Raja Gulfam & Co.',
      'Verifiable digital credentials with online QR validation',
      'Seamless mobile app synchronization on iOS and Android',
    ],
    icon: Award,
    imageBg: 'from-purple-500 to-primary-600',
    align: 'left',
  },
];

export function PlatformFeatures() {
  return (
    <section className="section-padding bg-surface-secondary border-t border-border" id="features">
      <div className="section-container space-y-24">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary text-xs font-body font-semibold uppercase tracking-wider">
            Platform Features
          </span>
          <h2 className="text-4xl sm:text-[48px] font-heading font-extrabold text-heading leading-[1.1]" style={{ letterSpacing: '-0.03em' }}>
            State-of-the-Art Learning Tools
          </h2>
          <p className="text-body text-base leading-relaxed">
            Designed for busy working professionals, accountants, and advocates seeking practical mastery.
          </p>
        </div>

        {/* Feature Blocks Stack */}
        <div className="space-y-20 sm:space-y-28">
          {featureBlocks.map((block, idx) => {
            const Icon = block.icon;
            const isLeft = block.align === 'left';

            return (
              <div key={idx} className="grid lg:grid-cols-12 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`lg:col-span-6 space-y-6 ${!isLeft ? 'lg:order-2' : ''}`}
                >
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-50 text-primary text-xs font-heading font-bold">
                    <Icon className="w-4 h-4" />
                    {block.subtitle}
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-heading leading-tight">
                    {block.title}
                  </h3>
                  <p className="text-body text-base leading-relaxed">
                    {block.desc}
                  </p>
                  <div className="space-y-3 pt-2">
                    {block.bullets.map((bullet, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-heading">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Graphic Illustration Box */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`lg:col-span-6 ${!isLeft ? 'lg:order-1' : ''}`}
                >
                  <div className="relative rounded-3xl bg-white p-6 sm:p-8 border border-border shadow-elevated overflow-hidden group">
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${block.imageBg} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500`} />

                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between border-b border-border pb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-rose-400" />
                          <div className="w-3 h-3 rounded-full bg-amber-400" />
                          <div className="w-3 h-3 rounded-full bg-emerald-400" />
                        </div>
                        <span className="text-xs font-mono font-medium text-body">Premier LMS Mobile Engine</span>
                      </div>

                      <div className={`h-56 sm:h-64 rounded-2xl bg-gradient-to-br ${block.imageBg} flex items-center justify-center p-6 text-white shadow-card`}>
                        <div className="text-center space-y-3">
                          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="text-xl font-heading font-bold">{block.title}</h4>
                          <p className="text-xs text-white/80 max-w-xs">Practical masterclass modules streamed on Student Mobile App.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
