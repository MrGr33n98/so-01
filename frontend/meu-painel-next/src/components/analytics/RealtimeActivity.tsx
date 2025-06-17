'use client'

import React from 'react'
import { Activity, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ActivityItem {
  id: string
  type: string
  message: string
  timestamp: string
}

export function RealtimeActivity() {
  const recentActivity: ActivityItem[] = [
    {
      id: '1',
      type: 'user_signup',
      message: 'New user registration',
      timestamp: '2 minutes ago'
    },
    // ...more activities
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <Activity className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {recentActivity.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <Users className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm text-gray-600">{item.message}</p>
              <span className="text-xs text-gray-400">{item.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      <Link 
        href="/dashboard/activity"
        className="flex items-center justify-end mt-4 text-sm text-blue-600 hover:text-blue-700"
      >
        View all activity
        <ArrowRight className="w-4 h-4 ml-1" />
      </Link>
    </div>
  )
}