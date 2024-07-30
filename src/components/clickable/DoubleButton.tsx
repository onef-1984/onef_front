import { FormEvent, ReactNode } from "react";
import Button from "./Button";
import styles from "./Clickable.module.css";

type DoubleButtonProps = {
  button1: ReactNode;
  button2: ReactNode;
};

export default function DoubleButton({ button1, button2 }: DoubleButtonProps) {
  return (
    <div className={styles.doubleButton}>
      {button1}
      {button2}
    </div>
  );
}
