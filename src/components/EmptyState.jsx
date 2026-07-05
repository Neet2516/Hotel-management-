import React from 'react';
import { SearchX, CalendarDays, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmptyState({
  title = 'No Results Found',
  description = 'Try adjusting your filters, location, or price ranges to search again.',
  actionLabel = 'Reset All Filters',
  onAction,
  icon,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center py-16 px-4 border border-gray-150 dark:border-slate-850 bg-white dark:bg-slate-950/40 rounded-2xl max-w-lg mx-auto shadow-sm my-6 transition-colors duration-300"
    >
      <div className="p-4 bg-indigo-50 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 rounded-full mb-5 shadow-sm">
        {icon || <SearchX size={36} />}
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer"
        >
          <RefreshCw size={14} className="animate-spin-slow" />
          <span>{actionLabel}</span>
        </button>
      )}
    </motion.div>
  );
}
