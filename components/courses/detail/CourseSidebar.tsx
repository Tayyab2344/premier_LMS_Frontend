'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  FolderGit2,
  Download,
  Users,
  MessageSquare,
  Lock,
  Bell,
  ArrowRight,
  Share2,
  Smartphone,
  Video
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/lib/coursesData';

interface CourseSidebarProps {
  course: Course;
  onNotifyClick: () => void;
}

export function CourseSidebar({ course, onNotifyClick }: CourseSidebarProps) {
  const [copied, setCopied] = useState(false);
  const isAvailable = course.status === 'Available';

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const includesList = [
    { icon: Smartphone, text: 'Premier LMS Student Mobile App (iOS & Android)' },
    { icon: ShieldCheck, text: 'Access Active During Course + 2 Months After' },
    { icon: Award, text: 'Accredited Digital Diploma Certificate' },
    { icon: FolderGit2, text: `${course.projects.length || 3} Real Case Studies & FBR Portal Demos` },
    { icon: Video, text: 'Weekly Live & HD Recorded Masterclasses' },
    { icon: Download, text: 'Downloadable Legal & Tax Formats (Excel/Word)' },
    { icon: Users, text: 'Exclusive Tax Bar Student Community' },
    { icon: MessageSquare, text: 'Direct Mentorship from Raja Gulfam' },
  ];

  return (
    <div className="sticky top-[140px] space-y-6">
      
      {/* Main Sidebar Card */}
      <div className="rounded-3xl bg-white border border-border p-6 sm:p-7 shadow-card-hover space-y-6 overflow-hidden">
        
        {/* Preview Media Thumbnail */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border border-border shadow-soft group">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 360px"
          />
          {!isAvailable && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center text-white text-xs font-heading font-bold gap-1.5">
              <Lock className="w-4 h-4 text-amber-400" />
              Coming Soon
            </div>
          )}
        </div>

        {/* Pricing Header */}
        <div className="space-y-1">
          {isAvailable ? (
            <div>
              {course.price ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-mono font-extrabold text-heading">PKR {course.price.toLocaleString()}</span>
                  {course.originalPrice > course.price && (
                    <span className="text-base font-mono text-body/50 line-through">PKR {course.originalPrice.toLocaleString()}</span>
                  )}
                  {course.discountPercent && (
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-xs font-bold font-heading">
                      {course.discountPercent}% OFF
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-2xl font-heading font-bold text-emerald-600">Free Access</span>
              )}
              <p className="text-[11px] text-body mt-1">Includes Mobile App Access &amp; Certificates</p>
            </div>
          ) : (
            <div>
              <span className="text-sm font-heading font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block">
                Launching Soon
              </span>
              <p className="text-xs text-body mt-1.5">Register for early bird pricing &amp; Mobile App notification.</p>
            </div>
          )}
        </div>

        {/* Primary Action Button */}
        {isAvailable ? (
          <Link
            href="/admission"
            className="w-full btn-primary !py-4 !text-base text-center justify-center font-heading font-bold shadow-blue-glow group"
          >
            Enroll Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <button
            onClick={onNotifyClick}
            className="w-full btn-secondary !py-4 !text-sm text-center justify-center font-heading font-bold hover:!bg-amber-50 hover:!border-amber-400 hover:!text-amber-700 transition-all flex items-center gap-2"
          >
            <Bell className="w-4 h-4 text-amber-500" />
            Notify Me at Launch
          </button>
        )}

        {/* Mobile App Highlight Card */}
        <div className="p-3.5 rounded-2xl bg-surface-secondary border border-border/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-heading font-bold text-heading">Student Mobile App</p>
            <p className="text-[10px] text-body">Stream classes on Android &amp; iOS</p>
          </div>
        </div>

        {/* Share & Brochure Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href="#curriculum"
            className="py-2.5 px-3 rounded-xl border border-border bg-surface-secondary text-xs font-heading font-semibold text-heading hover:bg-slate-200 transition-all text-center flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Syllabus
          </a>

          <button
            onClick={handleShare}
            className="py-2.5 px-3 rounded-xl border border-border bg-surface-secondary text-xs font-heading font-semibold text-heading hover:bg-slate-200 transition-all text-center flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied ? 'Copied!' : 'Share'}
          </button>
        </div>

        {/* Course Includes Checklist */}
        <div className="pt-5 border-t border-border space-y-3">
          <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-heading">
            This Course Includes:
          </h4>

          <div className="space-y-2.5">
            {includesList.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3 text-xs text-body">
                  <IconComp className="w-4 h-4 text-primary shrink-0" />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
