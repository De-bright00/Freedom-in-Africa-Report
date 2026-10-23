'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Landmark,
  Building2,
  Briefcase,
  Globe,
  Plane,
  Receipt,
  UserCheck,
  Cpu,
  GitCompare,
  X,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ScoreBadge } from '@/components/ui/ScoreBadge'
import { EditionYear } from '@/lib/editions/types'
import { getEditionConfig, getCountries } from '@/lib/editions'

interface DimensionViewProps {
  year?: EditionYear
}

const economicIndicators = [
  {
    code: '2.1',
    name: 'Property Rights',
    icon: Building2,
    score2026: '4.1 / 10',
    desc: 'Security of physical assets and formal land title. Africa scores lowest globally in IPRI (3.78), with only ~15% of farmland formally titled.',
  },
  {
    code: '2.2',
    name: 'Ease of Starting a Business',
    icon: Briefcase,
    score2026: '3.8 / 10',
    desc: 'Cost and time required to register formal enterprise. Cabo Verde leads with streamlined business registration (9.1), while Somalia sits at 0.1.',
  },
  {
    code: '2.3',
    name: 'Free Trade & AfCFTA',
    icon: Globe,
    score2026: '5.4 / 10',
    desc: 'Openness to cross-border commerce. 60% of Africa’s trade costs stem from domestic barriers, customs delays, and logistics bottlenecks.',
  },
  {
    code: '2.4',
    name: 'Freedom of Movement',
    icon: Plane,
    score2026: '4.4 / 10',
    desc: 'Continental mobility and visa openness. Seychelles leads at 9.6, but pre-departure visas still block 47% of intra-African travel routes.',
  },
  {
    code: '2.5',
    name: 'Tax Burden',
    icon: Receipt,
    score2026: '3.2 / 10',
    desc: 'Fiscal pressure on enterprise. South Africa’s tax-to-GDP reached 24.5%, with heavy direct tax concentration on formal firms and workers.',
  },
  {
    code: '2.6',
    name: 'Labor Freedom',
    icon: UserCheck,
    score2026: '5.1 / 10',
    desc: 'Ease of hiring, job entry, and workplace flexibility. Roughly 86% of all employment in Africa remains in the vulnerable informal sector.',
  },
  {
    code: '2.7',
    name: 'Digital Economy Growth',
    icon: Cpu,
    score2026: '5.5 / 10',
    desc: 'Tech enterprise, digital payments, and fintech. While mobile tech contributes $240B to GDP, 30 internet blackouts occurred across 15 nations.',
  },
]

