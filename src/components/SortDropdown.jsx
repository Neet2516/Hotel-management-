import React, { useState } from 'react';
import { ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SORT_OPTIONS = [
  { label: 'Rating: High to Low', value: '-rating' },
  { label: 'Price: Low to High', value: 'price' },
  { label: 'Price: High to Low', value: '-price' },
  { label: 'Name: A to Z', value: 'name' },
];

export default function SortDropdown({ sortBy, setSortBy }) {
  const [isOpen, setIsOpen] = useState(false);
  const currentOption = SORT_OPTIONS.find((opt) => opt.value === sortBy) || SORT_OPTIONS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 hover:border-gray-300 dark:hover:border-slate-700 shadow-sm transition-all duration-300 cursor-pointer select-none"
      >
        <ArrowUpDown size={14} className="text-indigo-500" />
        <span>Sort By:</span>
        <span className="text-slate-900 dark:text-white">{currentOption.label}</span>
        <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to dismiss */}
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            
            {/* Dropdown Items list */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-2xl shadow-xl z-20 overflow-hidden py-1"
            >
              {SORT_OPTIONS.map((option) => {
                const isSelected = option.value === sortBy;
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-xs text-left cursor-pointer transition-colors duration-200 ${
                      isSelected
                        ? 'bg-indigo-50/60 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400 font-semibold'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check size={14} className="text-indigo-500 shrink-0" />}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
