import scholarshipImg from "/scholarship.png";
import saamGeaarsImg from "/saam-geaars-site.png";
import srbsImg from "/srbs-salem.png";
import tnpdImg from "/tnpd.png";
import fly91Img from "/fly91.png";
import crmImg from "/crm.png";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  duration: string;
  role: string;
  cover: string; // gradient css overlay
  image: string; // background image url
  accent: string;
  liveUrl?: string;
  problem: string;
  goal: string;
  solution: string;
  features: string[];
  stack: string[];
  process: string[];
  challenges: string[];
  results: { label: string; value: string }[];
  impact: string;
};

export const projects: Project[] = [
  {
    slug: "scholarship-portal",
    name: "Scholarship Portal (VMRF)",
    tagline: "An end-to-end statewide portal serving 3,000+ applicants securely.",
    category: "University · Scholarship Management",
    year: "2025",
    duration: "14 weeks",
    role: "Full Stack Developer",
    accent: "#5EEAD4",
    image: scholarshipImg,
    cover:
      "radial-gradient(120% 80% at 10% 10%, rgba(94,234,212,0.35), transparent 60%), radial-gradient(80% 80% at 90% 90%, rgba(139,92,246,0.35), transparent 60%), linear-gradient(180deg,#0a1412 0%, #0a0a1a 100%)",
    liveUrl: "https://scholarship.vinayakamission.com/", // Add the live link if available
    problem:
      "The institution lacked a centralized, secure system to handle the massive influx of scholarship applications. Processing was manual, disjointed, and highly susceptible to data entry errors and security vulnerabilities.",
    goal: "Architect and ship a secure, scalable digital portal from scratch to manage the entire applicant lifecycle from registration to administrative review.",
    solution:
      "Built a robust, full-stack PHP/MySQL portal featuring role-based access control (RBAC), secure document uploads, and automated applicant status tracking.",
    features: [
      "End-to-end applicant registration flow",
      "Secure document upload and management",
      "Role-based administrative review dashboards",
      "Automated status tracking for applicants",
      "Strict input sanitization & SQL injection prevention",
    ],
    stack: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
    process: [
      "Requirements gathering and schema design",
      "Security implementation (Sanitization & SQLi prevention)",
      "UI/UX development for applicant and admin portals",
      "Load testing and iterative deployment",
    ],
    challenges: [
      "Ensuring absolute data security for thousands of sensitive student records.",
      "Building an intuitive admin dashboard that required zero training to operate.",
    ],
    results: [
      { label: "Applicants served", value: "3,000+" },
      { label: "Security incidents", value: "0" },
      { label: "Manual processing", value: "Eliminated" },
    ],
    impact:
      "Successfully processed over 3,000 applications securely, completely eliminating manual paperwork and providing leadership with a transparent, digital audit trail.",
  },
  {
    slug: "saamgeaars-corporate",
    name: "SaamGeaars Platforms",
    tagline: "A high-performance digital presence for a commercial gearbox manufacturer.",
    category: "Corporate · Manufacturing",
    year: "2026",
    duration: "6 weeks",
    role: "Full Stack Engineer",
    accent: "#8B5CF6",
    image: saamGeaarsImg,
    cover:
      "radial-gradient(120% 80% at 90% 10%, rgba(245,158,11,0.28), transparent 60%), radial-gradient(80% 80% at 10% 90%, rgba(139,92,246,0.30), transparent 60%), linear-gradient(180deg,#150d05 0%, #0a0a0a 100%)",
    liveUrl: "https://saam-geaars.vercel.app/", // Add the live link if available
    problem:
      "The manufacturing company required a modern, professional web presence that accurately reflected their engineering capabilities and facilitated B2B client acquisition.",
    goal: "Design and deploy a corporate website optimized for performance, SEO, and professional credibility in the heavy machinery sector.",
    solution:
      "Developed a custom, highly responsive corporate website showcasing their product catalog and engineering expertise, optimized for global search visibility.",
    features: [
      "Custom UI/UX reflecting industrial branding",
      "Responsive product catalog architecture",
      "Optimized asset delivery for fast load times",
      "Technical SEO implementation",
    ],
    stack: ["React.js", "TailwindCSS", "Vite", "Framer Motion"],
    process: [
      "Brand alignment and asset gathering",
      "Component architecture and UI design",
      "Performance optimization (Core Web Vitals)",
      "Production deployment and SEO indexing",
    ],
    challenges: [
      "Balancing high-quality industrial imagery with strict performance budgets.",
      "Structuring technical product data for both users and search engine crawlers.",
    ],
    results: [
      { label: "Performance Score", value: "95+" },
      { label: "Mobile Responsive", value: "100%" },
      { label: "Index Status", value: "Complete" },
    ],
    impact:
      "Established a premium digital footprint for the manufacturer, significantly improving brand perception and search visibility for B2B procurement.",
  },
  {
    slug: "institutional-web-architecture",
    name: "SAHS & SRBS Platforms",
    tagline: "Modernizing higher education with bespoke platforms and headless content pipelines.",
    category: "EdTech · Web Architecture",
    year: "2025",
    duration: "12 weeks",
    role: "Lead Full Stack Engineer",
    accent: "#F59E0B",
    image: srbsImg, // Replace with actual image import for the colleges
    cover:
      "radial-gradient(120% 80% at 10% 10%, rgba(245,158,11,0.35), transparent 60%), radial-gradient(80% 80% at 90% 90%, rgba(220,38,38,0.35), transparent 60%), linear-gradient(180deg,#170f03 0%, #0a0a0a 100%)",
    liveUrl: "https://sahsvmkvmcslm.edu.in/",
    problem:
      "The institutions lacked a cohesive digital presence, and faculty struggled with complex, legacy database backends to publish daily collegiate updates, resulting in stagnant content.",
    goal: "Architect scalable, student-facing UI platforms while delivering a zero-friction content management system for non-technical college administrators.",
    solution:
      "Developed high-performance institutional websites with dedicated admin dashboards, pioneering a lightweight headless CMS utilizing the Google Spreadsheet API.",
    features: [
      "Dynamic student-facing UI and portals",
      "Google Spreadsheet API integration (Headless CMS)",
      "Secure administrative dashboards",
      "Entrance Exam Portal POC dual-stack benchmarking",
      "Role-based content publishing workflows",
    ],
    stack: ["React.js", "Laravel", "Firebase", "Google Sheets API", "MySQL"],
    process: [
      "Stakeholder mapping for faculty workflows",
      "Headless CMS architecture and integration",
      "Parallel stack load benchmarking (Laravel vs. React/Firebase)",
      "Production deployment and staff onboarding",
    ],
    challenges: [
      "Designing a content pipeline that non-technical faculty could update instantly without learning new software.",
      "Load and security benchmarking an Entrance Exam POC across two entirely different tech stacks simultaneously.",
    ],
    results: [
      { label: "Faculty Adoption", value: "100%" },
      { label: "Content Update Time", value: "< 1 min" },
      { label: "Stacks Benchmarked", value: "2" },
    ],
    impact:
      "Empowered college administrators with instant, zero-friction content management while delivering a blazing-fast, modern browsing experience for prospective students and faculty.",
  },
  {
    slug: "tnpd-community",
    name: "TNPD Community Hub",
    tagline: "A highly dynamic, sub-2s latency web platform for a massive gaming server.",
    category: "Community · Gaming",
    year: "2025",
    duration: "4 weeks",
    role: "Frontend Engineer",
    accent: "#10B981",
    image: tnpdImg, // Replace with actual image import for the TNPD community
    cover:
      "radial-gradient(120% 80% at 90% 10%, rgba(16,185,129,0.30), transparent 60%), radial-gradient(80% 80% at 10% 90%, rgba(6,182,212,0.30), transparent 60%), linear-gradient(180deg,#02120c 0%, #050505 100%)",
    liveUrl: "https://pd.thalainagaram.org/",
    problem:
      "The gaming community required a centralized digital hub to display dynamic server statistics and community updates, but existing solutions were bloated, leading to high bounce rates.",
    goal: "Engineer a visually striking web application capable of handling heavy dynamic data and media assets without compromising on strict performance budgets.",
    solution:
      "Built a performance-optimized frontend utilizing React.js and Vite, implementing aggressive code splitting and modern bundling techniques to shatter load time barriers.",
    features: [
      "Dynamic data visualization and stat tracking",
      "Aggressive code splitting and lazy loading",
      "Responsive, gaming-focused UI/UX",
      "Optimized asset delivery pipeline",
    ],
    stack: ["React.js", "Vite", "Tailwind CSS", "Lighthouse CI"],
    process: [
      "Performance budgeting and architecture planning",
      "Component-level code splitting implementation",
      "UI/UX development matching community branding",
      "Rigorous Lighthouse performance auditing",
    ],
    challenges: [
      "Maintaining exceptionally fast load times while rendering heavy visual assets and dynamic community data on the client side.",
      "Ensuring fluid animations didn't trigger layout shifts or CPU bottlenecks on lower-end devices.",
    ],
    results: [
      { label: "Initial Load Time", value: "< 2.0s" },
      { label: "Lighthouse Score", value: "98" },
      { label: "Community Scale", value: "Tier 1" },
    ],
    impact:
      "Delivered a centralized, lightning-fast hub for the TNPD community, establishing a premium digital footprint that significantly boosted player retention and off-server engagement.",
  },
  // {
  //   slug: "pentafox-mobile",
  //   name: "Fertis & Fly91 Applications",
  //   tagline: "Cross-platform mobile engineering for marketplace and aviation products.",
  //   category: "Mobile · SaaS",
  //   year: "2024",
  //   duration: "6 Months",
  //   role: "Mobile Developer",
  //   accent: "#3B82F6",
  //   image: fly91Img, // Replace with actual image import for Fly91
  //   cover:
  //     "radial-gradient(120% 80% at 50% 0%, rgba(59,130,246,0.35), transparent 60%), radial-gradient(80% 80% at 50% 100%, rgba(94,234,212,0.22), transparent 60%), linear-gradient(180deg,#0a1428 0%, #0a0a18 100%)",
  //   problem:
  //     "Pentafox required rapid prototyping for an aviation app (Fly91) and complex frontend architecture for a product marketplace (Fertis).",
  //   goal: "Deliver highly responsive, cross-platform mobile experiences that prioritized user engagement and backend synchronization.",
  //   solution:
  //     "Engineered a React Native POC for Fly91 with Budibase API integration, and drove the Flutter frontend for Fertis, creating a massive custom widget library.",
  //   features: [
  //     "150+ custom Flutter UI widgets (Fertis)",
  //     "Stock management via Budibase APIs (Fly91)",
  //     "Real-time state management",
  //     "Complex interactive product listings and filters",
  //   ],
  //   stack: ["Flutter", "React Native", "Budibase", "Firebase"],
  //   process: [
  //     "UI component breakdown and architecture",
  //     "API integration and state mapping",
  //     "Performance profiling on lower-end devices",
  //     "Iterative UX refinement",
  //   ],
  //   challenges: [
  //     "Maintaining 60fps scrolling performance with complex product grids in Flutter.",
  //     "Synchronizing inventory data accurately with external Budibase endpoints.",
  //   ],
  //   results: [
  //     { label: "Custom Widgets", value: "150+" },
  //     { label: "Platforms", value: "iOS + Android" },
  //     { label: "Engagement", value: "Increased" },
  //   ],
  //   impact:
  //     "The expansive custom widget library directly contributed to higher in-app user engagement for Fertis, while the Fly91 POC successfully validated the technical requirements for aviation stock management.",
  // },
  // {
  //   slug: "vmrf-automation",
  //   name: "Enterprise Automation & CRM",
  //   tagline: "Slashing administrative overhead through Python and React Native.",
  //   category: "Internal Tools · Automation",
  //   year: "2025",
  //   duration: "Ongoing",
  //   role: "Full Stack Engineer",
  //   accent: "#F43F5E",
  //   image: crmImg,
  //   cover:
  //     "radial-gradient(120% 80% at 10% 90%, rgba(244,63,94,0.28), transparent 60%), radial-gradient(80% 80% at 90% 10%, rgba(94,234,212,0.28), transparent 60%), linear-gradient(180deg,#181008 0%, #0a1a16 100%)",
  //   problem:
  //     "Administrative staff were bogged down by manual data entry on massive datasets, and the sales team lacked mobile visibility into their CRM pipeline.",
  //   goal: "Automate heavy data processing tasks and build a mobile bridge to the existing CRM for the telecalling team.",
  //   solution:
  //     "Wrote Python scripts for bulk data processing and developed a React Native telecaller application linked directly to the CRM APIs.",
  //   features: [
  //     "Bulk DOB validation & duplicate detection",
  //     "Automated EC number generation",
  //     "React Native telecaller interface",
  //     "Real-time call logging to CRM",
  //     "Mobile lead pipeline visibility",
  //   ],
  //   stack: ["Python", "React Native", "REST APIs", "Pandas"],
  //   process: [
  //     "Workflow analysis and bottleneck identification",
  //     "Scripting logic for edge cases in 10k+ row datasets",
  //     "Mobile UI design for fast-paced telecallers",
  //     "Secure API integration testing",
  //   ],
  //   challenges: [
  //     "Processing 10,000+ row datasets efficiently without memory leaks.",
  //     "Designing a mobile UI that telecallers could operate entirely with one hand while on calls.",
  //   ],
  //   results: [
  //     { label: "Processing Time", value: "-70%" },
  //     { label: "Dataset Size", value: "10k+ rows" },
  //     { label: "Data Accuracy", value: "100%" },
  //   ],
  //   impact:
  //     "The Python automation reduced administrative processing time by 70%, while the mobile CRM integration enabled the sales team to log calls and track leads in real-time from anywhere.",
  // },
];
