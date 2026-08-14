'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  UserCheck,
  BookOpen,
  Smartphone,
  ShieldCheck,
  Users,
  Medal,
  Briefcase,
  CheckCircle2,
  Star
} from 'lucide-react';

const trustItems = [
  {
    icon: UserCheck,
    tag: '✨ Advocate & ACMA',
    title: 'Direct Mentorship by Raja Gulfam',
    desc: 'Learn directly from a High Court Advocate & ACMA with over a decade of active litigation and corporate consulting practice.',
    color: 'bg-emerald-500',
    bgColor: 'bg-gradient-to-br from-[#0F3524] via-[#164E36] to-[#0A261A]',
    textColor: 'text-white',
    accentColor: 'text-amber-300',
    colSpan: 'md:col-span-2 lg:col-span-2',
    highlight: '10+ Years Litigation Experience'
  },
  {
    icon: Smartphone,
    tag: '📱 Student App',
    title: 'Native Mobile App Access',
    desc: 'Stream live masterclasses, HD recorded lectures, and FBR portal walk-throughs 24/7 on iOS and Android.',
    color: 'bg-indigo-500',
    bgColor: 'bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900',
    textColor: 'text-white',
    accentColor: 'text-indigo-300',
    colSpan: 'md:col-span-1 lg:col-span-1',
    highlight: 'iOS & Android Ready'
  },
  {
    icon: BookOpen,
    tag: '⚖️ Finance Act 2026',
    title: 'Updated Budget & FBR Rules',
    desc: 'Curriculum revised continuously to match current Finance Acts, FBR IRIS circulars, SECP amendments, and Weboc procedures.',
    color: 'bg-blue-500',
    bgColor: 'bg-white',
    textColor: 'text-slate-900',
    accentColor: 'text-blue-600',
    colSpan: 'md:col-span-1 lg:col-span-1',
    highlight: '100% Current Laws'
  },
  {
    icon: ShieldCheck,
    tag: '⏳ Bonus Extension',
    title: '2 Months Extended Post Access',
    desc: 'Keep streaming lectures and downloading verified tax models on your Mobile App for 60 full days after graduation.',
    color: 'bg-amber-500',
    bgColor: 'bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-amber-100/20',
    textColor: 'text-slate-900',
    accentColor: 'text-amber-700',
    colSpan: 'md:col-span-1 lg:col-span-1',
    highlight: '60 Days Extra Access'
  },
  {
    icon: Users,
    tag: '🤝 Peer Ecosystem',
    title: 'Vibrant Tax Bar Community',
    desc: 'Network with over 25,000 finance managers, CAs, tax consultants, and corporate attorneys across Pakistan.',
    color: 'bg-purple-500',
    bgColor: 'bg-white',
    textColor: 'text-slate-900',
    accentColor: 'text-purple-600',
    colSpan: 'md:col-span-1 lg:col-span-1',
    highlight: '25,000+ Alumni Network'
  },
  {
    icon: Medal,
    tag: '🎓 Digital Diploma',
    title: 'Accredited Shareable Certificates',
    desc: 'Earn verifiable digital diplomas upon completing practical case files, tax returns, and wealth reconciliations.',
    color: 'bg-emerald-600',
    bgColor: 'bg-white',
    textColor: 'text-slate-900',
    accentColor: 'text-emerald-700',
    colSpan: 'md:col-span-1 lg:col-span-1',
    highlight: 'QR Code Verifiable'
  },
  {
    icon: Briefcase,
    tag: '🚀 Firm Growth',
    title: 'Independent Practice Setup',
    desc: 'Step-by-step guidance on obtaining ITP tax licenses, corporate client retainers, and legal positioning.',
    color: 'bg-rose-500',
    bgColor: 'bg-gradient-to-br from-slate-900 via-[#0F3524] to-emerald-950',
    textColor: 'text-white',
    accentColor: 'text-emerald-300',
    colSpan: 'md:col-span-2 lg:col-span-2',
    highlight: 'ITP License & Practice Guidance'
  }
];

export function WhyStudentsTrustUs() {
  return (
    <section className="section-padding bg-premier-cream border-b border-border relative overflow-hidden" id="why-students-trust-us">
      {/* Ambient background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-premier-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-premier-green/10 text-premier-green text-xs font-heading font-bold uppercase tracking-wider border border-premier-green/20">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            Verified Impact & Quality
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-heading">
            Why Students Trust Us
          </h2>
          <p className="text-base sm:text-lg text-body leading-relaxed max-w-2xl mx-auto">
            Over 5,000 students and corporate professionals rely on Premier LMS for career-defining tax, accounting, and legal skills.
          </p>
        </div>

        {/* Dynamic Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustItems.map((item, idx) => {
            const IconComp = item.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`group rounded-3xl p-6 sm:p-8 border border-border/80 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${item.bgColor} ${item.colSpan}`}
              >
                {/* Background Glow Effect for dark cards */}
                {item.textColor === 'text-white' && (
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none -translate-y-1/2 translate-x-1/3 group-hover:bg-white/10 transition-all duration-500" />
                )}

                <div className="space-y-4 relative z-10">
                  {/* Top Tag & Icon Row */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-heading font-bold px-3 py-1 rounded-full border ${
                      item.textColor === 'text-white'
                        ? 'bg-white/15 text-amber-300 border-white/20 backdrop-blur-md'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {item.tag}
                    </span>

                    <div className={`w-11 h-11 rounded-2xl ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <IconComp className="w-5.5 h-5.5 text-white" />
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h3 className={`text-xl sm:text-2xl font-heading font-extrabold mb-2 leading-snug ${item.textColor}`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${
                      item.textColor === 'text-white' ? 'text-white/85 font-body' : 'text-slate-600 font-body'
                    }`}>
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Highlight Pill Footer */}
                <div className={`pt-5 mt-6 border-t flex items-center justify-between text-xs font-heading font-bold ${
                  item.textColor === 'text-white' ? 'border-white/15 text-white/90' : 'border-slate-200/80 text-slate-700'
                }`}>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className={`w-4 h-4 ${item.accentColor}`} />
                    {item.highlight}
                  </span>
                  <span className="text-[11px] font-mono font-semibold opacity-75">
                    Pillar #{idx + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
