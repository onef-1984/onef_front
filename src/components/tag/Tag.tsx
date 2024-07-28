import styles from "./Tag.module.css";

type TagProps = {
  children: string;
};

export default function Tag({ children }: TagProps) {
  return <span className={styles.root}>#{children}</span>;
}
