"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, X, ExternalLink } from "lucide-react";

import { CinematicSequence, type CinematicSequenceHandle } from "./CinematicSequence";
import { useImageSequence } from "./useImageSequence";
import { easeApple } from "./motion-primitives";
import { projects, type Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 192;
// Massive 1000vh track ensures the user has a luxurious, slow scroll through all projects
const SEQUENCE_HEIGHT_VH = 1000;

export function HeroProjectsSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const sequenceHandleRef = useRef<CinematicSequenceHandle>(null);
  const scrollProgress = useMotionValue(0);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const { imagesRef, isReady, loadProgress } = useImageSequence({
    basePath: "/frame_", // Ensure this path is correct for your project
    frameCount: FRAME_COUNT,
    digits: 6,
    extension: "jpg",
    preloadCount: 36,
  });

  useEffect(() => {
    if (isReady && sequenceHandleRef.current) {
      sequenceHandleRef.current.draw(0);
    }
  }, [isReady]);

  const fallbackOpacity = useTransform(scrollProgress, [0, 0.02], [1, 0]);

  // ---- 1. Subtitles (0% to 35%) ----
  const text1Opacity = useTransform(scrollProgress, [0.02, 0.05, 0.12, 0.15], [0, 1, 1, 0]);
  const text2Opacity = useTransform(scrollProgress, [0.17, 0.2, 0.27, 0.3], [0, 1, 1, 0]);
  const text3Opacity = useTransform(scrollProgress, [0.32, 0.34, 0.38, 0.4], [0, 1, 1, 0]);

  // ---- 2. The Film Reel Shrink (40% to 50%) ----
  // Shrinks to a 76vw x 60vh card, pushed down to 25vh to clear the navbar beautifully.
  const heroClipPath = useTransform(
    scrollProgress,
    [0.4, 0.5],
    ["inset(0vh 0vw 0vh 0vw round 0px)", "inset(25vh 12vw 15vh 12vw round 24px)"],
  );

  // Subtly darkens the video once it becomes a thumbnail
  const heroOverlayOpacity = useTransform(scrollProgress, [0.4, 0.5], [0, 0.4]);

  // The "SELECTED WORK" title fades in at the top and stays pinned
  const titleOpacity = useTransform(scrollProgress, [0.42, 0.5], [0, 1]);
  const titleY = useTransform(scrollProgress, [0.42, 0.5], [20, 0]);

  // ---- 3. The Horizontal Unified Scroll (50% to 100%) ----
  // Mathematically locked shift: 76vw card + 12vw gap = 88vw per project
  const shiftPerCardVW = 88;
  const totalShiftVW = projects.length * shiftPerCardVW;

  // The ENTIRE track (Hero + Projects) translates together. Zero drift.
  const trackX = useTransform(scrollProgress, [0.5, 1], ["0vw", `-${totalShiftVW}vw`]);

  useEffect(() => {
    if (activeProject) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [activeProject]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Heavy smoothing applied
        onUpdate: (self) => {
          scrollProgress.set(self.progress);

          // CRITICAL GPU FIX: Stop drawing the canvas at 38% progress, right BEFORE
          // the clip-path shrink starts at 40%. This eliminates the stutter completely.
          const canvasProgress = Math.min(self.progress / 0.38, 1);
          sequenceHandleRef.current?.draw(canvasProgress);
        },
      });
      return () => trigger.kill();
    }, section);

    return () => ctx.revert();
  }, [scrollProgress]);

  return (
    <section
      ref={sectionRef}
      style={{ height: `${SEQUENCE_HEIGHT_VH}svh` }}
      className="relative bg-black"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black">
        {/* Loading Screen */}
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
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                  Loading Sequence — {Math.round(loadProgress * 100)}%
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Portfolio Title — Pinned independently above the track */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute left-0 right-0 top-[12vh] z-40 flex flex-col items-center justify-center text-white pointer-events-none"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
            Curated Archive
          </span>
          <h2 className="mt-4 font-sans text-4xl font-black uppercase tracking-tight md:text-6xl">
            Selected Work
          </h2>
        </motion.div>

        {/* THE UNIFIED TRACK: Holds both the Hero and the Projects */}
        <motion.div
          style={{ x: trackX }}
          className="absolute top-0 left-0 flex h-full items-center will-change-transform"
        >
          {/* Track Item 1: The Hero Canvas Wrapper */}
          <div className="relative h-[100vh] w-[100vw] shrink-0">
            <motion.div
              style={{ clipPath: heroClipPath }}
              className="absolute inset-0 h-full w-full"
            >
              <motion.img
                src="/sequence/frame_000000.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                style={{ opacity: fallbackOpacity }}
              />
              <CinematicSequence
                ref={sequenceHandleRef}
                imagesRef={imagesRef}
                frameCount={FRAME_COUNT}
                className="absolute inset-0 h-full w-full"
              />
              <div className="pointer-events-none absolute inset-0 hero-grain opacity-[0.05] mix-blend-overlay" />
              <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_20vw_8vw_rgba(0,0,0,0.6)]" />

              <motion.div
                style={{ opacity: heroOverlayOpacity }}
                className="pointer-events-none absolute inset-0 bg-black"
              />

              {/* Subtitles */}
              <div className="absolute bottom-24 left-0 right-0 flex justify-center px-4 md:bottom-32">
                <div className="relative flex min-h-[120px] w-full items-end justify-center">
                  <motion.p
                    style={{ opacity: text1Opacity }}
                    className="absolute text-center text-xl font-medium tracking-[0.03em] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:text-2xl md:text-3xl"
                  >
                    Some things can't be rushed.
                  </motion.p>
                  <motion.p
                    style={{ opacity: text2Opacity }}
                    className="absolute text-center text-xl font-medium tracking-[0.03em] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:text-2xl md:text-3xl"
                  >
                    Full stack, mobile, and the details in between.
                  </motion.p>
                  <motion.p
                    style={{ opacity: text3Opacity }}
                    className="absolute text-center text-xl font-medium tracking-[0.03em] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:text-2xl md:text-3xl"
                  >
                    Building products that people remember.
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Track Items 2...N: The Project Cards */}
          {projects.map((project, i) => (
            <div
              key={project.slug}
              onClick={() => setActiveProject(project)}
              // Magic math: The 1st card gets ml-0 because the 12vw gap is provided by the Hero's clip-path!
              className={`group relative h-[60vh] w-[76vw] shrink-0 cursor-pointer overflow-hidden rounded-[24px] bg-zinc-900 border border-white/10 ${
                i === 0 ? "ml-0" : "ml-[12vw]"
              }`}
            >
              <motion.div
                layoutId={`cover-${project.slug}`}
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `${project.cover}, url(${project.image})`,
                  backgroundSize: "cover, cover",
                  backgroundPosition: "center, center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-70" />

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/70">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: project.accent, boxShadow: `0 0 12px ${project.accent}` }}
                  />
                  {project.category}
                </div>
                <h3 className="mt-4 font-display text-4xl leading-[0.9] text-white md:text-6xl tracking-tight">
                  {project.name}
                </h3>
              </div>

              <div className="absolute right-8 bottom-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-xs font-medium text-white backdrop-blur-md transition-all duration-300 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-white group-hover:text-black">
                View case study <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Modal is unchanged */}
      <AnimatePresence>
        {activeProject && (
          <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </section>
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
        className="absolute inset-x-0 bottom-0 top-6 md:top-10 mx-auto max-w-6xl overflow-hidden rounded-t-[28px] md:rounded-[28px] border border-white/10 bg-black text-white"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-black/80 px-6 py-4 backdrop-blur-md md:px-10">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-widest text-white/50">
              {project.category} · {project.year}
            </div>
            <div className="mt-1 truncate text-lg font-medium">{project.name}</div>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[calc(100svh-100px)] overflow-y-auto">
          <motion.div
            layoutId={`cover-${project.slug}`}
            className="relative h-[46vh] w-full"
            style={{
              backgroundImage: `${project.cover}, url(${project.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
            <div className="absolute inset-0 flex items-end p-8 md:p-14">
              <h3 className="font-display text-4xl md:text-6xl italic tracking-[-0.02em] max-w-3xl text-white">
                {project.tagline}
              </h3>
            </div>
          </motion.div>

          <div className="p-8 md:p-14 md:text-lg text-white/80 leading-relaxed max-w-4xl mx-auto pb-24">
            <p>{project.problem}</p>
            <p className="mt-6">{project.solution}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
