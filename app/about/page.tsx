import React from 'react';
import { AcademyStory } from '@/components/about/AcademyStory';
import { VisionMissionValuesHub } from '@/components/about/VisionMissionValuesHub';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-premier-cream text-heading selection:bg-premier-green-100 selection:text-premier-green-900 overflow-x-hidden">
      {/* Academy Story (First Section) */}
      <AcademyStory isFirstSection />

      {/* Vision, Mission & Core Values Hub */}
      <VisionMissionValuesHub />
    </main>
  );
}
