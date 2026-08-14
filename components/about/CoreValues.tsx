'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  Lightbulb,
  GraduationCap,
  Laptop,
  Compass,
  Target
} from 'lucide-react';

const values = [
  {
    step: '01',
    icon: Laptop,
    tag: '⚡ Real Client Files',
    title: 'Practical Learning',
    desc: 'We skip pure theory. Students work directly with real corporate files, FBR wealth reconciliations, SECP statutory filings, and audit checklists.',
    color: 'bg-emerald-500',
    accentBorder: 'hover:border-emerald-500/60',
    isLeft: true,
  },
  {
    step: '02',
    icon: GraduationCap,
    tag: '🏆 Career Leaps',
    title: 'Student Success First',
    desc: 'Every student’s trajectory matters. We measure our achievements by the firm launches, promotions, and salaries our alumni earn.',
    color: 'bg-purple-500',
    accentBorder: 'hover:border-purple-500/60',
    isLeft: false,
  },
  {
    step: '03',
    icon: Award,
    tag: '⚖️ Legal Rigor',
    title: 'Academic Excellence',
    desc: 'Deliver high-caliber legal and financial education adhering strictly to high court advocate standards and corporate governance principles.',
    color: 'bg-blue-500',
    accentBorder: 'hover:border-blue-500/60',
    isLeft: true,
  },
  {
    step: '04',
    icon: Lightbulb,
    tag: '💡 Interactive Tech',
    title: 'Digital Innovation',
    desc: 'Continuously upgrade learning tools using mobile lecture streaming, step-by-step FBR portal walk-throughs, and active Q&A forums.',
    color: 'bg-amber-500',
    accentBorder: 'hover:border-amber-500/60',
    isLeft: false,
  },
  {
    step: '05',
    icon: ShieldCheck,
    tag: '🛡️ 100% Transparency',
    title: 'Uncompromised Integrity',
    desc: 'Teach with complete legal accuracy, statutory truth, and total transparency in every single masterclass, case file, and consultation.',
    color: 'bg-teal-600',
    accentBorder: 'hover:border-teal-500/60',
    isLeft: true,
  },
  {
    step: '06',
    icon: Compass,
    tag: '🚀 Continuous Growth',
    title: 'Lifelong Learning',
    desc: 'Empower ongoing career evolution with 24/7 access to updated annual budget amendments, tax circulars, and SECP statutory updates.',
    color: 'bg-rose-500',
    accentBorder: 'hover:border-rose-500/60',
    isLeft: false,
  }
];

export function CoreValues() {
  return (
    <section className="section-padding bg-premier-cream border-b border-border relative overflow-hidden" id="core-values">
      {/* Ambient background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-premier-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-premier-green/10 text-premier-green text-xs font-heading font-bold uppercase tracking-wider border border-premier-green/20">
            <Target className="w-3.5 h-3.5 text-premier-green" />
            Foundational Pillars
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-heading">
            Our Core Values
          </h2>
          <p className="text-base sm:text-lg text-body leading-relaxed max-w-2xl mx-auto">
            These six principles dictate how we structure our courses, interact with students, and cultivate educational excellence.
          </p>
        </div>

        {/* Zig-Zag Pill Pathway Layout with Scroll In/Out Animations */}
        <div className="relative py-2">
          {/* Central Vertical Timeline Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-6 bottom-6 w-1 -translate-x-1/2 bg-gradient-to-b from-premier-green via-emerald-400 to-premier-green/30 rounded-full z-0 opacity-40" />

          <div className="space-y-6 md:space-y-8 relative z-10">
            {values.map((val, idx) => {
              const IconComp = val.icon;

              return (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-10 relative"
                >
                  {/* Step Node Dot on Central Line (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-premier-green shadow-md items-center justify-center z-20 font-mono font-extrabold text-[11px] text-premier-green">
                    {val.step}
                  </div>

                  {/* Left / Right Card Content */}
                  <motion.div
                    initial={{ opacity: 0, x: val.isLeft ? -40 : 40, scale: 0.94 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    whileHover={{ scale: 1.02, y: -3 }}
                    className={`bg-white rounded-2xl sm:rounded-3xl border border-border p-4 sm:p-5 shadow-soft hover:shadow-card-hover transition-all duration-300 flex items-start gap-4 relative z-10 max-w-md w-full ${val.accentBorder} ${
                      val.isLeft ? 'md:col-start-1 md:ml-auto md:mr-2' : 'md:col-start-2 md:mr-auto md:ml-2'
                    }`}
                  >
                    {/* Icon Pill Circle */}
                    <div className={`w-11 h-11 rounded-xl ${val.color} text-white flex items-center justify-center shrink-0 shadow-md`}>
                      <IconComp className="w-5 h-5 text-white" />
                    </div>

                    {/* Content Details */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-heading font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 inline-block">
                          {val.tag}
                        </span>
                        <span className="md:hidden font-mono font-extrabold text-[11px] text-premier-green">
                          #{val.step}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-heading font-extrabold text-heading leading-snug">
                        {val.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed font-body">
                        {val.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
