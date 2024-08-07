import { ReactNode } from "react";
import styles from "./ProfileEditWrapper.module.css";

export default function ProfileEditWrapper({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
    </div>
  );
}
