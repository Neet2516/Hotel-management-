import React from 'react';
import { motion } from 'framer-motion';

const QUOTES = [
  {
    text: '“ROAM RESERVE IS THE ANTIDOTE TO CLUTTERED TRAVEL. A TRANQUIL INDEX OF GEOMETRIC MASTERPIECES.”',
    author: 'VOGUE TRAVEL JOURNAL',
    location: 'September Issue',
  },
  {
    text: '“FOR THOSE WHO APPRECIATE THE POETRY OF VISUAL SILENCE AND PURE ARCHITECTURAL FORMS.”',
    author: 'CEREAL MAGAZINE',
    location: 'Volume 24',
  },
  {
    text: '“THE HOTELS LISTED ARE SENSORY SANCTUARIES. MINIMALISM BROUGHT TO ITS LOGICAL COMPASSION.”',
    author: 'LEICA JOURNAL',
    location: 'Autumn Review',
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-[#F5F5F5] dark:bg-luxury-gray border-t border-b border-neutral-200 dark:border-neutral-850 select-none transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Quote Layout Carousel/List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {QUOTES.map((q, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex flex-col justify-between text-left space-y-6"
            >
              {/* Quote text */}
              <p className="font-editorial text-2xl font-light text-neutral-800 dark:text-neutral-200 leading-relaxed italic">
                {q.text}
              </p>

              {/* Source/Citation */}
              <div className="space-y-1">
                <span className="text-[9px] font-extrabold tracking-[0.25em] text-neutral-900 dark:text-white uppercase font-sans">
                  {q.author}
                </span>
                <span className="block text-[8px] font-medium tracking-wider text-neutral-400">
                  {q.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
