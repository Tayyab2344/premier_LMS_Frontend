'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const COURSE_TABS = [
  'Overview',
  'Curriculum',
  'Instructor',
  'Projects',
  'Requirements',
  'Reviews',
  'FAQs',
] as const;

export type CourseTabType = (typeof COURSE_TABS)[number];

interface StickyCourseTabsProps {
  activeTab: CourseTabType;
  onTabChange: (tab: CourseTabType) => void;
}

export function StickyCourseTabs({ activeTab, onTabChange }: StickyCourseTabsProps) {
  return (
    <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="section-container">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-3">
          {COURSE_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`relative px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all shrink-0 ${
                  isActive
                    ? 'text-primary bg-primary-50 border border-primary-100 shadow-soft'
                    : 'text-body hover:text-heading hover:bg-surface-secondary'
                }`}
              >
                {tab}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
