import { FormHTMLAttributes, ReactNode } from "react";

interface SignFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export default function Form({ onSubmit, children, className }: SignFormProps) {
  return (
    <form noValidate onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
}
