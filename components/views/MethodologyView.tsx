'use client'

import Link from 'next/link'
import { ArrowRight, Check, Info, FileSpreadsheet, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { DimensionWeightChart } from '@/components/charts/DimensionWeightChart'
import { dataSources, dimensions } from '@/lib/data'
import { EditionYear } from '@/lib/editions/types'
import { getEditionConfig } from '@/lib/editions'

interface MethodologyViewProps {
  year?: EditionYear
}

export function MethodologyView({ year = '2026' }: MethodologyViewProps) {
  const edition = getEditionConfig(year)
  const getLink = (path: string) => (year === '2025' ? `/2025${path}` : path)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* HERO */}
        <section className="bg-primary text-primary-foreground relative overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <span className="section-kicker-invert">Rigorous Evidence &amp; Scoring Framework · {year}</span>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">Methodology</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/75">
              The Freedom in Africa Report (F(in)AR {year}) provides a comparative assessment of conditions across all 54 African countries
              by examining three broad areas: Political Freedom (33%), Economic Freedom (33%), and Prosperity (34%).
            </p>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[220px_1fr] lg:px-8">
          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-3 border-l-2 border-border pl-5 text-sm">
              <a href="#overview" className="font-semibold text-primary">Overview &amp; purpose</a>
              <a href="#framework" className="text-muted-foreground hover:text-primary">Scoring framework</a>
              <a href="#formula" className="text-muted-foreground hover:text-primary">Calculation formula</a>
              <a href="#scale" className="text-muted-foreground hover:text-primary">Score interpretation</a>
              <a href="#sources" className="text-muted-foreground hover:text-primary">Data sources</a>
              <a href="#limits" className="text-muted-foreground hover:text-primary">Limitations</a>
            </div>
          </aside>

          <article className="max-w-3xl">
            <section id="overview">
              <p className="section-kicker">01 · Overview</p>
              <h2 className="mt-3 text-3xl font-bold">Why measure freedom and prosperity together?</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                Freedom in Africa is not an abstract concept. It is experienced at the ballot box, in the local market, and when seeking healthcare or schooling. F(in)AR turns these daily realities into an objective, annual measure of whether citizens can participate in public life, trade freely, and build prosperous livelihoods.
              </p>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                F(in)AR is based entirely on secondary data from established international and African sources. Rather than generating subjective surveys, F(in)AR standardizes publicly available data across 20 distinct indicator factors onto a uniform 0–10 scale.
              </p>
            </section>

            <section id="framework" className="mt-14">
              <p className="section-kicker">02 · Scoring framework</p>
              <h2 className="mt-3 text-3xl font-bold">Three weighted dimensions</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                To ensure that the overall index reflects all components of liberty and living conditions, the dimensions receive approximately equal weighting:
              </p>
              <div className="mt-8 grid gap-8 sm:grid-cols-[220px_1fr] sm:items-center">
                <DimensionWeightChart dimensions={dimensions} />
                <div className="flex flex-col gap-3">
                  {dimensions.map((dimension) => (
                    <div key={dimension.id} className="flex items-center justify-between rounded-lg border bg-card px-4 py-3">
                      <span className="font-semibold text-foreground">{dimension.name}</span>
                      <span className="font-serif text-xl font-bold text-primary">{dimension.weight}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="formula" className="mt-14">
              <p className="section-kicker">03 · Aggregation formula</p>
              <h2 className="mt-3 text-3xl font-bold">Mathematical specification</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                Each country&rsquo;s score for a dimension is calculated as the average of the indicators within that dimension (on a 0–10 subscale). The overall composite score is then derived using the official formula:
              </p>
              <div className="mt-6 rounded-xl border border-accent/20 bg-muted/40 p-5 font-mono text-sm leading-relaxed text-foreground">
                Overall Score (0–100) = ((POL × 0.33) + (ECO × 0.33) + (PRO × 0.34)) × 10
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Where POL = Political Freedom average (/10), ECO = Economic Freedom average (/10), and PRO = Prosperity average (/10).
              </p>
            </section>

            <section id="scale" className="mt-14">
              <p className="section-kicker">04 · Score interpretation</p>
              <h2 className="mt-3 text-3xl font-bold">Canonical score legend</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                The Freedom in Africa Report applies a single, consistent three-tier classification across all editions:
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-emerald-500" />
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">High (≥ 65)</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Strong democratic institutions, competitive markets, secure property rights, and high standard of living.
                  </p>
                </div>

                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-amber-500" />
                    <span className="font-bold text-amber-600 dark:text-amber-400">Moderate (45–64)</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Meaningful legal or economic freedoms accompanied by persistent governance constraints or fragile living conditions.
                  </p>
                </div>

                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-rose-500" />
                    <span className="font-bold text-rose-600 dark:text-rose-400">Low (&lt; 45)</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Severe political repression, heavy economic restrictions, protracted conflict, or institutional breakdown.
                  </p>
                </div>
              </div>
            </section>

            <section id="sources" className="mt-14">
              <p className="section-kicker">05 · International data sources</p>
              <h2 className="mt-3 text-3xl font-bold">Secondary datasets harmonized</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                F(in)AR standardizes raw indicators from recognized global and African policy organisations:
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {dataSources.map((source) => (
                  <li key={source} className="flex items-center gap-3 rounded-lg border bg-card p-3 text-sm">
                    <Check className="size-4 shrink-0 text-accent" />
                    <span className="font-medium text-foreground">{source}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="limits" className="mt-14">
              <p className="section-kicker">06 · Interpretation &amp; limitations</p>
              <h2 className="mt-3 text-3xl font-bold">Understanding index boundaries</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                F(in)AR is intended to provide a comparative view of freedom and prosperity rather than a final verdict on every condition within a country. Results should be understood as index-based comparative measures. Where published data is absent for an indicator, it is marked as <code className="text-xs bg-muted px-1.5 py-0.5 rounded">n/a</code> and never treated as zero.
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
