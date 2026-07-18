import { motion } from "framer-motion";
import { easeApple } from "./motion-primitives";
import { SectionHeader } from "./SectionHeader";
import {
  Globe,
  LayoutDashboard,
  Smartphone,
  Server,
  Database,
  Gauge,
  RefreshCw,
  Search,
  Wrench,
  Sparkles,
  Boxes,
  ArrowUpRight,
  Terminal, // Added for Automation
  ShieldCheck, // Added for Security
} from "lucide-react";

const SERVICES = [
  {
    icon: Globe,
    title: "Enterprise Web Portals",
    copy: "End-to-end management systems with role-based access handling thousands of active users.",
  },
  {
    icon: Boxes,
    title: "Next.js & React websites",
    copy: "Complex, stateful web applications built with clean architecture and pixel-honest UI.",
  },
  {
    icon: Smartphone,
    title: "Cross-Platform Mobile Apps",
    copy: "High-performance React Native and Flutter apps shipped to iOS and Android from a single codebase.",
  },
  {
    icon: Sparkles,
    title: "Business Websites",
    copy: "Fast, on-brand corporate and educational platforms engineered to convert visitors.",
  },
  {
    icon: Terminal,
    title: "Process Automation",
    copy: "Custom Python scripts that eliminate manual workflows and slash administrative time by up to 70%.",
  },
  {
    icon: Server,
    title: "Backend APIs & Integrations",
    copy: "Secure REST APIs, webhook ecosystems, and seamless third-party CRM integrations.",
  },
  {
    icon: Database,
    title: "Database Architecture",
    copy: "Scalable relational (MySQL) and NoSQL (Firebase, Supabase) schemas designed for growth.",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboards",
    copy: "Role-based dashboards that turn messy data into daily operational clarity for internal teams.",
  },
  {
    icon: Gauge,
    title: "Performance Optimization",
    copy: "Real-world Core Web Vitals gains and sub-2s load times achieved via code splitting and caching.",
  },

  {
    icon: Search,
    title: "SEO Architecture",
    copy: "Technical SEO and content structuring proven to drive organic growth and Page 1 rankings.",
  },
  {
    icon: ShieldCheck,
    title: "Security Benchmarking",
    copy: "Load testing, strict input sanitization, and SQL injection prevention built in from day one.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    copy: "Reliable ongoing support and legacy modernization so your product keeps compounding value.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative pt-8 md:pt-12">
      <div className="container-x">
        <SectionHeader
          index="01"
          total="03"
          eyebrow="Services"
          title={
            <>
              <span className="font-sans font-black uppercase tracking-[-0.02em]">One studio.</span>
              <br />
              <span className="font-display italic text-gradient-accent">everything to ship.</span>
            </>
          }
          description="From first sketch to production deployment. You get one accountable partner across design, engineering, mobile, backend, and performance not a handoff chain."
        />

        <div className="mt-8 md:mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-hairline surface-tint sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  copy,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  copy: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: easeApple, delay: (index % 3) * 0.05 }}
      className="group relative bg-background p-8 md:p-10 transition-colors hover:surface-tint"
    >
      <div className="flex items-start justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-2xl hairline surface-tint text-accent">
          <Icon className="h-5 w-5" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
      </div>
      <h3 className="mt-8 text-xl font-medium tracking-tight">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}
