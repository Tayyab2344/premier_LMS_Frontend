'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Star, Users, BookOpen, Clock, Award, ArrowRight, Zap, ChevronRight, GraduationCap,
} from 'lucide-react';
import Link from 'next/link';
import { COURSES_DATA, Course } from '@/lib/coursesData';

// ─── Magnetic Button ──────────────────────────────────────────────────────────
function MagneticButton({
  children, href, className, style,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - (left + width / 2)) * 0.35, y: (e.clientY - (top + height / 2)) * 0.35 });
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setPos({ x: 0, y: 0 })} className="inline-block p-6 -m-6">
      <motion.div animate={{ x: pos.x, y: pos.y }} transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}>
        <Link href={href} className={className} style={style}>{children}</Link>
      </motion.div>
    </div>
  );
}

// ─── Data — dynamic, scales as more courses go Available ──────────────────────
const availableCourses = COURSES_DATA.filter((c) => c.status === 'Available');
const upNextCourses = COURSES_DATA.filter((c) => c.status === 'Coming Soon').slice(0, 2);

// ─── Spotlight Card ───────────────────────────────────────────────────────────
function SpotlightCard({ course, single }: { course: Course; single: boolean }) {
  const hasDiscount = typeof course.discountPercent === 'number' && course.discountPercent > 0;
  const moduleCount = course.modules.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl overflow-hidden border flex flex-col"
      style={{ borderColor: '#E6DFD0', boxShadow: '0 8px 40px rgba(27,59,44,0.08)' }}
    >
      {/* ── Top row: green panel + white panel ───────────────────────────── */}
      <div className={`flex flex-col ${single ? 'lg:flex-row' : ''}`}>

        {/* Left — forest green panel */}
        <div
          className={`p-7 flex flex-col justify-between gap-6 ${single ? 'lg:w-64 xl:w-72 shrink-0' : ''}`}
          style={{ background: 'linear-gradient(160deg, #1B3B2C 0%, #143020 100%)' }}
        >
          {/* Title */}
          <div>
            <h2
              className="text-xl font-heading font-extrabold leading-tight"
              style={{ letterSpacing: '-0.02em', color: '#FAF6EE' }}
            >
              {course.title}
            </h2>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5"
                style={{
                  fill: i < Math.floor(course.rating) ? '#D9A544' : '#2E5540',
                  color: i < Math.floor(course.rating) ? '#D9A544' : '#2E5540',
                }}
              />
            ))}
            <span className="text-sm font-body font-bold ml-1" style={{ color: '#D9A544' }}>{course.rating}</span>
            <span className="text-xs font-body ml-0.5" style={{ color: '#6B9478' }}>({course.reviewCount})</span>
          </div>

          {/* Instructor */}
          <div className="border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <p className="text-[10px] font-body uppercase tracking-wider mb-0.5" style={{ color: '#6B9478' }}>
              Instructor
            </p>
            <p className="text-sm font-heading font-bold" style={{ color: '#FAF6EE' }}>{course.instructor.name}</p>
            <p className="text-[11px] font-body mt-0.5 leading-snug" style={{ color: '#8AAF94' }}>
              {course.instructor.title}
            </p>
          </div>
        </div>

        {/* Right — white panel */}
        <div className="flex-1 p-7 flex flex-col justify-start gap-6 bg-white">
          <p className="font-body text-sm leading-relaxed" style={{ color: '#4A5E54' }}>
            {course.shortDescription}
          </p>

          {/* Stat chips */}
          <div className="flex flex-wrap gap-2">
            {[
              { Icon: Users, label: `${course.studentsCount.toLocaleString()} Students` },
              { Icon: BookOpen, label: `${moduleCount > 0 ? moduleCount : '–'} Modules` },
              { Icon: Clock, label: course.duration },
              { Icon: Award, label: course.level },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-body font-semibold border"
                style={{ backgroundColor: '#F5F0E8', borderColor: '#E6DFD0', color: '#3A5248' }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: '#1B3B2C' }} />
                {label}
              </div>
            ))}
          </div>

          {/* What you'll learn */}
          <div className="border-t pt-5" style={{ borderColor: '#E6DFD0' }}>
            <p className="text-[10px] font-body font-bold uppercase tracking-widest mb-3" style={{ color: '#8A7D66' }}>
              What you'll learn
            </p>
            <ul className="space-y-2">
              {course.learningObjectives.slice(0, 3).map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-xs font-body" style={{ color: '#4A5E54' }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#D9A544' }} />
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom footer: price + CTAs — full-width, horizontally centered ── */}
      <div
        className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 px-8 py-5 border-t"
        style={{ backgroundColor: '#F5F0E8', borderColor: '#E6DFD0' }}
      >
        {/* Price */}
        <div className="flex items-baseline gap-3 flex-wrap justify-center">
          <span className="text-2xl font-number font-extrabold" style={{ color: '#1B3B2C' }}>
            PKR {course.price?.toLocaleString()}
          </span>
          {hasDiscount && (
            <>
              <span className="text-sm font-body line-through" style={{ color: '#A09480' }}>
                PKR {course.originalPrice.toLocaleString()}
              </span>
              <motion.span
                animate={{ opacity: [1, 0.35, 1], scale: [1, 1.08, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="px-2 py-0.5 rounded text-[11px] font-body font-bold inline-block"
                style={{ backgroundColor: '#D9A544', color: '#1B3B2C' }}
              >
                {course.discountPercent}% OFF
              </motion.span>
            </>
          )}
        </div>

        {/* Vertical divider — visible on sm+ */}
        <div className="hidden sm:block w-px h-8 self-center" style={{ backgroundColor: '#D4C9B5' }} />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <MagneticButton
            href={`/courses/${course.slug}`}
            className="flex items-center gap-2 rounded-xl py-3 px-7 text-sm font-body font-bold transition-opacity hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: '#D9A544', color: '#1B3B2C' }}
          >
            <BookOpen className="w-4 h-4" />
            Enroll Now
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>

          <Link
            href="/admission?pathway=exam"
            className="flex items-center gap-2 rounded-xl py-3 px-6 text-sm font-body font-semibold border transition-colors hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: '#1B3B2C', borderColor: '#1B3B2C', color: '#FAF6EE' }}
          >
            <GraduationCap className="w-4 h-4" />
            Already skilled? Certify by exam
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function PopularCourses() {
  const isSingle = availableCourses.length === 1;

  return (
    <section
      className="relative border-t overflow-hidden"
      id="courses"
      style={{ backgroundColor: '#FAF6EE', borderColor: '#E6DFD0', paddingTop: '72px', paddingBottom: '80px' }}
    >
      {/* Background radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[100px] opacity-30 pointer-events-none"
        style={{ backgroundColor: '#D9A544' }}
      />

      <div className="section-container relative z-10 max-w-5xl mx-auto space-y-8">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2
              className="text-3xl sm:text-4xl font-heading font-extrabold leading-tight"
              style={{ color: '#1B3B2C', letterSpacing: '-0.025em' }}
            >
              Master Tax, Law &amp; Finance
            </h2>
            <p className="mt-1.5 text-sm font-body" style={{ color: '#8A7D66' }}>
              Professional masterclasses taught by a practicing High Court Advocate &amp; ACMA
            </p>
          </div>


          <Link
            href="/courses"
            className="cta-blink shrink-0 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-body font-bold border transition-colors hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: '#1B3B2C', color: '#D9A544', borderColor: '#1B3B2C' }}
          >
            <Zap className="w-4 h-4" />
            Explore All Courses
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Spotlight card(s) */}
        {isSingle ? (
          <SpotlightCard course={availableCourses[0]} single={true} />
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {availableCourses.map((course) => (
              <SpotlightCard key={course.id} course={course} single={false} />
            ))}
          </div>
        )}

        {/* Up Next teasers — show 2 upcoming courses */}
        {upNextCourses.length > 0 && (
          <div className="space-y-2">
            <p className="text-base font-heading font-extrabold uppercase tracking-[0.08em]" style={{ color: '#22301F' }}>
              Up Next
            </p>
            {upNextCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-5 py-4 rounded-2xl border border-dashed"
                style={{ borderColor: '#C9BFA8', backgroundColor: 'rgba(255,255,255,0.5)' }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: '#D9A544' }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-semibold truncate" style={{ color: '#22301F' }}>
                    {course.title}
                  </p>
                  <p className="text-[11px] font-body" style={{ color: '#8A7D66' }}>{course.category}</p>
                </div>
                <span
                  className="shrink-0 px-2.5 py-1 rounded-full border text-[11px] font-body font-semibold"
                  style={{ backgroundColor: '#FDF4E0', borderColor: '#D9A544', color: '#8A6A1F' }}
                >
                  Coming Soon
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Already Have Prior Experience — original dark animated banner */}
        <motion.div
          animate={{ y: [0, -10, 0], opacity: [0.65, 1, 0.65], scale: [0.98, 1.015, 0.98] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-3xl p-6 sm:p-8 border relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(to right, #020617, #0f172a, #f1f5f9)',
            borderColor: '#f59e0b',
            boxShadow: '0 8px 25px rgba(245,158,11,0.2)',
          }}
        >
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
              Already Have Prior Experience?{' '}
              <span className="text-amber-400">Get Certified Directly</span>
            </h3>
            <p className="text-sm font-body text-slate-300 max-w-xl">
              Skip redundant classes if you have previously studied or worked in Taxation, Law, Accounting, or Audit. Apply for direct evaluation and get certified.
            </p>
          </div>
          <Link
            href="/admission"
            className="cert-btn shrink-0 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-body font-bold"
          >
            <Award className="w-4 h-4" />
            Apply for Direct Certification
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
