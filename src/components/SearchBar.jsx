import React, { useState, useEffect } from 'react';
import { Search, MapPin, X, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CITIES = [
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

export default function SearchBar({ filters, updateFilters }) {
  const [nameInput, setNameInput] = useState(filters.name || '');
  const [locationInput, setLocationInput] = useState(filters.location || '');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Update inputs if parent filters change
  useEffect(() => {
    setNameInput(filters.name || '');
    setLocationInput(filters.location || '');
  }, [filters.name, filters.location]);

  const saveSearchQuery = (name, location) => {
    if (!name && !location) return;
    const queryStr = [name, location].filter(Boolean).join(' in ');
    const newSearchItem = {
      id: Date.now(),
      name,
      location,
      label: queryStr,
    };

    setRecentSearches((prev) => {
      // Remove duplicate labels
      const filtered = prev.filter((item) => item.label !== queryStr);
      const updated = [newSearchItem, ...filtered].slice(0, 5); // Keep last 5
      localStorage.setItem('recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    updateFilters({
      name: nameInput,
      location: locationInput,
    });
    saveSearchQuery(nameInput, locationInput);
    setShowLocationDropdown(false);
  };

  const selectRecent = (item) => {
    setNameInput(item.name || '');
    setLocationInput(item.location || '');
    updateFilters({
      name: item.name || '',
      location: item.location || '',
    });
  };

  const clearRecent = (id, e) => {
    e.stopPropagation();
    setRecentSearches((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem('recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClear = () => {
    setNameInput('');
    setLocationInput('');
    updateFilters({
      name: '',
      location: '',
    });
  };

  const filteredCities = locationInput
    ? CITIES.filter((city) => city.toLowerCase().includes(locationInput.toLowerCase()))
    : CITIES;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Input Box */}
      <form
        onSubmit={handleSearch}
        className="bg-white dark:bg-slate-950 p-2 sm:p-3 rounded-2xl sm:rounded-full border border-gray-200/80 dark:border-slate-800 shadow-xl shadow-slate-100 dark:shadow-none flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0"
      >
        {/* Hotel Name Input */}
        <div className="flex-1 flex items-center gap-2.5 px-4 py-2 border-b sm:border-b-0 sm:border-r border-gray-100 dark:border-slate-800">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Search hotel name..."
            className="w-full bg-transparent border-none outline-none text-slate-800 dark:text-gray-100 text-sm placeholder-gray-400 focus:ring-0"
          />
          {nameInput && (
            <button
              type="button"
              onClick={() => setNameInput('')}
              className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Location Input / Autocomplete */}
        <div className="flex-1 relative flex items-center gap-2.5 px-4 py-2">
          <MapPin size={18} className="text-indigo-500 shrink-0" />
          <input
            type="text"
            value={locationInput}
            onChange={(e) => {
              setLocationInput(e.target.value);
              setShowLocationDropdown(true);
            }}
            onFocus={() => setShowLocationDropdown(true)}
            placeholder="Where are you going?"
            className="w-full bg-transparent border-none outline-none text-slate-800 dark:text-gray-100 text-sm placeholder-gray-400 focus:ring-0"
          />
          {locationInput && (
            <button
              type="button"
              onClick={() => setLocationInput('')}
              className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {showLocationDropdown && (
              <>
                {/* Backdrop to close */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowLocationDropdown(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-2xl shadow-xl z-20 max-h-60 overflow-y-auto overflow-x-hidden py-2"
                >
                  <div className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Popular Destinations
                  </div>
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => {
                          setLocationInput(city);
                          setShowLocationDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800/60 flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <MapPin size={14} className="text-gray-400" />
                        <span>{city}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-400 text-center">
                      No matching cities
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 px-2.5 sm:px-0">
          {(nameInput || locationInput) && (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 font-medium px-3 py-2 cursor-pointer transition-colors"
            >
              Clear
            </button>
          )}
          <button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-bold text-sm px-6 py-3.5 sm:py-3.5 rounded-xl sm:rounded-full shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search size={16} />
            <span>Search</span>
          </button>
        </div>
      </form>

      {/* Recent Searches */}
      <AnimatePresence>
        {recentSearches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap items-center gap-2 mt-4 px-3 overflow-hidden"
          >
            <span className="text-xs text-gray-400 flex items-center gap-1.5 mr-1 font-medium">
              <History size={13} />
              Recent:
            </span>
            {recentSearches.map((item) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={() => selectRecent(item)}
                className="inline-flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-slate-900 dark:hover:bg-slate-800 px-3 py-1.5 rounded-full cursor-pointer transition-colors border border-gray-200/20"
              >
                <span>{item.label}</span>
                <button
                  type="button"
                  onClick={(e) => clearRecent(item.id, e)}
                  className="hover:text-red-500 dark:hover:text-red-400 p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800"
                >
                  <X size={10} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
