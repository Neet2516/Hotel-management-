import React from 'react';
import { SearchX, RefreshCw } from 'lucide-react';
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
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="group flex flex-col items-center justify-center text-center py-16 px-8 border border-neutral-200 dark:border-neutral-850 bg-white dark:bg-luxury-gray rounded-[4px] max-w-lg mx-auto shadow-sm my-6 transition-all duration-500 hover:border-neutral-700 dark:hover:border-neutral-450 cursor-default select-none"
    >
      {/* Icon Badge: Pulsing & Hover Scale */}
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="p-5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-850 dark:text-neutral-200 rounded-full mb-6 transition-transform duration-500 group-hover:scale-110 shadow-sm"
      >
        {icon || <SearchX size={30} />}
      </motion.div>

      {/* Text Details */}
      <h3 className="font-editorial text-2xl font-light text-neutral-900 dark:text-white mb-2 italic">
        {title}
      </h3>
      <p className="text-xs font-light text-neutral-400 dark:text-neutral-500 max-w-xs mb-8 leading-relaxed font-sans">
        {description}
      </p>

      {/* Action Button: Glowing & Rotating Icon */}
      {onAction && (
        <button
          onClick={onAction}
          className="group/btn inline-flex items-center gap-2.5 px-6 py-3.5 border border-neutral-900 dark:border-neutral-200 bg-neutral-900 dark:bg-neutral-200 hover:bg-transparent dark:hover:bg-transparent text-white dark:text-neutral-950 hover:text-neutral-900 dark:hover:text-white text-[9px] font-bold uppercase tracking-[0.25em] transition-all duration-300 rounded-sm hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-neutral-200/10 cursor-pointer"
        >
          <RefreshCw
            size={12}
            className="transition-transform duration-500 group-hover/btn:rotate-180 shrink-0"
          />
          <span>{actionLabel}</span>
        </button>
      )}
    </motion.div>
  );
}
