import { ButtonHTMLAttributes, ReactNode } from "react";
import Clickable from "./Clickable";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button(buttonProps: ButtonProps) {
  return (
    <button {...buttonProps}>
      <Clickable disabled={buttonProps.disabled}>{buttonProps.children}</Clickable>
    </button>
  );
}
