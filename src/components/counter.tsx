'use client'

import { useEffect, useRef, useState } from 'react'

export default function Counter({
  value,
  suffix = '',
  duration = 1400,
}: {
  value: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [n, setN] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          const reduce = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
          ).matches
          if (reduce) {
            setN(value)
            return
          }
          const start = performance.now()
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - t, 3)
            setN(Math.round(eased * value))
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [value, duration, started])

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}
