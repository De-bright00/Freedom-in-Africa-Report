'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  TrendingUp,
  Coins,
  Stethoscope,
  GraduationCap,
  Zap,
  Scale,
  Shield,
  Briefcase,
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

const prosperityIndicators = [
  {
    code: '3.1',
    name: 'Income & Monetary Freedom',
    icon: Coins,
    score2026: '6.5 / 10',
    desc: 'Ability to maintain purchasing power and avoid extreme inflation. Seychelles and Mauritius lead, while Sudan and Somalia face acute currency instability.',
  },
  {
    code: '3.2',
    name: 'Access to Healthcare',
    icon: Stethoscope,
    score2026: '4.7 / 10',
    desc: 'Out-of-pocket medical expenditure and clinic availability. South Africa achieved the highest score (9.6), while Equatorial Guinea and Burundi collapsed to near zero.',
  },
  {
    code: '3.3',
    name: 'Education & Literacy',
    icon: GraduationCap,
    score2026: '6.0 / 10',
    desc: 'School enrollment, quality of instruction, and literacy. Progress has slowed in sub-Saharan Africa amid population pressure and conflict in the Sahel.',
  },
  {
    code: '3.4',
    name: 'Access to Infrastructure',
    icon: Zap,
    score2026: '5.2 / 10',
    desc: 'Paved road networks, power grids, and clean water. The African Development Bank estimates an annual infrastructure financing deficit of $100 billion.',
  },
  {
    code: '3.5',
    name: 'Economic Inequality',
    icon: Scale,
    score2026: '5.6 / 10',
    desc: 'Wealth and opportunity concentration. Unequal access to assets and public services prevents GDP growth from lifting ordinary citizens.',
  },
  {
    code: '3.6',
    name: 'Peace & Stability',
    icon: Shield,
    score2026: '4.8 / 10',
    desc: 'Absence of violent conflict and civil war. Sub-Saharan Africa contains eight of the twenty least peaceful countries globally (IEP).',
  },
  {
    code: '3.7',
    name: 'Employment & Entrepreneurship',
    icon: Briefcase,
    score2026: '6.8 / 10',
    desc: 'Shift from survival self-employment to productive formal wage work. Self-employment exceeds 89% in Nigeria and 96% in Chad, but is just 1% in South Africa.',
  },
]

export function ProsperityView({ year = '2026' }: DimensionViewProps) {
  const [isCompareMode, setIsCompareMode] = useState(false)
  const edition = getEditionConfig(year)
  const otherYear: EditionYear = year === '2026' ? '2025' : '2026'
  const otherEdition = getEditionConfig(otherYear)
  const countries = getCountries(year)

  // Sort by prosperity score
  const sortedProsperity = [...countries].sort((a, b) => b.prosperity - a.prosperity)
  const top10 = sortedProsperity.slice(0, 10)
  const bottom10 = sortedProsperity.slice(-10).reverse()

  const getLink = (path: string) => (year === '2025' ? `/2025${path}` : path)
  const overallDiff = Number((edition.overallScore - otherEdition.overallScore).toFixed(1))

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* HERO */}
        <section className="bg-primary text-primary-foreground relative overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <span className="section-kicker-invert">Dimension 3 of 3 · 34% of the overall F(in)AR index</span>
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Prosperity ({year})</h1>
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
              Prosperity measures whether freedom translates into real, tangible human wellbeing: reliable healthcare,
              quality education, stable prices, infrastructure access, reduced inequality, and peaceful communities.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold">
              <div className="rounded-lg bg-white/10 px-4 py-2">
                <span className="text-primary-foreground/60 block text-[10px] uppercase">Continental Prosperity Score</span>
                <span className="text-2xl font-bold text-accent">{edition.prosperityScore} <span className="text-xs text-primary-foreground/60">/ 100</span></span>
              </div>
              <div className="rounded-lg bg-white/10 px-4 py-2">
                <span className="text-primary-foreground/60 block text-[10px] uppercase">Weight in Overall Index</span>
                <span className="text-2xl font-bold text-white">34%</span>
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
                      <span className="font-semibold text-emerald-300">Baseline Confirmed:</span> Continental Prosperity shifted from {otherEdition.prosperityScore} ({otherYear}) to {edition.prosperityScore} ({year}) ({(edition.prosperityScore - otherEdition.prosperityScore) > 0 ? '+' : ''}{(edition.prosperityScore - otherEdition.prosperityScore).toFixed(1)} pts).
                    </p>
                    <Link
                      href="/compare-years"
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
          <h2 className="mt-1 text-3xl font-bold">The Seven Indicators of Shared Prosperity</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
            Evaluating health, education, infrastructure, income security, and domestic peace across 54 nations.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {prosperityIndicators.map((ind) => {
              const Icon = ind.icon
              return (
                <Card key={ind.code} className="border shadow-sm">
                  <CardHeader className="pb-3 bg-muted/20 border-b">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-emerald-600">Factor {ind.code}</span>
                      <span className="text-xs font-bold text-foreground">{ind.score2026}</span>
                    </div>
                    <CardTitle className="text-lg font-bold flex items-center gap-2 mt-2">
                      <Icon className="size-4 text-emerald-600" />
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
            <h2 className="text-3xl font-bold">Prosperity: Top &amp; Bottom Performers ({year})</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Seychelles (87.3) and Mauritius (84.1) lead the continent, while war-torn South Sudan (17.4) and Somalia (28.7) face extreme hardship.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {/* Top 10 */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-emerald-500/5 border-b pb-4">
                  <CardTitle className="text-lg font-bold text-emerald-900 dark:text-emerald-300">
                    Top 10 Prosperity Performers
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
                      <ScoreBadge score={c.prosperity} size="sm" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Bottom 10 */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-rose-500/5 border-b pb-4">
                  <CardTitle className="text-lg font-bold text-rose-900 dark:text-rose-300">
                    Bottom 10 Prosperity Performers
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
                      <ScoreBadge score={c.prosperity} size="sm" />
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
              <h3 className="text-lg font-bold">See Political Freedom &amp; Economic Freedom</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" size="sm">
                <Link href={getLink('/political-freedom')}>
                  Political Freedom <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={getLink('/economic-freedom')}>
                  Economic Freedom <ArrowRight className="ml-1 size-3.5" />
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
