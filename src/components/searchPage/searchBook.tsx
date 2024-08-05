import { useBookAdaptor } from "@/hooks/useAdaptor/useBookAdaptor";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import styles from "./Search.module.css";
import { formatBookTitle } from "@/utils/formatBookTitle";

export default function SearchBook() {
  const { keyword: isbn13 } = useRouterAdv();

  const {
    book: { title },
  } = useBookAdaptor({ isbn13 });

  return (
    <div className={styles.searchUser}>
      <span>{`"${formatBookTitle(title)}"`}</span> 을 읽고 작성된 리뷰
      <hr />
    </div>
  );
}
