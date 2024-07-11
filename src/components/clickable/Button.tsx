import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button(buttonProps: ButtonProps) {
  return <button {...buttonProps} className={styles.root} />;
}
