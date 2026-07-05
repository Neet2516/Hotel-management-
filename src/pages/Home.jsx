import React, { useState } from 'react';
import { useHotels } from '../hooks/useHotels';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import FeaturedDestinations from '../components/FeaturedDestinations';
import SignatureCollections from '../components/SignatureCollections';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import FilterSidebar from '../components/FilterSidebar';
import SortDropdown from '../components/SortDropdown';
import HotelGrid from '../components/HotelGrid';
import Pagination from '../components/Pagination';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import { SlidersHorizontal, XCircle } from 'lucide-react';

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
  } = useHotels(10); // Standard limit 10 for alternating view

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleReset = () => {
    resetFilters();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-luxury-gray-dark transition-colors duration-300">
      
      {/* 1. Hero Section (asymmetrical split layout) */}
      <Hero />

      {/* 2. Search Experience (placed immediately below the hero inside a clean card with thin black borders) */}
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 lg:px-20 -mt-10 sm:-mt-12 relative z-20">
        <div className="bg-white dark:bg-luxury-gray-dark border border-neutral-900 dark:border-neutral-800 p-6 sm:p-8 rounded-[4px] shadow-sm select-none">
          <div className="mb-4 text-left">
            <span className="text-[8px] font-extrabold tracking-[0.3em] text-neutral-400 uppercase">
              RESERVE YOUR STAY
            </span>
            <h2 className="font-editorial text-lg text-neutral-900 dark:text-white italic mt-1">
              Select your coordinate parameters
            </h2>
          </div>
          <SearchBar filters={filters} updateFilters={updateFilters} />
        </div>
      </div>

      {/* 3. Featured Destinations (large editorial grid) */}
      <FeaturedDestinations />

      {/* 4. Signature Collections (minimal image cards) */}
      <SignatureCollections />

      {/* 5. Why Choose Us (large numbers, strong typography) */}
      <Stats />

      {/* 6. Luxury Hotels (alternating layout with sidebar filters and sort) */}
      <main id="explore" className="max-w-7xl w-full mx-auto px-6 sm:px-12 lg:px-20 py-24 scroll-mt-24">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-neutral-200 dark:border-neutral-800 pb-8 mb-12 gap-4">
          <div className="text-left space-y-2">
            <span className="text-[9px] font-bold tracking-[0.3em] text-neutral-400 uppercase">
              INDEX SERIES
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-neutral-900 dark:text-white leading-tight font-light">
              Luxury Hotels
            </h2>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 font-light font-sans max-w-sm">
              {loading ? (
                <span>Retrieving luxury index...</span>
              ) : (
                <span>Showing <span className="font-semibold text-neutral-900 dark:text-white">{totalCount}</span> curated architectural stays</span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter Toggle Mobile/Tablet */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white dark:bg-luxury-gray border border-neutral-900 dark:border-neutral-800 rounded-sm text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 shadow-sm transition-colors cursor-pointer"
            >
              <SlidersHorizontal size={12} className="text-neutral-400" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Sidebar Filters */}
          <FilterSidebar
            filters={filters}
            updateFilters={updateFilters}
            resetFilters={resetFilters}
            isOpen={mobileFiltersOpen}
            onClose={() => setMobileFiltersOpen(false)}
          />

          {/* Grid/Alternating list area */}
          <div className="flex-1 w-full">
            {loading ? (
              <LoadingSkeleton count={3} />
            ) : error ? (
              <EmptyState
                title="Sanctuary Index Failed"
                description={error}
                actionLabel="Try Again"
                onAction={() => updateFilters({})}
                icon={<XCircle size={28} className="text-neutral-400" />}
              />
            ) : hotels.length === 0 ? (
              <EmptyState
                title="Index Empty"
                description="No curated properties match your requested parameters. Try resetting filters."
                actionLabel="Clear Parameters"
                onAction={handleReset}
              />
            ) : (
              <>
                <HotelGrid hotels={hotels} layoutMode="alternating" />
                <Pagination
                  totalCount={totalCount}
                  page={page}
                  setPage={setPage}
                  itemsPerPage={10}
                />
              </>
            )}
          </div>
        </div>
      </main>

      {/* 7. Testimonials (editorial quotes) */}
      <Testimonials />

    </div>
  );
}
