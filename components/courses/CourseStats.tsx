'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, FolderGit2, ShieldCheck, Award } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const statsData = [
  { icon: BookOpen, end: 10, suffix: ' Courses', label: 'Specialized Track Modules', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Users, end: 1000, suffix: '+', label: 'Active Students Enrolled', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: FolderGit2, end: 50, suffix: '+', label: 'Real Tax & SECP Case Studies', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: ShieldCheck, end: 2, suffix: ' Months', label: 'Post-Course App Access', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Award, end: 4200, suffix: '+', label: 'Accredited Certificates Issued', color: 'text-rose-600', bg: 'bg-rose-50' },
];

export function CourseStats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-surface-secondary border-y border-border py-12">
      <div className="section-container">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {statsData.map((stat, idx) => {
            const IconComp = stat.icon;
            const isLast = idx === statsData.length - 1;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`p-5 rounded-2xl bg-white border border-border shadow-soft flex flex-col justify-between hover:shadow-card hover:border-primary/40 transition-all ${
                  isLast ? 'col-span-2 md:col-span-1' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-mono font-extrabold text-heading">
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
                  <p className="text-xs font-heading font-medium text-body mt-1">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
