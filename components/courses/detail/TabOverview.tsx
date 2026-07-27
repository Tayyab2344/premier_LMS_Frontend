'use client';

import React from 'react';
import {
  CheckCircle2,
  Target,
  Briefcase,
  Award,
  Clock,
  Globe,
  Video,
  Sparkles
} from 'lucide-react';
import { Course } from '@/lib/coursesData';

export function TabOverview({ course }: { course: Course }) {
  return (
    <div id="overview" className="space-y-10">
      
      {/* Full Description */}
      <div className="space-y-4">
        <h3 className="text-xl font-heading font-bold text-heading">Course Overview</h3>
        <p className="text-sm sm:text-base text-body leading-relaxed">
          {course.fullDescription}
        </p>
      </div>

      {/* Quick Summary Grid */}
      <div className="grid sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-surface-secondary border border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-body">Estimated Time</p>
            <p className="text-sm font-heading font-bold text-heading">{course.duration}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-body">Language &amp; Subtitles</p>
            <p className="text-sm font-heading font-bold text-heading">{course.language}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-body">Delivery Format</p>
            <p className="text-sm font-heading font-bold text-heading">{course.format}</p>
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-heading font-bold text-heading">What You Will Learn</h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {course.learningObjectives.map((obj, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-border/80 shadow-soft">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-sm font-heading font-semibold text-heading leading-snug">{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Who This Course Is For */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h3 className="text-xl font-heading font-bold text-heading">Who This Course Is For</h3>
        </div>

        <div className="space-y-3">
          {course.whoIsThisFor.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-secondary border border-border/60">
              <div className="w-6 h-6 rounded-full bg-primary-50 text-primary flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                0{idx + 1}
              </div>
              <p className="text-sm text-body leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Career Opportunities */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-heading font-bold text-heading">Career Opportunities</h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {course.careerOpportunities.map((career, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white border border-border flex items-center gap-3 shadow-soft">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-xs font-heading font-bold text-heading">{career}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Included Tags */}
      <div className="space-y-4">
        <h3 className="text-xl font-heading font-bold text-heading">Key Skills Included</h3>
        <div className="flex flex-wrap gap-2">
          {course.skillsIncluded.map((skill, idx) => (
            <span key={idx} className="px-3.5 py-1.5 rounded-lg bg-primary-50 text-primary border border-primary-100 text-xs font-heading font-bold">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Certificate Information Card */}
      <div className="rounded-3xl bg-gradient-to-r from-primary-900 to-primary p-6 sm:p-8 text-white shadow-elevated flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-heading font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            Accredited Certification
          </div>
          <h4 className="text-xl font-heading font-bold text-white">
            {course.certificateInfo.title}
          </h4>
          <p className="text-xs text-white/80 max-w-lg leading-relaxed">
            {course.certificateInfo.accreditation}. Share your verifiable credential directly on LinkedIn, digital resumes, and client proposals.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-amber-300 shrink-0">
          Public Verifiable URL
        </div>
      </div>

    </div>
  );
}
