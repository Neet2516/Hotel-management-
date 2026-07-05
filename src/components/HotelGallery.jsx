import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HotelGallery({ photos = [], name = 'Hotel Gallery' }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <div className="aspect-[16/9] w-full rounded-2xl bg-gray-100 dark:bg-slate-900 flex items-center justify-center text-gray-400">
        No images available
      </div>
    );
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Big Main Image Showcase */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-900 shadow-md">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={photos[activeIndex]}
            alt={`${name} - View ${activeIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover select-none"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1080&auto=format&fit=crop&q=80';
            }}
          />
        </AnimatePresence>

        {/* Carousel Arrow Controls */}
        {photos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 text-slate-800 dark:text-white shadow-md active:scale-90 transition-all cursor-pointer z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 text-slate-800 dark:text-white shadow-md active:scale-90 transition-all cursor-pointer z-10"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Index indicator */}
        <div className="absolute bottom-4 right-4 bg-slate-900/70 text-white text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm">
          {activeIndex + 1} / {photos.length}
        </div>
      </div>

      {/* Row of Thumbnail Indicators */}
      {photos.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
          {photos.map((photo, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-gray-150 dark:bg-slate-900 border-2 transition-all duration-300 cursor-pointer ${
                  isActive ? 'border-indigo-600 scale-[0.98]' : 'border-transparent hover:border-gray-300 dark:hover:border-slate-700'
                }`}
              >
                <img
                  src={photo}
                  alt={`${name} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&auto=format&fit=crop&q=60';
                  }}
                />
                {!isActive && (
                  <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
