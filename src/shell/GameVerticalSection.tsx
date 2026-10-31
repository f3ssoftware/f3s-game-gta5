import type { ReactNode } from "react";
import styles from "./GameVerticalSection.module.css";

export type GameVerticalSectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  ariaLabel?: string;
  children: ReactNode;
  className?: string;
};

export default function GameVerticalSection({
  id,
  title,
  subtitle,
  ariaLabel,
  children,
  className,
}: GameVerticalSectionProps) {
  return (
    <section
      id={id}
      className={`${styles.section}${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel ?? title}
    >
      {(title || subtitle) && (
        <div className={styles.header}>
          {title ? <h2 className={styles.title}>{title}</h2> : null}
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </div>
      )}
      <div className={styles.body}>{children}</div>
    </section>
  );
}
