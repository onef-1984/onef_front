import Image from "next/image";
import styles from "./EyeCatch.module.css";
import eyeCatch from "@/../public/images/eyeCatch.webp";

export default function EyeCatch() {
  return (
    <div className={styles.root}>
      <Image className={styles.image} fill sizes="500" alt="eyeCatch image" draggable="false" src={eyeCatch} />
    </div>
  );
}
