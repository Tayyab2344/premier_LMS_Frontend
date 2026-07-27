'use client';

import React, { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';

const steps = [
  { step: '01', title: 'Enroll', desc: 'Select your tax or legal masterclass and create your account.', icon: UserPlus, color: 'bg-blue-500' },
  { step: '02', title: 'Download App', desc: 'Install Premier LMS Mobile App on iOS or Android for 24/7 access.', icon: Smartphone, color: 'bg-indigo-500' },
  { step: '03', title: 'Live Classes', desc: 'Participate in interactive live streams with Raja Gulfam.', icon: Video, color: 'bg-purple-500' },
  { step: '04', title: 'Watch Recordings', desc: 'Revisit HD video lectures and portal walk-throughs anytime.', icon: PlayCircle, color: 'bg-pink-500' },
  { step: '05', title: 'Portal Demos', desc: 'Follow real FBR IRIS, SECP & Weboc portal step-by-step guides.', icon: FileText, color: 'bg-rose-500' },
  { step: '06', title: 'Solve Tax Cases', desc: 'Practice wealth reconciliations, tax returns & legal drafts.', icon: FolderGit2, color: 'bg-amber-500' },
  { step: '07', title: 'Earn Diploma', desc: 'Receive your accredited digital certificate upon completion.', icon: Award, color: 'bg-emerald-500' },
  { step: '08', title: 'Advance Career', desc: 'Establish your independent practice or advance in corporate roles.', icon: TrendingUp, color: 'bg-cyan-500' },
];

export function LearningMethodology() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="section-container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-primary px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 inline-block">
            Step-by-Step Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-heading">
            Our Learning Methodology
          </h2>
          <p className="text-base text-body leading-relaxed">
            A proven 8-step practical framework powered by our Student Mobile App to take you from foundational concepts to professional execution.
          </p>
        </div>

        {/* Timeline Desktop Grid / Mobile Stepper */}
        <div className="relative">
          {/* Connecting Line behind items on Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 relative z-10">
            {steps.map((item, idx) => {
              const IconComp = item.icon;
              const isActive = activeStep === idx;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border flex flex-col justify-between ${
                    isActive
                      ? 'bg-white border-primary shadow-card-hover scale-105 z-20'
                      : 'bg-surface-secondary border-border/80 hover:bg-white hover:border-primary/40 shadow-soft'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-extrabold text-primary">
                        {item.step}
                      </span>
                      <div className={`w-8 h-8 rounded-xl ${item.color} text-white flex items-center justify-center shadow-sm`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-sm font-heading font-bold text-heading leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-[11px] text-body leading-relaxed mt-3 pt-3 border-t border-border/50">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Highlight Banner of Selected Step */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-primary-900 to-primary p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-elevated">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-mono font-bold text-xl text-amber-300 shrink-0">
              {steps[activeStep].step}
            </div>
            <div>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-amber-300">
                Phase Breakdown
              </span>
              <h4 className="text-lg font-heading font-bold text-white">
                {steps[activeStep].title}: {steps[activeStep].desc}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-heading font-semibold transition-colors"
            >
              Previous Step
            </button>
            <button
              onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
              className="px-4 py-2 rounded-xl bg-white text-primary hover:bg-primary-50 text-xs font-heading font-semibold transition-colors flex items-center gap-1"
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
