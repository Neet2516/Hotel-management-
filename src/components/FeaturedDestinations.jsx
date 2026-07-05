import React from 'react';
import { motion } from 'framer-motion';

const DESTINATIONS = [
  {
    name: 'GOA COASTLINE',
    desc: 'Quiet seaside basalt architecture designed for coastal isolation.',
    image: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'JAIPUR ESTATES',
    desc: 'Symmetry and sandstone, quiet courtyards engineered for solitude.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'NOIDA MINIMALISM',
    desc: 'Brutalist concrete frames interacting with quiet water features.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'MUMBAI SKYLINE',
    desc: 'High-rise glass pavilions designed for quiet contemplation above the city.',
    image: 'https://images.unsplash.com/photo-1562184552-997c461abbe6?auto=format&fit=crop&q=80&w=800',
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="py-24 bg-white dark:bg-luxury-gray-dark select-none transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Section Header */}
        <div className="max-w-xl text-left mb-16 space-y-4">
          <span className="text-[9px] font-bold tracking-[0.3em] text-neutral-400 uppercase">
            COLLECTION 01
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-neutral-900 dark:text-white leading-tight font-light">
            Featured Destinations
          </h2>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 font-light font-sans max-w-sm leading-relaxed">
            Four structural sanctuaries handpicked for their geometric proportions and atmospheric quiet.
          </p>
        </div>

        {/* Balanced Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {DESTINATIONS.map((dest, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-[4px] border border-neutral-200/40 dark:border-neutral-800/40 aspect-[16/10] cursor-pointer"
            >
              {/* Image Frame */}
              <div className="w-full h-full overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover grayscale transition-all duration-700 ease-in-out transform group-hover:scale-105 group-hover:grayscale-0 contrast-[1.1]"
                  loading="lazy"
                />
              </div>

              {/* Minimal Text Overlay (pointer-events-none to prevent interception) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-left opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="text-[8px] font-bold tracking-[0.25em] text-white/50 mb-1.5 uppercase font-sans">
                  {dest.name}
                </span>
                <h3 className="font-editorial text-xl font-light text-white mb-2 italic">
                  {dest.name.split(' ')[0]} Sanctuary
                </h3>
                <p className="text-[10px] text-white/70 max-w-xs leading-relaxed font-sans font-light opacity-0 group-hover:opacity-100 transition-opacity duration-550">
                  {dest.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
