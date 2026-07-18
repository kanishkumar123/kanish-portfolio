import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";
const KEY = "kk-theme";

function readInitial(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(readInitial);

  const apply = useCallback((t: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("dark", t === "dark");
    root.classList.toggle("light", t === "light");
    root.style.colorScheme = t;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#070707" : "#f6f4ef");
  }, []);

  const setTheme = useCallback((t: Theme) => {
    try { localStorage.setItem(KEY, t); } catch {}
    apply(t);
    setThemeState(t);
  }, [apply]);

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  useEffect(() => {
    // Follow system when user hasn't explicitly chosen
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(KEY)) return;
      } catch {}
      const t: Theme = e.matches ? "dark" : "light";
      apply(t);
      setThemeState(t);
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [apply]);

  return { theme, setTheme, toggle };
}
