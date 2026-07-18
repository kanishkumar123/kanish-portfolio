import { SectionHeader } from "./SectionHeader";

const POINTS = [
  { k: "3+", v: "Years shipping production apps" },
  { k: "3,000+", v: "Users on live products" },
  { k: "70%", v: "Manual work removed via automation" },
  { k: "95+", v: "Lighthouse targets, consistently hit" },
];

const TRUST = [
  "Production Applications",
  "End-to-End Development",
  "Mobile + Web Expertise",
  "Fast Delivery",
  "SEO Optimized",
  "Responsive by Default",
  "Performance Focused",
  "Secure Development",
  "Clean Code",
  "Scalable Architecture",
];

export function About() {
  return (
    <section id="about" className="relative pt-8 md:pt-12">
      <div className="container-x">
        <SectionHeader
          index="00"
          total="05"
          eyebrow="About"
          title={
            <>
              <span className="font-sans font-black uppercase tracking-[-0.02em]">
                One developer.
              </span>
              <br />
              <span className="font-display italic text-gradient-accent">Built like a studio.</span>
            </>
          }
          description="I'm Kanish a full stack & mobile developer based in Salem, India. For the last three years I've built production products for colleges, manufacturers, healthcare providers, and growing businesses. You work directly with the person designing, building, and shipping your product without layers of communication or handoffs."
          footer={
            <div>
              {/* Capabilities */}
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                Capabilities
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2.5">
                {TRUST.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-2 text-xs text-foreground/80 md:text-sm"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {t}
                  </span>
                ))}
              </div>

              {/* Stat strip — now spread across full width */}
              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-hairline pt-8 sm:grid-cols-4">
                {POINTS.map((p) => (
                  <div key={p.v}>
                    <div className="text-3xl font-semibold tracking-tight text-accent tabular-nums md:text-4xl">
                      {p.k}
                    </div>
                    <div className="mt-1.5 text-xs leading-snug text-muted-foreground md:text-sm">
                      {p.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
}
