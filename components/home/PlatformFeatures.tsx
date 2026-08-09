'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Video, FileSpreadsheet, Award } from 'lucide-react';
import Image from 'next/image';

const featureBlocks = [
  {
    subtitle: 'High Definition Learning Experience',
    title: 'HD Video Masterclasses & Reference Tax Formats',
    desc: 'Stream high-clarity video masterclasses on your Student Mobile App. Access downloadable reference tax calculation formats, Excel templates, and case study files.',
    bullets: [
      'Multi-speed HD video playback (0.5x to 2.0x)',
      'Reference tax calculation templates & Excel schedules',
      'Available 24/7 on Premier LMS Student Mobile App',
    ],
    icon: Video,
    imageSrc: '/no1.png',
    imageBg: 'from-blue-500 to-indigo-600',
    align: 'left',
  },
  {
    subtitle: 'Master Through Real-World Portals',
    title: 'FBR & SECP Portal Case Studies & Practical Execution',
    desc: 'Apply your tax and legal knowledge directly by following real FBR IRIS tax return filings, wealth reconciliations, and SECP company incorporation walk-throughs on our Student Mobile App.',
    bullets: [
      'Authentic FBR IRIS tax return filing demonstrations',
      'Step-by-step SECP company registration walk-throughs',
      'Wealth statement reconciliation case studies with Excel formats',
    ],
    icon: FileSpreadsheet,
    imageSrc: '/no2.png',
    imageBg: 'from-emerald-500 to-teal-600',
    align: 'right',
  },
  {
    subtitle: 'Get Recognized Professionally',
    title: 'Accredited Digital Diplomas & Public Verification',
    desc: 'Earn official verifiable digital diplomas upon completing course modules, accessible anytime on your Premier LMS Student Mobile App.',
    bullets: [
      'Accredited diplomas endorsed by Raja Gulfam & Co.',
      'Verifiable digital credentials with online QR validation',
      'Seamless mobile app synchronization on iOS and Android',
    ],
    icon: Award,
    imageSrc: '/no3.png',
    imageBg: 'from-purple-500 to-indigo-600',
    align: 'left',
  },
];

export function PlatformFeatures() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="section-padding bg-premier-cream border-t border-border overflow-hidden" id="features">
      <div className="section-container space-y-24">
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

        {/* Bi-Directional Alternating Zig-Zag Blocks */}
        <div className="space-y-20 sm:space-y-28">
          {featureBlocks.map((block, idx) => {
            const Icon = block.icon;
            const isRightLayout = idx % 2 === 1;

            // Bi-directional alternating slide direction
            // Block 0: Right to Left (x: 60)
            // Block 1: Left to Right (x: -60)
            // Block 2: Right to Left (x: 60)
            const initialX = isMobile ? 0 : idx % 2 === 0 ? 60 : -60;
            const initialY = isMobile ? 30 : 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: initialX, y: initialY }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  type: 'spring',
                  stiffness: 80,
                  damping: 20,
                  duration: 0.8,
                }}
                className="grid lg:grid-cols-12 gap-12 items-center"
              >
                {/* Text Content */}
                <div className={`lg:col-span-6 space-y-6 ${isRightLayout ? 'lg:order-2' : ''}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-premier-green/10 text-premier-green text-sm font-heading font-semibold">
                    <Icon className="w-4 h-4" />
                    {block.subtitle}
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-premier-green leading-tight">
                    {block.title}
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed font-body">
                    {block.desc}
                  </p>
                  <div className="space-y-3 pt-2">
                    {block.bullets.map((bullet, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-slate-700 font-body">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Graphic Illustration Container */}
                <div className={`lg:col-span-6 ${isRightLayout ? 'lg:order-1' : ''}`}>
                  {block.imageSrc ? (
                    <div className="relative w-full rounded-3xl overflow-hidden shadow-elevated border border-border/80 group bg-white p-4 sm:p-6 hover:border-premier-green/30 transition-all duration-500">
                      <div className="relative w-full rounded-2xl overflow-hidden shadow-sm border border-border/30 bg-white">
                        <Image
                          src={block.imageSrc}
                          alt={block.title}
                          width={1200}
                          height={675}
                          className="w-full h-auto object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                          priority={idx === 0}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative rounded-3xl bg-white p-5 sm:p-7 border border-border/80 shadow-card overflow-hidden group">
                      <div className="relative z-10 space-y-4">
                        <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-rose-400" />
                            <div className="w-3 h-3 rounded-full bg-amber-400" />
                            <div className="w-3 h-3 rounded-full bg-emerald-400" />
                          </div>
                          <span className="text-xs font-mono font-medium text-slate-500">Premier LMS Mobile Engine</span>
                        </div>

                        <div className={`h-56 sm:h-64 rounded-2xl bg-gradient-to-br ${block.imageBg} flex items-center justify-center p-6 text-white shadow-card`}>
                          <div className="text-center space-y-3">
                            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md mx-auto flex items-center justify-center">
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-xl font-heading font-bold">{block.title}</h4>
                            <p className="text-xs text-white/80 max-w-xs mx-auto">Practical masterclass modules streamed on Student Mobile App.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
