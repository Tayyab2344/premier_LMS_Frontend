'use client';

import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function CourseCTA() {
  return (
    <section className="section-padding bg-[#FAF6EE] relative overflow-hidden">
      <div className="section-container">
        
        {/* Banner Container — Retro Modern Style */}
        <div className="relative rounded-3xl bg-[#1B3B2C] border-2 border-[#1B3B2C] shadow-[6px_6px_0px_#D9A544] p-8 sm:p-12 md:p-14 text-[#FAF6EE] overflow-hidden">
          
          {/* Grid Content */}
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#D9A544] text-[#1B3B2C] text-xs font-mono font-bold uppercase tracking-wider border border-[#1B3B2C] shadow-[2px_2px_0px_#FAF6EE]">
                <ShieldCheck className="w-4 h-4 text-[#1B3B2C]" />
                Accredited Legal &amp; Tax Academy
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold leading-tight text-[#FAF6EE]">
                Ready to Master Taxation &amp; Law?
              </h2>

              <p className="text-[#E6DFD0] text-sm sm:text-base max-w-2xl leading-relaxed font-body">
                Join thousands of students learning practical, high-value skills directly from High Court Advocate &amp; ACMA Raja Gulfam.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-end">
              <Link
                href="/admission"
                className="inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-7 bg-[#D9A544] text-[#1B3B2C] border border-[#1B3B2C] shadow-[3px_3px_0px_#FAF6EE] font-heading font-extrabold text-sm uppercase tracking-wide transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4.5px_4.5px_0px_#FAF6EE] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#FAF6EE]"
              >
                Enroll Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-7 bg-transparent text-[#FAF6EE] border-2 border-[#FAF6EE] shadow-[3px_3px_0px_#D9A544] font-heading font-extrabold text-sm uppercase tracking-wide transition-all hover:bg-white/10"
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
