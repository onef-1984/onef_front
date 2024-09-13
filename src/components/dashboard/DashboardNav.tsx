import { useRouterAdv } from "@/hooks/useRouterAdv";
import styles from "./DashboardNav.module.css";
import { IoHeart } from "@react-icons/all-files/io5/IoHeart";
import clsx from "clsx";

export default function DashboardNav() {
  const { push, location, query, searchType } = useRouterAdv();

  const handleClick = (searchType: string) => () => {
    push({ pathname: location, query: { ...query, searchType } }, location);
  };

  return (
    <div className={styles.root}>
      <button
        className={clsx((searchType === "user" || searchType === "report") && styles.active)}
        type="button"
        onClick={handleClick("user")}
      >
        게시글
      </button>

      <button
        className={clsx(searchType === "userLiked" && styles.active)}
        type="button"
        onClick={handleClick("userLiked")}
      >
        <IoHeart />
        좋아요
      </button>
    </div>
  );
}
