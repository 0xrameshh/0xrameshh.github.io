'use client'

import { Mail } from 'lucide-react'
import { personal } from '@/lib/data'

export default function EmailButton() {
  return (
    <a
      href={`mailto:${personal.email}`}
      className="group inline-flex w-full items-center gap-3 border border-zinc-950 bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-white hover:text-zinc-950 dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-950 dark:hover:text-zinc-50 sm:w-auto"
    >
      <Mail size={16} />
      Email me
      <span className="ml-auto transition-transform group-hover:translate-x-1">→</span>
    </a>
  )
}
