'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { CoursesHero } from '@/components/courses/CoursesHero';
import { CourseStats } from '@/components/courses/CourseStats';
import { CourseFilterBar } from '@/components/courses/CourseFilterBar';
import { CourseCard } from '@/components/courses/CourseCard';
import { NotifyModal } from '@/components/courses/NotifyModal';
import { CourseCTA } from '@/components/courses/detail/CourseCTA';
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

    // Sort Filter
    switch (selectedSort) {
      case 'popular':
        result.sort((a, b) => b.studentsCount - a.studentsCount);
        break;
      case 'newest':
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'a-z':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

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
    <main className="min-h-screen bg-white text-heading selection:bg-primary-100 selection:text-primary-900 overflow-x-hidden">
        {/* 1. Hero Section */}
        <CoursesHero />

        {/* 2. Course Statistics */}
        <CourseStats />

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
        <section className="section-padding bg-white min-h-[600px]">
          <div className="section-container">
            {filteredCourses.length === 0 ? (
              /* Empty State */
              <div className="py-20 text-center space-y-4 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-surface-secondary text-body flex items-center justify-center mx-auto border border-border">
                  <SlidersHorizontal className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-bold text-heading">No Courses Found</h3>
                <p className="text-sm text-body leading-relaxed">
                  We couldn't find any courses matching your search criteria. Try clearing some filters or searching for different keywords.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="btn-primary !py-3 !px-6 text-xs mx-auto"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* 10 Course Grid (4 columns desktop, 2 columns tablet, 1 column mobile) */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
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

        {/* 5. Call To Action Banner */}
        <CourseCTA />

        {/* 6. Notify Modal for Coming Soon Courses */}
        <NotifyModal
          isOpen={notifyModalOpen}
          onClose={() => setNotifyModalOpen(false)}
          courseTitle={selectedCourseForNotify?.title || ''}
        />
      </main>
  );
}
