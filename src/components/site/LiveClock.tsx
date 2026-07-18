import { useEffect, useState } from "react";

function format(d: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  }).format(d);
}

export function LiveClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    setNow(format(new Date()));
    const id = setInterval(() => setNow(format(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{now ?? "--:--"} IST</span>;
}
