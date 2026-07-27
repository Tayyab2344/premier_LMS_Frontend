'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, Users, ArrowRight, Trophy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const courses = [
  {
    id: 'c1',
    title: 'Certified Income Tax & Sales Tax Practitioner Masterclass',
    category: 'Taxation & Compliance',
    slug: 'certified-income-tax-and-sales-tax-practitioner',
    ribbon: 'Flagship Masterclass',
    ribbonColor: 'bg-amber-500',
    level: 'Beginner to Advanced',
    duration: '12 Weeks (90+ Hours)',
    students: '1,240',
    rating: 4.95,
    instructor: 'Raja Gulfam',
    price: 'PKR 30,000',
    oldPrice: 'PKR 50,000',
    thumbnail: '/about/fbr-seminar.jpeg',
    status: 'Available',
  },
  {
    id: 'c2',
    title: 'Corporate Law & SECP Company Registration Masterclass',
    category: 'Corporate Law',
    slug: 'corporate-law-and-secp-company-registration',
    ribbon: 'Upcoming',
    ribbonColor: 'bg-primary',
    level: 'Intermediate',
    duration: '10 Weeks',
    students: '850',
    rating: 4.90,
    instructor: 'Raja Gulfam',
    price: 'PKR 30,000',
    oldPrice: 'PKR 50,000',
    thumbnail: '/about/cima-certificate.jpeg',
    status: 'Coming Soon',
  },
  {
    id: 'c3',
    title: 'Financial Accounting & Bookkeeping Masterclass',
    category: 'Accounting & Finance',
    slug: 'financial-accounting-and-bookkeeping-masterclass',
    ribbon: 'Upcoming',
    ribbonColor: 'bg-emerald-500',
    level: 'Beginner',
    duration: '12 Weeks',
    students: '920',
    rating: 4.92,
    instructor: 'Raja Gulfam',
    price: 'PKR 30,000',
    oldPrice: 'PKR 50,000',
    thumbnail: '/about/office-desk.jpeg',
    status: 'Coming Soon',
  },
  {
    id: 'c4',
    title: 'Forensic Audit & Anti-Money Laundering (AML) Laws',
    category: 'Audit & Fraud Investigation',
    slug: 'forensic-audit-and-anti-money-laundering-laws',
    ribbon: 'Upcoming',
    ribbonColor: 'bg-purple-500',
    level: 'Advanced',
    duration: '14 Weeks',
    students: '640',
    rating: 4.88,
    instructor: 'Raja Gulfam',
    price: 'PKR 30,000',
    oldPrice: 'PKR 50,000',
    thumbnail: '/about/fbr-award.jpeg',
    status: 'Coming Soon',
  },
  {
    id: 'c5',
    title: 'Advanced Corporate Finance & Management Accounting',
    category: 'Financial Management',
    slug: 'advanced-corporate-finance-and-management-accounting',
    ribbon: 'Upcoming',
    ribbonColor: 'bg-blue-600',
    level: 'Advanced',
    duration: '16 Weeks',
    students: '750',
    rating: 4.87,
    instructor: 'Raja Gulfam',
    price: 'PKR 30,000',
    oldPrice: 'PKR 50,000',
    thumbnail: '/about/high-court.jpeg',
    status: 'Coming Soon',
  },
  {
    id: 'c6',
    title: 'Customs, Federal Excise Duty & Sales Tax Audit',
    category: 'Customs & Indirect Tax',
    slug: 'customs-federal-excise-duty-and-sales-tax-audit',
    ribbon: 'Upcoming',
    ribbonColor: 'bg-amber-600',
    level: 'Intermediate',
    duration: '12 Weeks',
    students: '520',
    rating: 4.96,
    instructor: 'Raja Gulfam',
    price: 'PKR 30,000',
    oldPrice: 'PKR 50,000',
    thumbnail: '/about/teaching-class.jpeg',
    status: 'Coming Soon',
  },
];

