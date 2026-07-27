'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1 && totalItems <= pageSize) return null;

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers array
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 bg-white border-t border-border-light text-xs text-text-secondary">
      <div>
        Showing <span className="font-bold text-text-primary">{startItem}</span> to{' '}
        <span className="font-bold text-text-primary">{endItem}</span> of{' '}
        <span className="font-bold text-text-primary">{totalItems}</span> entries
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-1.5 rounded-lg border border-border-light hover:bg-bg-light disabled:opacity-40 disabled:hover:bg-white transition-colors"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPageNumbers().map((num, idx) => (
          <React.Fragment key={idx}>
            {typeof num === 'number' ? (
              <button
                onClick={() => onPageChange(num)}
                className={`min-w-[32px] h-8 px-2.5 rounded-lg font-semibold transition-all ${
                  currentPage === num
                    ? 'bg-brand-green text-white shadow-sm'
                    : 'border border-border-light hover:bg-bg-light text-text-primary'
                }`}
              >
                {num}
              </button>
            ) : (
              <span className="px-1.5 text-gray-400">...</span>
            )}
          </React.Fragment>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-1.5 rounded-lg border border-border-light hover:bg-bg-light disabled:opacity-40 disabled:hover:bg-white transition-colors"
          aria-label="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
