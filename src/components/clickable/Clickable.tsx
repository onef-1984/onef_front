import React, { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import styles from "./Clickable.module.css";
import clsx from "clsx";

type ClickableStyle = {
  color?: "primary" | "white" | "like" | "kakao" | "borderless";
  size?: "small" | "medium" | "large";
};
type ClickableProps<T extends ElementType> = ClickableStyle & ComponentPropsWithoutRef<T>;

export default function Clickable<T extends ElementType = "button">({
  Component,
  ...props
}: {
  Component?: T;
} & ClickableProps<T>) {
  const Render = Component ?? "button";
  const { color = "primary", size = "medium", className, ...restProps } = props;
  const style = clsx(styles.root, styles[color], styles[size], className);

  return <Render className={style} {...restProps} />;
}

Clickable.Container = ({ children }: { children: ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};
