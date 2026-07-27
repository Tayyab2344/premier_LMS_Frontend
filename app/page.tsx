'use client';

import React from 'react';
import { Hero } from '@/components/home/Hero';
import { TrustedBy } from '@/components/home/TrustedBy';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { PlatformFeatures } from '@/components/home/PlatformFeatures';
import { MeetInstructor } from '@/components/home/MeetInstructor';
import { LearningJourney } from '@/components/home/LearningJourney';
import { PopularCourses } from '@/components/home/PopularCourses';
import { StudentSuccessNumbers } from '@/components/home/StudentSuccessNumbers';
import { StudentTestimonials } from '@/components/home/StudentTestimonials';
import { LatestNews } from '@/components/home/LatestNews';
import { FAQSection } from '@/components/home/FAQSection';
import { CTABanner } from '@/components/home/CTABannerAndFooter';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white relative">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trusted By Section (Auto-scrolling logos) */}
      <TrustedBy />

      {/* 3. Why Choose Us (8 Benefit Cards) */}
      <WhyChooseUs />

      {/* 4. Platform Features (Alternating Layouts) */}
      <PlatformFeatures />

      {/* 5. Meet Your Instructor (Raja Gulfam Spotlight) */}
      <MeetInstructor />

      {/* 6. Learning Journey (Horizontal Timeline) */}
      <LearningJourney />

      {/* 7. Popular Courses Preview */}
      <PopularCourses />

      {/* 8. Student Success Numbers (Animated Counters) */}
      <StudentSuccessNumbers />

      {/* 9. Student Testimonials (Embla Auto-Carousel) */}
      <StudentTestimonials />

      {/* 10. Latest News Preview */}
      <LatestNews />

      {/* 11. Frequently Asked Questions (Accordion) */}
      <FAQSection />

      {/* 12. Call To Action Banner */}
      <CTABanner />
    </main>
  );
}
