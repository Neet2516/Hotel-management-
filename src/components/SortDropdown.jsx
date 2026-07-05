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
        className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-luxury-gray border border-neutral-900 dark:border-neutral-800 rounded-sm text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-pointer select-none"
      >
        <ArrowUpDown size={12} className="text-neutral-400" />
        <span>Sort:</span>
        <span className="text-neutral-950 dark:text-white font-extrabold">{currentOption.label}</span>
        <ChevronDown size={12} className={`text-neutral-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-52 bg-white dark:bg-luxury-gray border border-neutral-900 dark:border-neutral-800 rounded-sm shadow-lg z-20 overflow-hidden py-1"
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
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-[9px] uppercase tracking-[0.15em] font-bold text-left cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-neutral-105 text-neutral-900 dark:bg-neutral-800 dark:text-white'
                        : 'text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check size={12} className="text-neutral-900 dark:text-white shrink-0" />}
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
