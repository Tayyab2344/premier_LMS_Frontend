'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, BookOpen, Star, Globe, Share2, Send, MessageCircle, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export function MeetInstructor() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  // Live real-time state for student count
  const [studentCount, setStudentCount] = useState(25142);

  useEffect(() => {
    // Periodically increment student count in real-time
    const interval = setInterval(() => {
      setStudentCount((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Award, end: 10, prefix: '', suffix: '+', label: 'Years Experience' },
    { icon: Users, end: studentCount, isDynamic: true, prefix: '', suffix: '+', label: 'Students Taught' },
    { icon: BookOpen, end: 45, prefix: '', suffix: '+', label: 'Master Courses' },
    { icon: Star, end: 98.5, decimals: 1, prefix: '', suffix: '%', label: 'Success Rate' },
  ];

  return (
    <section className="section-padding bg-white border-t border-border" id="instructor" ref={ref}>
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Instructor Image / Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Outer Card frame */}
              <div className="relative rounded-3xl bg-gradient-to-b from-premier-green-50 to-surface-secondary border border-border p-6 shadow-elevated overflow-hidden text-center">
                {/* Avatar Portrait */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full mx-auto mb-6 border-4 border-white shadow-card-hover overflow-hidden bg-slate-100">
                  <Image
                    src="/about/founder-portrait.jpeg"
                    alt="Raja Gulfam"
                    fill
                    className="object-cover object-top"
                    sizes="224px"
                  />
                </div>

                <h3 className="text-2xl font-heading font-extrabold text-heading">Raja Gulfam</h3>
                <p className="text-sm font-body font-semibold text-premier-green mt-1">Founder & Lead Instructor</p>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-semibold mt-3">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Master Educator
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-3 mt-6 pt-6 border-t border-border">
                  {[
                    { icon: Globe, href: '#', label: 'Visit Instructor Website' },
                    { icon: MessageCircle, href: 'https://wa.me/923348972072?text=Hi%20Raja%20Gulfam%2C%20I%20came%20from%20the%20Premier%20LMS%20website%20and%20I%20have%20a%20question%20regarding%20your%20courses.', label: 'Contact Instructor via WhatsApp' },
                    { icon: Share2, href: '#', label: 'Share Instructor Profile' },
                    { icon: Send, href: '#', label: 'Send Instructor Email' },
                  ].map((social, i) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={i}
                        href={social.href}
                        aria-label={social.label}
                        className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-body hover:text-premier-green hover:border-premier-green/40 hover:scale-105 transition-all shadow-soft"
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Instructor Bio & Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-premier-green text-white text-xs font-heading font-bold uppercase tracking-wider shadow-sm border border-emerald-700/30">
                <Award className="w-3.5 h-3.5 text-premier-gold" />
                Meet Your Instructor
              </span>
              <h2 className="text-4xl sm:text-[48px] font-heading font-extrabold text-heading leading-[1.25]" style={{ letterSpacing: '-0.025em' }}>
                Driven by Passion for <span className="text-premier-green">Professional Excellence</span>
              </h2>
              <p className="text-body text-base sm:text-lg leading-relaxed">
                &ldquo;My mission is to simplify complex financial, tax, and accounting frameworks into clear, actionable knowledge that empowers professionals to excel in their careers.&rdquo;
              </p>
              <p className="text-body text-sm leading-relaxed">
                Raja Gulfam has mentored over 25,000 students and working professionals globally. With extensive experience in corporate taxation, financial modeling, and academic instruction, his courses are structured around practical case studies and modern industry standards.
              </p>
            </div>

            {/* Achievement Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-4 border border-border text-center space-y-1 shadow-soft hover:shadow-card-hover transition-all duration-300"
                  >
                    <Icon className="w-5 h-5 text-premier-green mx-auto mb-1" />
                    
                    <div className="text-xl sm:text-2xl font-number font-extrabold text-heading tracking-tight flex items-center justify-center gap-0.5">
                      {stat.isDynamic ? (
                        <span>{studentCount.toLocaleString()}</span>
                      ) : inView ? (
                        <CountUp
                          start={0}
                          end={stat.end}
                          duration={2.5}
                          decimals={stat.decimals || 0}
                          separator=","
                        />
                      ) : (
                        '0'
                      )}
                      <span>{stat.suffix}</span>
                    </div>

                    <div className="text-xs text-slate-700 font-heading font-semibold">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
