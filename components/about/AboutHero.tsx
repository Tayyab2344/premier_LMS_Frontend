'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, UserCheck, FileText, Calculator, Briefcase, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function AboutHero() {
  return (
    <section className="relative pt-[72px] overflow-hidden">
      {/* Background Video (v3.mp4 from assets) */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 blur-[2px] opacity-100"
        >
          <source src="/assets/v3.mp4" type="video/mp4" />
        </video>
        {/* Transparent dark tint overlay for video clarity & text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/40 to-transparent pointer-events-none" />
        {/* Subtle bottom edge blend into next section */}
        <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-premier-cream via-premier-cream/40 to-transparent pointer-events-none" />
      </div>

      {/* Abstract Animated Ambient Blobs */}
      <div className="absolute top-12 left-10 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl opacity-20 animate-blob pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-premier-green-100/40 rounded-full blur-3xl opacity-20 animate-blob pointer-events-none style-gpu" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-50 rounded-full blur-3xl opacity-20 pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#2563EB 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="section-container relative z-10">
        <div className="flex flex-col justify-center min-h-[calc(100vh-72px)] py-10 lg:py-16 max-w-3xl">
          {/* Content Column */}
          <div className="space-y-6 sm:space-y-8">
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-[1.12] tracking-tight drop-shadow-md"
            >
              Empowering Students Through{' '}
              <span className="relative inline-block text-emerald-400">
                Quality Education
                <svg
                  className="absolute -bottom-5 sm:-bottom-6 left-0 w-full pointer-events-none"
                  viewBox="0 0 200 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8.5C50 2.5 150 2.5 198 8.5"
                    stroke="#C8B687"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Sub-line */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg font-body font-medium text-slate-100 leading-relaxed max-w-2xl drop-shadow-sm"
            >
              Founded by Raja Gulfam — practical training in taxation, accounting, and corporate finance.
            </motion.p>

            {/* Subject Chips Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center gap-2.5 pt-1"
            >
              <div className="px-3.5 py-1.5 rounded-full bg-[#FAF6EE]/90 border border-[#1B3B2C]/40 text-[#1B3B2C] text-xs font-heading font-extrabold shadow-sm backdrop-blur-md flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#1B3B2C]" />
                <span>Taxation</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-[#FAF6EE]/90 border border-[#1B3B2C]/40 text-[#1B3B2C] text-xs font-heading font-extrabold shadow-sm backdrop-blur-md flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-[#1B3B2C]" />
                <span>Accounting</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-[#FAF6EE]/90 border border-[#1B3B2C]/40 text-[#1B3B2C] text-xs font-heading font-extrabold shadow-sm backdrop-blur-md flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#1B3B2C]" />
                <span>Corporate Finance</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-[#FAF6EE]/90 border border-[#1B3B2C]/40 text-[#1B3B2C] text-xs font-heading font-extrabold shadow-sm backdrop-blur-md flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1B3B2C]" />
                <span>Forensic Management</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <Link href="/courses" className="btn-primary text-base !px-8 !py-4 group focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream" aria-label="Explore courses catalog">
                Explore Courses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <a href="#meet-founder" className="btn-secondary text-base !px-8 !py-4 group !bg-white/15 !text-white !border-white/30 hover:!bg-white/25 backdrop-blur-sm" aria-label="Meet founder and instructor Raja Gulfam">
                <UserCheck className="w-5 h-5 text-white group-hover:scale-110 transition-transform" aria-hidden="true" />
                Meet the Instructor
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
