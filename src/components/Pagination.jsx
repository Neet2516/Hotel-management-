import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ totalCount, page, setPage, itemsPerPage = 12 }) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show page 1
      pages.push(1);

      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);

      if (page <= 2) {
        end = 4;
      } else if (page >= totalPages - 1) {
        start = totalPages - 3;
      }

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-gray-100 dark:border-slate-850 mt-10">
      {/* Description */}
      <span className="text-xs text-gray-500 dark:text-gray-400">
        Showing <span className="font-semibold text-slate-800 dark:text-white">{Math.min(totalCount, (page - 1) * itemsPerPage + 1)}</span> to{' '}
        <span className="font-semibold text-slate-800 dark:text-white">{Math.min(totalCount, page * itemsPerPage)}</span> of{' '}
        <span className="font-semibold text-slate-800 dark:text-white">{totalCount}</span> luxury properties
      </span>

      {/* Pages List */}
      <div className="flex items-center gap-1.5">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="p-2 rounded-xl border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900 disabled:opacity-40 disabled:hover:bg-transparent text-gray-600 dark:text-gray-300 cursor-pointer disabled:cursor-not-allowed transition-colors"
          aria-label="Previous Page"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Number buttons */}
        {getPageNumbers().map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`dots-${idx}`} className="px-3 py-1.5 text-xs text-gray-400 font-medium">
                ...
              </span>
            );
          }
          const isSelected = p === page;
          return (
            <button
              key={`page-${p}`}
              onClick={() => setPage(p)}
              className={`min-w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white border border-gray-200 hover:border-gray-300 text-gray-700 dark:bg-slate-900 dark:border-slate-800 dark:text-gray-300 dark:hover:border-slate-700'
              }`}
            >
              {p}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="p-2 rounded-xl border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900 disabled:opacity-40 disabled:hover:bg-transparent text-gray-600 dark:text-gray-300 cursor-pointer disabled:cursor-not-allowed transition-colors"
          aria-label="Next Page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
