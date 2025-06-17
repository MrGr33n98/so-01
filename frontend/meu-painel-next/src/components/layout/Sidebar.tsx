'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Settings, BarChart } from 'lucide-react'

const menuItems = [
  { label: 'Dashboard', icon: Home, href: '/dashboard' },
  { label: 'Usuários', icon: Users, href: '/dashboard/users' },
  { label: 'Analytics', icon: BarChart, href: '/dashboard/analytics' },
  { label: 'Configurações', icon: Settings, href: '/dashboard/settings' }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav className="space-y-1 px-3">
        {menuItems.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                ${isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'}
              `}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}