export default function KineticName({ name }: { name: string }) {
  return (
    <span className="inline-block" aria-label={name}>
      {name.split('').map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="kinetic-letter inline-block"
          style={{ animationDelay: `${i * 0.04}s` }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}
