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
    <section ref={ref} className="py-20 bg-premier-cream border-t border-border relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="space-y-2 p-6 rounded-2xl bg-white/60 border border-border/50 shadow-soft backdrop-blur-sm">
                <div className="w-12 h-12 rounded-2xl bg-premier-green/10 text-premier-green mx-auto flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-number font-extrabold tracking-tight text-premier-green">
                  {inView ? <CountUp start={0} end={stat.end} duration={2.5} separator="," /> : '0'}
                  {stat.suffix}
                </div>
                <div className="text-sm font-heading font-extrabold text-slate-900">{stat.label}</div>
                <div className="text-xs font-body text-slate-600">{stat.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
