'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Calculator, Smartphone, Award, MessageSquare, Cpu } from 'lucide-react';

const features = [
  { icon: ShieldCheck, title: 'Forensic Watermarking & Security', desc: 'Protect proprietary content with dynamic transparent overlay watermarking and encrypted DRM streaming.', tag: 'Security', color: 'text-primary', bg: 'bg-primary-50', span: 'md:col-span-2' },
  { icon: Calculator, title: 'In-App Calculation Tools', desc: 'Run tax liabilities, DCF models, and depreciation schedules alongside live video.', tag: 'Tools', color: 'text-accent-600', bg: 'bg-accent-50', span: '' },
  { icon: Smartphone, title: 'Mobile & Offline Sync', desc: 'Download modules to your phone. Seamless progress sync across all devices.', tag: 'Mobile', color: 'text-blue-500', bg: 'bg-blue-50', span: '' },
  { icon: Award, title: 'Instant CPE Certificates', desc: 'NASBA/IRS verified PDF certificates with unique QR validation codes auto-generated on completion.', tag: 'CPE', color: 'text-amber-500', bg: 'bg-amber-50', span: '' },
  { icon: MessageSquare, title: 'Expert Q&A Forums', desc: 'Direct clarifications on complex tax codes and forensic audit questions from licensed faculty.', tag: 'Support', color: 'text-purple-500', bg: 'bg-purple-50', span: '' },
];

export function BentoFeatures() {
  return (
    <section className="py-20 bg-surface-50 border-t border-border" id="bento-features">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary text-xs font-semibold mb-4">
            <Cpu className="w-3.5 h-3.5" />
            Platform Engine
          </span>
          <h2 className="text-4xl sm:text-[48px] font-heading font-extrabold text-heading leading-[1.1] mb-3" style={{ letterSpacing: '-0.03em' }}>
            Engineered for Tax & Finance Professionals
          </h2>
          <p className="text-muted text-base">Every tool is designed to protect integrity, streamline compliance, and deliver actionable learning.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className={`bg-white rounded-2xl p-7 border border-border hover:shadow-card-hover transition-all ${f.span}`}
              >
                <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center ${f.color} mb-5`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-heading font-bold text-heading">{f.title}</h3>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-4">{f.desc}</p>
                <span className={`text-[10px] uppercase font-bold tracking-widest ${f.color} ${f.bg} px-2.5 py-1 rounded-full`}>{f.tag}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
