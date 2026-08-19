'use client';

import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function CourseCTA() {
  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="section-container">
        
        {/* Banner Container — Modern Sleek Design */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#1B3B2C] via-[#163326] to-[#0D2118] p-8 sm:p-12 md:p-14 text-white shadow-2xl overflow-hidden border border-emerald-900/40">
          
          {/* Subtle Decorative Background Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-premier-gold/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Grid Content */}
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9A544]/20 text-[#D9A544] text-xs font-mono font-bold uppercase tracking-wider border border-[#D9A544]/30 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-[#D9A544]" />
                Accredited Legal &amp; Tax Academy
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold leading-tight text-white">
                Ready to Master Taxation &amp; Law?
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed font-body">
                Join thousands of students learning practical, high-value skills directly from High Court Advocate &amp; ACMA Raja Gulfam.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-end">
              <Link
                href="/admission"
                className="inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-7 bg-[#D9A544] text-[#1B3B2C] font-heading font-extrabold text-sm uppercase tracking-wide shadow-md hover:bg-[#c49235] hover:shadow-lg transition-all duration-300 active:scale-95"
              >
                Enroll Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-7 bg-white/10 backdrop-blur-md text-white border border-white/20 font-heading font-bold text-sm uppercase tracking-wide hover:bg-white/20 hover:border-white/40 transition-all duration-300 active:scale-95"
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
