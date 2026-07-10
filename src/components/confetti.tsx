'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
  size: number
}

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const colors = ['#18181b', '#3f3f46', '#71717a', '#a1a1aa', '#d4d4d8']
    let parts: Particle[] = []
    let raf = 0
    let running = false

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      parts = parts.filter((p) => p.life > 0)
      for (const p of parts) {
        p.vy += 0.18
        p.vx *= 0.99
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.012
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.fillStyle = p.color
        ctx.fillRect(p.x, p.y, p.size, p.size)
      }
      ctx.globalAlpha = 1
      if (parts.length > 0) {
        raf = requestAnimationFrame(loop)
      } else {
        running = false
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    const burst = (cx: number, cy: number) => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      for (let i = 0; i < 90; i++) {
        const a = Math.random() * Math.PI * 2
        const sp = 3 + Math.random() * 7
        parts.push({
          x: cx,
          y: cy,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 3,
          life: 1,
          color: colors[i % colors.length],
          size: 3 + Math.random() * 4,
        })
      }
      if (!running) {
        running = true
        loop()
      }
    }

    const onCelebrate = (e: Event) => {
      const detail = (e as CustomEvent<{ x?: number; y?: number }>).detail
      burst(detail?.x ?? window.innerWidth / 2, detail?.y ?? window.innerHeight / 2)
    }
    window.addEventListener('celebrate', onCelebrate as EventListener)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('celebrate', onCelebrate as EventListener)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[120]"
    />
  )
}
