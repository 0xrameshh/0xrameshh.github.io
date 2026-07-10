'use client'

import { useState, useEffect } from 'react'
import TiltCard from './tilt-card'
import Reveal from './reveal'
import { ArrowUpRight, X } from 'lucide-react'

const FILTERS = ['All', 'AI', 'Web', 'Web3', 'Systems', 'Mobile'] as const

type Project = {
  name: string
  link?: string
  featured?: boolean
  tags?: string[]
  stack: string[]
  highlights: string[]
}

export default function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const [selected, setSelected] = useState<Project | null>(null)

  const visible =
    filter === 'All'
      ? projects
      : projects.filter((p) => (p.tags ?? []).includes(filter))

  useEffect(() => {
    if (selected) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selected])

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
              filter === f
                ? 'border-brand-400 bg-brand-50 text-brand-700 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-300'
                : 'border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {visible.map((project, i) => {
          const isFeatured = project.featured
          return (
            <Reveal key={project.name} delay={i * 50} className="h-full">
              <TiltCard className="h-full">
                <article
                  onClick={() => setSelected(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelected(project)
                    }
                  }}
                  className={`group relative flex h-full cursor-pointer flex-col rounded-2xl border bg-white/60 p-5 backdrop-blur-sm transition-colors dark:bg-zinc-900/40 ${
                    isFeatured
                      ? 'border-brand-300 sm:col-span-2 dark:border-brand-500/40'
                      : 'border-zinc-200 hover:border-brand-300 dark:border-zinc-800 dark:hover:border-brand-500/40'
                  }`}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-brand-500) 18%, transparent), transparent 70%)',
                    }}
                  />
                  {isFeatured && (
                    <span className="absolute -top-2.5 left-5 rounded-full bg-brand-600 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                      Featured
                    </span>
                  )}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                      {project.name}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-0.5 shrink-0 text-zinc-400 transition-colors hover:text-brand-600 dark:hover:text-brand-400"
                        aria-label={`View ${project.name} source`}
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    )}
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ul className="mt-3 grid gap-1.5">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                      >
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-4 text-xs font-medium text-brand-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-brand-400">
                    Click to expand →
                  </span>
                </article>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[105] flex items-center justify-center px-4"
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0 bg-zinc-950/50 backdrop-blur-sm" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selected.name}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/95"
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-full p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              <X size={16} />
            </button>
            <div className="p-6">
              <div className="flex items-start justify-between gap-3 pr-6">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  {selected.name}
                </h3>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {selected.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="mt-5 grid gap-2.5">
                {selected.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              {selected.link && (
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
                >
                  View source <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
