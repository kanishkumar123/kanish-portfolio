import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X, ExternalLink } from "lucide-react";
import { projects, type Project } from "@/lib/projects";
import { easeApple } from "./motion-primitives";
import { SectionHeader } from "./SectionHeader";

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="work" className="relative pt-8 md:pt-12">
      <div className="container-x">
        <SectionHeader
          index="02"
          total="03"
          eyebrow="Selected Work"
          title={
            <>
              <span className="font-sans font-black uppercase tracking-[-0.02em]">
                Products shipped.
              </span>
              <br />
              <span className="font-display italic text-gradient-accent">real outcomes.</span>
            </>
          }
          titleClassName="max-w-4xl"
          description="Four case studies spanning web, mobile, and backend each one a full build from first commit to production handoff."
          meta={<span className="chip">4 case studies · 2023 – 2024</span>}
        />

        <div className="mt-16 md:mt-24 flex flex-col gap-10 md:gap-16">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} onOpen={() => setActive(p)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <CaseStudyModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const flipped = index % 2 === 1;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.02, 1.08]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease: easeApple }}
      className="group relative overflow-hidden rounded-[28px] border border-hairline bg-card"
    >
      <div
        className={"grid gap-0 md:grid-cols-12 " + (flipped ? "md:[&>*:first-child]:order-2" : "")}
      >
        {/* Visual */}
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open ${project.name} case study`}
          className="relative md:col-span-7 aspect-[16/10] md:aspect-auto md:min-h-[460px] overflow-hidden"
        >
          <motion.div
            layoutId={`cover-${project.slug}`}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundSize: "cover, cover",
              backgroundPosition: "center, center",
            }}
          />
          <motion.div
            aria-hidden
            style={{ y: imgY, scale: imgScale }}
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-luminosity"
            initial={false}
          />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute left-6 top-6 flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/80">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: project.accent, boxShadow: `0 0 12px ${project.accent}` }}
            />
            {project.category}
          </div>

          <span className="absolute right-6 top-6 inline-flex h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-xs font-medium text-white backdrop-blur-md transition-all duration-500 group-hover:bg-white group-hover:text-black">
            View case study <ArrowUpRight className="h-3.5 w-3.5" />
          </span>

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <div className="font-sans text-3xl md:text-5xl leading-[0.95] text-white tracking-[-0.02em]">
              {project.name}
            </div>
          </div>
        </button>

        {/* Meta */}
        <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-between gap-10">
          <div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{project.role}</span>
              <span className="tabular-nums">{project.year}</span>
            </div>
            <p className="mt-6 text-xl md:text-2xl font-sans italic text-foreground leading-snug">
              “{project.tagline}”
            </p>
          </div>

          <div>
            <div className="grid grid-cols-3 gap-4 border-t border-hairline pt-6">
              {project.results.slice(0, 3).map((r) => (
                <div key={r.label}>
                  <div className="text-xl md:text-2xl font-semibold tracking-tight tabular-nums">
                    {r.value}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {r.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.slice(0, 5).map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.55, ease: easeApple }}
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-x-0 bottom-0 top-6 md:top-10 mx-auto max-w-6xl overflow-hidden rounded-t-[28px] md:rounded-[28px] border border-hairline bg-background"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-hairline bg-background/80 px-6 py-4 backdrop-blur-md md:px-10">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
              {project.category} · {project.year}
            </div>
            <div className="mt-1 truncate text-lg font-medium">{project.name}</div>
          </div>
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-primary !py-2.5 !px-5 text-xs shrink-0"
              >
                Visit site <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            <button
              aria-label="Close case study"
              onClick={onClose}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/*
          data-lenis-prevent tells Lenis (global smooth-scroll) to ignore wheel/touch
          events originating inside this element, so native overflow-y scroll works
          instead of the background page scrolling. overscroll-behavior: contain is
          a native-scroll backup that stops scroll chaining to the page behind it.
        */}
        <div
          data-lenis-prevent
          className="max-h-[calc(100svh-100px)] overflow-y-auto overscroll-contain"
        >
          <motion.div
            layoutId={`cover-${project.slug}`}
            className="relative h-[46vh] w-full"
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundSize: "cover, cover",
              backgroundPosition: "center, center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-end p-4 md:p-8">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {project.stack.slice(0, 4).map((s) => (
                    <span key={s} className="chip !bg-white/10 !text-white !border-white/20">
                      {s}
                    </span>
                  ))}
                </div>
                <h3 className="mt-5 font-sans text-xl md:text-xl italic tracking-[-0.02em] max-w-3xl text-white">
                  {project.tagline}
                </h3>
              </div>
            </div>
          </motion.div>

          <div className="px-6 py-10 md:px-14 md:py-16 grid gap-14 md:grid-cols-12">
            <aside className="md:col-span-4 md:sticky md:top-24 h-fit">
              <dl className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm">
                <MetaBlock label="Role" value={project.role} />
                <MetaBlock label="Duration" value={project.duration} />
                <MetaBlock label="Year" value={project.year} />
                <MetaBlock label="Category" value={project.category} />
              </dl>

              <div className="mt-10 rounded-2xl hairline p-5 surface-tint">
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  Results
                </div>
                <div className="mt-4 flex flex-col gap-4">
                  {project.results.map((r) => (
                    <div
                      key={r.label}
                      className="flex items-baseline justify-between border-b border-hairline pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-sm text-muted-foreground">{r.label}</span>
                      <span className="text-xl font-semibold text-accent tabular-nums">
                        {r.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="md:col-span-8 flex flex-col gap-12">
              <Block title="The problem">{project.problem}</Block>
              <Block title="The goal">{project.goal}</Block>
              <Block title="Solution">{project.solution}</Block>

              <div>
                <BlockTitle>Key features</BlockTitle>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <BlockTitle>Process</BlockTitle>
                <ol className="mt-4 flex flex-col gap-3">
                  {project.process.map((p, i) => (
                    <li key={p} className="flex gap-4 rounded-xl hairline p-4 surface-tint">
                      <span className="text-xs text-muted-foreground w-6 shrink-0 tabular-nums">
                        0{i + 1}
                      </span>
                      <span className="text-sm">{p}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <BlockTitle>Challenges</BlockTitle>
                <ul className="mt-4 flex flex-col gap-2">
                  {project.challenges.map((c) => (
                    <li key={c} className="text-sm text-muted-foreground">
                      — {c}
                    </li>
                  ))}
                </ul>
              </div>

              <Block title="Business impact">{project.impact}</Block>

              <div className="rounded-2xl border border-accent/20 bg-accent/[0.06] p-6 md:p-8">
                <div className="text-sm text-muted-foreground">Interested in similar work?</div>
                <div className="mt-2 flex items-center justify-between gap-4 flex-wrap">
                  <div className="text-xl font-medium">Let's talk about your project.</div>
                  <a href="#contact" onClick={onClose} className="btn-primary">
                    Start a project <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MetaBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className="mt-1.5 text-sm">{value}</dd>
    </div>
  );
}
function BlockTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-[11px] uppercase tracking-widest text-muted-foreground">{children}</h4>
  );
}
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <BlockTitle>{title}</BlockTitle>
      <p className="mt-3 text-lg md:text-xl leading-relaxed">{children}</p>
    </div>
  );
}
