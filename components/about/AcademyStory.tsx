'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Quote,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';

const storyFocusPoints = [
  { title: 'Student Success', desc: 'Prioritizing tangible career advancement and individual growth.' },
  { title: 'Practical Projects', desc: 'Hands-on case studies and real corporate tax & accounting scenarios.' },
  { title: 'Modern Technology', desc: 'Leveraging cutting-edge LMS tools and digital auditing software.' },
  { title: 'Continuous Learning', desc: 'Regularly updated curriculum reflecting current tax & corporate legislation.' },
  { title: 'Personal Mentorship', desc: 'Direct 1-on-1 feedback and advice from seasoned practitioner Raja Gulfam.' },
];

export function AcademyStory() {
  return (
    <section className="section-padding bg-surface-secondary border-y border-border relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Representation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group rounded-3xl overflow-hidden shadow-elevated border border-border bg-white p-3">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src="/about/teaching-class.jpeg"
                  alt="Raja Gulfam teaching students in classroom"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                
                {/* Overlay Badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-heading font-semibold w-fit mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Real-World Learning</span>
                  </div>
                  <h4 className="text-xl font-heading font-bold text-white">Interactive Knowledge Transfer</h4>
                  <p className="text-xs text-white/80 mt-1">Abbottabad, Pakistan &amp; Global Online Sessions</p>
                </div>
              </div>
            </div>

            {/* Decorative Floating Experience Pill */}
            <div className="absolute -bottom-6 -right-4 sm:right-4 bg-white border border-border rounded-2xl p-4 shadow-card-hover flex items-center gap-3.5 z-20 max-w-[220px]">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-heading font-bold text-lg shadow-blue-glow shrink-0">
                10+
              </div>
              <div>
                <p className="text-xs font-heading font-bold text-heading">Years Experience</p>
                <p className="text-[11px] text-body">Practicing Lawyer &amp; Accountant</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-primary px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 inline-block">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-heading leading-tight">
                Born Out of Practice, Built for Practical Impact
              </h2>
              <p className="text-base sm:text-lg text-body leading-relaxed">
                Premier LMS was established by <strong className="text-heading font-semibold">Raja Gulfam</strong> with a single, clear objective: to make high-caliber tax, corporate, and accounting education accessible, practical, and directly aligned with modern career opportunities.
              </p>
              <p className="text-sm sm:text-base text-body leading-relaxed">
                Recognizing that conventional textbook memorization leaves students unprepared for the fast-paced demands of corporate law, tax filing, and financial advising, Raja Gulfam developed a hands-on methodology. Here, students build real skills by solving genuine legal, accounting, and tax compliance scenarios.
              </p>
            </div>

            {/* 5 Focus Points */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {storyFocusPoints.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-border/80 shadow-soft hover:shadow-card hover:border-primary/30 transition-all duration-300"
                >
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-heading font-bold text-heading">{item.title}</h4>
                    <p className="text-xs text-body mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote Block */}
            <div className="relative rounded-2xl bg-gradient-to-r from-primary-900 via-primary-800 to-primary p-6 text-white shadow-elevated overflow-hidden mt-6">
              <Quote className="absolute right-4 bottom-2 w-24 h-24 text-white/10 pointer-events-none" />
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-primary-900 flex items-center justify-center font-heading font-bold text-xl shrink-0 shadow-md">
                  “
                </div>
                <div className="space-y-2">
                  <blockquote className="text-base sm:text-lg font-heading font-semibold text-white leading-relaxed italic">
                    "Education is not about completing courses. It is about transforming lives through knowledge and practical skills."
                  </blockquote>
                  <p className="text-xs font-heading font-bold text-amber-300 uppercase tracking-wider">
                    — Raja Gulfam, Founder &amp; Lead Instructor
                  </p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
