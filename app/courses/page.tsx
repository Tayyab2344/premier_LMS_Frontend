'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { FeaturedCourseHero } from '@/components/courses/FeaturedCourseHero';
import { UpcomingAcademySection } from '@/components/courses/UpcomingAcademySection';
import { CourseCTA } from '@/components/courses/detail/CourseCTA';
import { NotifyModal } from '@/components/courses/NotifyModal';
import { COURSES_DATA, Course, mapBackendCourseToFrontend } from '@/lib/coursesData';
import api from '@/lib/api';

export default function CoursesPage() {
  const [coursesList, setCoursesList] = useState<Course[]>(COURSES_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch dynamic courses from backend DB if available
  useEffect(() => {
    api
      .get('/courses')
      .then((res) => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          const dynamicCourses = res.data.map(mapBackendCourseToFrontend);
          const dynamicSlugs = new Set(dynamicCourses.map((c: Course) => c.slug.toLowerCase()));
          const staticRemaining = COURSES_DATA.filter(
            (c) => !dynamicSlugs.has(c.slug.toLowerCase()) && !dynamicSlugs.has(c.id.toLowerCase())
          );
          setCoursesList([...dynamicCourses, ...staticRemaining]);
        }
      })
      .catch((err) => {
        console.error('Using fallback static courses list', err);
      });
  }, []);

  // Separate the 1 Available Flagship Course from the 9 Upcoming Courses
  const featuredAvailableCourse = useMemo(() => {
    return coursesList.find((c) => c.status === 'Available') || COURSES_DATA[0];
  }, [coursesList]);

  const upcomingCourses = useMemo(() => {
    return coursesList.filter((c) => c.id !== featuredAvailableCourse.id && c.status !== 'Available');
  }, [coursesList, featuredAvailableCourse]);

  // Notify Modal State
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [selectedCourseForNotify, setSelectedCourseForNotify] = useState<Course | null>(null);

  const handleOpenNotifyModal = (course: Course) => {
    setSelectedCourseForNotify(course);
    setNotifyModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-premier-cream text-heading selection:bg-premier-green-100 selection:text-premier-green-900 overflow-x-hidden">
      {/* 1. Hero Section: Available Flagship Course as the Star */}
      <FeaturedCourseHero course={featuredAvailableCourse} />

      {/* 2. "Coming Soon" Categorized Upcoming Academy Section */}
      <UpcomingAcademySection
        upcomingCourses={upcomingCourses}
        onNotifyClick={handleOpenNotifyModal}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* 3. Final CTA Banner */}
      <CourseCTA />

      {/* 4. Notify Modal for Upcoming Courses */}
      <NotifyModal
        isOpen={notifyModalOpen}
        onClose={() => setNotifyModalOpen(false)}
        courseTitle={selectedCourseForNotify?.title || 'Premier LMS Masterclass'}
      />
    </main>
  );
}
