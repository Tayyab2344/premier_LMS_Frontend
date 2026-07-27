'use client';

import React, { useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const testimonials = [
  {
    name: 'Muhammad Tariq, ITP',
    role: 'Senior Tax Practitioner, Lahore',
    course: 'Certified Income Tax & Sales Tax Practitioner',
    rating: 5,
    text: 'Raja Gulfam’s course was exceptionally thorough. The practical portal walk-throughs gave me exact answers for complex FBR client scenarios. Highly recommended!',
    avatar: 'MT',
  },
  {
    name: 'Advocate Syed Hamza Shah',
    role: 'High Court Legal Advocate, Peshawar',
    course: 'Corporate Law & SECP Masterclass',
    rating: 5,
    text: 'The practical SECP company registration case studies and legal formats saved me dozens of hours. Easily the best professional development course in Pakistan.',
    avatar: 'HS',
  },
  {
    name: 'Ayesha Siddiqui, ACMA',
    role: 'Senior Finance Manager, Islamabad',
    course: 'Financial Accounting & Bookkeeping',
    rating: 5,
    text: 'The wealth statement reconciliation and balance sheet modules were crystal clear. Raja Gulfam breaks down complicated financial statutes into simple steps. 10/10 content quality!',
    avatar: 'AS',
  },
  {
    name: 'Usman Ali Khan',
    role: 'Financial Analyst, Karachi',
    course: 'Forensic Audit & AML Laws',
    rating: 5,
    text: 'Clear, structured, and directly applicable to daily corporate tax & audit practice. The verifiable digital diploma on the Student Mobile App was a great bonus for my career.',
    avatar: 'UK',
  },
];

export function StudentTestimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="section-padding bg-surface-secondary border-t border-border overflow-hidden" id="testimonials">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary text-xs font-body font-semibold uppercase tracking-wider">
              Student Success
            </span>
            <h2 className="text-4xl sm:text-[48px] font-heading font-extrabold text-heading leading-[1.1]" style={{ letterSpacing: '-0.03em' }}>
              Trusted by Pakistani Professionals
            </h2>
            <p className="text-body text-base">
              Hear from accountants, advocates, and tax consultants who transformed their practice with Raja Gulfam.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-heading hover:bg-primary-50 hover:border-primary transition-all shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-heading hover:bg-primary-50 hover:border-primary transition-all shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing -mx-4 px-4 py-2" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
              >
                <div className="rounded-3xl bg-white border border-border p-7 shadow-soft hover:shadow-card-hover hover:border-primary/40 transition-all duration-300 flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <Quote className="w-8 h-8 text-primary-100" />
                    </div>

                    <blockquote className="text-sm sm:text-base text-heading leading-relaxed italic">
                      &ldquo;{item.text}&rdquo;
                    </blockquote>
                  </div>

                  <div className="pt-5 border-t border-border/60 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-primary text-white flex items-center justify-center font-heading font-bold text-sm shadow-sm shrink-0">
                      {item.avatar}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-sm font-heading font-bold text-heading truncate flex items-center gap-1">
                        {item.name}
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      </h4>
                      <p className="text-[11px] text-body truncate mt-0.5">
                        {item.role} · <span className="text-primary font-semibold">{item.course}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
