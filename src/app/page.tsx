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
import SectionRail from "@/components/section-rail";
import CommandPalette from "@/components/command-palette";
import EmailButton from "@/components/email-button";
import { ArrowUpRight, MapPin, Mail } from "lucide-react";

const Label = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`font-mono text-[11px] uppercase tracking-[0.18em] ${className}`}
  >
    {children}
  </span>
);


export default function Home() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <SectionRail />
      <CommandPalette />
      <Nav />

      <main className="relative min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
        {/* ── Hero ── */}
        <section className="grid min-h-[92vh] grid-cols-1 border-b border-zinc-950 dark:border-zinc-50 lg:grid-cols-12">
          <div className="flex flex-col justify-between border-b border-zinc-950 p-6 dark:border-zinc-50 lg:col-span-7 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between">
              <Label>Portfolio / {new Date().getFullYear()}</Label>
              <div className="flex items-center gap-2 text-zinc-500">
                <MapPin size={12} />
                <Label>{personal.location}</Label>
              </div>
            </div>

            <div>
              <h1 className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.82] tracking-tighter">
                {personal.name.split(" ").map((part, i, arr) => (
                  <span key={i} className="block">
                    {part}
                    {i < arr.length - 1 ? "" : "."}
                  </span>
                ))}
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                {personal.summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Label
                className={`inline-flex items-center gap-2 ${
                  personal.available ? "text-zinc-950 dark:text-zinc-50" : "text-zinc-400"
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
              </Label>
              <a
                href={`mailto:${personal.email}`}
                className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50"
              >
                <Mail size={12} />
                {personal.email}
                <ArrowUpRight
                  size={12}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 lg:col-span-5">
            <div className="space-y-10">
              <div>
                <Label className="mb-2 block text-zinc-400">Role</Label>
                <p className="text-2xl font-medium leading-tight tracking-tight">
                  {personal.title}
                </p>
              </div>
              <div>
                <Label className="mb-2 block text-zinc-400">Building</Label>
                <p className="text-xl font-medium">{currently.building}</p>
                <p className="mt-1 text-zinc-500">
                  Learning {currently.learning}
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-px border border-zinc-950 bg-zinc-950 dark:border-zinc-50 dark:bg-zinc-50">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white p-5 dark:bg-zinc-950"
                >
                  <p className="text-3xl font-bold tracking-tight">
                    {s.value}
                    {s.suffix}
                  </p>
                  <Label className="text-zinc-400">{s.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Skills ── */}
        <section
          id="skills"
          className="border-b border-zinc-950 dark:border-zinc-50"
        >
          <div className="grid lg:grid-cols-12">
            <div className="border-b border-zinc-950 p-6 dark:border-zinc-50 lg:col-span-2 lg:border-b-0 lg:border-r">
              <Label className="sticky top-24 block text-zinc-400">
                01 — Skills
              </Label>
            </div>
            <div className="p-6 lg:col-span-10">
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {skillGroups.map((g) => (
                  <div key={g.category}>
                    <Label className="mb-3 block text-zinc-400">
                      {g.category}
                    </Label>
                    <p className="text-lg font-medium leading-snug">
                      {g.items.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Experience ── */}
        <section
          id="experience"
          className="border-b border-zinc-950 dark:border-zinc-50"
        >
          <div className="grid lg:grid-cols-12">
            <div className="border-b border-zinc-950 p-6 dark:border-zinc-50 lg:col-span-2 lg:border-b-0 lg:border-r">
              <Label className="sticky top-24 block text-zinc-400">
                02 — Experience
              </Label>
            </div>
            <div className="p-6 lg:col-span-10">
              {experience.map((exp) => (
                <div
                  key={exp.role}
                  className="grid gap-4 border-b border-zinc-200 py-8 last:border-0 dark:border-zinc-800 sm:grid-cols-12"
                >
                  <div className="sm:col-span-4">
                    <p className="text-lg font-semibold tracking-tight">
                      {exp.role}
                    </p>
                    <p className="text-zinc-500">{exp.company}</p>
                  </div>
                  <div className="sm:col-span-5">
                    <ul className="space-y-2">
                      {exp.bullets.map((b) => (
                        <li
                          key={b}
                          className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300"
                        >
                          — {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="sm:col-span-3">
                    <Label className="block text-zinc-400">{exp.period}</Label>
                    <Label className="block text-zinc-400">
                      {exp.location}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section
          id="projects"
          className="border-b border-zinc-950 dark:border-zinc-50"
        >
          <div className="grid lg:grid-cols-12">
            <div className="border-b border-zinc-950 p-6 dark:border-zinc-50 lg:col-span-2 lg:border-b-0 lg:border-r">
              <Label className="sticky top-24 block text-zinc-400">
                03 — Projects
              </Label>
            </div>
            <div className="lg:col-span-10">
              {projects.map((p, i) => (
                <a
                  key={p.name}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid items-start gap-4 border-b border-zinc-200 p-6 transition-colors last:border-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 sm:grid-cols-12"
                >
                  <div className="sm:col-span-1">
                    <Label className="text-zinc-400">
                      {String(i + 1).padStart(2, "0")}
                    </Label>
                  </div>
                  <div className="sm:col-span-5">
                    <p className="text-xl font-semibold tracking-tight group-hover:underline">
                      {p.name}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                      {p.stack.map((t) => (
                        <Label key={t} className="text-zinc-400">
                          {t}
                        </Label>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-5">
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                      {p.highlights[0]}
                    </p>
                  </div>
                  <div className="sm:col-span-1 flex justify-end">
                    <ArrowUpRight
                      size={18}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Education / Contact ── */}
        <section
          id="contact"
          className="border-b border-zinc-950 dark:border-zinc-50"
        >
          <div className="grid lg:grid-cols-12">
            <div className="border-b border-zinc-950 p-6 dark:border-zinc-50 lg:col-span-2 lg:border-b-0 lg:border-r">
              <Label className="sticky top-24 block text-zinc-400">
                04 — Info
              </Label>
            </div>
            <div className="p-6 lg:col-span-10">
              <div className="grid gap-10 sm:grid-cols-2">
                <div>
                  <Label className="mb-2 block text-zinc-400">Education</Label>
                  <p className="text-lg font-medium">{education.school}</p>
                  <p className="text-zinc-500">
                    {education.degree} · {education.year}
                  </p>
                </div>
                <div>
                  <Label className="mb-2 block text-zinc-400">Contact</Label>
                  <EmailButton />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <Label className="text-zinc-400">
            © {new Date().getFullYear()} {personal.name}
          </Label>
          <div className="flex items-center gap-6">
            <a
              href={`https://${personal.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1"
            >
              <Label className="text-zinc-400 transition-colors group-hover:text-zinc-950 dark:group-hover:text-zinc-50">
                GitHub
              </Label>
              <ArrowUpRight
                size={12}
                className="text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="group inline-flex items-center gap-1"
            >
              <Label className="text-zinc-400 transition-colors group-hover:text-zinc-950 dark:group-hover:text-zinc-50">
                Email
              </Label>
              <ArrowUpRight
                size={12}
                className="text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
