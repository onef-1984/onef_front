import { InputHTMLAttributes, KeyboardEvent } from "react";
import type { Input } from "sicilian/dist/hooks/Types";
import styles from "./Input.module.css";
import clsx from "clsx";

interface InputProps {
  name: string;
  className?: string;
  value: string;
  onFocus: (e: Input<any>) => void;
  onBlur: (e: Input<any>) => void;
  onChange: (e: Input<any>) => void;
  onKeyPress?: (e: KeyboardEvent) => void;
}

export default function TextArea({ className, name, ...inputProps }: InputProps) {
  return <textarea {...inputProps} className={clsx(styles.input, className)} name={name} id={name} />;
}
