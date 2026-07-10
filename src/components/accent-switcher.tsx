'use client'

import { useEffect, useRef } from 'react'
import { ACCENTS, ACCENT_ORDER, setAccent } from '@/lib/theme'

export default function AccentSwitcher() {
  const ref = useRef<HTMLDivElement>(null)

  const syncRings = () => {
    const root = ref.current
    if (!root) return
    let saved = 'indigo'
    try {
      saved = localStorage.getItem('accent') || 'indigo'
    } catch {}
    root.querySelectorAll('button').forEach((b) => {
      const on = b.dataset.accent === saved
      b.classList.toggle('ring-2', on)
      b.classList.toggle('ring-zinc-400', on)
      b.classList.toggle('ring-offset-2', on)
      b.classList.toggle('ring-offset-white', on)
      b.classList.toggle('dark:ring-offset-zinc-950', on)
    })
  }

  useEffect(() => {
    syncRings()
  }, [])

  return (
    <div
      ref={ref}
      className="ml-1 flex items-center gap-1.5"
      aria-label="Accent color"
    >
      {ACCENT_ORDER.map((name) => (
        <button
          key={name}
          data-accent={name}
          onClick={() => {
            setAccent(name)
            syncRings()
          }}
          aria-label={`${name} accent`}
          title={`${name} accent`}
          className="h-3.5 w-3.5 rounded-full transition-transform hover:scale-125"
          style={{ backgroundColor: ACCENTS[name][500] }}
        />
      ))}
    </div>
  )
}
