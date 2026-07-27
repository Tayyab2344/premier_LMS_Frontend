'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, Award } from 'lucide-react';

const testimonials = [
  {
    name: 'Muhammad Tariq, ITP',
    role: 'Senior Tax Practitioner, Lahore Tax Bar',
    cpe: 'Income Tax & Sales Tax Diploma',
    rating: 5,
    comment: 'Raja Gulfams practical tax masterclass completely transformed my practice. Learning FBR IRIS portal filing step-by-step on the Student Mobile App allowed me to handle high-value corporate returns with 100% confidence.',
    initials: 'MT',
  },
  {
    name: 'Advocate Syed Hamza Shah',
    role: 'High Court Legal Practitioner, Peshawar Bar',
    cpe: 'Corporate Law Diploma',
    rating: 5,
    comment: 'The FBR notice appeal drafting and SECP eServices company registration walk-throughs were exceptionally detailed. Raja Gulfam explains complex sections of the Income Tax Ordinance 2001 in practical, easy-to-digest Urdu.',
    initials: 'HS',
  },
  {
    name: 'Ayesha Siddiqui, ACMA',
    role: 'Senior Finance Officer, Islamabad',
    cpe: 'Wealth Reconciliation Track',
    rating: 5,
    comment: 'The wealth statement reconciliation module is pure gold. Being able to re-watch recorded video lectures on the Student Mobile App during my commute made completing this diploma effortless.',
    initials: 'AS',
  },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((p) => (p + 1) % testimonials.length);
  const prev = () => setIdx((p) => (p - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[idx];

  return (
    <section className="py-20 bg-white border-t border-border">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary text-xs font-semibold mb-4">
            <Award className="w-3.5 h-3.5" />
            Verified Practitioner Reviews
          </span>
          <h2 className="text-4xl sm:text-[48px] font-heading font-extrabold text-heading leading-[1.1] mb-3" style={{ letterSpacing: '-0.03em' }}>
            Trusted by Tax Consultants, Advocates &amp; Accountants
          </h2>
          <p className="text-body text-base">See how Pakistani tax practitioners and legal advocates use Premier LMS to advance their practice.</p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl border border-border shadow-card p-8 sm:p-10"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary-100" />
              </div>
              <blockquote className="text-lg font-medium text-heading leading-relaxed mb-8 italic">
                &ldquo;{t.comment}&rdquo;
              </blockquote>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center font-bold text-white text-sm shadow-sm">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-heading flex items-center gap-1.5">
                      {t.name} <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </h4>
                    <p className="text-xs text-body">{t.role}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                  {t.cpe}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-heading hover:bg-primary-50 hover:border-primary transition-all shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === idx ? 'bg-primary w-6' : 'bg-slate-300'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-heading hover:bg-primary-50 hover:border-primary transition-all shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
