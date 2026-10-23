'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Download,
  Info,
  Globe2,
  ScaleIcon,
  Landmark,
  TrendingUp,
  Plane,
  Smartphone,
  Users,
  CheckCircle2,
  Share2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { GlobalComparisonChart } from '@/components/charts/RegionalChart'
import { RankingsDashboard } from '@/components/RankingsDashboard'
import { EditionYear } from '@/lib/editions/types'
import { getEditionConfig } from '@/lib/editions'

interface FindingsViewProps {
  year?: EditionYear
}

export function FindingsView({ year = '2026' }: FindingsViewProps) {
  const edition = getEditionConfig(year)
  const getLink = (path: string) => (year === '2025' ? `/2025${path}` : path)

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
              <div className="flex items-center gap-2 mb-3">
                <span className="section-kicker-invert">Findings · {edition.editionTag}</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl text-balance">
                The State of Freedom in Africa ({year})
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-primary-foreground/75">
                {edition.headlineSummary}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-md">
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
                  <Link href="#rankings">
                    Jump to rankings <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="text-liberalist-coral hover:bg-white/10">
                  <Link href={getLink('/compare-years')}>
                    ⚡ Compare 2025 vs 2026
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* KEY FINDINGS STATS */}
        <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <p className="section-kicker">Key Metrics</p>
          <h2 className="mt-2 text-2xl font-bold">Continental Score Indicators</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {edition.stats.map((stat) => (
              <Card key={stat.label} className="border bg-card shadow-sm">
                <CardContent className="p-6">
                  <p className="font-serif text-4xl font-bold tracking-tight text-primary">{stat.value}</p>
                  <p className="mt-3 font-semibold text-foreground">{stat.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* GLOBAL CONTEXT */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <p className="section-kicker">Global Context</p>
            <h2 className="mt-2 text-3xl font-bold">How Africa Compares Globally</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Comparative freedom &amp; prosperity index across world regions, evaluating human liberty, opportunity, and quality of life.
            </p>
            <div className="mt-8">
              <GlobalComparisonChart data={edition.globalComparison} />
            </div>
          </div>
        </section>

        {/* RANKINGS DASHBOARD */}
        <section id="rankings" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker">Continental Rankings</p>
              <h2 className="mt-2 text-3xl font-bold">54-Country Leaderboard &amp; Comparison ({year})</h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                All 54 African countries scored across Political Freedom (33%), Economic Freedom (33%), and Prosperity (34%). Select 2 or more countries to compare parameters.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm">
                <Link href={getLink('/methodology')}>
                  Read methodology <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <RankingsDashboard year={year} />
          </div>
        </section>

        {/* 2026 THEMATIC DEEP DIVE (If available) */}
        {edition.specialThemes && edition.specialThemes.length > 0 && (
          <section className="border-t bg-muted/20 py-16">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <div className="max-w-3xl">
                <p className="section-kicker">Special Thematic Analysis</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">Key Forces Defining African Freedom in 2026</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Drawn directly from the 2026 report, exploring the clash between technological opportunity and state suppression across the continent.
                </p>
              </div>

              <div className="mt-12 flex flex-col gap-10">
                {edition.specialThemes.map((theme) => {
                  const Icon = theme.id === 'mobility' ? Plane : theme.id === 'digital' ? Smartphone : Users
                  return (
                    <Card key={theme.id} className="overflow-hidden border shadow-sm">
                      <CardHeader className="bg-muted/40 border-b pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="size-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                              <Icon className="size-4" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-accent">{theme.badge}</span>
                          </div>
                        </div>
                        <CardTitle className="mt-2 text-2xl font-bold">{theme.title}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed max-w-3xl">{theme.summary}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_1.8fr]">
                          {/* Stats Grid */}
                          <div className="grid grid-cols-2 gap-3 h-fit">
                            {theme.keyStats.map((stat) => (
                              <div key={stat.label} className="rounded-xl border bg-card p-4">
                                <span className="text-xs text-muted-foreground block truncate">{stat.label}</span>
                                <span className="font-serif text-2xl font-bold text-primary mt-1 block">{stat.value}</span>
                              </div>
                            ))}
                          </div>

                          {/* Key Insights List */}
                          <div className="flex flex-col gap-3">
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Report Insights</p>
                            <ul className="flex flex-col gap-2.5">
                              {theme.findings.map((f, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                                  <CheckCircle2 className="size-4 shrink-0 text-accent mt-0.5" />
                                  <span>{f}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* CROSS-COUNTRY COMPARISONS (If available) */}
        {edition.crossCountryComparisons && edition.crossCountryComparisons.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <p className="section-kicker">Comparative Insights</p>
            <h2 className="mt-2 text-3xl font-bold">Cross-Country Case Studies</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              How different political, institutional, and social choices produce widely divergent developmental outcomes.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {edition.crossCountryComparisons.map((comp) => (
                <Card key={comp.title} className="border shadow-sm flex flex-col justify-between">
                  <CardHeader className="bg-muted/30 border-b pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold">{comp.title}</CardTitle>
                      <div className="flex items-center gap-2 text-xs font-bold">
                        <span className="text-accent">{comp.countryA}: {comp.scoreA}</span>
                        <span className="text-muted-foreground">vs</span>
                        <span className="text-primary">{comp.countryB}: {comp.scoreB}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{comp.analysis}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* CITATION & REPRODUCIBILITY CARD */}
        <section className="border-t bg-muted/40 py-12">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-accent">Citation &amp; Open Access</p>
                <h3 className="mt-1 text-xl font-bold">Cite the Freedom in Africa Report</h3>
                <p className="mt-2 text-xs text-muted-foreground max-w-2xl">
                  Liberalist Centre (2026). <span className="font-semibold italic">Freedom in Africa Report (F(in)AR) {year} Edition</span>. Publisher: Liberalist Centre. Available online at:{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-foreground font-mono">
                    https://freedominafrica.liberalistcentre.org
                  </code>
                </p>
              </div>
              <Button asChild variant="outline" size="sm" className="shrink-0 gap-1.5 font-semibold">
                <Link href={getLink('/dataset')}>
                  Access Raw Datasets <ArrowRight className="size-3.5" />
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
