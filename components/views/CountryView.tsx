'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  GitCompare,
  X,
  ScaleIcon,
  Landmark,
  TrendingUp,
  MapPinned,
  Info,
  Calendar,
  AlertTriangle,
  Download,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ScoreBadge } from '@/components/ui/ScoreBadge'
import { EditionYear, CountryScore } from '@/lib/editions/types'
import { getCountry, getCountries, indicatorMetadata, getEditionConfig, getScoreTone } from '@/lib/editions'

interface CountryViewProps {
  slug: string
  year?: EditionYear
}

export function CountryView({ slug, year = '2026' }: CountryViewProps) {
  const [isCompareMode, setIsCompareMode] = useState(false)
  const otherYear: EditionYear = year === '2026' ? '2025' : '2026'

  const country = getCountry(slug, year)
  const otherCountry = getCountry(slug, otherYear)
  const editionConfig = getEditionConfig(year)
  const otherEditionConfig = getEditionConfig(otherYear)

  if (!country) {
    notFound()
  }

  const getLink = (path: string) => (year === '2025' ? `/2025${path}` : path)

  // Calculations for Compare
  const scoreDiff = otherCountry ? Number((country.overall - otherCountry.overall).toFixed(2)) : 0
  const rankDiff = otherCountry ? otherCountry.rank - country.rank : 0 // positive means improved (e.g. 5 -> 3 is +2)

  // Related countries in same region
  const sameRegion = getCountries(year)
    .filter((c) => c.region === country.region && c.slug !== country.slug)
    .slice(0, 4)

  // Render indicator value helper
  const renderIndicatorScore = (val: number | null | undefined) => {
    if (val === null || val === undefined || isNaN(val)) {
      return <span className="text-muted-foreground/50 text-xs italic">n/a</span>
    }
    const num = Number(val)
    return (
      <span
        className={`font-mono text-sm font-bold ${
          num >= 6.5
            ? 'text-emerald-700 dark:text-emerald-400'
            : num >= 4.5
            ? 'text-amber-700 dark:text-amber-400'
            : 'text-rose-700 dark:text-rose-400'
        }`}
      >
        {num.toFixed(1)} <span className="text-[10px] text-muted-foreground font-normal">/ 10</span>
      </span>
    )
  }

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
            {/* Back link */}
            <div className="mb-6">
              <Link
                href={getLink('/findings#rankings')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <ArrowLeft className="size-3.5" />
                <span>Back to Continental Rankings ({year})</span>
              </Link>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-4xl md:text-5xl select-none" role="img" aria-label={`Flag of ${country.country}`}>
                    {country.flagEmoji}
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-liberalist-coral">
                      {country.region} · {year} Edition
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-0.5">
                      {country.country}
                    </h1>
                  </div>
                </div>
                {country.description && (
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/80">
                    {country.description}
                  </p>
                )}
              </div>

              {/* Compare Button & Action */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Button
                  type="button"
                  variant={isCompareMode ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setIsCompareMode((prev) => !prev)}
                  className={
                    isCompareMode
                      ? 'bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 font-bold shadow-sm'
                      : 'border-primary-foreground/30 text-primary-foreground hover:bg-white/10 gap-1.5 font-semibold'
                  }
                >
                  <GitCompare className="size-3.5" />
                  <span>{isCompareMode ? `Comparing with ${otherYear}` : `Compare with ${otherYear}`}</span>
                </Button>
              </div>
            </div>

            {/* KEY SCORE CARDS */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Overall Score */}
              <div className="rounded-xl border border-white/15 bg-white/10 p-4">
                <span className="text-xs uppercase tracking-wider text-primary-foreground/70 font-semibold block">
                  Overall Score
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{country.overall.toFixed(1)}</span>
                  <span className="text-xs text-primary-foreground/60">/ 100</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-liberalist-coral">Rank #{country.rank} in Africa</span>
                  <ScoreBadge score={country.overall} size="sm" />
                </div>
              </div>

              {/* Political Freedom */}
              <div className="rounded-xl border border-white/15 bg-white/10 p-4">
                <div className="flex items-center justify-between text-xs text-primary-foreground/70">
                  <span className="uppercase tracking-wider font-semibold">Political Freedom</span>
                  <span className="text-[10px] font-mono bg-white/15 px-1.5 py-0.5 rounded">33%</span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{country.political.toFixed(1)}</span>
                  <span className="text-xs text-primary-foreground/60">/ 100</span>
                </div>
                <div className="mt-2 text-xs text-primary-foreground/70">
                  Electoral integrity &amp; civic liberties
                </div>
              </div>

              {/* Economic Freedom */}
              <div className="rounded-xl border border-white/15 bg-white/10 p-4">
                <div className="flex items-center justify-between text-xs text-primary-foreground/70">
                  <span className="uppercase tracking-wider font-semibold">Economic Freedom</span>
                  <span className="text-[10px] font-mono bg-white/15 px-1.5 py-0.5 rounded">33%</span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{country.economic.toFixed(1)}</span>
                  <span className="text-xs text-primary-foreground/60">/ 100</span>
                </div>
                <div className="mt-2 text-xs text-primary-foreground/70">
                  Property rights &amp; AfCFTA trade
                </div>
              </div>

              {/* Prosperity */}
              <div className="rounded-xl border border-white/15 bg-white/10 p-4">
                <div className="flex items-center justify-between text-xs text-primary-foreground/70">
                  <span className="uppercase tracking-wider font-semibold">Prosperity</span>
                  <span className="text-[10px] font-mono bg-white/15 px-1.5 py-0.5 rounded">34%</span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{country.prosperity.toFixed(1)}</span>
                  <span className="text-xs text-primary-foreground/60">/ 100</span>
                </div>
                <div className="mt-2 text-xs text-primary-foreground/70">
                  Living standards, health &amp; peace
                </div>
              </div>
            </div>

            {/* YEAR-ON-YEAR COMPARE BANNER (Visible ONLY when visitor clicked Compare) */}
            {isCompareMode && (
              <div className="mt-6 rounded-xl border border-white/25 bg-white/15 p-5 text-primary-foreground animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <div className="flex items-center gap-2">
                    <GitCompare className="size-4 text-liberalist-coral" />
                    <span className="font-bold text-sm">
                      Comparing {country.country}: {year} vs {otherYear} Edition
                    </span>
                  </div>
                  <button
                    onClick={() => setIsCompareMode(false)}
                    className="flex items-center gap-1 text-xs text-primary-foreground/70 hover:text-white"
                  >
                    <X className="size-3.5" />
                    <span>Close Compare</span>
                  </button>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-4 text-xs">
                  <div>
                    <span className="text-primary-foreground/65 block text-[10px] uppercase">
                      {year} Edition
                    </span>
                    <p className="mt-1 text-xl font-bold">
                      {country.overall.toFixed(1)} <span className="text-xs font-normal opacity-70">pts</span>
                    </p>
                    <span className="text-xs text-liberalist-coral font-semibold">Rank #{country.rank}</span>
                  </div>

                  <div>
                    <span className="text-primary-foreground/65 block text-[10px] uppercase">
                      {otherYear} Edition
                    </span>
                    <p className="mt-1 text-xl font-bold">
                      {otherCountry ? otherCountry.overall.toFixed(1) : '—'}{' '}
                      <span className="text-xs font-normal opacity-70">pts</span>
                    </p>
                    <span className="text-xs text-primary-foreground/80 font-semibold">
                      {otherCountry ? `Rank #${otherCountry.rank}` : '—'}
                    </span>
                  </div>

                  <div>
                    <span className="text-primary-foreground/65 block text-[10px] uppercase">
                      Overall Score Change
                    </span>
                    <p
                      className={`mt-1 text-xl font-bold font-mono ${
                        scoreDiff > 0
                          ? 'text-emerald-300'
                          : scoreDiff < 0
                          ? 'text-rose-300'
                          : 'text-white'
                      }`}
                    >
                      {scoreDiff > 0 ? `▲ +${scoreDiff.toFixed(1)}` : scoreDiff < 0 ? `▼ ${scoreDiff.toFixed(1)}` : `— 0.0`}
                    </p>
                    <span className="text-[11px] opacity-75">
                      {scoreDiff > 0 ? 'Score improved' : scoreDiff < 0 ? 'Score declined' : 'Unchanged'}
                    </span>
                  </div>

                  <div>
                    <span className="text-primary-foreground/65 block text-[10px] uppercase">
                      Rank Movement
                    </span>
                    <p
                      className={`mt-1 text-xl font-bold font-mono ${
                        rankDiff > 0
                          ? 'text-emerald-300'
                          : rankDiff < 0
                          ? 'text-rose-300'
                          : 'text-white'
                      }`}
                    >
                      {rankDiff > 0 ? `▲ +${rankDiff}` : rankDiff < 0 ? `▼ ${rankDiff}` : `— 0`}
                    </p>
                    <span className="text-[11px] opacity-75">
                      {rankDiff > 0 ? 'Climbed ranks' : rankDiff < 0 ? 'Fell in rank' : 'Rank unchanged'}
                    </span>
                  </div>
                </div>

                {/* Confirmed Pillar Movements */}
                {otherCountry && (
                  <div className="mt-4 border-t border-white/15 pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="rounded-lg bg-white/10 p-2.5">
                      <span className="text-[10px] text-primary-foreground/70 uppercase block font-semibold">Political Freedom</span>
                      <div className="mt-1 flex items-baseline justify-between">
                        <span className="font-bold">{country.political.toFixed(1)} <span className="text-[10px] opacity-70">vs {otherCountry.political.toFixed(1)}</span></span>
                        <span className={`font-mono text-xs font-bold ${(country.political - otherCountry.political) > 0 ? 'text-emerald-300' : (country.political - otherCountry.political) < 0 ? 'text-rose-300' : 'text-white'}`}>
                          {(country.political - otherCountry.political) > 0 ? '+' : ''}{(country.political - otherCountry.political).toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-white/10 p-2.5">
                      <span className="text-[10px] text-primary-foreground/70 uppercase block font-semibold">Economic Freedom</span>
                      <div className="mt-1 flex items-baseline justify-between">
                        <span className="font-bold">{country.economic.toFixed(1)} <span className="text-[10px] opacity-70">vs {otherCountry.economic.toFixed(1)}</span></span>
                        <span className={`font-mono text-xs font-bold ${(country.economic - otherCountry.economic) > 0 ? 'text-emerald-300' : (country.economic - otherCountry.economic) < 0 ? 'text-rose-300' : 'text-white'}`}>
                          {(country.economic - otherCountry.economic) > 0 ? '+' : ''}{(country.economic - otherCountry.economic).toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-white/10 p-2.5">
                      <span className="text-[10px] text-primary-foreground/70 uppercase block font-semibold">Prosperity</span>
                      <div className="mt-1 flex items-baseline justify-between">
                        <span className="font-bold">{country.prosperity.toFixed(1)} <span className="text-[10px] opacity-70">vs {otherCountry.prosperity.toFixed(1)}</span></span>
                        <span className={`font-mono text-xs font-bold ${(country.prosperity - otherCountry.prosperity) > 0 ? 'text-emerald-300' : (country.prosperity - otherCountry.prosperity) < 0 ? 'text-rose-300' : 'text-white'}`}>
                          {(country.prosperity - otherCountry.prosperity) > 0 ? '+' : ''}{(country.prosperity - otherCountry.prosperity).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 border-t border-white/15 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <p className="text-primary-foreground/80 text-[11px]">
                    <span className="font-semibold text-emerald-300">Baseline Confirmed:</span> Tracking verified year-on-year movement across overall and pillar dimensions.
                  </p>
                  <Button asChild size="sm" variant="outline" className="border-white/30 text-primary-foreground hover:bg-white/10 shrink-0 font-semibold h-7 text-xs">
                    <Link href={`/compare-years?country=${country.slug}`}>
                      Continental Comparative View (/compare-years) <ArrowRight className="ml-1 size-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CANONICAL SCORE LEGEND */}
        <section className="border-b bg-muted/40 py-3 text-xs">
          <div className="mx-auto max-w-7xl px-5 lg:px-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <Info className="size-4 text-accent" />
              <span>Score Benchmark:</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
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
            <Link href={getLink('/dataset')} className="text-accent font-semibold hover:underline inline-flex items-center gap-1">
              <span>View full {year} indicator dataset</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </section>

        {/* INDICATOR BREAKDOWN (20 FACTORS) */}
        <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="section-kicker">Detailed Assessment</p>
              <h2 className="mt-1 text-2xl md:text-3xl font-bold">20 Indicator Factors for {country.country}</h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                Scores normalized onto a 0–10 scale across the 3 core dimensions of the Freedom in Africa Report ({year} edition).
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead className="border-b bg-muted/60 font-semibold text-muted-foreground">
                  <tr>
                    <th className="px-3.5 py-3 w-16 text-center">Factor</th>
                    <th className="px-3.5 py-3 min-w-[200px]">Indicator Name</th>
                    <th className="px-3.5 py-3 hidden md:table-cell">Dimension</th>
                    <th className="px-3.5 py-3 text-right">Weight</th>
                    <th className="px-3.5 py-3 text-right font-bold text-foreground">{year} Score (0–10)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {indicatorMetadata.map((meta) => {
                    const score = country.indicators[meta.key]
                    return (
                      <tr key={meta.code} className="hover:bg-muted/20 transition-colors">
                        <td className="px-3.5 py-3 text-center font-mono font-bold text-accent">
                          [{meta.code}]
                        </td>
                        <td className="px-3.5 py-3">
                          <div className="flex flex-col">
                            <span className="font-semibold text-foreground text-sm">{meta.fullName}</span>
                            <span className="text-[11px] text-muted-foreground">{meta.description}</span>
                            {meta.nonComparableNote && (
                              <span className="mt-0.5 text-[10px] text-amber-600 dark:text-amber-400 font-medium italic">
                                ⚠️ {meta.nonComparableNote}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-3.5 py-3 text-muted-foreground hidden md:table-cell">
                          {meta.dimension}
                        </td>
                        <td className="px-3.5 py-3 text-right font-mono text-muted-foreground">
                          {meta.weightPercent}%
                        </td>
                        <td className="px-3.5 py-3 text-right tabular-nums">
                          {renderIndicatorScore(score)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* REGIONAL NEIGHBOURS */}
        {sameRegion.length > 0 && (
          <section className="border-t bg-muted/30 py-12">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="section-kicker">Regional Context</p>
                  <h3 className="text-xl font-bold">Other Nations in {country.region}</h3>
                </div>
                <Link
                  href={getLink('/regional-overview')}
                  className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
                >
                  <span>Regional overview</span>
                  <ArrowRight className="size-3" />
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {sameRegion.map((neighbor) => (
                  <Link
                    key={neighbor.slug}
                    href={getLink(`/country/${neighbor.slug}`)}
                    className="group rounded-xl border bg-card p-4 transition-all hover:border-accent/50 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{neighbor.flagEmoji}</span>
                      <ScoreBadge score={neighbor.overall} size="sm" />
                    </div>
                    <p className="mt-3 font-bold text-foreground group-hover:text-accent transition-colors">
                      {neighbor.country}
                    </p>
                    <p className="text-xs text-muted-foreground">Rank #{neighbor.rank} in Africa</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
