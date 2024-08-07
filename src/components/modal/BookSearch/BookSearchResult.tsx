import Card from "@/components/card/Card";
import styles from "./BookSearchModal.module.css";
import clsx from "clsx";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useSelectedBook } from "@/hooks/useCaroKann/useSelectedBook";
import CardResultBox from "@/components/card/CardResultBox";
import { useInfiniteBookListAdaptor } from "@/hooks/useAdaptor/useInfiniteBookListAdaptor";
import { useEffect } from "react";

type BookSearchResultProps = {
  searchKeyword: string;
};

export default function BookSearchResult({ searchKeyword }: BookSearchResultProps) {
  const { pages, fetchNextPage } = useInfiniteBookListAdaptor(searchKeyword);
  const { isVisible, setIsVisible, myRef } = useIntersectionObserver();

  const [_, setBook] = useSelectedBook();

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
      setIsVisible(false);
    }
  }, [isVisible, fetchNextPage, setIsVisible]);

  return (
    <div className={clsx(styles.bookSearchResult, styles.bookSearchSize)}>
      {pages?.map((page) =>
        page.items?.map((book) => (
          <Card key={book.isbn13} item={book} onClick={() => setBook(book)} cardBox={<CardResultBox {...book} />} />
        ))
      )}

      <p ref={myRef}></p>
    </div>
  );
}
