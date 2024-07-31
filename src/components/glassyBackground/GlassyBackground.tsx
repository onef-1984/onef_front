import { ReactNode } from "react";
import styles from "./GlassyBackground.module.css";

type GlassyBackgroundProps = { children: ReactNode; image: string };

export default function GlassyBackground({ children, image }: GlassyBackgroundProps) {
  return (
    <section
      className={styles.root}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className={styles.blur}>{children}</div>
    </section>
  );
}
