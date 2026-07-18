import type { ReactNode } from "react";
import { Reveal } from "./motion-primitives";
import clsx from "clsx";

interface SectionHeaderProps {
  index: string;
  total?: string;
  eyebrow: string;
  title: ReactNode;
  titleClassName?: string;
  description?: string;

  /** Optional content displayed on the right */
  aside?: ReactNode;

  /** Content below the description (chips, buttons, etc.) */
  footer?: ReactNode;

  className?: string;
}

export function SectionHeader({
  title,
  titleClassName = "",
  description,
  aside,
  footer,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={clsx("grid gap-12 lg:grid-cols-12", className)}>
      {/* LEFT */}
      <div className={aside ? "lg:col-span-7" : "lg:col-span-12"}>
        <Reveal delay={0.08}>
          <h2 className={clsx("mt-6 text-6xl md:text-8xl leading-[0.95]", titleClassName)}>
            {title}
          </h2>
        </Reveal>

        {description && (
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-6xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </Reveal>
        )}

        {footer && (
          <Reveal delay={0.24}>
            <div className="mt-8">{footer}</div>
          </Reveal>
        )}
      </div>

      {/* RIGHT */}
      {aside && (
        <Reveal delay={0.2} className="lg:col-span-5">
          {aside}
        </Reveal>
      )}
    </div>
  );
}
