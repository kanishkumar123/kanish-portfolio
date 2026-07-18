import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Services } from "@/components/site/Services";
import { Projects } from "@/components/site/Projects";
import { Intro } from "@/components/site/Intro";
import { SectionDivider } from "@/components/site/SectionDivider";

// Below-the-fold — code-split
const TechStack = lazy(() =>
  import("@/components/site/TechStack").then((m) => ({ default: m.TechStack })),
);
const Timeline = lazy(() =>
  import("@/components/site/Timeline").then((m) => ({ default: m.Timeline })),
);
const About = lazy(() => import("@/components/site/About").then((m) => ({ default: m.About })));
const CTA = lazy(() => import("@/components/site/CTA").then((m) => ({ default: m.CTA })));
const Footer = lazy(() => import("@/components/site/Footer").then((m) => ({ default: m.Footer })));

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Kanish Kumar",
          jobTitle: "Full Stack & Mobile Developer",
          url: "/",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Salem",
            addressRegion: "Tamil Nadu",
            addressCountry: "IN",
          },
          knowsAbout: [
            "React",
            "React Native",
            "Node.js",
            "TypeScript",
            "Web Development",
            "Mobile Apps",
            "Admin Dashboards",
            "CRM",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <Intro />
      <Navbar />
      <main id="top" className="relative">
        <Hero />
        <Marquee />

        <Services />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <TechStack />
        </Suspense>
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <Timeline />
        </Suspense>
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <CTA />
        </Suspense>
        <SectionDivider />
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}

function SectionFallback() {
  return <div className="min-h-[40vh]" aria-hidden />;
}

// import { createFileRoute } from "@tanstack/react-router";
// import { lazy, Suspense, useEffect } from "react";
// import { useLenis } from "@/hooks/use-lenis";
// import { Navbar } from "@/components/site/Navbar";
// import { Intro } from "@/components/site/Intro";
// import { Marquee } from "@/components/site/Marquee";
// import { Services } from "@/components/site/Services";
// import { SectionDivider } from "@/components/site/SectionDivider";

// // Import the newly fused Master Sequence
// import { HeroProjectsSequence } from "@/components/site/HeroProjectsSequence";

// // Below-the-fold — code-split
// const TechStack = lazy(() => import("@/components/site/TechStack").then(m => ({ default: m.TechStack })));
// const Timeline = lazy(() => import("@/components/site/Timeline").then(m => ({ default: m.Timeline })));
// const About = lazy(() => import("@/components/site/About").then(m => ({ default: m.About })));
// const CTA = lazy(() => import("@/components/site/CTA").then(m => ({ default: m.CTA })));
// const Footer = lazy(() => import("@/components/site/Footer").then(m => ({ default: m.Footer })));

// export const Route = createFileRoute("/")({
//   head: () => ({
//     links: [{ rel: "canonical", href: "/" }],
//     scripts: [
//       {
//         type: "application/ld+json",
//         children: JSON.stringify({
//           "@context": "https://schema.org",
//           "@type": "Person",
//           name: "Kanish Kumar",
//           jobTitle: "Full Stack & Mobile Developer",
//           url: "/",
//           address: {
//             "@type": "PostalAddress",
//             addressLocality: "Salem",
//             addressRegion: "Tamil Nadu",
//             addressCountry: "IN",
//           },
//           knowsAbout: [
//             "React", "React Native", "Node.js", "TypeScript",
//             "Web Development", "Mobile Apps", "Admin Dashboards", "CRM",
//           ],
//         }),
//       },
//     ],
//   }),
//   component: Index,
// });

// function Index() {
//   useLenis();

//   useEffect(() => {
//     const onClick = (e: MouseEvent) => {
//       const a = (e.target as HTMLElement)?.closest("a[href^='#']") as HTMLAnchorElement | null;
//       if (!a) return;
//       const id = a.getAttribute("href")?.slice(1);
//       if (!id) return;
//       const el = document.getElementById(id);
//       if (!el) return;
//       e.preventDefault();
//       el.scrollIntoView({ behavior: "smooth", block: "start" });
//     };
//     document.addEventListener("click", onClick);
//     return () => document.removeEventListener("click", onClick);
//   }, []);

//   return (
//     <>
//       <Intro />
//       <Navbar />
//       {/* Added bg-black here to ensure the background is pitch-dark behind the cinematic sequence */}
//       <main id="top" className="relative bg-black">

//         {/* The Master Sequence replaces the separate <Hero /> and <Projects /> components */}
//         <HeroProjectsSequence />

//         <Marquee />
//         <Services />

//         {/* The old 'Selected Work' section divider was removed since the sequence handles it */}
//         <SectionDivider label="Stack" />
//         <Suspense fallback={<SectionFallback />}>
//           <TechStack />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <Timeline />
//         </Suspense>

//         <SectionDivider label="About" />
//         <Suspense fallback={<SectionFallback />}>
//           <About />
//         </Suspense>

//         <Suspense fallback={<SectionFallback />}>
//           <CTA />
//         </Suspense>
//       </main>
//       <Suspense fallback={null}>
//         <Footer />
//       </Suspense>
//     </>
//   );
// }

// function SectionFallback() {
//   return <div className="min-h-[40vh]" aria-hidden />;
// }
