import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle({
  variant = "icon",
  scrolled = true, // Add this new prop
}: {
  variant?: "icon" | "row";
  scrolled?: boolean;
}) {
  const { theme, toggle } = useTheme();
  const reduced = useReducedMotion();
  const isDark = theme === "dark";

  if (variant === "row") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-pressed={isDark}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="flex items-center justify-between w-full rounded-2xl hairline px-5 py-4 text-base"
      >
        <span className="flex items-center gap-3">
          {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          {isDark ? "Dark mode" : "Light mode"}
        </span>
        <span className="text-xs text-muted-foreground">Tap to switch</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={
        "relative grid h-9 w-9 place-items-center rounded-full hairline overflow-hidden transition-colors hover:bg-foreground/5 " +
        (scrolled ? "text-foreground" : "text-white") // Apply dynamic color here
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={reduced ? {} : { rotate: -60, opacity: 0, scale: 0.6 }}
            animate={reduced ? { opacity: 1 } : { rotate: 0, opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { rotate: 60, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 grid place-items-center"
          >
            <Moon className="h-[15px] w-[15px]" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={reduced ? {} : { rotate: 60, opacity: 0, scale: 0.6 }}
            animate={reduced ? { opacity: 1 } : { rotate: 0, opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { rotate: -60, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 grid place-items-center"
          >
            <Sun className="h-[15px] w-[15px]" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
