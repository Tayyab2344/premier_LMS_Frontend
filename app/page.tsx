'use client';

import React from 'react';
import { Hero } from '@/components/home/Hero';
import { LatestNews } from '@/components/home/LatestNews';
import { PopularCourses } from '@/components/home/PopularCourses';
import { TrustedBy } from '@/components/home/TrustedBy';
import { PlatformFeatures } from '@/components/home/PlatformFeatures';
import { MeetInstructor } from '@/components/home/MeetInstructor';
import { LearningJourney } from '@/components/home/LearningJourney';
import { StudentSuccessNumbers } from '@/components/home/StudentSuccessNumbers';
import { StudentTestimonials } from '@/components/home/StudentTestimonials';
import { FAQSection } from '@/components/home/FAQSection';
import { CTABanner } from '@/components/home/CTABannerAndFooter';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-premier-cream relative">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Trusted By Section (Auto-scrolling logos) */}
      <TrustedBy />

      {/* 3. Platform Features (Alternating Layouts) */}
      <PlatformFeatures />

      {/* 4. Meet Your Instructor (Raja Gulfam Spotlight) */}
      <MeetInstructor />

      {/* 5. Learning Journey (Horizontal Timeline) */}
      <LearningJourney />

      {/* 6. Student Success Numbers / Analytics */}
      <StudentSuccessNumbers />

      {/* 7. Latest News & Regulatory Alerts */}
      <LatestNews />

      {/* 8. Featured Masterclass Spotlight */}
      <PopularCourses />

      {/* 9. Student Testimonials (Auto-Carousel) */}
      <StudentTestimonials />

      {/* 10. Frequently Asked Questions (Accordion) */}
      <FAQSection />

      {/* 11. Call To Action Banner */}
      <CTABanner />
    </main>
  );
}
