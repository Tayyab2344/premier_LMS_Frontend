'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Video, Film, UserCheck, Target, Award, Clock, FileSpreadsheet, Users } from 'lucide-react';

const reasons = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    desc: 'Engage directly with Raja Gulfam in real-time Q&A sessions during live masterclasses.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Film,
    title: 'HD Recorded Lectures',
    desc: 'Never miss a lesson with 4K Ultra HD recorded archives accessible anytime, anywhere.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    icon: UserCheck,
    title: 'Expert Lead Instructor',
    desc: 'Learn directly from Raja Gulfam, possessing years of proven industry and academic mastery.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Target,
    title: 'Practical Hands-on Learning',
    desc: 'Work on real-world case studies, financial models, and tax compliance scenarios.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Award,
    title: 'Accredited Certificates',
    desc: 'Earn verifiable certificates to highlight your expertise on LinkedIn and resumes.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: Clock,
    title: '2 Months Post-Course Access',
    desc: 'Access all HD lectures and tax formats during the course and for 2 months after graduation on the Student Mobile App.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
  {
    icon: FileSpreadsheet,
    title: 'FBR & SECP Portal Demos',
    desc: 'Learn practical execution through real FBR IRIS tax return filings, wealth reconciliations, and SECP company registrations.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    icon: Users,
    title: 'Vibrant Peer Community',
    desc: 'Connect, network, and collaborate with thousands of ambitious professionals worldwide.',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-white" id="why-choose-us">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary text-xs font-heading font-semibold uppercase tracking-wider"
          >
            Why Choose Premier LMS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-[48px] font-heading font-extrabold text-heading leading-[1.1]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Everything You Need To Master Your Craft
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-body text-base sm:text-lg"
          >
            A modern, comprehensive learning experience built to bridge theoretical concepts with real-world application.
          </motion.p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-7 border border-border/80 shadow-soft hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 flex flex-col group"
              >
                <div className={`w-12 h-12 rounded-2xl ${reason.bg} flex items-center justify-center ${reason.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-heading mb-2 group-hover:text-primary transition-colors">
                  {reason.title}
                </h3>
                <p className="text-body text-sm leading-relaxed mt-auto">
                  {reason.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
