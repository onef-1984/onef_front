import { ReactNode } from "react";
import styles from "./Clickable.module.css";
import clsx from "clsx";

interface ClickableProps {
  children: ReactNode;
  disabled?: boolean;
  color?: "primary" | "white" | "like";
  size?: "small" | "medium" | "large";
}

export default function Clickable({ children, disabled, color = "primary", size = "medium" }: ClickableProps) {
  return (
    <span className={clsx(styles.root, disabled && styles.disabled, styles[color], styles[size])}>{children}</span>
  );
}
