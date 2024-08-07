import { useRouterAdv } from "@/hooks/useRouterAdv";
import styles from "./DashboardNav.module.css";
import { IoHeart } from "@react-icons/all-files/io5/IoHeart";
import clsx from "clsx";

export default function DashboardNav() {
  const { orderBy, push, location, query } = useRouterAdv();

  const handleClick = (orderBy: string) => () => {
    push({ pathname: location, query: { ...query, orderBy } }, location);
  };

  return (
    <div className={styles.root}>
      <button
        className={clsx(orderBy === "createdAt" && styles.active)}
        type="button"
        onClick={handleClick("createdAt")}
      >
        게시글
      </button>
      <button
        className={clsx(orderBy === "userLiked" && styles.active)}
        type="button"
        onClick={handleClick("userLiked")}
      >
        <IoHeart />
        좋아요
      </button>
    </div>
  );
}
