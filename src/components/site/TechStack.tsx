import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { easeApple } from "./motion-primitives";
import { SectionHeader } from "./SectionHeader";

const GROUPS = {
  Frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Vite",
    "Framer Motion",
    "GSAP",
  ],

  Backend: ["PHP", "Laravel", "Node.js", "REST APIs", "Firebase Functions", "Google Sheets API"],

  Data: ["MySQL", "MongoDB", "PostgreSQL", "Supabase", "Firebase"],

  Mobile: ["React Native", "Flutter", "Expo", "Android", "iOS"],

  Tools: ["Git", "GitHub", "Postman", "VS Code", "Figma", "Python"],

  Expertise: [
    "SEO",
    "Performance",
    "Responsive Design",
    "Accessibility",
    "UI / UX",
    "Process Automation",
  ],
} as const;
type Group = keyof typeof GROUPS;

export function TechStack() {
  const groups = Object.keys(GROUPS) as Group[];
  const [active, setActive] = useState<Group>(groups[0]);

  return (
    <section id="stack" className="relative pt-8 md:pt-12">
      <div className="container-x">
        <SectionHeader
          index="03"
          total="03"
          eyebrow="Stack"
          title={
            <>
              <span className="font-sans font-black uppercase tracking-[-0.02em]">
                A modern toolkit.
              </span>
              <br />
              <span className="font-display italic text-gradient-accent">Chosen for outcomes.</span>
            </>
          }
          titleClassName="max-w-4xl"
          description="I use battle tested tools that keep products fast, maintainable, and easy to hand back to your team."
        />

        <div className="mt-14 md:mt-20">
          <div className="flex flex-wrap gap-2">
            {groups.map((g) => (
              <button
                key={g}
                onClick={() => setActive(g)}
                aria-pressed={active === g}
                className={
                  "rounded-full px-4 py-2 text-sm transition-all " +
                  (active === g
                    ? "bg-foreground text-background"
                    : "hairline text-muted-foreground hover:text-foreground")
                }
              >
                {g}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {GROUPS[active].map((t, i) => (
              <TiltChip key={t} label={t} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TiltChip({ label, index }: { label: string; index: number }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 18 });
  const sry = useSpring(ry, { stiffness: 220, damping: 18 });
  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 10);
    rx.set(-(py - 0.5) * 10);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeApple, delay: index * 0.03 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="rounded-2xl hairline surface-tint px-5 py-6 text-sm transition-colors hover:surface-tint-strong"
    >
      <div className="flex items-center justify-between">
        <span>{label}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      </div>
    </motion.div>
  );
}
