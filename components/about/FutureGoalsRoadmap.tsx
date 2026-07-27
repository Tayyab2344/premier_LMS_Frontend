'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Library,
  Smartphone,
  Award,
  Building2,
  HeartHandshake,
  Video,
  Globe2,
  Bot,
  CheckCircle2
} from 'lucide-react';

const roadmapObjectives = [
  {
    phase: 'Q3 2026',
    title: 'Expand Course Library',
    desc: 'Launch specialized masterclasses in International Transfer Pricing, Corporate Governance, and ESG Compliance.',
    icon: Library,
    color: 'bg-blue-500',
  },
  {
    phase: 'Q4 2026',
    title: 'Launch Mobile Application',
    desc: 'Release iOS & Android LMS apps featuring offline lecture caching, push notifications, and mobile tax calculators.',
    icon: Smartphone,
    color: 'bg-purple-500',
  },
  {
    phase: 'Q1 2027',
    title: 'Introduce Advanced Certifications',
    desc: 'Partner with international professional bodies to issue globally recognized executive diplomas.',
    icon: Award,
    color: 'bg-emerald-500',
  },
  {
    phase: 'Q2 2027',
    title: 'Industry Partnerships',
    desc: 'Establish direct hiring pipelines with top accounting firms, banks, and corporate law practices across Pakistan.',
    icon: Building2,
    color: 'bg-amber-500',
  },
  {
    phase: 'Q3 2027',
    title: 'Scholarship Programs',
    desc: 'Provide fully funded tuition grants for deserving finance students and underprivileged law graduates.',
    icon: HeartHandshake,
    color: 'bg-rose-500',
  },
  {
    phase: 'Q4 2027',
    title: 'Live Interactive Workshops',
    desc: 'Host hybrid in-person and digital conferences with high-court judges, FBR commissioners, and top audit partners.',
    icon: Video,
    color: 'bg-indigo-500',
  },
  {
    phase: '2028',
    title: 'International Student Community',
    desc: 'Expand enrollment across GCC, UK, and North American diaspora seeking Pakistani tax and legal expertise.',
    icon: Globe2,
    color: 'bg-cyan-500',
  },
  {
    phase: '2028+',
    title: 'AI-Powered Learning Assistance',
    desc: 'Integrate an intelligent AI legal assistant trained on FBR tax codes, court precedents, and SECP regulations.',
    icon: Bot,
    color: 'bg-teal-500',
  },
];

export function FutureGoalsRoadmap() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="section-container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-primary px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 inline-block">
            Visionary Growth
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-heading">
            Looking Ahead
          </h2>
          <p className="text-base text-body leading-relaxed">
            Our strategic objectives designed to scale Premier LMS into a global hub for professional education and legal technology.
          </p>
        </div>

        {/* Vertical Timeline / Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapObjectives.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="group rounded-3xl bg-surface-secondary border border-border p-6 shadow-soft hover:shadow-card-hover hover:border-primary/40 hover:bg-white transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-primary-50 text-primary text-[11px] font-mono font-bold border border-primary-100">
                      {item.phase}
                    </span>
                    <div className={`w-9 h-9 rounded-xl ${item.color} text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-heading font-bold text-heading group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-body leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border/50 flex items-center gap-1.5 text-[11px] font-heading font-semibold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Strategic Milestone</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
