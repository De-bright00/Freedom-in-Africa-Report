'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { Dimension } from '@/lib/data'

const COLORS = ['#0f2044', '#c41e3a', '#8a8f9c']

export function DimensionWeightChart({ dimensions }: { dimensions: Dimension[] }) {
  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={dimensions} dataKey="weight" nameKey="name" innerRadius="55%" outerRadius="90%" paddingAngle={2} strokeWidth={0}>
            {dimensions.map((dimension, index) => (
              <Cell key={dimension.id} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: any, name: any) => [`${value}%`, String(name)]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
