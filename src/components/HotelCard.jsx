import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin, Star, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import RatingStars from './RatingStars';

export default function HotelCard({ hotel }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(hotel.id);

  // Format price
  const formattedPrice = Math.round(parseFloat(hotel.price) || 0).toLocaleString('en-IN');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none transition-shadow duration-300 h-full select-none"
    >
      {/* Thumbnail & Favorite button */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-slate-900">
        <img
          src={hotel.thumbnail || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=60'}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=60';
          }}
        />

        {/* Favorite Icon overlay */}
        <button
          onClick={() => toggleFavorite(hotel)}
          className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-md hover:scale-110 active:scale-90 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-all cursor-pointer z-10"
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            size={18}
            className={`transition-colors ${favorited ? 'text-red-500 fill-current' : 'text-gray-400 dark:text-gray-500'}`}
          />
        </button>

        {/* Rating overlay on thumbnail */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-sm text-white text-xs font-semibold">
          <Star size={12} className="text-amber-400 fill-current stroke-none" />
          <span>{(hotel.rating || 0).toFixed(1)}</span>
        </div>
      </div>

      {/* Details section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 font-medium">
            <MapPin size={13} className="text-indigo-500 shrink-0" />
            <span>{hotel.location}</span>
          </div>

          {/* Name */}
          <h3 className="font-bold text-slate-800 dark:text-gray-100 text-base line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {hotel.name}
          </h3>

          {/* Stars Component */}
          <RatingStars rating={hotel.rating} showNumber={false} size={14} />

          {/* Snippet Description */}
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed pt-1">
            {hotel.description}
          </p>
        </div>

        {/* Price & Action button */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 dark:border-slate-850">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Per Night</span>
            <span className="font-extrabold text-slate-900 dark:text-white text-lg">
              ₹{formattedPrice}
            </span>
          </div>

          <Link
            to={`/hotel/${hotel.id}`}
            className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 hover:bg-indigo-600 dark:bg-slate-900 dark:hover:bg-indigo-600 dark:hover:text-white hover:text-white px-4 py-2.5 rounded-xl transition-all duration-300 group-hover:shadow-md cursor-pointer shrink-0"
          >
            <span>Details</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
