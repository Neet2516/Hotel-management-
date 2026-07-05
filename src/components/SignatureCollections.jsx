import React from 'react';
import { motion } from 'framer-motion';

const COLLECTIONS = [
  {
    title: 'DESERT BRUTALISM',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=600',
    count: '14 Properties',
  },
  {
    title: 'ALPINE ISOLATION',
    image: 'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&q=80&w=600',
    count: '08 Properties',
  },
  {
    title: 'TROPICAL SILENCE',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=600',
    count: '23 Properties',
  },
  {
    title: 'BRUTALIST PAVILIONS',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600',
    count: '11 Properties',
  },
];

export default function SignatureCollections() {
  return (
    <section id="collections" className="py-24 bg-white dark:bg-luxury-gray-dark select-none transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="text-left space-y-4 max-w-md">
            <span className="text-[9px] font-bold tracking-[0.3em] text-neutral-400 uppercase">
              CATEGORIES
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-neutral-900 dark:text-white leading-tight font-light">
              Signature Collections
            </h2>
          </div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase border-b border-neutral-200 dark:border-neutral-800 pb-1 cursor-pointer">
            Browse All Series
          </span>
        </div>

        {/* Minimal Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLECTIONS.map((col, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-4 text-left group"
            >
              {/* Image Frame */}
              <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-[4px] border border-neutral-200/30 dark:border-neutral-850">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover grayscale contrast-[1.1] transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* Text metadata */}
              <div className="flex justify-between items-baseline pt-1">
                <h3 className="text-[10px] font-extrabold tracking-[0.2em] text-neutral-900 dark:text-white">
                  {col.title}
                </h3>
                <span className="text-[9px] font-medium tracking-[0.1em] text-neutral-400">
                  {col.count}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
