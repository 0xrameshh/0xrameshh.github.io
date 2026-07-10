'use client'

import Magnetic from '@/components/magnetic'
import { Mail } from 'lucide-react'
import { personal } from '@/lib/data'

export default function EmailButton() {
  return (
    <Magnetic>
      <a
        href={`mailto:${personal.email}`}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          window.dispatchEvent(
            new CustomEvent('celebrate', {
              detail: { x: r.left + r.width / 2, y: r.top + r.height / 2 },
            })
          )
        }}
        className="flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
      >
        <Mail size={15} />
        Email me
      </a>
    </Magnetic>
  )
}
