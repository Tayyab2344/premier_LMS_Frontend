'use client';

import React, { useState } from 'react';
import {
  Star,
  Clock,
  Users,
  Globe,
  Share2,
  Heart,
  Lock,
  Smartphone
} from 'lucide-react';
import Image from 'next/image';
import { Course } from '@/lib/coursesData';
import Breadcrumb from '@/components/ui/Breadcrumb';

interface CourseDetailHeroProps {
  course: Course;
  onNotifyClick?: () => void;
}

export function CourseDetailHero({ course }: CourseDetailHeroProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copied, setCopied] = useState(false);
  const isAvailable = course.status === 'Available';

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="bg-white text-heading pt-[90px] pb-8 border-b border-border">
      <div className="section-container">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Courses', href: '/courses' },
            { label: course.title },
          ]}
        />

        <div className="mt-6 space-y-5 max-w-4xl">
          
          {/* Badges & Status */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3.5 py-1 rounded-full bg-primary-50 text-primary text-xs font-heading font-bold uppercase tracking-wider border border-primary-100">
              {course.category}
            </span>
            <span className="px-3.5 py-1 rounded-full bg-surface-secondary text-body text-xs font-heading font-bold uppercase tracking-wider border border-border">
              {course.level}
            </span>

            {isAvailable ? (
              <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-heading font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Available Now
              </span>
            ) : (
              <span className="px-3.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-heading font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                Coming Soon
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-heading leading-tight tracking-tight">
            {course.title}
          </h1>

          {/* Short Description */}
          <p className="text-base sm:text-lg text-body leading-relaxed">
            {course.shortDescription}
          </p>

          {/* Key Stats Bar */}
          <div className="flex flex-wrap items-center gap-6 pt-3 text-sm text-body border-t border-border/70">
            
            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <span className="font-heading font-bold text-heading">{course.rating.toFixed(1)}</span>
              {course.reviewCount > 0 && (
                <span className="text-body/70 text-xs">({course.reviewCount} reviews)</span>
              )}
            </div>

            {/* Students */}
            {isAvailable && (
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-heading font-semibold text-heading">{course.studentsCount} Students</span>
              </div>
            )}

            {/* Duration */}
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>{course.duration}</span>
            </div>

            {/* Language */}
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-purple-600" />
              <span>{course.language}</span>
            </div>

            {/* Student App */}
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-primary" />
              <span className="font-heading font-semibold text-primary">Student Mobile App Access</span>
            </div>
          </div>

          {/* Instructor & Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border shadow-sm bg-slate-200 shrink-0">
                <Image
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  fill
                  className="object-cover object-top"
                  sizes="44px"
                />
              </div>
              <div>
                <p className="text-xs text-body">Instructed by</p>
                <p className="text-sm font-heading font-bold text-heading leading-none mt-0.5">
                  {course.instructor.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-3.5 py-2 rounded-xl bg-surface-secondary hover:bg-slate-200 border border-border text-xs font-heading font-semibold text-heading transition-all flex items-center gap-1.5"
                title="Share Course"
              >
                <Share2 className="w-3.5 h-3.5 text-body" />
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-9 h-9 rounded-xl border border-border flex items-center justify-center transition-all ${
                  isWishlisted ? 'bg-rose-500 text-white border-rose-500' : 'bg-surface-secondary hover:bg-slate-200 text-body'
                }`}
                title="Add to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
