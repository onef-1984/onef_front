import { ReactNode } from "react";
import styles from "./GlassyBackground.module.css";
import Image from "next/image";
import clsx from "clsx";
import { Show } from "utilinent";

type GlassyBackgroundProps = { children: ReactNode; image: string; className?: string };

export default function GlassyBackground({ children, image, className }: GlassyBackgroundProps) {
  return (
    <section className={clsx(styles.root, className ? className : styles.defaultHeight)}>
      <Show when={!!image}>
        <Image priority={true} src={image} alt="" draggable="false" fill sizes="5rem" />
      </Show>

      <div className={styles.blur}>{children}</div>
    </section>
  );
}
