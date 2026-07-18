import { Reveal } from "./motion-primitives";

const ITEMS = [
  "Web Portals",
  "Business Websites",
  "Landing Pages",
  "React Applications",
  "Mobile Apps",
  "Next.js Applications",
  "React Websites",
  "Admin Dashboards",
  "Custom CRMs",
  "React Native Apps",
  "Flutter Apps",
  "Backend APIs",
  "Process Automation",
  "SEO Optimization",
  "Cloud Integrations",
];
export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <section aria-hidden className="relative py-8 border-y border-hairline overflow-hidden">
      <Reveal>
        <div className="flex whitespace-nowrap animate-marquee gap-12 will-change-transform">
          {row.map((t, i) => (
            <div
              key={i}
              className="flex items-center gap-12 uppercase font-sans text-xl md:text-xl text-muted-foreground transition-colors hover:text-foreground"
            >
              <span>{t}</span>
              <span className="text-accent">◆</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
