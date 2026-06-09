'use client'

import { useState, useEffect } from 'react'
import { Menu, X, FolderGit2, Sun, Moon } from 'lucide-react'
import { personal } from '@/lib/data'

const NAV_ITEMS = [
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [dark, setDark] = useState(false)

  // Init dark state from DOM (script already applied class)
  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch {}
  }

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
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm font-semibold tracking-tight transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
        >
          {personal.name}
        </button>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                activeSection === item.id
                  ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
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
            {dark ? <Sun size={16} /> : <Moon size={16} />}
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
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
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
              {dark ? <Sun size={16} /> : <Moon size={16} />}
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
