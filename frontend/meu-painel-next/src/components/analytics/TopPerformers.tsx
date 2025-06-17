'use client'

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface Performer {
  id: string;
  name: string;
  rating: number;
  imageUrl: string;
  performance: string;
}

export function TopPerformers() {
  const performers: Performer[] = [
    {
      id: '1',
      name: 'John Doe',
      rating: 4.8,
      imageUrl: '/avatars/john.jpg',
      performance: '+12% this month',
    },
    // ...more performers
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Top Performers</h2>

      <div className="space-y-4">
        {performers.map((performer) => (
          <div key={performer.id} className="flex items-center gap-4">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={performer.imageUrl}
                alt={performer.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-medium">{performer.name}</h3>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-600">{performer.rating}</span>
              </div>
            </div>

            <span className="text-sm text-green-600">{performer.performance}</span>
          </div>
        ))}
      </div>
    </div>
  );
}