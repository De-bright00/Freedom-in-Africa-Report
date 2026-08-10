import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'

const pillars = ['Individual Freedom', 'Limited Government', 'Free Markets', 'Rational Discourse']

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <p className="section-kicker-invert">About Liberalist Centre</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">A Policy &amp; Research Think Tank for a Freer Africa.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-primary-foreground/70">
              Liberalist Centre is an African policy and research think tank dedicated to measuring and advancing political freedom, economic freedom, and prosperity — with evidence, rigor, and intellectual honesty.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <p className="section-kicker">Our mission</p>
            <h2 className="mt-3 text-3xl font-bold">Make freedom measurable.</h2>
            <div className="mt-6 flex flex-col gap-5 text-base leading-8 text-muted-foreground">
              <p>
                Liberalist Centre researches the institutions and policies shaping Africa&apos;s future. Our flagship publication, the Freedom in Africa Report (F(in)AR), combines political freedom, economic freedom, and prosperity into one transparent, comparable score for 54 nations.
              </p>
              <p>
                We believe policy is strongest when it is grounded in evidence. Our research turns difficult questions into clear, comparable data — for policymakers, researchers, and citizens who want to understand what is actually driving freedom and prosperity across the continent.
              </p>
            </div>
          </div>
          <Card className="h-fit bg-muted/40">
            <CardContent className="p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Our guiding principles</p>
              <ul className="mt-6 flex flex-col gap-4">
                {pillars.map((pillar) => (
                  <li key={pillar} className="flex items-center gap-3 border-b pb-4 text-lg font-semibold last:border-0 last:pb-0">
                    <Check className="size-5 text-accent" />
                    {pillar}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="border-y bg-muted/30">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <p className="section-kicker">Support &amp; partnerships</p>
            <h2 className="mt-3 text-3xl font-bold">Working alongside the wider liberty movement.</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <p className="font-bold">Atlas Network</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">Liberalist Centre gratefully acknowledges Atlas Network as a support partner for the Freedom in Africa Report.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="font-bold">theliberalist.org</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">Our sister media outlet reports independently on the ideas and institutions shaping a freer Africa.</p>
                  <Link href="https://theliberalist.org" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-sm font-semibold text-primary hover:text-accent">
                    Visit theliberalist.org <ArrowUpRight className="ml-1 inline size-3" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="section-kicker">Get in touch</p>
            <h2 className="mt-3 text-3xl font-bold">Questions about the research?</h2>
            <p className="mt-4 text-muted-foreground">Reach our research team directly for methodology questions, data requests, or media inquiries.</p>
            <a href="mailto:hello@liberalistcentre.org?subject=Freedom%20in%20Africa%20Report" className="mt-6 inline-flex font-semibold text-primary hover:text-accent">
              Get in touch <ArrowUpRight className="ml-1 inline size-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
