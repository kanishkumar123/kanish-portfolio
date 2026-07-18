import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, easeApple } from "./motion-primitives";
import { SectionHeader } from "./SectionHeader";

const STEPS = [
  {
    n: "01",
    title: "Discovery",
    copy: "We map the business goal, users, and constraints. You leave the call knowing what to build first.",
  },
  {
    n: "02",
    title: "Design",
    copy: "I sketch flows and design a system, not just screens. You approve the direction before code starts.",
  },
  {
    n: "03",
    title: "Build",
    copy: "Weekly demos, always-deployable branches, and a clear changelog. No black boxes.",
  },
  {
    n: "04",
    title: "Launch",
    copy: "We ship with monitoring, analytics, and SEO in place not bolted on after.",
  },
  {
    n: "05",
    title: "Iterate",
    copy: "Ongoing improvements based on real usage data. The product keeps compounding value.",
  },
];

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="process" className="relative pt-8 md:pt-12">
      <div className="container-x">
        <SectionHeader
          index="02"
          total="03"
          eyebrow="Process"
          title={
            <>
              <span className="font-sans font-black uppercase tracking-[-0.02em]">
                Built with clarity.
              </span>
              <br />
              <span className="font-display italic text-gradient-accent">Every step.</span>
            </>
          }
          titleClassName="max-w-4xl"
          description="You get one accountable partner, weekly demos, and a clear scope. Every engagement is designed to feel like working with a senior in-house team."
        />

        <div ref={ref} className="relative mt-16 md:mt-24 pl-6 md:pl-0">
          {/* Rail */}
          <div className="absolute left-2.5 top-2 bottom-2 w-px bg-foreground/10 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-2.5 top-2 w-px origin-top bg-gradient-to-b from-accent via-accent/60 to-accent-2 md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="flex flex-col gap-14 md:gap-24">
            {STEPS.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <li key={s.n} className="relative md:grid md:grid-cols-2 md:gap-16">
                  <span className="absolute left-2.5 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_20px_var(--color-accent-ink)] md:left-1/2" />
                  <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.9, ease: easeApple }}
                    className={
                      "rounded-3xl hairline bg-card p-7 md:p-8 " +
                      (right ? "md:col-start-2" : "md:col-start-1")
                    }
                  >
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>Step</span>
                      <span className="h-px w-6 bg-foreground/10" />

                      <span className="font-mono tabular-nums">{s.n}</span>
                    </div>
                    <h3 className="mt-4 font-sans uppercase text-3xl md:text-4xl leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{s.copy}</p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
