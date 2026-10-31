import type { CSSProperties, ReactNode } from "react";
import styles from "./GtaVerticalShell.module.css";

export type GtaVerticalShellProps = {
  children: ReactNode;
  /** Optional max-width container class from host (e.g. PageContentWidth). */
  contentClassName?: string;
  contentStyle?: CSSProperties;
};

/**
 * Self-contained vertical shell so the package does not depend on host layout.
 * Host may wrap further; this sets GTA accent tokens and stack spacing.
 */
export default function GtaVerticalShell({
  children,
  contentClassName,
  contentStyle,
}: GtaVerticalShellProps) {
  return (
    <section
      className={`games games-showroom-palette ${styles.shell} gta5`}
      data-f3s-vertical="gta5"
    >
      <div
        className={`${styles.inner}${contentClassName ? ` ${contentClassName}` : ""}`}
        style={{
          width: "100%",
          maxWidth: "72rem",
          margin: "0 auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          ...contentStyle,
        }}
      >
        <div className={styles.stack}>{children}</div>
      </div>
    </section>
  );
}
