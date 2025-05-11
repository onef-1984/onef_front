import { useRouterAdv } from "@/hooks/useRouterAdv";
import styles from "./Search.module.css";
import { formatBookTitle } from "@/utils/formatBookTitle";
import { useBookQuery } from "@/apis/useDomain/useBook.query";

export default function SearchBook() {
  const { keyword: isbn13 } = useRouterAdv();
  const { data } = useBookQuery().GetBook(isbn13);

  return (
    <div className={styles.searchUser}>
      <span>{`"${formatBookTitle(data.title)}"`}</span> 을 읽고 작성된 리뷰
      <hr />
    </div>
  );
}
