'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  BookOpen,
  Users,
  Award,
  Smartphone,
  FileText,
  Brain,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

const philosophyChecklist = [
  { title: 'Student Mobile App', desc: 'Take live & recorded masterclasses anytime on iOS & Android', icon: Smartphone, color: 'bg-indigo-500', badge: '📱 24/7 Access' },
  { title: 'Real Court Precedents', desc: 'Authentic tax litigation rulings & FBR case studies', icon: BookOpen, color: 'bg-blue-500', badge: '⚖️ High Court' },
  { title: 'Career & Practice Setup', desc: 'Tax consultancy setup & retainer advice by Raja Gulfam', icon: Brain, color: 'bg-amber-500', badge: '💼 ITP License' },
  { title: 'Tax Bar Community', desc: 'Collaborative peer forums & professional legal networking', icon: Users, color: 'bg-purple-500', badge: '🤝 25k+ Network' },
  { title: 'Practical Portal Demos', desc: 'Hands-on FBR IRIS & SECP portal walkthroughs', icon: FileText, color: 'bg-rose-500', badge: '💻 Live Portals' },
  { title: 'Accredited Diplomas', desc: 'Recognized accredited course completion credentials', icon: Award, color: 'bg-emerald-600', badge: '🎓 Verifiable' },
  { title: '2 Months Extended Access', desc: 'Lecture recordings accessible during course & 2 months after completion', icon: Sparkles, color: 'bg-cyan-500', badge: '⏳ +60 Days' },
  { title: 'Direct Faculty Mentorship', desc: '1-on-1 legal & accounting guidance from Raja Gulfam', icon: ShieldCheck, color: 'bg-teal-600', badge: '👨‍⚖️ Direct ACMA' },
];

export function TeachingPhilosophy() {
  return (
    <section className="py-8 lg:py-12 bg-white relative overflow-hidden border-b border-border" id="teaching-philosophy">
      <div className="section-container relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Narrative Explanation */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4"
          >
           
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-heading leading-tight">
              Our Teaching <span className="text-premier-green underline decoration-premier-green/30 underline-offset-4">Philosophy</span>
            </h2>

            <p className="text-xs sm:text-sm text-body leading-relaxed font-body">
              We believe true professional education is achieved when legal statutes and accounting standards are applied to authentic client files. At Premier LMS, students learn by watching live FBR IRIS &amp; SECP portal demonstrations on our dedicated Mobile App.
            </p>

            {/* Checklist items */}
            <div className="space-y-2.5 pt-1">
              {[
                'Stream live masterclasses & recordings anytime on the Premier LMS Mobile App',
                'Practical learning using official FBR IRIS, SECP eServices & Weboc portals',
                'Curriculum updated continuously for latest Finance Acts & tax amendments',
                'Direct mentorship from Advocate High Court & ACMA Raja Gulfam Kayani',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-premier-green text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-heading font-bold text-heading leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 8 Checklist Cards Grid (Compact & White Background) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 grid sm:grid-cols-2 gap-3"
          >
            {philosophyChecklist.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="p-3.5 rounded-xl sm:rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:border-premier-green/40 hover:shadow-md transition-all duration-300 flex items-start gap-3 group relative overflow-hidden"
                >
                  {/* Top Highlight Accent Line on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-premier-green via-emerald-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon Box */}
                  <div className={`w-9 h-9 rounded-xl ${item.color} text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                    <IconComp className="w-4.5 h-4.5 text-white" />
                  </div>

                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-xs sm:text-sm font-heading font-extrabold text-heading group-hover:text-premier-green transition-colors leading-snug truncate">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-[9px] font-heading font-bold px-2 py-0.2 rounded-full bg-slate-200/70 text-slate-700 inline-block">
                      {item.badge}
                    </span>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-body">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
