'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [p, setP] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed left-0 top-0 z-[90] h-0.5 w-full">
      <div
        className="h-full bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-200 transition-[width] duration-100"
        style={{ width: `${p}%` }}
      />
    </div>
  )
}
