'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { Course } from '@/lib/coursesData';

export function TabRequirements({ course }: { course: Course }) {
  return (
    <div id="requirements" className="space-y-6">
      
      {/* Header */}
      <div className="space-y-2 border-b border-border pb-4">
        <h3 className="text-xl font-heading font-bold text-heading">Course Requirements &amp; Prerequisites</h3>
        <p className="text-sm text-body leading-relaxed">
          Everything you need to successfully participate in and complete this masterclass.
        </p>
      </div>

      {/* Requirements Checklist Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {course.requirements.map((req, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.06 }}
            className="p-4 rounded-2xl bg-white border border-border/80 shadow-soft flex items-start gap-3.5"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-heading font-bold text-heading">Prerequisite #{idx + 1}</h4>
              <p className="text-xs text-body leading-relaxed mt-0.5">{req}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Special Highlight Box */}
      <div className="p-6 rounded-2xl bg-primary-50 border border-primary-100 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-blue-glow">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-heading font-bold text-primary">Beginner-Friendly Guarantee</h4>
          <p className="text-xs text-body leading-relaxed">
            No prior advanced coding or legal experience is required. All concepts are introduced step-by-step with practical exercise files and direct instructor support.
          </p>
        </div>
      </div>

    </div>
  );
}
