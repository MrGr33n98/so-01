import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

export default function StarRating({ 
  rating, 
  maxStars = 5, 
  size = 'md', 
  showNumber = false,
  className = '' 
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const stars = [];
  
  for (let i = 1; i <= maxStars; i++) {
    const filled = i <= Math.floor(rating);
    const halfFilled = i === Math.ceil(rating) && rating % 1 !== 0;
    
    stars.push(
      <div key={i} className="relative">
        <Star
          className={`${sizeClasses[size]} ${
            filled ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
        {halfFilled && (
          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            <Star className={`${sizeClasses[size]} text-yellow-400 fill-current`} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="flex items-center">
        {stars}
      </div>
      {showNumber && (
        <span className="text-sm text-gray-600 ml-2">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}