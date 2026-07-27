import React from 'react';
import { AboutHero } from '@/components/about/AboutHero';
import { AcademyStory } from '@/components/about/AcademyStory';
import { VisionSection } from '@/components/about/VisionSection';
import { MissionSection } from '@/components/about/MissionSection';
import { CoreValues } from '@/components/about/CoreValues';
import { MeetFounder } from '@/components/about/MeetFounder';
import { TeachingPhilosophy } from '@/components/about/TeachingPhilosophy';
import { WhyStudentsTrustUs } from '@/components/about/WhyStudentsTrustUs';
import { LearningMethodology } from '@/components/about/LearningMethodology';
import { StudentImpactStats } from '@/components/about/StudentImpactStats';
import { TestimonialsCarousel } from '@/components/about/TestimonialsCarousel';
import { CommunitySection } from '@/components/about/CommunitySection';
import { FutureGoalsRoadmap } from '@/components/about/FutureGoalsRoadmap';
import { AboutCTA } from '@/components/about/AboutCTA';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-heading selection:bg-primary-100 selection:text-primary-900 overflow-x-hidden">
        {/* 1. Hero Section */}
        <AboutHero />

        {/* 2. Academy Story */}
        <AcademyStory />

        {/* 3. Our Vision */}
        <VisionSection />

        {/* 4. Our Mission */}
        <MissionSection />

        {/* 5. Core Values */}
        <CoreValues />

        {/* 6. Meet the Founder */}
        <MeetFounder />

        {/* 7. Teaching Philosophy */}
        <TeachingPhilosophy />

        {/* 8. Why Students Trust Us */}
        <WhyStudentsTrustUs />

        {/* 9. Learning Methodology (8-step interactive timeline) */}
        <LearningMethodology />

        {/* 10. Student Impact (CountUp stats) */}
        <StudentImpactStats />

        {/* 11. Testimonials Preview (Embla slider) */}
        <TestimonialsCarousel />

        {/* 12. Community Section */}
        <CommunitySection />

        {/* 13. Future Goals Roadmap */}
        <FutureGoalsRoadmap />

        {/* 14. Call To Action Banner */}
        <AboutCTA />
      </main>
  );
}
