'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section id="home" className="relative pt-[108px] overflow-hidden">
      {/* Background Video (v1.mp4 with hardware GPU acceleration) */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-105 blur-[2px] opacity-100"
          style={{ transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}
        >
          <source src="/assets/v1.mp4" type="video/mp4" />
        </video>
        {/* Subtle dark gradient overlay for high editorial readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/80 pointer-events-none" />
        {/* Subtle bottom edge blend into next section */}
        <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-premier-cream via-premier-cream/40 to-transparent pointer-events-none z-10" />
      </div>

      {/* Background Elements — Stripe/Linear style */}
      <div
        className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-20 animate-blob pointer-events-none"
        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 animate-blob pointer-events-none"
        style={{ animationDelay: '4s', willChange: 'transform', transform: 'translateZ(0)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-50 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ transform: 'translate3d(-50%, -50%, 0)' }}
      />
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-pattern opacity-[0.03] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="flex flex-col justify-between min-h-[calc(100vh-108px)] pt-12 sm:pt-16 pb-8 sm:pb-12 max-w-4xl mx-auto text-center items-center">
          {/* Center Editorial Content Block: Refined Serif Typography */}
          <div className="space-y-6 sm:space-y-8 my-auto flex flex-col items-center">
            {/* Editorial Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-6xl lg:text-[68px] font-heading font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-md text-center max-w-4xl"
            >
              <span className="block text-white/95 text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-2 sm:mb-3">
                Learn Skills That
              </span>
              <span className="relative inline-block mt-1">
                <span className="text-premier-gold font-extrabold drop-shadow-md tracking-tight">
                  Build Your Future
                </span>
                {/* Light Golden Extended Horizontal Swoosh Stroke (#F2C94C) */}
                <svg className="absolute -bottom-2 sm:-bottom-3 -left-[5%] w-[110%] h-3 sm:h-4 overflow-visible" viewBox="0 0 320 14" fill="none" aria-hidden="true">
                  <path
                    d="M-5 10.5C80 2.5 240 2.5 325 10.5"
                    stroke="#daa70eff"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.95"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Refined Diploma/Seal Style Tagline with Gold Diamond Flourishes */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 text-xs sm:text-sm font-body font-semibold uppercase tracking-widest text-slate-200 drop-shadow-sm select-none pt-2"
            >
              <span>Expert-Led</span>
              <span className="w-1.5 h-1.5 rotate-45 bg-premier-gold shrink-0 opacity-90 shadow-xs" aria-hidden="true" />
              <span>Accredited</span>
              <span className="w-1.5 h-1.5 rotate-45 bg-premier-gold shrink-0 opacity-90 shadow-xs" aria-hidden="true" />
              <span>Career-Ready</span>
            </motion.div>
          </div>

          {/* Bottom Content Block: Primary CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-8 pb-2 z-20"
          >
            <Link href="/courses" className="btn-primary text-base !px-8 !py-4" aria-label="Explore all accredited courses">
              Explore Courses
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
