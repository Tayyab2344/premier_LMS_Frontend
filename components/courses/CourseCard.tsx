'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Users,
  Star,
  Bell,
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/lib/coursesData';

interface CourseCardProps {
  course: Course;
  onNotifyClick: (course: Course) => void;
}

export function CourseCard({ course, onNotifyClick }: CourseCardProps) {
  const isAvailable = course.status === 'Available';
  const hasDiscount = typeof course.discountPercent === 'number' && course.discountPercent > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="group relative rounded-2xl bg-white border border-border hover:border-premier-green/40 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden h-full"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className={`object-cover transition-transform duration-700 ${
            isAvailable ? 'group-hover:scale-105' : 'opacity-85 group-hover:opacity-95'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent pointer-events-none" />



        {/* Bottom Right Duration Badge */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-heading font-semibold border border-white/10 flex items-center gap-1 shadow-xs">
            <Clock className="w-3 h-3 text-amber-400" />
            {course.duration}
          </span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Rating & Enrolled Row */}
          <div className="flex items-center justify-between text-xs border-b border-border pb-2.5">
            <div className="flex items-center gap-1 text-slate-800 font-heading font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{course.rating.toFixed(1)}</span>
              {course.reviewCount > 0 && (
                <span className="text-slate-400 font-normal">({course.reviewCount})</span>
              )}
            </div>

            {isAvailable && (
              <div className="flex items-center gap-1 text-slate-500 font-heading text-[11px] font-semibold">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>{course.studentsCount.toLocaleString()} Enrolled</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-heading font-bold text-heading group-hover:text-premier-green transition-colors leading-snug line-clamp-2">
            <Link href={`/courses/${course.slug}`}>
              {course.title}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs text-body leading-relaxed line-clamp-2">
            {course.shortDescription}
          </p>

          {/* Instructor Avatar Row */}
          <div className="flex items-center gap-2 pt-1">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-border shadow-xs shrink-0">
              <Image
                src={course.instructor.avatar}
                alt={course.instructor.name}
                fill
                className="object-cover"
                sizes="24px"
              />
            </div>
            <span className="text-xs font-heading font-semibold text-slate-700 truncate">
              {course.instructor.name}
            </span>
          </div>
        </div>

        {/* Footer Row */}
        <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
          {/* Price Tag */}
          <div>
            {isAvailable ? (
              course.price ? (
                <div className="flex flex-col">
                  {hasDiscount && (
                    <span className="text-[10px] font-mono text-slate-400 line-through leading-none">
                      PKR {course.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-base font-number font-extrabold text-heading leading-tight">
                    PKR {course.price.toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className="text-xs font-heading font-bold text-emerald-700">Free Access</span>
              )
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-heading font-bold border border-slate-200 uppercase tracking-wider">
                Upcoming
              </span>
            )}
          </div>

          {/* Modern Action Button */}
          {isAvailable ? (
            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex items-center gap-1.5 rounded-xl py-2 px-4 text-xs font-heading font-bold transition-all duration-300 shrink-0 bg-premier-green text-white hover:bg-premier-green-800 shadow-soft group/btn focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2"
            >
              Enroll Now
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <button
              onClick={() => onNotifyClick(course)}
              className="inline-flex items-center gap-1.5 rounded-xl py-2 px-3.5 text-xs font-heading font-bold transition-all duration-300 shrink-0 bg-slate-900 text-amber-300 hover:bg-premier-green hover:text-white shadow-soft group/btn focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2"
            >
              <Bell className="w-3.5 h-3.5 group-hover/btn:animate-bounce" />
              <span>Notify</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
