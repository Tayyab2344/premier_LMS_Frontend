'use client';

import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function CourseCTA() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="section-container">
        
        {/* Banner Container */}
        <div className="relative rounded-3xl bg-gradient-to-br from-primary-900 via-primary to-blue-600 p-8 sm:p-14 md:p-16 text-white shadow-card-hover overflow-hidden">
          
          {/* Ambient Blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

          {/* Grid Content */}
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-heading font-bold uppercase tracking-wider border border-white/20">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                Accredited Professional Academy
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold leading-tight text-white">
                Ready to Build Your Future?
              </h2>

              <p className="text-white/85 text-base sm:text-lg max-w-2xl leading-relaxed">
                Join our academy and start learning practical, industry-ready skills today. Master full-stack web development, corporate taxation, and financial engineering with Raja Gulfam.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-end">
              <Link
                href="/admission"
                className="btn-primary !bg-white !text-primary hover:!bg-surface-hover shadow-lg text-center justify-center !py-4 !px-8 text-base group"
              >
                Enroll Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/courses"
                className="btn-secondary !bg-white/10 !text-white !border-white/40 hover:!bg-white/20 text-center justify-center !py-4 !px-8 text-base"
              >
                Explore More Courses
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
