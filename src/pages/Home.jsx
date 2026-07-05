import React, { useState } from 'react';
import { useHotels } from '../hooks/useHotels';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import FilterSidebar from '../components/FilterSidebar';
import SortDropdown from '../components/SortDropdown';
import HotelGrid from '../components/HotelGrid';
import Pagination from '../components/Pagination';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import { SlidersHorizontal, RefreshCw, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const {
    hotels,
    totalCount,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    sortBy,
    setSortBy,
    page,
    setPage,
  } = useHotels(12);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleReset = () => {
    resetFilters();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero filters={filters} updateFilters={updateFilters} />

      {/* Stats counter section */}
      <Stats />

      {/* Main Exploration Section */}
      <main id="explore" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
        
        {/* Title & Controls bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white mb-1">
              Explore Available Stays
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {loading ? (
                <span>Finding best deals...</span>
              ) : (
                <span>Found <span className="font-semibold text-indigo-600 dark:text-indigo-400">{totalCount}</span> luxury properties matching your preferences</span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3.5">
            {/* Filter Toggle Mobile/Tablet */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 hover:border-indigo-500 shadow-sm transition-colors cursor-pointer"
            >
              <SlidersHorizontal size={14} className="text-indigo-500" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar Filters */}
          <FilterSidebar
            filters={filters}
            updateFilters={updateFilters}
            resetFilters={resetFilters}
            isOpen={mobileFiltersOpen}
            onClose={() => setMobileFiltersOpen(false)}
          />

          {/* Grid area */}
          <div className="flex-1 w-full">
            {loading ? (
              <LoadingSkeleton count={6} />
            ) : error ? (
              <EmptyState
                title="Failed to Load Stays"
                description={error}
                actionLabel="Try Again"
                onAction={() => updateFilters({})}
                icon={<XCircle size={36} className="text-red-500" />}
              />
            ) : hotels.length === 0 ? (
              <EmptyState
                title="No Stays Match Your Search"
                description="We couldn't find any hotels matching your search inputs. Try widening your price ranges or selecting different cities."
                actionLabel="Reset Filters"
                onAction={handleReset}
              />
            ) : (
              <>
                <HotelGrid hotels={hotels} />
                <Pagination
                  totalCount={totalCount}
                  page={page}
                  setPage={setPage}
                  itemsPerPage={12}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
