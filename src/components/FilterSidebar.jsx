import React, { useState } from 'react';
import { X, SlidersHorizontal, MapPin, Star, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LOCATIONS = [
  'Ahmedabad',
  'Bengaluru',
  'Chennai',
  'Delhi',
  'Goa',
  'Gurgaon',
  'Hyderabad',
  'Jaipur',
  'Kolkata',
  'Mumbai',
  'Noida',
  'Pune',
];

export default function FilterSidebar({ filters, updateFilters, resetFilters, isOpen, onClose }) {
  const [minPriceInput, setMinPriceInput] = useState(filters.min_price || '');
  const [maxPriceInput, setMaxPriceInput] = useState(filters.max_price || '');

  const handlePriceApply = (e) => {
    e.preventDefault();
    updateFilters({
      min_price: minPriceInput,
      max_price: maxPriceInput,
    });
  };

  const handleLocationToggle = (city) => {
    if (filters.location === city) {
      updateFilters({ location: '' });
    } else {
      updateFilters({ location: city });
    }
  };

  const handleRatingSelect = (rating) => {
    if (filters.min_rating === rating) {
      updateFilters({ min_rating: '', max_rating: '' });
    } else {
      updateFilters({ min_rating: rating, max_rating: '5' });
    }
  };

  const handleClear = () => {
    setMinPriceInput('');
    setMaxPriceInput('');
    resetFilters();
  };

  const content = (
    <div className="space-y-8 select-none">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-[0.2em]">
          <SlidersHorizontal size={14} className="text-neutral-400" />
          <span>Filters</span>
        </div>
        <button
          onClick={handleClear}
          className="text-[9px] text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-extrabold uppercase tracking-[0.2em] cursor-pointer"
        >
          Reset All
        </button>
      </div>

      {/* Location Filter */}
      <div className="space-y-4">
        <label className="text-[10px] font-bold text-neutral-900 dark:text-neutral-200 uppercase tracking-[0.25em] flex items-center gap-2">
          <MapPin size={12} className="text-neutral-400" />
          <span>Sanctuary Regions</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {LOCATIONS.map((city) => {
            const isSelected = filters.location === city;
            return (
              <button
                key={city}
                onClick={() => handleLocationToggle(city)}
                className={`text-[9px] font-bold uppercase tracking-widest px-3.5 py-2 rounded-sm border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-neutral-200 dark:border-neutral-200 dark:text-neutral-950'
                    : 'bg-white border-neutral-200 text-neutral-500 hover:border-neutral-400 dark:bg-luxury-gray dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-700'
                }`}
              >
                {city}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Filter */}
      <div className="space-y-4">
        <label className="text-[10px] font-bold text-neutral-900 dark:text-neutral-200 uppercase tracking-[0.25em] flex items-center gap-2">
          <DollarSign size={12} className="text-neutral-400" />
          <span>Price Limits (₹)</span>
        </label>
        <form onSubmit={handlePriceApply} className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(e.target.value)}
              className="w-full bg-white dark:bg-luxury-gray border border-neutral-200 dark:border-neutral-805 rounded-sm px-3 py-2 text-xs text-neutral-800 dark:text-neutral-200 outline-none focus:border-neutral-900 uppercase font-sans font-medium"
            />
            <span className="text-neutral-400 text-xs">to</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
              className="w-full bg-white dark:bg-luxury-gray border border-neutral-200 dark:border-neutral-805 rounded-sm px-3 py-2 text-xs text-neutral-800 dark:text-neutral-200 outline-none focus:border-neutral-900 uppercase font-sans font-medium"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setMinPriceInput('0');
                setMaxPriceInput('3000');
                updateFilters({ min_price: '0', max_price: '3000' });
              }}
              className="w-full text-[9px] uppercase tracking-widest py-2 rounded-sm border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              &lt; 3k
            </button>
            <button
              type="button"
              onClick={() => {
                setMinPriceInput('3000');
                setMaxPriceInput('7000');
                updateFilters({ min_price: '3000', max_price: '7000' });
              }}
              className="w-full text-[9px] uppercase tracking-widest py-2 rounded-sm border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              3k - 7k
            </button>
            <button
              type="button"
              onClick={() => {
                setMinPriceInput('7000');
                setMaxPriceInput('10000');
                updateFilters({ min_price: '7000', max_price: '10000' });
              }}
              className="w-full text-[9px] uppercase tracking-widest py-2 rounded-sm border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              &gt; 7k
            </button>
          </div>

          <button
            type="submit"
            className="w-full border border-neutral-900 dark:border-neutral-200 bg-neutral-900 dark:bg-neutral-200 hover:bg-transparent dark:hover:bg-transparent text-white dark:text-neutral-950 hover:text-neutral-900 dark:hover:text-white font-bold py-2 rounded-sm text-[9px] uppercase tracking-[0.2em] transition-colors cursor-pointer"
          >
            Apply Range
          </button>
        </form>
      </div>

      {/* Rating Filter */}
      <div className="space-y-4">
        <label className="text-[10px] font-bold text-neutral-900 dark:text-neutral-200 uppercase tracking-[0.25em] flex items-center gap-2">
          <Star size={12} className="text-neutral-400" />
          <span>Guest Ratings</span>
        </label>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((starVal) => {
            const isSelected = parseFloat(filters.min_rating) === starVal;
            return (
              <button
                key={starVal}
                onClick={() => handleRatingSelect(starVal.toString())}
                className={`w-full flex items-center justify-between p-3 rounded-sm text-[9px] uppercase tracking-widest transition-colors duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-neutral-200 dark:border-neutral-200 dark:text-neutral-950 font-bold'
                    : 'bg-white border-neutral-200 dark:bg-luxury-gray dark:border-neutral-800 text-neutral-500 hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                <span>{starVal.toFixed(1)}+ Stars</span>
                {isSelected && <span className="text-[8px] bg-neutral-700 text-white dark:bg-neutral-300 dark:text-neutral-950 px-1 py-0.5 rounded-sm">Active</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Sidebar */}
      <aside className="w-64 shrink-0 bg-white dark:bg-luxury-gray-dark border border-neutral-200 dark:border-neutral-850 rounded-[4px] p-6 sticky top-24 hidden lg:block self-start transition-colors duration-300">
        {content}
      </aside>

      {/* Mobile/Tablet Filter Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black z-50 lg:hidden"
            />
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
              className="fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-white dark:bg-luxury-gray-dark z-50 p-6 border-r border-neutral-200 dark:border-neutral-800 overflow-y-auto lg:hidden transition-colors duration-300"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-neutral-50 dark:bg-neutral-900 rounded-sm text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="mt-8">{content}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
