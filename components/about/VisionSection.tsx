'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Globe, Sparkles, TrendingUp } from 'lucide-react';

export function VisionSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-primary-50/50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Centered Large Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-primary/20 blur-xl animate-pulse" />
              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-primary to-blue-500 text-white flex items-center justify-center shadow-blue-glow border border-white/40">
                <Compass className="w-10 h-10 animate-spin-slow" style={{ animationDuration: '20s' }} />
              </div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-primary px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100">
              Future Roadmap
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-heading">
              Our Vision
            </h2>
          </motion.div>

          {/* Vision Content Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-3xl bg-gradient-to-b from-surface-secondary to-white border border-border p-8 sm:p-12 shadow-card-hover text-left sm:text-center space-y-6"
          >
            <p className="text-lg sm:text-xl text-heading font-body font-medium leading-relaxed">
              "Our vision is to become one of the most trusted online learning platforms, empowering students across Pakistan and around the world with practical, industry-relevant education."
            </p>
            <p className="text-base text-body leading-relaxed max-w-3xl mx-auto">
              We aim to bridge the gap between academic knowledge and professional skills by providing accessible, affordable, and high-quality learning experiences. Through innovation, mentorship, and continuous improvement, we strive to inspire lifelong learners and prepare future leaders who can contribute positively to society and the global workforce.
            </p>
          </motion.div>

          {/* Growth & Innovation Illustration Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid sm:grid-cols-3 gap-6 pt-4 text-left"
          >
            <div className="p-6 rounded-2xl bg-white border border-border shadow-soft hover:shadow-card-hover hover:border-primary/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="text-base font-heading font-bold text-heading mb-1">Global Accessibility</h4>
              <p className="text-xs text-body leading-relaxed">Empowering learners worldwide through scalable digital tools.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border shadow-soft hover:shadow-card-hover hover:border-primary/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-base font-heading font-bold text-heading mb-1">Practical Excellence</h4>
              <p className="text-xs text-body leading-relaxed">Transforming complex legal/tax procedures into easy skills.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border shadow-soft hover:shadow-card-hover hover:border-primary/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-base font-heading font-bold text-heading mb-1">Lifelong Innovation</h4>
              <p className="text-xs text-body leading-relaxed">Continuously upgrading tools to meet corporate industry shifts.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
