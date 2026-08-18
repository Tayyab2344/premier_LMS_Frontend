'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, RotateCcw, X, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomSelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: CustomSelectOption[];
  className?: string;
}

function CustomSelect({ value, onChange, options, className = '' }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-surface-secondary text-xs font-heading font-semibold text-heading hover:bg-white hover:border-premier-green/40 focus:outline-none focus:ring-2 focus:ring-premier-green transition-all flex items-center justify-between gap-2.5 shadow-sm min-w-[160px]"
      >
        <span className="truncate">{selectedOption?.label || value}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-body/60 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-premier-green' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            className="absolute left-0 right-0 mt-1.5 w-full min-w-full rounded-xl bg-white border border-border/80 shadow-elevated p-1 z-50 max-h-64 overflow-y-auto"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-heading font-semibold transition-colors flex items-center justify-between ${
                    isSelected
                      ? 'bg-premier-green-50 text-premier-green font-bold'
                      : 'text-heading hover:bg-surface-secondary'
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-premier-green shrink-0 ml-2" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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

  const categoryOptions: CustomSelectOption[] = [
    { label: 'All Categories', value: 'All' },
    ...categoriesList.map((cat) => ({ label: cat, value: cat })),
  ];

  const difficultyOptions: CustomSelectOption[] = [
    { label: 'All Difficulties', value: 'All' },
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' },
  ];

  const statusOptions: CustomSelectOption[] = [
    { label: 'All Statuses', value: 'All' },
    { label: 'Available Now', value: 'Available' },
    { label: 'Coming Soon', value: 'Coming Soon' },
  ];

  const sortOptions: CustomSelectOption[] = [
    { label: 'Most Popular', value: 'popular' },
    { label: 'Newest First', value: 'newest' },
    { label: 'A - Z Title', value: 'a-z' },
  ];

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
                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-border bg-surface-secondary text-xs text-heading placeholder:text-body/60 focus:outline-none focus:ring-2 focus:ring-premier-green focus:bg-white transition-all"
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

            {/* Desktop Custom Dropdown Filters: Category, Difficulty, Status */}
            <div className="hidden lg:flex items-center gap-2">
              
              {/* Category Dropdown */}
              <CustomSelect
                value={selectedCategory}
                onChange={onCategoryChange}
                options={categoryOptions}
              />

              {/* Difficulty Dropdown */}
              <CustomSelect
                value={selectedLevel}
                onChange={onLevelChange}
                options={difficultyOptions}
              />

              {/* Course Status Dropdown */}
              <CustomSelect
                value={selectedStatus}
                onChange={onStatusChange}
                options={statusOptions}
              />

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
              <CustomSelect
                value={selectedSort}
                onChange={onSortChange}
                options={sortOptions}
              />
            </div>

            {/* Reset Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="px-3 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-heading font-bold transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-premier-green focus:ring-offset-2 focus:ring-offset-premier-cream"
                title="Reset All Filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden px-3.5 py-2.5 rounded-xl bg-premier-green text-white text-xs font-heading font-bold flex items-center gap-1.5 shadow-blue-glow"
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
                    <Filter className="w-4 h-4 text-premier-green" /> Filter Courses
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
                  <CustomSelect
                    value={selectedCategory}
                    onChange={onCategoryChange}
                    options={categoryOptions}
                    className="w-full"
                  />
                </div>

                {/* Difficulty Mobile */}
                <div className="space-y-2">
                  <label className="block text-xs font-heading font-bold text-heading">Difficulty Level</label>
                  <CustomSelect
                    value={selectedLevel}
                    onChange={onLevelChange}
                    options={difficultyOptions}
                    className="w-full"
                  />
                </div>

                {/* Status Mobile */}
                <div className="space-y-2">
                  <label className="block text-xs font-heading font-bold text-heading">Course Status</label>
                  <CustomSelect
                    value={selectedStatus}
                    onChange={onStatusChange}
                    options={statusOptions}
                    className="w-full"
                  />
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
