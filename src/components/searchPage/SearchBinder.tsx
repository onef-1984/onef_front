import styles from "./Search.module.css";
import { ReactNode } from "react";

export default function SearchBinder({ children }: { children: ReactNode }) {
  return (
    <div className={styles.binderContainer}>
      <div className={styles.searchBinder}>{children}</div>
    </div>
  );
}
