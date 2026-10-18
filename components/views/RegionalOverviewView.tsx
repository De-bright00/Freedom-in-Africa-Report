'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  MapPinned,
  Compass,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Building,
  Shield,
  Layers,
  GitCompare,
  X,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ScoreBadge } from '@/components/ui/ScoreBadge'
import { RegionalChart } from '@/components/charts/RegionalChart'
import { EditionYear } from '@/lib/editions/types'
import { getEditionConfig, getCountries } from '@/lib/editions'

interface RegionalOverviewViewProps {
  year?: EditionYear
}

export function RegionalOverviewView({ year = '2026' }: RegionalOverviewViewProps) {
  const [isCompareMode, setIsCompareMode] = useState(false)
  const edition = getEditionConfig(year)
  const otherYear: EditionYear = year === '2026' ? '2025' : '2026'
  const otherEdition = getEditionConfig(otherYear)
  const countries = getCountries(year)

  // Group countries dynamically by canonical region using edition config
  const regionGroups = edition.regions.map((reg) => {
    const shortName = reg.name.replace(' Africa', '')
    return {
      name: reg.name,
      shortName,
      score: reg.avgScore,
      countries: countries.filter((c) => c.region.includes(shortName)),
    }
  })

  const chartRegions = regionGroups.map((r) => ({
    name: r.shortName as any,
    avgScore: r.score,
    standing: r.score >= 57 ? 'Best performing' : r.score < 45 ? 'Worst performing' : 'Mid-table',
  }))

  const getLink = (path: string) => (year === '2025' ? `/2025${path}` : path)
  const overallDiff = Number((edition.overallScore - otherEdition.overallScore).toFixed(1))

  const regionalPriorities = edition.regions.map((reg) => ({
    region: reg.name,
    score: `${reg.avgScore.toFixed(1)} / 100`,
    title: reg.standing,
    text: reg.challenge || (reg.leader ? `Leading nations: ${reg.leader}` : ''),
  }))

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* HERO */}
        <section className="bg-primary text-primary-foreground relative overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <span className="section-kicker-invert">Geographic Analysis · {year} Edition</span>
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                Africa&rsquo;s Regional Overview ({year})
              </h1>
              <Button
                type="button"
                variant={isCompareMode ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIsCompareMode((prev) => !prev)}
                className={
                  isCompareMode
                    ? 'bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 font-bold shadow-sm self-start sm:self-auto'
                    : 'border-primary-foreground/30 text-primary-foreground hover:bg-white/10 gap-1.5 font-semibold self-start sm:self-auto'
                }
              >
                <GitCompare className="size-3.5" />
                <span>{isCompareMode ? `Comparing with ${otherYear}` : `Compare with ${otherYear}`}</span>
              </Button>
            </div>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-foreground/75">
              Freedom and prosperity vary drastically across Africa. Compare how the continent&rsquo;s five
              distinct regions perform across political rights, market opportunities, and living standards.
            </p>

            {/* COMPARE BANNER */}
            {isCompareMode && (
              <div className="mt-6 rounded-xl border border-white/20 bg-white/10 p-4 text-primary-foreground animate-in fade-in duration-200">
                <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-2.5">
                  <div className="flex items-center gap-2">
                    <GitCompare className="size-4 text-liberalist-coral" />
                    <span className="font-bold text-sm">Comparing Regional Averages: {year} vs {otherYear}</span>
                  </div>
                  <button
                    onClick={() => setIsCompareMode(false)}
                    className="flex items-center gap-1 text-xs text-primary-foreground/70 hover:text-white"
                  >
                    <X className="size-3.5" />
                    <span>Close</span>
                  </button>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-3 text-xs">
                  <div>
                    <span className="text-primary-foreground/60 block text-[10px] uppercase">Africa Continental Average</span>
                    <span className="font-bold text-base">
                      {edition.overallScore} ({year}) vs {otherEdition.overallScore} ({otherYear})
                    </span>
                    <span className="ml-2 font-mono text-liberalist-coral">
                      {overallDiff > 0 ? `+${overallDiff}` : overallDiff}
                    </span>
                  </div>
                  <div className="sm:col-span-2 flex flex-col justify-center">
                    <p className="text-primary-foreground/80 text-xs">
                      <span className="font-semibold text-emerald-300">Baseline Confirmed:</span> Tracking regional trends across all 5 geographical zones with verified multi-year baseline data.
                    </p>
                    <Link
                      href="/compare-years"
                      className="mt-1 font-bold text-liberalist-coral hover:underline inline-flex items-center gap-1"
                    >
                      <span>Open full country-by-country comparison in /compare-years</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* REGIONAL CHART & BENCHMARK */}
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="section-kicker">Regional Composite Index</p>
              <h2 className="mt-2 text-3xl font-bold">Scores Across Africa&rsquo;s 5 Regions</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {edition.regions[0]?.name} leads the continent with a composite score of {edition.regions[0]?.avgScore.toFixed(1)},
                followed by {edition.regions[1]?.name} at {edition.regions[1]?.avgScore.toFixed(1)}. {edition.regions[edition.regions.length - 1]?.name} records
                the lowest composite score at {edition.regions[edition.regions.length - 1]?.avgScore.toFixed(1)}.
              </p>
              <div className="mt-6 flex flex-col gap-2.5">
                {edition.regions.map((reg) => (
                  <div key={reg.name} className="flex items-center justify-between rounded-lg border bg-card p-3 text-xs">
                    <div>
                      <span className="font-bold text-foreground text-sm">{reg.name}</span>
                      {reg.leader && <span className="block text-[11px] text-muted-foreground mt-0.5">Top: {reg.leader}</span>}
                    </div>
                    <ScoreBadge score={reg.avgScore} size="sm" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <RegionalChart regions={chartRegions} />
            </div>
          </div>
        </section>

        {/* REGION-BY-REGION TABLES */}
        <section className="border-t bg-muted/20 py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="section-kicker">Detailed Country Rosters</p>
            <h2 className="mt-1 text-3xl font-bold">Country Standings by Region ({year})</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Inspect how every nation ranks within its geographic economic community.
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regionGroups.map((group) => (
                <Card key={group.name} className="border shadow-sm flex flex-col justify-between">
                  <CardHeader className="bg-muted/40 border-b pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold">{group.name}</CardTitle>
                      <ScoreBadge score={group.score} size="sm" />
                    </div>
                    <CardDescription className="text-xs">{group.countries.length} nations</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-3 divide-y">
                    {group.countries.map((c) => (
                      <div key={c.slug} className="flex items-center justify-between py-2 text-xs first:pt-0 last:pb-0">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-muted-foreground w-6">#{c.rank}</span>
                          <span className="text-lg select-none">{c.flagEmoji}</span>
                          <Link href={getLink(`/country/${c.slug}`)} className="font-semibold text-foreground hover:text-accent hover:underline">
                            {c.country}
                          </Link>
                        </div>
                        <ScoreBadge score={c.overall} size="sm" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* THE WAY FORWARD: FIVE REGIONAL PRIORITIES */}
        <section className="border-t bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="section-kicker">Strategic Reform Agenda</p>
            <h2 className="mt-1 text-3xl font-bold">The Way Forward: Five Regional Priorities</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
              Africa does not need one single model of progress. Each region faces different structural bottlenecks,
              and policy action must reflect these distinct realities.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regionalPriorities.map((item) => (
                <Card key={item.region} className="border shadow-sm flex flex-col justify-between">
                  <CardHeader className="bg-muted/20 border-b pb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-accent">{item.region}</span>
                      <span className="rounded bg-muted px-2 py-0.5 text-xs font-semibold">{item.score}</span>
                    </div>
                    <CardTitle className="text-base font-bold mt-2 leading-snug">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-xs leading-relaxed text-muted-foreground">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
