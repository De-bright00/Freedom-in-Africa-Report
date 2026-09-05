'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Search,
  ArrowUpDown,
  Download,
  Filter,
  FileSpreadsheet,
  FileText,
  HelpCircle,
  Check,
  ChevronDown,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  dataset2025,
  indicatorMetadata,
  CountryIndicatorRecord,
  IndicatorMeta,
} from '@/lib/dataset-data'

type ViewTab = 'all' | 'composite' | 'political' | 'economic' | 'prosperity'

export function DatasetExplorer() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<ViewTab>('all')
  const [selectedRegion, setSelectedRegion] = useState<string>('All')
  const [sortField, setSortField] = useState<string>('rank')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [hoveredIndicator, setHoveredIndicator] = useState<IndicatorMeta | null>(null)

  const regions = ['All', 'Eastern', 'Western', 'Southern', 'Northern', 'Central']

  // Determine active columns based on tab
  const activeColumns = useMemo(() => {
    if (activeTab === 'composite') {
      return []
    }
    if (activeTab === 'political') {
      return indicatorMetadata.filter((ind) => ind.dimensionKey === 'political')
    }
    if (activeTab === 'economic') {
      return indicatorMetadata.filter((ind) => ind.dimensionKey === 'economic')
    }
    if (activeTab === 'prosperity') {
      return indicatorMetadata.filter((ind) => ind.dimensionKey === 'prosperity')
    }
    return indicatorMetadata // 'all'
  }, [activeTab])

  // Filter and sort records
  const filteredRecords = useMemo(() => {
    let list = dataset2025.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.region.toLowerCase().includes(searchTerm.toLowerCase())
      const matchRegion =
        selectedRegion === 'All' || item.region === selectedRegion
      return matchSearch && matchRegion
    })

    list.sort((a, b) => {
      let valA: number | string = 0
      let valB: number | string = 0

      if (sortField === 'name') {
        valA = a.name
        valB = b.name
        return sortDir === 'asc'
          ? (valA as string).localeCompare(valB as string)
          : (valB as string).localeCompare(valA as string)
      } else if (sortField === 'rank') {
        valA = a.rank
        valB = b.rank
      } else if (sortField === 'overall') {
        valA = a.overallScore
        valB = b.overallScore
      } else if (sortField === 'political') {
        valA = a.politicalScore
        valB = b.politicalScore
      } else if (sortField === 'economic') {
        valA = a.economicScore
        valB = b.economicScore
      } else if (sortField === 'prosperity') {
        valA = a.prosperityScore
        valB = b.prosperityScore
      } else {
        // One of A..T
        const key = sortField as keyof typeof a.indicators
        valA = a.indicators[key] ?? -1
        valB = b.indicators[key] ?? -1
      }

      if (valA === valB) return 0
      if (sortDir === 'asc') return valA > valB ? 1 : -1
      return valA < valB ? 1 : -1
    })

    return list
  }, [searchTerm, selectedRegion, sortField, sortDir])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir(field === 'name' ? 'asc' : 'desc')
    }
  }

  // Score color helper
  const getScoreColor = (val: number | null) => {
    if (val === null) return 'text-muted-foreground/60 font-mono text-xs'
    if (val >= 65) return 'text-emerald-700 dark:text-emerald-400 font-semibold'
    if (val >= 45) return 'text-amber-700 dark:text-amber-400 font-medium'
    return 'text-rose-700 dark:text-rose-400'
  }

  return (
    <div className="space-y-6">
      {/* Search, Dimension Tabs, & Filter Controls */}
      <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm lg:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Dimension Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-lg border bg-muted/50 p-1">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All Indicators (A–T)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('composite')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'composite'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Composite Dimensions
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('political')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'political'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Political (A–F)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('economic')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'economic'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Economic (G–M)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('prosperity')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'prosperity'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Prosperity (N–T)
            </button>
          </div>

          {/* Export Quick Buttons */}
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="h-8 gap-1.5 text-xs font-semibold">
              <Link href="/finar-2025-dataset.csv" download="F(in)AR_2025_Dataset.csv">
                <FileSpreadsheet className="size-3.5 text-emerald-600" />
                <span>CSV</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="h-8 gap-1.5 text-xs font-semibold">
              <Link href="/finar-2025-indicator-dataset.pdf" download="F(in)AR_2025_Dataset.pdf" target="_blank">
                <FileText className="size-3.5 text-rose-600" />
                <span>Official PDF</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Search & Region Filter Bar */}
        <div className="grid gap-3 pt-2 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search country name or region (e.g. Ghana, Mauritius, Southern)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 pl-9 pr-4 text-sm"
            />
          </div>

          {/* Region Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
            <span className="text-xs font-medium text-muted-foreground mr-1 hidden sm:inline">Region:</span>
            {regions.map((reg) => (
              <button
                key={reg}
                type="button"
                onClick={() => setSelectedRegion(reg)}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                  selectedRegion === reg
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Hovered indicator inspection helper */}
        {hoveredIndicator && (
          <div className="rounded-lg border border-accent/30 bg-accent/5 px-3 py-2 text-xs transition-all">
            <span className="font-bold text-primary mr-1.5">
              Column {hoveredIndicator.code} ({hoveredIndicator.dimension}):
            </span>
            <span className="font-medium text-foreground">{hoveredIndicator.fullName}.</span>{' '}
            <span className="text-muted-foreground">{hoveredIndicator.description}</span>
          </div>
        )}
      </div>

      {/* Dataset Table Container */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            {/* Table Header */}
            <thead>
              <tr className="border-b bg-muted/40 font-semibold text-muted-foreground">
                <th
                  onClick={() => handleSort('rank')}
                  className="sticky left-0 z-20 cursor-pointer whitespace-nowrap bg-muted/90 px-3.5 py-3 text-center transition-colors hover:text-foreground"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Rank</span>
                    <ArrowUpDown className="size-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('name')}
                  className="sticky left-12 z-20 min-w-[160px] cursor-pointer whitespace-nowrap bg-muted/90 px-4 py-3 transition-colors hover:text-foreground shadow-[2px_0_5px_rgba(0,0,0,0.03)]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Country</span>
                    <ArrowUpDown className="size-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('overall')}
                  className="cursor-pointer whitespace-nowrap bg-primary/10 px-3.5 py-3 text-center font-bold text-primary transition-colors hover:bg-primary/20"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>F(in)AR Overall</span>
                    <ArrowUpDown className="size-3" />
                  </div>
                </th>

                {/* Composite Dimension Headers (if composite tab or all) */}
                {(activeTab === 'composite' || activeTab === 'all') && (
                  <>
                    <th
                      onClick={() => handleSort('political')}
                      className="cursor-pointer whitespace-nowrap px-3.5 py-3 text-center transition-colors hover:text-foreground"
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>Political (33%)</span>
                        <ArrowUpDown className="size-3" />
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('economic')}
                      className="cursor-pointer whitespace-nowrap px-3.5 py-3 text-center transition-colors hover:text-foreground"
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>Economic (33%)</span>
                        <ArrowUpDown className="size-3" />
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('prosperity')}
                      className="cursor-pointer whitespace-nowrap px-3.5 py-3 text-center transition-colors hover:text-foreground"
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>Prosperity (34%)</span>
                        <ArrowUpDown className="size-3" />
                      </div>
                    </th>
                  </>
                )}

                {/* Individual Indicator Columns */}
                {activeTab !== 'composite' &&
                  activeColumns.map((col) => (
                    <th
                      key={col.code}
                      onClick={() => handleSort(col.code)}
                      onMouseEnter={() => setHoveredIndicator(col)}
                      onMouseLeave={() => setHoveredIndicator(null)}
                      className="group cursor-pointer whitespace-nowrap px-2.5 py-3 text-center transition-colors hover:bg-muted"
                      title={`${col.code}: ${col.fullName}`}
                    >
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="font-mono text-sm font-bold text-foreground group-hover:text-accent">
                          {col.code}
                        </span>
                        <ArrowUpDown className="size-2.5 opacity-40 group-hover:opacity-100" />
                      </div>
                    </th>
                  ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-border">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td
                    colSpan={3 + activeColumns.length + (activeTab === 'composite' || activeTab === 'all' ? 3 : 0)}
                    className="py-12 text-center text-muted-foreground"
                  >
                    No countries matching &ldquo;{searchTerm}&rdquo;
                  </td>
                </tr>
              ) : (
                filteredRecords.map((c) => (
                  <tr
                    key={c.name}
                    className="group transition-colors hover:bg-muted/30"
                  >
                    {/* Rank */}
                    <td className="sticky left-0 z-10 whitespace-nowrap bg-card text-center font-mono text-xs text-muted-foreground group-hover:bg-muted/30">
                      #{c.rank}
                    </td>

                    {/* Country Name & Region */}
                    <td className="sticky left-12 z-10 whitespace-nowrap bg-card px-4 py-2.5 font-medium text-foreground shadow-[2px_0_5px_rgba(0,0,0,0.03)] group-hover:bg-muted/30">
                      <div className="flex items-center gap-2">
                        <span className="text-base leading-none">{c.flag}</span>
                        <div>
                          <p className="font-semibold text-foreground">{c.name}</p>
                          <p className="text-[10px] text-muted-foreground leading-none">{c.region} Africa</p>
                        </div>
                      </div>
                    </td>

                    {/* Overall Score */}
                    <td className="whitespace-nowrap bg-primary/5 px-3.5 py-2.5 text-center font-bold text-primary group-hover:bg-primary/10">
                      <span className="inline-block rounded-md bg-primary/10 px-2 py-0.5 text-xs">
                        {c.overallScore.toFixed(1)}
                      </span>
                    </td>

                    {/* Composite Dimension Columns */}
                    {(activeTab === 'composite' || activeTab === 'all') && (
                      <>
                        <td className={`whitespace-nowrap px-3.5 py-2.5 text-center ${getScoreColor(c.politicalScore)}`}>
                          {c.politicalScore.toFixed(1)}
                        </td>
                        <td className={`whitespace-nowrap px-3.5 py-2.5 text-center ${getScoreColor(c.economicScore)}`}>
                          {c.economicScore.toFixed(1)}
                        </td>
                        <td className={`whitespace-nowrap px-3.5 py-2.5 text-center ${getScoreColor(c.prosperityScore)}`}>
                          {c.prosperityScore.toFixed(1)}
                        </td>
                      </>
                    )}

                    {/* Indicator Columns */}
                    {activeTab !== 'composite' &&
                      activeColumns.map((col) => {
                        const val = c.indicators[col.code as keyof typeof c.indicators]
                        return (
                          <td
                            key={col.code}
                            onMouseEnter={() => setHoveredIndicator(col)}
                            onMouseLeave={() => setHoveredIndicator(null)}
                            className={`whitespace-nowrap px-2.5 py-2 text-center font-mono text-xs ${getScoreColor(val)}`}
                          >
                            {val === null ? 'N/A' : val.toFixed(1)}
                          </td>
                        )
                      })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Summary Bar */}
        <div className="flex flex-col gap-2 border-t bg-muted/20 px-4 py-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing <strong className="text-foreground">{filteredRecords.length}</strong> of 54 African nations. Scores on a 0–100 scale.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500" /> &ge; 65 High
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-amber-500" /> 45–64 Moderate
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-rose-500" /> &lt; 45 Low
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
