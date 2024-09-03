import { ReactNode } from "react";
import styles from "./Input.module.css";
import clsx from "clsx";
import { Show } from "../util/Show";

interface InputWrapperProps {
  children: ReactNode;
  errorMessage?: string;
  htmlFor?: string;
  className?: string;
  inputName?: string;
}

export default function InputWrapper({ inputName, children, htmlFor, errorMessage, className }: InputWrapperProps) {
  return (
    <div className={clsx(styles.root, className)}>
      <Show when={!!inputName}>
        <span className={styles.inputName}>{inputName}</span>
      </Show>

      <label className={clsx(styles.label, errorMessage && styles.labelError, className)} htmlFor={htmlFor}>
        {children}
      </label>

      <Show when={!!errorMessage}>
        <span className={styles.errorMessage}>{errorMessage}</span>
      </Show>
    </div>
  );
}
