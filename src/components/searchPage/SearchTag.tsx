import { useRouterAdv } from "@/hooks/useRouterAdv";
import styles from "./Search.module.css";

export default function SearchTag() {
  const { keyword: tag } = useRouterAdv();

  return (
    <div className={styles.searchUser}>
      <span>#{tag}</span> 태그가 달린 리뷰
      <hr />
    </div>
  );
}
