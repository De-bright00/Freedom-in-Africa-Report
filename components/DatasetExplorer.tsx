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
  Info,
  GitCompare,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  dataset2026,
  dataset2025,
  indicatorMetadata,
  CountryIndicatorRecord,
  IndicatorMeta,
  datasetEditions,
} from '@/lib/dataset-data'
import { EditionYear } from '@/lib/editions/types'
import { getComparisonData } from '@/lib/editions'

type ViewTab = 'all' | 'composite' | 'political' | 'economic' | 'prosperity'

interface DatasetExplorerProps {
  initialYear?: EditionYear
}

export function DatasetExplorer({ initialYear = '2026' }: DatasetExplorerProps) {
  const [activeYear, setActiveYear] = useState<EditionYear>(initialYear)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<ViewTab>('all')
  const [selectedRegion, setSelectedRegion] = useState<string>('All')
  const [sortField, setSortField] = useState<string>('rank')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [hoveredIndicator, setHoveredIndicator] = useState<IndicatorMeta | null>(null)
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false)

  const regions = ['All', 'Eastern', 'Western', 'Southern', 'Northern', 'Central']
  const otherYear: EditionYear = activeYear === '2026' ? '2025' : '2026'

  const currentEdition = datasetEditions.find((e) => e.year === Number(activeYear)) || datasetEditions[0]
  const currentRecords = useMemo(() => (activeYear === '2025' ? dataset2025 : dataset2026), [activeYear])
  const otherRecords = useMemo(() => (otherYear === '2025' ? dataset2025 : dataset2026), [otherYear])

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

  // Map other records for comparison lookup
  const otherRecordMap = useMemo(() => {
    const map = new Map<string, CountryIndicatorRecord>()
    otherRecords.forEach((r) => map.set(r.slug, r))
    return map
  }, [otherRecords])

  // Filter and sort records
  const filteredRecords = useMemo(() => {
    let list = currentRecords.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.canonicalRegion.toLowerCase().includes(searchTerm.toLowerCase())
      const matchRegion = selectedRegion === 'All' || item.region === selectedRegion
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
        const key = sortField as keyof typeof a.indicators
        valA = a.indicators[key] ?? -1
        valB = b.indicators[key] ?? -1
      }

      if (valA === valB) return 0
      if (sortDir === 'asc') return valA > valB ? 1 : -1
      return valA < valB ? 1 : -1
    })

    return list
  }, [currentRecords, searchTerm, selectedRegion, sortField, sortDir])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir(field === 'name' || field === 'rank' ? 'asc' : 'desc')
    }
  }

  // Render cell value helper (handling null as "n/a", never 0)
  const renderValue = (val: number | null | undefined) => {
    if (val === null || val === undefined || isNaN(val)) {
      return <span className="text-muted-foreground/50 text-xs italic">n/a</span>
    }
    const num = Number(val)
    return (
      <span
        className={`font-mono text-xs font-semibold ${
          num >= 6.5
            ? 'text-emerald-700 dark:text-emerald-400 font-bold'
            : num >= 4.5
            ? 'text-amber-700 dark:text-amber-400'
            : 'text-rose-700 dark:text-rose-400'
        }`}
      >
        {num.toFixed(1)}
      </span>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* YEAR SELECTION & COMPARE CONTROLS */}
      <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Dataset:</span>
          <div className="inline-flex rounded-lg border bg-muted/40 p-1">
            <button
              type="button"
              onClick={() => {
                setActiveYear('2026')
              }}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                activeYear === '2026'
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>2026 Edition</span>
              <span className="rounded bg-black/20 px-1 py-0.2 text-[9px] uppercase">Latest</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveYear('2025')
              }}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                activeYear === '2025'
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>2025 Edition</span>
            </button>
          </div>
        </div>

        {/* Compare with Other Year Toggle Button */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={isCompareMode ? 'default' : 'outline'}
            size="sm"
            onClick={() => setIsCompareMode((prev) => !prev)}
            className={
              isCompareMode
                ? 'bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 font-bold shadow-sm'
                : 'border-accent/40 text-accent hover:bg-accent/10 gap-1.5 font-semibold'
            }
          >
            <GitCompare className="size-3.5" />
            <span>{isCompareMode ? `Comparing with ${otherYear}` : `Compare with ${otherYear}`}</span>
          </Button>

          <Button asChild size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground">
            <Link href={currentEdition.csvUrl} download={currentEdition.csvFileName}>
              <Download className="mr-1 size-3.5" /> CSV
            </Link>
          </Button>
        </div>
      </div>

      {/* NON-COMPARABLE WARNING BANNER (When Compare Mode is active) */}
      {isCompareMode && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2.5">
          <AlertTriangle className="size-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold">Cross-Edition Methodology Notice:</span> Most indicators (18 of 20) are
            methodologically comparable on the 0–10 scale. However, two indicators have revised definitions between
            editions:{' '}
            <span className="font-semibold underline">Factor N</span> (Monetary Freedom in 2026 vs Income & Poverty in
            2025) and <span className="font-semibold underline">Factor S</span> (Inequality Index in 2026 vs Social
            Mobility in 2025). These columns are marked with a badge below.
          </div>
        </div>
      )}

      {/* FILTER & TAB BAR */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Dimension Tabs */}
        <div className="flex flex-wrap gap-1 rounded-lg border bg-muted/30 p-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === 'all' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All 20 Factors
          </button>
          <button
            onClick={() => setActiveTab('composite')}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === 'composite' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Pillars Only
          </button>
          <button
            onClick={() => setActiveTab('political')}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === 'political' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Political (A–F)
          </button>
          <button
            onClick={() => setActiveTab('economic')}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === 'economic' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Economic (G–M)
          </button>
          <button
            onClick={() => setActiveTab('prosperity')}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === 'prosperity' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Prosperity (N–T)
          </button>
        </div>

        {/* Search & Region Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px]">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 pl-8 text-xs bg-background"
            />
          </div>

          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-xs ring-offset-background appearance-none cursor-pointer pr-8 text-foreground"
            >
              {regions.map((reg) => (
                <option key={reg} value={reg}>
                  {reg === 'All' ? 'All 5 Regions' : `${reg} Africa`}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* INDICATOR TOOLTIP / DEFINITION CARD */}
      {hoveredIndicator && (
        <Card className="border-accent/40 bg-accent/5 p-3 text-xs animate-in fade-in-50 duration-150">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-bold text-accent">Factor {hoveredIndicator.code}:</span>{' '}
              <span className="font-semibold text-foreground">{hoveredIndicator.fullName}</span>{' '}
              <span className="text-muted-foreground">({hoveredIndicator.dimension} · 0–10 scale)</span>
              <p className="mt-1 text-muted-foreground">{hoveredIndicator.description}</p>
              {hoveredIndicator.nonComparableNote && (
                <p className="mt-1.5 font-semibold text-amber-700 dark:text-amber-300">
                  ⚠️ {hoveredIndicator.nonComparableNote}
                </p>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* DATASET TABLE */}
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead className="border-b bg-muted/60 font-semibold text-muted-foreground sticky top-0 z-10">
              <tr>
                <th className="px-3 py-3 w-14">
                  <button onClick={() => handleSort('rank')} className="inline-flex items-center gap-1 hover:text-foreground">
                    Rank <ArrowUpDown className="size-3" />
                  </button>
                </th>
                <th className="px-3 py-3 min-w-[140px]">
                  <button onClick={() => handleSort('name')} className="inline-flex items-center gap-1 hover:text-foreground">
                    Country <ArrowUpDown className="size-3" />
                  </button>
                </th>
                <th className="px-3 py-3 hidden md:table-cell">Region</th>

                {/* Composite Scores */}
                <th className="px-3 py-3 bg-muted/80 text-right">
                  <button onClick={() => handleSort('overall')} className="inline-flex items-center gap-1 hover:text-foreground">
                    Overall (/100) <ArrowUpDown className="size-3" />
                  </button>
                </th>
                <th className="px-3 py-3 text-right">
                  <button onClick={() => handleSort('political')} className="inline-flex items-center gap-1 hover:text-foreground">
                    Political <ArrowUpDown className="size-3" />
                  </button>
                </th>
                <th className="px-3 py-3 text-right">
                  <button onClick={() => handleSort('economic')} className="inline-flex items-center gap-1 hover:text-foreground">
                    Economic <ArrowUpDown className="size-3" />
                  </button>
                </th>
                <th className="px-3 py-3 text-right">
                  <button onClick={() => handleSort('prosperity')} className="inline-flex items-center gap-1 hover:text-foreground">
                    Prosperity <ArrowUpDown className="size-3" />
                  </button>
                </th>

                {/* Indicator Columns (A..T) */}
                {activeColumns.map((col) => (
                  <th
                    key={col.code}
                    onMouseEnter={() => setHoveredIndicator(col)}
                    onMouseLeave={() => setHoveredIndicator(null)}
                    className={`px-2.5 py-3 text-center cursor-help transition-colors ${
                      col.nonComparableNote ? 'bg-amber-500/10' : ''
                    } hover:bg-accent/10`}
                  >
                    <button
                      onClick={() => handleSort(col.code)}
                      className="inline-flex flex-col items-center gap-0.5"
                    >
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-accent">{col.code}</span>
                        {col.nonComparableNote && (
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold" title="Non-comparable between editions">
                            *
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap max-w-[65px] truncate">
                        {col.label}
                      </span>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={7 + activeColumns.length} className="px-6 py-12 text-center text-muted-foreground">
                    No country matched your search query.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => {
                  const other = otherRecordMap.get(r.slug)
                  const countryLink = activeYear === '2025' ? `/2025/country/${r.slug}` : `/country/${r.slug}`
                  return (
                    <tr key={r.slug} className="hover:bg-muted/20 transition-colors">
                      <td className="px-3 py-2.5 font-serif font-bold text-muted-foreground">#{r.rank}</td>
                      <td className="px-3 py-2.5">
                        <Link href={countryLink} className="flex items-center gap-2 group">
                          <span className="text-lg select-none">{r.flag}</span>
                          <span className="font-semibold text-foreground group-hover:text-accent group-hover:underline">
                            {r.name}
                          </span>
                        </Link>
                      </td>
                      <td className="px-3 py-2.5 text-muted-foreground hidden md:table-cell">{r.canonicalRegion}</td>

                      {/* Overall composite score */}
                      <td className="px-3 py-2.5 text-right font-bold tabular-nums bg-muted/30">
                        <div className="flex flex-col items-end">
                          <span>{r.overallScore.toFixed(1)}</span>
                          {isCompareMode && other && (
                            <span
                              className={`text-[10px] font-mono ${
                                r.overallScore - other.overallScore > 0
                                  ? 'text-emerald-600'
                                  : r.overallScore - other.overallScore < 0
                                  ? 'text-rose-600'
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {r.overallScore - other.overallScore > 0 ? '+' : ''}
                              {(r.overallScore - other.overallScore).toFixed(1)} vs {otherYear}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Pillars */}
                      <td className="px-3 py-2.5 text-right font-medium tabular-nums">{r.politicalScore.toFixed(1)}</td>
                      <td className="px-3 py-2.5 text-right font-medium tabular-nums">{r.economicScore.toFixed(1)}</td>
                      <td className="px-3 py-2.5 text-right font-medium tabular-nums">{r.prosperityScore.toFixed(1)}</td>

                      {/* Indicator cells */}
                      {activeColumns.map((col) => {
                        const val = r.indicators[col.code as keyof typeof r.indicators]
                        const otherVal = other?.indicators[col.code as keyof typeof other.indicators]
                        return (
                          <td
                            key={col.code}
                            className={`px-2.5 py-2 text-center tabular-nums ${
                              col.nonComparableNote ? 'bg-amber-500/5' : ''
                            }`}
                          >
                            <div className="flex flex-col items-center justify-center">
                              {renderValue(val)}
                              {isCompareMode && !col.nonComparableNote && other && val !== null && otherVal !== null && (
                                <span
                                  className={`text-[9px] font-mono leading-none mt-0.5 ${
                                    (val ?? 0) - (otherVal ?? 0) > 0
                                      ? 'text-emerald-600 font-semibold'
                                      : (val ?? 0) - (otherVal ?? 0) < 0
                                      ? 'text-rose-600 font-semibold'
                                      : 'text-muted-foreground'
                                  }`}
                                >
                                  {(val ?? 0) - (otherVal ?? 0) > 0 ? '+' : ''}
                                  {((val ?? 0) - (otherVal ?? 0)).toFixed(1)}
                                </span>
                              )}
                              {isCompareMode && col.nonComparableNote && (
                                <span className="text-[9px] text-muted-foreground/60 leading-none mt-0.5">
                                  diff n/a
                                </span>
                              )}
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="flex flex-wrap items-center justify-between border-t bg-muted/30 px-4 py-3 text-xs text-muted-foreground gap-3">
          <div>
            Showing {filteredRecords.length} of {currentRecords.length} countries ({activeYear} dataset). Null values
            are marked as <span className="italic">n/a</span>.
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-foreground/80">Legend:</span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-emerald-500" /> High (≥65 · Ind ≥6.5)
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-amber-500" /> Moderate (45–64 · Ind 4.5–6.4)
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-rose-500" /> Low (&lt;45 · Ind &lt;4.5)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
