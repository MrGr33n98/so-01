'use client'

import { Users, Building2, BarChart, DollarSign } from 'lucide-react'
import { MetricCard } from './MetricCard'

export function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total Users"
        value="1,234"
        icon={Users}
        trend={{ value: 12, isPositive: true }}
      />
      <MetricCard
        title="Companies"
        value="85"
        icon={Building2}
        trend={{ value: 8, isPositive: true }}
      />
      <MetricCard
        title="Analytics"
        value="324"
        icon={BarChart}
        trend={{ value: 2, isPositive: false }}
      />
      <MetricCard
        title="Revenue"
        value="$52,320"
        icon={DollarSign}
        trend={{ value: 15, isPositive: true }}
      />
    </div>
  )
}