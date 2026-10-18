'use client'

import Link from 'next/link'
import { ArrowUpRight, Check, Mail, Users, Award, ShieldCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { EditionYear } from '@/lib/editions/types'

const pillars = [
  'Individual Freedom & Human Dignity',
  'Constitutional Rule of Law & Limited State Power',
  'Free Markets, Property Rights & AfCFTA Trade',
  'Transparent, Evidence-Based Research & Discourse',
]

const projectTeam = [
  {
    role: 'Executive Director & Editor',
    name: 'Abdullah Tijani',
    email: 'abdullah@liberalistcentre.org',
  },
  {
    role: 'Program Manager',
    name: 'Eric Mobu',
    email: 'eric@liberalistcentre.org',
  },
]

export function AboutView({ year = '2026' }: { year?: EditionYear }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* HERO */}
        <section className="bg-primary text-primary-foreground relative overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <span className="section-kicker-invert">About Liberalist Centre · {year}</span>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              An African Policy &amp; Research Think Tank for Human Liberty.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-primary-foreground/75">
              The Liberalist Centre is an independent African research organization dedicated to measuring and advancing
              political rights, economic opportunities, and shared prosperity across the continent with empirical rigor.
            </p>
          </div>
        </section>

        {/* MISSION & GUIDING PRINCIPLES */}
        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <p className="section-kicker">Our mission</p>
            <h2 className="mt-3 text-3xl font-bold">Making Freedom Measurable in Africa</h2>
            <div className="mt-6 flex flex-col gap-5 text-base leading-8 text-muted-foreground">
              <p>
                The Freedom in Africa Report (F(in)AR) is the flagship annual research initiative of the Liberalist Centre.
                While international indices provide valuable information, they do not always capture the distinct political,
                institutional, and developmental realities found across African countries.
              </p>
              <p>
                F(in)AR brings together evidence on democratic participation, market barriers, and living conditions into one
                harmonized, comparable index for all 54 nations. Our goal is to empower policymakers, scholars, journalists,
                and African citizens with actionable evidence to track democratic progress, expose setbacks, and champion reform.
              </p>
            </div>
          </div>
          <Card className="h-fit bg-muted/40 border">
            <CardContent className="p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Our core principles</p>
              <ul className="mt-6 flex flex-col gap-4">
                {pillars.map((pillar) => (
                  <li key={pillar} className="flex items-center gap-3 border-b pb-4 text-sm font-semibold last:border-0 last:pb-0 text-foreground">
                    <Check className="size-5 shrink-0 text-accent" />
                    <span>{pillar}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* PROJECT TEAM */}
        <section className="border-t bg-muted/20 py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="section-kicker">Report Leadership</p>
            <h2 className="mt-1 text-3xl font-bold">F(in)AR Project Team</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The researchers, analysts, and coordinators behind the Freedom in Africa Report.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 max-w-3xl">
              {projectTeam.map((member) => (
                <Card key={member.name} className="border shadow-sm">
                  <CardContent className="p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">{member.role}</span>
                    <h3 className="mt-2 text-lg font-bold text-foreground">{member.name}</h3>
                    <a
                      href={`mailto:${member.email}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent font-mono transition-colors"
                    >
                      <Mail className="size-3.5" />
                      <span>{member.email}</span>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SUPPORT & PARTNERS */}
        <section className="border-y bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="section-kicker">Support &amp; Global Network</p>
            <h2 className="mt-2 text-3xl font-bold">Institutional Independence</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Card className="border">
                <CardContent className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">Support Partner</span>
                  <p className="text-lg font-bold text-foreground mt-1">Atlas Network</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    The Liberalist Centre gratefully recognizes the support of Atlas Network in strengthening the organization’s
                    institutional and operational capacity. The findings, analysis, and conclusions presented in F(in)AR remain
                    the sole responsibility of the Liberalist Centre, which maintains full editorial independence.
                  </p>
                </CardContent>
              </Card>

              <Card className="border">
                <CardContent className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">Media Arm</span>
                  <p className="text-lg font-bold text-foreground mt-1">theliberalist.org</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Our publication platform provides independent reporting, analytical commentary, and investigative journalism
                    on institutional reform and civic liberty across African nations.
                  </p>
                  <Link
                    href="https://theliberalist.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-xs font-bold text-primary hover:text-accent gap-1"
                  >
                    Visit theliberalist.org <ArrowUpRight className="size-3.5" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="section-kicker">Get in touch</p>
            <h2 className="mt-2 text-3xl font-bold">Research Inquiries &amp; Data Collaborations</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Contact our team for questions regarding country data points, methodological inquiries, policy consultations, or press requests.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="mailto:reach@liberalistcentre.org?subject=F(in)AR%20Report%20Inquiry"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
              >
                <Mail className="size-4" />
                <span>reach@liberalistcentre.org</span>
              </a>
              <Link
                href="https://liberalistcentre.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted"
              >
                <span>www.liberalistcentre.org</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
