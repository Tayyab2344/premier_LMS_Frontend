'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  UserPlus,
  Smartphone,
  Video,
  PlayCircle,
  FileText,
  FolderGit2,
  Award,
  TrendingUp,
  ChevronRight,
  ChevronLeft
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
  const [activeStep, setActiveStep] = useState(0);

  // Always auto-cycle through steps 01 -> 08 continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-premier-cream border-t border-border py-14 lg:py-20 relative" id="learning-methodology">
      <div className="section-container max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3.5">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-premier-green px-4 py-1.5 rounded-full bg-premier-green-50 border border-premier-green-100 inline-block">
            Step-by-Step Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-heading">
            Our Learning Methodology
          </h2>
          <p className="text-base sm:text-lg text-body leading-relaxed max-w-2xl mx-auto">
            A proven 8-step practical framework powered by our Student Mobile App to take you from foundational concepts to professional execution.
          </p>
        </div>

        {/* Desktop 8 Step Cards Single Row Grid */}
        <div className="hidden lg:grid grid-cols-8 gap-3.5 relative z-10 w-full mb-10">
          {steps.map((item, idx) => {
            const IconComp = item.icon;
            const isActive = activeStep === idx;

            return (
              <motion.div
                key={idx}
                onClick={() => setActiveStep(idx)}
                animate={
                  isActive
                    ? {
                      scale: 1.05,
                      y: -8,
                    }
                    : {
                      scale: 1,
                      y: 0,
                    }
                }
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className={`rounded-2xl p-4 border transition-all duration-300 relative flex flex-col justify-between cursor-pointer h-[200px] ${isActive
                    ? 'bg-white border-2 border-premier-green shadow-[0_18px_40px_rgba(22,78,54,0.24)] z-20'
                    : 'bg-premier-cream-dark/60 border-border/70 z-10 opacity-75 hover:opacity-100 hover:bg-white/90'
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className={`text-xs sm:text-sm font-mono font-extrabold transition-colors ${isActive ? 'text-premier-green font-extrabold' : 'text-slate-400'
                      }`}>
                      {item.step}
                    </span>
                    <div className={`w-8 h-8 rounded-lg ${item.color} text-white flex items-center justify-center shadow-sm transition-all duration-300 ${isActive ? 'scale-110 shadow-md ring-2 ring-white' : ''
                      }`}>
                      <IconComp className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <h3 className={`text-xs sm:text-sm font-heading font-bold transition-colors leading-tight mb-1.5 ${isActive ? 'text-premier-green font-extrabold' : 'text-slate-900'
                    }`}>
                    {item.title}
                  </h3>

                  <p className="text-[11px] text-slate-600 leading-relaxed font-body">
                    {item.desc}
                  </p>
                </div>

                {/* Progress Indicator line for active step */}
                <div className="mt-2 pt-2 border-t border-border/30">
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${isActive ? 'bg-premier-green w-full' : 'bg-transparent w-0'
                    }`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile / Tablet 2-Column Grid */}
        <div className="grid lg:hidden grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {steps.map((item, idx) => {
            const IconComp = item.icon;
            const isActive = activeStep === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`rounded-xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${isActive ? 'bg-white border-2 border-premier-green shadow-md' : 'bg-white border-border shadow-soft'
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-lg font-mono font-extrabold text-premier-green">
                      {item.step}
                    </span>
                    <div className={`w-8 h-8 rounded-lg ${item.color} text-white flex items-center justify-center`}>
                      <IconComp className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm font-heading font-bold text-heading mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner of Selected Step */}
        <div className="w-full rounded-2xl bg-[#0F3524] border border-[#164E36] px-7 py-5 text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-elevated">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-mono font-bold text-xl text-amber-300 shrink-0 border border-white/15">
              {steps[activeStep].step}
            </div>
            <div>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-amber-300 block mb-0.5">
                Phase Breakdown ({activeStep + 1} of {steps.length})
              </span>
              <h4 className="text-sm sm:text-base font-heading font-bold text-white leading-snug">
                <span className="text-amber-200">{steps[activeStep].title}:</span> {steps[activeStep].desc}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs sm:text-sm font-heading font-semibold transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
              className="px-4 py-2.5 rounded-xl bg-white text-[#164E36] hover:bg-emerald-50 text-xs sm:text-sm font-heading font-bold transition-colors flex items-center gap-1.5 shadow-sm"
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
