'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Users,
  Share2,
  BookOpen,
  Briefcase,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const communityFeatures = [
  {
    icon: MessageSquare,
    title: 'Discussion Forums',
    desc: 'Ask complex tax and corporate law questions, start discussions, and solve case studies together.',
    color: 'bg-blue-500',
  },
  {
    icon: Users,
    title: 'Direct Mentorship',
    desc: 'Receive direct answers and legal advice from Raja Gulfam during office hours and live streams.',
    color: 'bg-indigo-500',
  },
  {
    icon: Share2,
    title: 'Professional Networking',
    desc: 'Connect with fellow accountants, corporate lawyers, tax attorneys, and CFOs across Pakistan.',
    color: 'bg-purple-500',
  },
  {
    icon: BookOpen,
    title: 'Peer Learning',
    desc: 'Work in small study groups, discuss practical case studies, and exchange reference formats.',
    color: 'bg-emerald-500',
  },
  {
    icon: Sparkles,
    title: 'Knowledge Sharing',
    desc: 'Access exclusive legal briefs, FBR circular updates, and corporate amendment summaries.',
    color: 'bg-amber-500',
  },
  {
    icon: Briefcase,
    title: 'Career Support',
    desc: 'Get access to law firm partnerships, corporate accounting internships, and job referrals.',
    color: 'bg-rose-500',
  },
];

export function CommunitySection() {
  return (
    <section className="section-padding bg-surface-secondary border-b border-border relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-primary px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 inline-block">
              Collaborative Growth
            </span>

            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-heading leading-tight">
              Join Our Learning Community
            </h2>

            <p className="text-base text-body leading-relaxed">
              When you enroll at Premier LMS, you don't just get access to recorded videos. You become part of a thriving, supportive ecosystem of ambitous accounting, legal, and financial professionals.
            </p>

            <div className="p-6 rounded-2xl bg-white border border-border shadow-soft space-y-3">
              <div className="flex items-center gap-3 text-emerald-600 font-heading font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>Active 24/7 Professional Network</span>
              </div>
              <p className="text-xs text-body leading-relaxed">
                Collaborate in real-time, share verified tax templates, ask legal questions, and find future business partners within our exclusive community.
              </p>
            </div>
          </motion.div>

          {/* Right Column: 6 Feature Cards Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 grid sm:grid-cols-2 gap-4"
          >
            {communityFeatures.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-border hover:border-primary/40 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className={`w-10 h-10 rounded-xl ${feat.color} text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-heading font-bold text-heading group-hover:text-primary transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-body leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-border/40 flex items-center justify-between text-[11px] font-heading font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore Feature</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
