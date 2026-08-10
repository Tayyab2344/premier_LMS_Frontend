'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { UserPlus, BookOpen, Video, FileSpreadsheet, CheckSquare, Award } from 'lucide-react';

const steps = [
  { step: '01', title: 'Register Account', desc: 'Create your free student profile in under a minute.', icon: UserPlus },
  { step: '02', title: 'Choose Course', desc: 'Browse live seminars or on-demand masterclass tracks.', icon: BookOpen },
  { step: '03', title: 'Watch Lessons', desc: 'Stream HD lectures with interactive Q&A support.', icon: Video },
  { step: '04', title: 'Complete Tasks', desc: 'Work through Excel models and practical case files.', icon: FileSpreadsheet },
  { step: '05', title: 'Solve Case Studies', desc: 'Master wealth reconciliations and tax return filings.', icon: CheckSquare },
  { step: '06', title: 'Get Certificate', desc: 'Receive your accredited shareable PDF certificate.', icon: Award },
];

export function LearningJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const stepCount = steps.length;
    const rawIndex = Math.floor(latest * stepCount);
    const clampedIndex = Math.min(stepCount - 1, Math.max(0, rawIndex));
    setActiveIndex(clampedIndex);
  });

  return (
    <section className="bg-premier-cream border-t border-border" id="journey">
      {/* Desktop Sticky Scroll Sequence */}
      <div ref={containerRef} className="hidden lg:block relative h-[300vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-12">
          <div className="section-container w-full">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-premier-green/10 text-premier-green text-xs font-body font-semibold uppercase tracking-wider">
                Step-by-Step Path
              </span>
              <h2 className="text-4xl sm:text-[48px] font-heading font-extrabold text-heading leading-[1.1]" style={{ letterSpacing: '-0.03em' }}>
                Your Structured Learning Journey
              </h2>
              <p className="text-body text-base sm:text-lg">
                Scroll to experience your step-by-step roadmap to professional excellence.
              </p>
            </div>

            {/* 6 Cards Single Row Grid */}
            <div className="grid grid-cols-6 gap-4 relative">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const isActive = activeIndex === i;

                return (
                  <motion.div
                    key={i}
                    animate={
                      isActive
                        ? {
                            scale: 1.05,
                            y: -12,
                            rotate: [-1.5, 1.5],
                            x: [-2, 2],
                          }
                        : {
                            scale: 1,
                            y: 0,
                            rotate: 0,
                            x: 0,
                          }
                    }
                    transition={
                      isActive
                        ? {
                            scale: { duration: 0.4, ease: 'easeOut' },
                            y: { duration: 0.4, ease: 'easeOut' },
                            rotate: { duration: 2.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
                            x: { duration: 2.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
                          }
                        : {
                            duration: 0.4,
                            ease: 'easeInOut',
                          }
                    }
                    className={`rounded-3xl p-5 border transition-colors duration-300 relative flex flex-col justify-between ${
                      isActive
                        ? 'bg-white border-premier-green shadow-[0_15px_35px_rgba(22,78,54,0.22)] z-20'
                        : 'bg-premier-cream-dark/60 border-border/70 z-10 opacity-75'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-2xl font-mono font-extrabold transition-colors ${
                          isActive ? 'text-premier-green' : 'text-slate-400'
                        }`}>
                          {s.step}
                        </span>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          isActive
                            ? 'bg-premier-green text-white shadow-md scale-110'
                            : 'bg-premier-cream text-slate-500'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className={`text-base font-heading font-bold mb-1.5 transition-colors ${
                        isActive ? 'text-premier-green' : 'text-slate-700'
                      }`}>
                        {s.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-body">
                        {s.desc}
                      </p>
                    </div>

                    {/* Progress Indicator line for active step */}
                    <div className="mt-4 pt-3 border-t border-border/40">
                      <div className={`h-1 rounded-full transition-all duration-500 ${
                        isActive ? 'bg-premier-green w-full' : 'bg-transparent w-0'
                      }`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Responsive Fallback (Standard Stack) */}
      <div className="lg:hidden section-padding">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-premier-green/10 text-premier-green text-xs font-body font-semibold uppercase tracking-wider">
              Step-by-Step Path
            </span>
            <h2 className="text-3xl font-heading font-extrabold text-heading">
              Your Structured Learning Journey
            </h2>
            <p className="text-body text-sm sm:text-base">
              From enrollment to certification, experience a seamless roadmap to success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 border border-border shadow-soft flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-mono font-extrabold text-premier-green">
                        {s.step}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-premier-green/10 text-premier-green flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-base font-heading font-bold text-heading mb-1">
                      {s.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
