import Card from "@/components/card/Card";
import styles from "./BookSearchModal.module.css";
import clsx from "clsx";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useSelectedBook } from "@/hooks/useCaroKann/useSelectedBook";
import CardResultBox from "@/components/card/CardResultBox";
import { useInfiniteBookListAdaptor } from "@/hooks/useAdaptor/useInfiniteBookListAdaptor";

type BookSearchResultProps = {
  searchKeyword: string;
};

export default function BookSearchResult({ searchKeyword }: BookSearchResultProps) {
  const { pages, fetchNextPage } = useInfiniteBookListAdaptor(searchKeyword);
  const { isVisible, setIsVisible, myRef } = useIntersectionObserver();

  const [_, setBook] = useSelectedBook();

  if (isVisible) {
    fetchNextPage();
    setIsVisible(false);
  }

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
