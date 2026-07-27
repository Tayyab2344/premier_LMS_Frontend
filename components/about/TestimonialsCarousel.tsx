'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Muhammad Usman Khan',
    role: 'Tax Consultant & Partner',
    course: 'Certified Income Tax & Sales Tax Practitioner',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    review:
      'Learning under Raja Gulfam Kayani completely transformed my professional trajectory. His practical breakdown of FBR tax return filing and corporate law helped me set up my independent tax advisory practice with confidence.',
  },
  {
    name: 'Ayesha Siddiqui',
    role: 'Senior Accountant',
    course: 'Advanced Corporate Finance & Audit Masterclass',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    review:
      'Unlike academic degree programs, Premier LMS focuses 100% on real client files and corporate compliance software. The mentorship from Raja Gulfam is unmatched in Pakistan.',
  },
  {
    name: 'Tariq Mehmood',
    role: 'Chief Financial Officer',
    course: 'Forensic Audit & Anti-Money Laundering Laws',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    review:
      'The forensic audit course provided deep legal insight into corporate governance and financial fraud prevention. Raja Gulfams background as a High Court Advocate makes every lecture invaluable.',
  },
  {
    name: 'Fatima Zahra',
    role: 'Junior Legal Associate',
    course: 'Corporate Law & SECP Filings Masterclass',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    review:
      'As a law graduate, I had theoretical knowledge of corporate statutes but zero practical experience with SECP online portals. Premier LMS bridged that gap in just 6 weeks.',
  },
];

export function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="section-padding bg-white relative overflow-hidden border-b border-border">
      <div className="section-container relative z-10">
        
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-primary px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 inline-block">
              Alumni Success
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-heading">
              What Our Students Say
            </h2>
            <p className="text-base text-body leading-relaxed">
              Real feedback from lawyers, accountants, CFOs, and tax practitioners who mastered practical skills with Raja Gulfam.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-border bg-white text-heading hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center shadow-soft"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-border bg-white text-heading hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center shadow-soft"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((item, idx) => (
              <div key={idx} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                <div className="h-full rounded-3xl bg-surface-secondary border border-border p-7 shadow-soft hover:shadow-card-hover hover:border-primary/40 transition-all duration-300 flex flex-col justify-between">
                  <div className="space-y-4">
                    
                    {/* Stars + Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-heading font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified Graduate
                      </span>
                    </div>

                    {/* Review Quote */}
                    <p className="text-sm text-body leading-relaxed italic">
                      "{item.review}"
                    </p>
                  </div>

                  {/* Student Info */}
                  <div className="pt-6 mt-6 border-t border-border/60 flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md bg-slate-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-heading font-bold text-heading leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-primary font-semibold">{item.role}</p>
                      <p className="text-[11px] text-body/70 truncate max-w-[200px]">{item.course}</p>
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
