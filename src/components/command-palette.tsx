'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, Sun, FolderGit2, Mail, Palette, ArrowDownToLine } from 'lucide-react'
import { ACCENT_ORDER, setAccent, toggleTheme } from '@/lib/theme'
import { personal } from '@/lib/data'

type Item = {
  id: string
  label: string
  hint?: string
  icon: React.ReactNode
  run: () => void
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const items: Item[] = useMemo(() => {
    const go = (id: string) => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
    return [
      { id: 'nav-projects', label: 'Go to Projects', hint: 'Section', icon: <ArrowDownToLine size={15} />, run: () => go('projects') },
      { id: 'nav-skills', label: 'Go to Skills', hint: 'Section', icon: <ArrowDownToLine size={15} />, run: () => go('skills') },
      { id: 'nav-experience', label: 'Go to Experience', hint: 'Section', icon: <ArrowDownToLine size={15} />, run: () => go('experience') },
      { id: 'nav-contact', label: 'Go to Contact', hint: 'Section', icon: <ArrowDownToLine size={15} />, run: () => go('contact') },
      { id: 'theme', label: 'Toggle dark mode', hint: 'Theme', icon: <Sun size={15} />, run: toggleTheme },
      ...ACCENT_ORDER.map((a) => ({
        id: `accent-${a}`,
        label: `Accent: ${a}`,
        hint: 'Theme',
        icon: <Palette size={15} />,
        run: () => setAccent(a),
      })),
      { id: 'gh', label: 'Open GitHub', hint: 'Link', icon: <FolderGit2 size={15} />, run: () => window.open(`https://${personal.website}`, '_blank') },
      { id: 'mail', label: 'Email me', hint: 'Link', icon: <Mail size={15} />, run: () => (window.location.href = `mailto:${personal.email}`) },
    ] as Item[]
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((it) => {
      let i = 0
      for (const ch of q) {
        i = it.label.toLowerCase().indexOf(ch, i)
        if (i === -1) return false
        i++
      }
      return true
    })
  }, [query, items])

  const openRef = useRef(false)
  useEffect(() => {
    openRef.current = open
  }, [open])

  const launch = () => {
    setQuery('')
    setActive(0)
    setOpen(true)
    setTimeout(() => inputRef.current?.focus(), 10)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (openRef.current) setOpen(false)
        else launch()
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    const onOpen = () => launch()
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-command-palette', onOpen as EventListener)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-command-palette', onOpen as EventListener)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  if (!open) return null

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      filtered[active]?.run()
      setOpen(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-start justify-center px-4 pt-[12vh]"
      onClick={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-zinc-950/50 backdrop-blur-sm" />
      <div
        role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white/90 shadow-2xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/90"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-zinc-200 px-4 dark:border-zinc-800">
          <Search size={16} className="text-zinc-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0) }}
            onKeyDown={onKeyDown}
            placeholder="Type a command or search…"
            className="w-full bg-transparent py-3.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
          />
          <kbd className="hidden rounded border border-zinc-200 px-1.5 py-0.5 text-[10px] text-zinc-400 dark:border-zinc-700 sm:block">
            ESC
          </kbd>
        </div>
        <ul className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-zinc-400">
              No results
            </li>
          )}
          {filtered.map((it, i) => (
            <li key={it.id}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  it.run()
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  active === i
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                    : 'text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <span className="text-zinc-400">{it.icon}</span>
                <span className="flex-1">{it.label}</span>
                {it.hint && (
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400">
                    {it.hint}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
