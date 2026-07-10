import {
  personal,
  stats,
  currently,
  skillGroups,
  skills,
  experience,
  projects,
  education,
} from "@/lib/data";
import Nav from "@/components/nav";
import Reveal from "@/components/reveal";
import RotatingRoles from "@/components/rotating-roles";
import Cursor from "@/components/cursor";
import ScrollProgress from "@/components/scroll-progress";
import Counter from "@/components/counter";
import LiveClock from "@/components/live-clock";
import Timeline from "@/components/timeline";
import Projects from "@/components/projects";
import Constellation from "@/components/constellation";
import CommandPalette from "@/components/command-palette";
import KineticName from "@/components/kinetic-name";
import IntroCurtain from "@/components/intro-curtain";
import SectionRail from "@/components/section-rail";
import Confetti from "@/components/confetti";
import EmailButton from "@/components/email-button";
import {
  FolderGit2,
  MapPin,
  Mail,
  Briefcase,
  GraduationCap,
  Code2,
  Sparkles,
  Clock,
  Zap,
  BookOpen,
} from "lucide-react";

function SectionHeading({
  index,
  icon: Icon,
  children,
}: {
  index?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-3 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
        <Icon size={15} />
      </span>
      {children}
      {index && (
        <span className="ml-auto font-mono text-xs font-medium text-zinc-300 dark:text-zinc-600">
          {index}
        </span>
      )}
    </h2>
  );
}

