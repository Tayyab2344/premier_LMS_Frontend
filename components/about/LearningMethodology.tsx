'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  UserPlus,
  Smartphone,
  Video,
  PlayCircle,
  FileText,
  FolderGit2,
  Award,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

const steps = [
  { step: '01', title: 'Enroll', desc: 'Select your tax or legal masterclass and create your account.', icon: UserPlus, color: 'bg-blue-500' },
  { step: '02', title: 'Download App', desc: 'Install Premier LMS Mobile App on iOS or Android for 24/7 access.', icon: Smartphone, color: 'bg-indigo-500' },
  { step: '03', title: 'Live Classes', desc: 'Participate in interactive live streams with Raja Gulfam.', icon: Video, color: 'bg-purple-500' },
  { step: '04', title: 'Watch Recordings', desc: 'Revisit HD video lectures and portal walk-throughs anytime.', icon: PlayCircle, color: 'bg-pink-500' },
  { step: '05', title: 'Portal Demos', desc: 'Follow real FBR IRIS, SECP & Weboc portal step-by-step guides.', icon: FileText, color: 'bg-rose-500' },
  { step: '06', title: 'Solve Tax Cases', desc: 'Practice wealth reconciliations, tax returns & legal drafts.', icon: FolderGit2, color: 'bg-amber-500' },
  { step: '07', title: 'Earn Diploma', desc: 'Receive your accredited digital certificate upon completion.', icon: Award, color: 'bg-premier-green' },
  { step: '08', title: 'Advance Career', desc: 'Establish your independent practice or advance in corporate roles.', icon: TrendingUp, color: 'bg-cyan-500' },
];

export function LearningMethodology() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.6', 'end 0.4'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const stepCount = steps.length;
    const clampedProgress = Math.max(0, Math.min(0.999, latest));
    const activeIdx = Math.floor(clampedProgress * stepCount);
    setActiveStep(activeIdx);
  });

  return (
    <section ref={sectionRef} className="section-padding bg-premier-cream relative overflow-hidden">
      <div className="section-container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-premier-green px-3.5 py-1.5 rounded-full bg-premier-green-50 border border-premier-green-100 inline-block">
            Step-by-Step Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-heading">
            Our Learning Methodology
          </h2>
          <p className="text-base text-body leading-relaxed">
            A proven 8-step practical framework powered by our Student Mobile App to take you from foundational concepts to professional execution.
          </p>
        </div>

        {/* Timeline Desktop Grid / Stepper with Smooth Scroll Animation */}
        <div className="relative py-4">
          {/* Connecting Line behind items on Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 relative z-10">
            {steps.map((item, idx) => {
              const IconComp = item.icon;
              const isActive = activeStep === idx;

              return (
                <motion.div
                  key={idx}
                  animate={
                    isActive
                      ? { scale: 1.05, y: -10 }
                      : { scale: 1, y: 0 }
                  }
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`rounded-2xl p-4 transition-colors duration-300 border flex flex-col justify-between group relative ${
                    isActive
                      ? 'bg-white border-2 border-premier-green shadow-[0_15px_35px_rgba(22,78,54,0.22)] z-20'
                      : 'bg-white border-border/80 opacity-80 z-10'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-extrabold transition-colors ${
                        isActive ? 'text-premier-green font-bold text-sm' : 'text-slate-500'
                      }`}>
                        {item.step}
                      </span>
                      <div className={`w-8 h-8 rounded-xl ${item.color} text-white flex items-center justify-center shadow-sm transition-all duration-300 ${
                        isActive ? 'scale-110 shadow-md ring-2 ring-white' : ''
                      }`}>
                        <IconComp className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <h3 className={`text-sm font-heading font-bold transition-colors leading-tight ${
                      isActive ? 'text-premier-green font-extrabold' : 'text-slate-900'
                    }`}>
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed mt-3 pt-3 border-t border-border/50 font-body">
                    {item.desc}
                  </p>

                  {/* Active Step Indicator Bar */}
                  <div className="mt-3 pt-2 border-t border-border/30">
                    <div className={`h-1 rounded-full transition-all duration-500 ${
                      isActive ? 'bg-premier-green w-full' : 'bg-transparent w-0'
                    }`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Highlight Banner of Selected Step - 100% High Contrast Visibility */}
        <div className="mt-12 rounded-2xl bg-[#0F3524] border border-[#164E36] p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-elevated">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-mono font-bold text-xl text-amber-300 shrink-0 border border-white/15">
              {steps[activeStep].step}
            </div>
            <div>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-amber-300">
                Phase Breakdown
              </span>
              <h4 className="text-base sm:text-lg font-heading font-bold text-white leading-snug">
                <span className="text-amber-200">{steps[activeStep].title}:</span> {steps[activeStep].desc}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-heading font-semibold transition-colors"
            >
              Previous Step
            </button>
            <button
              onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
              className="px-4 py-2.5 rounded-xl bg-white text-[#164E36] hover:bg-emerald-50 text-xs font-heading font-bold transition-colors flex items-center gap-1 shadow-sm"
            >
              Next Step
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
