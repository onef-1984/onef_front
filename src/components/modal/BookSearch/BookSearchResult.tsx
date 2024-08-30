import Card from "@/components/card/Card";
import styles from "./BookSearchModal.module.css";
import clsx from "clsx";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useSelectedBook } from "@/hooks/useCaroKann/useSelectedBook";
import CardResultBox from "@/components/card/CardResultBox";
import { useInfiniteBookListAdaptor } from "@/hooks/useAdaptor/useInfiniteBookListAdaptor";
import { useEffect } from "react";
import { Map } from "@/components/util/Map";

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
      <Map each={pages}>
        {(page) => (
          <Map each={page.items}>
            {(book) => (
              <Card key={book.isbn13} item={book} onClick={() => setBook(book)} cardBox={<CardResultBox {...book} />} />
            )}
          </Map>
        )}
      </Map>

      <p ref={myRef}></p>
    </div>
  );
}
