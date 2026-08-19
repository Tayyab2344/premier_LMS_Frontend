'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sparkles,
  MapPin,
  Calendar
} from 'lucide-react';

export interface JourneyMoment {
  id: string;
  number: string;
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
  description: string;
}

const JOURNEY_MOMENTS: JourneyMoment[] = [
  {
    id: 'moment-1',
    number: '01',
    title: 'Award Presentation',
    category: 'National Excellence Recognition',
    location: 'Islamabad, Pakistan',
    year: '2025',
    image: '/new-about/1.png',
    description: 'Honored with the National Excellence Award for pioneering practical tax law education and high-impact legal mentorship.'
  },
  {
    id: 'moment-2',
    number: '02',
    title: 'Conference Attendee',
    category: 'Annual Legal & Corporate Summit',
    location: 'Lahore Bar Council',
    year: '2025',
    image: '/new-about/2.png',
    description: 'Engaging with legal scholars and policy leaders on evolving corporate governance and SECP compliance frameworks.'
  },
  {
    id: 'moment-3',
    number: '03',
    title: 'Keynote Speaker',
    category: 'Corporate Taxation Masterclass',
    location: 'Corporate Advisory Hub',
    year: '2025',
    image: '/new-about/3.png',
    description: 'Delivering a keynote address on advanced tax planning, corporate restructuring, and strategic financial litigation.'
  },
  {
    id: 'moment-4',
    number: '04',
    title: 'Panelist',
    category: 'Taxation & Financial Policy Forum',
    location: 'National Press Center',
    year: '2024',
    image: '/new-about/4.png',
    description: 'Participating in expert panel discussions analyzing national tax policy reforms and Finance Act amendments.'
  },
  {
    id: 'moment-5',
    number: '05',
    title: 'Networking',
    category: 'High Court Bar Association Dialogue',
    location: 'High Court Chambers',
    year: '2024',
    image: '/new-about/5.png',
    description: 'Collaborating with fellow Advocates, legal scholars, and corporate advisors to expand professional mentorship.'
  },
  {
    id: 'moment-6',
    number: '06',
    title: 'Research Presentation',
    category: 'Forensic Accounting & Audit Seminar',
    location: 'Financial Analytics Forum',
    year: '2024',
    image: '/new-about/6.png',
    description: 'Presenting empirical case studies on corporate audit trails, forensic investigation, and anti-money laundering compliance.'
  },
  {
    id: 'moment-7',
    number: '07',
    title: 'Technology Exhibition',
    category: 'EdTech & Modern LMS Showcase',
    location: 'Digital Learning Innovation Hub',
    year: '2023',
    image: '/new-about/7.png',
    description: 'Demonstrating cutting-edge digital learning platforms designed for practical tax and accounting certifications.'
  },
  {
    id: 'moment-8',
    number: '08',
    title: 'Conference Group Photo',
    category: 'National Tax Bar Leadership Gathering',
    location: 'Grand Convention Center',
    year: '2023',
    image: '/new-about/8.png',
    description: 'Celebrating collective achievements and academic milestones alongside distinguished legal practitioners and graduates.'
  }
];

