import { ComponentPropsWithoutRef, forwardRef, KeyboardEvent } from "react";
import type { Input } from "sicilian/dist/hooks/Types";
import styles from "./Input.module.css";
import clsx from "clsx";

interface InputProps extends ComponentPropsWithoutRef<"textarea"> {
  name: string;
  className?: string;
  value: string;
  placeholder?: string;
  onFocus?: (e: Input<any>) => void;
  onBlur?: (e: Input<any>) => void;
  onChange: (e: Input<any>) => void;
  onKeyPress?: (e: KeyboardEvent) => void;
}

interface InputProps extends ComponentPropsWithoutRef<"textarea"> {
  name: string;
  className?: string;
  value: string;
  placeholder?: string;
  onFocus?: (e: Input<any>) => void;
  onBlur?: (e: Input<any>) => void;
  onChange: (e: Input<any>) => void;
  onKeyPress?: (e: KeyboardEvent) => void;
}

const Textarea = forwardRef<HTMLTextAreaElement, InputProps>(({ className, name, id, ...inputProps }, ref) => {
  return (
    <textarea {...inputProps} className={clsx(styles.input, className)} name={name} id={id ? id : name} ref={ref} />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
