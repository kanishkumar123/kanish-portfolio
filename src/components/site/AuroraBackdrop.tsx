import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Ambient animated aurora — pure CSS radial gradients on drifting layers.
 * Paused when tab hidden or when reduced-motion is preferred.
 */
export function AuroraBackdrop() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onVis = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const animate = !reduced && visible;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className={
          "absolute -top-40 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full blur-3xl " +
          (animate ? "animate-aurora" : "")
        }
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent-ink) 55%, transparent) 0%, transparent 60%)",
          opacity: 0.35,
        }}
      />
      <div
        className={
          "absolute top-1/3 -right-40 h-[60vh] w-[60vh] rounded-full blur-3xl " +
          (animate ? "animate-aurora" : "")
        }
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent-2) 55%, transparent) 0%, transparent 60%)",
          opacity: 0.28,
          animationDelay: "-8s",
          animationDuration: "28s",
        }}
      />
      <div
        className={
          "absolute bottom-0 left-0 h-[40vh] w-[40vh] rounded-full blur-3xl " +
          (animate ? "animate-aurora" : "")
        }
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent-ink) 40%, transparent) 0%, transparent 65%)",
          opacity: 0.22,
          animationDelay: "-14s",
          animationDuration: "34s",
        }}
      />
      {/* fade into page background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 55%, var(--color-background) 100%)",
        }}
      />
      {/* film grain */}
      <div className="noise-overlay" />
    </div>
  );
}
