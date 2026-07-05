import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import HotelCard from '../components/HotelCard';
import EmptyState from '../components/EmptyState';
import { Heart, ArrowLeft, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Favorites() {
  const { favorites, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50/30 dark:bg-slate-950/20 py-12 min-h-[80vh] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2.5">
              <Heart size={28} className="text-red-500 fill-current" />
              <span>Saved Favorites</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your bookmarked properties and luxury getaways.
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft size={14} />
            <span>Continue Exploring</span>
          </button>
        </div>

        {/* Saved Items List */}
        {favorites.length === 0 ? (
          <EmptyState
            title="Your Favorites List is Empty"
            description="You haven't saved any luxury stays yet. Browse through our premium selection of hotels and tap the heart icon to save them here."
            actionLabel="Browse Hotels"
            onAction={() => navigate('/')}
            icon={<Heart size={36} className="text-gray-300 dark:text-gray-600" />}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {favorites.map((hotel) => (
                <motion.div
                  key={hotel.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: 15 }}
                  transition={{ duration: 0.35 }}
                  className="relative group/card"
                >
                  <HotelCard hotel={hotel} />
                  
                  {/* Absolute remove button overlay for quick access */}
                  <button
                    onClick={() => removeFromFavorites(hotel.id)}
                    className="absolute bottom-5.5 left-5 p-2.5 bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-500 hover:text-white rounded-xl shadow-sm cursor-pointer transition-colors duration-300 opacity-0 group-hover/card:opacity-100 focus:opacity-100 z-10 text-xs flex items-center gap-1 border border-red-200/40"
                    title="Remove item"
                  >
                    <Trash2 size={13} />
                    <span className="font-semibold">Remove</span>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
