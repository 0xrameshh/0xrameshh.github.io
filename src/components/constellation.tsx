'use client'

import { useEffect, useRef } from 'react'

type Node = { x: number; y: number; vx: number; vy: number }

export default function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const NODE_COUNT = 48
    const LINK_DIST = 150

    let w = 0
    let h = 0
    let dpr = 1
    let nodes: Node[] = []
    const mouse = { x: -9999, y: -9999 }

    const hexToRgba = (hex: string, a: number) => {
      let s = hex.replace('#', '').trim()
      if (s.length === 3)
        s = s
          .split('')
          .map((c) => c + c)
          .join('')
      const n = parseInt(s, 16)
      return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`
    }

    const getBrand = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-brand-500')
        .trim()
      return v || '#71717a'
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }))
    }

    let raf = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const brand = getBrand()
      const tl = LINK_DIST * 1.4

      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0 || n.x > w) n.vx *= -1
          if (n.y < 0 || n.y > h) n.vy *= -1
          n.x = Math.max(0, Math.min(w, n.x))
          n.y = Math.max(0, Math.min(h, n.y))
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK_DIST) {
            ctx.strokeStyle = hexToRgba(brand, (1 - d / LINK_DIST) * 0.45)
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (dm < tl) {
          ctx.strokeStyle = hexToRgba(brand, (1 - dm / tl) * 0.6)
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      for (const n of nodes) {
        const dm = Math.hypot(n.x - mouse.x, n.y - mouse.y)
        const near = dm < tl
        ctx.fillStyle = hexToRgba(brand, near ? 0.95 : 0.4)
        ctx.beginPath()
        ctx.arc(n.x, n.y, near ? 2.6 : 1.7, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduce) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20"
    />
  )
}
