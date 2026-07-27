'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, Clock } from 'lucide-react';
import { Course } from '@/lib/coursesData';

export function TabProjects({ course }: { course: Course }) {
  return (
    <div id="projects" className="space-y-6">
      
      {/* Header */}
      <div className="space-y-2 border-b border-border pb-4">
        <h3 className="text-xl font-heading font-bold text-heading">Practical Case Studies &amp; Portal Demos</h3>
        <p className="text-sm text-body leading-relaxed">
          Students analyze and solve authentic client tax cases, wealth statement reconciliations, and SECP filings to build genuine field experience.
        </p>
      </div>

      {course.projects.length === 0 ? (
        <div className="p-8 rounded-2xl bg-surface-secondary text-center border border-border space-y-2">
          <FolderGit2 className="w-8 h-8 text-primary mx-auto" />
          <h4 className="text-base font-heading font-bold text-heading">Case Studies Releasing at Launch</h4>
          <p className="text-xs text-body max-w-sm mx-auto">
            Practical tax and legal case study specifications for "{course.title}" will be announced prior to cohort commencement.
          </p>
        </div>
      ) : (
        /* Projects/Case Studies Grid */
        <div className="grid sm:grid-cols-2 gap-4">
          {course.projects.map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="rounded-2xl bg-white border border-border p-5 shadow-soft hover:shadow-card-hover hover:border-primary/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-primary-50 text-primary text-[10px] font-mono font-bold border border-primary-100">
                    Case Study 0{idx + 1}
                  </span>
                  <span className="text-xs font-mono font-medium text-body flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    {proj.estimatedHours}
                  </span>
                </div>

                <h4 className="text-base font-heading font-bold text-heading">
                  {proj.title}
                </h4>

                <p className="text-xs text-body leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border/50 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {proj.toolsUsed.map((tool, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-surface-secondary text-[10px] font-medium text-body border border-border">
                      {tool}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-heading font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {proj.difficulty}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
}
