'use client'

import Link from 'next/link'
import {
  Download,
  FileSpreadsheet,
  FileText,
  Calendar,
  Database,
  CheckCircle2,
  ExternalLink,
  Info,
  ScaleIcon,
  Landmark,
  TrendingUp,
  Layers,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { DatasetExplorer } from '@/components/DatasetExplorer'
import {
  indicatorMetadata,
  measurementMethodology,
  datasetEditions,
} from '@/lib/dataset-data'
import { EditionYear } from '@/lib/editions/types'
import { getEditionConfig } from '@/lib/editions'

interface DatasetViewProps {
  year?: EditionYear
}

export function DatasetView({ year = '2026' }: DatasetViewProps) {
  const edition = getEditionConfig(year)
  const currentEdition = datasetEditions.find((e) => e.year === Number(year)) || datasetEditions[0]

  const politicalFactors = indicatorMetadata.filter((i) => i.dimensionKey === 'political')
  const economicFactors = indicatorMetadata.filter((i) => i.dimensionKey === 'economic')
  const prosperityFactors = indicatorMetadata.filter((i) => i.dimensionKey === 'prosperity')

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
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

          <div className="relative mx-auto max-w-7xl px-5 pt-8 pb-14 md:pt-12 md:pb-20 lg:px-8">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-md bg-accent/20 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                F(in)AR Open Data Repository
              </span>
              <span className="flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-primary-foreground/80">
                <Calendar className="size-3 text-accent" />
                <span>{year} Edition · Full Country Indicator Dataset</span>
              </span>
            </div>

            <div className="mt-4 max-w-4xl">
              <h1 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
                Country-Level Indicator Dataset ({year})
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-primary-foreground/75 md:text-lg">
                Extracted directly from the Liberalist Centre&rsquo;s{' '}
                <span className="font-semibold text-white">
                  Freedom in Africa Report (F(in)AR) {year}
                </span>. This open dataset provides standardized country-by-country scores across 20 distinct indicator factors (Columns A–T) and 3 core dimensions for all 54 African nations.
              </p>
            </div>

            {/* Prominent Download Buttons */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg font-bold gap-2 text-sm"
              >
                <Link
                  href={currentEdition.csvUrl}
                  download={currentEdition.csvFileName}
                >
                  <FileSpreadsheet className="size-4" />
                  <span>Download {year} Dataset (CSV)</span>
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20 gap-2 text-sm font-semibold"
              >
                <Link
                  href={currentEdition.pdfUrl}
                  download={currentEdition.pdfFileName}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="size-4 text-accent" />
                  <span>Download Report (PDF)</span>
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-primary-foreground/80 hover:bg-white/10 hover:text-white gap-2 text-sm"
              >
                <Link href="/compare-years">
                  <span>⚡ Compare 2025 vs 2026</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* INTERACTIVE DATASET EXPLORER */}
        <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end mb-6">
            <div>
              <p className="section-kicker">Data Explorer</p>
              <h2 className="mt-1 text-2xl font-bold">Interactive Country Indicator Table</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Scores normalized on a 0–10 scale. Use tabs to filter by dimension or click &ldquo;Compare with {year === '2026' ? '2025' : '2026'}&rdquo; to inspect year-on-year movement.
              </p>
            </div>
          </div>

          <DatasetExplorer initialYear={year} />
        </section>

        {/* FACTOR LEGEND / WHAT EACH FACTOR (COLUMN) MEASURES (PREMIUM DARK AESTHETIC) */}
        <section className="border-t border-white/10 bg-[#0a0f1d] text-white py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <span className="section-kicker-invert">FACTOR LEGEND</span>
              <h2 className="mt-2 text-3xl font-bold font-serif text-white sm:text-4xl">
                What Each Factor (Column) Measures
              </h2>
              <p className="mt-3 text-sm text-slate-300/80 leading-relaxed">
                The index harmonises 20 indicators grouped into three weighted pillars:{' '}
                <strong className="text-white">Political Freedom (33%)</strong>,{' '}
                <strong className="text-white">Economic Freedom (33%)</strong>, and{' '}
                <strong className="text-white">Prosperity (34%)</strong>.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {/* Pillar 1: Political Freedom Card */}
              <div className="rounded-2xl border border-blue-500/30 bg-[#0f172a] p-5 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <ScaleIcon className="size-4 text-blue-400" />
                      <h3 className="text-base font-bold text-white">Political Freedom</h3>
                    </div>
                    <span className="rounded-md bg-white/10 px-2.5 py-0.5 text-xs font-mono font-bold text-white/90 border border-white/10">
                      Weight: 33%
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">Columns A through F · 6 Indicators</p>

                  <div className="mt-4 flex flex-col gap-2.5">
                    {politicalFactors.map((f) => (
                      <div
                        key={f.code}
                        className="rounded-xl border border-white/5 bg-[#162032] p-3 transition-colors hover:border-blue-500/40"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-white text-slate-950 font-mono text-xs font-bold shadow-sm">
                            {f.code}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                            {f.label}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[11px] text-slate-400 leading-snug pl-8">
                          {f.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pillar 2: Economic Freedom Card */}
              <div className="rounded-2xl border border-emerald-500/30 bg-[#0f172a] p-5 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Landmark className="size-4 text-emerald-400" />
                      <h3 className="text-base font-bold text-white">Economic Freedom</h3>
                    </div>
                    <span className="rounded-md bg-white/10 px-2.5 py-0.5 text-xs font-mono font-bold text-white/90 border border-white/10">
                      Weight: 33%
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">Columns G through M · 7 Indicators</p>

                  <div className="mt-4 flex flex-col gap-2.5">
                    {economicFactors.map((f) => (
                      <div
                        key={f.code}
                        className="rounded-xl border border-white/5 bg-[#162032] p-3 transition-colors hover:border-emerald-500/40"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 font-mono text-xs font-bold shadow-sm">
                            {f.code}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                            {f.label}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[11px] text-slate-400 leading-snug pl-8">
                          {f.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pillar 3: Prosperity Card */}
              <div className="rounded-2xl border border-amber-500/30 bg-[#0f172a] p-5 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="size-4 text-amber-400" />
                      <h3 className="text-base font-bold text-white">Prosperity</h3>
                    </div>
                    <span className="rounded-md bg-white/10 px-2.5 py-0.5 text-xs font-mono font-bold text-white/90 border border-white/10">
                      Weight: 34%
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">Columns N through T · 7 Indicators</p>

                  <div className="mt-4 flex flex-col gap-2.5">
                    {prosperityFactors.map((f) => (
                      <div
                        key={f.code}
                        className="rounded-xl border border-white/5 bg-[#162032] p-3 transition-colors hover:border-amber-500/40"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-amber-500/25 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold shadow-sm">
                              {f.code}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                              {f.label}
                            </span>
                          </div>
                          {f.nonComparableNote && (
                            <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-300 border border-amber-500/30">
                              Non-comparable
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-[11px] text-slate-400 leading-snug pl-8">
                          {f.description}
                        </p>
                        {f.nonComparableNote && (
                          <p className="mt-1 text-[10px] text-amber-300/80 italic pl-8 leading-snug">
                            {f.nonComparableNote}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DATA STANDARDS: HOW THE FACTORS ARE MEASURED (PREMIUM DARK AESTHETIC) */}
        <section className="border-t border-white/10 bg-[#070b14] text-white py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <span className="section-kicker-invert">DATA STANDARDS</span>
              <h2 className="mt-2 text-2xl font-bold font-serif text-white sm:text-3xl">
                How the Factors Are Measured
              </h2>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Technical rules and mathematical harmonisation protocols used in the F(in)AR {year} calculation.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {measurementMethodology.map((m) => (
                <div
                  key={m.factor}
                  className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0f172a] p-5 shadow-sm transition-all hover:border-white/25"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-liberalist-coral" />
                      <h3 className="text-sm font-bold text-white">{m.factor}</h3>
                    </div>
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-300/85">{m.method}</p>
                  </div>
                </div>
              ))}

              {/* Special Note Card on Somalia Taxation */}
              <div className="flex flex-col justify-between rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 sm:col-span-2 lg:col-span-3">
                <div className="flex items-start gap-3">
                  <Info className="size-5 shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Source Note on Somalia Taxation Data
                    </h4>
                    <p className="mt-1 text-xs text-amber-200/80 leading-relaxed">
                      Somalia&rsquo;s Taxation burden (Factor K) value is recorded as N/A in the source report due to the absence of unified nationwide tax administrative data. In our calculation, the Economic Freedom average for Somalia is computed over the remaining 6 reporting indicators. All other values are transcribed directly from the F(in)AR master dataset.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CITATION & REPRODUCIBILITY CARD (PREMIUM DARK AESTHETIC) */}
        <section className="border-t border-white/10 bg-[#0a0f1d] text-white py-12">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="rounded-xl border border-white/15 bg-[#0f172a] p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-liberalist-coral">Citation &amp; Open Access</p>
                <h3 className="mt-1 text-xl font-bold text-white">How to Cite This Dataset</h3>
                <p className="mt-2 text-xs text-slate-300/80 max-w-2xl leading-relaxed">
                  Liberalist Centre ({year}). <span className="font-semibold italic text-white">Freedom in Africa Report {year}: Country-Level Indicator Dataset (20 Factors, 54 Nations)</span>. Publisher: Liberalist Centre. Available online at:{' '}
                  <code className="rounded bg-white/10 border border-white/15 px-2 py-0.5 text-accent font-mono text-xs">
                    https://freedominafrica.liberalistcentre.org/dataset
                  </code>
                </p>
              </div>
              <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0 font-semibold gap-1.5 shadow-md">
                <Link href={currentEdition.csvUrl} download={currentEdition.csvFileName}>
                  <Download className="size-3.5" /> Download Full CSV
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
