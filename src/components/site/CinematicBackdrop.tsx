import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { type RefObject } from "react";

/**
 * Cinematic scroll-driven backdrop: a perspective grid floor, drifting
 * light domes, and floating glass UI panels that "assemble" as the user
 * scrolls the pinned hero. All transforms are GPU-accelerated (translate3d
 * / scale / opacity). Pauses under reduced-motion.
 */
export function CinematicBackdrop({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Camera / atmosphere
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-32%"]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.55, 0.35, 0]);
  const domeScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const domeOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0]);
  const vignette = useTransform(scrollYProgress, [0, 1], [0.35, 0.85]);

  if (reduced) {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <StaticGradient />
        <VignetteStatic />
      </div>
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Deep atmospheric gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: domeOpacity,
          background:
            "radial-gradient(60% 45% at 50% 42%, color-mix(in oklab, var(--color-accent-ink) 24%, transparent) 0%, transparent 65%), radial-gradient(70% 55% at 75% 15%, color-mix(in oklab, var(--color-accent-2) 18%, transparent) 0%, transparent 60%), radial-gradient(65% 55% at 20% 85%, color-mix(in oklab, var(--color-accent-ink) 14%, transparent) 0%, transparent 65%)",
        }}
      />

      {/* Perspective grid floor */}
      <motion.div
        className="absolute inset-x-0 bottom-[-10%] h-[70%] origin-bottom"
        style={{
          y: gridY,
          opacity: gridOpacity,
          transform: "perspective(900px) rotateX(62deg)",
          transformOrigin: "50% 100%",
          backgroundImage:
            "linear-gradient(color-mix(in oklab, var(--color-foreground) 22%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--color-foreground) 22%, transparent) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(60% 70% at 50% 40%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(60% 70% at 50% 40%, black 20%, transparent 75%)",
        }}
      />

      {/* Light dome behind headline */}
      <motion.div
        className="absolute left-1/2 top-[38%] h-[65vh] w-[85vw] max-w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
        style={{
          scale: domeScale,
          opacity: domeOpacity,
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-accent-ink) 55%, transparent), transparent 70%)",
        }}
      />

      {/* Floating glass panels — assemble on scroll */}
      <GlassPanel progress={scrollYProgress} from={{ x: -30, y: -18, rot: -14, z: -240 }} to={{ x: -10, y: -6, rot: -4, z: -40 }} className="left-[6%] top-[22%] h-40 w-64 md:h-48 md:w-80" />
      <GlassPanel progress={scrollYProgress} from={{ x: 32, y: -22, rot: 12, z: -320 }} to={{ x: 8, y: -8, rot: 3, z: -60 }} className="right-[8%] top-[18%] h-32 w-52 md:h-40 md:w-72" />
      <GlassPanel progress={scrollYProgress} from={{ x: -22, y: 24, rot: 8, z: -180 }} to={{ x: -4, y: 6, rot: 2, z: -20 }} className="left-[14%] bottom-[16%] h-28 w-44 md:h-36 md:w-64" />
      <GlassPanel progress={scrollYProgress} from={{ x: 28, y: 30, rot: -10, z: -280 }} to={{ x: 6, y: 8, rot: -3, z: -50 }} className="right-[10%] bottom-[20%] h-36 w-56 md:h-44 md:w-72" />

      {/* Vignette for text legibility */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: vignette,
          background:
            "radial-gradient(ellipse at center, transparent 40%, var(--color-background) 100%)",
        }}
      />

      {/* Bottom fade into next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--color-background) 100%)",
        }}
      />

      {/* Film grain */}
      <div className="noise-overlay" />
    </div>
  );
}

function GlassPanel({
  progress,
  from,
  to,
  className,
}: {
  progress: MotionValue<number>;
  from: { x: number; y: number; rot: number; z: number };
  to: { x: number; y: number; rot: number; z: number };
  className: string;
}) {
  const x = useTransform(progress, [0, 1], [from.x, to.x]);
  const y = useTransform(progress, [0, 1], [from.y, to.y]);
  const rotate = useTransform(progress, [0, 1], [from.rot, to.rot]);
  const z = useTransform(progress, [0, 1], [from.z, to.z]);
  const opacity = useTransform(progress, [0, 0.15, 0.85, 1], [0, 0.9, 0.7, 0]);

  return (
    <motion.div
      className={"absolute rounded-2xl border will-change-transform " + className}
      style={{
        x: useTransform(x, (v) => `${v}%`),
        y: useTransform(y, (v) => `${v}%`),
        rotate,
        z,
        opacity,
        borderColor: "color-mix(in oklab, var(--color-foreground) 18%, transparent)",
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--color-foreground) 8%, transparent), color-mix(in oklab, var(--color-foreground) 2%, transparent))",
        backdropFilter: "blur(14px) saturate(140%)",
        WebkitBackdropFilter: "blur(14px) saturate(140%)",
        boxShadow: "0 30px 80px -30px rgba(0,0,0,0.5)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Faint UI hint inside the panel */}
      <div className="absolute inset-0 p-3 flex flex-col gap-2">
        <div className="h-2 w-1/3 rounded-full bg-foreground/20" />
        <div className="h-1.5 w-2/3 rounded-full bg-foreground/10" />
        <div className="mt-auto flex gap-1.5">
          <span className="h-1.5 w-8 rounded-full bg-foreground/15" />
          <span className="h-1.5 w-5 rounded-full bg-foreground/10" />
        </div>
      </div>
    </motion.div>
  );
}

function StaticGradient() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(60% 45% at 50% 40%, color-mix(in oklab, var(--color-accent-ink) 18%, transparent), transparent 65%)",
      }}
    />
  );
}
function VignetteStatic() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 45%, var(--color-background) 100%)",
      }}
    />
  );
}
