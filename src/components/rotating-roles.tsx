'use client'

import { useEffect, useState } from 'react'

const ROLES = [
  'Full-Stack & AI Application Engineer',
  'LangGraph & RAG Specialist',
  'Solana & Web3 Builder',
  '50+ Projects Shipped',
]

export default function RotatingRoles({ initial }: { initial: string }) {
  const [index, setIndex] = useState(0)
  const [char, setChar] = useState(initial.length)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const full = ROLES[index]
    let timer: ReturnType<typeof setTimeout>

    if (!deleting && char < full.length) {
      timer = setTimeout(() => setChar(char + 1), 55)
    } else if (!deleting && char === full.length) {
      timer = setTimeout(() => setDeleting(true), 1500)
    } else if (deleting && char > 0) {
      timer = setTimeout(() => setChar(char - 1), 28)
    } else {
      timer = setTimeout(() => {
        setDeleting(false)
        setIndex((i) => (i + 1) % ROLES.length)
      }, 500)
    }

    return () => clearTimeout(timer)
  }, [char, deleting, index, initial.length])

  const display = ROLES[index].slice(0, char)

  return (
    <p className="mt-3 flex min-h-[2rem] items-center text-xl font-medium text-zinc-700 dark:text-zinc-200 sm:text-2xl">
      <span>{display}</span>
      <span className="ml-0.5 inline-block h-6 w-[2px] translate-y-px animate-pulse bg-brand-500" />
    </p>
  )
}
