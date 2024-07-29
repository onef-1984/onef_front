import { ReactNode } from "react";
import styles from "./Clickable.module.css";
import clsx from "clsx";

interface ClickableProps {
  children: ReactNode;
  disabled?: boolean;
  color?: "primary" | "white";
}

export default function Clickable({ children, disabled, color }: ClickableProps) {
  return <span className={clsx(styles.root, disabled && styles.disabled, color && styles[color])}>{children}</span>;
}
