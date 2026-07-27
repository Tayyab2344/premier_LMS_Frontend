'use client';

import React, { useState } from 'react';
import { Search, Filter, RotateCcw, X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CourseFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedLevel: string;
  onLevelChange: (lvl: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
  onResetFilters: () => void;
  totalResults: number;
  categoriesList: string[];
}

export function CourseFilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLevel,
  onLevelChange,
  selectedStatus,
  onStatusChange,
  selectedSort,
  onSortChange,
  onResetFilters,
  totalResults,
  categoriesList,
}: CourseFilterBarProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== 'All' ||
    selectedLevel !== 'All' ||
    selectedStatus !== 'All' ||
    selectedSort !== 'popular';

  return (
    <div id="courses-catalog" className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-y border-border py-4 shadow-soft">
      <div className="section-container">
        
        {/* Desktop & Main Controls Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Left: Search Input & Category Dropdown */}
          <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-body/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search courses, skills, tools..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-border bg-surface-secondary text-xs text-heading placeholder:text-body/60 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-body hover:text-heading"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Desktop Filters: Category, Difficulty, Status */}
            <div className="hidden lg:flex items-center gap-2">
              
              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-border bg-surface-secondary text-xs font-heading font-semibold text-heading focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                <option value="All">All Categories</option>
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Difficulty Dropdown */}
              <select
                value={selectedLevel}
                onChange={(e) => onLevelChange(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-border bg-surface-secondary text-xs font-heading font-semibold text-heading focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              {/* Course Status Dropdown */}
              <select
                value={selectedStatus}
                onChange={(e) => onStatusChange(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-border bg-surface-secondary text-xs font-heading font-semibold text-heading focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                <option value="All">All Statuses</option>
                <option value="Available">Available Now</option>
                <option value="Coming Soon">Coming Soon</option>
              </select>

            </div>
          </div>

          {/* Right: Sort & Reset & Mobile Toggle */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            
            {/* Results Count indicator */}
            <span className="text-xs font-mono font-bold text-body hidden sm:inline-block">
              {totalResults} Courses Found
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-heading font-semibold text-body hidden md:inline-block">Sort:</span>
              <select
                value={selectedSort}
                onChange={(e) => onSortChange(e.target.value)}
                className="px-3 py-2 rounded-xl border border-border bg-surface-secondary text-xs font-heading font-semibold text-heading focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="a-z">A - Z Title</option>
              </select>
            </div>

            {/* Reset Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="px-3 py-2 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-heading font-bold transition-all flex items-center gap-1.5"
                title="Reset All Filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden px-3.5 py-2.5 rounded-xl bg-primary text-white text-xs font-heading font-bold flex items-center gap-1.5 shadow-blue-glow"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>

          </div>

        </div>

      </div>

      {/* Mobile Slide-out Drawer */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xs bg-white p-6 shadow-elevated z-10 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <h3 className="text-base font-heading font-bold text-heading flex items-center gap-2">
                    <Filter className="w-4 h-4 text-primary" /> Filter Courses
                  </h3>
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="w-8 h-8 rounded-full bg-surface-secondary text-body flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Category Mobile */}
                <div className="space-y-2">
                  <label className="block text-xs font-heading font-bold text-heading">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-surface-secondary text-xs font-heading font-semibold"
                  >
                    <option value="All">All Categories</option>
                    {categoriesList.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Mobile */}
                <div className="space-y-2">
                  <label className="block text-xs font-heading font-bold text-heading">Difficulty Level</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => onLevelChange(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-surface-secondary text-xs font-heading font-semibold"
                  >
                    <option value="All">All Difficulties</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                {/* Status Mobile */}
                <div className="space-y-2">
                  <label className="block text-xs font-heading font-bold text-heading">Course Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-surface-secondary text-xs font-heading font-semibold"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Available">Available Now</option>
                    <option value="Coming Soon">Coming Soon</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-border">
                <button
                  onClick={() => {
                    onResetFilters();
                    setMobileDrawerOpen(false);
                  }}
                  className="w-full py-3 rounded-xl border border-border text-xs font-heading font-bold text-body hover:bg-surface-secondary"
                >
                  Reset All Filters
                </button>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="w-full btn-primary !py-3 !text-xs text-center justify-center"
                >
                  Apply &amp; View ({totalResults})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
