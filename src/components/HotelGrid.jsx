import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HotelCard from './HotelCard';

export default function HotelGrid({ hotels }) {
  return (
    <div className="w-full">
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {hotels.map((hotel, idx) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.4) }}
              layout
            >
              <HotelCard hotel={hotel} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
