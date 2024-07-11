import { ReactNode } from "react";
import styles from "./Clickable.module.css";

interface ClickableProps {
  children: ReactNode;
}

export default function Clickable({ children }: ClickableProps) {
  return <span className={styles.root}>{children}</span>;
}
