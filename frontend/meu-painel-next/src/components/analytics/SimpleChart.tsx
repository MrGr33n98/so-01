'use client'

import React from 'react';

interface ChartData {
  value: number
  label: string
}

export function SimpleChart({ data }: { data: ChartData[] }) {
  const maxValue = Math.max(...data.map(item => item.value))
  
  return (
    <div className="h-40 flex items-end gap-2">
      {data.map((item, index) => {
        const height = (item.value / maxValue) * 100
        return (
          <div 
            key={index}
            className="relative flex-1"
          >
            <div 
              className="bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-all"
              style={{ height: `${height}%` }}
            />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500">
              {item.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}