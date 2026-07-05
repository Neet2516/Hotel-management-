import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin, Star, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import RatingStars from './RatingStars';

export default function HotelCard({ hotel }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(hotel.id);

  const formattedPrice = Math.round(parseFloat(hotel.price) || 0).toLocaleString('en-IN');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col bg-white dark:bg-luxury-gray border border-neutral-200 dark:border-neutral-850 rounded-[4px] overflow-hidden transition-colors duration-300 h-full select-none"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-850">
        <img
          src={hotel.thumbnail || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=60'}
          alt={hotel.name}
          className="w-full h-full object-cover grayscale contrast-[1.1] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=60';
          }}
        />

        {/* Favorite Icon overlay */}
        <button
          onClick={() => toggleFavorite(hotel)}
          className="absolute top-4 right-4 p-2 rounded-sm bg-white dark:bg-luxury-gray border border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 shadow-sm active:scale-95 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer z-10"
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            size={14}
            className={`transition-colors ${favorited ? 'text-neutral-900 dark:text-white fill-current' : 'text-neutral-400 dark:text-neutral-500'}`}
          />
        </button>

        {/* Rating overlay on thumbnail */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1 px-2.5 py-1 rounded-sm bg-neutral-900/90 dark:bg-luxury-gray/90 text-white text-[9px] font-bold tracking-wider">
          <Star size={10} className="text-white fill-current stroke-none" />
          <span>{(hotel.rating || 0).toFixed(1)}</span>
        </div>
      </div>

      {/* Details section */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Location */}
          <div className="flex items-center gap-1 text-[9px] text-neutral-400 font-bold uppercase tracking-[0.25em]">
            <MapPin size={10} className="text-neutral-400 shrink-0" />
            <span>{hotel.location}</span>
          </div>

          {/* Name - Serif font */}
          <h3 className="font-editorial text-xl font-light text-neutral-900 dark:text-white line-clamp-1 italic group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
            {hotel.name}
          </h3>

          {/* Stars Component */}
          <RatingStars rating={hotel.rating} showNumber={false} size={11} />

          {/* Snippet Description */}
          <p className="text-xs font-light text-neutral-400 dark:text-neutral-500 line-clamp-2 leading-relaxed pt-1 font-sans">
            {hotel.description}
          </p>
        </div>

        {/* Price & Action button */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-850">
          <div className="flex flex-col">
            <span className="text-[8px] text-neutral-400 font-bold uppercase tracking-widest">Rate / Night</span>
            <span className="font-editorial text-lg font-medium text-neutral-900 dark:text-white mt-0.5">
              ₹{formattedPrice}
            </span>
          </div>

          <Link
            to={`/hotel/${hotel.id}`}
            className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] border border-neutral-900 dark:border-neutral-200 bg-neutral-900 dark:bg-neutral-200 hover:bg-transparent dark:hover:bg-transparent text-white dark:text-neutral-900 hover:text-neutral-900 dark:hover:text-white px-5 py-3 rounded-sm transition-colors duration-300 cursor-pointer shrink-0"
          >
            <span>Details</span>
            <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
