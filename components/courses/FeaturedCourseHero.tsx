'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Clock,
  Users,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/lib/coursesData';

interface FeaturedCourseHeroProps {
  course: Course;
}

export function FeaturedCourseHero({ course }: FeaturedCourseHeroProps) {
  return (
    <section className="relative pt-[115px] pb-10 bg-[#FAF6EE] border-b border-[#E6DFD0] overflow-hidden">
      <div className="section-container relative z-10 max-w-5xl mx-auto space-y-7">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#1B3B2C] tracking-tight"
          >
            Courses
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base font-body text-[#8A7D66]"
          >
            Practical masterclasses in Taxation, Corporate Law, Accounting, Audit &amp; Finance
          </motion.p>
        </div>

        {/* Featured Available Course Showcase Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-2xl bg-white text-heading border border-slate-200 p-5 sm:p-6 shadow-lg overflow-hidden group"
        >
          <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-center">
            
            {/* Image Column */}
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

            {/* Content Column */}
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
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-heading leading-tight">
                {course.title}
              </h2>

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

      </div>
    </section>
  );
}
