'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu,
  Download,
  ChevronDown,
  ScaleIcon,
  Landmark,
  TrendingUp,
  MapPinned,
  Database,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { currentReport } from '@/lib/data'

interface SubLink {
  href: string
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

const dimensionLinks: SubLink[] = [
  {
    href: '/political-freedom',
    label: 'Political Freedom',
    description: 'Elections, expression, assembly & judicial independence',
    icon: ScaleIcon,
  },
  {
    href: '/economic-freedom',
    label: 'Economic Freedom',
    description: 'Property rights, trade openness & business regulation',
    icon: Landmark,
  },
  {
    href: '/prosperity',
    label: 'Prosperity',
    description: 'Income, education, healthcare, infrastructure & peace',
    icon: TrendingUp,
  },
  {
    href: '/regional-overview',
    label: 'Regional Overview',
    description: 'Comparative breakdown across Africa’s five regions',
    icon: MapPinned,
  },
]

export function Navbar() {
  const pathname = usePathname()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileDimensionsOpen, setMobileDimensionsOpen] = useState(true)
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([])
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const isDimensionActive = dimensionLinks.some((l) => pathname === l.href)

  // Handle outside clicks
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Clear hover timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false)
    setMobileSheetOpen(false)
  }, [pathname])

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false)
    }, 150)
  }

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setDropdownOpen(false)
        buttonRef.current?.focus()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (!dropdownOpen) {
          setDropdownOpen(true)
          setTimeout(() => menuItemsRef.current[0]?.focus(), 50)
        } else {
          const currentIndex = menuItemsRef.current.findIndex(
            (el) => el === document.activeElement
          )
          const nextIndex = (currentIndex + 1) % dimensionLinks.length
          menuItemsRef.current[nextIndex]?.focus()
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (dropdownOpen) {
          const currentIndex = menuItemsRef.current.findIndex(
            (el) => el === document.activeElement
          )
          const prevIndex =
            currentIndex <= 0 ? dimensionLinks.length - 1 : currentIndex - 1
          menuItemsRef.current[prevIndex]?.focus()
        }
      } else if (e.key === 'Tab') {
        // Allow normal tab navigation; close if tabbing out
        setDropdownOpen(false)
      }
    },
    [dropdownOpen]
  )

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-primary text-primary-foreground">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="F(in)AR home">
          <img
            src="/logo.png"
            alt="F(in)AR"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          <Link
            href="/"
            className={`whitespace-nowrap text-xs font-semibold uppercase tracking-wider transition-colors hover:text-white ${
              pathname === '/' ? 'text-white' : 'text-primary-foreground/75'
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`whitespace-nowrap text-xs font-semibold uppercase tracking-wider transition-colors hover:text-white ${
              pathname === '/about' ? 'text-white' : 'text-primary-foreground/75'
            }`}
          >
            About
          </Link>
          <Link
            href="/methodology"
            className={`whitespace-nowrap text-xs font-semibold uppercase tracking-wider transition-colors hover:text-white ${
              pathname === '/methodology' ? 'text-white' : 'text-primary-foreground/75'
            }`}
          >
            Methodology
          </Link>
          <Link
            href="/findings"
            className={`whitespace-nowrap text-xs font-semibold uppercase tracking-wider transition-colors hover:text-white ${
              pathname === '/findings' ? 'text-white' : 'text-primary-foreground/75'
            }`}
          >
            Findings
          </Link>

          {/* Dimensions Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              ref={buttonRef}
              type="button"
              id="dimensions-menu-button"
              aria-haspopup="menu"
              aria-expanded={dropdownOpen}
              aria-controls="dimensions-menu"
              onClick={() => setDropdownOpen((prev) => !prev)}
              onKeyDown={handleKeyDown}
              className={`flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-wider transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                dropdownOpen || isDimensionActive
                  ? 'text-white'
                  : 'text-primary-foreground/75'
              }`}
            >
              <span>Dimensions</span>
              <ChevronDown
                className={`size-3.5 transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Floating Dropdown Menu */}
            {dropdownOpen && (
              <div
                id="dimensions-menu"
                role="menu"
                aria-labelledby="dimensions-menu-button"
                onKeyDown={handleKeyDown}
                className="absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-md animate-in fade-in-0 zoom-in-95"
              >
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground/45">
                  Core Framework
                </div>
                {dimensionLinks.map((dim, idx) => {
                  const Icon = dim.icon
                  const isActive = pathname === dim.href
                  return (
                    <Link
                      key={dim.href}
                      ref={(el) => {
                        menuItemsRef.current[idx] = el
                      }}
                      href={dim.href}
                      role="menuitem"
                      tabIndex={0}
                      onClick={() => setDropdownOpen(false)}
                      className={`flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors focus:outline-none focus:bg-white/10 ${
                        isActive
                          ? 'bg-accent/15 text-accent-foreground'
                          : 'text-primary-foreground/85 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-white/10 text-white">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">
                          {dim.label}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-tight text-primary-foreground/60">
                          {dim.description}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Dataset Top-Level Link */}
          <Link
            href="/dataset"
            className={`flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-wider transition-colors hover:text-white ${
              pathname === '/dataset' ? 'text-white' : 'text-primary-foreground/75'
            }`}
          >
            <Database className="size-3.5 text-accent" />
            <span>Dataset</span>
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden shrink-0 items-center lg:flex">
          <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link
              href={currentReport.pdfUrl}
              download="F(in)AR_2025_Freedom_in_Africa_Report.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download data-icon="inline-start" /> Download Report
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation Sheet */}
        <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground lg:hidden"
                aria-label="Open navigation menu"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full max-w-sm border-white/10 bg-slate-950 text-primary-foreground"
          >
            <SheetTitle className="sr-only">Site navigation</SheetTitle>
            <div className="flex flex-col gap-6 pt-6">
              {/* Brand Logo in Sheet */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <img
                  src="/logo.png"
                  alt="F(in)AR"
                  className="h-8 w-auto object-contain"
                />
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col gap-2">
                <Link
                  href="/"
                  onClick={() => setMobileSheetOpen(false)}
                  className={`rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-white/10 ${
                    pathname === '/' ? 'bg-white/10 text-white font-semibold' : 'text-primary-foreground/80'
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileSheetOpen(false)}
                  className={`rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-white/10 ${
                    pathname === '/about' ? 'bg-white/10 text-white font-semibold' : 'text-primary-foreground/80'
                  }`}
                >
                  About
                </Link>
                <Link
                  href="/methodology"
                  onClick={() => setMobileSheetOpen(false)}
                  className={`rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-white/10 ${
                    pathname === '/methodology' ? 'bg-white/10 text-white font-semibold' : 'text-primary-foreground/80'
                  }`}
                >
                  Methodology
                </Link>
                <Link
                  href="/findings"
                  onClick={() => setMobileSheetOpen(false)}
                  className={`rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-white/10 ${
                    pathname === '/findings' ? 'bg-white/10 text-white font-semibold' : 'text-primary-foreground/80'
                  }`}
                >
                  Findings
                </Link>

                {/* Mobile Dimensions Collapsible Accordion */}
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-1">
                  <button
                    type="button"
                    onClick={() => setMobileDimensionsOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-base font-medium text-primary-foreground"
                    aria-expanded={mobileDimensionsOpen}
                  >
                    <span className="font-semibold text-white">Dimensions</span>
                    <ChevronDown
                      className={`size-4 text-primary-foreground/60 transition-transform ${
                        mobileDimensionsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {mobileDimensionsOpen && (
                    <div className="flex flex-col gap-1 pb-2 pl-3 pr-1 pt-1">
                      {dimensionLinks.map((dim) => {
                        const Icon = dim.icon
                        const isActive = pathname === dim.href
                        return (
                          <Link
                            key={dim.href}
                            href={dim.href}
                            onClick={() => setMobileSheetOpen(false)}
                            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                              isActive
                                ? 'bg-accent/20 font-semibold text-accent'
                                : 'text-primary-foreground/75 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <Icon className="size-4 shrink-0 text-primary-foreground/60" />
                            <span>{dim.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Mobile Dataset Link */}
                <Link
                  href="/dataset"
                  onClick={() => setMobileSheetOpen(false)}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-white/10 ${
                    pathname === '/dataset'
                      ? 'bg-white/10 font-semibold text-white'
                      : 'text-primary-foreground/80'
                  }`}
                >
                  <Database className="size-4 text-accent" />
                  <span>Dataset</span>
                  <span className="ml-auto rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold text-accent">
                    2025
                  </span>
                </Link>
              </div>

              {/* Mobile CTA */}
              <div className="mt-4 border-t border-white/10 pt-4">
                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link
                    href={currentReport.pdfUrl}
                    download="F(in)AR_2025_Freedom_in_Africa_Report.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileSheetOpen(false)}
                  >
                    <Download data-icon="inline-start" /> Download Report PDF
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
