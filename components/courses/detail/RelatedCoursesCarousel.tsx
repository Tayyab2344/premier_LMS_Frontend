'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Course, COURSES_DATA } from '@/lib/coursesData';
import { CourseCard } from '../CourseCard';

interface RelatedCoursesCarouselProps {
  currentCourseId: string;
  onNotifyClick: (course: Course) => void;
}

export function RelatedCoursesCarousel({
  currentCourseId,
  onNotifyClick,
}: RelatedCoursesCarouselProps) {
  const relatedCourses = COURSES_DATA.filter((c) => c.id !== currentCourseId);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-16 bg-surface-secondary border-t border-border">
      <div className="section-container">
        
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary-50 border border-primary-100 inline-block mb-1">
              Explore More
            </span>
            <h3 className="text-2xl font-heading font-extrabold text-heading">
              Related Courses
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-border bg-white text-heading hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-soft"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-border bg-white text-heading hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-soft"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embla Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-6">
            {relatedCourses.map((relCourse) => (
              <div
                key={relCourse.id}
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <CourseCard course={relCourse} onNotifyClick={onNotifyClick} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
