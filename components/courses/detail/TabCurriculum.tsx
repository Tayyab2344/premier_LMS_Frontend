'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  PlayCircle,
  FileText,
  FolderGit2,
  Lock,
  Sparkles
} from 'lucide-react';
import { Course, ModuleLesson } from '@/lib/coursesData';

export function TabCurriculum({ course }: { course: Course }) {
  const [openModuleIds, setOpenModuleIds] = useState<string[]>(
    course.modules.length > 0 ? [course.modules[0].id] : []
  );

  const toggleModule = (id: string) => {
    setOpenModuleIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const expandAll = () => setOpenModuleIds(course.modules.map((m) => m.id));
  const collapseAll = () => setOpenModuleIds([]);

  const totalModules = course.modules.length;
  const totalLessons = course.modules.reduce(
    (acc, mod) => acc + (mod.lessons?.length || 0),
    0
  );

  const getLessonIcon = (type: ModuleLesson['type']) => {
    switch (type) {
      case 'video':
        return <PlayCircle className="w-4 h-4 text-primary shrink-0" />;
      case 'practical_demo':
        return <FileText className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'case_study':
        return <FolderGit2 className="w-4 h-4 text-amber-600 shrink-0" />;
    }
  };

  return (
    <div id="curriculum" className="space-y-6">
      
      {/* Top Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h3 className="text-xl font-heading font-bold text-heading">Course Masterclass Syllabus</h3>
          <p className="text-xs text-body mt-0.5">
            {totalModules} Modules · {totalLessons} Masterclasses · {course.duration}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-lg border border-border bg-surface-secondary text-xs font-heading font-semibold text-heading hover:bg-white transition-all"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-lg border border-border bg-surface-secondary text-xs font-heading font-semibold text-heading hover:bg-white transition-all"
          >
            Collapse All
          </button>
        </div>
      </div>

      {course.modules.length === 0 ? (
        <div className="p-8 rounded-2xl bg-surface-secondary text-center border border-border space-y-2">
          <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
          <h4 className="text-base font-heading font-bold text-heading">Masterclass Syllabus Releasing Soon</h4>
          <p className="text-xs text-body max-w-sm mx-auto">
            The full practical module syllabus for "{course.title}" will be published prior to cohort commencement inside the Student Mobile App.
          </p>
        </div>
      ) : (
        /* Accordion Stack */
        <div className="space-y-4">
          {course.modules.map((mod) => {
            const isOpen = openModuleIds.includes(mod.id);

            return (
              <div
                key={mod.id}
                className="rounded-2xl bg-white border border-border shadow-soft overflow-hidden transition-all duration-300"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-surface-secondary/60 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-primary">
                        Module 0{mod.number}
                      </span>
                      <span className="text-xs text-body">({mod.lessons?.length || 0} Lectures)</span>
                    </div>
                    <h4 className="text-base font-heading font-bold text-heading">
                      {mod.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className="text-xs font-heading font-medium text-body hidden sm:inline-block">
                      {mod.duration}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-surface-secondary flex items-center justify-center transition-transform ${isOpen ? 'rotate-180 bg-primary-50 text-primary' : 'text-body'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border/60 bg-surface-secondary/40 p-4 sm:p-5 space-y-2.5"
                    >
                      <p className="text-xs text-body mb-3 leading-relaxed">
                        {mod.description}
                      </p>

                      {mod.lessons.map((lesson, lIdx) => (
                        <div
                          key={lIdx}
                          className="flex items-center justify-between p-3 rounded-xl bg-white border border-border/70 hover:border-primary/30 transition-all text-xs"
                        >
                          <div className="flex items-center gap-3">
                            {getLessonIcon(lesson.type)}
                            <span className="font-heading font-medium text-heading">
                              {lesson.title}
                            </span>
                            {lesson.isFree && (
                              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                                Free Preview
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 shrink-0 text-body">
                            <span className="font-mono text-[11px]">{lesson.duration}</span>
                            {lesson.isFree ? (
                              <span className="text-primary font-bold">Watch</span>
                            ) : (
                              <Lock className="w-3.5 h-3.5 text-body/40" />
                            )}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
