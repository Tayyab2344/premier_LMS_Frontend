'use client';

import React, { useMemo } from 'react';
import { Sparkles, Search, SlidersHorizontal } from 'lucide-react';
import { Course } from '@/lib/coursesData';
import { UpcomingCourseCard } from './UpcomingCourseCard';

interface UpcomingAcademySectionProps {
  upcomingCourses: Course[];
  onNotifyClick: (course: Course) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
}

export function UpcomingAcademySection({
  upcomingCourses,
  onNotifyClick,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: UpcomingAcademySectionProps) {

  // Filter upcoming courses based on search & selected category
  const filteredUpcoming = useMemo(() => {
    let result = [...upcomingCourses];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.shortDescription.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.skillsIncluded.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter((c) => {
        if (selectedCategory === 'Taxation') {
          return c.category.includes('Tax') || c.category.includes('Customs') || c.category.includes('Practice');
        }
        if (selectedCategory === 'Accounting & Finance') {
          return (
            c.category.includes('Accounting') ||
            c.category.includes('Finance') ||
            c.category.includes('Banking') ||
            c.category.includes('Advisory')
          );
        }
        if (selectedCategory === 'Law & Compliance') {
          return (
            c.category.includes('Law') ||
            c.category.includes('Audit') ||
            c.category.includes('Corporate') ||
            c.category.includes('Societies')
          );
        }
        return c.category === selectedCategory;
      });
    }

    return result;
  }, [upcomingCourses, searchQuery, selectedCategory]);

  return (
    <section id="upcoming-academy" className="section-padding bg-premier-cream min-h-[600px]">
      <div className="section-container space-y-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-amber-300 text-xs font-heading font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Academy Expansion Roadmap
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-heading">
            Coming Soon
          </h2>

          <p className="text-body text-base sm:text-lg leading-relaxed">
            We&apos;re expanding the academy with specialized courses in accounting, taxation, corporate law, and financial advisory. Get notified when enrollment opens to claim early-bird discounts.
          </p>
        </div>

        {/* Filter / Search Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-border shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search upcoming courses..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-border text-xs text-heading placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-premier-green focus:bg-white transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: 'All', label: `All Upcoming (${upcomingCourses.length})` },
              { id: 'Taxation', label: 'Taxation' },
              { id: 'Accounting & Finance', label: 'Accounting & Finance' },
              { id: 'Law & Compliance', label: 'Law & Compliance' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-heading font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-amber-300 shadow-soft'
                    : 'bg-slate-100 text-body hover:bg-slate-200 hover:text-heading'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3x3 Matrix Grid Layout */}
        {filteredUpcoming.length === 0 ? (
          /* Empty State */
          <div className="py-16 text-center space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-bold text-heading">No Upcoming Courses Found</h3>
            <p className="text-xs text-body">Try adjusting your search query or switching categories.</p>
            <button
              onClick={() => {
                onSearchChange('');
                onCategoryChange('All');
              }}
              className="btn-primary text-xs !py-2.5 !px-5 mx-auto"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* 3 Columns x 3 Rows = 9 Cards Matrix Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {filteredUpcoming.map((course) => (
              <UpcomingCourseCard key={course.id} course={course} onNotifyClick={onNotifyClick} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
