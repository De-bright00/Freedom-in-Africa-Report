'use client'

import { useState, useMemo, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  ArrowUpDown,
  Search,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Download,
  Info,
  GitCompare,
  TrendingUp,
  TrendingDown,
  Scale,
  Landmark,
  Layers,
  ArrowRight,
  X,
  Check,
  AlertTriangle,
  Plus,
  Eye,
  ArrowDown,
  SlidersHorizontal,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScoreBadge } from '@/components/ui/ScoreBadge'
import {
  getComparisonData,
  getScoreBgClass,
  ComparisonCountry,
  indicatorMetadata,
  IndicatorMeta,
} from '@/lib/editions'

function CompareYearsContent() {
  const searchParams = useSearchParams()
  const initialCountry = searchParams?.get('country') || ''

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [sortField, setSortField] = useState<string>('rank2026')
  const [sortAsc, setSortAsc] = useState<boolean>(true)
  const [filterTrend, setFilterTrend] = useState<'all' | 'gained' | 'declined' | 'stable'>('all')
  const [pickedSlugs, setPickedSlugs] = useState<string[]>(initialCountry ? [initialCountry] : [])
  const [isCompareViewActive, setIsCompareViewActive] = useState<boolean>(Boolean(initialCountry))
  const [indicatorPillarFilter, setIndicatorPillarFilter] = useState<'all' | 'political' | 'economic' | 'prosperity'>('all')

  const comparisonSectionRef = useRef<HTMLDivElement>(null)
  const tableSectionRef = useRef<HTMLDivElement>(null)

  const regions = ['All', 'Eastern Africa', 'Western Africa', 'Southern Africa', 'Northern Africa', 'Central Africa']
  const allComparisons = useMemo(() => getComparisonData(), [])

  useEffect(() => {
    if (initialCountry && !pickedSlugs.includes(initialCountry)) {
      setPickedSlugs((prev) => [...prev, initialCountry])
      setIsCompareViewActive(true)
    }
  }, [initialCountry])

  // Toggle country pick
  const handleTogglePick = (slug: string) => {
    setPickedSlugs((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
      return next
    })
  }

  const handleClearPicked = () => {
    setPickedSlugs([])
    setIsCompareViewActive(false)
  }

  const handleOpenComparison = () => {
    setIsCompareViewActive(true)
    setTimeout(() => {
      comparisonSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const handleScrollToTable = () => {
    tableSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Highlight stats
  const topGainers = useMemo(() => {
    return [...allComparisons].sort((a, b) => b.change.overall - a.change.overall).slice(0, 5)
  }, [allComparisons])

  const topRankClimbers = useMemo(() => {
    return [...allComparisons].sort((a, b) => b.change.rank - a.change.rank).slice(0, 5)
  }, [allComparisons])

  // Picked country records
  const pickedCountries = useMemo(() => {
    return allComparisons.filter((c) => pickedSlugs.includes(c.slug))
  }, [allComparisons, pickedSlugs])

  // Available countries not yet selected (for quick add dropdown)
  const availableToAdd = useMemo(() => {
    return allComparisons.filter((c) => !pickedSlugs.includes(c.slug))
  }, [allComparisons, pickedSlugs])

  // Filtered indicators for the matrix
  const filteredIndicators = useMemo(() => {
    if (indicatorPillarFilter === 'all') return indicatorMetadata
    return indicatorMetadata.filter((m) => m.dimensionKey === indicatorPillarFilter)
  }, [indicatorPillarFilter])

  // Filter and sort comparisons
  const filteredData = useMemo(() => {
    return allComparisons
      .filter((item) => {
        const matchesSearch =
          item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.region.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesRegion = selectedRegion === 'All' || item.region === selectedRegion
        let matchesTrend = true
        if (filterTrend === 'gained') matchesTrend = item.change.overall > 0
        if (filterTrend === 'declined') matchesTrend = item.change.overall < 0
        if (filterTrend === 'stable') matchesTrend = Math.abs(item.change.overall) <= 0.2

        return matchesSearch && matchesRegion && matchesTrend
      })
      .sort((a, b) => {
        let valA: number | string = 0
        let valB: number | string = 0

        if (sortField === 'country') {
          valA = a.country
          valB = b.country
          return sortAsc ? (valA as string).localeCompare(valB as string) : (valB as string).localeCompare(valA as string)
        } else if (sortField === 'rank2026') {
          valA = a.y2026.rank
          valB = b.y2026.rank
        } else if (sortField === 'rank2025') {
          valA = a.y2025.rank
          valB = b.y2025.rank
        } else if (sortField === 'rankChange') {
          valA = a.change.rank
          valB = b.change.rank
        } else if (sortField === 'overall2026') {
          valA = a.y2026.overall
          valB = b.y2026.overall
        } else if (sortField === 'overall2025') {
          valA = a.y2025.overall
          valB = b.y2025.overall
        } else if (sortField === 'overallChange') {
          valA = a.change.overall
          valB = b.change.overall
        } else if (sortField === 'politicalChange') {
          valA = a.change.political
          valB = b.change.political
        } else if (sortField === 'economicChange') {
          valA = a.change.economic
          valB = b.change.economic
        } else if (sortField === 'prosperityChange') {
          valA = a.change.prosperity
          valB = b.change.prosperity
        }

        if (sortAsc) return (valA as number) > (valB as number) ? 1 : -1
        return (valA as number) < (valB as number) ? 1 : -1
      })
  }, [allComparisons, searchQuery, selectedRegion, filterTrend, sortField, sortAsc])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortAsc(!sortAsc)
    } else {
      setSortField(field)
      setSortAsc(field.includes('rank2026') || field === 'country' ? true : false)
    }
  }

  // Two-country direct head-to-head calculations
  const twoCountryComparison = useMemo(() => {
    if (pickedCountries.length !== 2) return null
    const [cA, cB] = pickedCountries
    const overallDiff = cA.y2026.overall - cB.y2026.overall
    const rankDiff = cB.y2026.rank - cA.y2026.rank // positive means cA has better (lower) rank
    const polDiff = cA.y2026.political - cB.y2026.political
    const ecoDiff = cA.y2026.economic - cB.y2026.economic
    const proDiff = cA.y2026.prosperity - cB.y2026.prosperity

    return {
      countryA: cA,
      countryB: cB,
      overallDiff,
      rankDiff,
      polDiff,
      ecoDiff,
      proDiff,
      overallLeader: overallDiff > 0 ? cA : overallDiff < 0 ? cB : null,
      rankLeader: rankDiff > 0 ? cA : rankDiff < 0 ? cB : null,
      polLeader: polDiff > 0 ? cA : polDiff < 0 ? cB : null,
      ecoLeader: ecoDiff > 0 ? cA : ecoDiff < 0 ? cB : null,
      proLeader: proDiff > 0 ? cA : proDiff < 0 ? cB : null,
    }
  }, [pickedCountries])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* HERO SECTION */}
        <section className="bg-primary text-primary-foreground relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(135deg, transparent 45%, white 45%, white 46%, transparent 46%), linear-gradient(45deg, transparent 45%, white 45%, white 46%, transparent 46%)',
              backgroundSize: '64px 64px',
            }}
          />
          <div className="relative mx-auto max-w-7xl px-5 py-12 md:py-16 lg:px-8">
            <div className="max-w-3xl">
              <span className="section-kicker-invert">Year-on-Year Comparative Analytics</span>
              <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
                F(in)AR 2025 vs 2026 Comparison
              </h1>
              <p className="mt-4 text-base leading-relaxed text-primary-foreground/75 md:text-lg">
                Track changes across Africa&rsquo;s 54 countries between the inaugural 2025 edition and the 2026 report.
                Inspect rank movements, overall score trajectories, and select countries to compare their data side-by-side.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-accent/20 border border-accent/40 px-3 py-1 text-xs font-bold text-accent">
                  Both Editions Preselected: 2025 vs 2026
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                  Overall Score, Rank &amp; Pillar Trajectories
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold gap-2 text-sm shadow-md">
                  <Link href="/finar-2026-rankings.csv" download="F(in)AR_2025_2026_Rankings_Comparison.csv">
                    <Download className="size-4" />
                    <span>Download Comparison (CSV)</span>
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20 gap-2 text-sm font-semibold">
                  <Link href="/dataset">
                    <span>Explore 20-Factor Indicator Matrix</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* METHODOLOGY & NON-COMPARABLE INDICATOR NOTICE (CRISP HIGH-CONTRAST PALETTE) */}
        <section className="mx-auto max-w-7xl px-5 pt-8 lg:px-8">
          <div className="rounded-xl border border-emerald-500/40 bg-[#072418] p-4 sm:p-5 text-emerald-100 shadow-lg shadow-emerald-950/20">
            <div className="flex items-start gap-3.5">
              <div className="rounded-full bg-emerald-500/20 p-1.5 text-emerald-400 shrink-0 mt-0.5 border border-emerald-500/40">
                <Check className="size-4 text-emerald-400 stroke-[3]" />
              </div>
              <div className="text-xs sm:text-sm leading-relaxed space-y-1.5 text-emerald-100">
                <p className="font-bold text-sm sm:text-base text-emerald-300">
                  Comparative Analytics Active: 2025 Baseline Confirmed
                </p>
                <p className="text-emerald-100/90 leading-relaxed">
                  The 2025 baseline dataset and scoring methodology are confirmed. Comprehensive year-on-year evaluation across overall scores, continental ranks, and the three weighted pillars (Political Freedom, Economic Freedom, and Prosperity) is fully active across all 54 African nations.
                </p>
                <p className="pt-2 text-[11px] sm:text-xs text-emerald-200/90 border-t border-emerald-500/25 mt-2">
                  <span className="font-semibold text-emerald-300 underline underline-offset-2">Methodology Evolution:</span> Factor N (Monetary Freedom in 2026 vs Income &amp; Poverty in 2025) and Factor S (Inequality Index in 2026 vs Social Mobility in 2025) feature refined definitions between editions and are flagged as non-comparable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DEDICATED HEAD-TO-HEAD COMPARISON SECTION (DARK PREMIUM MATRIX) */}
        {isCompareViewActive && pickedCountries.length > 0 && (
          <section ref={comparisonSectionRef} id="head-to-head-comparison" className="mx-auto max-w-7xl px-5 pt-8 lg:px-8">
            <div className="rounded-2xl border border-white/10 bg-[#0a0f1d] p-5 sm:p-8 text-white shadow-2xl">
              {/* Header Bar */}
              <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-accent/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-accent border border-accent/40 uppercase">
                      Head-to-Head Comparative Matrix
                    </span>
                    <span className="text-xs text-slate-400">({pickedCountries.length} countries selected)</span>
                  </div>
                  <h2 className="mt-2 text-2xl font-bold font-serif text-white sm:text-3xl">
                    Side-by-Side Edition Comparison
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-300">
                    Comparing overall scores, continental ranks, pillars, and all 20 indicator factors across 2025 and 2026.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Add Country Dropdown */}
                  {availableToAdd.length > 0 && pickedCountries.length < 4 && (
                    <div className="relative">
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            handleTogglePick(e.target.value)
                            e.target.value = ''
                          }
                        }}
                        defaultValue=""
                        className="h-9 rounded-lg border border-white/20 bg-[#162032] px-3 pr-8 text-xs font-semibold text-white cursor-pointer hover:border-white/40 appearance-none"
                      >
                        <option value="" disabled>
                          + Add country to compare...
                        </option>
                        {availableToAdd.map((c) => (
                          <option key={c.slug} value={c.slug} className="bg-slate-900 text-white">
                            {c.flagEmoji} {c.country} (#{c.y2026.rank})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
                    </div>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleScrollToTable}
                    className="border-white/20 bg-white/5 text-xs text-white hover:bg-white/10 h-9 gap-1.5"
                  >
                    <ArrowDown className="size-3.5" />
                    <span>View 54 Table</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearPicked}
                    className="text-xs text-slate-400 hover:text-white hover:bg-white/10 h-9 gap-1"
                  >
                    <X className="size-3.5" />
                    <span>Close</span>
                  </Button>
                </div>
              </div>

              {/* 2-COUNTRY DIRECT ADVANTAGE CALLOUT (WHEN EXACTLY 2 SELECTED) */}
              {twoCountryComparison && (
                <div className="mt-6 rounded-xl border border-accent/30 bg-[#162032]/80 p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Scale className="size-4 text-accent" />
                      <span className="font-bold text-sm text-white">Direct Head-to-Head Delta (2026)</span>
                    </div>
                    <div className="text-xs text-slate-300">
                      {twoCountryComparison.overallLeader ? (
                        <span>
                          <strong className="text-white">{twoCountryComparison.overallLeader.flagEmoji} {twoCountryComparison.overallLeader.country}</strong> holds a{' '}
                          <strong className="text-accent">+{Math.abs(twoCountryComparison.overallDiff).toFixed(1)} pt lead</strong> overall
                        </span>
                      ) : (
                        <span>Tied overall score</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    <div className="rounded-lg bg-[#0a0f1d] p-3 border border-white/5">
                      <span className="text-[10px] uppercase text-slate-400 block font-semibold">Rank Leader</span>
                      <span className="font-bold text-white text-sm mt-0.5 block">
                        {twoCountryComparison.rankLeader ? (
                          <span className="text-emerald-400">
                            {twoCountryComparison.rankLeader.flagEmoji} #{twoCountryComparison.rankLeader.y2026.rank}{' '}
                            <span className="text-[10px] text-slate-400 font-normal">
                              (+{Math.abs(twoCountryComparison.rankDiff)} spots)
                            </span>
                          </span>
                        ) : (
                          'Tied Rank'
                        )}
                      </span>
                    </div>

                    <div className="rounded-lg bg-[#0a0f1d] p-3 border border-white/5">
                      <span className="text-[10px] uppercase text-blue-400 block font-semibold">Political Advantage</span>
                      <span className="font-bold text-white text-sm mt-0.5 block">
                        {twoCountryComparison.polLeader ? (
                          <span>
                            {twoCountryComparison.polLeader.flagEmoji}{' '}
                            <span className="text-blue-300">+{Math.abs(twoCountryComparison.polDiff).toFixed(1)}</span>
                          </span>
                        ) : (
                          'Tied'
                        )}
                      </span>
                    </div>

                    <div className="rounded-lg bg-[#0a0f1d] p-3 border border-white/5">
                      <span className="text-[10px] uppercase text-emerald-400 block font-semibold">Economic Advantage</span>
                      <span className="font-bold text-white text-sm mt-0.5 block">
                        {twoCountryComparison.ecoLeader ? (
                          <span>
                            {twoCountryComparison.ecoLeader.flagEmoji}{' '}
                            <span className="text-emerald-300">+{Math.abs(twoCountryComparison.ecoDiff).toFixed(1)}</span>
                          </span>
                        ) : (
                          'Tied'
                        )}
                      </span>
                    </div>

                    <div className="rounded-lg bg-[#0a0f1d] p-3 border border-white/5">
                      <span className="text-[10px] uppercase text-amber-400 block font-semibold">Prosperity Advantage</span>
                      <span className="font-bold text-white text-sm mt-0.5 block">
                        {twoCountryComparison.proLeader ? (
                          <span>
                            {twoCountryComparison.proLeader.flagEmoji}{' '}
                            <span className="text-amber-300">+{Math.abs(twoCountryComparison.proDiff).toFixed(1)}</span>
                          </span>
                        ) : (
                          'Tied'
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* SIDE-BY-SIDE COUNTRY CARDS */}
              <div
                className={`mt-6 grid gap-4 ${
                  pickedCountries.length === 1
                    ? 'grid-cols-1 max-w-md'
                    : pickedCountries.length === 2
                    ? 'grid-cols-1 md:grid-cols-2'
                    : pickedCountries.length === 3
                    ? 'grid-cols-1 md:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                }`}
              >
                {pickedCountries.map((c) => {
                  const isScoreUp = c.change.overall > 0
                  const isScoreDown = c.change.overall < 0
                  const isRankUp = c.change.rank > 0
                  const isRankDown = c.change.rank < 0

                  return (
                    <div
                      key={c.slug}
                      className="rounded-xl border border-white/10 bg-[#0f172a] p-4 flex flex-col justify-between relative shadow-lg"
                    >
                      <button
                        onClick={() => handleTogglePick(c.slug)}
                        aria-label={`Remove ${c.country}`}
                        className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white rounded-full hover:bg-white/10"
                      >
                        <X className="size-3.5" />
                      </button>

                      <div>
                        {/* Country Identity */}
                        <div className="flex items-center gap-2.5 pr-6">
                          <span className="text-3xl select-none">{c.flagEmoji}</span>
                          <div>
                            <Link
                              href={`/country/${c.slug}`}
                              className="font-bold text-base text-white hover:text-accent hover:underline block leading-tight"
                            >
                              {c.country}
                            </Link>
                            <span className="text-[11px] text-slate-400">{c.region}</span>
                          </div>
                        </div>

                        {/* Overall Score Trajectory 2026 vs 2025 */}
                        <div className="mt-4 rounded-lg bg-[#162032] p-3 border border-white/5">
                          <div className="flex items-center justify-between pb-2 border-b border-white/10">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Overall Score Trajectory</span>
                            <span
                              className={`font-mono text-xs font-bold ${
                                isScoreUp ? 'text-emerald-400' : isScoreDown ? 'text-rose-400' : 'text-slate-400'
                              }`}
                            >
                              {isScoreUp ? `▲ +${c.change.overall.toFixed(1)}` : isScoreDown ? `▼ ${c.change.overall.toFixed(1)}` : '— 0.0'}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 pt-2.5 text-center">
                            <div>
                              <span className="text-[9px] uppercase text-slate-400 block font-semibold">2026 Score</span>
                              <span className="text-xl font-bold text-white font-mono">{c.y2026.overall.toFixed(1)}</span>
                              <span className="text-[10px] text-emerald-400 font-semibold block">Rank #{c.y2026.rank}</span>
                            </div>
                            <div className="border-l border-white/10">
                              <span className="text-[9px] uppercase text-slate-400 block font-semibold">2025 Score</span>
                              <span className="text-xl font-bold text-slate-300 font-mono">{c.y2025.overall.toFixed(1)}</span>
                              <span className="text-[10px] text-slate-400 block">Rank #{c.y2025.rank}</span>
                            </div>
                          </div>
                        </div>

                        {/* Rank Movement */}
                        <div className="mt-2.5 flex items-center justify-between rounded-lg bg-[#162032] px-3 py-2 text-xs border border-white/5">
                          <span className="text-slate-400 text-[11px]">Continental Rank Movement:</span>
                          <span
                            className={`font-mono font-bold ${
                              isRankUp ? 'text-emerald-400' : isRankDown ? 'text-rose-400' : 'text-slate-400'
                            }`}
                          >
                            {isRankUp ? `▲ +${c.change.rank} positions` : isRankDown ? `▼ ${c.change.rank} positions` : 'No change'}
                          </span>
                        </div>

                        {/* 3 Pillars YoY Breakdown */}
                        <div className="mt-3 grid grid-cols-3 gap-1.5 text-center font-mono text-xs">
                          <div className="rounded-lg bg-[#162032] p-2 border border-blue-500/20">
                            <span className="block text-[9px] uppercase text-blue-400 font-sans font-semibold">Political</span>
                            <span className="text-white font-bold block mt-0.5">{c.y2026.political.toFixed(1)}</span>
                            <span className="text-[10px] text-slate-400 block">
                              {c.change.political > 0 ? `+${c.change.political.toFixed(1)}` : c.change.political.toFixed(1)}
                            </span>
                          </div>
                          <div className="rounded-lg bg-[#162032] p-2 border border-emerald-500/20">
                            <span className="block text-[9px] uppercase text-emerald-400 font-sans font-semibold">Economic</span>
                            <span className="text-white font-bold block mt-0.5">{c.y2026.economic.toFixed(1)}</span>
                            <span className="text-[10px] text-slate-400 block">
                              {c.change.economic > 0 ? `+${c.change.economic.toFixed(1)}` : c.change.economic.toFixed(1)}
                            </span>
                          </div>
                          <div className="rounded-lg bg-[#162032] p-2 border border-amber-500/20">
                            <span className="block text-[9px] uppercase text-amber-400 font-sans font-semibold">Prosperity</span>
                            <span className="text-white font-bold block mt-0.5">{c.y2026.prosperity.toFixed(1)}</span>
                            <span className="text-[10px] text-slate-400 block">
                              {c.change.prosperity > 0 ? `+${c.change.prosperity.toFixed(1)}` : c.change.prosperity.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 20-FACTOR SIDE-BY-SIDE MATRIX */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Layers className="size-4 text-accent" />
                      <span>20-Factor Indicator Matrix (Side-by-Side Breakdown)</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Subscales normalized 0–10. Inspect how the selected countries score across both 2025 and 2026 editions.
                    </p>
                  </div>

                  {/* Filter Pillar Tabs */}
                  <div className="inline-flex rounded-lg border border-white/10 bg-[#162032] p-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setIndicatorPillarFilter('all')}
                      className={`rounded px-2.5 py-1 font-semibold transition-colors ${
                        indicatorPillarFilter === 'all' ? 'bg-accent text-accent-foreground shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      All 20
                    </button>
                    <button
                      type="button"
                      onClick={() => setIndicatorPillarFilter('political')}
                      className={`rounded px-2.5 py-1 font-semibold transition-colors ${
                        indicatorPillarFilter === 'political' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Political (A–F)
                    </button>
                    <button
                      type="button"
                      onClick={() => setIndicatorPillarFilter('economic')}
                      className={`rounded px-2.5 py-1 font-semibold transition-colors ${
                        indicatorPillarFilter === 'economic' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Economic (G–M)
                    </button>
                    <button
                      type="button"
                      onClick={() => setIndicatorPillarFilter('prosperity')}
                      className={`rounded px-2.5 py-1 font-semibold transition-colors ${
                        indicatorPillarFilter === 'prosperity' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Prosperity (N–T)
                    </button>
                  </div>
                </div>

                {/* The Comparison Matrix Table */}
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0f172a]">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead className="border-b border-white/10 bg-[#162032] font-semibold text-slate-300">
                      <tr>
                        <th className="px-4 py-3 min-w-[220px]">Factor (Indicator)</th>
                        {pickedCountries.map((c) => (
                          <th key={c.slug} className="px-4 py-3 text-center border-l border-white/5 min-w-[150px]">
                            <div className="flex items-center justify-center gap-1.5 font-bold text-white text-sm">
                              <span>{c.flagEmoji}</span>
                              <span>{c.country}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                              <span>2026</span> · <span>2025</span> · <span>Δ</span>
                            </div>
                          </th>
                        ))}
                        {pickedCountries.length === 2 && (
                          <th className="px-4 py-3 text-center border-l border-white/5 min-w-[130px] bg-white/[0.02]">
                            2026 Leader / Gap
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                      {filteredIndicators.map((ind) => {
                        const isNonComp = Boolean(ind.nonComparableNote)
                        const cA = pickedCountries[0]
                        const cB = pickedCountries[1]
                        const valA2026 = cA ? cA.indicators2026[ind.key] : null
                        const valB2026 = cB ? cB.indicators2026[ind.key] : null

                        let leadText = '—'
                        let leadColor = 'text-slate-400'
                        if (pickedCountries.length === 2 && valA2026 !== null && valB2026 !== null && valA2026 !== undefined && valB2026 !== undefined) {
                          const gap = Number((valA2026 - valB2026).toFixed(2))
                          if (gap > 0.05) {
                            leadText = `${cA.flagEmoji} +${gap.toFixed(1)}`
                            leadColor = 'text-emerald-400 font-bold'
                          } else if (gap < -0.05) {
                            leadText = `${cB.flagEmoji} +${Math.abs(gap).toFixed(1)}`
                            leadColor = 'text-accent font-bold'
                          } else {
                            leadText = 'Tied'
                            leadColor = 'text-slate-400'
                          }
                        }

                        return (
                          <tr key={ind.code} className="hover:bg-white/[0.02] transition-colors">
                            {/* Factor title and badge */}
                            <td className="px-4 py-3 font-sans">
                              <div className="flex items-center gap-2">
                                <span className="flex size-5 shrink-0 items-center justify-center rounded bg-white text-slate-950 font-mono text-[10px] font-bold">
                                  {ind.code}
                                </span>
                                <span className="font-semibold text-white text-xs">{ind.label}</span>
                              </div>
                              {isNonComp && (
                                <span className="mt-1 inline-block rounded bg-amber-500/20 px-1.5 py-0.2 text-[9px] text-amber-300 font-sans border border-amber-500/30">
                                  Refined in 2026 (Non-comparable YoY)
                                </span>
                              )}
                            </td>

                            {/* Per-country 2026 vs 2025 indicator score */}
                            {pickedCountries.map((c) => {
                              const s26 = c.indicators2026[ind.key]
                              const s25 = c.indicators2025[ind.key]
                              const diff = s26 !== null && s25 !== null && s26 !== undefined && s25 !== undefined ? s26 - s25 : null
                              const isUp = diff !== null && diff > 0.05
                              const isDown = diff !== null && diff < -0.05

                              return (
                                <td key={c.slug} className="px-4 py-3 text-center border-l border-white/5">
                                  <div className="flex items-center justify-center gap-2 text-xs">
                                    <span className="font-bold text-white">
                                      {s26 !== null && s26 !== undefined ? s26.toFixed(1) : 'n/a'}
                                    </span>
                                    <span className="text-slate-400 text-[10px]">
                                      {s25 !== null && s25 !== undefined ? s25.toFixed(1) : 'n/a'}
                                    </span>
                                    {isNonComp ? (
                                      <span className="text-[10px] text-amber-400/80 italic font-sans">—</span>
                                    ) : diff !== null ? (
                                      <span
                                        className={`text-[10px] font-bold ${
                                          isUp ? 'text-emerald-400' : isDown ? 'text-rose-400' : 'text-slate-400'
                                        }`}
                                      >
                                        {isUp ? `+${diff.toFixed(1)}` : diff.toFixed(1)}
                                      </span>
                                    ) : (
                                      <span className="text-[10px] text-slate-500">—</span>
                                    )}
                                  </div>
                                </td>
                              )
                            })}

                            {/* 2026 Leader */}
                            {pickedCountries.length === 2 && (
                              <td className="px-4 py-3 text-center border-l border-white/5 font-sans bg-white/[0.01]">
                                <span className={`text-xs ${leadColor}`}>{leadText}</span>
                              </td>
                            )}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
                  <span>Note: Indicators N and S underwent methodological refinement between 2025 and 2026.</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleScrollToTable}
                    className="text-xs text-accent hover:text-white hover:bg-white/10 h-7 gap-1"
                  >
                    <span>Add more countries from table below</span>
                    <ArrowDown className="size-3" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SUMMARY CARDS: CONTINENTAL TRAJECTORY & HIGHLIGHTS */}
        <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Continental Trajectory */}
            <Card className="border shadow-sm">
              <CardHeader className="pb-3 bg-muted/20 border-b">
                <CardTitle className="text-base font-bold flex items-center justify-between">
                  <span>Continental Trajectory</span>
                  <GitCompare className="size-4 text-accent" />
                </CardTitle>
                <CardDescription>Aggregate Africa score 2025 → 2026</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs text-muted-foreground font-semibold uppercase">Overall Africa Score</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold line-through text-muted-foreground">52.8</span>
                    <span className="text-base font-bold text-primary">51.2</span>
                    <span className="rounded bg-rose-500/10 px-1.5 py-0.2 text-xs font-bold text-rose-600">-1.6</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Political Freedom:</span>
                  <span className="font-semibold text-emerald-600">49.4 → 52.8 (+3.4)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Economic Freedom:</span>
                  <span className="font-semibold text-rose-600">58.9 → 44.3 (-14.6)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Prosperity:</span>
                  <span className="font-semibold text-emerald-600">50.2 → 56.5 (+6.3)</span>
                </div>
              </CardContent>
            </Card>

            {/* Top Score Gainers */}
            <Card className="border shadow-sm">
              <CardHeader className="pb-3 bg-emerald-500/5 border-b">
                <CardTitle className="text-base font-bold flex items-center justify-between text-emerald-900 dark:text-emerald-300">
                  <span>Largest Score Gains</span>
                  <TrendingUp className="size-4 text-emerald-600" />
                </CardTitle>
                <CardDescription>Countries with highest point advances</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 divide-y">
                {topGainers.map((g) => (
                  <div key={g.slug} className="flex items-center justify-between py-2 first:pt-0 last:pb-0 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-base select-none">{g.flagEmoji}</span>
                      <button
                        onClick={() => {
                          handleTogglePick(g.slug)
                          if (!pickedSlugs.includes(g.slug)) {
                            // add to comparison and open
                            handleOpenComparison()
                          }
                        }}
                        className="font-semibold text-foreground hover:text-accent hover:underline text-left"
                      >
                        {g.country}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{g.y2025.overall} → {g.y2026.overall}</span>
                      <span className="rounded bg-emerald-500/15 px-1.5 py-0.2 font-mono font-bold text-emerald-700 dark:text-emerald-400">
                        +{g.change.overall.toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Rank Climbers */}
            <Card className="border shadow-sm">
              <CardHeader className="pb-3 bg-accent/5 border-b">
                <CardTitle className="text-base font-bold flex items-center justify-between text-accent">
                  <span>Top Rank Climbers</span>
                  <ArrowUpRight className="size-4 text-accent" />
                </CardTitle>
                <CardDescription>Most positions gained in continental rank</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 divide-y">
                {topRankClimbers.map((c) => (
                  <div key={c.slug} className="flex items-center justify-between py-2 first:pt-0 last:pb-0 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-base select-none">{c.flagEmoji}</span>
                      <button
                        onClick={() => {
                          handleTogglePick(c.slug)
                          if (!pickedSlugs.includes(c.slug)) {
                            handleOpenComparison()
                          }
                        }}
                        className="font-semibold text-foreground hover:text-accent hover:underline text-left"
                      >
                        {c.country}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">#{c.y2025.rank} → #{c.y2026.rank}</span>
                      <span className="rounded bg-accent/15 px-1.5 py-0.2 font-mono font-bold text-accent">
                        ▲ +{c.change.rank}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* COMPARISON TABLE CONTROLS */}
        <section ref={tableSectionRef} className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
          <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-wrap items-center gap-3">
              {/* Filter Search */}
              <div className="relative min-w-[240px]">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search country or region..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10 bg-background text-sm"
                />
              </div>

              {/* Region Dropdown */}
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background appearance-none cursor-pointer pr-10 text-foreground"
                >
                  {regions.map((reg) => (
                    <option key={reg} value={reg}>
                      {reg === 'All' ? 'All 5 Regions' : reg}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>

              {/* Trend Filter */}
              <div className="inline-flex rounded-lg border bg-muted/40 p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setFilterTrend('all')}
                  className={`rounded px-3 py-1.5 font-semibold transition-colors ${
                    filterTrend === 'all' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  All 54
                </button>
                <button
                  type="button"
                  onClick={() => setFilterTrend('gained')}
                  className={`rounded px-3 py-1.5 font-semibold transition-colors ${
                    filterTrend === 'gained' ? 'bg-emerald-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Gained
                </button>
                <button
                  type="button"
                  onClick={() => setFilterTrend('declined')}
                  className={`rounded px-3 py-1.5 font-semibold transition-colors ${
                    filterTrend === 'declined' ? 'bg-rose-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Declined
                </button>
              </div>
            </div>

            {/* Compare Selected Button (Inline Action) */}
            {pickedSlugs.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleOpenComparison}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-xs gap-1.5 shadow-sm h-10"
                >
                  <GitCompare className="size-4" />
                  <span>Compare Selected ({pickedSlugs.length})</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearPicked}
                  className="text-xs text-muted-foreground hover:text-foreground h-10"
                >
                  Reset
                </Button>
              </div>
            )}
          </div>

          {/* MAIN COMPARISON TABLE */}
          <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="border-b bg-muted/60 font-semibold text-muted-foreground">
                  <tr>
                    <th className="px-3.5 py-3.5 w-12 text-center" title="Pick to compare">
                      Pick
                    </th>
                    <th className="px-3.5 py-3.5 w-16">
                      <button onClick={() => handleSort('rank2026')} className="inline-flex items-center gap-1 hover:text-foreground">
                        2026 Rank <ArrowUpDown className="size-3" />
                      </button>
                    </th>
                    <th className="px-3.5 py-3.5 w-16">
                      <button onClick={() => handleSort('rank2025')} className="inline-flex items-center gap-1 hover:text-foreground">
                        2025 Rank <ArrowUpDown className="size-3" />
                      </button>
                    </th>
                    <th className="px-3.5 py-3.5 w-20 text-center">
                      <button onClick={() => handleSort('rankChange')} className="inline-flex items-center gap-1 hover:text-foreground">
                        Rank Δ <ArrowUpDown className="size-3" />
                      </button>
                    </th>
                    <th className="px-4 py-3.5">
                      <button onClick={() => handleSort('country')} className="inline-flex items-center gap-1 hover:text-foreground">
                        Country <ArrowUpDown className="size-3" />
                      </button>
                    </th>
                    <th className="px-4 py-3.5 hidden md:table-cell">Region</th>
                    <th className="px-4 py-3.5 text-right bg-muted/80">
                      <button onClick={() => handleSort('overall2026')} className="inline-flex items-center gap-1 hover:text-foreground">
                        2026 Score <ArrowUpDown className="size-3" />
                      </button>
                    </th>
                    <th className="px-4 py-3.5 text-right">
                      <button onClick={() => handleSort('overall2025')} className="inline-flex items-center gap-1 hover:text-foreground">
                        2025 Score <ArrowUpDown className="size-3" />
                      </button>
                    </th>
                    <th className="px-4 py-3.5 text-right">
                      <button onClick={() => handleSort('overallChange')} className="inline-flex items-center gap-1 hover:text-foreground">
                        Score Δ <ArrowUpDown className="size-3" />
                      </button>
                    </th>
                    <th className="px-3.5 py-3.5 text-right hidden lg:table-cell">
                      <button onClick={() => handleSort('politicalChange')} className="inline-flex items-center gap-1 hover:text-foreground">
                        Political Δ <ArrowUpDown className="size-3" />
                      </button>
                    </th>
                    <th className="px-3.5 py-3.5 text-right hidden lg:table-cell">
                      <button onClick={() => handleSort('economicChange')} className="inline-flex items-center gap-1 hover:text-foreground">
                        Economic Δ <ArrowUpDown className="size-3" />
                      </button>
                    </th>
                    <th className="px-3.5 py-3.5 text-right hidden lg:table-cell">
                      <button onClick={() => handleSort('prosperityChange')} className="inline-flex items-center gap-1 hover:text-foreground">
                        Prosperity Δ <ArrowUpDown className="size-3" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="px-6 py-12 text-center text-muted-foreground">
                        No countries matched your filter.
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((row) => {
                      const isRankImproved = row.change.rank > 0
                      const isRankDropped = row.change.rank < 0
                      const isScoreImproved = row.change.overall > 0
                      const isScoreDropped = row.change.overall < 0
                      const isPicked = pickedSlugs.includes(row.slug)

                      return (
                        <tr
                          key={row.slug}
                          className={`hover:bg-muted/20 transition-colors ${
                            isPicked ? 'bg-accent/10 hover:bg-accent/15' : ''
                          }`}
                        >
                          {/* Pick checkbox */}
                          <td className="px-3.5 py-3 text-center">
                            <input
                              type="checkbox"
                              checked={isPicked}
                              onChange={() => handleTogglePick(row.slug)}
                              aria-label={`Select ${row.country} to compare`}
                              className="size-4 rounded border-input text-accent focus:ring-accent cursor-pointer"
                            />
                          </td>

                          <td className="px-3.5 py-3 font-serif font-bold text-foreground">#{row.y2026.rank}</td>
                          <td className="px-3.5 py-3 text-muted-foreground">#{row.y2025.rank}</td>

                          {/* Rank change badge */}
                          <td className="px-3.5 py-3 text-center">
                            {isRankImproved ? (
                              <span className="inline-flex items-center gap-0.5 rounded bg-emerald-500/15 px-1.5 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                                <ArrowUpRight className="size-3" />
                                <span>+{row.change.rank}</span>
                              </span>
                            ) : isRankDropped ? (
                              <span className="inline-flex items-center gap-0.5 rounded bg-rose-500/15 px-1.5 py-0.5 text-xs font-bold text-rose-700 dark:text-rose-400 font-mono">
                                <ArrowDownRight className="size-3" />
                                <span>{row.change.rank}</span>
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground font-mono">0</span>
                            )}
                          </td>

                          {/* Country */}
                          <td className="px-4 py-3">
                            <Link href={`/country/${row.slug}`} className="flex items-center gap-2.5 group">
                              <span className="text-2xl select-none">{row.flagEmoji}</span>
                              <span className="font-semibold text-foreground group-hover:text-accent group-hover:underline">
                                {row.country}
                              </span>
                            </Link>
                          </td>

                          <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">{row.region}</td>

                          {/* 2026 Score */}
                          <td className="px-4 py-3 text-right bg-muted/30">
                            <ScoreBadge score={row.y2026.overall} size="sm" />
                          </td>

                          {/* 2025 Score */}
                          <td className="px-4 py-3 text-right text-xs font-semibold tabular-nums text-muted-foreground">
                            {row.y2025.overall.toFixed(1)}
                          </td>

                          {/* Score Delta */}
                          <td className="px-4 py-3 text-right">
                            {isScoreImproved ? (
                              <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                +{row.change.overall.toFixed(1)}
                              </span>
                            ) : isScoreDropped ? (
                              <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400">
                                {row.change.overall.toFixed(1)}
                              </span>
                            ) : (
                              <span className="font-mono text-xs text-muted-foreground">0.0</span>
                            )}
                          </td>

                          {/* Pillars Deltas */}
                          <td className="px-3.5 py-3 text-right text-xs font-mono hidden lg:table-cell">
                            <span className={row.change.political > 0 ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : row.change.political < 0 ? 'text-rose-600 dark:text-rose-400 font-semibold' : 'text-muted-foreground'}>
                              {row.change.political > 0 ? '+' : ''}{row.change.political.toFixed(1)}
                            </span>
                          </td>
                          <td className="px-3.5 py-3 text-right text-xs font-mono hidden lg:table-cell">
                            <span className={row.change.economic > 0 ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : row.change.economic < 0 ? 'text-rose-600 dark:text-rose-400 font-semibold' : 'text-muted-foreground'}>
                              {row.change.economic > 0 ? '+' : ''}{row.change.economic.toFixed(1)}
                            </span>
                          </td>
                          <td className="px-3.5 py-3 text-right text-xs font-mono hidden lg:table-cell">
                            <span className={row.change.prosperity > 0 ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : row.change.prosperity < 0 ? 'text-rose-600 dark:text-rose-400 font-semibold' : 'text-muted-foreground'}>
                              {row.change.prosperity > 0 ? '+' : ''}{row.change.prosperity.toFixed(1)}
                            </span>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between border-t bg-muted/20 px-5 py-3 text-xs text-muted-foreground">
              <span>Comparing all 54 African countries between 2025 and 2026.</span>
              <span>Data source: Freedom in Africa Report · Liberalist Centre</span>
            </div>
          </div>
        </section>

        {/* FLOATING ACTION DOCK (ALWAYS ACCESSIBLE WHILE SELECTING COUNTRIES) */}
        {pickedSlugs.length > 0 && (
          <aside
            aria-label="Country comparison selection"
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl animate-in slide-in-from-bottom-4 duration-300"
          >
            <div className="rounded-2xl border border-white/20 bg-[#070b14]/95 p-3.5 shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-white">
              {/* Selected Country Pills */}
              <div className="flex flex-wrap items-center gap-2 max-w-full sm:max-w-sm">
                <span className="text-xs font-bold text-accent mr-1">
                  {pickedSlugs.length} selected:
                </span>
                {pickedCountries.map((c) => (
                  <span
                    key={c.slug}
                    className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white border border-white/10"
                  >
                    <span>{c.flagEmoji}</span>
                    <span className="font-semibold">{c.country}</span>
                    <button
                      onClick={() => handleTogglePick(c.slug)}
                      className="text-slate-400 hover:text-white p-0.5 rounded-full"
                      aria-label={`Remove ${c.country}`}
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Compare Button & Reset */}
              <div className="flex items-center gap-2 ml-auto">
                <Button
                  onClick={handleOpenComparison}
                  size="sm"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold gap-2 text-xs shadow-lg shadow-accent/20"
                >
                  <GitCompare className="size-3.5" />
                  <span>
                    {pickedSlugs.length === 1 ? 'Compare Country Data' : `Compare (${pickedSlugs.length}) Countries`}
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearPicked}
                  className="text-xs text-slate-400 hover:text-white hover:bg-white/10 h-8 px-2"
                >
                  <X className="size-3.5" />
                  <span className="sr-only sm:not-sr-only">Clear</span>
                </Button>
              </div>
            </div>
          </aside>
        )}
      </main>
      <Footer />
    </>
  )
}

export function CompareYearsView() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <CompareYearsContent />
    </Suspense>
  )
}
