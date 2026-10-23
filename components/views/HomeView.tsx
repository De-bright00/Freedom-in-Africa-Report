'use client'

import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Download,
  Landmark,
  MapPinned,
  ScaleIcon,
  TrendingUp,
  Globe2,
  GitCompare,
  Plane,
  Smartphone,
  Users,
  ShieldAlert,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ScoreBadge } from '@/components/ui/ScoreBadge'
import { GlobalComparisonChart } from '@/components/charts/RegionalChart'
import { EditionYear } from '@/lib/editions/types'
import { getEditionConfig, getTopCountries } from '@/lib/editions'

interface HomeViewProps {
  year?: EditionYear
}

export function HomeView({ year = '2026' }: HomeViewProps) {
  const edition = getEditionConfig(year)
  const topCountries = getTopCountries(year, 5)

  const prefix = year === '2025' ? '/2025' : ''
  const getLink = (path: string) => (year === '2025' ? `/2025${path}` : path)

  return (
    <>
      <Navbar />
      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(135deg, transparent 45%, white 45%, white 46%, transparent 46%), linear-gradient(45deg, transparent 45%, white 45%, white 46%, transparent 46%)',
              backgroundSize: '64px 64px',
            }}
          />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pt-8 pb-16 md:pt-12 md:pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
            <div>
              <div className="mb-3 flex items-center gap-2 md:mb-4">
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-liberalist-coral">
                  {edition.title}
                </span>
                {year === '2026' && (
                  <span className="rounded-full bg-accent/20 border border-accent/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                    New Edition
                  </span>
                )}
              </div>
              <h1 className="max-w-3xl text-balance text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">
                Measuring Political Freedom, Economic Freedom &amp; Prosperity in Africa
              </h1>
              <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-primary-foreground/75">
                {edition.headlineSummary}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg font-bold">
                  <Link
                    href={edition.pdfUrl}
                    download={edition.pdfFileName}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download data-icon="inline-start" /> Download {edition.title} Report (PDF)
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link href={getLink('/findings')}>
                    Explore the findings <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
              </div>

              {/* Quick Jump to Comparison */}
              <div className="mt-6 flex items-center gap-2 text-xs text-primary-foreground/60">
                <span>Want to see how scores changed?</span>
                <Link href={getLink('/compare-years')} className="font-semibold text-liberalist-coral hover:underline inline-flex items-center gap-1">
                  <span>Compare 2025 vs 2026</span>
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>

            {/* Cover Image Showcase */}
            <div className="hidden lg:block">
              <div className="mx-auto max-w-[340px] rotate-2 shadow-2xl overflow-hidden rounded-xl border border-white/15 bg-white/5 transition-transform duration-300 hover:rotate-0">
                <img
                  src={edition.coverImage}
                  alt={`${edition.title} Report Cover`}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CONTINENTAL OVERALL SCORE & GLOBAL BENCHMARK */}
        <section className="border-y bg-muted/35">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="section-kicker">Africa&apos;s overall score</p>
                <p className="mt-3 font-serif text-6xl font-bold tracking-tight text-primary">
                  {edition.overallScore}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">out of 100 · {edition.year} edition</p>
                <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
                  {year === '2026'
                    ? 'Africa scores 51.2 on the aggregate scale, with Political Freedom advancing to 52.8 and Prosperity rising to 56.5, while Economic Freedom fell to 44.3.'
                    : 'Africa recorded an initial benchmark of 52.8 in the 2025 inaugural edition, with Economic Freedom leading at 58.9.'}
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold">
                  <div className="rounded-lg bg-background p-3 border shadow-sm">
                    <span className="text-muted-foreground block text-[10px] uppercase">Political</span>
                    <span className="text-lg font-bold text-accent">{edition.politicalScore}</span>
                  </div>
                  <div className="rounded-lg bg-background p-3 border shadow-sm">
                    <span className="text-muted-foreground block text-[10px] uppercase">Economic</span>
                    <span className="text-lg font-bold text-blue-600">{edition.economicScore}</span>
                  </div>
                  <div className="rounded-lg bg-background p-3 border shadow-sm">
                    <span className="text-muted-foreground block text-[10px] uppercase">Prosperity</span>
                    <span className="text-lg font-bold text-emerald-600">{edition.prosperityScore}</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Global Region Comparison ({year})
                </p>
                <GlobalComparisonChart data={edition.globalComparison} />
              </div>
            </div>
          </div>
        </section>

        {/* CONTINENTAL LEADERBOARD (TOP 5) */}
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker">At a glance</p>
              <h2 className="mt-2 text-2xl font-bold">The continental leaderboard ({year})</h2>
            </div>
            <Link href={getLink('/findings')} className="hidden text-sm font-semibold text-primary hover:text-accent sm:block">
              Full 54-country rankings <ArrowRight className="ml-1 inline size-4" />
            </Link>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {topCountries.map((country) => (
              <div key={country.slug} className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-sm hover:border-accent/40 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-3xl select-none">{country.flagEmoji}</span>
                  <div>
                    <Link
                      href={year === '2025' ? `/2025/country/${country.slug}` : `/country/${country.slug}`}
                      className="font-semibold text-foreground hover:text-accent hover:underline block"
                    >
                      {country.country}
                    </Link>
                    <p className="text-xs text-muted-foreground">Rank #{country.rank}</p>
                  </div>
                </div>
                <ScoreBadge score={country.overall} size="sm" />
              </div>
            ))}
          </div>
        </section>

        {/* THE THREE DIMENSIONS */}
        <section className="border-t bg-muted/20 py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="section-kicker">Core Pillars</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">The Three Dimensions of F(in)AR</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Freedom is measured across three equally weighted pillars that examine whether citizens can vote, trade, work, and prosper.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {/* Political Freedom */}
              <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                      <ScaleIcon className="size-5" />
                    </div>
                    <span className="rounded bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent">33% Weight</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold">Political Freedom</h3>
                  <p className="mt-1 text-2xl font-serif font-bold text-primary">{edition.politicalScore} <span className="text-xs font-normal text-muted-foreground">/ 100</span></p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    Assesses credible elections, free expression, independent judiciary, and safeguards against state repression.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t">
                  <Link href={getLink('/political-freedom')} className="text-xs font-bold text-primary hover:text-accent inline-flex items-center gap-1">
                    Explore Political Freedom <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>

              {/* Economic Freedom */}
              <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                      <Landmark className="size-5" />
                    </div>
                    <span className="rounded bg-blue-500/10 px-2 py-0.5 text-xs font-bold text-blue-600">33% Weight</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold">Economic Freedom</h3>
                  <p className="mt-1 text-2xl font-serif font-bold text-primary">{edition.economicScore} <span className="text-xs font-normal text-muted-foreground">/ 100</span></p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    Evaluates secure property rights, business entry ease, AfCFTA trade openness, visa mobility, and digital growth.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t">
                  <Link href={getLink('/economic-freedom')} className="text-xs font-bold text-primary hover:text-accent inline-flex items-center gap-1">
                    Explore Economic Freedom <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>

              {/* Prosperity */}
              <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                      <TrendingUp className="size-5" />
                    </div>
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-600">34% Weight</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold">Prosperity</h3>
                  <p className="mt-1 text-2xl font-serif font-bold text-primary">{edition.prosperityScore} <span className="text-xs font-normal text-muted-foreground">/ 100</span></p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    Examines whether freedom translates into real outcomes: price stability, productive jobs, healthcare, and peace.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t">
                  <Link href={getLink('/prosperity')} className="text-xs font-bold text-primary hover:text-accent inline-flex items-center gap-1">
                    Explore Prosperity <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2026 SPECIAL THEMES (Only for 2026 Edition) */}
        {edition.specialThemes && edition.specialThemes.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="section-kicker">Special Themes · 2026 Report</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">Critical Dynamics Shaping Africa</h2>
              </div>
              <Link href={getLink('/findings')} className="text-sm font-semibold text-primary hover:text-accent">
                Read full thematic analysis <ArrowRight className="inline size-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {edition.specialThemes.map((theme) => {
                const Icon = theme.id === 'mobility' ? Plane : theme.id === 'digital' ? Smartphone : Users
                return (
                  <div key={theme.id} className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <Icon className="size-5" />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-accent">{theme.badge}</span>
                      </div>
                      <h3 className="mt-4 text-lg font-bold">{theme.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{theme.summary}</p>

                      <div className="mt-5 grid grid-cols-2 gap-2 border-t pt-4">
                        {theme.keyStats.slice(0, 2).map((s) => (
                          <div key={s.label} className="rounded-lg bg-muted/40 p-2.5">
                            <span className="text-[10px] text-muted-foreground block truncate">{s.label}</span>
                            <span className="text-lg font-bold font-serif text-primary">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* REGIONAL OVERVIEW BANNER */}
        <section className="border-t bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="section-kicker">Regional Breakdown</p>
                <h2 className="mt-2 text-3xl font-bold">Compare Africa’s Five Regions</h2>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                  Explore how institutional stability in Southern Africa contrasts with integration in West Africa and challenges in Central Africa.
                </p>
              </div>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
                <Link href={getLink('/regional-overview')}>
                  View Regional Overview <ArrowRight className="ml-1 size-4" />
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
