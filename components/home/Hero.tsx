'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, Users, BookOpen, Award, Star, Video } from 'lucide-react';
import Link from 'next/link';

const floatingCards = [
  { icon: Users, label: '25K+ Students', value: 'Enrolled', color: 'bg-blue-500', x: 'left-0 -translate-x-1/3', y: 'top-1/4', delay: 0.8 },
  { icon: Video, label: 'Live Classes', value: 'Every Week', color: 'bg-emerald-500', x: 'right-0 translate-x-1/4', y: 'top-1/3', delay: 1.0 },
  { icon: Award, label: 'Certificates', value: 'Accredited', color: 'bg-amber-500', x: 'right-0 translate-x-1/6', y: 'bottom-1/4', delay: 1.2 },
  { icon: Star, label: '4.9 Rating', value: 'Instructor', color: 'bg-purple-500', x: 'left-0 -translate-x-1/4', y: 'bottom-1/3', delay: 1.4 },
];

export function Hero() {
  return (
    <section className="relative pt-[72px] overflow-hidden bg-white">
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
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary-50 border border-primary-100"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm font-body font-semibold text-primary">Trusted Learning Platform</span>
            </motion.div>

            {/* Heading — 64px, Manrope 800, -0.04em */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-[64px] font-heading font-extrabold text-heading leading-none"
              style={{ letterSpacing: '-0.04em' }}
            >
              Learn Skills That{' '}
              <span className="relative">
                <span className="text-primary">Build Your</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" aria-hidden="true">
                  <path d="M2 8.5C50 2.5 150 2.5 198 8.5" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
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
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main Hero Visual */}
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Central gradient circle */}
              <div className="absolute inset-8 rounded-3xl bg-gradient-to-br from-primary-100 via-blue-50 to-primary-50 shadow-elevated overflow-hidden">
                <div className="absolute inset-0 dot-pattern opacity-[0.06]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-card mx-auto flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-extrabold text-heading">Start Learning</h3>
                    <p className="text-sm font-body text-body max-w-xs">Interactive courses designed for real-world professional growth</p>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              {floatingCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: card.delay, duration: 0.5 }}
                    className={`absolute ${card.y} ${card.x} z-10`}
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ willChange: 'transform' }}
                      className="bg-white rounded-2xl p-4 shadow-card border border-border flex items-center gap-3"
                    >
                      <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-heading font-bold text-heading">{card.label}</div>
                        <div className="text-[11px] font-body text-body">{card.value}</div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
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
