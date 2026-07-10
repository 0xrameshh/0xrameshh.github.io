import {
  personal,
  stats,
  currently,
  skillGroups,
  experience,
  projects,
  education,
} from "@/lib/data";
import Nav from "@/components/nav";
import Cursor from "@/components/cursor";
import ScrollProgress from "@/components/scroll-progress";
import CommandPalette from "@/components/command-palette";
import EmailButton from "@/components/email-button";
import { ArrowUpRight, MapPin } from "lucide-react";

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-8 block font-mono text-xs uppercase tracking-[0.2em] text-zinc-300">
    {children}
  </span>
);

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group inline-flex items-center gap-1 text-zinc-400 transition-colors hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-zinc-50"
  >
    {children}
    <ArrowUpRight
      size={12}
      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    />
  </a>
);

export default function Home() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <CommandPalette />
      <Nav />

      <main className="mx-auto max-w-4xl px-6 pb-20 text-zinc-950 dark:text-zinc-50">
        {/* ── Hero ── */}
        <section className="flex min-h-[85vh] flex-col justify-center pt-24">
          <SectionLabel>Portfolio / {new Date().getFullYear()}</SectionLabel>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl">
            {personal.name}
          </h1>

          <p className="mt-6 max-w-2xl text-xl text-zinc-400 sm:text-2xl">
            {personal.title}
          </p>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-500 dark:text-zinc-200">
            {personal.summary}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <EmailButton />
            <ExternalLink href={`https://${personal.website}`}>
              View GitHub
            </ExternalLink>
          </div>

          <div className="mt-16 flex items-center gap-2 text-sm text-zinc-400">
            <MapPin size={14} />
            <span>{personal.location}</span>
            <span className="mx-2">·</span>
            <span
              className={`inline-flex items-center gap-1.5 ${
                personal.available ? "text-zinc-950 dark:text-zinc-50" : ""
              }`}
            >
              <span className="relative flex h-2 w-2">
                {personal.available && (
                  <>
                    <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-40 animate-ping" />
                    <span className="relative inline-flex h-full w-full rounded-full bg-current" />
                  </>
                )}
                {!personal.available && (
                  <span className="inline-flex h-full w-full rounded-full bg-current" />
                )}
              </span>
              {personal.status}
            </span>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="grid grid-cols-2 gap-8 border-y border-zinc-200 py-10 dark:border-zinc-800 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold tracking-tight sm:text-4xl">
                {s.value}
                {s.suffix}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-zinc-300">
                {s.label}
              </p>
            </div>
          ))}
        </section>

        {/* ── Currently ── */}
        <section className="py-20">
          <SectionLabel>Currently</SectionLabel>
          <p className="text-2xl font-medium sm:text-3xl">
            Building {currently.building}
          </p>
          <p className="mt-2 text-zinc-400 dark:text-zinc-200">
            Learning {currently.learning}
          </p>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="scroll-mt-24 border-t border-zinc-200 py-20 dark:border-zinc-800">
          <SectionLabel>Skills</SectionLabel>
          <div className="grid gap-10 sm:grid-cols-2">
            {skillGroups.map((g) => (
              <div key={g.category}>
                <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-zinc-300">
                  {g.category}
                </h3>
                <p className="text-lg leading-snug">
                  {g.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="scroll-mt-24 border-t border-zinc-200 py-20 dark:border-zinc-800">
          <SectionLabel>Experience</SectionLabel>
          <div className="space-y-10">
            {experience.map((exp) => (
              <div key={exp.role}>
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {exp.role}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">
                    {exp.period}
                  </span>
                </div>
                <p className="mt-1 text-zinc-400">
                  {exp.company} · {exp.location}
                </p>
                <ul className="mt-4 space-y-2">
                  {exp.bullets.map((b) => (
                    <li
                      key={b}
                      className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-200"
                    >
                      — {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="scroll-mt-24 border-t border-zinc-200 py-20 dark:border-zinc-800">
          <SectionLabel>Selected Projects</SectionLabel>
          <div className="grid gap-5">
            {projects.map((p) => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg border border-zinc-200 p-5 transition-all hover:border-zinc-950 dark:border-zinc-800 dark:hover:border-zinc-50"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {p.name}
                  </h3>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
                <p className="mt-2 font-mono text-xs uppercase tracking-wider text-zinc-300">
                  {p.stack.join(" · ")}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-200">
                  {p.highlights[0]}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* ── Education / Contact ── */}
        <section id="contact" className="scroll-mt-24 border-t border-zinc-200 py-20 dark:border-zinc-800">
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <SectionLabel>Education</SectionLabel>
              <p className="text-lg font-medium">{education.school}</p>
              <p className="mt-1 text-zinc-400">
                {education.degree} · {education.year}
              </p>
            </div>
            <div>
              <SectionLabel>Contact</SectionLabel>
              <p className="text-2xl font-medium sm:text-3xl">
                {personal.status}
              </p>
              <div className="mt-6">
                <EmailButton />
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="flex flex-col items-start justify-between gap-4 border-t border-zinc-200 pt-10 dark:border-zinc-800 sm:flex-row sm:items-center">
          <p className="text-sm text-zinc-300">
            © {new Date().getFullYear()} {personal.name}
          </p>
          <div className="flex items-center gap-6">
            <ExternalLink href={`https://${personal.website}`}>
              GitHub
            </ExternalLink>
            <ExternalLink href={`mailto:${personal.email}`}>Email</ExternalLink>
          </div>
        </footer>
      </main>
    </>
  );
}
