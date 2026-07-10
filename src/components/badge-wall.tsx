'use client'

import { useState } from 'react'

const COLOR = '6366F1'

type Badge = { label: string; logo?: string; href?: string }

function badgeUrl(label: string, logo?: string) {
  const text = encodeURIComponent(label).replace(/%20/g, '+')
  return `https://shieldcn.dev/badge/${text}-${COLOR}.svg?variant=branded&size=sm${
    logo ? `&logo=${logo}` : ''
  }`
}

const BADGES: Badge[] = [
  { label: 'Available for work' },
  { label: 'TypeScript', logo: 'typescript' },
  { label: 'React', logo: 'react' },
  { label: 'Next.js', logo: 'nextdotjs' },
  { label: 'LangGraph' },
  { label: 'Solana', logo: 'solana' },
  { label: 'Rust', logo: 'rust' },
  { label: 'Go', logo: 'go' },
  {
    label: 'GitHub Stars',
    logo: 'github',
    href: 'https://github.com/0xrameshh/TurboWhisper',
  },
]

function ShieldBadge({ badge }: { badge: Badge }) {
  const [err, setErr] = useState(false)
  const inner = err ? (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-300">
      {badge.logo && <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />}
      {badge.label}
    </span>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={badgeUrl(badge.label, badge.logo)}
      alt={badge.label}
      loading="lazy"
      onError={() => setErr(true)}
      className="h-[22px] w-auto"
    />
  )
  const cls = 'transition-transform duration-200 hover:scale-105'
  if (badge.href) {
    return (
      <a
        href={badge.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        aria-label={badge.label}
      >
        {inner}
      </a>
    )
  }
  return <span className={cls}>{inner}</span>
}

export default function BadgeWall() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      {BADGES.map((b) => (
        <ShieldBadge key={b.label} badge={b} />
      ))}
    </div>
  )
}
