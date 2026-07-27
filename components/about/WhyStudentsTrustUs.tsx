'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  UserCheck,
  BookOpen,
  Smartphone,
  Clock,
  Shield,
  Users,
  Award,
  Medal,
  Briefcase
} from 'lucide-react';

const trustPillars = [
  {
    icon: UserCheck,
    title: 'Experienced Instructor',
    desc: 'Learn directly from Raja Gulfam, a High Court Advocate & ACMA with over a decade of litigation and consulting practice.',
  },
  {
    icon: BookOpen,
    title: 'Updated Budget Curriculum',
    desc: 'Courses are revised continuously to incorporate current annual Finance Acts, FBR circulars, and SECP regulations.',
  },
  {
    icon: Smartphone,
    title: 'Student Mobile App',
    desc: 'Access live masterclasses, HD recorded video lectures, and reference tax formats anytime on iOS and Android.',
  },
  {
    icon: Clock,
    title: 'Flexible Mobile Learning',
    desc: 'Study at your own speed with 24/7 mobile access, downloadable tax templates, and offline playback support.',
  },
  {
    icon: Shield,
    title: '2 Months Post-Course Access',
    desc: 'Access all lecture recordings and downloadable tax formats on our Student Mobile App during the course and for 2 full months after course completion.',
  },
  {
    icon: Users,
    title: 'Supportive Tax Bar Community',
    desc: 'Connect with a vast network of fellow finance officers, tax consultants, chartered accountants, and legal advocates.',
  },
  {
    icon: Award,
    title: 'Affordable Education',
    desc: 'Premium professional-grade tax and legal training at student-friendly pricing without compromising quality.',
  },
  {
    icon: Medal,
    title: 'Accredited Certificates',
    desc: 'Receive verifiable digital certificates upon completing all practical case studies and course modules.',
  },
  {
    icon: Briefcase,
    title: 'Career & Practice Guidance',
    desc: 'Get advice on tax firm setup, Income Tax Bar licensing (ITP), corporate retainers, and legal positioning.',
  },
];

export function WhyStudentsTrustUs() {
  return (
    <section className="section-padding bg-surface-secondary border-b border-border relative overflow-hidden">
      <div className="section-container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-primary px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 inline-block">
            Student Proof
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-heading">
            Why Students Trust Us
          </h2>
          <p className="text-base text-body leading-relaxed">
            Over 5,000 students and corporate professionals rely on Premier LMS for career-defining tax, accounting, and legal skills.
          </p>
        </div>

        {/* 9-Card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="group rounded-3xl bg-white border border-border p-7 shadow-soft hover:shadow-card-hover hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-soft">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-heading group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-body leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-border/50 flex items-center justify-between text-xs font-mono font-semibold text-body/50">
                  <span>Trust Pillar #{idx + 1}</span>
                  <span className="text-emerald-600 font-heading font-bold">100% Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
