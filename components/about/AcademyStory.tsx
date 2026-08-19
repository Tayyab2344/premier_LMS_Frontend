'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Award,
  Laptop,
  BookOpen,
  Users,
} from 'lucide-react';
import Image from 'next/image';

const storyFocusPoints = [
  { icon: CheckCircle, title: 'Student Success', desc: 'Prioritizing tangible career advancement and individual growth.' },
  { icon: Award, title: 'Practical Projects', desc: 'Real corporate tax, legal & accounting compliance scenarios.' },
  { icon: Laptop, title: 'Modern Technology', desc: 'Cutting-edge LMS tools & digital auditing software.' },
  { icon: BookOpen, title: 'Continuous Learning', desc: 'Up-to-date curriculum reflecting current legislation.' },
  { icon: Users, title: 'Personal Mentorship', desc: 'Direct 1-on-1 feedback from practitioner Raja Gulfam.' },
];

export function AcademyStory({ isFirstSection = true }: { isFirstSection?: boolean }) {
  return (
    <section
      className={`bg-white border-b border-border relative overflow-hidden ${isFirstSection ? 'pt-[124px] sm:pt-[132px] pb-16 sm:pb-20' : 'section-padding border-t'
        }`}
    >
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Image (Reduced 10% in height to max-h-[432px]) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group rounded-3xl overflow-hidden shadow-elevated border border-border bg-white p-3.5 max-w-xl mx-auto lg:max-w-none">
              <div className="relative aspect-[4/3] max-h-[440px] lg:max-h-[480px] rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src="/about/teaching-class.jpeg"
                  alt="Raja Gulfam teaching students in classroom"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 540px"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Lightly Trimmed Copy + 5 Focus Point Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-5"
          >
            <div>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-extrabold text-heading leading-tight tracking-tight">
                Born Out of Practice, Built for Practical Impact
              </h2>
            </div>

            {/* Concise Combined Story Paragraph */}
            <p className="text-base sm:text-lg text-body leading-relaxed max-w-3xl">
              Established by <strong className="text-heading">Raja Gulfam</strong>, Premier LMS makes high-caliber tax, corporate, and accounting education practical and career-aligned. Replacing conventional textbook memorization with a hands-on methodology, we empower students to build real skills by solving genuine legal, accounting, and tax compliance scenarios.
            </p>

            {/* 5 Notched Ticket-Stub Focus Point Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
              {storyFocusPoints.map((pt, i) => {
                const Icon = pt.icon;
                return (
                  <div
                    key={i}
                    className="p-[1.5px] bg-gradient-to-br from-premier-gold/80 via-border to-premier-green/40 drop-shadow-xs transition-all duration-300 hover:scale-[1.02] group"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)',
                    }}
                  >
                    <div
                      className="p-3.5 pr-6 bg-premier-cream/80 group-hover:bg-white flex items-start gap-2.5 transition-colors h-full"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)',
                      }}
                    >
                      <Icon className="w-4 h-4 text-premier-green shrink-0 mt-0.5 group-hover:text-premier-gold transition-colors" />
                      <div>
                        <p className="text-xs font-heading font-bold text-heading">{pt.title}</p>
                        <p className="text-[11px] text-body/80 mt-0.5 leading-snug">{pt.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
