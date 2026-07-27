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
  { title: 'Student Mobile App', desc: 'Take live & recorded masterclasses anytime on iOS & Android', icon: Smartphone },
  { title: 'Real Court Precedents', desc: 'Authentic tax litigation rulings & FBR case studies', icon: BookOpen },
  { title: 'Career & Practice Guidance', desc: 'Tax consultancy setup & retainer advice by Raja Gulfam', icon: Brain },
  { title: 'Tax Bar Community', desc: 'Collaborative peer forums & professional legal networking', icon: Users },
  { title: 'Practical Portal Demos', desc: 'Hands-on FBR IRIS & SECP portal walkthroughs', icon: FileText },
  { title: 'Accredited Diplomas', desc: 'Recognized accredited course completion credentials', icon: Award },
  { title: '2 Months Post-Course Access', desc: 'Lecture recordings accessible during course & 2 months after completion', icon: Sparkles },
  { title: 'Direct Faculty Mentorship', desc: '1-on-1 legal & accounting guidance from Raja Gulfam', icon: ShieldCheck },
];

export function TeachingPhilosophy() {
  return (
    <section className="section-padding bg-white relative overflow-hidden border-b border-border">
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative Explanation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-primary px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 inline-block">
              Pedagogical Standards
            </span>

            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-heading leading-tight">
              Our Teaching Philosophy
            </h2>

            <p className="text-base text-body leading-relaxed">
              We believe true professional education is achieved when legal statutes and accounting standards are applied to authentic client files. At Premier LMS, students learn by watching live FBR IRIS &amp; SECP portal demonstrations on our dedicated Mobile App.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Stream live masterclasses & recordings anytime on the Premier LMS Mobile App',
                'Practical learning using official FBR IRIS, SECP eServices & Weboc portals',
                'Curriculum updated continuously for latest Finance Acts & tax amendments',
                'Direct mentorship from Advocate High Court & ACMA Raja Gulfam Kayani',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-heading font-semibold text-heading">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 8 Checklist Cards Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 grid sm:grid-cols-2 gap-4"
          >
            {philosophyChecklist.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-surface-secondary border border-border hover:border-primary/40 hover:bg-white hover:shadow-card-hover transition-all duration-300 flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-heading font-bold text-heading group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-body mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
