'use client';

import React from 'react';
import {
  Award,
  BookOpen,
  Users,
  Star,
  CheckCircle2,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import Image from 'next/image';
import { Course } from '@/lib/coursesData';

export function TabInstructor({ course }: { course: Course }) {
  const inst = course.instructor;

  return (
    <div id="instructor" className="space-y-8">
      
      {/* Profile Header Box */}
      <div className="rounded-3xl bg-surface-secondary border border-border p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        
        {/* Photo */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-white shadow-elevated bg-slate-200 shrink-0">
          <Image
            src={inst.avatar}
            alt={inst.name}
            fill
            className="object-cover object-top"
            sizes="128px"
          />
        </div>

        {/* Info */}
        <div className="space-y-3 text-center sm:text-left flex-1">
          <div>
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary-50 border border-primary-100 inline-block mb-1">
              Lead Instructor
            </span>
            <h3 className="text-2xl font-heading font-extrabold text-heading">
              {inst.name}
            </h3>
            <p className="text-sm font-semibold text-body mt-0.5">{inst.title}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-heading font-semibold text-body">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>4.9 Instructor Rating</span>
            </div>
            <div className="flex items-center gap-1 text-blue-600">
              <Users className="w-4 h-4" />
              <span>5,000+ Alumni</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-600">
              <BookOpen className="w-4 h-4" />
              <span>10+ Masterclasses</span>
            </div>
          </div>
        </div>

      </div>

      {/* Biography */}
      <div className="space-y-3">
        <h4 className="text-lg font-heading font-bold text-heading">Biography</h4>
        <p className="text-sm text-body leading-relaxed">
          {inst.bio}
        </p>
      </div>

      {/* Teaching Philosophy */}
      <div className="p-6 rounded-2xl bg-white border border-border shadow-soft space-y-2">
        <h4 className="text-base font-heading font-bold text-heading flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" /> Teaching Philosophy
        </h4>
        <p className="text-sm text-body italic leading-relaxed">
          "{inst.teachingPhilosophy}"
        </p>
      </div>

      {/* Core Expertise Tags */}
      <div className="space-y-3">
        <h4 className="text-base font-heading font-bold text-heading">Technical Expertise</h4>
        <div className="flex flex-wrap gap-2">
          {inst.expertise.map((exp, idx) => (
            <span key={idx} className="px-3 py-1 rounded-lg bg-surface-secondary border border-border text-xs font-heading font-bold text-heading">
              {exp}
            </span>
          ))}
        </div>
      </div>

      {/* Education & Credentials */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-border shadow-soft space-y-3">
          <h4 className="text-sm font-heading font-bold text-heading flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" /> Education
          </h4>
          <ul className="space-y-2 text-xs text-body">
            {inst.education.map((edu, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{edu}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-border shadow-soft space-y-3">
          <h4 className="text-sm font-heading font-bold text-heading flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" /> Certifications &amp; Credentials
          </h4>
          <ul className="space-y-2 text-xs text-body">
            {inst.certifications.map((cert, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}
