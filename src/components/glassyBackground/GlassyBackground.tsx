import { ReactNode } from "react";
import styles from "./GlassyBackground.module.css";
import Image from "next/image";
import clsx from "clsx";

type GlassyBackgroundProps = { children: ReactNode; image: string; className?: string };

export default function GlassyBackground({ children, image, className }: GlassyBackgroundProps) {
  return (
    <section className={clsx(styles.root, className ? className : styles.defaultHeight)}>
      {image && <Image priority={true} src={image} alt="" fill sizes="5rem"></Image>}
      <div className={styles.blur}>{children}</div>
    </section>
  );
}
