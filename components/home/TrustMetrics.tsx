'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, CheckCircle2, Star, ShieldCheck, Check } from 'lucide-react';

export function TrustMetrics() {
  const metrics = [
    { icon: Users, value: '25,000+', label: 'Professionals Trained', desc: 'Active CPAs, auditors & consultants', color: 'text-primary', bg: 'bg-primary-50' },
    { icon: CheckCircle2, value: '98.4%', label: 'Exam Pass Rate', desc: 'CPA & Tax certification guarantee', color: 'text-accent-600', bg: 'bg-accent-50' },
    { icon: Award, value: '150,000+', label: 'CPE Hours Awarded', desc: 'NASBA & IRS approved credits', color: 'text-primary-700', bg: 'bg-primary-50' },
    { icon: Star, value: '4.9 / 5.0', label: 'Student Satisfaction', desc: '2,400+ verified reviews', color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  const badges = [
    { name: 'NASBA Approved CPE', desc: 'National Registry' },
    { name: 'IRS Approved Provider', desc: 'EA Continuing Ed' },
    { name: 'AICPA Aligned', desc: 'Standardized Curriculum' },
    { name: 'Forensic Accounting Guild', desc: 'Certified Investigation' },
  ];

  return (
    <section className="py-16 bg-surface-50 border-y border-border">
      <div className="section-container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-white rounded-2xl p-6 border border-border hover:shadow-card transition-shadow"
              >
                <div className={`w-10 h-10 rounded-xl ${m.bg} flex items-center justify-center ${m.color} mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`text-3xl font-number font-bold tracking-tight ${m.color} mb-1`}>{m.value}</div>
                <h3 className="text-sm font-bold text-heading mb-0.5">{m.label}</h3>
                <p className="text-xs text-muted">{m.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Accreditation Badges */}
        <motion.div
          className="mt-10 bg-white rounded-2xl border border-border p-6 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-accent-600 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-heading">Recognized Accreditation Standards</h4>
              <p className="text-xs text-muted">All masterclasses satisfy national CPE requirements.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
            {badges.map((b, i) => (
              <div key={i} className="flex items-center gap-2 bg-surface-50 px-3 py-2 rounded-xl border border-border">
                <Check className="w-3.5 h-3.5 text-accent-600 shrink-0" />
                <div>
                  <div className="text-[11px] font-semibold text-heading leading-tight">{b.name}</div>
                  <div className="text-[9px] text-muted">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
