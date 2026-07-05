import React from 'react';

export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {[...Array(count)].map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-900 rounded-2xl overflow-hidden shadow-sm h-full select-none"
        >
          {/* Shimmer Image */}
          <div className="relative aspect-[4/3] w-full animate-shimmer" />

          {/* Shimmer Details */}
          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* Location indicator */}
              <div className="w-1/3 h-3 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
              {/* Name */}
              <div className="w-3/4 h-5 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
              {/* Stars */}
              <div className="w-1/2 h-3.5 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
              {/* Description line 1 */}
              <div className="w-full h-3 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
              {/* Description line 2 */}
              <div className="w-5/6 h-3 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
            </div>

            {/* Price & Action */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-900 mt-4">
              <div className="space-y-1.5 w-1/4">
                <div className="w-1/2 h-2.5 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
                <div className="w-full h-5 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
              </div>
              <div className="w-24 h-9 bg-gray-200 dark:bg-slate-800 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
