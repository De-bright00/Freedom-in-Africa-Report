import Link from 'next/link'
import { ArrowRight, BarChart3, Download, Landmark, MapPinned, ScaleIcon, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ScoreBadge } from '@/components/ui/ScoreBadge'
import { currentReport, dimensions, getTopCountries, globalComparison, regions } from '@/lib/data'
import { GlobalComparisonChart, RegionalChart } from '@/components/charts/RegionalChart'

const exploreItems = [
  { icon: ScaleIcon, title: 'Political Freedom', text: 'Electoral integrity, expression, and judicial independence.', href: '/political-freedom' },
  { icon: Landmark, title: 'Economic Freedom', text: 'Property rights, trade openness, and business regulation.', href: '/economic-freedom' },
  { icon: TrendingUp, title: 'Prosperity', text: 'Income, education, healthcare, and peace outcomes.', href: '/prosperity' },
  { icon: MapPinned, title: 'Regional Overview', text: 'Compare Africa’s five regions side by side.', href: '/regional-overview' },
  { icon: BarChart3, title: 'Methodology', text: 'How 54 countries are scored across nine data sources.', href: '/methodology' },
]

export default function HomePage() {
  const topCountries = getTopCountries().slice(0, 5)

  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'linear-gradient(135deg, transparent 45%, white 45%, white 46%, transparent 46%), linear-gradient(45deg, transparent 45%, white 45%, white 46%, transparent 46%)', backgroundSize: '64px 64px' }}
          />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
            <div>
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-liberalist-coral">F(in)AR 2025</p>
              <h1 className="max-w-3xl text-balance text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">Measuring Political Freedom, Economic Freedom &amp; Prosperity in Africa</h1>
              <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-primary-foreground/70">
                The Freedom in Africa Report scores 54 nations on the conditions that let people vote, trade, work, and build a better life — combined into one comparable index.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href={currentReport.pdfUrl} download="F(in)AR_2025_Freedom_in_Africa_Report.pdf" target="_blank" rel="noopener noreferrer">
                    <Download data-icon="inline-start" /> Download F(in)AR 2025
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link href="/findings">
                    Explore the findings <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="mx-auto max-w-[340px] rotate-3 shadow-2xl overflow-hidden rounded-lg border border-white/10">
                <img
                  src="/finar-2025-cover.png"
                  alt="Freedom in Africa Report 2025 Cover"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y bg-muted/35">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="section-kicker">Africa&apos;s overall score</p>
                <p className="mt-3 font-serif text-6xl font-bold tracking-tight text-primary">{currentReport.overallScore}</p>
                <p className="mt-1 text-sm text-muted-foreground">out of 100 · 2025 edition</p>
                <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
                  Africa trails North America, Europe, and East Asia, but sits ahead of Southern &amp; Central Asia on the same composite measure.
                </p>
              </div>
              <div>
                <GlobalComparisonChart data={globalComparison} />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker">At a glance</p>
              <h2 className="mt-2 text-2xl font-bold">The continental leaderboard</h2>
            </div>
            <Link href="/findings" className="hidden text-sm font-semibold text-primary hover:text-accent sm:block">
              Full rankings <ArrowRight className="ml-1 inline size-4" />
            </Link>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {topCountries.map((country) => (
              <div key={country.id} className="flex items-center justify-between rounded-lg border bg-background p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flagEmoji}</span>
                  <div>
                    <p className="font-semibold">{country.name}</p>
                    <p className="text-xs text-muted-foreground">Rank #{country.rank}</p>
                  </div>
                </div>
                <ScoreBadge score={country.score} size="sm" />
              </div>
            ))}
          </div>
        </section>

        <section className="border-y bg-muted/35">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <p className="section-kicker">Regional breakdown</p>
            <h2 className="mt-3 text-3xl font-bold">Freedom by region</h2>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <RegionalChart regions={regions} />
              <div className="grid gap-3 sm:grid-cols-2">
                {regions.map((region) => (
                  <div key={region.name} className="rounded-lg border bg-background p-4">
                    <p className="font-semibold">{region.name} Africa</p>
                    <p className="mt-1 font-serif text-2xl font-bold text-primary">{region.avgScore}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{region.standing}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="section-kicker">Go deeper</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Three dimensions, one score</h2>
            <p className="mt-4 text-muted-foreground">
              Every country is scored on Political Freedom ({dimensions[0].weight}%), Economic Freedom ({dimensions[1].weight}%), and Prosperity ({dimensions[2].weight}%).
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {exploreItems.map(({ icon: Icon, title, text, href }) => (
              <Link key={title} href={href} className="group rounded-lg border bg-card p-5 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg">
                <span className="flex size-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                <ArrowRight className="mt-5 size-4 text-accent transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-accent text-accent-foreground">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground/70">Research updates</p>
              <h2 className="mt-2 text-3xl font-bold">Get the full report and future editions.</h2>
              <p className="mt-2 text-accent-foreground/75">Download the 2025 edition or subscribe for future research from Liberalist Centre.</p>
            </div>
            <Button asChild className="w-fit bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href={currentReport.pdfUrl} download="F(in)AR_2025_Freedom_in_Africa_Report.pdf" target="_blank" rel="noopener noreferrer">
                <Download data-icon="inline-start" /> Download the Report
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
