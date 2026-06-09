import {
  personal,
  skills,
  experience,
  projects,
  education,
} from "@/lib/data";
import Nav from "@/components/nav";
import {
  ExternalLink,
  FolderGit2,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Code2,
} from "lucide-react";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
      <span className="h-5 w-0.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
      {children}
    </h2>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <Nav />

      {/* ── Hero ── */}
      <header className="mx-auto max-w-3xl px-4 pt-20 pb-12">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {personal.name}
          </h1>
          <p className="mt-1 text-xl text-zinc-500 dark:text-zinc-400">
            {personal.title}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {personal.location}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <a
              href={`https://${personal.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              <FolderGit2 size={14} />
              {personal.website}
            </a>
            {"portfolio" in personal && personal.portfolio && (
              <>
                <span className="text-zinc-300 dark:text-zinc-700">·</span>
                <a
                  href={`https://${personal.portfolio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  <ExternalLink size={14} />
                  {personal.portfolio}
                </a>
              </>
            )}
            {"email" in personal && personal.email && (
              <>
                <span className="text-zinc-300 dark:text-zinc-700">·</span>
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  <Mail size={14} />
                  {personal.email}
                </a>
              </>
            )}
            {"phone" in personal && personal.phone && (
              <>
                <span className="text-zinc-300 dark:text-zinc-700">·</span>
                <a
                  href={`tel:${String(personal.phone).replace(/\s/g, "")}`}
                  className="flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  <Phone size={14} />
                  {personal.phone}
                </a>
              </>
            )}
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {personal.summary}
        </p>
      </header>

      {/* ── Skills ── */}
      <section id="skills" className="mx-auto max-w-3xl px-4 pb-16 scroll-mt-16">
        <SectionHeading>Skills</SectionHeading>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>
      </section>

      {/* ── Experience ── */}
      <section
        id="experience"
        className="mx-auto max-w-3xl px-4 pb-16 scroll-mt-16"
      >
        <SectionHeading>
          <Briefcase size={16} />
          Experience
        </SectionHeading>
        <div className="mt-6">
          {experience.map((exp) => (
            <div key={exp.role}>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-zinc-500">{exp.company}</p>
                </div>
                <p className="mt-1 shrink-0 text-xs text-zinc-400 sm:mt-0">
                  {exp.period} · {exp.location}
                </p>
              </div>
              <ul className="mt-4 grid gap-2">
                {exp.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Projects ── */}
      <section
        id="projects"
        className="mx-auto max-w-3xl px-4 pb-16 scroll-mt-16"
      >
        <SectionHeading>
          <Code2 size={16} />
          Projects
        </SectionHeading>
        <div className="mt-6 grid gap-6">
          {projects.map((project) => (
            <article
              key={project.name}
              className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {project.name}
                </h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 shrink-0 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="mt-3 grid gap-1.5">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                  >
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── Education ── */}
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <SectionHeading>
          <GraduationCap size={16} />
          Education
        </SectionHeading>
        <div className="mt-6">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {education.school}
              </h3>
              <p className="text-sm text-zinc-500">{education.degree}</p>
            </div>
            <p className="mt-1 shrink-0 text-xs text-zinc-400 sm:mt-0">
              {education.year}
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact / Footer ── */}
      <footer
        id="contact"
        className="border-t border-zinc-200 dark:border-zinc-800"
      >
        <div className="mx-auto max-w-3xl px-4 py-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-lg font-semibold">Get in touch</h2>
            <p className="max-w-sm text-sm text-zinc-500">
              Looking for a full-stack engineer in Hyderabad? Let's talk.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {"email" in personal && personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                >
                  <Mail size={15} />
                  Email
                </a>
              )}
              {"phone" in personal && personal.phone && (
                <a
                  href={`tel:${String(personal.phone).replace(/\s/g, "")}`}
                  className="flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                >
                  <Phone size={15} />
                  {personal.phone}
                </a>
              )}
              <a
                href={`https://${personal.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
              >
                <FolderGit2 size={15} />
                GitHub
              </a>
            </div>
            <p className="mt-4 text-xs text-zinc-400">
              © {new Date().getFullYear()} {personal.name}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
