'use client'

import { Bell, Search } from 'lucide-react'

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50">
            <Search className="w-5 h-5 text-gray-500" />
            <input 
              type="text"
              placeholder="Buscar..."
              className="bg-transparent outline-none"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-50 rounded-lg">
            <Bell className="w-5 h-5 text-gray-500" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-200" />
        </div>
      </div>
    </header>
  )
}