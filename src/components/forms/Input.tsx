import { InputHTMLAttributes, KeyboardEvent } from "react";
import type { Input } from "sicilian/dist/hooks/Types";
import styles from "./Input.module.css";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: Input<any>) => void;
  onKeyPress?: (e: KeyboardEvent) => void;
}

export default function Input({ className, name, ...inputProps }: InputProps) {
  return <input {...inputProps} className={clsx(styles.input, className)} name={name} id={name} />;
}
