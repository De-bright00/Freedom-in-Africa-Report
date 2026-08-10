'use client'

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { GlobalComparison, Region } from '@/lib/data'

export function RegionalChart({ regions }: { regions: Region[] }) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={regions} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis domain={[0, 80]} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip cursor={{ fill: '#f3f4f6' }} formatter={(value: number) => [`${value} / 100`, 'Average score']} />
          <Bar dataKey="avgScore" radius={[4, 4, 0, 0]} barSize={38}>
            {regions.map((region) => (
              <Cell key={region.name} fill={region.standing === 'Best performing' ? '#c41e3a' : '#0f2044'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function GlobalComparisonChart({ data }: { data: GlobalComparison[] }) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 24, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis type="category" dataKey="region" width={140} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip cursor={{ fill: '#f3f4f6' }} formatter={(value: number) => [`${value} / 100`, 'Average score']} />
          <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={22}>
            {data.map((item) => (
              <Cell key={item.region} fill={item.isAfrica ? '#c41e3a' : '#0f2044'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