function ContactChip({
  href,
  icon: Icon,
  children,
}: {
  href?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) {
  const inner = (
    <span className="flex items-center gap-1.5 transition-colors">
      <Icon size={14} className="text-brand-500 dark:text-brand-400" />
      <span>{children}</span>
    </span>
  );
  const cls =
    "rounded-full border border-zinc-200 bg-white/60 px-3 py-1.5 text-sm text-zinc-700 backdrop-blur-sm transition-all hover:border-brand-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-200 dark:hover:border-brand-500/40 dark:hover:text-white";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return <span className={cls}>{inner}</span>;
}

const card =
  "rounded-2xl border border-zinc-200 bg-white/60 p-5 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/40";

export default function Home() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Constellation />
      <IntroCurtain />
      <SectionRail />
      <Confetti />
      <CommandPalette />

      {/* Animated aurora + grain backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="aurora absolute -inset-40 opacity-40 dark:opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40 dark:to-zinc-950/40" />
      </div>
      <div
        aria-hidden
        className="grain pointer-events-none fixed inset-0 -z-10"
      />

      <Nav />

      {/* ── Bento Hero ── */}
      <header className="mx-auto max-w-4xl px-4 pb-10 pt-20 sm:pt-28">
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Name + roles */}
          <Reveal className="sm:col-span-2">
            <div className={card}>
              <h1 className="text-5xl font-bold tracking-tight text-gradient sm:text-7xl">
                <KineticName name={personal.name} />
              </h1>
              <RotatingRoles initial={personal.title} />
              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                {personal.summary}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <ContactChip icon={MapPin}>{personal.location}</ContactChip>
                <ContactChip href={`https://${personal.website}`} icon={FolderGit2}>
                  {personal.website}
                </ContactChip>
                <ContactChip href={`mailto:${personal.email}`} icon={Mail}>
                  {personal.email}
                </ContactChip>
              </div>
            </div>
          </Reveal>

          {/* Status + clock */}
          <Reveal delay={80}>
            <div className={`${card} flex h-full flex-col justify-between gap-4`}>
              <div>
                {personal.available && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-300">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-brand-500 animate-pulse-ring" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
                    </span>
                    Available
                  </div>
                )}
                <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                  {personal.status}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-200">
                <Clock size={15} className="text-brand-500 dark:text-brand-400" />
                <LiveClock />
                <span className="text-zinc-400 dark:text-zinc-500">IST</span>
              </div>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={120} className="sm:col-span-2">
            <div className="grid h-full grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col justify-center rounded-2xl border border-zinc-200 bg-white/60 p-4 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/40"
                >
                  <span className="text-3xl font-bold tracking-tight text-gradient">
                    <Counter value={s.value} suffix={s.suffix} />
                  </span>
                  <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Currently */}
          <Reveal delay={160}>
            <div className={`${card} flex h-full flex-col gap-3`}>
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                <Zap size={13} /> Currently
              </p>
              <div className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                <BookOpen size={14} className="mt-0.5 shrink-0 text-zinc-400" />
                <span>
                  Building <strong className="font-semibold">{currently.building}</strong>
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                <Sparkles size={14} className="mt-0.5 shrink-0 text-zinc-400" />
                <span>Learning {currently.learning}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ── Tech marquee ── */}
      <div className="relative mb-16 mt-2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-3 pr-3">
          {[...skills, ...skills].map((s, i) => (
            <span
              key={i}
              className="shrink-0 rounded-full border border-zinc-200 bg-white/60 px-3 py-1.5 text-sm font-medium text-zinc-600 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── Skills ── */}
      <section id="skills" className="mx-auto max-w-4xl scroll-mt-20 px-4 pb-16">
        <Reveal>
          <SectionHeading index="01" icon={Sparkles}>Skills</SectionHeading>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div
                key={group.category}
                className="rounded-xl border border-zinc-200 bg-white/60 p-4 backdrop-blur-sm transition-colors hover:border-brand-300 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-brand-500/40"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  {group.category}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Experience (timeline) ── */}
      <section
        id="experience"
        className="mx-auto max-w-4xl scroll-mt-20 px-4 pb-16"
      >
        <Reveal>
          <SectionHeading index="02" icon={Briefcase}>Experience</SectionHeading>
          <Timeline>
            {experience.map((exp) => (
              <li key={exp.role} className="relative">
                <span className="absolute -left-[2.4rem] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-brand-500 dark:border-zinc-950" />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
                      {exp.company}
                    </p>
                  </div>
                  <p className="shrink-0 text-xs text-zinc-500 dark:text-zinc-400">
                    {exp.period} · {exp.location}
                  </p>
                </div>
                <ul className="mt-3 grid gap-2">
                  {exp.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </Timeline>
        </Reveal>
      </section>

      {/* ── Projects ── */}
      <section
        id="projects"
        className="mx-auto max-w-4xl scroll-mt-20 px-4 pb-16"
      >
        <Reveal>
          <SectionHeading index="03" icon={Code2}>Projects</SectionHeading>
          <Projects projects={projects} />
        </Reveal>
      </section>

      {/* ── Education ── */}
      <section className="mx-auto max-w-4xl px-4 pb-16">
        <Reveal>
          <SectionHeading index="04" icon={GraduationCap}>Education</SectionHeading>
          <div className="relative mt-6 border-l border-zinc-200 pl-8 dark:border-zinc-800">
            <div className="relative">
              <span className="absolute -left-[2.4rem] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-brand-500 dark:border-zinc-950" />
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                    {education.school}
                  </h3>
                  <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
                    {education.degree}
                  </p>
                </div>
                <p className="shrink-0 text-xs text-zinc-500 dark:text-zinc-400">
                  {education.year}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Contact / Footer ── */}
      <footer
        id="contact"
        className="border-t border-zinc-200 dark:border-zinc-800"
      >
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Reveal>
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Let&apos;s build something
              </h2>
              <p className="max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
                Looking for a full-stack or AI engineer? I&apos;m open to freelance
                and full-time work — let&apos;s talk.
              </p>
              <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
                <EmailButton />
                <a
                  href={`https://${personal.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:border-brand-300 hover:text-brand-600 dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-brand-500/40 dark:hover:text-brand-400"
                >
                  <FolderGit2 size={15} />
                  GitHub
                </a>
              </div>
              <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
                © {new Date().getFullYear()} {personal.name}
              </p>
            </div>
          </Reveal>
        </div>
      </footer>
    </>
  );
}
