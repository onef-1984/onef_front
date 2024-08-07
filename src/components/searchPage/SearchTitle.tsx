import styles from "./Search.module.css";
import { ReactNode } from "react";

export default function SearchTitle({ children }: { children?: ReactNode }) {
  return (
    <div className={styles.searchUser}>
      {children}
      <hr />
    </div>
  );
}
