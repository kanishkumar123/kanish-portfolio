import { motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { staggerContainer } from "./motion-primitives";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string;
const CONTACT_EMAIL = "kanishkumarsj@gmail.com";
const PHONE_DIGITS = "919894211645";

type Status = "idle" | "sending" | "success" | "error";

const meta: Array<[string, string]> = [
  ["Response time", "Within 24 hours"],
  ["Working", "Worldwide, remote"],
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="#25D366" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.031 0C5.462 0 .134 5.328.134 11.897c0 2.097.548 4.146 1.588 5.945L0 24l6.304-1.653a11.86 11.86 0 0 0 5.723 1.457h.005c6.568 0 11.896-5.328 11.896-11.897 0-3.178-1.237-6.166-3.483-8.412A11.822 11.822 0 0 0 12.031 0zm0 21.788a9.878 9.878 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.85 9.85 0 0 1-1.517-5.259c0-5.448 4.435-9.883 9.892-9.883a9.83 9.83 0 0 1 6.988 2.896 9.825 9.825 0 0 1 2.897 6.992c0 5.448-4.435 9.886-9.89 9.886z" />
    </svg>
  );
}

function useLocalTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return time.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="group relative block">
      <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
      <input
        {...props}
        className="mt-2 w-full border-0 border-b border-hairline bg-transparent py-2.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors"
      />
      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-center scale-x-0 bg-accent-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within:scale-x-100" />
    </label>
  );
}

function TextAreaField({
  label,
  ...props
}: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="group relative block">
      <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
      <textarea
        {...props}
        className="mt-2 w-full resize-none border-0 border-b border-hairline bg-transparent py-2.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors"
      />
      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-center scale-x-0 bg-accent-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within:scale-x-100" />
    </label>
  );
}

export function CTA() {
  const localTime = useLocalTime();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (formData.get("botcheck")) {
      form.reset();
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = await res.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(result.message ?? "Something went wrong on my end.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network hiccup on this end — try again, or reach out directly.");
    }
  }

  return (
    <section id="contact" className="relative pt-8 md:pt-12 cv-auto">
      <div className="container-x">
        <SectionHeader
          index=""
          eyebrow="Contact"
          className="lg:items-center"
          title={
            <>
              <span className="font-sans font-black uppercase tracking-[-0.02em]">
                Get in touch.
              </span>{" "}
              <span className="font-display italic text-gradient-accent">Let's make it real.</span>
            </>
          }
          description={
            "Send over what you're building, who it's for, and what \"done well\" looks like. I read every message myself."
          }
          footer={
            <div>
              <dl className="divide-y divide-hairline border-t border-hairline text-sm">
                {meta.map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-6 py-3">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="text-right text-foreground">{value}</dd>
                  </div>
                ))}
                <div className="flex items-baseline justify-between gap-6 py-3">
                  <dt className="text-muted-foreground">Local time</dt>
                  <dd className="text-right text-foreground tabular-nums">{localTime} IST</dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=kanishkumarsj@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <Mail className="h-4 w-4" /> Email
                </a>
                <a href={`tel:+${PHONE_DIGITS}`} className="btn-ghost">
                  <Phone className="h-4 w-4" /> Call
                </a>
                <a
                  href={`https://wa.me/${PHONE_DIGITS}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>
          }
          aside={
            <div className="mt-10 lg:mt-0">
              {status === "success" ? (
                <div className="flex min-h-[320px] flex-col justify-center rounded-3xl border border-hairline bg-card p-8 md:p-10">
                  <p className="font-display text-3xl italic">Message sent.</p>
                  <p className="mt-3 max-w-xs text-muted-foreground">
                    I'll get back to you within 24 hours at the email you left.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 w-fit text-sm text-muted-foreground underline decoration-hairline underline-offset-4 transition-colors hover:text-foreground"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <motion.form
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-7 rounded-3xl border border-hairline bg-card p-8 md:p-10"
                >
                  <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                  <input type="hidden" name="subject" value="New project inquiry — kanish.dev" />
                  <input type="hidden" name="from_name" value="Portfolio contact form" />
                  <input
                    type="text"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute left-[-9999px]"
                    aria-hidden="true"
                  />

                  <Field label="Name" name="name" type="text" placeholder="Your name" required />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                  />
                  <TextAreaField
                    label="Project"
                    name="message"
                    rows={4}
                    placeholder="What you're building, and by when"
                    required
                  />

                  <div className="flex items-center gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-primary disabled:opacity-60"
                    >
                      {status === "sending" ? "Sending…" : "Send message"}
                      {status !== "sending" && <ArrowUpRight className="h-4 w-4" />}
                    </button>
                    {status === "error" && <p className="text-sm text-destructive">{errorMsg}</p>}
                  </div>
                </motion.form>
              )}
            </div>
          }
        />
      </div>
    </section>
  );
}
