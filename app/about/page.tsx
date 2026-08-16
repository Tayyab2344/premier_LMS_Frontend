import React from 'react';
import { AboutHero } from '@/components/about/AboutHero';
import { AcademyStory } from '@/components/about/AcademyStory';
import { VisionMissionValuesHub } from '@/components/about/VisionMissionValuesHub';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-premier-cream text-heading selection:bg-premier-green-100 selection:text-premier-green-900 overflow-x-hidden">
      {/* 1. Hero Section */}
      <AboutHero />

      {/* 2. Academy Story */}
      <AcademyStory />

      {/* 3. Vision, Mission & Core Values Hub */}
      <VisionMissionValuesHub />
    </main>
  );
}
