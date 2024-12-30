import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Clickable.module.css";
import clsx from "clsx";
import Link from "next/link";

type TButton = React.FC<ComponentPropsWithoutRef<"button">>;
type TComponent = typeof Link | TButton;
type ClickableStyle = {
  color?: "primary" | "white" | "like" | "kakao" | "borderless";
  size?: "small" | "medium" | "large";
};
type ClickableProps<T extends TComponent> = ClickableStyle & ComponentPropsWithoutRef<T>;

export default function Clickable<T extends TComponent = TButton>({
  Component,
  ...props
}: {
  Component?: T;
} & ClickableProps<T>) {
  const Button = ({ children, ...buttonProps }: ComponentPropsWithoutRef<"button">) => (
    <button {...buttonProps}>{children}</button>
  );
  const Render = Component ?? Button;
  const { color = "primary", size = "medium", className, ...restProps } = props;
  const style = clsx(styles.root, styles[color], styles[size], className);

  // @ts-expect-error
  return <Render className={style} {...restProps} />;
}

Clickable.Container = ({ children }: { children: ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};
