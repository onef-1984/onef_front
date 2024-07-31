import { BookQuery } from "@/apis/reactQuery/Query/BookQuery";
import Card from "@/components/card/Card";
import { useInfiniteQuery } from "@tanstack/react-query";
import styles from "./BookSearchModal.module.css";
import clsx from "clsx";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useSelectedBook } from "@/hooks/useCaroKann/useSelectedBook";
import CardResultBox from "@/components/card/CardResultBox";

type BookSearchResultProps = {
  searchKeyword: string;
};

export default function BookSearchResult({ searchKeyword }: BookSearchResultProps) {
  const bookQuery = new BookQuery();
  const { data, fetchNextPage } = useInfiniteQuery(bookQuery.getBookList(searchKeyword));
  const { isVisible, setIsVisible, myRef } = useIntersectionObserver();

  const [book, setBook] = useSelectedBook();

  if (isVisible) {
    fetchNextPage();
    setIsVisible(false);
  }

  return (
    <div className={clsx(styles.bookSearchResult, styles.bookSearchSize)}>
      {data?.pages?.map((page) =>
        page.items?.map((book) => (
          <Card key={book.isbn13} item={book} onClick={() => setBook(book)} cardBox={<CardResultBox {...book} />} />
        ))
      )}

      <p ref={myRef}></p>
    </div>
  );
}
