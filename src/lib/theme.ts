export function toggleTheme() {
  const next = !document.documentElement.classList.contains('dark')
  document.documentElement.classList.toggle('dark', next)
  try {
    localStorage.setItem('theme', next ? 'dark' : 'light')
  } catch {}
}
