'use client';

import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Users, BookOpen, Award, Clock, Globe } from 'lucide-react';

const stats = [
  { icon: Users, end: 25000, suffix: '+', label: 'Active Students', desc: 'Enrolled worldwide' },
  { icon: BookOpen, end: 120, suffix: '+', label: 'Courses & Seminars', desc: 'Accredited modules' },
  { icon: Award, end: 45000, suffix: '+', label: 'Certificates Awarded', desc: 'Verified outcomes' },
  { icon: Clock, end: 150000, suffix: '+', label: 'Hours of Content', desc: 'Live & on-demand' },
  { icon: Globe, end: 35, suffix: '+', label: 'Countries Represented', desc: 'Global community' },
];

export function StudentSuccessNumbers() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-16 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSIjRkZGRkZGIiBvcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] opacity-40" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="space-y-2 p-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md mx-auto flex items-center justify-center text-primary-300 mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-number font-bold tracking-tight text-white">
                  {inView ? <CountUp start={0} end={stat.end} duration={2.5} separator="," /> : '0'}
                  {stat.suffix}
                </div>
                <div className="text-sm font-body font-semibold text-white">{stat.label}</div>
                <div className="text-xs font-body text-white/60">{stat.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
