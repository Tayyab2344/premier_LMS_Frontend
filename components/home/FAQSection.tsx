'use client';

import React, { useState } from 'react';
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

  return (
    <section className="section-padding bg-surface-secondary border-t border-border" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-body font-bold uppercase tracking-wider text-primary px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="text-4xl sm:text-[48px] font-heading font-extrabold text-heading leading-[1.1]" style={{ letterSpacing: '-0.03em' }}>
            Got Questions? We Have Answers.
          </h2>
          <p className="text-base text-body leading-relaxed">
            Everything you need to know about our tax &amp; corporate law masterclasses, Student Mobile App access, and accredited diplomas.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-border overflow-hidden transition-all duration-300 shadow-soft"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left font-heading font-bold text-heading text-base sm:text-lg flex justify-between items-center gap-4 hover:text-primary transition-colors"
                >
                  <span>{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-surface-secondary flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-primary-50 text-primary' : 'text-body'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border/50 px-6 pb-6 pt-4 text-body text-sm sm:text-base leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
