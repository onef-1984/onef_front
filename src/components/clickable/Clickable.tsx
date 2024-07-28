import { ReactNode } from "react";
import styles from "./Clickable.module.css";
import clsx from "clsx";

interface ClickableProps {
  children: ReactNode;
  disabled?: boolean;
}

export default function Clickable({ children, disabled }: ClickableProps) {
  return <span className={clsx(styles.root, disabled && styles.disabled)}>{children}</span>;
}
