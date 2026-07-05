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
      const filtered = prev.filter((item) => item.label !== queryStr);
      const updated = [newSearchItem, ...filtered].slice(0, 4); // Keep last 4
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
    <div className="w-full">
      {/* Search Input Box */}
      <form
        onSubmit={handleSearch}
        className="bg-white dark:bg-luxury-gray border border-neutral-900 dark:border-neutral-850 p-2 rounded-[4px] flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0"
      >
        {/* Hotel Name Input */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800">
          <Search size={14} className="text-neutral-400 shrink-0" />
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Search hotels, villas, or estates..."
            className="w-full bg-transparent border-none outline-none text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 tracking-wider focus:ring-0 uppercase font-sans font-medium"
          />
          {nameInput && (
            <button
              type="button"
              onClick={() => setNameInput('')}
              className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-neutral-900 cursor-pointer"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Location Input / Autocomplete */}
        <div className="flex-1 relative flex items-center gap-3 px-4 py-3">
          <MapPin size={14} className="text-neutral-400 shrink-0" />
          <input
            type="text"
            value={locationInput}
            onChange={(e) => {
              setLocationInput(e.target.value);
              setShowLocationDropdown(true);
            }}
            onFocus={() => setShowLocationDropdown(true)}
            placeholder="Select sanctuary region..."
            className="w-full bg-transparent border-none outline-none text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 tracking-wider focus:ring-0 uppercase font-sans font-medium"
          />
          {locationInput && (
            <button
              type="button"
              onClick={() => setLocationInput('')}
              className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-neutral-900 cursor-pointer"
            >
              <X size={12} />
            </button>
          )}

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {showLocationDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowLocationDropdown(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-luxury-gray border border-neutral-900 dark:border-neutral-800 rounded-[4px] z-20 max-h-60 overflow-y-auto py-2 shadow-lg"
                >
                  <div className="px-4 py-2 text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
                    Destinations
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
                        className="w-full text-left px-4 py-2 text-xs text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2 tracking-widest uppercase cursor-pointer"
                      >
                        <MapPin size={12} className="text-neutral-400" />
                        <span>{city}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-xs text-neutral-400 text-center uppercase tracking-widest">
                      No regions match
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 px-2 md:px-0">
          {(nameInput || locationInput) && (
            <button
              type="button"
              onClick={handleClear}
              className="text-[10px] text-neutral-400 hover:text-neutral-900 dark:hover:text-white uppercase font-bold tracking-[0.2em] px-3 py-2 cursor-pointer transition-colors"
            >
              Clear
            </button>
          )}
          <button
            type="submit"
            className="w-full md:w-auto bg-neutral-900 dark:bg-neutral-200 text-white dark:text-neutral-900 hover:bg-neutral-950 dark:hover:bg-white text-[10px] font-bold uppercase tracking-[0.25em] px-8 py-3.5 rounded-[4px] cursor-pointer transition-colors"
          >
            Explore
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
            className="flex flex-wrap items-center gap-2 mt-4 px-1 overflow-hidden"
          >
            <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-bold">
              History:
            </span>
            {recentSearches.map((item) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={() => selectRecent(item)}
                className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.15em] font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800 px-3 py-1 cursor-pointer transition-colors rounded-sm"
              >
                <span>{item.label}</span>
                <button
                  type="button"
                  onClick={(e) => clearRecent(item.id, e)}
                  className="hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 p-0.5 rounded-full"
                >
                  <X size={9} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
