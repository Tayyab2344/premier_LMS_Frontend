'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Video,
  FileSpreadsheet,
  Award,
  Tv,
  UserCheck,
  Smartphone,
  Target,
  Users,
} from 'lucide-react';

const pathSteps = [
  {
    step: 1,
    title: 'Live Interactive Masterclasses',
    icon: Video,
    tag: 'Real-Time Q&A',
    isLeft: true,
  },
  {
    step: 2,
    title: 'FBR & SECP Portal Demos',
    icon: FileSpreadsheet,
    tag: 'IRIS & SECP Demos',
    isLeft: false,
  },
  {
    step: 3,
    title: 'Accredited Certificates',
    icon: Award,
    tag: 'Verified Credentials',
    isLeft: true,
  },
  {
    step: 4,
    title: 'HD Recorded Archives',
    icon: Tv,
    tag: '4K Ultra HD',
    isLeft: false,
  },
  {
    step: 5,
    title: 'Expert Lead Instructor',
    icon: UserCheck,
    tag: 'Raja Gulfam',
    isLeft: true,
  },
  {
    step: 6,
    title: '2 Months Post Access',
    icon: Smartphone,
    tag: 'Student Mobile App',
    isLeft: false,
  },
  {
    step: 7,
    title: 'Practical Hands-on Learning',
    icon: Target,
    tag: 'Financial Models',
    isLeft: true,
  },
  {
    step: 8,
    title: 'Vibrant Peer Network',
    icon: Users,
    tag: '25,000+ Alumni',
    isLeft: false,
  },
];

function PathStepItem({
  item,
  idx,
  total,
  scrollYProgress,
}: {
  item: (typeof pathSteps)[0];
  idx: number;
  total: number;
  scrollYProgress: any;
}) {
  const stepStart = (idx / total) * 0.75;
  const stepEnd = stepStart + 0.12;

  const opacity = useTransform(scrollYProgress, [stepStart, stepEnd], [0, 1]);
  const scale = useTransform(scrollYProgress, [stepStart, stepEnd], [0.82, 1]);
  const x = useTransform(
    scrollYProgress,
    [stepStart, stepEnd],
    [item.isLeft ? -50 : 50, 0]
  );

  const IconComponent = item.icon;

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center">
      <div className={`pl-10 md:pl-0 ${item.isLeft ? 'md:pr-8' : 'md:col-start-2 md:pl-8'}`}>
        <motion.div
          style={{ opacity, scale, x }}
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-white/95 backdrop-blur-md rounded-full border border-slate-200/90 shadow-sm hover:shadow-md hover:border-premier-green/40 transition-all duration-300 flex items-center p-1.5 pr-6 h-14 sm:h-16 gap-3.5 sm:gap-4 group cursor-pointer"
        >
          {/* Green circle on left side with step number */}
          <div className="h-full aspect-square bg-premier-green text-white font-heading font-extrabold text-sm sm:text-base rounded-full flex items-center justify-center shrink-0 shadow-inner">
            {item.step}
          </div>

          {/* Icon & Full Heading Text (No sub-text tag, no truncation) */}
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <IconComponent className="w-4 sm:w-5 h-4 sm:h-5 text-premier-green shrink-0" />
            <h3 className="text-xs sm:text-sm md:text-base font-heading font-bold text-slate-900 group-hover:text-premier-green transition-colors leading-snug">
              {item.title}
            </h3>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 35%'],
  });

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50/80 border-t border-border relative overflow-hidden"
      id="why-choose-us"
    >
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 dot-pattern opacity-[0.03] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">


          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-5xl font-heading font-extrabold text-heading leading-[1.15]"
            style={{ letterSpacing: '-0.03em' }}
          >
            Everything You Need To Master Your Craft
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.1 }}
            className="text-body text-base sm:text-lg max-w-2xl mx-auto"
          >
            A guided step-by-step pathway built to bridge theoretical concepts with real-world application.
          </motion.p>
        </div>

        {/* Zig-Zagged Path Layout with Compact Pills */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Animated Path Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-slate-200/80 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
              className="w-full h-full bg-gradient-to-b from-premier-green via-emerald-500 to-premier-green"
            />
          </div>

          {/* Mobile Animated Left Path Line */}
          <div className="md:hidden absolute left-5 top-4 bottom-4 w-1 bg-slate-200/80 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
              className="w-full h-full bg-gradient-to-b from-premier-green via-emerald-500 to-premier-green"
            />
          </div>

          <div className="space-y-5 md:space-y-6">
            {pathSteps.map((item, idx) => (
              <PathStepItem
                key={item.step}
                item={item}
                idx={idx}
                total={pathSteps.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}






