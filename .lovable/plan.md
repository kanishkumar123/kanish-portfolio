## Goal

Ship a polished light/dark theme system plus a set of handcrafted, agency-grade upgrades (A, C, D, E, F, G — skipping the custom cursor). Everything stays performant, respects `prefers-reduced-motion`, and passes Lighthouse ≥95 on both themes.

---

## 1. Theme system (light + dark)

- Class-based (`.dark` / `.light` on `<html>`), full parallel token sets in `src/styles.css`.
  - **Light palette:** paper background `#F6F4EF`, surface `#FFFFFF`, card `#FBF9F4`; ink `#0B0B0B`, muted `#5C5A55`; accent `#5EEAD4` with on-light variant `#0D9488` for text/links; hairlines `rgba(11,11,11,0.08)`; noise overlay tuned lower.
  - **Dark palette:** current values preserved.
- Pre-hydration inline script in `__root.tsx` reads `localStorage.theme` or system preference and sets the class before paint — no flash. `theme-color` meta updated per theme.
- `useTheme` hook: read/set/persist, listen to system changes.
- **ThemeToggle**: icon-only sun↔moon pill in navbar, Framer Motion crossfade + rotate; labeled row in mobile menu. `aria-pressed`, `aria-label`, keyboard accessible, reduced-motion aware.
- **Token migration**: replace every `bg-white/*`, `text-white`, `bg-black/*`, `#070707`, and gradient literal in Hero, Projects, MockBrowser, Marquee, Services, TechStack, Timeline, About, CTA, Footer, Navbar with semantic tokens (`bg-foreground/10`, `text-foreground`, `bg-background`, `text-background`, etc.). Primary button becomes `bg-foreground text-background`.

## 2. (A) Typography personality

- Add **Instrument Serif** via `<link>` in root head; keep Inter for body.
- Use serif for hero headline, section titles ("Products shipped.", "Selected Work" H2s, CTA headline, footer signature word). Inter stays for UI, meta, chips, buttons.
- Slight negative tracking on serif, tabular-nums on metric strip.

## 3. (C) Hero upgrade

- Replace static blob gradients with a lightweight **animated aurora** — SVG `<feTurbulence>` + slowly-drifting radial gradients on a canvas (no WebGL cost); paused when tab hidden and under reduced-motion.
- **Live clock chip**: "Salem, IN · 14:32 IST" updating each second in the availability label.
- **Character-scramble** on the hero headline on first view (glyphs cycle for ~600ms then lock), then the existing mask-reveal continues.

## 4. (D) Projects section

- Generate **real hero images** per project (4 total) via imagegen, save to `src/assets/projects/`. Retire the schematic `MockBrowser` mock.
- **Scroll-linked parallax** on each card image (subtle y-shift + scale).
- **Sticky title marquee**: as the section pins, the four project titles cycle horizontally as a scroll indicator on the section edge.
- **Shared-element transition** using Framer Motion `layoutId` — the card cover morphs into the modal's hero image on open, reverses on close.

## 5. (E) Section transitions + intro

- **Draw-in horizontal divider** (SVG stroke-dashoffset animated on scroll) between Hero→Services, Projects→TechStack, About→CTA.
- **Page-load intro** (~1.1s, first visit per session only, stored in `sessionStorage`, skippable with any key/click): full-viewport mask reveals a large brand mark, then wipes upward to unveil the nav + hero. Disabled under reduced-motion.

## 6. (F) Micro-details

- Accent `focus-visible` ring on every interactive element.
- Animated underline on nav links (scale-x origin swap on hover).
- Marquee items get hover state (accent color + slight scale).
- Subtle 3D tilt on tech-stack chips (Framer Motion `useMotionValue` + rotate; desktop only).
- Footer signature: SVG signature-draw animation (stroke-dashoffset) replacing the static wordmark, plays once on scroll-into-view.

## 7. (G) Performance guardrails

- Preload Instrument Serif with `rel="preload" as="style"` + swap.
- `content-visibility: auto` and `contain-intrinsic-size` on below-the-fold sections (Timeline, About, CTA, Footer).
- Central `useReducedMotion()` — every parallax, aurora, scramble, tilt, intro respects it.
- Aurora animation pauses via `document.visibilityState === 'hidden'`.
- Generated project images exported at 1600w AVIF/JPG, `loading="lazy"` + `decoding="async"`.
- Verify Lighthouse ≥95 (Perf/Best Practices/A11y/SEO) on both themes before finishing.

---

## Files touched

**New**
- `src/hooks/use-theme.ts`
- `src/hooks/use-reduced-motion.ts`
- `src/components/site/ThemeToggle.tsx`
- `src/components/site/AuroraBackdrop.tsx`
- `src/components/site/ScrambleText.tsx`
- `src/components/site/LiveClock.tsx`
- `src/components/site/SectionDivider.tsx`
- `src/components/site/Intro.tsx`
- `src/components/site/SignatureDraw.tsx`
- `src/assets/projects/{scholarship,corporate,student-mgmt,clinic}.jpg` (imagegen)

**Edited**
- `src/styles.css` — light tokens, `@custom-variant` mapping, focus-ring utility, serif family, scrollbar/glass/noise branched per theme.
- `src/routes/__root.tsx` — pre-hydration theme script, Instrument Serif `<link>` + preconnect, theme-color meta.
- `src/routes/index.tsx` — mount `Intro`, add `SectionDivider` between sections.
- `src/components/site/Navbar.tsx` — mount `ThemeToggle`, animated underlines, focus rings, token cleanup.
- `src/components/site/Hero.tsx` — `AuroraBackdrop`, `LiveClock`, `ScrambleText`, serif headline, token cleanup.
- `src/components/site/Projects.tsx` — real imagery, parallax, sticky title marquee, `layoutId` shared-element modal, token cleanup.
- `src/components/site/Marquee.tsx`, `Services.tsx`, `TechStack.tsx`, `Timeline.tsx`, `About.tsx`, `CTA.tsx`, `Footer.tsx` — token migration, focus rings, tilt on tech chips, signature draw in footer, serif on section titles.

---

## Out of scope
- Custom cursor / magnetic interactions (item B, deferred per your selection).
- Content, copy, or routing changes.

Approve and I'll build it.
