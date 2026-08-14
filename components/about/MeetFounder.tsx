'use client';

import React from 'react';
import {
  Users,
  BookOpen,
  Clock,
  Award,
  Star,
  ShieldCheck
} from 'lucide-react';
import Image from 'next/image';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const founderStats = [
  { icon: Users, label: 'Students Mentored', end: 5000, suffix: '+', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: BookOpen, label: 'Courses Created', end: 10, suffix: '+', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Clock, label: 'Hours of Teaching', end: 1500, suffix: '+', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { icon: Award, label: 'Completion Rate', end: 98, suffix: '%', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: Star, label: 'Positive Reviews', end: 4.9, decimals: 1, suffix: ' / 5', color: 'text-rose-600', bg: 'bg-rose-50' },
];

export function MeetFounder() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="meet-founder" className="py-8 lg:py-12 bg-gradient-to-b from-[#0F3524] via-[#164E36] to-[#0A261A] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="section-container relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white">
            Meet the Founder
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl mx-auto">
            Direct guidance from a practicing High Court Advocate, Chartered Management Accountant, and corporate legal advisor.
          </p>
        </div>

        {/* Compact Founder Card Container */}
        <div className="rounded-2xl sm:rounded-3xl bg-white/95 text-slate-900 border border-white/40 p-5 sm:p-7 lg:p-8 shadow-2xl grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[240px] aspect-[3/4] rounded-2xl overflow-hidden shadow-md border-2 border-white bg-slate-100 group">
              <Image
                src="/about/founder-portrait.jpeg"
                alt="Raja Gulfam — Founder & Lead Instructor"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 240px, 280px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md rounded-lg p-2 text-center border border-white/40 shadow-sm">
                <p className="text-xs font-heading font-bold text-slate-900">Raja Gulfam Kayani</p>
                <p className="text-[10px] font-semibold text-premier-green">Advocate High Court · ACMA</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 mt-4">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:text-white hover:bg-premier-green flex items-center justify-center transition-all shadow-soft"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:text-white hover:bg-blue-600 flex items-center justify-center transition-all shadow-soft"
                aria-label="Facebook Page"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:text-white hover:bg-pink-600 flex items-center justify-center transition-all shadow-soft"
                aria-label="Instagram Profile"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:text-white hover:bg-red-600 flex items-center justify-center transition-all shadow-soft"
                aria-label="YouTube Channel"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Bio & Credentials */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-premier-green" />
                <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-premier-green">Masterclass Faculty</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
                Raja Gulfam Kayani
              </h3>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                Founder, Lead Instructor &amp; Principal Consultant (Raja Gulfam &amp; Co.)
              </p>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-body">
              <p>
                Raja Gulfam is a renowned educator, High Court Advocate, and Associate Chartered Management Accountant (ACMA) dedicated to transforming traditional professional education. Having managed complex corporate tax filings, financial fraud investigations, and legal compliance cases, he brings immense practical experience straight to the classroom.
              </p>
              <p>
                His commitment goes beyond delivering lectures—he personally mentors students, guides real-world tax &amp; corporate case studies, and ensures every learner develops high-income skills in corporate law, income tax filing, sales tax audit, and forensic accounting.
              </p>
            </div>

            {/* Achievement Stats Grid */}
            <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200">
              {founderStats.map((stat, idx) => {
                const IconComp = stat.icon;
                return (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <div className={`w-6 h-6 rounded-md ${stat.bg} ${stat.color} flex items-center justify-center`}>
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-heading font-semibold text-slate-600 truncate">{stat.label}</span>
                    </div>
                    <div className="text-lg sm:text-xl font-mono font-extrabold text-slate-900">
                      {inView ? (
                        <CountUp
                          start={0}
                          end={stat.end}
                          duration={2.5}
                          decimals={stat.decimals || 0}
                          suffix={stat.suffix}
                        />
                      ) : (
                        `0${stat.suffix}`
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
