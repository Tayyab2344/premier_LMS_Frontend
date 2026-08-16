'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Users,
  Star,
  Bell,
  ArrowRight,
  Lock
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
      className="group relative rounded-2xl bg-[#FAF6EE] border-2 border-[#1B3B2C] shadow-[4px_4px_0px_#1B3B2C] hover:shadow-[7px_7px_0px_#1B3B2C] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden h-full"
    >
      {/* Top Image Container */}
      <div className="relative h-48 w-full overflow-hidden border-b-2 border-[#1B3B2C] bg-[#1B3B2C]/10">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className={`object-cover transition-transform duration-500 ${
            isAvailable ? 'group-hover:scale-105' : 'grayscale opacity-85'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Vintage Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3B2C]/70 via-transparent to-transparent pointer-events-none" />

        {/* Status Seal Badge — Top Left */}
        <div className="absolute top-3 left-3 z-10">
          {isAvailable ? (
            <span className="px-2.5 py-1 rounded-md bg-[#D9A544] text-[#1B3B2C] text-[10px] font-mono font-extrabold tracking-wider uppercase border border-[#1B3B2C] shadow-[1.5px_1.5px_0px_#1B3B2C] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1B3B2C] animate-pulse" />
              Available Now
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-md bg-[#1B3B2C] text-[#FAF6EE] text-[10px] font-mono font-bold tracking-wider uppercase border border-[#1B3B2C] shadow-[1.5px_1.5px_0px_#D9A544] flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#D9A544]" />
              Coming Soon
            </span>
          )}
        </div>

        {/* Duration Badge — Bottom Right */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-md bg-[#FAF6EE]/95 backdrop-blur-sm text-[#1B3B2C] text-[10px] font-mono font-bold tracking-wider border border-[#1B3B2C] shadow-[1.5px_1.5px_0px_#1B3B2C] flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#D9A544]" />
            {course.duration}
          </span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          
          {/* Rating & Enrolled Row */}
          <div className="flex items-center justify-between text-xs border-b border-[#E6DFD0] pb-2">
            <div className="flex items-center gap-1 text-[#1B3B2C] font-mono font-bold">
              <Star className="w-3.5 h-3.5 fill-[#D9A544] text-[#1B3B2C]" />
              <span className="text-[#1B3B2C] font-extrabold">{course.rating.toFixed(1)}</span>
              {course.reviewCount > 0 && (
                <span className="text-[#8A7D66] font-normal">({course.reviewCount})</span>
              )}
            </div>

            {isAvailable && (
              <div className="flex items-center gap-1 text-[#1B3B2C] font-mono text-[11px] font-bold">
                <Users className="w-3.5 h-3.5 text-[#8A6A1F]" />
                <span>{course.studentsCount.toLocaleString()} Enrolled</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-heading font-extrabold text-[#1B3B2C] group-hover:text-[#8A6A1F] transition-colors leading-snug line-clamp-2">
            <Link href={`/courses/${course.slug}`}>
              {course.title}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs font-body text-[#4A5E54] leading-relaxed line-clamp-2">
            {course.shortDescription}
          </p>

          {/* Instructor Signature Row */}
          <div className="flex items-center gap-2 pt-1">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#1B3B2C] bg-white shrink-0">
              <Image
                src={course.instructor.avatar}
                alt={course.instructor.name}
                fill
                className="object-cover"
                sizes="24px"
              />
            </div>
            <span className="text-xs font-heading font-bold text-[#1B3B2C] truncate">
              {course.instructor.name}
            </span>
          </div>

        </div>

        {/* Footer: Retro Price Tag & Hard Shadow Action Button */}
        <div className="pt-3 border-t-2 border-[#1B3B2C] flex items-center justify-between gap-3">
          {/* Price Tag */}
          <div>
            {isAvailable ? (
              course.price ? (
                <div className="flex flex-col">
                  {hasDiscount && (
                    <span className="text-[10px] font-mono text-[#8A7D66] line-through leading-none">
                      PKR {course.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-base font-number font-extrabold text-[#1B3B2C] leading-tight">
                    PKR {course.price.toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className="text-xs font-mono font-bold text-emerald-800 uppercase">Free Access</span>
              )
            ) : (
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E6DFD0] text-[#1B3B2C] border border-[#1B3B2C]">
                Upcoming
              </span>
            )}
          </div>

          {/* Retro Hard-Shadow Action Button */}
          {isAvailable ? (
            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg py-2 px-4 text-xs font-heading font-extrabold uppercase tracking-wide transition-all shrink-0 bg-[#D9A544] text-[#1B3B2C] border border-[#1B3B2C] shadow-[2.5px_2.5px_0px_#1B3B2C] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#1B3B2C]"
            >
              Enroll Now
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <button
              onClick={() => onNotifyClick(course)}
              className="inline-flex items-center gap-1.5 rounded-lg py-2 px-3.5 text-xs font-heading font-extrabold uppercase tracking-wide transition-all shrink-0 bg-[#1B3B2C] text-[#FAF6EE] border border-[#1B3B2C] shadow-[2.5px_2.5px_0px_#D9A544] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#D9A544]"
            >
              <Bell className="w-3.5 h-3.5 text-[#D9A544]" />
              Notify
            </button>
          )}
        </div>

      </div>
    </motion.div>
  );
}
