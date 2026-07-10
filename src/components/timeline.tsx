'use client'

import { useEffect, useRef, useState } from 'react'

export default function Timeline({
  children,
}: {
  children: React.ReactNode
}) {
  const ref = useRef<HTMLOListElement>(null)
  const [fill, setFill] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const total = r.height
      const passed = Math.min(Math.max(window.innerHeight * 0.6 - r.top, 0), total)
      setFill(total ? (passed / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <ol
      ref={ref}
      className="relative mt-6 space-y-9 border-l border-zinc-200 pl-8 dark:border-zinc-800"
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 w-px bg-gradient-to-b from-brand-600 to-brand-300"
        style={{ height: `${fill}%` }}
      />
      {children}
    </ol>
  )
}
