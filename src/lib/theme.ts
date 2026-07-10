export const ACCENTS: Record<string, Record<string, string>> = {
  indigo: {
    50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc',
    400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca',
    800: '#3730a3', 900: '#312e81',
  },
  emerald: {
    50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7',
    400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857',
    800: '#065f46', 900: '#064e3b',
  },
  sunset: {
    50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
    400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
    800: '#9a3412', 900: '#7c2d12',
  },
}

export const ACCENT_ORDER = ['indigo', 'emerald', 'sunset'] as const

export function setAccent(name: string) {
  const pal = ACCENTS[name] ?? ACCENTS.indigo
  const root = document.documentElement
  for (const k in pal) root.style.setProperty(`--color-brand-${k}`, pal[k])
  try {
    localStorage.setItem('accent', name)
  } catch {}
}

export function toggleTheme() {
  const next = !document.documentElement.classList.contains('dark')
  document.documentElement.classList.toggle('dark', next)
  try {
    localStorage.setItem('theme', next ? 'dark' : 'light')
  } catch {}
}
