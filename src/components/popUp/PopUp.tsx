import clsx from "clsx";
import styles from "./PopUp.module.css";
import { ReactNode } from "react";
type PopUpProps = {
  position: "left" | "right";
  children: ReactNode;
};

export default function PopUp({ position, children }: PopUpProps) {
  return <div className={clsx(styles.root, styles[position])}>{children}</div>;
}