const categories = [
  { id: 'all', label: 'All Masterclasses' },
  { id: 'taxation', label: 'Taxation & FBR' },
  { id: 'law', label: 'Corporate Law & SECP' },
  { id: 'accounting', label: 'Financial Accounting' },
  { id: 'audit', label: 'Audit & AML' },
  { id: 'finance', label: 'Corporate Finance' },
];

export function PopularCourses() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? courses : courses.filter((c) => c.slug.includes(filter) || c.category.toLowerCase().includes(filter));

  return (
    <section className="relative bg-white border-t border-border overflow-hidden" id="courses" style={{ paddingTop: '90px', paddingBottom: '70px' }}>
      {/* Stripe/Linear subtle background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary-100 rounded-full blur-[120px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-200 rounded-full blur-[100px] opacity-15 pointer-events-none" />
      <div className="absolute inset-0 dot-pattern opacity-[0.02] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header — Premium visual hierarchy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary text-sm font-body font-semibold">
              <Trophy className="w-4 h-4" />
              Premium Legal Education
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-[48px] font-heading font-extrabold text-heading leading-[1.1]"
              style={{ letterSpacing: '-0.03em' }}
            >
              Master Practical{' '}
              <span className="text-primary">Skills</span>
              <br className="hidden sm:block" />
              for Your Professional Career
            </h2>
            <p className="text-lg sm:text-[22px] font-body font-normal leading-[1.7] max-w-[650px] text-slate-700">
              Learn from Pakistan&apos;s Leading Advocate &amp; ACMA Professional — Master practical taxation, corporate law, finance, compliance, and audit through industry-focused programs.
            </p>
          </div>
          <Link href="/courses" className="btn-secondary !py-3 !px-6 shrink-0 text-base font-body font-semibold" aria-label="View all masterclass courses">
            View All Courses ({courses.length}+)
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Category Filters — 14px, Inter 600, h-[42px], rounded-full */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-border" aria-label="Course categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              aria-pressed={filter === cat.id}
              className={`px-5 h-[42px] rounded-full text-sm font-body font-semibold transition-all ${
                filter === cat.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-secondary text-slate-700 hover:bg-slate-200 border border-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group rounded-3xl bg-white border border-border overflow-hidden shadow-soft hover:shadow-card-hover hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Image Header */}
                  <div className="relative h-48 bg-slate-900 overflow-hidden">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-black/40 pointer-events-none" />

                    <div className="relative z-10 p-4 h-full flex flex-col justify-between text-white">
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full ${course.ribbonColor} text-white text-[11px] font-body font-bold uppercase shadow-sm`}>
                          {course.ribbon}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-body font-semibold uppercase border border-white/20">
                          {course.level}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-white/90 font-body font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-300" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-blue-200" />
                          {course.students} Students
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <span className="text-[11px] font-body font-bold text-primary uppercase tracking-wider">
                      {course.category}
                    </span>

                    <h3
                      className="text-[20px] font-heading font-extrabold text-heading group-hover:text-primary transition-colors leading-snug line-clamp-2"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      <Link href={`/courses/${course.slug}`}>
                        {course.title}
                      </Link>
                    </h3>

                    <div className="flex items-center gap-2.5 pt-1">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-border bg-slate-200 shrink-0">
                        <Image
                          src="/about/founder-portrait.jpeg"
                          alt="Raja Gulfam"
                          fill
                          className="object-cover object-top"
                          sizes="28px"
                        />
                      </div>
                      <span className="text-xs font-body font-medium text-body">
                        Instructor: <strong className="text-heading font-semibold">{course.instructor}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="p-6 pt-0 space-y-4">
                  <div className="flex items-center justify-between pt-4 border-t border-border/60">
                    <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span className="text-heading font-number font-bold">{course.rating}</span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-number text-body/50 line-through">{course.oldPrice}</span>
                      <span className="text-xl font-number font-bold text-heading">{course.price}</span>
                    </div>
                  </div>

                  <Link
                    href="/admission"
                    className="w-full btn-primary !py-3 text-sm text-center justify-center font-body font-semibold"
                  >
                    {course.status === 'Available' ? 'Enroll Now' : 'View Masterclass'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
