'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
  return (
    <section className="section-padding bg-surface-secondary border-t border-border overflow-hidden" id="journey">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary text-xs font-body font-semibold uppercase tracking-wider">
            Step-by-Step Path
          </span>
          <h2 className="text-4xl sm:text-[48px] font-heading font-extrabold text-heading leading-[1.1]" style={{ letterSpacing: '-0.03em' }}>
            Your Structured Learning Journey
          </h2>
          <p className="text-body text-base sm:text-lg">
            From enrollment to certification, experience a seamless step-by-step roadmap to success.
          </p>
        </div>

        {/* Steps Grid / Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-3xl p-6 border border-border/80 shadow-soft hover:shadow-card-hover transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-mono font-extrabold text-primary/30 group-hover:text-primary transition-colors">
                      {s.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-heading font-bold text-heading mb-1 group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-body leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
