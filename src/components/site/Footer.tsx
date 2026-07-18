import { ArrowUpRight } from "lucide-react";

const STACK: [string, string][] = [
  ["React", "https://react.dev"],
  ["Vite", "https://vitejs.dev"],
  ["Tailwind CSS", "https://tailwindcss.com"],
  ["Framer Motion", "https://motion.dev"],
  ["GSAP", "https://gsap.com"],
  ["Lenis", "https://lenis.darkroom.engineering"],
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="">
      <div className="container-x py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-2.5">
              <span className="relative grid h-7 w-7 place-items-center rounded-full surface-tint hairline">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
              </span>
              <span className="text-sm font-semibold tracking-tight">Kanish Kumar</span>
            </div>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              Independent studio building premium web &amp; mobile products for businesses,
              startups, and SaaS founders. Based in Salem, India. Working worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <FooterCol
              title="Explore"
              links={[
                ["Work", "#work"],
                ["Services", "#services"],
                ["Process", "#process"],
                ["About", "#about"],
              ]}
            />
            <FooterCol
              title="What I build"
              links={[
                ["Business websites", "#services"],
                ["Admin dashboards", "#services"],
                ["Mobile apps", "#services"],
                ["Automation", "#services"],
              ]}
            />
            <FooterCol title="Built with" links={STACK} external />
            <FooterCol
              title="Find me"
              links={[
                ["kanishkumarsj@gmail.com", "mailto:kanishkumarsj@gmail.com"],
                ["GitHub", "https://github.com/kanishkumar123"],
                ["Phone", "tel:+9894211645"],
              ]}
              external
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-4 border-t border-hairline pt-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span>© {year} Kanish Kumar. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
              Made with Passion, React, and Tailwind CSS.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  external,
}: {
  title: string;
  links: [string, string][];
  external?: boolean;
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{title}</div>
      <ul className="mt-5 flex flex-col gap-3 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer noopener" : undefined}
              className="group inline-flex items-center gap-1.5 text-foreground/90 hover:text-accent transition-colors"
            >
              {label}
              {external && (
                <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-0.5 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
