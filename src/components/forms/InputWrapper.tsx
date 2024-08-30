import { ReactNode } from "react";
import styles from "./Input.module.css";
import clsx from "clsx";
import { Show } from "../util/Show";

interface InputWrapperProps {
  label: ReactNode;
  inputName?: string;
  errorMessage?: string;
  className?: string;
}

export default function InputWrapper({ inputName, label, errorMessage, className }: InputWrapperProps) {
  return (
    <div className={clsx(styles.root, className)}>
      <Show when={!!inputName}>
        <span className={styles.inputName}>{inputName}</span>
      </Show>

      {label}

      <Show when={!!errorMessage}>
        <span className={styles.errorMessage}>{errorMessage}</span>
      </Show>
    </div>
  );
}
