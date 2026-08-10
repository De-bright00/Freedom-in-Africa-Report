'use client'

import { useState, useMemo } from 'react'
import { Search, ArrowUpDown, X, SlidersHorizontal, ScaleIcon, Landmark, TrendingUp, HelpCircle, Check, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScoreBadge } from '@/components/ui/ScoreBadge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { countries, getScoreColor, getScoreLabel, type Country } from '@/lib/data'

export function RankingsDashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState<string>('All')
  const [sortField, setSortField] = useState<'rank' | 'score' | 'name'>('rank')
  const [sortAsc, setSortAsc] = useState<boolean>(true)
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'rankings' | 'compare'>('rankings')

  // Available regions for filtering
  const regions = ['All', 'Northern', 'Western', 'Eastern', 'Central', 'Southern']

  // Handle checking/unchecking a country for comparison
  const handleToggleSelect = (slug: string) => {
    setSelectedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    )
  }

  // Handle sorting
  const handleSort = (field: 'rank' | 'score' | 'name') => {
    if (sortField === field) {
      setSortAsc((prev) => !prev)
    } else {
      setSortField(field)
      setSortAsc(field === 'name' ? true : true) // Rank ascending is default (1 to 54), Name ascending is default, Score ascending is default (highest is rank 1, but let's make rank ascending 1-54)
    }
  }

  // Filter and sort countries
  const filteredAndSortedCountries = useMemo(() => {
    return countries
      .filter((country) => {
        const matchesSearch =
          country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.region.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesRegion = selectedRegion === 'All' || country.region === selectedRegion
        return matchesSearch && matchesRegion
      })
      .sort((a, b) => {
        let valA = a[sortField]
        let valB = b[sortField]

        // Handle string comparison for names
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA)
        }

        // Numbers comparison (rank or score)
        return sortAsc
          ? (valA as number) - (valB as number)
          : (valB as number) - (valA as number)
      })
  }, [searchQuery, selectedRegion, sortField, sortAsc])

  // Get selected countries data for comparison
  const selectedCountriesData = useMemo(() => {
    return countries.filter((c) => selectedSlugs.includes(c.slug))
  }, [selectedSlugs])

  // Prepare chart data for compared countries
  const chartData = useMemo(() => {
    return selectedCountriesData.map((c) => ({
      name: c.name,
      'Overall Score': c.score,
      'Political Freedom': c.politicalScore,
      'Economic Freedom': c.economicScore,
      'Prosperity': c.prosperityScore,
    }))
  }, [selectedCountriesData])

  // Determine the highest scores in each category for highlighting
  const highestScores = useMemo(() => {
    if (selectedCountriesData.length === 0) return {}
    return {
      score: Math.max(...selectedCountriesData.map((c) => c.score)),
      political: Math.max(...selectedCountriesData.map((c) => c.politicalScore)),
      economic: Math.max(...selectedCountriesData.map((c) => c.economicScore)),
      prosperity: Math.max(...selectedCountriesData.map((c) => c.prosperityScore)),
    }
  }, [selectedCountriesData])

  const clearSelection = () => {
    setSelectedSlugs([])
    setActiveTab('rankings')
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Search and Filters Panel */}
      {activeTab === 'rankings' && (
        <div className="grid gap-4 rounded-xl border bg-card p-5 shadow-sm md:grid-cols-[1.5fr_1fr_auto]">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by country or region..."
              className="pl-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-muted"
                aria-label="Clear search"
              >
                <X className="size-3 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Region selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 shrink-0 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground md:inline">Region:</span>
            <div className="flex flex-wrap gap-1">
              {regions.map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                    selectedRegion === reg
                      ? 'bg-primary text-primary-foreground shadow-sm dark:bg-accent'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          {/* Compare trigger button */}
          <div className="flex items-center justify-end">
            <Button
              disabled={selectedSlugs.length < 2}
              onClick={() => setActiveTab('compare')}
              className="relative bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Compare Selected
              {selectedSlugs.length > 0 && (
                <span className="ml-2 flex size-5 items-center justify-center rounded-full bg-accent-foreground text-[10px] font-bold text-accent">
                  {selectedSlugs.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Persistent Compare Banner when items are selected */}
      {selectedSlugs.length > 0 && activeTab === 'rankings' && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-accent/20 bg-accent/5 px-4 py-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-primary dark:text-blue-300">
              {selectedSlugs.length} {selectedSlugs.length === 1 ? 'country' : 'countries'} selected
            </span>
            <span className="text-xs text-muted-foreground">
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
              className="h-8 bg-accent text-accent-foreground hover:bg-accent/90 text-xs"
            >
              Compare Now
            </Button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: RANKINGS TABLE */}
      {activeTab === 'rankings' && (
        <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="border-b bg-muted/40 font-semibold text-muted-foreground">
                <tr>
                  <th className="px-4 py-3.5 w-10 text-center">Compare</th>
                  <th className="px-4 py-3.5 w-24">
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
                  <th className="px-4 py-3.5 text-right md:text-left">
                    <button
                      onClick={() => handleSort('score')}
                      className="group inline-flex items-center gap-1.5 hover:text-foreground"
                    >
                      Score
                      <ArrowUpDown className="size-3.5 text-muted-foreground/60 transition-colors group-hover:text-foreground" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredAndSortedCountries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      No countries match your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedCountries.map((country) => {
                    const isChecked = selectedSlugs.includes(country.slug)
                    return (
                      <tr
                        key={country.id}
                        className={`transition-colors hover:bg-muted/20 ${
                          isChecked ? 'bg-accent/5' : ''
                        }`}
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
                          #{country.rank}
                        </td>

                        {/* Flag & Name */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl select-none" role="img" aria-label={`Flag of ${country.name}`}>
                              {country.flagEmoji}
                            </span>
                            <span className="font-semibold text-foreground">{country.name}</span>
                          </div>
                        </td>

                        {/* Region */}
                        <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                          {country.region} Africa
                        </td>

                        {/* Score */}
                        <td className="px-4 py-3 text-right md:text-left">
                          <ScoreBadge score={country.score} />
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="border-t bg-muted/20 px-5 py-3 text-xs text-muted-foreground">
            Showing {filteredAndSortedCountries.length} of {countries.length} countries.
          </div>
        </div>
      )}

      {/* TAB CONTENT: SIDE-BY-SIDE COMPARISON */}
      {activeTab === 'compare' && (
        <div className="flex flex-col gap-8 animate-in fade-in duration-200">
          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setActiveTab('rankings')}
                className="h-9"
              >
                Back to rankings
              </Button>
              <Button
                variant="ghost"
                onClick={clearSelection}
                className="h-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                Clear all
              </Button>
            </div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Comparing {selectedCountriesData.length} countries
            </p>
          </div>

          {/* Quick Info / Warning if only 1 remains (if they deleted one) */}
          {selectedCountriesData.length < 2 && (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                <Info className="size-8 text-muted-foreground mb-3" />
                <p className="font-semibold">Select more countries</p>
                <p className="text-xs max-w-sm mt-1">Please select at least 2 countries from the rankings table to view their comparison.</p>
                <Button size="sm" onClick={() => setActiveTab('rankings')} className="mt-4">
                  Go to rankings
                </Button>
              </CardContent>
            </Card>
          )}

          {selectedCountriesData.length >= 2 && (
            <>
              {/* Comparison Visual Chart */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Visual Dimension Comparison</CardTitle>
                  <CardDescription>
                    Compare scores across Overall Index, Political Freedom, Economic Freedom, and Prosperity.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-[360px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: '600' }} tickLine={false} axisLine={false} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                        <Tooltip
                          cursor={{ fill: '#f3f4f6' }}
                          contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                        <Bar name="Overall Score" dataKey="Overall Score" fill="#0f2044" radius={[4, 4, 0, 0]} />
                        <Bar name="Political Freedom" dataKey="Political Freedom" fill="#ff8a75" radius={[4, 4, 0, 0]} />
                        <Bar name="Economic Freedom" dataKey="Economic Freedom" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar name="Prosperity" dataKey="Prosperity" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Comparison Matrix Table */}
              <Card className="shadow-sm overflow-hidden">
                <CardHeader className="bg-muted/20 border-b">
                  <CardTitle className="text-xl">Detailed Comparison Matrix</CardTitle>
                  <CardDescription>
                    Highest scores in each category are highlighted in bold.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm whitespace-nowrap">
                    <thead>
                      <tr className="border-b bg-muted/40 font-semibold text-muted-foreground">
                        <th className="px-6 py-4 min-w-[200px]">Metric</th>
                        {selectedCountriesData.map((c) => (
                          <th key={c.slug} className="px-6 py-4 text-center">
                            <div className="flex flex-col items-center gap-1.5">
                              <span className="text-3xl select-none">{c.flagEmoji}</span>
                              <span className="font-bold text-foreground">{c.name}</span>
                              <span className="text-xs font-normal text-muted-foreground">{c.region} Africa</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {/* Rank row */}
                      <tr>
                        <td className="px-6 py-4 font-semibold text-muted-foreground">Continental Rank</td>
                        {selectedCountriesData.map((c) => (
                          <td key={c.slug} className="px-6 py-4 text-center font-serif text-lg font-bold">
                            #{c.rank}
                          </td>
                        ))}
                      </tr>

                      {/* Overall score row */}
                      <tr className="bg-muted/10">
                        <td className="px-6 py-4 font-semibold text-primary dark:text-blue-300">
                          Overall Score
                        </td>
                        {selectedCountriesData.map((c) => {
                          const isHighest = c.score === highestScores.score
                          return (
                            <td key={c.slug} className="px-6 py-4 text-center">
                              <div className="flex flex-col items-center gap-1">
                                <span className={`text-base ${isHighest ? 'font-bold text-primary dark:text-blue-200' : 'text-muted-foreground'}`}>
                                  {c.score} / 100
                                </span>
                                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                                  {getScoreLabel(c.score)}
                                </span>
                              </div>
                            </td>
                          )
                        })}
                      </tr>

                      {/* Political Freedom row */}
                      <tr>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-2 font-semibold">
                            <ScaleIcon className="size-4 text-liberalist-coral shrink-0" />
                            Political Freedom
                          </span>
                        </td>
                        {selectedCountriesData.map((c) => {
                          const isHighest = c.politicalScore === highestScores.political
                          return (
                            <td key={c.slug} className="px-6 py-4 text-center">
                              <span className={`text-sm ${isHighest ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>
                                {c.politicalScore}
                              </span>
                            </td>
                          )
                        })}
                      </tr>

                      {/* Economic Freedom row */}
                      <tr>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-2 font-semibold">
                            <Landmark className="size-4 text-blue-500 shrink-0" />
                            Economic Freedom
                          </span>
                        </td>
                        {selectedCountriesData.map((c) => {
                          const isHighest = c.economicScore === highestScores.economic
                          return (
                            <td key={c.slug} className="px-6 py-4 text-center">
                              <span className={`text-sm ${isHighest ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>
                                {c.economicScore}
                              </span>
                            </td>
                          )
                        })}
                      </tr>

                      {/* Prosperity row */}
                      <tr>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-2 font-semibold">
                            <TrendingUp className="size-4 text-emerald-500 shrink-0" />
                            Prosperity
                          </span>
                        </td>
                        {selectedCountriesData.map((c) => {
                          const isHighest = c.prosperityScore === highestScores.prosperity
                          return (
                            <td key={c.slug} className="px-6 py-4 text-center">
                              <span className={`text-sm ${isHighest ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>
                                {c.prosperityScore}
                              </span>
                            </td>
                          )
                        })}
                      </tr>

                      {/* Description row */}
                      <tr>
                        <td className="px-6 py-4 font-semibold text-muted-foreground whitespace-normal min-w-[200px]">
                          Situation Summary
                        </td>
                        {selectedCountriesData.map((c) => (
                          <td
                            key={c.slug}
                            className="px-6 py-4 text-left whitespace-normal min-w-[240px] text-xs leading-5 text-muted-foreground"
                          >
                            {c.description}
                          </td>
                        ))}
                      </tr>

                      {/* Action row (remove) */}
                      <tr className="bg-muted/10">
                        <td className="px-6 py-4 font-semibold text-muted-foreground">Actions</td>
                        {selectedCountriesData.map((c) => (
                          <td key={c.slug} className="px-6 py-4 text-center">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleToggleSelect(c.slug)}
                              className="h-7 text-xs border-destructive/20 text-destructive hover:bg-destructive/10"
                            >
                              Remove
                            </Button>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      )}
    </div>
  )
}
