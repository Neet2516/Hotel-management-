import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import HotelGrid from '../components/HotelGrid';
import EmptyState from '../components/EmptyState';
import { Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Favorites() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-luxury-gray-dark py-24 min-h-[80vh] transition-colors duration-300 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Header Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-neutral-200 dark:border-neutral-800 pb-8 mb-12 gap-4">
          <div className="text-left space-y-2">
            <span className="text-[9px] font-bold tracking-[0.3em] text-neutral-400 uppercase">
              YOUR DIARY
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl text-neutral-900 dark:text-white leading-tight font-light italic">
              Saved Favorites
            </h1>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 font-light font-sans">
              A private catalog of your bookmarked architectural escapes.
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={12} />
            <span>Return to Index</span>
          </button>
        </div>

        {/* Saved Items Grid */}
        {favorites.length === 0 ? (
          <EmptyState
            title="Wishlist is Empty"
            description="No curated properties have been saved yet. Browse our selection and bookmark your next sanctuary stay."
            actionLabel="Return to Index"
            onAction={() => navigate('/')}
            icon={<Heart size={28} className="text-neutral-300 dark:text-neutral-700" />}
          />
        ) : (
          <div className="max-w-4xl mx-auto">
            <HotelGrid hotels={favorites} layoutMode="grid" />
          </div>
        )}
      </div>
    </div>
  );
}
