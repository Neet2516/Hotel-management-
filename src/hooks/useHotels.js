import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../services/api';
import { useDebounce } from './useDebounce';

const INITIAL_FILTERS = {
  search: '',
  name: '',
  location: '',
  min_price: '',
  max_price: '',
  min_rating: '',
  max_rating: '',
};

export function useHotels(itemsPerPage = 12) {
  const [hotels, setHotels] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters State
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState('-rating'); // Default: Rating (high to low)
  const [page, setPage] = useState(1);

  // Debounce search input to avoid spamming APIs
  const debouncedSearch = useDebounce(filters.search, 500);
  const debouncedName = useDebounce(filters.name, 500);
  const debouncedLocation = useDebounce(filters.location, 500);

  // Ref to track if initial fetch has run or to avoid double fetching
  const isInitialMount = useRef(true);

  const fetchHotels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const skip = (page - 1) * itemsPerPage;
      
      const apiParams = {
        limit: itemsPerPage,
        skip,
        search: debouncedSearch,
        name: debouncedName,
        location: debouncedLocation,
        min_price: filters.min_price,
        max_price: filters.max_price,
        min_rating: filters.min_rating,
        max_rating: filters.max_rating,
        order_by: sortBy,
      };

      const result = await api.getHotels(apiParams);
      
      if (result && result.status === 200) {
        setHotels(result.data || []);
        setTotalCount(result.count || 0);
      } else {
        throw new Error(result?.message || 'Failed to fetch hotels');
      }
    } catch (err) {
      console.error('Error fetching hotels:', err);
      setError(err.message || 'Something went wrong while fetching hotels.');
      setHotels([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    itemsPerPage,
    debouncedSearch,
    debouncedName,
    debouncedLocation,
    filters.min_price,
    filters.max_price,
    filters.min_rating,
    filters.max_rating,
    sortBy,
  ]);

  // Trigger fetch when parameters change
  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  // Reset page when filters or sorting change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setPage(1);
  }, [
    debouncedSearch,
    debouncedName,
    debouncedLocation,
    filters.min_price,
    filters.max_price,
    filters.min_rating,
    filters.max_rating,
    sortBy,
  ]);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setSortBy('-rating');
    setPage(1);
  }, []);

  return {
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
    refetch: fetchHotels,
  };
}
