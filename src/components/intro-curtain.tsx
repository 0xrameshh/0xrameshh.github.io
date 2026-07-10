'use client'

import { useEffect, useState } from 'react'

export default function IntroCurtain() {
  const [hidden, setHidden] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setHidden(true), 950)
    const t2 = setTimeout(() => setRemoved(true), 1750)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (removed) return null

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-zinc-950 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:hidden ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-2xl font-bold text-white shadow-2xl">
          RK
        </span>
        <div className="h-0.5 w-36 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/3 animate-[curtain-load_0.9s_ease-in-out_infinite] bg-gradient-to-r from-brand-400 to-cyan-400" />
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">
          Ramesh Kumar
        </p>
      </div>
    </div>
  )
}
