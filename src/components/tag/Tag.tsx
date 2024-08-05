import Link from "next/link";
import styles from "./Tag.module.css";

type TagProps = {
  children: string;
};

export default function Tag({ children }: TagProps) {
  return (
    <Link
      href={{ pathname: "/search", query: { searchType: "tag", keyword: children } }}
      className={styles.root}
    >{`#${children}`}</Link>
  );
}