export function EconomicFreedomView({ year = '2026' }: DimensionViewProps) {
  const [isCompareMode, setIsCompareMode] = useState(false)
  const edition = getEditionConfig(year)
  const otherYear: EditionYear = year === '2026' ? '2025' : '2026'
  const otherEdition = getEditionConfig(otherYear)
  const countries = getCountries(year)

  // Sort by economic score
  const sortedEconomic = [...countries].sort((a, b) => b.economic - a.economic)
  const top10 = sortedEconomic.slice(0, 10)
  const bottom10 = sortedEconomic.slice(-10).reverse()

  const getLink = (path: string) => (year === '2025' ? `/2025${path}` : path)
  const overallDiff = Number((edition.overallScore - otherEdition.overallScore).toFixed(1))

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* HERO */}
        <section className="bg-primary text-primary-foreground relative overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <span className="section-kicker-invert">Dimension 2 of 3 · 33% of the overall F(in)AR index</span>
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Economic Freedom ({year})</h1>
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
              Economic Freedom measures the ease of owning property, starting and operating formal businesses,
              trading across African borders, and participating in dynamic labour and digital markets.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold">
              <div className="rounded-lg bg-white/10 px-4 py-2">
                <span className="text-primary-foreground/60 block text-[10px] uppercase">Continental Economic Score</span>
                <span className="text-2xl font-bold text-accent">{edition.economicScore} <span className="text-xs text-primary-foreground/60">/ 100</span></span>
              </div>
              <div className="rounded-lg bg-white/10 px-4 py-2">
                <span className="text-primary-foreground/60 block text-[10px] uppercase">Weight in Overall Index</span>
                <span className="text-2xl font-bold text-white">33%</span>
              </div>
            </div>

            {/* COMPARE BANNER */}
            {isCompareMode && (
              <div className="mt-6 rounded-xl border border-white/20 bg-white/10 p-4 text-primary-foreground animate-in fade-in duration-200">
                <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-2.5">
                  <div className="flex items-center gap-2">
                    <GitCompare className="size-4 text-liberalist-coral" />
                    <span className="font-bold text-sm">Comparing {year} vs {otherYear}</span>
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
                    <span className="text-primary-foreground/60 block text-[10px] uppercase">Overall Africa Score</span>
                    <span className="font-bold text-base">
                      {edition.overallScore} ({year}) vs {otherEdition.overallScore} ({otherYear})
                    </span>
                    <span className="ml-2 font-mono text-liberalist-coral">
                      {overallDiff > 0 ? `+${overallDiff}` : overallDiff}
                    </span>
                  </div>
                  <div className="sm:col-span-2 flex flex-col justify-center">
                    <p className="text-primary-foreground/80 text-xs">
                      <span className="font-semibold text-emerald-300">Baseline Confirmed:</span> Continental Economic Freedom shifted from {otherEdition.economicScore} ({otherYear}) to {edition.economicScore} ({year}) ({(edition.economicScore - otherEdition.economicScore) > 0 ? '+' : ''}{(edition.economicScore - otherEdition.economicScore).toFixed(1)} pts).
                    </p>
                    <Link
                      href={getLink('/compare-years')}
                      className="mt-1 font-bold text-liberalist-coral hover:underline inline-flex items-center gap-1"
                    >
                      <span>Open full country comparison in /compare-years</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* INDICATOR CARDS */}
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <p className="section-kicker">Component Factors</p>
          <h2 className="mt-1 text-3xl font-bold">The Seven Indicators of Economic Liberty</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
            Assessing the institutional and regulatory conditions that enable entrepreneurship, trade, and enterprise.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {economicIndicators.map((ind) => {
              const Icon = ind.icon
              return (
                <Card key={ind.code} className="border shadow-sm">
                  <CardHeader className="pb-3 bg-muted/20 border-b">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-blue-600">Factor {ind.code}</span>
                      <span className="text-xs font-bold text-foreground">{ind.score2026}</span>
                    </div>
                    <CardTitle className="text-lg font-bold flex items-center gap-2 mt-2">
                      <Icon className="size-4 text-blue-600" />
                      <span>{ind.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-xs leading-relaxed text-muted-foreground">{ind.desc}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* TOP & BOTTOM PERFORMERS */}
        <section className="border-t bg-muted/20 py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="text-3xl font-bold">Economic Freedom: Top &amp; Bottom Performers ({year})</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Mauritius and Seychelles anchor the top tier with streamlined business codes and high trade openness, contrasting with conflict-affected states.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {/* Top 10 */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-emerald-500/5 border-b pb-4">
                  <CardTitle className="text-lg font-bold text-emerald-900 dark:text-emerald-300">
                    Top 10 Economic Freedom Performers
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 divide-y">
                  {top10.map((c, idx) => (
                    <div key={c.slug} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-serif font-bold text-muted-foreground w-6">#{idx + 1}</span>
                        <span className="text-xl">{c.flagEmoji}</span>
                        <Link href={`/country/${c.slug}`} className="font-semibold text-foreground hover:text-accent hover:underline">
                          {c.country}
                        </Link>
                      </div>
                      <ScoreBadge score={c.economic} size="sm" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Bottom 10 */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-rose-500/5 border-b pb-4">
                  <CardTitle className="text-lg font-bold text-rose-900 dark:text-rose-300">
                    Bottom 10 Economic Freedom Performers
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 divide-y">
                  {bottom10.map((c, idx) => (
                    <div key={c.slug} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-serif font-bold text-muted-foreground w-6">#{54 - idx}</span>
                        <span className="text-xl">{c.flagEmoji}</span>
                        <Link href={`/country/${c.slug}`} className="font-semibold text-foreground hover:text-accent hover:underline">
                          {c.country}
                        </Link>
                      </div>
                      <ScoreBadge score={c.economic} size="sm" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* DIMENSION NAVIGATION */}
        <section className="border-t bg-muted/40 py-12">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Continue Exploring Dimensions</p>
              <h3 className="text-lg font-bold">See Political Freedom &amp; Prosperity</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" size="sm">
                <Link href={getLink('/political-freedom')}>
                  Political Freedom <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={getLink('/prosperity')}>
                  Prosperity <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
