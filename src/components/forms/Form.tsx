import { FormHTMLAttributes, ReactNode } from "react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export default function Form({ onSubmit, children, className }: FormProps) {
  return (
    <form noValidate onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
}
