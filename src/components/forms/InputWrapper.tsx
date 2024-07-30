import { ReactNode } from "react";
import styles from "./Input.module.css";
import clsx from "clsx";

interface InputWrapperProps {
  label: ReactNode;
  inputName?: string;
  errorMessage?: string;
  className?: string;
}

export default function InputWrapper({ inputName, label, errorMessage, className }: InputWrapperProps) {
  return (
    <div className={clsx(styles.root, className)}>
      {inputName && <span className={styles.inputName}>{inputName}</span>}

      {label}

      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
}
