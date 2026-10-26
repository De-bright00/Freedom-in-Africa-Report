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
  GitCompare,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { YearSwitcher } from '@/components/YearSwitcher'
import { EditionYear } from '@/lib/editions/types'
import { getEditionConfig } from '@/lib/editions'

interface SubLink {
  href: string
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

const baseDimensionLinks: SubLink[] = [
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

  const activeYear: EditionYear = pathname?.startsWith('/2025') ? '2025' : '2026'
  const editionConfig = getEditionConfig(activeYear)

  // Prefix links based on active year
  const getYearLink = useCallback(
    (basePath: string) => {
      if (activeYear === '2025') {
        return basePath === '/' ? '/2025' : `/2025${basePath}`
      }
      return basePath
    },
    [activeYear]
  )

  const isDimensionActive = baseDimensionLinks.some((l) => {
    const linked = getYearLink(l.href)
    return pathname === linked || pathname === l.href
  })

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
          const currentIndex = menuItemsRef.current.findIndex((el) => el === document.activeElement)
          const nextIndex = (currentIndex + 1) % baseDimensionLinks.length
          menuItemsRef.current[nextIndex]?.focus()
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (dropdownOpen) {
          const currentIndex = menuItemsRef.current.findIndex((el) => el === document.activeElement)
          const prevIndex = currentIndex <= 0 ? baseDimensionLinks.length - 1 : currentIndex - 1
          menuItemsRef.current[prevIndex]?.focus()
        }
      } else if (e.key === 'Tab') {
        setDropdownOpen(false)
      }
    },
    [dropdownOpen]
  )

  const isHomeActive = pathname === '/' || pathname === '/2026' || pathname === '/2025'
  const isAboutActive = pathname === '/about' || pathname === '/2026/about' || pathname === '/2025/about'
  const isMethodologyActive = pathname === '/methodology' || pathname === '/2026/methodology' || pathname === '/2025/methodology'
  const isFindingsActive = pathname === '/findings' || pathname === '/2026/findings' || pathname === '/2025/findings'
  const isDatasetActive = pathname === '/dataset' || pathname === '/2026/dataset' || pathname === '/2025/dataset'
  const isCompareActive =
    pathname === '/compare-years' ||
    pathname === '/2025/compare-years' ||
    pathname === '/2026/compare-years' ||
    Boolean(pathname?.includes('compare-years'))

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-primary text-primary-foreground">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        {/* Brand Logo & Edition badge */}
        <div className="flex items-center gap-3">
          <Link href={getYearLink('/')} className="flex shrink-0 items-center" aria-label="F(in)AR home">
            <img src="/logo.png" alt="F(in)AR" className="h-10 w-auto object-contain" />
          </Link>
          <YearSwitcher currentYear={activeYear} isCompare={isCompareActive} className="hidden sm:inline-block" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-5 xl:gap-6 lg:flex" aria-label="Main navigation">
          <Link
            href={getYearLink('/')}
            className={`whitespace-nowrap text-xs font-semibold uppercase tracking-wider transition-colors hover:text-white ${
              isHomeActive ? 'text-white' : 'text-primary-foreground/75'
            }`}
          >
            Home
          </Link>
          <Link
            href={getYearLink('/about')}
            className={`whitespace-nowrap text-xs font-semibold uppercase tracking-wider transition-colors hover:text-white ${
              isAboutActive ? 'text-white' : 'text-primary-foreground/75'
            }`}
          >
            About
          </Link>
          <Link
            href={getYearLink('/methodology')}
            className={`whitespace-nowrap text-xs font-semibold uppercase tracking-wider transition-colors hover:text-white ${
              isMethodologyActive ? 'text-white' : 'text-primary-foreground/75'
            }`}
          >
            Methodology
          </Link>
          <Link
            href={getYearLink('/findings')}
            className={`whitespace-nowrap text-xs font-semibold uppercase tracking-wider transition-colors hover:text-white ${
              isFindingsActive ? 'text-white' : 'text-primary-foreground/75'
            }`}
          >
            Findings
          </Link>

          {/* Dimensions Dropdown */}
          <div ref={dropdownRef} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
                dropdownOpen || isDimensionActive ? 'text-white' : 'text-primary-foreground/75'
              }`}
            >
              <span>Dimensions</span>
              <ChevronDown className={`size-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Floating Dropdown Menu */}
            {dropdownOpen && (
              <div
                id="dimensions-menu"
                role="menu"
                aria-labelledby="dimensions-menu-button"
                onKeyDown={handleKeyDown}
                className="absolute left-1/2 top-full z-50 mt-3 w-80 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-950 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in-50 zoom-in-95"
              >
                <div className="flex flex-col gap-1">
                  {baseDimensionLinks.map((dim, idx) => {
                    const Icon = dim.icon
                    const targetHref = getYearLink(dim.href)
                    const isActive = pathname === targetHref || pathname === dim.href
                    return (
                      <Link
                        key={dim.href}
                        ref={(el) => {
                          menuItemsRef.current[idx] = el
                        }}
                        href={targetHref}
                        role="menuitem"
                        tabIndex={dropdownOpen ? 0 : -1}
                        onClick={() => setDropdownOpen(false)}
                        className={`group flex items-start gap-3 rounded-lg p-2.5 transition-colors ${
                          isActive ? 'bg-accent/20 text-white' : 'hover:bg-white/10 text-primary-foreground/80'
                        }`}
                      >
                        <div
                          className={`mt-0.5 rounded-md p-1.5 transition-colors ${
                            isActive
                              ? 'bg-accent text-accent-foreground'
                              : 'bg-white/10 text-primary-foreground/80 group-hover:bg-white/20 group-hover:text-white'
                          }`}
                        >
                          <Icon className="size-4" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-white">{dim.label}</div>
                          <div className="text-[11px] leading-snug text-primary-foreground/60">{dim.description}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Dataset Link */}
          <Link
            href={getYearLink('/dataset')}
            className={`flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-wider transition-colors hover:text-white ${
              isDatasetActive ? 'text-white' : 'text-primary-foreground/75'
            }`}
          >
            <Database className="size-3.5 text-accent" />
            <span>Dataset</span>
          </Link>

          {/* Compare Years Link */}
          <Link
            href={getYearLink('/compare-years')}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
              isCompareActive
                ? 'bg-accent text-accent-foreground'
                : 'bg-white/10 text-liberalist-coral hover:bg-white/15 hover:text-white'
            }`}
          >
            <GitCompare className="size-3.5" />
            <span>Compare Years</span>
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
            <Link
              href={editionConfig.pdfUrl}
              download={editionConfig.pdfFileName}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download data-icon="inline-start" /> Download {editionConfig.title}
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation Sheet */}
        <div className="flex items-center gap-2 lg:hidden">
          <YearSwitcher currentYear={activeYear} isCompare={isCompareActive} className="sm:hidden" />
          <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm border-white/10 bg-slate-950 text-primary-foreground">
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <div className="flex flex-col gap-6 pt-6">
                {/* Brand Logo & Year Switcher in Sheet */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <img src="/logo.png" alt="F(in)AR" className="h-8 w-auto object-contain" />
                  <YearSwitcher currentYear={activeYear} isCompare={isCompareActive} />
                </div>

                {/* Mobile Links */}
                <div className="flex flex-col gap-2">
                  <Link
                    href={getYearLink('/')}
                    onClick={() => setMobileSheetOpen(false)}
                    className={`rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-white/10 ${
                      isHomeActive ? 'bg-white/10 text-white font-semibold' : 'text-primary-foreground/80'
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    href={getYearLink('/about')}
                    onClick={() => setMobileSheetOpen(false)}
                    className={`rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-white/10 ${
                      isAboutActive ? 'bg-white/10 text-white font-semibold' : 'text-primary-foreground/80'
                    }`}
                  >
                    About
                  </Link>
                  <Link
                    href={getYearLink('/methodology')}
                    onClick={() => setMobileSheetOpen(false)}
                    className={`rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-white/10 ${
                      isMethodologyActive ? 'bg-white/10 text-white font-semibold' : 'text-primary-foreground/80'
                    }`}
                  >
                    Methodology
                  </Link>
                  <Link
                    href={getYearLink('/findings')}
                    onClick={() => setMobileSheetOpen(false)}
                    className={`rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-white/10 ${
                      isFindingsActive ? 'bg-white/10 text-white font-semibold' : 'text-primary-foreground/80'
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
                        {baseDimensionLinks.map((dim) => {
                          const Icon = dim.icon
                          const targetHref = getYearLink(dim.href)
                          const isActive = pathname === targetHref || pathname === dim.href
                          return (
                            <Link
                              key={dim.href}
                              href={targetHref}
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
                    href={getYearLink('/dataset')}
                    onClick={() => setMobileSheetOpen(false)}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-white/10 ${
                      isDatasetActive ? 'bg-white/10 font-semibold text-white' : 'text-primary-foreground/80'
                    }`}
                  >
                    <Database className="size-4 text-accent" />
                    <span>Dataset ({activeYear})</span>
                  </Link>

                  {/* Mobile Compare Years */}
                  <Link
                    href={getYearLink('/compare-years')}
                    onClick={() => setMobileSheetOpen(false)}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-base font-semibold transition-colors ${
                      isCompareActive
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-white/10 text-liberalist-coral hover:bg-white/15'
                    }`}
                  >
                    <GitCompare className="size-4 text-accent" />
                    <span>Compare Year</span>
                  </Link>
                </div>

                {/* Mobile CTA */}
                <div className="mt-4 border-t border-white/10 pt-4">
                  <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link
                      href={editionConfig.pdfUrl}
                      download={editionConfig.pdfFileName}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileSheetOpen(false)}
                    >
                      <Download data-icon="inline-start" /> Download {editionConfig.title} PDF
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
