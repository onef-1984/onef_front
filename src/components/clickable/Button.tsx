import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ type, onClick, children, disabled }: ButtonProps) {
  return (
    <button className={styles.root} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
