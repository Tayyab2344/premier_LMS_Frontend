'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  TrendingUp,
  Sparkles,
  GraduationCap,
  Award,
  Lightbulb,
  Handshake,
  Heart,
  Target,
  Laptop,
  ShieldCheck,
  Compass,
  Quote
} from 'lucide-react';

const missions = [
  { step: '01', title: 'Practical Education', tag: '⚡ Real Client Files', icon: GraduationCap, color: 'bg-blue-500' },
  { step: '02', title: 'Affordable Learning', tag: '🏷️ Student Pricing', icon: Award, color: 'bg-purple-500' },
  { step: '03', title: 'Build Confidence', tag: '💡 Project-Based', icon: Lightbulb, color: 'bg-amber-500' },
  { step: '04', title: 'Student Mentorship', tag: '🤝 1-on-1 Feedback', icon: Handshake, color: 'bg-emerald-600' },
  { step: '05', title: 'Update Courses', tag: '⚖️ Finance Act 2026', icon: TrendingUp, color: 'bg-indigo-500' },
  { step: '06', title: 'Positive Community', tag: '👥 Tax Bar Network', icon: Heart, color: 'bg-rose-500' },
  { step: '07', title: 'Career Success', tag: '🚀 Practice & Jobs', icon: Target, color: 'bg-cyan-500' },
];

const values = [
  { step: '01', title: 'Practical Learning', tag: '⚡ Real Files', icon: Laptop, color: 'bg-emerald-500' },
  { step: '02', title: 'Student Success', tag: '🏆 Career Leaps', icon: GraduationCap, color: 'bg-purple-500' },
  { step: '03', title: 'Academic Excellence', tag: '⚖️ Legal Rigor', icon: Award, color: 'bg-blue-500' },
  { step: '04', title: 'Digital Innovation', tag: '💡 Live Tech', icon: Lightbulb, color: 'bg-amber-500' },
  { step: '05', title: 'Integrity First', tag: '🛡️ 100% Honest', icon: ShieldCheck, color: 'bg-teal-600' },
  { step: '06', title: 'Lifelong Growth', tag: '🚀 24/7 Access', icon: Compass, color: 'bg-rose-500' },
];

export function VisionMissionValuesHub() {
  return (
    <section className="section-padding bg-premier-cream border-b border-border relative overflow-hidden" id="purpose-pillars">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-premier-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ==================== LEFT COLUMN: TALL VISION HERO CARD ==================== */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#0F3524] via-[#164E36] to-[#0A261A] text-white p-7 sm:p-9 shadow-2xl border border-white/20 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Background ambient blur */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 -translate-x-1/3" />

            <div className="space-y-6 relative z-10">
              {/* Header */}
              <div>
                
                <h3 className="text-3xl font-heading font-extrabold text-white">
                   Our Vision
                </h3>
              </div>

              {/* Quote Block */}
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-3 relative">
                <Quote className="w-6 h-6 text-amber-300 opacity-80" />
                <p className="text-base sm:text-lg font-heading font-extrabold text-white leading-relaxed">
                  "Our vision is to become one of the most trusted online learning platforms, empowering students across Pakistan and around the world with practical, industry-relevant education."
                </p>
              </div>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-body">
                We aim to bridge the gap between academic knowledge and professional skills by providing accessible, affordable, and high-quality learning experiences.
              </p>
            </div>

            {/* 3 Impact Cards at Bottom */}
            <div className="space-y-3 pt-6 mt-6 border-t border-white/15 relative z-10">
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/30 text-blue-300 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-heading font-bold text-white">Global Accessibility</h4>
                  <p className="text-[11px] text-emerald-100/80">Empowering learners worldwide through mobile tech.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-heading font-bold text-white">Practical Excellence</h4>
                  <p className="text-[11px] text-emerald-100/80">Transforming complex legal procedures into skills.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/30 text-purple-300 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-heading font-bold text-white">Lifelong Innovation</h4>
                  <p className="text-[11px] text-emerald-100/80">Upgrading tools for current Finance Acts &amp; SECP shifts.</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* ==================== RIGHT COLUMN: MISSION (TOP) & VALUES (BOTTOM) ==================== */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            
            {/* TOP RIGHT BOX: OUR MISSION */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-white border border-border p-6 sm:p-7 shadow-soft hover:shadow-card-hover transition-all space-y-5"
            >
              <div className="flex items-center justify-between">
                <div>
                 
                  <h3 className="text-2xl font-heading font-extrabold text-heading">
                     Our Mission
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">7 Pillars</span>
              </div>

              {/* Mission Small Pills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {missions.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.015, y: -2 }}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3 group hover:bg-white hover:border-purple-300 transition-all shadow-sm"
                    >
                      <div className={`w-9 h-9 rounded-xl ${item.color} text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                        <IconComp className="w-4.5 h-4.5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-heading font-bold text-purple-700 block truncate">
                          {item.tag}
                        </span>
                        <h4 className="text-xs sm:text-sm font-heading font-bold text-heading truncate">
                          {item.title}
                        </h4>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* BOTTOM RIGHT BOX: CORE VALUES */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl bg-white border border-border p-6 sm:p-7 shadow-soft hover:shadow-card-hover transition-all space-y-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  
                   
    
                  <h3 className="text-2xl font-heading font-extrabold text-heading">
                     Core Values
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">6 Pillars</span>
              </div>

              {/* Core Values Small Pills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {values.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.015, y: -2 }}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3 group hover:bg-white hover:border-emerald-300 transition-all shadow-sm"
                    >
                      <div className={`w-9 h-9 rounded-xl ${item.color} text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                        <IconComp className="w-4.5 h-4.5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-heading font-bold text-emerald-700 block truncate">
                          {item.tag}
                        </span>
                        <h4 className="text-xs sm:text-sm font-heading font-bold text-heading truncate">
                          {item.title}
                        </h4>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