export function ProfessionalJourney() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredTimelineIdx, setHoveredTimelineIdx] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const totalMoments = JOURNEY_MOMENTS.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalMoments);
  }, [totalMoments]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalMoments) % totalMoments);
  }, [totalMoments]);

  const handleSelect = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay timer (4 seconds)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Keyboard Navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      handlePrev();
    }
  };

  const activeMoment = JOURNEY_MOMENTS[currentIndex];

  // Helper to calculate stack card parameters for visible stack depth (up to 4 cards visible)
  const getStackStyle = (cardIndex: number) => {
    const offset = (cardIndex - currentIndex + totalMoments) % totalMoments;

    if (offset === 0) {
      // Top active photo
      return {
        zIndex: 40,
        scale: 1,
        y: 0,
        x: 0,
        rotate: -1.5,
        opacity: 1,
        filter: 'brightness(1)',
        shadow: 'shadow-2xl shadow-slate-400/50 ring-1 ring-slate-200'
      };
    } else if (offset === 1) {
      // 2nd photo in stack
      return {
        zIndex: 30,
        scale: 0.94,
        y: 18,
        x: 12,
        rotate: 3.5,
        opacity: 0.9,
        filter: 'brightness(0.95)',
        shadow: 'shadow-xl shadow-slate-300/50'
      };
    } else if (offset === 2) {
      // 3rd photo in stack
      return {
        zIndex: 20,
        scale: 0.88,
        y: 34,
        x: -10,
        rotate: -3.5,
        opacity: 0.75,
        filter: 'brightness(0.9)',
        shadow: 'shadow-lg shadow-slate-300/40'
      };
    } else if (offset === 3) {
      // 4th photo in stack
      return {
        zIndex: 10,
        scale: 0.82,
        y: 48,
        x: 16,
        rotate: 5,
        opacity: 0.55,
        filter: 'brightness(0.85)',
        shadow: 'shadow-md shadow-slate-200/40'
      };
    } else {
      // Deep background cards
      return {
        zIndex: 0,
        scale: 0.75,
        y: 60,
        x: 0,
        rotate: 0,
        opacity: 0,
        filter: 'brightness(0.8)',
        shadow: 'shadow-none'
      };
    }
  };

  return (
    <section
      ref={sectionRef}
      id="professional-journey"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Professional Journey Section"
      style={{ backgroundColor: '#F8F6F0', color: '#111A15' }}
      className="py-16 lg:py-24 bg-premier-cream text-heading relative overflow-hidden border-t border-b border-border focus:outline-none select-none"
    >
      {/* Light Theme Soft Ambient Background Lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-premier-green/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-amber-500/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-premier-green-50 border border-premier-green-200 shadow-xs">
            <Sparkles className="w-4 h-4 text-premier-green" style={{ color: '#003320' }} />
            <span className="text-xs font-mono font-bold tracking-widest text-premier-green uppercase" style={{ color: '#003320' }}>
              PROFESSIONAL JOURNEY
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-heading tracking-tight leading-tight" style={{ color: '#111A15' }}>
            Moments That Shaped the Journey
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-body leading-relaxed max-w-2xl mx-auto" style={{ color: '#475569' }}>
            A selection of conferences, presentations, collaborations and professional milestones.
          </p>
        </div>

        {/* Main Grid: Info (Left) & 3D Photo Stack (Right) */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[460px]">
          
          {/* LEFT COLUMN: Active Photograph Information & Typography (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              
              {/* Counter Badge */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3" style={{ borderColor: '#e2e8f0' }}>
                <span className="text-3xl font-mono font-extrabold tracking-widest text-premier-green" style={{ color: '#003320' }}>
                  {activeMoment.number} <span className="text-slate-400 font-normal text-lg" style={{ color: '#94a3b8' }}>/ {String(totalMoments).padStart(2, '0')}</span>
                </span>
                
                <div className="flex items-center gap-2 text-xs font-mono text-slate-700 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-soft" style={{ backgroundColor: '#ffffff', color: '#334155', borderColor: '#e2e8f0' }}>
                  <Calendar className="w-3.5 h-3.5 text-premier-gold" style={{ color: '#CA9208' }} />
                  <span>{activeMoment.year}</span>
                </div>
              </div>

              {/* Animated Text Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMoment.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-3"
                >
                  <div className="inline-block px-3 py-1.5 rounded-lg bg-premier-green-50 border border-premier-green-200 text-xs font-mono font-bold text-premier-green uppercase tracking-wider shadow-xs" style={{ backgroundColor: '#e6f0eb', color: '#003320', borderColor: '#b3d1c4' }}>
                    {activeMoment.category}
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-heading leading-tight" style={{ color: '#111A15' }}>
                    {activeMoment.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-body" style={{ color: '#475569' }}>
                    <MapPin className="w-4 h-4 text-premier-green shrink-0" style={{ color: '#003320' }} />
                    <span>{activeMoment.location}</span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 font-body leading-relaxed pt-2" style={{ color: '#334155' }}>
                    {activeMoment.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick Play/Pause & Step Controls */}
            <div className="flex items-center gap-3 pt-5 border-t border-slate-200" style={{ borderColor: '#e2e8f0' }}>
              <button
                onClick={handlePrev}
                aria-label="Previous photograph"
                className="w-11 h-11 rounded-full bg-white border border-slate-200 hover:border-premier-green hover:bg-slate-50 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-all shadow-soft active:scale-95 cursor-pointer"
                style={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#1e293b' }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next photograph"
                className="w-11 h-11 rounded-full bg-white border border-slate-200 hover:border-premier-green hover:bg-slate-50 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-all shadow-soft active:scale-95 cursor-pointer"
                style={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#1e293b' }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
                className="px-4 h-11 rounded-full bg-white border border-slate-200 hover:border-premier-green text-xs font-mono font-bold text-slate-700 flex items-center gap-2 transition-all hover:bg-slate-50 cursor-pointer shadow-soft"
                style={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#1e293b' }}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 text-premier-green" style={{ color: '#003320' }} /> : <Pause className="w-3.5 h-3.5 text-premier-gold" style={{ color: '#CA9208' }} />}
                <span>{isPaused ? 'PAUSED' : 'AUTOPLAY'}</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Photograph Stack Experience (7 Columns) */}
          <div className="lg:col-span-7 flex justify-center items-center order-1 lg:order-2 py-6">
            <div
              className="relative w-full max-w-[460px] sm:max-w-[500px] aspect-[4/3] flex items-center justify-center cursor-pointer select-none"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {JOURNEY_MOMENTS.map((moment, idx) => {
                const stackStyle = getStackStyle(idx);

                return (
                  <motion.div
                    key={moment.id}
                    layout
                    initial={false}
                    animate={
                      shouldReduceMotion
                        ? { opacity: idx === currentIndex ? 1 : 0, zIndex: stackStyle.zIndex }
                        : {
                            scale: stackStyle.scale,
                            y: stackStyle.y,
                            x: stackStyle.x,
                            rotate: stackStyle.rotate,
                            opacity: stackStyle.opacity,
                            zIndex: stackStyle.zIndex,
                            filter: stackStyle.filter
                          }
                    }
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 24,
                      mass: 0.8
                    }}
                    drag={idx === currentIndex ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > 80) {
                        handlePrev();
                      } else if (info.offset.x < -80) {
                        handleNext();
                      }
                    }}
                    onClick={() => {
                      if (idx !== currentIndex) {
                        handleSelect(idx);
                      }
                    }}
                    className={`absolute inset-0 rounded-2xl p-3.5 bg-white text-slate-900 border border-slate-200 ${stackStyle.shadow} transition-shadow duration-300 group`}
                    style={{
                      transformOrigin: 'bottom center',
                      touchAction: 'none'
                    }}
                  >
                    {/* Realistic Photo Frame & Image */}
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      <Image
                        src={moment.image}
                        alt={`Photo ${moment.number}: ${moment.title}`}
                        fill
                        priority={idx === currentIndex}
                        className="object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                        sizes="(max-width: 768px) 100vw, 500px"
                      />

                      {/* Photo Vignette & Soft Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/5 pointer-events-none" />

                      {/* Top Photo Corner Tag */}
                      {idx === currentIndex && (
                        <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-mono font-bold border border-white/20 shadow-md">
                          {moment.number} / {String(totalMoments).padStart(2, '0')}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* BOTTOM TIMELINE: 01 ━━━ 02 ━━━ 03 ━━━ 04 ━━━ 05 ━━━ 06 ━━━ 07 ━━━ 08 */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-slate-200" style={{ borderColor: '#e2e8f0' }}>
          <div className="relative max-w-4xl mx-auto overflow-x-auto pb-4 no-scrollbar">
            
            <div className="flex items-center justify-between min-w-[640px] px-4">
              {JOURNEY_MOMENTS.map((moment, idx) => {
                const isActive = idx === currentIndex;
                const isHovered = hoveredTimelineIdx === idx;

                return (
                  <React.Fragment key={moment.id}>
                    {/* Timeline Item (Number + Tooltip) */}
                    <div className="relative flex flex-col items-center">
                      
                      {/* Tooltip Popover on Hover */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute -top-12 z-50 whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-mono border border-slate-700 shadow-xl pointer-events-none flex flex-col items-center"
                            style={{ backgroundColor: '#0f172a', color: '#ffffff', borderColor: '#334155' }}
                          >
                            <span className="text-emerald-400 font-bold" style={{ color: '#34d399' }}>{moment.number}</span>
                            <span className="text-slate-200 font-sans" style={{ color: '#e2e8f0' }}>{moment.title}</span>
                            <div className="w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-slate-700 absolute -bottom-1" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Number Trigger Button */}
                      <button
                        onClick={() => handleSelect(idx)}
                        onMouseEnter={() => setHoveredTimelineIdx(idx)}
                        onMouseLeave={() => setHoveredTimelineIdx(null)}
                        aria-label={`Jump to photograph ${moment.number}: ${moment.title}`}
                        className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full font-mono text-sm font-bold transition-all duration-300 cursor-pointer ${
                          isActive
                            ? 'bg-premier-green text-white scale-110 shadow-md shadow-emerald-900/20 ring-4 ring-emerald-600/20'
                            : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
                        }`}
                        style={isActive ? { backgroundColor: '#003320', color: '#ffffff' } : { backgroundColor: '#ffffff', color: '#334155', borderColor: '#cbd5e1' }}
                      >
                        {moment.number}
                      </button>
                      
                      {/* Active Indicator Title Label underneath */}
                      <span
                        className={`text-[11px] font-mono mt-2 transition-colors truncate max-w-[84px] text-center ${
                          isActive ? 'text-premier-green font-bold' : 'text-slate-500'
                        }`}
                        style={{ color: isActive ? '#003320' : '#64748b' }}
                      >
                        {moment.title.split(' ')[0]}
                      </span>
                    </div>

                    {/* Connecting Line Segment between numbers */}
                    {idx < totalMoments - 1 && (
                      <div className="flex-1 h-[2px] mx-2 relative bg-slate-200 rounded-full overflow-hidden" style={{ backgroundColor: '#e2e8f0' }}>
                        <motion.div
                          initial={false}
                          animate={{
                            width: idx < currentIndex ? '100%' : '0%'
                          }}
                          transition={{ duration: 0.4 }}
                          className="h-full bg-premier-green"
                          style={{ backgroundColor: '#003320' }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
