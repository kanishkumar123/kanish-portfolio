import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const KEY = "kk-intro-seen";

export function Intro() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduced) return;
    try {
      if (sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
    } catch {}
    setShow(true);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => dismiss(), 1600);
    const onKey = () => dismiss();
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onKey);
    };
    function dismiss() {
      setShow(false);
      document.body.style.overflow = "";
    }
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-background"
        >
          <motion.div
            initial={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="absolute inset-0 bg-background flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-6xl md:text-8xl leading-none"
              >
                Kanish<span className="text-accent">.</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-4 text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
              >
                Full Stack &amp; Mobile
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
