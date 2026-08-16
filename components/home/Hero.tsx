'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, Users, BookOpen, Award } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section id="home" className="relative pt-[72px] overflow-hidden">
      {/* Background Video (v1.mp4 from assets) */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 blur-[2px] opacity-100"
        >
          <source src="/assets/v1.mp4" type="video/mp4" />
        </video>
        {/* Transparent dark tint overlay for text readability without white background */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/40 to-transparent pointer-events-none" />
        {/* Subtle bottom edge blend into next section */}
        <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-premier-cream via-premier-cream/40 to-transparent pointer-events-none" />
      </div>

      {/* Background Elements — Stripe/Linear style */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-20 animate-blob pointer-events-none" style={{ willChange: 'transform', transform: 'translateZ(0)' }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 animate-blob pointer-events-none" style={{ animationDelay: '4s', willChange: 'transform', transform: 'translateZ(0)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-50 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ transform: 'translate3d(-50%, -50%, 0)' }} />
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-pattern opacity-[0.03] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="flex flex-col justify-center min-h-[calc(100vh-72px)] py-12 lg:py-20 max-w-2xl">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Heading — 64px, Manrope 800, -0.04em */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-[64px] font-heading font-extrabold text-white leading-none drop-shadow-md"
              style={{ letterSpacing: '-0.04em' }}
            >
              Learn Skills That{' '}
              <span className="relative inline-block">
                <span className="text-emerald-400">Build Your</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" aria-hidden="true">
                  <path d="M2 8.5C50 2.5 150 2.5 198 8.5" stroke="#C8B687" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
                </svg>
              </span>{' '}
              Future
            </motion.h1>

            {/* Sub-line */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg sm:text-xl font-body font-semibold tracking-wide text-slate-100 drop-shadow-sm"
            >
              Expert-led. Accredited. Career-ready.
            </motion.p>

            {/* CTA Buttons — Inter 600, 16px */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <Link href="/courses" className="btn-primary text-base !px-8 !py-4" aria-label="Explore all accredited courses">
                Explore Courses
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <button className="btn-secondary text-base !px-8 !py-4 group !bg-white/15 !text-white !border-white/30 hover:!bg-white/25 backdrop-blur-sm" aria-label="Watch platform introduction video">
                <PlayCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform" aria-hidden="true" />
                Watch Introduction
              </button>
            </motion.div>

            {/* Compact Stat Chips Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3 pt-6 sm:pt-7"
            >
              <div className="px-3.5 py-1.5 rounded-full bg-slate-950/60 border border-emerald-500/30 backdrop-blur-md text-xs font-mono font-bold text-emerald-300 shadow-sm flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>25K+ Students</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-slate-950/60 border border-emerald-500/30 backdrop-blur-md text-xs font-mono font-bold text-emerald-300 shadow-sm flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>120+ Courses</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-slate-950/60 border border-emerald-500/30 backdrop-blur-md text-xs font-mono font-bold text-emerald-300 shadow-sm flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>98% Certified</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}
