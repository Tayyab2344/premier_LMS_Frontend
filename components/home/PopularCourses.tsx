'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ChevronRight, Award, Star, Clock, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { COURSES_DATA } from '@/lib/coursesData';

// ─── Data — dynamic, scales as more courses go Available ──────────────────────
const availableCourses = COURSES_DATA.filter((c) => c.status === 'Available');

export function PopularCourses() {
  return (
    <section
      className="relative section-padding bg-premier-cream border-t border-border overflow-hidden"
      id="courses"
    >
      {/* Background radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[100px] opacity-20 pointer-events-none bg-premier-green/20"
      />

      <div className="section-container relative z-10 max-w-5xl mx-auto space-y-7">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2
              className="text-2xl sm:text-3xl font-heading font-extrabold text-heading leading-tight tracking-tight"
            >
              Courses That Are Currently Happening
            </h2>
            <p className="mt-1 text-xs sm:text-sm font-body text-slate-600">
              Live ongoing masterclasses &amp; accredited training sessions open for immediate enrollment
            </p>
          </div>

          <Link
            href="/courses"
            className="cta-blink shrink-0 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-heading font-bold bg-premier-green text-white hover:bg-premier-green-800 transition-colors whitespace-nowrap shadow-soft"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            Explore All Courses
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Ongoing Featured Course Showcase Cards */}
        <div className="space-y-5">
          {availableCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl bg-white text-heading border border-slate-200 p-4 sm:p-6 shadow-lg overflow-hidden group"
            >
              <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-center">
                
                {/* Image Column (5 cols out of 12) */}
                <div className="lg:col-span-5 relative">
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/11] w-full rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-900">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Dominant "AVAILABLE NOW" Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-heading font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1.5 border border-emerald-400/40">
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        AVAILABLE NOW
                      </span>
                    </div>

                    {/* Flagship Badge */}
                    {course.badge && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[11px] font-heading font-extrabold shadow-sm">
                          {course.badge}
                        </span>
                      </div>
                    )}

                    {/* Bottom Overlay Stats */}
                    <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-medium flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                        <Users className="w-3 h-3 text-emerald-400" />
                        <span>{course.studentsCount.toLocaleString()}+ Students</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Column (7 cols out of 12) */}
                <div className="lg:col-span-7 space-y-3.5">
                  
                  {/* Category Tag & Rating */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-heading font-bold uppercase tracking-wider border border-emerald-200">
                      {course.category}
                    </span>

                    <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-full text-[11px] font-heading font-bold border border-amber-200">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{course.rating.toFixed(1)}</span>
                      <span className="text-amber-700 font-normal">({course.reviewCount} reviews)</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-heading leading-tight">
                    {course.title}
                  </h3>

                  {/* Compact Visual Feature Pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-1.5 text-[11px] font-heading font-semibold text-heading">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>FBR IRIS Portal E-Filing Demos</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-1.5 text-[11px] font-heading font-semibold text-heading">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Sales Tax Returns &amp; Annexure C</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-1.5 text-[11px] font-heading font-semibold text-heading">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Wealth Statement (Sec 116) Reconciliation</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-1.5 text-[11px] font-heading font-semibold text-heading">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>FBR Notice Appeals Defense</span>
                    </div>
                  </div>

                  {/* Price & Action Button */}
                  <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl sm:text-2xl font-heading font-extrabold text-heading">
                          PKR {course.price?.toLocaleString()}
                        </span>
                        {course.originalPrice && (
                          <span className="text-xs font-heading line-through text-slate-400">
                            PKR {course.originalPrice.toLocaleString()}
                          </span>
                        )}
                        {course.discountPercent && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-heading font-bold">
                            SAVE {course.discountPercent}%
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-heading text-emerald-700 font-bold block">
                        Instant 24/7 Access on Premier LMS Student Mobile App
                      </span>
                    </div>

                    <Link
                      href={`/courses/${course.slug}`}
                      className="btn-primary text-xs !py-2.5 !px-6 text-center shrink-0 group focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                      Enroll Now
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>

              </div>
            </motion.div>
          ))}
        </div>

      {/* Already Have Prior Experience Banner — Restored Original Dark Animated Design */}
      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0.65, 1, 0.65], scale: [0.98, 1.015, 0.98] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="rounded-3xl p-6 sm:p-8 border relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        style={{
          background: 'linear-gradient(to right, #020617, #0f172a, #f1f5f9)',
          borderColor: '#f59e0b',
          boxShadow: '0 8px 25px rgba(245,158,11,0.2)',
        }}
      >
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Already Have Prior Experience?{' '}
            <span className="text-amber-400">Get Certified Directly</span>
          </h3>
          <p className="text-sm font-body text-slate-300 max-w-xl">
            Skip redundant classes if you have previously studied or worked in Taxation, Law, Accounting, or Audit. Apply for direct evaluation and get certified.
          </p>
        </div>
        <Link
          href="/admission?pathway=exam"
          className="cert-btn shrink-0 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-body font-bold"
        >
          <Award className="w-4 h-4" />
          Apply for Direct Certification
        </Link>
      </motion.div>

    </div>
  </section>
);
}
