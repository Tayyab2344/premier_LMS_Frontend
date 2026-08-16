'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { CourseFilterBar } from '@/components/courses/CourseFilterBar';
import { CourseCard } from '@/components/courses/CourseCard';
import { NotifyModal } from '@/components/courses/NotifyModal';
import { COURSES_DATA, Course, mapBackendCourseToFrontend } from '@/lib/coursesData';
import api from '@/lib/api';
import { SlidersHorizontal } from 'lucide-react';

export default function CoursesPage() {
  const [coursesList, setCoursesList] = useState<Course[]>(COURSES_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedSort, setSelectedSort] = useState('popular');

  // Fetch dynamic courses from backend DB
  useEffect(() => {
    api
      .get('/courses')
      .then((res) => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          const dynamicCourses = res.data.map(mapBackendCourseToFrontend);
          // Combine dynamic courses, avoiding duplicate titles/slugs
          const dynamicSlugs = new Set(dynamicCourses.map((c: Course) => c.slug.toLowerCase()));
          const staticRemaining = COURSES_DATA.filter((c) => !dynamicSlugs.has(c.slug.toLowerCase()) && !dynamicSlugs.has(c.id.toLowerCase()));
          setCoursesList([...dynamicCourses, ...staticRemaining]);
        }
      })
      .catch((err) => {
        console.error('Using fallback static courses list', err);
      });
  }, []);

  // Notify Modal State
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [selectedCourseForNotify, setSelectedCourseForNotify] = useState<Course | null>(null);

  // Extract unique categories for filter dropdown
  const categoriesList = useMemo(() => {
    return Array.from(new Set(coursesList.map((c) => c.category)));
  }, [coursesList]);

  // Filter & Sort Logic
  const filteredCourses = useMemo(() => {
    let result = [...coursesList];

    // Search Query Filter
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

    // Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter((c) => c.category === selectedCategory);
    }

    // Difficulty Level Filter
    if (selectedLevel !== 'All') {
      result = result.filter((c) => c.level.includes(selectedLevel));
    }

    // Course Status Filter
    if (selectedStatus !== 'All') {
      result = result.filter((c) => c.status === selectedStatus);
    }

    // Sort Filter — Always show Available (ongoing) courses first
    result.sort((a, b) => {
      if (a.status === 'Available' && b.status !== 'Available') return -1;
      if (a.status !== 'Available' && b.status === 'Available') return 1;

      switch (selectedSort) {
        case 'popular':
          return b.studentsCount - a.studentsCount;
        case 'newest':
          return b.id.localeCompare(a.id);
        case 'a-z':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [coursesList, searchQuery, selectedCategory, selectedLevel, selectedStatus, selectedSort]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSelectedStatus('All');
    setSelectedSort('popular');
  };

  const handleOpenNotifyModal = (course: Course) => {
    setSelectedCourseForNotify(course);
    setNotifyModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-premier-cream text-heading selection:bg-premier-green-100 selection:text-premier-green-900 overflow-x-hidden">
        {/* Main Heading — Retro Modern Style */}
        <section className="pt-28 sm:pt-32 pb-6 bg-[#FAF6EE]">
          <div className="section-container text-center max-w-3xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#1B3B2C] tracking-tight">
              Explore Our Courses
            </h1>
            <p className="text-base sm:text-lg font-body text-[#8A7D66]">
              Practical masterclasses in Taxation, Corporate Law, Accounting, Audit &amp; Finance
            </p>
          </div>
        </section>

        {/* 3. Search & Filter Bar */}
        <CourseFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          onResetFilters={handleResetFilters}
          totalResults={filteredCourses.length}
          categoriesList={categoriesList}
        />

        {/* 4. Featured Courses Grid */}
        <section className="section-padding bg-[#FAF6EE] min-h-[600px]">
          <div className="section-container">
            {filteredCourses.length === 0 ? (
              /* Retro Empty State */
              <div className="py-16 text-center space-y-4 max-w-md mx-auto p-8 rounded-2xl bg-[#FAF6EE] border-2 border-[#1B3B2C] shadow-[4px_4px_0px_#1B3B2C]">
                <div className="w-14 h-14 rounded-xl bg-[#1B3B2C] text-[#D9A544] flex items-center justify-center mx-auto border border-[#1B3B2C] shadow-[2px_2px_0px_#D9A544]">
                  <SlidersHorizontal className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-heading font-extrabold text-[#1B3B2C]">No Courses Found</h3>
                <p className="text-xs font-body text-[#8A7D66] leading-relaxed">
                  We couldn't find any courses matching your search criteria. Try clearing some filters or searching for different keywords.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#D9A544] text-[#1B3B2C] border border-[#1B3B2C] text-xs font-heading font-extrabold uppercase tracking-wide shadow-[2.5px_2.5px_0px_#1B3B2C] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#1B3B2C]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* 3 Cards per row on desktop */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onNotifyClick={handleOpenNotifyModal}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 6. Notify Modal for Coming Soon Courses */}
        <NotifyModal
          isOpen={notifyModalOpen}
          onClose={() => setNotifyModalOpen(false)}
          courseTitle={selectedCourseForNotify?.title || ''}
        />
      </main>
  );
}
