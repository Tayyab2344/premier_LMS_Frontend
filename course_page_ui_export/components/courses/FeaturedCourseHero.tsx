'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Clock,
  Users,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Landmark,
  Bot,
  Zap,
  Cpu,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/lib/coursesData';

interface FeaturedCourseHeroProps {
  course: Course;
}

export function FeaturedCourseHero({ course }: FeaturedCourseHeroProps) {
  return (
    <section className="relative pt-[100px] pb-12 md:pt-[125px] md:pb-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white border-b border-slate-800 overflow-hidden">
      {/* AI Cyber Glow Background Blobs */}
      <div className="absolute top-0 left-1/3 w-[550px] h-[550px] bg-emerald-500/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Modern AI Grid Circuit Background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#34D399 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="section-container relative z-10 space-y-10 md:space-y-12">
        
        {/* Top Hero Section Header Grid (2 Columns Desktop) */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headline & Statements */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* AI Tagline Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-heading font-bold uppercase tracking-wider backdrop-blur-md"
            >
              <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>AI-Enhanced Tax &amp; Corporate Academy</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-[1.1] tracking-tight"
            >
              Learn. Practice.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Advance.
              </span>
            </motion.h1>

            {/* Punchy Short Subtitle (Low Text) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 leading-snug max-w-xl font-normal"
            >
              Master real FBR IRIS portal filing &amp; corporate compliance with{' '}
              <span className="text-emerald-300 font-bold">AI-assisted case simulations</span>. Flagship course open now.
            </motion.p>

            {/* Micro Highlights Pill Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-heading font-semibold text-slate-300"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-emerald-500/20 text-emerald-300">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>AI Case Simulator</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-300">
                <Landmark className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>FBR IRIS Demos</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-300">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>24/7 Mobile App</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: AI Academy Impact Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl bg-slate-900/90 border border-emerald-500/30 p-6 shadow-2xl backdrop-blur-xl space-y-4">
              
              {/* Card Top Pill */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400 animate-spin-slow" />
                  <span className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-emerald-400">
                    AI TUTOR ACTIVE ⚡
                  </span>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-heading font-bold">
                  v2.4 Engine
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-base font-heading font-extrabold text-white">4.95 / 5.0</span>
                  </div>
                  <p className="text-[11px] text-slate-400">342+ Verified Reviews</p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1 text-emerald-400">
                    <Users className="w-4 h-4" />
                    <span className="text-base font-heading font-extrabold text-white">1,240+</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Enrolled Professionals</p>
                </div>
              </div>

              {/* Lead Faculty Info */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/70 to-slate-950 border border-emerald-800/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 border-emerald-400">
                    <Image
                      src="/about/founder-portrait.jpeg"
                      alt="Raja Gulfam Kayani"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-bold text-white">Raja Gulfam Kayani</h4>
                    <p className="text-[10px] text-emerald-300 font-medium">
                      Advocate High Court &amp; ACMA
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-slate-900 text-cyan-300 text-[10px] font-heading font-bold border border-cyan-500/30">
                  Lead Faculty
                </span>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Featured Available Course Showcase Banner (Low Text & High Visual Impact) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative rounded-3xl bg-white text-heading border-2 border-emerald-500/40 p-6 sm:p-8 shadow-2xl overflow-hidden group"
        >
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Image Column (50% desktop width) */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-card border border-slate-200 bg-slate-900">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Dominant "AVAILABLE NOW" Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-heading font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-2 border border-emerald-400/40">
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                    AVAILABLE NOW
                  </span>
                </div>

                {/* Flagship Badge */}
                {course.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-heading font-extrabold shadow-md">
                      {course.badge}
                    </span>
                  </div>
                )}

                {/* Bottom Overlay Stats */}
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{course.studentsCount.toLocaleString()}+ Students</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column (Pill-focused, Low Text) */}
            <div className="lg:col-span-6 space-y-5">
              
              {/* Category Tag & Rating */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-heading font-bold uppercase tracking-wider border border-emerald-200">
                  {course.category}
                </span>

                <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 px-3 py-1 rounded-full text-xs font-heading font-bold border border-amber-200">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{course.rating.toFixed(1)}</span>
                  <span className="text-amber-700 font-normal">({course.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-heading leading-tight">
                {course.title}
              </h2>

              {/* Compact Visual Feature Pills (Replacing Long Paragraphs) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs font-heading font-semibold text-heading">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>FBR IRIS Portal E-Filing Demos</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs font-heading font-semibold text-heading">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sales Tax Returns &amp; Annexure C</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs font-heading font-semibold text-heading">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Wealth Statement (Sec 116) Reconciliation</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs font-heading font-semibold text-heading">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>FBR Notice Appeals Defense</span>
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-heading font-extrabold text-heading">
                      PKR {course.price?.toLocaleString()}
                    </span>
                    {course.originalPrice && (
                      <span className="text-sm font-heading line-through text-slate-400">
                        PKR {course.originalPrice.toLocaleString()}
                      </span>
                    )}
                    {course.discountPercent && (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-heading font-bold">
                        SAVE {course.discountPercent}%
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-heading text-emerald-700 font-bold block">
                    Instant 24/7 Access on Premier LMS Student Mobile App
                  </span>
                </div>

                <Link
                  href={`/courses/${course.slug}`}
                  className="btn-primary text-sm !py-3.5 !px-8 text-center shrink-0 group focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Enroll Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
