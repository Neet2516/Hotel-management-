import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import { Sparkles } from 'lucide-react';

export default function Hero({ filters, updateFilters }) {
  return (
    <div className="relative w-full min-h-[80vh] flex flex-col items-center justify-center py-20 px-4 overflow-hidden bg-slate-950">
      {/* Background Image with Parallax & Dark Gradients */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920"
          alt="Luxury Resort Background"
          className="w-full h-full object-cover object-center opacity-40 dark:opacity-30 scale-105 transform transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/20 via-transparent to-pink-950/20" />
      </div>

      {/* Floating Animated Bubbles for visual richness */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl"
        />
        <motion.div
          animate={{
            y: [10, -10, 10],
            x: [5, -5, 5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 dark:bg-slate-900/60 border border-white/20 dark:border-slate-800 text-white backdrop-blur-md mb-6"
        >
          <Sparkles size={14} className="text-amber-400 fill-current animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider">Unveil Your Next Adventure</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tight"
        >
          Find Your Perfect Stay <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
            Anywhere, Anytime.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-200 max-w-xl mb-10 leading-relaxed font-light"
        >
          Explore over 500+ premium handpicked hotels across prime locations. Compare prices, ratings, and book your dream escape.
        </motion.p>

        {/* Search Bar Container with Glassmorphism shadow */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full px-2"
        >
          <SearchBar filters={filters} updateFilters={updateFilters} />
        </motion.div>

        {/* Call to Action Button to scroll down to listings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8"
        >
          <a
            href="#explore"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors duration-300 group"
          >
            Or start browsing list
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block text-indigo-400 group-hover:text-pink-400"
            >
              ↓
            </motion.span>
          </a>
        </motion.div>

      </div>
    </div>
  );
}
