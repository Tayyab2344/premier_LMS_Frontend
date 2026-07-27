'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Shield,
  Lightbulb,
  GraduationCap,
  Laptop,
  Compass,
  Sparkles
} from 'lucide-react';

const values = [
  {
    icon: Award,
    title: 'Excellence',
    desc: 'Deliver high-quality education by adhering to rigorous academic standards and real-world corporate rigor.',
    gradient: 'from-blue-500 to-indigo-600',
    bgIcon: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Shield,
    title: 'Integrity',
    desc: 'Teach with honesty, legal accuracy, and complete transparency in every masterclass and consultation.',
    gradient: 'from-emerald-500 to-teal-600',
    bgIcon: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: 'Continuously improve learning methods by incorporating digital software, live Q&As, and interactive cases.',
    gradient: 'from-amber-500 to-orange-600',
    bgIcon: 'bg-amber-50 text-amber-600',
  },
  {
    icon: GraduationCap,
    title: 'Student Success',
    desc: 'Every student’s growth matters. We measure our achievement by the promotions and careers our alumni earn.',
    gradient: 'from-purple-500 to-violet-600',
    bgIcon: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Laptop,
    title: 'Practical Learning',
    desc: 'Focus on real-world applications so students leave with portfolio-ready tax files, audits, and advice.',
    gradient: 'from-cyan-500 to-blue-600',
    bgIcon: 'bg-cyan-50 text-cyan-600',
  },
  {
    icon: Compass,
    title: 'Lifelong Learning',
    desc: 'Encourage continuous personal and professional development in an ever-evolving legal and financial market.',
    gradient: 'from-rose-500 to-pink-600',
    bgIcon: 'bg-rose-50 text-rose-600',
  },
];

export function CoreValues() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="section-container relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-primary px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 inline-block">
            Foundational Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-heading">
            Our Core Values
          </h2>
          <p className="text-base text-body leading-relaxed">
            These six principles dictate how we structure our courses, interact with students, and cultivate educational excellence.
          </p>
        </div>

        {/* 6 Premium Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((val, idx) => {
            const IconComponent = val.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-3xl p-[2px] transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Gradient Border Animation on Hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${val.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]`} />

                {/* Card Main Body */}
                <div className="relative rounded-[22px] bg-white p-8 border border-border group-hover:border-transparent transition-colors shadow-soft group-hover:shadow-card-hover h-full flex flex-col justify-between">
                  <div className="space-y-5">
                    
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className={`w-14 h-14 rounded-2xl ${val.bgIcon} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-mono font-bold text-body/60 group-hover:text-primary transition-colors">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-heading font-bold text-heading group-hover:text-primary transition-colors">
                      {val.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-body leading-relaxed">
                      {val.desc}
                    </p>
                  </div>

                  {/* Bottom Highlight */}
                  <div className="pt-6 mt-6 border-t border-border/60 flex items-center gap-2 text-xs font-heading font-semibold text-body group-hover:text-heading transition-colors">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span>Non-Negotiable Principle</span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
