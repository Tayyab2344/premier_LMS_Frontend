'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, BookOpen, Award, User, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';

const courses = [
  {
    id: 'c1',
    title: 'Certified Income Tax & Sales Tax Practitioner Masterclass',
    category: 'Taxation & Filing',
    slug: 'taxation',
    level: 'Beginner to Advanced',
    cpe: 'FBR Portal Track',
    instructor: 'Raja Gulfam',
    role: 'Advocate High Court & ACMA',
    rating: 4.95,
    reviews: 382,
    hours: 90,
    modules: 9,
    price: 30000,
    oldPrice: 50000,
    gradient: 'from-violet-500 to-purple-600',
    tags: ['Income Tax', 'Sales Tax', 'IRIS'],
  },
  {
    id: 'c2',
    title: 'Corporate Law & SECP Company Registration Masterclass',
    category: 'Corporate Law',
    slug: 'law',
    level: 'Intermediate',
    cpe: 'SECP Track',
    instructor: 'Raja Gulfam',
    role: 'Advocate High Court & ACMA',
    rating: 4.92,
    reviews: 245,
    hours: 45,
    modules: 8,
    price: 30000,
    oldPrice: 50000,
    gradient: 'from-emerald-500 to-teal-600',
    tags: ['Companies Act 2017', 'SECP'],
  },
  {
    id: 'c3',
    title: 'Financial Accounting & Bookkeeping Masterclass',
    category: 'Accounting',
    slug: 'accounting',
    level: 'Beginner',
    cpe: 'Accounting Track',
    instructor: 'Raja Gulfam',
    role: 'Associate Chartered Accountant',
    rating: 4.88,
    reviews: 512,
    hours: 50,
    modules: 10,
    price: 30000,
    oldPrice: 50000,
    gradient: 'from-blue-500 to-indigo-600',
    tags: ['IFRS', 'Bookkeeping', 'Balance Sheet'],
  },
  {
    id: 'c4',
    title: 'Forensic Audit & Anti-Money Laundering (AML) Laws',
    category: 'Audit & AML',
    slug: 'audit',
    level: 'Advanced',
    cpe: 'Forensic Track',
    instructor: 'Raja Gulfam',
    role: 'Fraud Investigation Expert',
    rating: 4.90,
    reviews: 189,
    hours: 60,
    modules: 10,
    price: 30000,
    oldPrice: 50000,
    gradient: 'from-amber-500 to-orange-600',
    tags: ['AML Act 2010', 'Forensic Audit'],
  },
  {
    id: 'c5',
    title: 'Advanced Corporate Finance & Management Accounting',
    category: 'Corporate Finance',
    slug: 'finance',
    level: 'Advanced',
    cpe: 'Finance Track',
    instructor: 'Raja Gulfam',
    role: 'Executive Partner (ACMA)',
    rating: 4.86,
    reviews: 167,
    hours: 70,
    modules: 12,
    price: 30000,
    oldPrice: 50000,
    gradient: 'from-indigo-500 to-blue-600',
    tags: ['Management Accounting', 'NPV/IRR'],
  },
  {
    id: 'c6',
    title: 'Customs, Federal Excise Duty & Indirect Tax Audit',
    category: 'Taxation & Filing',
    slug: 'taxation',
    level: 'Intermediate',
    cpe: 'Customs Track',
    instructor: 'Raja Gulfam',
    role: 'Advocate High Court',
    rating: 4.97,
    reviews: 298,
    hours: 55,
    modules: 9,
    price: 30000,
    oldPrice: 50000,
    gradient: 'from-violet-500 to-purple-600',
    tags: ['Customs Act 1969', 'FED'],
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

export function FeaturedCourses() {
  const [filter, setFilter] = useState('all');
  const [preview, setPreview] = useState<typeof courses[0] | null>(null);

  const filtered = filter === 'all' ? courses : courses.filter((c) => c.slug === filter);

  return (
    <section className="py-20 bg-surface-secondary border-t border-border" id="courses">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary text-xs font-semibold mb-3">
              <Award className="w-3.5 h-3.5" />
              Accredited Catalog
            </span>
            <h2 className="text-4xl sm:text-[48px] font-heading font-extrabold text-heading leading-[1.1]" style={{ letterSpacing: '-0.03em' }}>Featured Masterclasses</h2>
            <p className="text-body font-body text-base mt-1.5">Practitioner masterclasses instructed directly by Advocate High Court &amp; ACMA Raja Gulfam.</p>
          </div>
          <Link href="/courses" className="text-xs font-bold text-primary hover:text-primary-700 flex items-center gap-1">
            View Full Catalog ({courses.length}+) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 hide-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-5 h-[42px] rounded-full text-sm font-body font-semibold whitespace-nowrap transition-all ${
                filter === c.id ? 'bg-primary text-white shadow-sm' : 'bg-white border border-border text-body hover:text-heading hover:border-slate-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Banner */}
                <div className={`relative h-40 bg-gradient-to-br ${course.gradient} p-4 flex flex-col justify-between`}>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-[11px] font-bold text-primary shadow-sm">{course.cpe}</span>
                    <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] uppercase font-semibold text-white tracking-wider">{course.level}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {course.tags.map((t, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/20 text-white">#{t}</span>
                    ))}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-1.5">{course.category}</div>
                  <h3 className="text-lg font-heading font-extrabold text-heading leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2" style={{ letterSpacing: '-0.02em' }}>{course.title}</h3>
                  <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-border">
                    <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-primary text-[10px] font-bold">
                      RG
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-heading">{course.instructor}</div>
                      <div className="text-[10px] text-body">{course.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-body mt-auto">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.hours}h</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.modules} modules</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {course.rating}
                      <span className="text-body font-normal">({course.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t border-border flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-number text-body line-through">PKR {course.oldPrice.toLocaleString()}</div>
                    <div className="text-xl font-number font-bold text-heading">PKR {course.price.toLocaleString()}</div>
                  </div>
                  <button onClick={() => setPreview(course)} className="px-4 py-2 rounded-lg border border-border text-xs font-bold text-heading hover:bg-primary hover:text-white hover:border-primary transition-all">
                    Quick View
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal Quick View */}
        <AnimatePresence>
          {preview && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-card border border-border relative">
                <button onClick={() => setPreview(null)} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-surface-secondary text-body">
                  <X className="w-5 h-5" />
                </button>
                <span className="px-2.5 py-1 rounded-full bg-primary-50 text-primary text-xs font-bold">{preview.category}</span>
                <h3 className="text-xl font-bold text-heading">{preview.title}</h3>
                <div className="flex items-center gap-2 text-xs text-body">
                  <User className="w-4 h-4 text-primary" /> {preview.instructor} ({preview.role})
                </div>
                <p className="text-xs text-body">Master key financial &amp; tax frameworks with practical FBR IRIS &amp; SECP portal walkthroughs on the Premier LMS Student Mobile App.</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-surface-secondary border border-border">
                    <span className="text-[10px] text-body block">Duration</span>
                    <span className="text-sm font-bold text-heading">{preview.hours} Hours HD</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-secondary border border-border">
                    <span className="text-[10px] text-body block">Access</span>
                    <span className="text-xs font-bold text-heading">2 Months Post-Course</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div>
                    <span className="text-xs text-body block">Total Fee</span>
                    <span className="text-2xl font-extrabold text-heading">PKR {preview.price.toLocaleString()}</span>
                  </div>
                  <Link href="/courses" className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-700 transition-colors">
                    Enroll Now
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
