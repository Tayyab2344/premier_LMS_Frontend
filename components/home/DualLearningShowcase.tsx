'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Film, MessageSquare, ShieldCheck, Clock, Download, Smartphone, FastForward, Play, FileSpreadsheet } from 'lucide-react';

export function DualLearningShowcase() {
  const [tab, setTab] = useState<'live' | 'ondemand'>('live');

  const liveFeatures = [
    { title: 'Interactive Real-Time Q&A', desc: 'Ask questions live. Licensed instructors resolve doubts during lectures.', icon: MessageSquare, tag: 'Live' },
    { title: 'Forensic Screen Protection', desc: 'Dynamic watermarking protects proprietary tax strategies and privacy.', icon: ShieldCheck, tag: 'Security' },
    { title: 'Automated CPE Attendance', desc: 'Active listening time is logged for instant CPE accreditation compliance.', icon: Clock, tag: 'NASBA' },
  ];

  const ondemandFeatures = [
    { title: 'Multi-Speed Playback', desc: 'Watch lectures at 0.75x to 2.0x speed with searchable transcripts.', icon: FastForward, tag: 'Flexible' },
    { title: 'Downloadable Worksheets', desc: 'Access editable Excel templates, tax sheets, and case study files.', icon: FileSpreadsheet, tag: 'Assets' },
    { title: 'Offline Mobile Sync', desc: 'Download modules to your phone and learn offline anywhere.', icon: Smartphone, tag: 'Mobile' },
  ];

  const features = tab === 'live' ? liveFeatures : ondemandFeatures;

  return (
    <section className="py-20 bg-white" id="dual-learning">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary text-xs font-semibold mb-4">
            <Video className="w-3.5 h-3.5" />
            Dual Learning
          </span>
          <h2 className="text-4xl sm:text-[48px] font-heading font-extrabold text-heading leading-[1.1] mb-3" style={{ letterSpacing: '-0.03em' }}>
            Learn Live or Master On-Demand
          </h2>
          <p className="text-muted text-base">Choose the learning mode that fits your schedule. Combine live masterclasses with rich on-demand video libraries.</p>

          {/* Tab Toggle */}
          <div className="inline-flex p-1 rounded-xl bg-surface-100 border border-border mt-6">
            {(['live', 'ondemand'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-5 py-2 rounded-lg text-sm font-body font-semibold transition-all ${tab === t ? 'text-white' : 'text-muted hover:text-heading'}`}
              >
                {tab === t && (
                  <motion.div
                    layoutId="tabIndicator"
                    className={`absolute inset-0 ${t === 'live' ? 'bg-primary' : 'bg-accent'} rounded-lg shadow-sm`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {t === 'live' ? <Video className="w-3.5 h-3.5" /> : <Film className="w-3.5 h-3.5" />}
                  {t === 'live' ? 'Live Virtual Classrooms' : 'On-Demand Library'}
                  {t === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-8 items-start"
          >
            {/* Feature Cards */}
            <div className="space-y-4">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className={`bg-white rounded-2xl p-5 border border-border hover:shadow-card transition-all`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${tab === 'live' ? 'bg-primary-50 text-primary' : 'bg-accent-50 text-accent-600'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-heading font-bold text-heading flex-1">{f.title}</h3>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${tab === 'live' ? 'bg-primary-50 text-primary' : 'bg-accent-50 text-accent-600'}`}>{f.tag}</span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed pl-11">{f.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Preview Panel */}
            <div className="bg-white rounded-2xl border border-border shadow-card p-5">
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                <div className="flex items-center gap-2">
                  {tab === 'live' && <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />}
                  <span className="text-sm font-bold text-heading">
                    {tab === 'live' ? 'Corporate Tax Reform Masterclass' : 'Financial Valuation & DCF Models'}
                  </span>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${tab === 'live' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-accent-50 text-accent-600 border border-accent-100'}`}>
                  {tab === 'live' ? '1,420 Participants' : '4K Ultra HD'}
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950">
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <div className="flex justify-between items-start">
                    <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-white font-medium flex items-center gap-2">
                      {tab === 'live' ? <ShieldCheck className="w-3.5 h-3.5 text-green-400" /> : <FileSpreadsheet className="w-3.5 h-3.5 text-green-400" />}
                      {tab === 'live' ? 'Watermark: USER-89240' : 'DCF_Model_2026.xlsx'}
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-white font-mono">
                      {tab === 'live' ? 'REC · 01:24:10' : 'Speed: 1.5x'}
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button className={`p-2 rounded-lg ${tab === 'live' ? 'bg-primary text-white' : 'bg-accent text-white'}`}>
                        <Play className="w-4 h-4 fill-white" />
                      </button>
                      <div>
                        <div className="text-xs font-bold text-white">{tab === 'live' ? 'Section 179 Expense Rules' : 'WACC Calculation & Beta'}</div>
                        <div className="text-[10px] text-white/60">{tab === 'live' ? 'Answering Student Question' : '18:42 / 45:00'}</div>
                      </div>
                    </div>
                    <button className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white ${tab === 'live' ? 'bg-primary/80' : 'bg-white/20'} flex items-center gap-1.5`}>
                      {tab === 'live' ? 'Raise Hand ✋' : <><Download className="w-3.5 h-3.5" /> Worksheet</>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
