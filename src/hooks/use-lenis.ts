import { useEffect } from "react";

/**
 * Lenis smooth-scroll wrapper, synced with GSAP ScrollTrigger for
 * buttery pinned/scroll-driven animations (Hero cinematic backdrop).
 * Runs client-side only.
 */
export function useLenis() {
  useEffect(() => {
    let raf = 0;
    let lenis: import("lenis").default | null = null;
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, gsapMod, stMod] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      const gsap = gsapMod.default ?? gsapMod;
      const ScrollTrigger = stMod.ScrollTrigger ?? (stMod as any).default;
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      });

      // Drive ScrollTrigger from Lenis for perfect sync
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time: number) => {
        lenis?.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
}
