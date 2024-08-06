import { ButtonHTMLAttributes, ReactNode } from "react";
import Clickable from "./Clickable";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: "primary" | "white" | "like";
  size?: "small" | "medium" | "large";
}

export default function Button(buttonProps: ButtonProps) {
  return (
    <button {...buttonProps}>
      <Clickable disabled={buttonProps.disabled} color={buttonProps.color} size={buttonProps.size}>
        {buttonProps.children}
      </Clickable>
    </button>
  );
}
