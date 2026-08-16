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
        className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1B3B2C] bg-white text-xs font-mono font-bold text-[#1B3B2C] hover:bg-[#FAF6EE] focus:outline-none transition-all flex items-center justify-between gap-2 shadow-[2px_2px_0px_#1B3B2C] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#1B3B2C] min-w-[155px]"
      >
        <span className="truncate">{selectedOption?.label || value}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#1B3B2C] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#D9A544]' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            className="absolute left-0 right-0 mt-1.5 w-full min-w-full rounded-xl bg-[#FAF6EE] border-2 border-[#1B3B2C] shadow-[4px_4px_0px_#1B3B2C] p-1 z-50 max-h-64 overflow-y-auto"
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
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono font-bold transition-colors flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#1B3B2C] text-[#D9A544]'
                      : 'text-[#1B3B2C] hover:bg-white'
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#D9A544] shrink-0 ml-2" />}
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
    <div id="courses-catalog" className="sticky top-[72px] z-30 py-3">
      <div className="section-container">
        <div className="bg-[#FAF6EE] backdrop-blur-md border-2 border-[#1B3B2C] rounded-2xl p-3.5 shadow-[4px_4px_0px_#1B3B2C]">
          
          {/* Desktop & Main Controls Row */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5">
            
            {/* Left: Search Input & Category Dropdown */}
            <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
              
              {/* Search Input */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#1B3B2C]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search catalog, skills..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-8 py-2 rounded-xl border-2 border-[#1B3B2C] bg-white text-xs font-mono text-[#1B3B2C] placeholder:text-[#8A7D66] focus:outline-none focus:ring-2 focus:ring-[#D9A544] shadow-[2px_2px_0px_#1B3B2C] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1B3B2C] hover:text-[#D9A544]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Desktop Custom Dropdown Filters: Category, Difficulty, Status */}
              <div className="hidden lg:flex items-center gap-2">
                <CustomSelect
                  value={selectedCategory}
                  onChange={onCategoryChange}
                  options={categoryOptions}
                />

                <CustomSelect
                  value={selectedLevel}
                  onChange={onLevelChange}
                  options={difficultyOptions}
                />

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
              <span className="text-xs font-mono font-bold text-[#1B3B2C] bg-[#E6DFD0] px-2.5 py-1 rounded-md border border-[#1B3B2C] hidden sm:inline-block">
                {totalResults} Courses
              </span>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#1B3B2C] hidden md:inline-block">Sort:</span>
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
                  className="px-3 py-2 rounded-xl border-2 border-[#1B3B2C] bg-red-100 text-red-900 hover:bg-red-200 text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_#1B3B2C] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#1B3B2C]"
                  title="Reset All Filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}

              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setMobileDrawerOpen(true)}
                className="lg:hidden px-3.5 py-2 rounded-xl bg-[#1B3B2C] text-[#D9A544] border-2 border-[#1B3B2C] shadow-[2.5px_2.5px_0px_#D9A544] text-xs font-heading font-extrabold flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>

            </div>

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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xs bg-[#FAF6EE] border-l-2 border-[#1B3B2C] p-6 shadow-[6px_6px_0px_#1B3B2C] z-10 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b-2 border-[#1B3B2C] pb-4">
                  <h3 className="text-base font-heading font-extrabold text-[#1B3B2C] flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#D9A544]" /> Filter Courses
                  </h3>
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="w-8 h-8 rounded-lg bg-[#1B3B2C] text-[#FAF6EE] flex items-center justify-center border border-[#1B3B2C]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Category Mobile */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono font-bold text-[#1B3B2C]">Category</label>
                  <CustomSelect
                    value={selectedCategory}
                    onChange={onCategoryChange}
                    options={categoryOptions}
                    className="w-full"
                  />
                </div>

                {/* Difficulty Mobile */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono font-bold text-[#1B3B2C]">Difficulty Level</label>
                  <CustomSelect
                    value={selectedLevel}
                    onChange={onLevelChange}
                    options={difficultyOptions}
                    className="w-full"
                  />
                </div>

                {/* Status Mobile */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono font-bold text-[#1B3B2C]">Course Status</label>
                  <CustomSelect
                    value={selectedStatus}
                    onChange={onStatusChange}
                    options={statusOptions}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t-2 border-[#1B3B2C]">
                <button
                  onClick={() => {
                    onResetFilters();
                    setMobileDrawerOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl border-2 border-[#1B3B2C] bg-white text-xs font-mono font-bold text-[#1B3B2C] shadow-[2px_2px_0px_#1B3B2C]"
                >
                  Reset All Filters
                </button>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="w-full py-3 rounded-xl bg-[#1B3B2C] text-[#D9A544] border-2 border-[#1B3B2C] shadow-[3px_3px_0px_#D9A544] text-xs font-heading font-extrabold uppercase tracking-wide"
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
