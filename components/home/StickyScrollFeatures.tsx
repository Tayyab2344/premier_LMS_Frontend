'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

export interface FeatureItem {
  id: string;
  subtitle?: string;
  title: string;
  desc?: string;
  bullets?: string[];
  badge?: string;
  icon?: React.ElementType;
  imageSrc: string;
  imageBg?: string;
}

interface StickyScrollFeaturesProps {
  features: FeatureItem[];
  autoPlayInterval?: number; // default 4500ms
}

export function StickyScrollFeatures({
  features,
  autoPlayInterval = 4500,
}: StickyScrollFeaturesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Infinite automatic slide loop (0 -> 1 -> 2 -> 0 -> 1 -> 2 ...)
  useEffect(() => {
    if (isHovered || shouldReduceMotion || !features.length) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [features.length, autoPlayInterval, isHovered, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mobile Stacked Layout (< lg) */}
      <div className="lg:hidden space-y-10">
        {features.map((feature, idx) => {
          return (
            <div
              key={feature.id || idx}
              className="space-y-6 bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-border/80 shadow-sm"
            >
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-premier-green leading-tight">
                  {feature.title}
                </h3>
                {feature.desc && (
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-body">
                    {feature.desc}
                  </p>
                )}

                {/* Bullets List */}
                {feature.bullets && feature.bullets.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-slate-200/80 border-l-4 border-l-premier-green shadow-sm space-y-3.5">
                    {feature.bullets.map((bullet, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200/60 shadow-xs">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 font-body">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Image */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
                <Image
                  src={feature.imageSrc}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={idx === 0}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  className="object-contain object-center"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Automatic Scrollytelling Layout (>= lg) */}
      <div className="hidden lg:grid grid-cols-12 gap-12 lg:gap-16 items-center relative">
        {/* Left Interactive Automatic Text Column */}
        <div className="col-span-6 space-y-4">
          {features.map((feature, idx) => {
            const isActive = activeIndex === idx;

            return (
              <motion.div
                key={feature.id || idx}
                onClick={() => setActiveIndex(idx)}
                layout
                initial={false}
                animate={{
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.45)',
                  borderColor: isActive ? 'rgba(22, 78, 54, 0.3)' : 'rgba(226, 232, 240, 0.7)',
                  opacity: isActive ? 1 : 0.65,
                  scale: isActive ? 1 : 0.98,
                }}
                whileHover={{ opacity: isActive ? 1 : 0.9, scale: isActive ? 1 : 0.99 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`cursor-pointer p-6 rounded-3xl border shadow-sm ${
                  isActive ? 'shadow-elevated border-l-4 border-l-premier-green' : 'border-l-transparent'
                }`}
              >
                <div className="space-y-3">
                  {/* Heading */}
                  <h3
                    className={`text-xl xl:text-2xl font-heading font-extrabold transition-colors duration-300 leading-tight ${
                      isActive ? 'text-premier-green' : 'text-slate-700'
                    }`}
                  >
                    {feature.title}
                  </h3>

                  {feature.desc && (
                    <p className="text-slate-600 text-sm leading-relaxed font-body">
                      {feature.desc}
                    </p>
                  )}

                  {/* Smooth Bullet List Expansion */}
                  <AnimatePresence initial={false}>
                    {feature.bullets && feature.bullets.length > 0 && isActive && (
                      <motion.div
                        key={`bullets-${idx}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden pt-2 space-y-2.5"
                      >
                        {feature.bullets.map((bullet, j) => (
                          <div key={j} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200/60 shadow-2xs">
                              <CheckCircle className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-800 font-body">
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Ultra-smooth Progress Line for Active Item */}
                  {isActive && !shouldReduceMotion && (
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-3">
                      <motion.div
                        key={`progress-${activeIndex}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{
                          duration: autoPlayInterval / 1000,
                          ease: 'linear',
                        }}
                        className="h-full bg-premier-green rounded-full"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Sticky Image Stage Container */}
        <div className="col-span-6 h-[480px] xl:h-[520px] w-full self-center flex items-center justify-center">
          <div className="relative w-full h-full overflow-hidden rounded-3xl">
            {features.map((feature, idx) => {
              const isActive = activeIndex === idx;

              return (
                <motion.div
                  key={feature.id || idx}
                  initial={false}
                  animate={
                    shouldReduceMotion
                      ? { opacity: isActive ? 1 : 0 }
                      : isActive
                      ? {
                          x: [180, 45, 0],
                          y: [140, 15, 0],
                          rotate: [12, 3, 0],
                          opacity: [0, 0.85, 1],
                          scale: [0.9, 0.97, 1],
                        }
                      : {
                          x: [0, 45, 180],
                          y: [0, 15, 140],
                          rotate: [0, 3, 12],
                          opacity: [1, 0.4, 0],
                          scale: [1, 0.97, 0.9],
                        }
                  }
                  transition={{
                    duration: 0.85,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`absolute inset-0 w-full h-full flex items-center justify-center ${
                    isActive ? 'pointer-events-auto z-10' : 'pointer-events-none z-0'
                  }`}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={feature.imageSrc}
                      alt={feature.title}
                      fill
                      sizes="(max-width: 1280px) 50vw, 600px"
                      priority={idx === 0}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      className="object-contain object-center drop-shadow-md"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
