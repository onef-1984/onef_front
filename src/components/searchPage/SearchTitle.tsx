import { useRouterAdv } from "@/hooks/useRouterAdv";
import styles from "./Search.module.css";

export default function SearchTitle() {
  const { keyword } = useRouterAdv();

  return (
    <div className={styles.searchUser}>
      전체 리뷰
      <hr />
    </div>
  );
}
