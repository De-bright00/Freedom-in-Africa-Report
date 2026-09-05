import type { Metadata } from 'next'
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
  Scale,
  Landmark,
  TrendingUp,
  Layers,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { DatasetExplorer } from '@/components/DatasetExplorer'
import {
  indicatorMetadata,
  measurementMethodology,
  datasetEditions,
} from '@/lib/dataset-data'

export const metadata: Metadata = {
  title: 'Country-Level Indicator Dataset (2025)',
  description:
    'Download and explore the 2025 Freedom in Africa Report country-level indicator dataset across 20 factors and 3 dimensions for all 54 African nations. Open-access PDF and CSV formats.',
}

export default function DatasetPage() {
  const currentEdition = datasetEditions[0]

  const politicalFactors = indicatorMetadata.filter(
    (i) => i.dimensionKey === 'political'
  )
  const economicFactors = indicatorMetadata.filter(
    (i) => i.dimensionKey === 'economic'
  )
  const prosperityFactors = indicatorMetadata.filter(
    (i) => i.dimensionKey === 'prosperity'
  )

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
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
            {/* Top kicker and Edition Badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-md bg-accent/20 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                F(in)AR Open Data Repository
              </span>
              <span className="flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-primary-foreground/80">
                <Calendar className="size-3 text-accent" />
                <span>2025 Edition · Page 33 Table</span>
              </span>
            </div>

            <div className="mt-4 max-w-4xl">
              <h1 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
                Country-Level Indicator Dataset
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-primary-foreground/75 md:text-lg">
                Extracted directly from the Liberalist Centre&rsquo;s{' '}
                <span className="font-semibold text-white">
                  Freedom in Africa Report (F(in)AR) 2025
                </span>{' '}
                report (page 33). This open dataset provides complete country-by-country
                scores across 20 distinct indicator factors (Columns A–T) and 3 core
                dimensions for all 54 African nations.
              </p>
            </div>

            {/* Edition Switcher Architecture (Multi-Year Ready) */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 p-1.5 backdrop-blur-sm">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground shadow-sm"
                >
                  <CheckCircle2 className="size-3.5" />
                  <span>2025 Edition (Current Update)</span>
                </button>
                <span className="px-2 text-xs text-primary-foreground/45">
                  Future editions will be published annually here
                </span>
              </div>
            </div>

            {/* Prominent Download Buttons */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              {/* Primary Download: Attached PDF */}
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg font-bold gap-2 text-sm"
              >
                <Link
                  href={currentEdition.pdfUrl}
                  download={currentEdition.pdfFileName}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="size-4" />
                  <span>Download 2025 Dataset (PDF)</span>
                </Link>
              </Button>

              {/* Secondary Download: Clean CSV */}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20 gap-2 text-sm font-semibold"
              >
                <Link
                  href={currentEdition.csvUrl}
                  download={currentEdition.csvFileName}
                >
                  <FileSpreadsheet className="size-4 text-emerald-400" />
                  <span>Download Raw Dataset (CSV)</span>
                </Link>
              </Button>

              {/* Full Report Link */}
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-primary-foreground/80 hover:bg-white/10 hover:text-white gap-2 text-sm"
              >
                <Link
                  href="/finar-2025-report.pdf"
                  download="F(in)AR_2025_Freedom_in_Africa_Report.pdf"
                  target="_blank"
                >
                  <FileText className="size-4" />
                  <span>Full Report PDF (16 MB)</span>
                </Link>
              </Button>
            </div>

            {/* Metric Highlights Bar */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-3xl">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-xs">
                <p className="font-mono text-2xl font-bold text-white">54</p>
                <p className="text-xs text-primary-foreground/60">African Nations</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-xs">
                <p className="font-mono text-2xl font-bold text-white">20</p>
                <p className="text-xs text-primary-foreground/60">Indicator Factors (A–T)</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-xs">
                <p className="font-mono text-2xl font-bold text-white">3</p>
                <p className="text-xs text-primary-foreground/60">Weighted Dimensions</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-xs">
                <p className="font-mono text-2xl font-bold text-white">0–100</p>
                <p className="text-xs text-primary-foreground/60">Harmonised Scale</p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Dataset Explorer Section */}
        <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="flex flex-col gap-2 pb-6">
            <div className="flex items-center gap-2">
              <Database className="size-5 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Explore Country Indicator Scores
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Filter by dimension or search for any African nation. Click any column header to sort. Hover over factor codes (A–T) to inspect the specific indicator description.
            </p>
          </div>

          <DatasetExplorer />
        </section>

        {/* Legend / What Each Factor (Column) Measures (From PDF Page 1) */}
        <section className="border-t bg-muted/25 py-14">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <span className="section-kicker">Factor Legend</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                What Each Factor (Column) Measures
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                The index harmonises 20 indicators grouped into three weighted pillars:
                <strong className="text-foreground"> Political Freedom (33%)</strong>,
                <strong className="text-foreground"> Economic Freedom (33%)</strong>, and
                <strong className="text-foreground"> Prosperity (34%)</strong>.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {/* Political Freedom Card */}
              <Card className="border-l-4 border-l-blue-600 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Scale className="size-4 text-blue-600" />
                      <CardTitle className="text-lg">Political Freedom</CardTitle>
                    </div>
                    <Badge variant="secondary" className="font-mono text-xs">
                      Weight: 33%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Columns A through F · 6 Indicators</p>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  {politicalFactors.map((f) => (
                    <div
                      key={f.code}
                      className="rounded-lg border bg-background/50 p-2.5 transition-colors hover:border-blue-400"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-blue-100 font-mono text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                          {f.code}
                        </span>
                        <p className="text-xs font-semibold text-foreground leading-tight">
                          {f.label}
                        </p>
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground leading-snug">
                        {f.fullName}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Economic Freedom Card */}
              <Card className="border-l-4 border-l-emerald-600 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Landmark className="size-4 text-emerald-600" />
                      <CardTitle className="text-lg">Economic Freedom</CardTitle>
                    </div>
                    <Badge variant="secondary" className="font-mono text-xs">
                      Weight: 33%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Columns G through M · 7 Indicators</p>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  {economicFactors.map((f) => (
                    <div
                      key={f.code}
                      className="rounded-lg border bg-background/50 p-2.5 transition-colors hover:border-emerald-400"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-emerald-100 font-mono text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {f.code}
                        </span>
                        <p className="text-xs font-semibold text-foreground leading-tight">
                          {f.label}
                        </p>
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground leading-snug">
                        {f.fullName}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Prosperity Card */}
              <Card className="border-l-4 border-l-amber-600 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="size-4 text-amber-600" />
                      <CardTitle className="text-lg">Prosperity</CardTitle>
                    </div>
                    <Badge variant="secondary" className="font-mono text-xs">
                      Weight: 34%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Columns N through T · 7 Indicators</p>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  {prosperityFactors.map((f) => (
                    <div
                      key={f.code}
                      className="rounded-lg border bg-background/50 p-2.5 transition-colors hover:border-amber-400"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-amber-100 font-mono text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                          {f.code}
                        </span>
                        <p className="text-xs font-semibold text-foreground leading-tight">
                          {f.label}
                        </p>
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground leading-snug">
                        {f.fullName}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Methodology & Measurement Standards (From PDF Page 4) */}
        <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="max-w-3xl">
            <span className="section-kicker">Data Standards</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              How the Factors Are Measured
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Technical rules and mathematical harmonisation protocols used in the F(in)AR 2025 calculation.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {measurementMethodology.map((item) => (
              <div
                key={item.factor}
                className="flex flex-col justify-between rounded-xl border bg-card p-5 shadow-xs transition-shadow hover:shadow-md"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-primary" />
                    <h3 className="text-sm font-bold text-foreground">{item.factor}</h3>
                  </div>
                  <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                    {item.method}
                  </p>
                </div>
              </div>
            ))}

            {/* Special Note Card */}
            <div className="flex flex-col justify-between rounded-xl border border-amber-300/50 bg-amber-50/50 p-5 dark:border-amber-900/50 dark:bg-amber-950/20 sm:col-span-2 lg:col-span-3">
              <div className="flex items-start gap-3">
                <Info className="size-5 shrink-0 text-amber-600" />
                <div>
                  <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">
                    Source Note on Somalia Taxation Data
                  </h4>
                  <p className="mt-1 text-xs text-amber-800/80 dark:text-amber-300/80">
                    Somalia&rsquo;s Taxation burden (Factor K) value is recorded as N/A in the source report due to the absence of unified nationwide tax administrative data. In our calculation, the Economic Freedom average for Somalia is computed over the remaining 6 reporting indicators. All other values are transcribed directly from the F(in)AR 2025 dataset table.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Citation & Attribution Section */}
        <section className="border-t bg-muted/30 py-12">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div>
                <span className="section-kicker">Attribution &amp; Citation</span>
                <h3 className="mt-2 text-xl font-bold text-foreground">
                  Using this Dataset for Research
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  The Freedom in Africa Report dataset is published under open academic guidelines by the Liberalist Centre. Researchers, universities, and media outlets may freely reproduce, cite, and analyze the data with appropriate citation.
                </p>
                <div className="mt-5 flex gap-3">
                  <Button asChild size="sm" className="bg-primary text-primary-foreground">
                    <Link href="/methodology">
                      Read Full Methodology <ArrowRight className="ml-1.5 size-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Pre-formatted citation card */}
              <div className="rounded-xl border bg-card p-4 shadow-xs font-mono text-xs">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  Suggested Citation (APA)
                </p>
                <p className="bg-muted/60 p-3 rounded-lg text-foreground select-all leading-relaxed">
                  Liberalist Centre. (2025). <em>Freedom in Africa Report 2025: Country-Level Indicator Dataset (20 Factors, 54 Nations)</em>. Liberalist Publications. https://theliberalist.org/dataset
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
