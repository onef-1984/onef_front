import { FormHTMLAttributes, ReactNode } from "react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  inputWrapper: ReactNode;
  button: ReactNode;
}

export default function Form({ onSubmit, inputWrapper, button, className }: FormProps) {
  return (
    <form noValidate onSubmit={onSubmit} className={className}>
      {inputWrapper}
      {button}
    </form>
  );
}
