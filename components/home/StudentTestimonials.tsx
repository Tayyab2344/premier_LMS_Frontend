'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle2, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Muhammad Tariq, ITP',
    role: 'Senior Tax Practitioner',
    city: 'Lahore',
    course: 'Income Tax & Sales Tax Practitioner',
    rating: 5,
    text: 'Raja Gulfam’s course was exceptionally thorough. The practical portal walk-throughs gave me exact answers for complex FBR client scenarios and corporate filing.',
    initials: 'MT',
    bg: 'bg-emerald-600',
  },
  {
    id: 2,
    name: 'Advocate Syed Hamza Shah',
    role: 'High Court Legal Advocate',
    city: 'Peshawar',
    course: 'Corporate Law & SECP Masterclass',
    rating: 5,
    text: 'The practical SECP company registration case studies and legal formats saved me dozens of hours. Easily the best professional legal development course in Pakistan.',
    initials: 'HS',
    bg: 'bg-blue-600',
  },
  {
    id: 3,
    name: 'Ayesha Siddiqui, ACMA',
    role: 'Senior Finance Manager',
    city: 'Islamabad',
    course: 'Financial Accounting & Bookkeeping',
    rating: 5,
    text: 'The wealth statement reconciliation and balance sheet modules were crystal clear. Raja Gulfam breaks down complicated financial statutes into simple, step-by-step guidance.',
    initials: 'AS',
    bg: 'bg-amber-600',
  },
  {
    id: 4,
    name: 'Usman Ali Khan',
    role: 'Financial Analyst',
    city: 'Karachi',
    course: 'Forensic Audit & AML Laws',
    rating: 5,
    text: 'Clear, structured, and directly applicable to daily corporate tax & audit practice. The verifiable digital diploma was a great boost for my professional career.',
    initials: 'UK',
    bg: 'bg-purple-600',
  },
  {
    id: 5,
    name: 'Bilal Ahmed, FCA',
    role: 'Partner, Tax & Advisory',
    city: 'Rawalpindi',
    course: 'Advanced Corporate Tax Reform',
    rating: 5,
    text: 'Extremely well-structured content with real-world case studies. Raja Gulfam simplifies complex tax laws into actionable guidance that every practitioner needs.',
    initials: 'BA',
    bg: 'bg-teal-600',
  },
  {
    id: 6,
    name: 'Zainab Mustafa',
    role: 'Corporate Compliance Manager',
    city: 'Faisalabad',
    course: 'Customs & Sales Tax Audit',
    rating: 5,
    text: 'The step-by-step guidance on sales tax audit defense and Federal Excise Duty gave our compliance team total confidence during official FBR audits.',
    initials: 'ZM',
    bg: 'bg-rose-600',
  },
];

export function StudentTestimonials() {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play animation every 4 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="py-16 bg-slate-50 border-t border-border overflow-hidden relative"
      id="testimonials"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-premier-green/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Header - Light Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-heading font-extrabold text-heading leading-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            Student Reviews &amp; Success Stories
          </h2>
          <p className="text-base sm:text-lg font-body text-slate-600 leading-relaxed">
            Hear directly from tax consultants, advocates, and finance professionals across Pakistan who transformed their practice with Raja Gulfam.
          </p>
        </div>

        {/* Contrast Dark Testimonial Card */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={reviews[activeReviewIndex].id}
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-2xl bg-slate-900 text-white border border-slate-800 p-6 sm:p-9 shadow-2xl shadow-slate-900/30 relative overflow-hidden space-y-6 group hover:border-slate-700 transition-all duration-300"
            >
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-400" />

              <div className="flex items-center justify-between">
                {/* Rating Stars & Verified Badge */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(reviews[activeReviewIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 filter drop-shadow" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 text-xs font-body font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Verified Graduate
                  </span>
                </div>

                <Quote className="w-8 h-8 text-amber-400 filter drop-shadow opacity-90 shrink-0" />
              </div>

              {/* Review Text */}
              <p className="text-base sm:text-xl font-body text-slate-100 leading-relaxed italic font-normal">
                &ldquo;{reviews[activeReviewIndex].text}&rdquo;
              </p>

              {/* Compact Footer: Author Info */}
              <div className="pt-5 border-t border-slate-800/80">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-xl ${reviews[activeReviewIndex].bg} text-white font-heading font-bold text-base flex items-center justify-center shadow-lg shadow-black/40 shrink-0 border border-white/10`}
                  >
                    {reviews[activeReviewIndex].initials}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-base font-heading font-bold text-white truncate">
                      {reviews[activeReviewIndex].name}
                    </h3>
                    <p className="text-xs font-body text-slate-400 truncate">
                      {reviews[activeReviewIndex].role} · <span className="text-slate-500">{reviews[activeReviewIndex].city}</span>
                    </p>
                    <p className="text-xs font-body font-semibold text-emerald-400 mt-1 truncate">
                      Course: {reviews[activeReviewIndex].course}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal Dot Indicators */}
        <div className="flex items-center justify-center gap-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveReviewIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${activeReviewIndex === idx
                  ? 'w-7 bg-premier-green'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
