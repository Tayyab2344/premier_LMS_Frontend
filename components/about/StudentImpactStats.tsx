'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  BookOpen,
  Award,
  Clock,
  CheckSquare,
  Globe,
  Star
} from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const impactStats = [
  { icon: Users, label: 'Students Enrolled', end: 5000, suffix: '+', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: BookOpen, label: 'Specialized Courses', end: 12, suffix: '+', color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { icon: Award, label: 'Certificates Issued', end: 4200, suffix: '+', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { icon: Clock, label: 'Learning Hours', end: 50000, suffix: '+', color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: CheckSquare, label: 'Projects Completed', end: 8500, suffix: '+', color: 'text-amber-500', bg: 'bg-amber-50' },
  { icon: Globe, label: 'Countries Reached', end: 15, suffix: '+', color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { icon: Star, label: 'Positive Reviews', end: 99, suffix: '%', color: 'text-rose-500', bg: 'bg-rose-50' },
];

export function StudentImpactStats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="section-padding bg-gradient-to-b from-primary-900 via-primary-800 to-primary-950 text-white relative overflow-hidden">
      {/* Glow Ornaments */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-amber-300 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 inline-block">
            Measured Growth
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white">
            Our Student Impact
          </h2>
          <p className="text-base text-white/80 leading-relaxed">
            Numbers that highlight our dedication to practical excellence, career transformations, and educational quality.
          </p>
        </div>

        {/* 7 Animated Stat Cards */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {impactStats.map((stat, idx) => {
            const IconComp = stat.icon;
            const isLast = idx === impactStats.length - 1;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className={`rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-5 text-center flex flex-col justify-between hover:bg-white/20 transition-all duration-300 ${
                  isLast ? 'col-span-2 md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="flex justify-center mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shadow-sm`}>
                    <IconComp className="w-5 h-5 text-amber-300" />
                  </div>
                </div>

                <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white mb-1">
                  {inView ? (
                    <CountUp
                      start={0}
                      end={stat.end}
                      duration={2.5}
                      separator=","
                      suffix={stat.suffix}
                    />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </div>

                <p className="text-xs font-heading font-medium text-white/70">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
