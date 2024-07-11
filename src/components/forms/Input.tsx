import { InputHTMLAttributes } from "react";
import type { Input } from "sicilian/dist/hooks/Types";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: Input<any>) => void;
}

export default function Input(InputProps: InputProps) {
  return <input {...InputProps} className={styles.root} id={InputProps.name} />;
}
