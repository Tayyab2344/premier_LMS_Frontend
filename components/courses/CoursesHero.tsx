'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  ArrowRight,
  UserCheck,
  Award,
  GraduationCap,
  CheckCircle,
  Smartphone
} from 'lucide-react';
import Link from 'next/link';

export function CoursesHero() {
  return (
    <section className="relative pt-[90px] pb-20 md:py-28 overflow-hidden bg-white">
      {/* Background Animated Gradient Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-primary-100/60 rounded-full blur-3xl opacity-50 animate-blob pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-blue-100/40 rounded-full blur-3xl opacity-40 animate-blob pointer-events-none style-gpu" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#2563EB 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[540px]">
          
          {/* Left Column: Heading & Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Small Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary text-xs font-heading font-bold uppercase tracking-wider shadow-soft"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              Tax, Law &amp; Financial Masterclasses
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-heading leading-[1.12] tracking-tight"
            >
              Master Tax, Corporate Law &amp; Financial Practice From{' '}
              <span className="relative inline-block text-primary">
                Practicing Experts
                <svg
                  className="absolute -bottom-2 left-0 w-full text-primary/30"
                  viewBox="0 0 240 12"
                  fill="none"
                >
                  <path
                    d="M3 9C60 3 180 3 237 9"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-body leading-relaxed max-w-2xl"
            >
              Explore practical masterclasses in Income Tax, Sales Tax, SECP Corporate Law, Forensic Audit, and Banking Advisory designed by High Court Advocate &amp; ACMA Raja Gulfam. Stream live and recorded classes 24/7 on the Premier LMS Student Mobile App.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a href="#courses-catalog" className="btn-primary text-base !px-8 !py-4 group">
                Explore Masterclasses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/about#meet-founder" className="btn-secondary text-base !px-8 !py-4 group">
                <UserCheck className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                Contact Us
              </Link>
            </motion.div>

            {/* Micro Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-6 border-t border-border/60 flex flex-wrap gap-6 max-w-xl"
            >
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-primary" />
                <span className="text-xs font-heading font-semibold text-heading">Premier LMS Student Mobile App</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-heading font-semibold text-heading">Accredited Tax &amp; Corporate Diplomas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-heading font-semibold text-heading">Direct Guidance by Raja Gulfam</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Illustration Graphic */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative w-full max-w-[460px]"
            >
              {/* Outer Decorative Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-blue-400/20 rounded-3xl blur-2xl -z-10" />

              {/* Main Card */}
              <div className="relative rounded-3xl bg-gradient-to-b from-white to-primary-50 border border-primary-100 p-6 sm:p-8 shadow-card-hover overflow-hidden">
                <div className="relative aspect-[4/3.2] w-full flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-tr from-primary-700 via-primary to-blue-600 rounded-2xl p-6 text-white flex flex-col justify-between shadow-elevated relative overflow-hidden group">
                    
                    <div className="flex justify-between items-start z-10">
                      <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                        <GraduationCap className="w-4 h-4 text-amber-300" />
                        <span className="text-xs font-heading font-semibold text-white">Premier Academy</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 text-[11px] font-mono font-bold uppercase">
                        TAX &amp; CORPORATE
                      </span>
                    </div>

                    <div className="space-y-3 z-10 my-4">
                      <div className="inline-flex items-center gap-2 text-white/90 text-xs font-semibold bg-black/20 backdrop-blur-sm px-3 py-1 rounded-md">
                        <Smartphone className="w-3.5 h-3.5 text-blue-200" />
                        Live Classes on Mobile App
                      </div>
                      <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white leading-tight">
                        Real-World FBR, SECP &amp; Financial Practice
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-white/20 flex items-center justify-between z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center font-heading font-bold text-xs shadow-md">
                          RG
                        </div>
                        <div>
                          <p className="text-xs font-heading font-bold text-white leading-none">Raja Gulfam</p>
                          <p className="text-[10px] text-white/70">Advocate High Court &amp; ACMA</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-300">
                        ★ 4.9/5
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -left-4 sm:-left-6 bg-white border border-border rounded-2xl p-3.5 shadow-card-hover flex items-center gap-3 z-20"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-blue-glow">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-heading font-bold text-heading">Student Mobile App</p>
                    <p className="text-[11px] text-body">Watch Live &amp; HD Records</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-4 -right-4 sm:-right-6 bg-white border border-border rounded-2xl p-3.5 shadow-card-hover flex items-center gap-3 z-20"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-heading font-bold text-heading">Accredited Diploma</p>
                    <p className="text-[11px] text-body">Verified Public Credentials</p>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
