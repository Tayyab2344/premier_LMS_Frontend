'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How do I enroll in a course on Premier LMS?',
    a: 'Simply click "Enroll Now" on your desired course card or course details page. Complete the admission process to gain instant access on our Premier LMS Student Mobile App to lecture materials, case studies, and live class links.',
  },
  {
    q: 'Do all courses include verifiable completion diplomas?',
    a: 'Yes! Upon completing the course modules and practical case study reviews, an official digital diploma bearing your unique validation code will be generated for download and LinkedIn sharing.',
  },
  {
    q: 'Are classes live or recorded?',
    a: 'We offer a hybrid model: weekly interactive live masterclasses with Raja Gulfam for Q&A and practical case reviews, combined with HD recorded video masterclasses available 24/7 in your Mobile App.',
  },
  {
    q: 'How long do I retain access to course recordings after the course ends?',
    a: 'Course access remains active during the entire course duration and for 2 full months after course completion on the Premier LMS Student Mobile App, allowing ample time for review and practice.',
  },
  {
    q: 'Can I access masterclasses on mobile devices?',
    a: 'Yes! You can download the Premier LMS Student Mobile App on your Android or iOS smartphone to stream live classes, watch 24/7 HD recordings, and download reference tax formats.',
  },
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="section-padding bg-white border-t border-border" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="inline-block text-xs font-heading font-bold uppercase tracking-wider text-premier-green px-4 py-1.5 rounded-full bg-premier-green-50 border border-premier-green/10">
            Frequently Asked Questions
          </span>
          <h2 className="text-4xl sm:text-[48px] font-heading font-extrabold text-heading leading-[1.1]" style={{ letterSpacing: '-0.03em' }}>
            Got Questions? We Have Answers.
          </h2>
          <p className="text-base sm:text-lg text-body leading-relaxed">
            Everything you need to know about our tax &amp; corporate law masterclasses, Student Mobile App access, and accredited diplomas.
          </p>
        </div>

        {/* Magnetic Snap FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const isOdd = idx % 2 === 0;

            // Pre-scroll magnetic offsets (disabled on mobile to prevent overflow)
            const initialX = isMobile ? 0 : isOdd ? -20 : 20;
            const initialRotate = isMobile ? 0 : isOdd ? -3 : 3;

            return (
              <motion.div
                key={idx}
                layout
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  y: 50,
                  x: initialX,
                  rotate: initialRotate,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  x: 0,
                  rotate: 0,
                }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 24,
                  delay: idx * 0.1,
                }}
                className={`rounded-2xl bg-white border transition-colors duration-300 overflow-hidden shadow-soft ${
                  isOpen ? 'border-premier-green/40 ring-1 ring-premier-green/20' : 'border-border hover:border-premier-green/30'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left font-heading font-semibold text-slate-900 text-base sm:text-lg flex justify-between items-center gap-4 hover:text-premier-green transition-colors focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-white rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{faq.q}</span>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? 'rotate-180 bg-premier-green text-white shadow-sm' : 'bg-premier-cream text-premier-green'
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border/50 px-6 pb-6 pt-4 text-slate-600 text-sm sm:text-base leading-relaxed font-body">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
