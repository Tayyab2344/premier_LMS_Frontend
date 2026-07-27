'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Course } from '@/lib/coursesData';

export function TabFAQs({ course }: { course: Course }) {
  const [openIdxs, setOpenIdxs] = useState<number[]>([0]);

  const toggleFaq = (idx: number) => {
    setOpenIdxs((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div id="faqs" className="space-y-6">
      
      {/* Header */}
      <div className="space-y-2 border-b border-border pb-4">
        <h3 className="text-xl font-heading font-bold text-heading">Frequently Asked Questions</h3>
        <p className="text-sm text-body leading-relaxed">
          Common queries regarding enrollment, certifications, schedule, and course materials.
        </p>
      </div>

      {/* Accordions */}
      <div className="space-y-3">
        {course.faqs.map((faq, idx) => {
          const isOpen = openIdxs.includes(idx);
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-border shadow-soft overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-surface-secondary/60 transition-colors"
              >
                <span className="text-base font-heading font-bold text-heading flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full bg-surface-secondary flex items-center justify-center transition-transform ${isOpen ? 'rotate-180 bg-primary-50 text-primary' : 'text-body'}`}>
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
                    className="border-t border-border/60 bg-surface-secondary/40 p-5 text-xs sm:text-sm text-body leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </div>
  );
}
