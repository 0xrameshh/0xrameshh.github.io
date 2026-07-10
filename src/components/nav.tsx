'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon, FolderGit2 } from 'lucide-react'
import { personal } from '@/lib/data'
import { toggleTheme } from '@/lib/theme'

const NAV_ITEMS = [
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm font-semibold tracking-tight transition-opacity hover:opacity-70"
          aria-label="Back to top"
        >
          {personal.name}
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 sm:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                activeSection === item.id
                  ? 'text-zinc-950 dark:text-zinc-50'
                  : 'text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <span className="mx-2 h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
          <button
            onClick={toggleTheme}
            className="p-1.5 text-zinc-300 transition-colors hover:text-zinc-950 dark:hover:text-zinc-50"
            aria-label="Toggle dark mode"
          >
            <Sun size={16} className="hidden dark:block" />
            <Moon size={16} className="block dark:hidden" />
          </button>
          <a
            href={`https://${personal.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-zinc-300 transition-colors hover:text-zinc-950 dark:hover:text-zinc-50"
            aria-label="GitHub"
          >
            <FolderGit2 size={16} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 sm:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950 sm:hidden">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-zinc-950 dark:text-zinc-50'
                    : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3 border-t border-zinc-200 px-3 pt-3 dark:border-zinc-800">
            <button
              onClick={toggleTheme}
              className="text-zinc-300 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              aria-label="Toggle dark mode"
            >
              <Sun size={16} className="hidden dark:block" />
              <Moon size={16} className="block dark:hidden" />
            </button>
            <a
              href={`https://${personal.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              <FolderGit2 size={16} />
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
