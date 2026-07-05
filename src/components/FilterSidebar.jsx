import React, { useState } from 'react';
import { X, SlidersHorizontal, MapPin, Landmark, Star, DollarSign } from 'lucide-react';
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
    // If clicking already selected location, clear it; otherwise set it.
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
    <div className="space-y-6">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-150 dark:border-slate-800">
        <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white text-base">
          <SlidersHorizontal size={18} className="text-indigo-500" />
          <span>Filters</span>
        </div>
        <button
          onClick={handleClear}
          className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
        >
          Reset All
        </button>
      </div>

      {/* Location Filter */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-700 dark:text-gray-200 flex items-center gap-1.5">
          <MapPin size={15} className="text-gray-400" />
          <span>Popular Cities</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {LOCATIONS.map((city) => {
            const isSelected = filters.location === city;
            return (
              <button
                key={city}
                onClick={() => handleLocationToggle(city)}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 dark:bg-slate-900 dark:border-slate-850 dark:text-gray-300 dark:hover:border-slate-700'
                }`}
              >
                {city}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Filter */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-700 dark:text-gray-200 flex items-center gap-1.5">
          <DollarSign size={15} className="text-gray-400" />
          <span>Price Range (₹)</span>
        </label>
        <form onSubmit={handlePriceApply} className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-gray-200 outline-none focus:border-indigo-500"
            />
            <span className="text-gray-400 text-xs">to</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-gray-200 outline-none focus:border-indigo-500"
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
              className="w-full text-[10px] py-1.5 rounded-lg border border-gray-200 dark:border-slate-850 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              Under ₹3k
            </button>
            <button
              type="button"
              onClick={() => {
                setMinPriceInput('3000');
                setMaxPriceInput('7000');
                updateFilters({ min_price: '3000', max_price: '7000' });
              }}
              className="w-full text-[10px] py-1.5 rounded-lg border border-gray-200 dark:border-slate-850 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              ₹3k - ₹7k
            </button>
            <button
              type="button"
              onClick={() => {
                setMinPriceInput('7000');
                setMaxPriceInput('10000');
                updateFilters({ min_price: '7000', max_price: '10000' });
              }}
              className="w-full text-[10px] py-1.5 rounded-lg border border-gray-200 dark:border-slate-850 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              Over ₹7k
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-100 hover:bg-indigo-600 dark:bg-slate-900 dark:hover:bg-indigo-600 dark:text-gray-300 text-slate-700 hover:text-white font-semibold py-2 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Apply Price
          </button>
        </form>
      </div>

      {/* Rating Filter */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-700 dark:text-gray-200 flex items-center gap-1.5">
          <Star size={15} className="text-gray-400" />
          <span>Star Rating</span>
        </label>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((starVal) => {
            const isSelected = parseFloat(filters.min_rating) === starVal;
            return (
              <button
                key={starVal}
                onClick={() => handleRatingSelect(starVal.toString())}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-all duration-300 border cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/20 dark:border-indigo-900/60 dark:text-indigo-400'
                    : 'bg-white border-gray-100 dark:bg-slate-900 dark:border-slate-850 text-gray-600 hover:border-gray-200 dark:text-gray-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        fill={i < Math.floor(starVal) ? 'currentColor' : 'none'}
                        className={i < Math.floor(starVal) ? 'stroke-none' : 'text-gray-300 dark:text-gray-600'}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{starVal.toFixed(1)}+ Stars</span>
                </div>
                {isSelected && <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-md">Active</span>}
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
      <aside className="w-64 shrink-0 bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm sticky top-20 hidden lg:block self-start transition-colors duration-300">
        {content}
      </aside>

      {/* Mobile/Tablet Filter Drawer (using Framer Motion) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black z-50 lg:hidden"
            />
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-white dark:bg-slate-950 z-50 p-6 shadow-2xl overflow-y-auto lg:hidden transition-colors duration-300"
            >
              {/* Close Button inside drawer */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-gray-50 dark:bg-slate-900 rounded-xl text-gray-500 hover:text-gray-800 dark:hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="mt-4">{content}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
