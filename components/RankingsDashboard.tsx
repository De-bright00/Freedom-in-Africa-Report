'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  Search,
  ArrowUpDown,
  X,
  SlidersHorizontal,
  ScaleIcon,
  Landmark,
  TrendingUp,
  HelpCircle,
  Check,
  Info,
  ChevronDown,
  GitCompare,
  ArrowRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScoreBadge } from '@/components/ui/ScoreBadge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getCountriesForYear, type Country } from '@/lib/data'
import { EditionYear } from '@/lib/editions/types'
import { cn } from '@/lib/utils'

type ParameterType = 'score' | 'politicalScore' | 'economicScore' | 'prosperityScore'

const parameters: { value: ParameterType; label: string }[] = [
  { value: 'score', label: 'Overall Score' },
  { value: 'politicalScore', label: 'Political Freedom' },
  { value: 'economicScore', label: 'Economic Freedom' },
  { value: 'prosperityScore', label: 'Prosperity' },
]

interface RankingsDashboardProps {
  year?: EditionYear
}

export function RankingsDashboard({ year = '2026' }: RankingsDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState<string>('All')
  const [selectedParameters, setSelectedParameters] = useState<ParameterType[]>(['score'])
  const [isIndexDropdownOpen, setIsIndexDropdownOpen] = useState(false)
  const [sortField, setSortField] = useState<string>('rank')
  const [sortAsc, setSortAsc] = useState<boolean>(true)
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'rankings' | 'compare'>('rankings')
  const [tierFilter, setTierFilter] = useState<'all' | 'top10' | 'bottom10'>('all')
  const [isCompareYearsMode, setIsCompareYearsMode] = useState<boolean>(false)

  const otherYear: EditionYear = year === '2026' ? '2025' : '2026'
  const otherCountries = useMemo(() => getCountriesForYear(otherYear), [otherYear])
  const otherCountryMap = useMemo(() => new Map(otherCountries.map((c) => [c.slug, c])), [otherCountries])

  // Available regions for filtering
  const regions = ['All', 'Northern', 'Western', 'Eastern', 'Central', 'Southern']

  // Load countries for the active year
  const rawCountries = useMemo(() => getCountriesForYear(year), [year])

  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false)
  const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(-1)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // Handle checking/unchecking a country for comparison
  const handleToggleSelect = (slug: string) => {
    setSelectedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    )
  }

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortAsc((prev) => !prev)
    } else {
      setSortField(field)
      setSortAsc(field === 'name' || field === 'rank' ? true : false)
    }
  }

  // Pre-calculate ranks for all parameters
  const rankedCountries = useMemo(() => {
    const sortedOverall = [...rawCountries].sort((a, b) => b.score - a.score)
    const sortedPolitical = [...rawCountries].sort((a, b) => b.politicalScore - a.politicalScore)
    const sortedEconomic = [...rawCountries].sort((a, b) => b.economicScore - a.economicScore)
    const sortedProsperity = [...rawCountries].sort((a, b) => b.prosperityScore - a.prosperityScore)

    return rawCountries.map((country) => {
      const rankOverall = sortedOverall.filter((c) => c.score > country.score).length + 1
      const rankPolitical = sortedPolitical.filter((c) => c.politicalScore > country.politicalScore).length + 1
      const rankEconomic = sortedEconomic.filter((c) => c.economicScore > country.economicScore).length + 1
      const rankProsperity = sortedProsperity.filter((c) => c.prosperityScore > country.prosperityScore).length + 1

      return {
        ...country,
        ranks: {
          score: rankOverall,
          politicalScore: rankPolitical,
          economicScore: rankEconomic,
          prosperityScore: rankProsperity,
        } as Record<ParameterType, number>,
      }
    })
  }, [rawCountries])

  const filteredAndSortedCountries = useMemo(() => {
    return rankedCountries
      .filter((country) => {
        const matchesSearch =
          country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.canonicalRegion.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesRegion = selectedRegion === 'All' || country.region === selectedRegion
        const matchesTier =
          tierFilter === 'all'
            ? true
            : tierFilter === 'top10'
            ? country.ranks['score'] <= 10
            : country.ranks['score'] >= 45
        return matchesSearch && matchesRegion && matchesTier
      })
      .sort((a, b) => {
        let valA: string | number
        let valB: string | number

        if (sortField === 'name') {
          valA = a.name
          valB = b.name
        } else if (sortField === 'rank') {
          const activeRankParam = selectedParameters.includes('score')
            ? 'score'
            : selectedParameters[0] || 'score'
          valA = a.ranks[activeRankParam]
          valB = b.ranks[activeRankParam]
        } else {
          valA = a[sortField as ParameterType] ?? 0
          valB = b[sortField as ParameterType] ?? 0
        }

        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA)
        }
        return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number)
      })
  }, [rankedCountries, searchQuery, selectedRegion, sortField, sortAsc, selectedParameters])

  // Instant autocomplete suggestions for search bar
  const searchSuggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return []
    return rankedCountries
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.region.toLowerCase().includes(q) ||
          c.canonicalRegion.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q)
      )
      .slice(0, 10)
  }, [rankedCountries, searchQuery])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchSuggestions.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIsSearchDropdownOpen(true)
      setFocusedSuggestionIndex((prev) => (prev + 1 >= searchSuggestions.length ? 0 : prev + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIsSearchDropdownOpen(true)
      setFocusedSuggestionIndex((prev) => (prev <= 0 ? searchSuggestions.length - 1 : prev - 1))
    } else if (e.key === 'Enter') {
      if (focusedSuggestionIndex >= 0 && focusedSuggestionIndex < searchSuggestions.length) {
        e.preventDefault()
        handleToggleSelect(searchSuggestions[focusedSuggestionIndex].slug)
      } else if (searchSuggestions.length === 1) {
        e.preventDefault()
        handleToggleSelect(searchSuggestions[0].slug)
      }
    } else if (e.key === 'Escape') {
      setIsSearchDropdownOpen(false)
    }
  }

  // Clear selections
  const clearSelection = () => {
    setSelectedSlugs([])
  }

  // Selected countries for comparison view
  const comparisonCountries = useMemo(() => {
    return rankedCountries.filter((c) => selectedSlugs.includes(c.slug))
  }, [rankedCountries, selectedSlugs])

  // Transform data for recharts
  const chartData = useMemo(() => {
    return comparisonCountries.map((c) => ({
      name: c.name,
      'Overall Score': c.score,
      'Political Freedom': c.politicalScore,
      'Economic Freedom': c.economicScore,
      Prosperity: c.prosperityScore,
    }))
  }, [comparisonCountries])

  return (
    <div className="flex flex-col gap-6">
      {/* QUICK TIER FILTERS & YEAR COMPARE TOGGLE with smooth iOS scrolling */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="max-w-full overflow-x-auto touch-scroll-x scrollbar-none py-0.5">
          <div className="inline-flex shrink-0 rounded-lg border bg-muted/40 p-1 text-xs whitespace-nowrap">
            <button
              type="button"
              onClick={() => setTierFilter('all')}
              className={`shrink-0 rounded-md px-3 py-1.5 font-semibold transition-all touch-manipulation ${
                tierFilter === 'all'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All 54 Nations
            </button>
            <button
              type="button"
              onClick={() => setTierFilter('top10')}
              className={`shrink-0 rounded-md px-3 py-1.5 font-semibold transition-all touch-manipulation ${
                tierFilter === 'top10'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Top 10 Freest
            </button>
            <button
              type="button"
              onClick={() => setTierFilter('bottom10')}
              className={`shrink-0 rounded-md px-3 py-1.5 font-semibold transition-all touch-manipulation ${
                tierFilter === 'bottom10'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Bottom 10
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={isCompareYearsMode ? 'default' : 'outline'}
            size="sm"
            onClick={() => setIsCompareYearsMode((prev) => !prev)}
            className={
              isCompareYearsMode
                ? 'bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 font-bold shadow-sm'
                : 'border-accent/40 text-accent hover:bg-accent/10 gap-1.5 font-semibold'
            }
          >
            <GitCompare className="size-3.5" />
            <span>{isCompareYearsMode ? `Comparing with ${otherYear}` : `Compare with ${otherYear}`}</span>
          </Button>
        </div>
      </div>

      {/* COMPARE WITH OTHER YEAR BANNER */}
      {isCompareYearsMode && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-accent/40 bg-accent/10 p-3.5 text-xs text-foreground animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <GitCompare className="size-4 text-accent shrink-0" />
            <div>
              <span className="font-bold">Comparing {year} vs {otherYear} Edition across 54 Nations:</span>{' '}
              <span className="text-muted-foreground">Showing verified overall score and rank change between editions. Visit /compare-years for full pillar trajectory.</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button asChild size="sm" variant="outline" className="h-7 text-xs font-semibold">
              <Link href={year === '2025' ? '/2025/compare-years' : '/compare-years'}>Full View (/compare-years) <ArrowRight className="ml-1 size-3" /></Link>
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setIsCompareYearsMode(false)} className="h-7 text-xs">
              <X className="mr-1 size-3" /> Close Compare
            </Button>
          </div>
        </div>
      )}

      {/* FILTER & CONTROL BAR */}
      <div className="grid gap-4 rounded-xl border bg-card p-4 text-card-foreground shadow-sm md:grid-cols-[1.5fr_1fr_1.5fr_auto] md:items-end">
        {/* Search Input with Autocomplete Suggestions & Direct Checkboxes */}
        <div className="flex flex-col gap-1.5" ref={searchContainerRef}>
          <label htmlFor="country-search" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Search Countries
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="country-search"
              placeholder="Search by country or region..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setIsSearchDropdownOpen(true)
                setFocusedSuggestionIndex(-1)
              }}
              onFocus={() => {
                if (searchQuery.trim().length > 0) setIsSearchDropdownOpen(true)
              }}
              onKeyDown={handleSearchKeyDown}
              className="pl-9 pr-9 bg-background"
              aria-autocomplete="list"
              aria-expanded={isSearchDropdownOpen}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setIsSearchDropdownOpen(false)
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
                aria-label="Clear search query"
              >
                <X className="size-4" />
              </button>
            )}

            {/* Suggestions Popup */}
            {isSearchDropdownOpen && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[300px] w-full overflow-y-auto rounded-xl border border-border bg-card p-2 text-card-foreground shadow-2xl ring-1 ring-black/10 animate-in fade-in-50 zoom-in-95 touch-scroll-x">
                <div className="flex items-center justify-between px-2 py-1 text-[11px] font-semibold text-muted-foreground border-b border-border/60 pb-1.5 mb-1">
                  <span>Matching Countries ({searchSuggestions.length})</span>
                  <span className="text-[10px] text-accent font-medium">Tick box to compare</span>
                </div>

                {searchSuggestions.length === 0 ? (
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    No country found matching &ldquo;{searchQuery}&rdquo;
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    {searchSuggestions.map((c, idx) => {
                      const isPicked = selectedSlugs.includes(c.slug)
                      const isFocused = focusedSuggestionIndex === idx
                      return (
                        <div
                          key={c.slug}
                          onClick={() => handleToggleSelect(c.slug)}
                          className={cn(
                            'flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-xs transition-colors cursor-pointer select-none',
                            isPicked
                              ? 'bg-accent/15 border border-accent/40 font-semibold text-foreground'
                              : 'hover:bg-muted text-foreground',
                            isFocused && 'ring-2 ring-accent'
                          )}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <input
                              type="checkbox"
                              checked={isPicked}
                              onChange={(e) => {
                                e.stopPropagation()
                                handleToggleSelect(c.slug)
                              }}
                              className="size-4 rounded border-input text-accent focus:ring-accent cursor-pointer accent-liberalist-crimson shrink-0"
                              aria-label={`Select ${c.name}`}
                            />
                            <span className="text-base select-none shrink-0">{c.flagEmoji}</span>
                            <div className="min-w-0 truncate">
                              <div className="font-semibold truncate">{c.name}</div>
                              <div className="text-[10px] text-muted-foreground truncate font-normal">
                                #{c.ranks['score']} · {c.region} Africa
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <div className="font-mono font-bold text-foreground">{c.score.toFixed(1)}</div>
                            {isPicked ? (
                              <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold text-accent-foreground">
                                Ticked
                              </span>
                            ) : (
                              <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                + Tick
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-2 px-1">
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    {selectedSlugs.length} selected
                  </span>
                  <div className="flex items-center gap-1.5">
                    {selectedSlugs.length >= 2 && (
                      <Button
                        type="button"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsSearchDropdownOpen(false)
                          setActiveTab('compare')
                        }}
                        className="h-7 text-[11px] bg-accent text-accent-foreground font-bold px-2.5 shadow-sm"
                      >
                        <SlidersHorizontal className="mr-1 size-3" />
                        Compare Selected
                      </Button>
                    )}
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsSearchDropdownOpen(false)
                      }}
                      className="h-7 text-[11px] px-2 text-muted-foreground"
                    >
                      Done
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Region Filter Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="region-filter" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Filter Region
          </label>
          <div className="relative">
            <select
              id="region-filter"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 appearance-none cursor-pointer pr-10 text-foreground"
            >
              {regions.map((reg) => (
                <option key={reg} value={reg}>
                  {reg === 'All' ? 'All 5 Regions' : `${reg} Africa`}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
              <ChevronDown className="size-4" />
            </div>
          </div>
        </div>

        {/* Index/Parameter selector dropdown */}
        <div className="flex flex-col gap-1.5 relative">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Display Parameters
          </span>
          <button
            type="button"
            onClick={() => setIsIndexDropdownOpen(!isIndexDropdownOpen)}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer text-left text-foreground"
          >
            <span className="truncate">
              {selectedParameters.length === 0
                ? 'Select parameters...'
                : selectedParameters.map((p) => parameters.find((param) => param.value === p)?.label).join(', ')}
            </span>
            <ChevronDown className="size-4 shrink-0 text-muted-foreground ml-2" />
          </button>
          {isIndexDropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsIndexDropdownOpen(false)} />
              <div className="absolute top-[62px] left-0 z-20 w-full min-w-[200px] rounded-md border bg-card p-2 text-card-foreground shadow-md outline-none animate-in fade-in-80">
                {parameters.map((param) => {
                  const isChecked = selectedParameters.includes(param.value)
                  return (
                    <label
                      key={param.value}
                      className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-muted"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          setSelectedParameters((prev) =>
                            isChecked
                              ? prev.length === 1
                                ? prev
                                : prev.filter((p) => p !== param.value)
                              : [...prev, param.value]
                          )
                        }}
                        className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center border"
                      />
                      {param.label}
                    </label>
                  )
                })}
              </div>
            </>
          )}
        </div>

        {/* Compare Triggers */}
        <div className="flex items-center gap-2">
          <Button
            disabled={selectedSlugs.length < 2}
            onClick={() => setActiveTab('compare')}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <SlidersHorizontal className="mr-2 size-4" />
            Compare ({selectedSlugs.length})
          </Button>
        </div>
      </div>

      {/* CANONICAL SCORE LEGEND BANNER */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 p-3.5 text-xs">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <Info className="size-4 text-accent" />
          <span>F(in)AR Score Legend:</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-3 rounded-md bg-emerald-500 shadow-sm" />
            <span className="font-bold text-foreground">High:</span>
            <span className="text-muted-foreground">≥ 65</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-3 rounded-md bg-amber-500 shadow-sm" />
            <span className="font-bold text-foreground">Moderate:</span>
            <span className="text-muted-foreground">45 – 64</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-3 rounded-md bg-rose-500 shadow-sm" />
            <span className="font-bold text-foreground">Low:</span>
            <span className="text-muted-foreground">&lt; 45</span>
          </span>
        </div>
        <Link
          href={year === '2025' ? '/2025/compare-years' : '/compare-years'}
          className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
        >
          <span>Compare 2025 vs 2026 across all nations</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* SELECTION BAR BANNER (When countries are checked) */}
      {selectedSlugs.length > 0 && activeTab === 'rankings' && (
        <div className="flex items-center justify-between rounded-lg border border-accent/30 bg-accent/10 px-4 py-2.5 text-sm">
          <div className="flex items-center gap-2 text-foreground">
            <span className="font-semibold text-accent">{selectedSlugs.length}</span>
            <span>countries selected</span>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              (Select 2 or more to compare side-by-side)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={clearSelection}
              className="h-8 text-xs hover:bg-destructive/10 hover:text-destructive"
            >
              Clear Selection
            </Button>
            <Button
              size="sm"
              disabled={selectedSlugs.length < 2}
              onClick={() => setActiveTab('compare')}
              className="h-8 bg-accent text-accent-foreground hover:bg-accent/90 text-xs font-semibold"
            >
              Compare Now
            </Button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: RANKINGS TABLE */}
      {activeTab === 'rankings' && (
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="border-b bg-muted/50 font-semibold text-muted-foreground">
                <tr>
                  <th className="px-4 py-3.5 w-10 text-center">Compare</th>
                  <th className="px-4 py-3.5 w-20">
                    <button
                      onClick={() => handleSort('rank')}
                      className="group inline-flex items-center gap-1.5 hover:text-foreground"
                    >
                      Rank
                      <ArrowUpDown className="size-3.5 text-muted-foreground/60 transition-colors group-hover:text-foreground" />
                    </button>
                  </th>
                  <th className="px-4 py-3.5">
                    <button
                      onClick={() => handleSort('name')}
                      className="group inline-flex items-center gap-1.5 hover:text-foreground"
                    >
                      Country
                      <ArrowUpDown className="size-3.5 text-muted-foreground/60 transition-colors group-hover:text-foreground" />
                    </button>
                  </th>
                  <th className="px-4 py-3.5 hidden md:table-cell">Region</th>
                  {isCompareYearsMode ? (
                    <>
                      <th className="px-4 py-3.5 text-right font-bold text-foreground">
                        {year} Overall
                      </th>
                      <th className="px-4 py-3.5 text-right font-bold text-muted-foreground">
                        {otherYear} Overall
                      </th>
                      <th className="px-4 py-3.5 text-right font-bold">
                        Score Change
                      </th>
                      <th className="px-4 py-3.5 text-right font-bold">
                        Rank Change
                      </th>
                    </>
                  ) : (
                    selectedParameters.map((param) => {
                      const paramInfo = parameters.find((p) => p.value === param)
                      return (
                        <th key={param} className="px-4 py-3.5 text-right md:text-left">
                          <button
                            onClick={() => handleSort(param)}
                            className="group inline-flex items-center gap-1.5 hover:text-foreground"
                          >
                            {paramInfo?.label || 'Score'}
                            <ArrowUpDown className="size-3.5 text-muted-foreground/60 transition-colors group-hover:text-foreground" />
                          </button>
                        </th>
                      )
                    })
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredAndSortedCountries.length === 0 ? (
                  <tr>
                    <td colSpan={isCompareYearsMode ? 8 : 4 + selectedParameters.length} className="px-6 py-12 text-center text-muted-foreground">
                      No countries match your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedCountries.map((country) => {
                    const isChecked = selectedSlugs.includes(country.slug)
                    const countryLink = year === '2025' ? `/2025/country/${country.slug}` : `/country/${country.slug}`
                    const otherCountry = otherCountryMap.get(country.slug)
                    const scoreDiff = otherCountry ? Number((country.score - otherCountry.score).toFixed(1)) : 0
                    const rankDiff = otherCountry ? otherCountry.rank - country.rank : 0 // positive means improved
                    return (
                      <tr
                        key={country.id}
                        className={`transition-colors hover:bg-muted/20 ${isChecked ? 'bg-accent/5' : ''}`}
                      >
                        {/* Checkbox column */}
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center">
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={() => handleToggleSelect(country.slug)}
                              aria-label={`Select ${country.name} for comparison`}
                            />
                          </div>
                        </td>

                        {/* Rank */}
                        <td className="px-4 py-3 font-serif text-base font-bold text-muted-foreground">
                          #{
                            sortField === 'name' || sortField === 'rank'
                              ? country.ranks[selectedParameters[0] || 'score']
                              : country.ranks[sortField as ParameterType]
                          }
                        </td>

                        {/* Flag & Name */}
                        <td className="px-4 py-3">
                          <Link href={countryLink} className="group flex items-center gap-3">
                            <span className="text-2xl select-none" role="img" aria-label={`Flag of ${country.name}`}>
                              {country.flagEmoji}
                            </span>
                            <span className="font-semibold text-foreground group-hover:text-accent group-hover:underline transition-colors">
                              {country.name}
                            </span>
                          </Link>
                        </td>

                        {/* Region */}
                        <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                          {country.canonicalRegion}
                        </td>

                        {/* Scores */}
                        {isCompareYearsMode ? (
                          <>
                            <td className="px-4 py-3 text-right">
                              <ScoreBadge score={country.score} />
                            </td>
                            <td className="px-4 py-3 text-right">
                              {otherCountry ? (
                                <ScoreBadge score={otherCountry.score} />
                              ) : (
                                <span className="text-muted-foreground text-xs italic">n/a</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-xs font-bold">
                              <span
                                className={
                                  scoreDiff > 0
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : scoreDiff < 0
                                    ? 'text-rose-600 dark:text-rose-400'
                                    : 'text-muted-foreground'
                                }
                              >
                                {scoreDiff > 0 ? `▲ +${scoreDiff.toFixed(1)}` : scoreDiff < 0 ? `▼ ${scoreDiff.toFixed(1)}` : `— 0.0`}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-xs font-bold">
                              <span
                                className={
                                  rankDiff > 0
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : rankDiff < 0
                                    ? 'text-rose-600 dark:text-rose-400'
                                    : 'text-muted-foreground'
                                }
                              >
                                {rankDiff > 0 ? `▲ +${rankDiff}` : rankDiff < 0 ? `▼ ${rankDiff}` : `— 0`}
                              </span>
                            </td>
                          </>
                        ) : (
                          selectedParameters.map((param) => (
                            <td key={param} className="px-4 py-3 text-right md:text-left">
                              <ScoreBadge score={country[param]} />
                            </td>
                          ))
                        )}
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between border-t bg-muted/20 px-5 py-3 text-xs text-muted-foreground">
            <span>Showing {filteredAndSortedCountries.length} of {rawCountries.length} countries ({year} edition).</span>
            <span>Data harmonized by the Liberalist Centre.</span>
          </div>
        </div>
      )}

      {/* TAB CONTENT: SIDE-BY-SIDE COMPARISON */}
      {activeTab === 'compare' && (
        <div className="flex flex-col gap-8 animate-in fade-in duration-200">
          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setActiveTab('rankings')} className="h-9">
                Back to rankings
              </Button>
              <h3 className="text-lg font-bold">
                Comparing {comparisonCountries.length} Countries ({year})
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSelection}
              className="text-xs text-muted-foreground hover:text-destructive"
            >
              Clear all
            </Button>
          </div>

          {/* Visualization: Side-by-side Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Cross-Country Dimension Benchmark ({year})</CardTitle>
              <CardDescription>
                Compare Overall Score, Political Freedom, Economic Freedom, and Prosperity side-by-side.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[360px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888820" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        borderColor: 'var(--border)',
                        color: 'var(--card-foreground)',
                        borderRadius: '0.5rem',
                      }}
                      formatter={(value: any) => [`${value} / 100`, '']}
                    />
                    <Legend wrapperStyle={{ paddingTop: '10px' }} />
                    <Bar dataKey="Overall Score" fill="#0f2044" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Political Freedom" fill="#c41e3a" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Economic Freedom" fill="#2563eb" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Prosperity" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Cards Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {comparisonCountries.map((c) => (
              <Card key={c.id} className="relative overflow-hidden">
                <CardHeader className="pb-3 border-b bg-muted/20">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{c.flagEmoji}</span>
                    <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                      Rank #{c.rank}
                    </span>
                  </div>
                  <CardTitle className="mt-2 text-xl">{c.name}</CardTitle>
                  <CardDescription>{c.canonicalRegion}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-xs font-semibold uppercase text-muted-foreground">Overall Score</span>
                    <ScoreBadge score={c.score} size="md" showLabel />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <ScaleIcon className="size-3.5 text-accent" /> Political Freedom
                    </span>
                    <span className="font-semibold text-sm">{c.politicalScore}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Landmark className="size-3.5 text-blue-500" /> Economic Freedom
                    </span>
                    <span className="font-semibold text-sm">{c.economicScore}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <TrendingUp className="size-3.5 text-emerald-500" /> Prosperity
                    </span>
                    <span className="font-semibold text-sm">{c.prosperityScore}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t">
                    <Link
                      href={year === '2025' ? `/2025/country/${c.slug}` : `/country/${c.slug}`}
                      className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
                    >
                      View full indicator profile <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
