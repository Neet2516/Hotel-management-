import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import RatingStars from './RatingStars';

export default function HotelGrid({ hotels, layoutMode = 'alternating' }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (layoutMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {hotels.map((hotel) => {
          const favorited = isFavorite(hotel.id);
          const formattedPrice = Math.round(parseFloat(hotel.price) || 0).toLocaleString('en-IN');
          return (
            <motion.div
              key={hotel.id}
              layout
              className="group bg-white dark:bg-luxury-gray border border-neutral-200 dark:border-neutral-850 rounded-sm overflow-hidden text-left"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
                <img
                  src={hotel.thumbnail}
                  alt={hotel.name}
                  className="w-full h-full object-cover grayscale contrast-[1.1] transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <button
                  onClick={() => toggleFavorite(hotel)}
                  className="absolute top-3 right-3 p-1.5 bg-white dark:bg-luxury-gray border border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                >
                  <Heart size={12} className={favorited ? 'text-neutral-900 dark:text-white fill-current' : ''} />
                </button>
              </div>
              <div className="p-4 space-y-2">
                <span className="text-[8px] font-bold tracking-[0.2em] text-neutral-400 uppercase">{hotel.location}</span>
                <h3 className="font-editorial text-lg italic font-light text-neutral-900 dark:text-white leading-tight">{hotel.name}</h3>
                <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-850">
                  <span className="font-editorial text-sm font-semibold">₹{formattedPrice}</span>
                  <Link to={`/hotel/${hotel.id}`} className="text-[9px] font-bold uppercase tracking-widest text-neutral-900 dark:text-white flex items-center gap-1">
                    <span>Explore</span>
                    <ArrowRight size={10} />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Alternating image/text layout for luxury editorial feel
  return (
    <div className="space-y-16 sm:space-y-24 w-full">
      <AnimatePresence mode="popLayout">
        {hotels.map((hotel, idx) => {
          const isEven = idx % 2 === 0;
          const favorited = isFavorite(hotel.id);
          const formattedPrice = Math.round(parseFloat(hotel.price) || 0).toLocaleString('en-IN');

          return (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: Math.min(idx * 0.05, 0.25) }}
              className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Image Frame */}
              <div className="w-full lg:w-1/2 aspect-[16/10] overflow-hidden bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-850 rounded-sm relative group">
                <img
                  src={hotel.thumbnail || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1080&auto=format&fit=crop&q=80'}
                  alt={hotel.name}
                  className="w-full h-full object-cover grayscale contrast-[1.1] brightness-[0.98] transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1080&auto=format&fit=crop&q=80';
                  }}
                />

                {/* Favorite Overlay Trigger */}
                <button
                  onClick={() => toggleFavorite(hotel)}
                  className="absolute top-4 right-4 p-2.5 bg-white/95 dark:bg-luxury-gray/95 border border-neutral-900 dark:border-neutral-800 text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer rounded-sm"
                  aria-label="Add to favorites"
                >
                  <Heart
                    size={14}
                    className={favorited ? 'text-neutral-950 dark:text-white fill-current' : ''}
                  />
                </button>
              </div>

              {/* Text Info */}
              <div className="w-full lg:w-1/2 text-left space-y-4">
                <div className="flex items-center gap-2 text-[9px] font-bold text-neutral-400 tracking-[0.3em] uppercase">
                  <MapPin size={10} className="text-neutral-400" />
                  <span>{hotel.location}</span>
                  <span>•</span>
                  <span>STAY {hotel.id.toString().padStart(3, '0')}</span>
                </div>

                <h3 className="font-editorial text-3xl sm:text-4xl font-light text-neutral-900 dark:text-white leading-tight italic">
                  {hotel.name}
                </h3>

                <RatingStars rating={hotel.rating} showNumber size={12} />

                <p className="text-xs text-neutral-400 dark:text-neutral-500 font-light leading-relaxed max-w-md font-sans">
                  {hotel.description}
                </p>

                <div className="flex items-baseline gap-2 pt-2">
                  <span className="text-[8px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Rate / Night</span>
                  <span className="font-editorial text-xl font-medium text-neutral-900 dark:text-white">
                    ₹{formattedPrice}
                  </span>
                </div>

                <div className="pt-4">
                  <Link
                    to={`/hotel/${hotel.id}`}
                    className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.25em] border border-neutral-900 dark:border-neutral-200 bg-neutral-900 dark:bg-neutral-200 hover:bg-transparent dark:hover:bg-transparent text-white dark:text-neutral-950 hover:text-neutral-900 dark:hover:text-white px-8 py-3.5 rounded-sm transition-colors duration-400 cursor-pointer"
                  >
                    <span>Request Booking Details</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
