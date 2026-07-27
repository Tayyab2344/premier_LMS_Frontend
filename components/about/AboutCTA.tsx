'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Sparkles, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function AboutCTA() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="section-container">
        
        {/* Main Blue Banner Container */}
        <div className="relative rounded-3xl bg-gradient-to-br from-primary-900 via-primary to-blue-600 p-8 sm:p-14 md:p-16 text-white shadow-card-hover overflow-hidden">
          
          {/* Subtle Ambient Shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />
          
          {/* Abstract Floating Decorative Icons */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-8 right-12 hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-heading font-semibold text-amber-300 pointer-events-none"
          >
            <Sparkles className="w-4 h-4" />
            Empowering 5,000+ Learners
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-8 right-32 hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-heading font-semibold text-white pointer-events-none"
          >
            <GraduationCap className="w-4 h-4 text-emerald-300" />
            Accredited Masterclasses
          </motion.div>

          {/* Content Grid */}
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-heading font-bold uppercase tracking-wider border border-white/20">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                Start Your Career Transformation Today
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold leading-tight text-white">
                Your Learning Journey Starts Here
              </h2>

              <p className="text-white/85 text-base sm:text-lg max-w-2xl leading-relaxed">
                Join thousands of students who are building their future with practical education instructed by Raja Gulfam. Stream live masterclasses &amp; recordings on our Student Mobile App during the course and for 2 months after graduation.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-end">
              <Link
                href="/courses"
                className="btn-primary !bg-white !text-primary hover:!bg-surface-hover shadow-lg text-center justify-center !py-4 !px-8 text-base group"
                aria-label="Browse masterclass courses catalog"
              >
                Browse Courses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              
              <Link
                href="/admission"
                className="btn-secondary !bg-white/10 !text-white !border-white/40 hover:!bg-white/20 text-center justify-center !py-4 !px-8 text-base"
                aria-label="Proceed to student admission portal"
              >
                Enroll Today
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
