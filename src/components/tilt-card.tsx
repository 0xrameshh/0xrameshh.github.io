'use client'

import { useRef, useState } from 'react'

export default function TiltCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setStyle({
      transform: `perspective(900px) rotateX(${(0.5 - py) * 7}deg) rotateY(${
        (px - 0.5) * 7
      }deg)`,
      ['--mx' as string]: `${px * 100}%`,
      ['--my' as string]: `${py * 100}%`,
    })
  }

  const reset = () => {
    setStyle({ transform: 'perspective(900px) rotateX(0) rotateY(0)' })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={style}
      className={`transition-transform duration-200 will-change-transform ${className}`}
    >
      {children}
    </div>
  )
}
