'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const root = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const r = root.current
    const d = dot.current
    const g = ring.current
    if (!r || !d || !g) return
    r.classList.remove('opacity-0')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0

    const move = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      d.style.transform = `translate(${mx}px, ${my}px)`
      const t = (e.target as HTMLElement)?.closest(
        'a, button, [data-cursor="hover"]'
      )
      g.classList.toggle('scale-150', !!t)
      g.classList.toggle('opacity-70', !!t)
      g.classList.toggle('opacity-40', !t)
    }

    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      g.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', move)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] opacity-0"
    >
      <div
        ref={dot}
        className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-white mix-blend-difference"
      />
      <div
        ref={ring}
        className="absolute left-0 top-0 -ml-4 -mt-4 h-8 w-8 rounded-full border border-brand-400 opacity-40 transition-[width,height,opacity] duration-200"
      />
    </div>
  )
}
