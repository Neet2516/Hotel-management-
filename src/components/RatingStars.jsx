import React from 'react';
import { Star, StarHalf } from 'lucide-react';

export default function RatingStars({ rating, size = 16, showNumber = true }) {
  // Ensure rating is a valid number
  const numRating = parseFloat(rating) || 0;
  const fullStars = Math.floor(numRating);
  const hasHalf = numRating % 1 >= 0.25 && numRating % 1 < 0.75;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalf ? 1 : 0));

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center text-amber-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={size} fill="currentColor" className="stroke-none" />
        ))}
        {hasHalf && (
          <div className="relative inline-block text-amber-400">
            <StarHalf size={size} fill="currentColor" className="stroke-none" />
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-gray-300 dark:text-gray-600 fill-none" />
        ))}
      </div>
      {showNumber && (
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 ml-1">
          {numRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
