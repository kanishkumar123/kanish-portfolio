"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CinematicSequence, type CinematicSequenceHandle } from "./CinematicSequence";
import { useImageSequence } from "./useImageSequence";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 192;
const HERO_HEIGHT_VH = 350;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const sequenceHandleRef = useRef<CinematicSequenceHandle>(null);

  const scrollProgress = useMotionValue(0);

  const { imagesRef, isReady, loadProgress } = useImageSequence({
    basePath: "/frame_",
    frameCount: FRAME_COUNT,
    digits: 6,
    extension: "jpg",
    preloadCount: 36,
  });

  // ---- The "Black Screen" Fix ------------------------------------------
  useEffect(() => {
    if (isReady && sequenceHandleRef.current) {
      sequenceHandleRef.current.draw(scrollProgress.get());
    }
  }, [isReady, scrollProgress]);

  const fallbackOpacity = useTransform(scrollProgress, [0, 0.02], [1, 0]);

  // ---- Adjusted Scroll-Linked Subtitle Fades ---------------------------
  // All three lines share one fixed-size box (see markup) so they sit at
  // exactly the same vertical anchor regardless of which one is showing.
  const text1Opacity = useTransform(scrollProgress, [0, 0.05, 0.2, 0.25], [1, 1, 1, 0]);
  const text2Opacity = useTransform(scrollProgress, [0.3, 0.35, 0.5, 0.55], [0, 1, 1, 0]);
  const text3Opacity = useTransform(scrollProgress, [0.6, 0.65, 0.9, 0.95], [0, 1, 1, 0]);
  // CTA fades on the same schedule as line 3, but lives in its own block
  // below — so it never pushes the text upward the way a shared flex
  // column would.
  const ctaOpacity = text3Opacity;

  // ---- Scroll-Linked Color Grade ---------------------------------------
  const gradeColor = useTransform(
    scrollProgress,
    [0, 1],
    ["rgba(255, 180, 50, 0.12)", "rgba(15, 40, 120, 0.35)"],
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 0.4,
        onUpdate: (self) => {
          sequenceHandleRef.current?.draw(self.progress);
          scrollProgress.set(self.progress);
        },
      });
      return () => trigger.kill();
    }, section);

    return () => ctx.revert();
  }, [scrollProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full"
      style={{ height: `${HERO_HEIGHT_VH}svh` }}
      aria-label="Introduction"
    >
      <div className="sticky top-0 flex h-[100svh] w-full flex-col justify-center overflow-hidden bg-black">
        {/* Cinematic Loading Screen */}
        <AnimatePresence>
          {!isReady && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
            >
              <div className="flex w-64 flex-col items-center gap-6">
                <div className="h-[2px] w-full overflow-hidden bg-white/10">
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: `${loadProgress * 100}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                  Loading Sequence — {Math.round(loadProgress * 100)}%
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fallback Still Frame */}
        <motion.img
          src="/sequence/frame_000000.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: fallbackOpacity }}
        />

        {/* Cinematic Sequence */}
        <CinematicSequence
          ref={sequenceHandleRef}
          imagesRef={imagesRef}
          frameCount={FRAME_COUNT}
          className="absolute inset-0 h-full w-full"
        />

        {/* Dynamic Color Grade Overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 mix-blend-overlay transition-colors"
          style={{ backgroundColor: gradeColor }}
        />

        {/* Film grain & Vignette */}
        <div className="pointer-events-none absolute inset-0 hero-grain opacity-[0.05] mix-blend-overlay" />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Subtitles — lowered slightly, and all three lines share one
            fixed-size, identically-centered box so "Let's build..." sits
            at the exact same spot "Because they're worth stopping for."
            did. The CTA below is a fully separate block, faded on the
            same schedule but never sharing layout with the text. */}
        <div className="pointer-events-none absolute bottom-24 left-0 right-0 z-20 flex justify-center px-4 md:bottom-33">
          <div className="relative flex h-10 w-full items-center justify-center md:h-12">
            <motion.p
              style={{ opacity: text1Opacity }}
              className="absolute inset-0 flex items-center justify-center text-center text-xl font-medium tracking-[0.03em] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:text-2xl md:text-3xl"
            >
              We never get tired of sunsets.
            </motion.p>

            <motion.p
              style={{ opacity: text2Opacity }}
              className="absolute inset-0 flex items-center justify-center text-center text-xl font-medium tracking-[0.03em] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:text-2xl md:text-3xl"
            >
              Because they're worth stopping for.
            </motion.p>

            <motion.p
              style={{ opacity: text3Opacity }}
              className="absolute inset-0 flex items-center justify-center text-center text-xl font-medium tracking-[0.03em] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:text-2xl md:text-3xl"
            >
              Let's build something people remember.
            </motion.p>
          </div>
        </div>

        {/* CTA — timecode-style scrubber links. Each one reads like a
            chapter marker off the sequence itself: a monospace frame
            number, the label, and a thin track that fills left-to-right
            on hover — the same visual language as the loading bar above,
            so the "progress fill" motif carries through the whole hero
            instead of being a one-off loading-screen detail. */}
        <motion.div
          style={{ opacity: ctaOpacity }}
          className="pointer-events-none absolute bottom-10 left-0 right-0 z-20 flex justify-center px-4 md:bottom-14"
        >
          <div className="pointer-events-auto flex items-center gap-10 sm:gap-14">
            <ScrubberLink label="Selected Work" href="#work" />
            <span className="h-8 w-px bg-white/15" aria-hidden="true" />
            <ScrubberLink label="Start a Project" href="#contact" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ScrubberLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="group flex flex-col items-start gap-2.5 transition-transform duration-300 ease-out hover:-translate-y-0.5"
    >
      <span className="flex items-baseline gap-2.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/85 transition-colors duration-300 group-hover:text-white">
          {label}
        </span>
      </span>
      <span className="relative h-px w-full min-w-[6.5rem] overflow-hidden bg-white/15">
        <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
      </span>
    </a>
  );
}
