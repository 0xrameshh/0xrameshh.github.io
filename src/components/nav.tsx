'use client'

import { useState, useEffect } from 'react'
import { Menu, X, FolderGit2, Sun, Moon } from 'lucide-react'
import { personal } from '@/lib/data'
import { toggleTheme } from '@/lib/theme'

const INITIALS = personal.name
  .split(' ')
  .map((p) => p[0])
  .join('')
  .slice(0, 2)
  .toUpperCase()

const NAV_ITEMS = [
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [progress, setProgress] = useState(0)

  const toggleDark = () => toggleTheme()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100
      let current = ''

      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id)
        if (el) {
          const top = el.offsetTop
          const bottom = top + el.offsetHeight
          if (scrollY >= top && scrollY < bottom) {
            current = item.id
            break
          }
        }
      }

      if (!current && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        current = 'contact'
      }

      const max = document.documentElement.scrollHeight - document.documentElement.clientHeight
      setProgress(max > 0 ? document.documentElement.scrollTop / max : 0)

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-2"
          aria-label="Back to top"
        >
          <span className="relative flex h-8 w-8 items-center justify-center">
            <svg viewBox="0 0 36 36" className="absolute inset-0 h-8 w-8 -rotate-90" aria-hidden="true">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-200 dark:text-zinc-800" />
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-brand-500 transition-[stroke-dashoffset]" strokeDasharray="97.39" strokeDashoffset={97.39 * (1 - progress)} />
            </svg>
            <span className="text-[11px] font-bold text-brand-600 dark:text-brand-300">{INITIALS}</span>
          </span>
          <span className="text-sm font-semibold tracking-tight transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-400">
            {personal.name}
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 sm:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                activeSection === item.id
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {item.label}
            </button>
          ))}
          <span className="mx-2 h-4 w-px bg-zinc-200 dark:bg-zinc-700" />
          <button
            onClick={toggleDark}
            className="p-1.5 text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
            aria-label="Toggle dark mode"
          >
            <Sun size={16} className="hidden dark:block" />
            <Moon size={16} className="block dark:hidden" />
          </button>
          <a
            href={`https://${personal.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
            aria-label="GitHub"
          >
            <FolderGit2 size={16} />
          </a>
            <button
              onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
              className="hidden items-center gap-1 rounded-full border border-zinc-200 px-2 py-1 text-[11px] font-medium text-zinc-400 transition-colors hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 sm:flex"
              aria-label="Open command palette"
              title="Open command palette (⌘K)"
            >
              <span>⌘</span>
              <span>K</span>
            </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950 sm:hidden">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3 border-t border-zinc-200 px-3 pt-3 dark:border-zinc-800">
            <button
              onClick={toggleDark}
              className="text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              aria-label="Toggle dark mode"
            >
              <Sun size={16} className="hidden dark:block" />
              <Moon size={16} className="block dark:hidden" />
            </button>
            <a
              href={`https://${personal.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              <FolderGit2 size={16} />
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
