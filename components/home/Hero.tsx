'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { ImageSequence } from './ImageSequence';

export function Hero() {
  return (
    <section id="home" className="relative pt-[72px] overflow-hidden bg-white">
      {/* Background Elements — Stripe/Linear style */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-30 animate-blob pointer-events-none" style={{ willChange: 'transform', transform: 'translateZ(0)' }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 animate-blob pointer-events-none" style={{ animationDelay: '4s', willChange: 'transform', transform: 'translateZ(0)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-50 rounded-full blur-3xl opacity-40 pointer-events-none" style={{ transform: 'translate3d(-50%, -50%, 0)' }} />
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-pattern opacity-[0.03] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-72px)] py-16 lg:py-0">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Trust Badge */}


            {/* Heading — 64px, Manrope 800, -0.04em */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-[64px] font-heading font-extrabold text-heading leading-none"
              style={{ letterSpacing: '-0.04em' }}
            >
              Learn Skills That{' '}
              <span className="relative inline-block">
                <span className="text-premier-green">Build Your</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" aria-hidden="true">
                  <path d="M2 8.5C50 2.5 150 2.5 198 8.5" stroke="#C8B687" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
                </svg>
              </span>{' '}
              Future
            </motion.h1>

            {/* Description — 22px, Inter 400, line-height 1.7, high contrast #334155 */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg sm:text-[22px] font-body font-normal leading-[1.7] max-w-[650px] text-slate-700"
            >
              Join thousands of professionals learning from industry expert Raja Gulfam.
              Access live classes, HD recorded lectures, and earn accredited certificates that
              advance your career.
            </motion.p>

            {/* CTA Buttons — Inter 600, 16px */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link href="/courses" className="btn-primary text-base !px-8 !py-4" aria-label="Explore all accredited courses">
                Explore Courses
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <button className="btn-secondary text-base !px-8 !py-4 group" aria-label="Watch platform introduction video">
                <PlayCircle className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
                Watch Introduction
              </button>
            </motion.div>

            {/* Quick Stats — Space Grotesk 700 for numbers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-8 pt-4"
            >
              {[
                { value: '25K+', label: 'Students' },
                { value: '120+', label: 'Courses' },
                { value: '98%', label: 'Success Rate' },
              ].map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="text-2xl font-number font-bold text-heading">{stat.value}</div>
                  <div className="text-sm font-body text-body">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Visual */}
          {/* Right Visual Area (3D Image Sequence Monitor) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full relative flex flex-col items-center justify-center mt-8 lg:mt-0 hidden lg:flex"
          >
            {/* Monitor Display */}
            <div className="w-full aspect-video relative rounded-xl lg:rounded-2xl border-[8px] lg:border-[16px] border-[#0a2318] bg-[#05140e] shadow-[0_0_60px_rgba(16,185,129,0.35)] overflow-hidden ring-1 ring-emerald-500/50">
              {/* Screen Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] z-10 pointer-events-none" />
              
              <ImageSequence frameCount={60} />
            </div>
            
            {/* Monitor Stand */}
            <div className="w-16 lg:w-24 h-6 lg:h-8 bg-gradient-to-b from-premier-green-dark to-premier-green shadow-inner relative z-0 -mt-1" />
            <div className="w-32 lg:w-48 h-2 lg:h-3 bg-premier-gold rounded-t-lg shadow-2xl relative z-10" />
          </motion.div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full" aria-hidden="true">
          <path d="M0 30L48 25C96 20 192 10 288 10C384 10 480 20 576 25C672 30 768 30 864 28C960 26 1056 22 1152 20C1248 18 1344 18 1392 18L1440 18V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0V30Z" fill="#F8FAFC" />
        </svg>
      </div>
    </section>
  );
}
