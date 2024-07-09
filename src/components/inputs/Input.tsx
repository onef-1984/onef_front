import { FocusEvent, InputHTMLAttributes } from "react";
import type { Input } from "sicilian/dist/hooks/Types";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: Input<any>) => void;
}

export default function Input(InputProps: InputProps) {
  return <input {...InputProps} id={InputProps.name} />;
}
