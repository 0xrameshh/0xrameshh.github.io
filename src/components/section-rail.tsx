'use client'

import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function SectionRail() {
  const [active, setActive] = useState('projects')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          onClick={() =>
            document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })
          }
          className="group flex items-center"
          aria-label={`Go to ${s.label}`}
          aria-current={active === s.id}
        >
          <span className="mr-2 whitespace-nowrap rounded-full bg-zinc-900/85 px-2 py-0.5 text-[10px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-white/85 dark:text-zinc-900">
            {s.label}
          </span>
          <span
            className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
              active === s.id
                ? 'scale-125 border-brand-500 bg-brand-500 shadow-[0_0_10px_var(--color-brand-500)]'
                : 'border-zinc-300 bg-transparent dark:border-zinc-600'
            }`}
          />
        </button>
      ))}
    </nav>
  )
}
