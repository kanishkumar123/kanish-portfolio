import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight, CodeXml } from "lucide-react";
import { easeApple } from "./motion-primitives";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: easeApple, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="container-x pt-4 md:pt-6">
          <motion.nav
            layout
            transition={{ duration: 0.5, ease: easeApple }}
            className={
              // Added 'max-w-4xl mx-auto w-full' here 👇
              "w-full max-w-4xl mx-auto flex items-center justify-between rounded-full px-3 py-2 md:px-4 md:py-2.5 transition-colors " +
              (scrolled
                ? "glass shadow-[0_10px_40px_-20px_rgba(0,0,0,0.35)]"
                : "border border-transparent bg-transparent")
            }
          >
            <Link to="/" className="flex items-center gap-2 group pl-1.5">
              {/* The </> Icon */}
              <span
                className={
                  "font-mono text-sm font-bold transition-colors " +
                  (scrolled
                    ? "text-muted-foreground group-hover:text-foreground"
                    : "text-white/70 group-hover:text-white")
                }
              >
                {"</>"}
              </span>

              {/* The "Kanish" Text */}
              <span
                className={
                  "text-sm font-semibold tracking-tight transition-colors " +
                  (scrolled ? "text-foreground" : "text-white")
                }
              >
                Kanish
              </span>
            </Link>
            <ul className="hidden md:flex items-center gap-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className={
                      "group relative rounded-full px-3.5 py-1.5 text-sm transition-colors " +
                      (scrolled
                        ? "text-muted-foreground hover:text-foreground"
                        : "text-white/70 hover:text-white")
                    }
                  >
                    {n.label}
                    {/* Your underline animation span remains exactly the same */}
                    <span className="pointer-events-none absolute left-3.5 right-3.5 -bottom-0.5 h-px origin-right scale-x-0 bg-accent transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              {/* Pass the scrolled state to the toggle */}
              <ThemeToggle scrolled={scrolled} />

              {/* Also update the mobile menu button color! */}
              <button
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className={
                  "md:hidden grid h-10 w-10 place-items-center rounded-full hairline transition-colors " +
                  (scrolled ? "text-foreground" : "text-white")
                }
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </motion.nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-x flex items-center justify-between pt-6">
              <span className="text-sm font-semibold">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full hairline"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="container-x mt-12 flex flex-col gap-2">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 * i, ease: easeApple }}
                  className="block border-b border-hairline py-5 font-display text-5xl leading-none"
                >
                  {n.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25, ease: easeApple }}
                className="mt-8"
              >
                <ThemeToggle variant="row" />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
