'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bell, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Course } from '@/lib/coursesData';

interface UpcomingCourseCardProps {
  course: Course;
  onNotifyClick: (course: Course) => void;
}

export function UpcomingCourseCard({ course, onNotifyClick }: UpcomingCourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative rounded-2xl bg-white border border-border hover:border-premier-green/40 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden h-full"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-95"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent pointer-events-none" />


      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-base font-heading font-bold text-heading group-hover:text-premier-green transition-colors line-clamp-2 leading-snug">
            {course.title}
          </h3>

          <p className="text-xs text-body leading-relaxed line-clamp-3">
            {course.shortDescription}
          </p>
        </div>

        {/* Bottom Notify Action */}
        <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
          <span className="text-[11px] font-heading font-semibold text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Launching Soon
          </span>

          <button
            onClick={() => onNotifyClick(course)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-amber-300 hover:bg-premier-green hover:text-slate-950 text-xs font-heading font-bold transition-all duration-300 shadow-soft group/btn focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2"
          >
            <Bell className="w-3.5 h-3.5 group-hover/btn:animate-bounce" />
            <span>Notify Me</span>
            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
