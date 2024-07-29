import clsx from "clsx";
import styles from "./BookSearchModal.module.css";

export default function BookSearchNull() {
  return <div className={clsx(styles.bookSearchSize, styles.bookSearchNull)} />;
}
