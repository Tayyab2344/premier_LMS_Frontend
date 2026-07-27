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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative rounded-3xl bg-white border border-border hover:border-primary/40 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden h-full"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className={`object-cover transition-transform duration-700 ${
            isAvailable ? 'group-hover:scale-105' : 'blur-[1px] opacity-90'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-heading text-[11px] font-heading font-bold shadow-soft">
            {course.category}
          </span>

          {/* Status Ribbon */}
          {isAvailable ? (
            <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-heading font-bold shadow-soft flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              Available Now
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-[11px] font-heading font-bold shadow-soft flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Coming Soon
            </span>
          )}
        </div>

        {/* Bottom Image Stats Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-heading font-semibold z-10">
          <span className="px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 text-[11px]">
            {course.level}
          </span>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-blue-300" />
            <span>{course.duration.split(' ')[0]} {course.duration.split(' ')[1]}</span>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          
          {/* Rating & Students Row */}
          <div className="flex items-center justify-between text-xs text-body">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="text-heading font-heading">{course.rating.toFixed(1)}</span>
              {course.reviewCount > 0 && (
                <span className="text-body font-normal">({course.reviewCount})</span>
              )}
            </div>

            {isAvailable && (
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-primary" />
                <span className="font-heading font-medium">{course.studentsCount} Students</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-heading font-bold text-heading group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            <Link href={`/courses/${course.slug}`}>
              {course.title}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs text-body leading-relaxed line-clamp-2">
            {course.shortDescription}
          </p>

          {/* Key Skills Included Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {course.skillsIncluded.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-surface-secondary border border-border text-[10px] font-medium text-body"
              >
                {skill}
              </span>
            ))}
            {course.skillsIncluded.length > 3 && (
              <span className="px-2 py-0.5 rounded-md bg-surface-secondary text-[10px] font-medium text-body/60">
                +{course.skillsIncluded.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Instructor & Action Footer */}
        <div className="pt-4 border-t border-border/60 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border bg-slate-200">
                <Image
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <div>
                <p className="text-xs font-heading font-bold text-heading leading-none">
                  {course.instructor.name}
                </p>
                <p className="text-[10px] text-body/70 mt-0.5">Lead Instructor</p>
              </div>
            </div>

            {/* Price Tag */}
            {isAvailable ? (
              <div className="text-right">
                {course.price ? (
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-mono font-extrabold text-primary">PKR {course.price.toLocaleString()}</span>
                    {course.originalPrice > course.price && (
                      <span className="text-xs font-mono text-body/50 line-through">PKR {course.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                ) : (
                  <span className="text-sm font-heading font-bold text-emerald-600">Free Access</span>
                )}
              </div>
            ) : (
              <span className="text-xs font-mono font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                Upcoming
              </span>
            )}
          </div>

          {/* Action Button */}
          {isAvailable ? (
            <Link
              href={`/courses/${course.slug}`}
              className="w-full btn-primary !py-3 !text-xs text-center justify-center font-heading font-bold shadow-md group-hover:shadow-blue-glow transition-all"
            >
              Enroll Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <button
              onClick={() => onNotifyClick(course)}
              className="w-full btn-secondary !py-3 !text-xs text-center justify-center font-heading font-bold hover:!bg-amber-50 hover:!border-amber-400 hover:!text-amber-700 transition-all flex items-center gap-1.5"
            >
              <Bell className="w-3.5 h-3.5 text-amber-500" />
              Notify Me at Launch
            </button>
          )}
        </div>

      </div>
    </motion.div>
  );
}
