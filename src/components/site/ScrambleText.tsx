import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#________";

/**
 * Scrambles characters in and reveals the final text once the element is in view.
 * Locks-in per character over `duration` ms.
 */
export function ScrambleText({
  text,
  className,
  duration = 700,
  delay = 0,
}: {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
}) {
  const [display, setDisplay] = useState<string>(() => text);
  const started = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDisplay(text);
      return;
    }
    let raf = 0;
    let start = 0;
    let cancelled = false;

    const run = () => {
      if (started.current) return;
      started.current = true;

      const tick = (t: number) => {
        if (cancelled) return;
        if (!start) start = t;
        const elapsed = t - start - delay;
        if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
        const progress = Math.min(1, elapsed / duration);
        const locked = Math.floor(progress * text.length);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          if (i < locked || text[i] === " ") out += text[i];
          else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setDisplay(out);
        if (progress < 1) raf = requestAnimationFrame(tick);
        else setDisplay(text);
      };
      raf = requestAnimationFrame(tick);
    };

    // Start on mount (hero is above the fold)
    run();
    return () => { cancelled = true; cancelAnimationFrame(raf); };
  }, [text, duration, delay, reduced]);

  return <span className={className} aria-label={text}>{display}</span>;
}
