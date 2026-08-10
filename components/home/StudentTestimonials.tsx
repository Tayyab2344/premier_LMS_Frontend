'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  {
    name: 'Bilal Ahmed, FCA',
    role: 'Partner, Tax & Advisory, Rawalpindi',
    course: 'Advanced Corporate Tax Reform',
    rating: 5,
    text: 'Extremely well-structured content with real case studies. Raja Gulfam simplifies complex tax laws into actionable, step-by-step guidance.',
    avatar: 'BA',
  },
];

export function StudentTestimonials() {
  const [activeIndex, setActiveIndex] = useState(1);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  return (
    <section
      className="section-padding bg-white border-t border-border overflow-hidden relative"
      id="testimonials"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Student Testimonials 3D Carousel"
    >
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-premier-green-50 text-premier-green text-xs font-body font-semibold uppercase tracking-wider border border-premier-green/10">
              Student Success
            </span>
            <h2 className="text-4xl sm:text-[48px] font-heading font-extrabold text-heading leading-[1.1]" style={{ letterSpacing: '-0.03em' }}>
              Trusted by Pakistani Professionals
            </h2>
            <p className="text-body text-base sm:text-lg">
              Hear from accountants, advocates, and tax consultants who transformed their practice with Raja Gulfam.
            </p>
          </div>

          {/* Navigation Controls (Strictly Manual) */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-border bg-white text-heading hover:bg-premier-green hover:text-white hover:border-premier-green transition-all shadow-card flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-border bg-white text-heading hover:bg-premier-green hover:text-white hover:border-premier-green transition-all shadow-card flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Coverflow Container with Curved Mask Framing */}
        <div className="relative py-10 px-2 overflow-hidden rounded-3xl bg-gradient-to-b from-premier-cream/30 via-white to-premier-cream/30 border border-border/50 shadow-inner">
          <div
            className="relative flex justify-center items-center h-[380px] sm:h-[400px] w-full"
            style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
          >
            {testimonials.map((item, idx) => {
              // Calculate offset relative to activeIndex
              let offset = idx - activeIndex;

              // Handle circular wrapping for 3D stack
              const total = testimonials.length;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const isActive = offset === 0;

              // Dynamic 3D Transform Properties
              let rotateY = 0;
              let translateX = '0%';
              let scale = 1;
              let opacity = 1;
              let filter = 'blur(0px)';
              let zIndex = 30;

              if (offset === -1) {
                rotateY = 28;
                translateX = '-65%';
                scale = 0.82;
                opacity = 0.55;
                filter = 'blur(4px)';
                zIndex = 20;
              } else if (offset === 1) {
                rotateY = -28;
                translateX = '65%';
                scale = 0.82;
                opacity = 0.55;
                filter = 'blur(4px)';
                zIndex = 20;
              } else if (offset < -1) {
                rotateY = 35;
                translateX = '-120%';
                scale = 0.7;
                opacity = 0;
                filter = 'blur(8px)';
                zIndex = 10;
              } else if (offset > 1) {
                rotateY = -35;
                translateX = '120%';
                scale = 0.7;
                opacity = 0;
                filter = 'blur(8px)';
                zIndex = 10;
              }

              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    x: translateX,
                    scale: isActive ? 1.05 : scale,
                    rotateY: rotateY,
                    opacity: opacity,
                    filter: filter,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 24,
                    mass: 0.8,
                  }}
                  style={{
                    position: 'absolute',
                    zIndex: zIndex,
                    transformStyle: 'preserve-3d',
                  }}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full max-w-[320px] sm:max-w-[420px] rounded-3xl p-7 bg-white border border-border shadow-[0_20px_40px_rgba(0,0,0,0.07)] flex flex-col justify-between h-[320px] cursor-pointer select-none ${
                    isActive ? 'border-premier-green/30 shadow-[0_25px_50px_rgba(22,78,54,0.15)] ring-1 ring-premier-green/20' : 'hover:opacity-80'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      {/* 5-Star Rating Icons strictly in premier-gold */}
                      <div className="flex items-center gap-1 text-premier-gold">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-premier-gold text-premier-gold" />
                        ))}
                      </div>
                      <Quote className="w-8 h-8 text-premier-green/20" />
                    </div>

                    {/* Main Testimonial Body in text-slate-900 */}
                    <blockquote className="text-sm sm:text-base text-slate-900 leading-relaxed italic font-body">
                      &ldquo;{item.text}&rdquo;
                    </blockquote>
                  </div>

                  {/* Profile Footer with text-premier-green heading */}
                  <div className="pt-4 border-t border-border/60 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-premier-green text-white flex items-center justify-center font-heading font-bold text-sm shadow-sm shrink-0">
                      {item.avatar}
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="text-sm font-heading font-bold text-premier-green truncate flex items-center gap-1">
                        {item.name}
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      </h3>
                      <p className="text-[11px] text-slate-600 truncate mt-0.5 font-body">
                        {item.role} · <span className="text-premier-green font-semibold">{item.course}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
