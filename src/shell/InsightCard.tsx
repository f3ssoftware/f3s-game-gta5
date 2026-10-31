import type { ReactNode } from "react";
import styles from "./InsightCard.module.css";

export type InsightCardProps = {
  label?: string;
  title: string;
  description?: string;
  badge?: string;
  imageUrl?: string | null;
  imageAlt?: string;
  accent?: boolean;
  footer?: ReactNode;
};

export default function InsightCard({
  label,
  title,
  description,
  badge,
  imageUrl,
  imageAlt = "",
  accent,
  footer,
}: InsightCardProps) {
  return (
    <article
      className={`${styles.card}${accent ? ` ${styles.cardAccent}` : ""}`}
    >
      {imageUrl ? (
        <div className={styles.media}>
          <img
            src={imageUrl}
            alt={imageAlt}
            className={styles.mediaImg}
            decoding="async"
          />
        </div>
      ) : null}
      {label ? <p className={styles.label}>{label}</p> : null}
      <h3 className={styles.title}>{title}</h3>
      {description ? <p className={styles.desc}>{description}</p> : null}
      {badge ? <span className={styles.badge}>{badge}</span> : null}
      {footer}
    </article>
  );
}
