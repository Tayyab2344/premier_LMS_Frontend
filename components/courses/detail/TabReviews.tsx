'use client';

import React, { useState } from 'react';
import { Star, ThumbsUp, CheckCircle2, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { Course } from '@/lib/coursesData';

export function TabReviews({ course }: { course: Course }) {
  const [helpfulCounts, setHelpfulCounts] = useState<{ [key: string]: number }>(
    course.reviews.reduce((acc, rev) => ({ ...acc, [rev.id]: rev.helpfulCount }), {})
  );

  const [votedIds, setVotedIds] = useState<string[]>([]);

  const handleHelpful = (id: string) => {
    if (votedIds.includes(id)) return;
    setVotedIds((prev) => [...prev, id]);
    setHelpfulCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <div id="reviews" className="space-y-8">
      
      {/* Header */}
      <div className="space-y-2 border-b border-border pb-4">
        <h3 className="text-xl font-heading font-bold text-heading">Student Reviews &amp; Feedback</h3>
        <p className="text-sm text-body leading-relaxed">
          Authentic feedback from verified alumni who completed this course.
        </p>
      </div>

      {/* Breakdown Box */}
      <div className="rounded-3xl bg-surface-secondary border border-border p-6 sm:p-8 grid sm:grid-cols-12 gap-6 items-center">
        
        {/* Left Column: Overall Rating */}
        <div className="sm:col-span-4 text-center sm:border-r border-border/80 sm:pr-6 space-y-2">
          <div className="text-5xl font-mono font-extrabold text-heading">
            {course.rating.toFixed(1)}
          </div>
          <div className="flex justify-center items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <p className="text-xs font-heading font-semibold text-body">
            Based on {course.reviewCount} Student Reviews
          </p>
        </div>

        {/* Right Column: 5-Star Distribution Graph */}
        <div className="sm:col-span-8 space-y-2">
          {course.ratingDistribution.map((dist) => (
            <div key={dist.stars} className="flex items-center gap-3 text-xs">
              <span className="w-12 font-heading font-semibold text-heading shrink-0 flex items-center gap-1">
                {dist.stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
              </span>

              {/* Progress Bar */}
              <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${dist.percentage}%` }}
                />
              </div>

              <span className="w-10 font-mono font-semibold text-body text-right shrink-0">
                {dist.percentage}%
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Reviews List */}
      {course.reviews.length === 0 ? (
        <div className="p-8 rounded-2xl bg-surface-secondary text-center border border-border space-y-2">
          <MessageSquare className="w-8 h-8 text-body/50 mx-auto" />
          <h4 className="text-base font-heading font-bold text-heading">No Reviews Yet</h4>
          <p className="text-xs text-body max-w-sm mx-auto">
            Reviews will appear here as the inaugural cohort completes their masterclass!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {course.reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-border shadow-soft space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border bg-slate-200 shrink-0">
                    <Image
                      src={rev.avatar}
                      alt={rev.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-heading font-bold text-heading leading-none">
                      {rev.name}
                    </h4>
                    <p className="text-xs text-body mt-0.5">{rev.role}</p>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-body/60">{rev.date}</span>
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-body leading-relaxed italic">
                "{rev.comment}"
              </p>

              <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs text-body">
                <span className="text-emerald-600 font-heading font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Graduate
                </span>

                <button
                  onClick={() => handleHelpful(rev.id)}
                  disabled={votedIds.includes(rev.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-heading font-semibold transition-all ${
                    votedIds.includes(rev.id)
                      ? 'bg-primary-50 text-primary border-primary-200'
                      : 'bg-surface-secondary text-body border-border hover:bg-slate-200'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({helpfulCounts[rev.id] || 0})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
