import { ButtonHTMLAttributes, ComponentPropsWithoutRef } from "react";
import styles from "./Clickable.module.css";
import clsx from "clsx";
import Link from "next/link";

type ComponentType = typeof Button | typeof Link;
type ClickableStyle = { color?: "primary" | "white" | "like"; size?: "small" | "medium" | "large" };
type ClickableProps<T extends ComponentType> = ClickableStyle & ComponentPropsWithoutRef<T>;

export default function Clickable<T extends ComponentType = typeof Button>({
  Component,
  ...props
}: {
  Component?: T;
} & ClickableProps<T>) {
  const Render = Component ?? Button;
  const { color = "primary", size = "medium", className, ...restProps } = props;
  const style = clsx(styles.root, styles[color], styles[size], className);

  // @ts-expect-error
  return <Render className={style} {...restProps} />;
}

function Button({ children, ...buttonProps }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...buttonProps}>{children}</button>;
}
