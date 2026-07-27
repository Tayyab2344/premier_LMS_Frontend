'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Award,
  Lightbulb,
  Handshake,
  TrendingUp,
  Heart,
  Target,
  ArrowRight
} from 'lucide-react';

const missions = [
  {
    icon: GraduationCap,
    title: 'Deliver Practical Education',
    desc: 'Focusing on actionable tools, real-life client files, and hands-on skills over theory.',
    color: 'bg-blue-500',
  },
  {
    icon: Award,
    title: 'Affordable Learning Opportunities',
    desc: 'Ensuring top-tier accounting and tax masterclasses are accessible to every motivated learner.',
    color: 'bg-purple-500',
  },
  {
    icon: Lightbulb,
    title: 'Build Confidence Through Projects',
    desc: 'Reinforcing theory with hands-on corporate case studies, tax return prep, and financial audits.',
    color: 'bg-amber-500',
  },
  {
    icon: Handshake,
    title: 'Support Students With Mentorship',
    desc: 'Providing direct 1-on-1 instructor feedback, career Q&As, and personalized guidance.',
    color: 'bg-emerald-500',
  },
  {
    icon: TrendingUp,
    title: 'Continuously Update Courses',
    desc: 'Aligning our modules with current Federal Board of Revenue (FBR) and corporate legal reforms.',
    color: 'bg-indigo-500',
  },
  {
    icon: Heart,
    title: 'Create a Positive Community',
    desc: 'Fostering an inclusive, collaborative space where professionals help each other thrive.',
    color: 'bg-rose-500',
  },
  {
    icon: Target,
    title: 'Help Learners Achieve Career Success',
    desc: 'Empowering graduates with recognized credentials, portfolio projects, and job readiness.',
    color: 'bg-cyan-500',
  },
];

export function MissionSection() {
  return (
    <section className="section-padding bg-surface-secondary border-y border-border relative overflow-hidden">
      <div className="section-container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-primary px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 inline-block">
            Our Purpose
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-heading">
            Our Mission
          </h2>
          <p className="text-base text-body leading-relaxed">
            Every course, masterclass, and practical lecture at Premier LMS is designed around seven fundamental commitments to student growth.
          </p>
        </div>

        {/* 7 Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission, idx) => {
            const IconComponent = mission.icon;
            const isLastOdd = idx === missions.length - 1;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`group rounded-3xl bg-white border border-border p-7 shadow-soft hover:shadow-card-hover hover:border-primary/40 transition-all duration-300 flex flex-col justify-between ${
                  isLastOdd ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl ${mission.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-heading group-hover:text-primary transition-colors">
                    {mission.title}
                  </h3>
                  <p className="text-sm text-body leading-relaxed">
                    {mission.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-border/50 flex items-center justify-between text-xs font-heading font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Pillar #{idx + 1}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
