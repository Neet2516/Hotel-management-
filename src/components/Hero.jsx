import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-white dark:bg-luxury-gray-dark pt-20 px-6 sm:px-12 lg:px-20 select-none overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12">
        
        {/* Left Editorial Text Column */}
        <div className="lg:col-span-6 space-y-8 flex flex-col justify-center text-left">
          
          {/* Uppercase Small Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="h-[1px] w-8 bg-neutral-900 dark:bg-neutral-100" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-300">
              ROAM RESERVE — SIGNATURE I
            </span>
          </motion.div>

          {/* Large Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-editorial text-5xl sm:text-7xl font-light text-neutral-900 dark:text-white leading-[1.08] tracking-tight"
          >
            The Art of <br />
            <span className="italic">Architectural</span> <br />
            Solitude.
          </motion.h1>

          {/* Premium Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed font-sans"
          >
            A curated portfolio of architectural spaces and design-led sanctuaries, selected for the quiet traveler who appreciates form, function, and visual silence.
          </motion.p>

          {/* Action Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4"
          >
            {/* Primary Sharp Button */}
            <a
              href="#explore"
              className="inline-block text-center border border-neutral-950 dark:border-neutral-200 bg-neutral-950 dark:bg-neutral-200 hover:bg-transparent dark:hover:bg-transparent text-white dark:text-neutral-950 hover:text-neutral-950 dark:hover:text-white text-[10px] font-bold uppercase tracking-[0.25em] px-8 py-4 rounded-[4px] transition-colors duration-400"
            >
              Explore Sanctuary
            </a>

            {/* Secondary Text Link */}
            <a
              href="#collections"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 hover:text-neutral-900 dark:hover:text-white group transition-colors duration-300 py-2 cursor-pointer"
            >
              <span>View Collections</span>
              <ArrowRight size={13} className="text-neutral-400 group-hover:translate-x-1 group-hover:text-neutral-900 dark:group-hover:text-white transition-all" />
            </a>
          </motion.div>
        </div>

        {/* Right Architectural Image Column */}
        <div className="lg:col-span-6 w-full h-[60vh] lg:h-[75vh] relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-[4px]">
          <motion.div
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="w-full h-full relative"
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
              alt="Minimalist Architectural Hotel Façade"
              className="w-full h-full object-cover grayscale transition-all duration-500 ease-in-out hover:grayscale-0 contrast-[1.15] brightness-95"
            />
            {/* Dark vignette tint for editorial feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Small metadata text label overlay on image */}
          <div className="absolute bottom-6 right-6 text-[8px] font-semibold text-white/50 tracking-[0.25em] uppercase pointer-events-none">
            Aman Resort — Koshiki, Japan
          </div>
        </div>

      </div>
    </section>
  );
}
