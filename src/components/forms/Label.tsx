import { ReactNode } from "react";
import useToggle from "@/hooks/useToggle";
import styles from "./Input.module.css";
import clsx from "clsx";
import { Show } from "../util/Show";

type LabelProps = {
  Input: ReactNode;
  errorMessage?: string;
  htmlFor: string;
  className?: string;
};

export default function Label({ htmlFor, Input, errorMessage, className }: LabelProps) {
  return (
    <label className={clsx(styles.label, errorMessage && styles.labelError, className)} htmlFor={htmlFor}>
      {Input}
    </label>
  );
}
