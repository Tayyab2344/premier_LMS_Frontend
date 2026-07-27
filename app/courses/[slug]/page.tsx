'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SmoothScrollProvider } from '@/components/about/SmoothScrollProvider';
import { CourseDetailHero } from '@/components/courses/detail/CourseDetailHero';
import { StickyCourseTabs, CourseTabType } from '@/components/courses/detail/StickyCourseTabs';
import { TabOverview } from '@/components/courses/detail/TabOverview';
import { TabCurriculum } from '@/components/courses/detail/TabCurriculum';
import { TabInstructor } from '@/components/courses/detail/TabInstructor';
import { TabProjects } from '@/components/courses/detail/TabProjects';
import { TabRequirements } from '@/components/courses/detail/TabRequirements';
import { TabReviews } from '@/components/courses/detail/TabReviews';
import { TabFAQs } from '@/components/courses/detail/TabFAQs';
import { CourseSidebar } from '@/components/courses/detail/CourseSidebar';
import { RelatedCoursesCarousel } from '@/components/courses/detail/RelatedCoursesCarousel';
import { NotifyModal } from '@/components/courses/NotifyModal';
import { COURSES_DATA } from '@/lib/coursesData';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [activeTab, setActiveTab] = useState<CourseTabType>('Overview');
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [notifyCourseTitle, setNotifyCourseTitle] = useState('');

  // Find course from COURSES_DATA
  const course = useMemo(() => {
    return COURSES_DATA.find((c) => c.slug === slug);
  }, [slug]);

  if (!course) {
    return (
      <main className="min-h-screen bg-white text-heading flex items-center justify-center p-6 pt-24">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 rounded-full bg-primary-50 text-primary flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-heading font-extrabold text-heading">Course Not Found</h1>
          <p className="text-sm text-body leading-relaxed">
            The requested course URL does not match any current or upcoming masterclasses in our catalog.
          </p>
          <Link href="/courses" className="btn-primary text-xs inline-flex !py-3 !px-6">
            ← Explore All Courses
          </Link>
        </div>
      </main>
    );
  }

  const handleOpenNotifyModal = (targetCourseTitle?: string) => {
    setNotifyCourseTitle(targetCourseTitle || course.title);
    setNotifyModalOpen(true);
  };

  const handleTabClick = (tab: CourseTabType) => {
    setActiveTab(tab);
  };

  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-white text-heading selection:bg-primary-100 selection:text-primary-900 overflow-x-hidden">
        {/* 1. Light Clean Header (No Dark Banner) */}
        <CourseDetailHero
          course={course}
          onNotifyClick={() => handleOpenNotifyModal()}
        />

        {/* 2. Sticky Tab Navigation Bar */}
        <StickyCourseTabs activeTab={activeTab} onTabChange={handleTabClick} />

        {/* 3. Main Content & Sidebar Grid */}
        <section className="section-padding bg-white">
          <div className="section-container">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Interactive Mini Pages / Tab Content */}
              <div className="lg:col-span-8 min-h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    {activeTab === 'Overview' && <TabOverview course={course} />}
                    {activeTab === 'Curriculum' && <TabCurriculum course={course} />}
                    {activeTab === 'Instructor' && <TabInstructor course={course} />}
                    {activeTab === 'Projects' && <TabProjects course={course} />}
                    {activeTab === 'Requirements' && <TabRequirements course={course} />}
                    {activeTab === 'Reviews' && <TabReviews course={course} />}
                    {activeTab === 'FAQs' && <TabFAQs course={course} />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: Sticky Sidebar Container */}
              <div className="lg:col-span-4">
                <CourseSidebar
                  course={course}
                  onNotifyClick={() => handleOpenNotifyModal()}
                />
              </div>

            </div>
          </div>
        </section>

        {/* 4. Related Courses Carousel */}
        <RelatedCoursesCarousel
          currentCourseId={course.id}
          onNotifyClick={(c) => handleOpenNotifyModal(c.title)}
        />

        {/* 5. Notify Modal */}
        <NotifyModal
          isOpen={notifyModalOpen}
          onClose={() => setNotifyModalOpen(false)}
          courseTitle={notifyCourseTitle || course.title}
        />
      </main>
    </SmoothScrollProvider>
  );
}
