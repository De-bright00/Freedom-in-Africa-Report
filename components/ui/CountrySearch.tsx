'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { searchCountries } from '@/lib/data'

interface CountrySearchProps {
  variant?: 'hero' | 'compact'
  placeholder?: string
  className?: string
}

export function CountrySearch({ variant = 'hero', placeholder = 'Find a country\u2026', className }: CountrySearchProps) {
  const router = useRouter()
  const listId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const results = searchCountries(query)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function goToCountry(slug: string) {
    setOpen(false)
    setQuery('')
    setActiveIndex(-1)
    router.push(`/countries/${slug}`)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((i) => (i + 1) % results.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((i) => (i - 1 + results.length) % results.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const pick = results[activeIndex] ?? results[0]
      if (pick) goToCountry(pick.slug)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const isHero = variant === 'hero'

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <div
        className={cn(
          'flex items-center gap-3 rounded-lg border bg-background',
          isHero ? 'px-4 py-3 shadow-sm' : 'border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5'
        )}
      >
        <Search className={cn('shrink-0', isHero ? 'size-5 text-muted-foreground' : 'size-4 text-primary-foreground/70')} aria-hidden="true" />
        <input
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            setActiveIndex(-1)
          }}
          onFocus={() => query && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'w-full bg-transparent outline-none',
            isHero ? 'text-base text-foreground placeholder:text-muted-foreground' : 'text-sm text-primary-foreground placeholder:text-primary-foreground/60'
          )}
          aria-label="Search for a country"
        />
      </div>

      {open && query && (
        <ul id={listId} role="listbox" className="absolute left-0 top-full z-50 mt-2 max-h-80 w-full min-w-[260px] overflow-auto rounded-lg border bg-popover p-1.5 text-popover-foreground shadow-lg">
          {results.length === 0 ? (
            <li className="px-3 py-2.5 text-sm text-muted-foreground">No countries match &quot;{query}&quot;</li>
          ) : (
            results.map((country, index) => (
              <li key={country.id} role="option" aria-selected={index === activeIndex}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => goToCountry(country.slug)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    'flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left text-sm',
                    index === activeIndex ? 'bg-muted' : 'hover:bg-muted'
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-lg">{country.flagEmoji}</span>
                    <span>
                      <span className="font-medium text-foreground">{country.name}</span>
                      <span className="ml-1.5 text-xs text-muted-foreground">{country.region} Africa</span>
                    </span>
                  </span>
                  <span className="font-serif text-sm font-bold text-primary">{country.score}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
