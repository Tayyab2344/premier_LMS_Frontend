import React from 'react';
import { AboutHero } from '@/components/about/AboutHero';
import { AcademyStory } from '@/components/about/AcademyStory';
import { VisionMissionValuesHub } from '@/components/about/VisionMissionValuesHub';
import { MeetFounder } from '@/components/about/MeetFounder';
import { TeachingPhilosophy } from '@/components/about/TeachingPhilosophy';
import { WhyStudentsTrustUs } from '@/components/about/WhyStudentsTrustUs';
import { LearningMethodology } from '@/components/about/LearningMethodology';
import { AboutCTA } from '@/components/about/AboutCTA';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-premier-cream text-heading selection:bg-premier-green-100 selection:text-premier-green-900 overflow-x-hidden">
      {/* 1. Hero Section */}
      <AboutHero />

      {/* 2. Academy Story */}
      <AcademyStory />

      {/* 3. Vision, Mission & Core Values Hub */}
      <VisionMissionValuesHub />

      {/* 4. Meet the Founder */}
      <MeetFounder />

      {/* 5. Teaching Philosophy */}
      <TeachingPhilosophy />

      {/* 6. Why Students Trust Us */}
      <WhyStudentsTrustUs />

      {/* 7. Learning Methodology (8-step interactive timeline) */}
      <LearningMethodology />

      {/* 8. Call To Action Banner */}
      <AboutCTA />
    </main>
  );
}
