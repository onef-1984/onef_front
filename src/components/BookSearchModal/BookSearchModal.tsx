import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { register, handleSubmit } from "@/hooks/useSicilian/bookSearch";
import { useInfiniteBookListAdaptor } from "@/hooks/useAdaptor/useInfiniteBookListAdaptor";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Clickable from "../clickable/Clickable";
import Form from "../forms/Form";
import styles from "./BookSearchModal.module.css";
import clsx from "clsx";
import Card from "../card/Card";
import CardResultBox from "../card/CardResultBox";
import Map from "../util/Map";
import Show from "../util/Show";
import { Item } from "@/types/graphql.types";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import Image from "next/image";
import { formatAuthor } from "@/utils/formatAuthor";
import { useBookSearchModalToggle } from "@/hooks/useCaroKann/useBookSearchModalToggle";

export default function BookSearchModal() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [book, setBook] = useState<Item>({} as Item);

  return (
    <div className={styles.root}>
      <BookSearchForm setSearchKeyword={setSearchKeyword} />

      <Show when={!!searchKeyword} fallback={<BookSearchNull />}>
        <Show when={!Object.keys(book).length} fallback={<BookDetail book={book} setBook={setBook} />}>
          <BookListSearchResult searchKeyword={searchKeyword} setBook={setBook} />
        </Show>
      </Show>
    </div>
  );
}

function BookSearchNull() {
  return <div className={styles.bookSearchSize} />;
}

function BookDetail({ book, setBook }: { book: Item; setBook: Dispatch<SetStateAction<Item>> }) {
  const [_, setState] = useBookSearchModalToggle();
  const { push } = useRouterAdv();

  return (
    <div className={clsx(styles.bookSearchResult, styles.bookSearchSize)}>
      <div className={styles.detail}>
        <div className={styles.imageWrapper}>
          <Image fill src={book.cover} sizes="144px" draggable="false" alt="표지" />
        </div>

        <div className={styles.detailInfo}>
          <p className={styles.detailInfoTitle}>{book.title}</p>
          <p className={styles.detailInfoAuthor}>{formatAuthor(book.author)}</p>
          <hr />
          <p className={styles.detailInfoDescription}>{book.description}</p>
          <br />
          <br />
          <p>출판사 : {book.publisher}</p>
          <p>카테고리 : {book.categoryName}</p>
          <p>평균 별점 : {book.customerReviewRank}</p>
          <p>출간일 : {book.pubDate}</p>
        </div>
      </div>

      <Clickable.Container>
        <Clickable type="button" color="white" onClick={() => setBook({} as Item)}>
          취소
        </Clickable>

        <Clickable
          type="button"
          onClick={() => {
            setState(false);
            push(`/report/${book.isbn13}/create`);
          }}
        >
          리뷰 작성
        </Clickable>
      </Clickable.Container>
    </div>
  );
}

function BookListSearchResult({
  searchKeyword,
  setBook,
}: {
  searchKeyword: string;
  setBook: Dispatch<SetStateAction<Item>>;
}) {
  const { fetchNextPage, pages } = useInfiniteBookListAdaptor(searchKeyword);
  const { isVisible, setIsVisible, myRef } = useIntersectionObserver();

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
      setIsVisible(false);
    }
  }, [isVisible, fetchNextPage, setIsVisible]);

  return (
    <div className={clsx(styles.bookSearchResult, styles.bookSearchSize)}>
      <Map each={pages}>
        {({ bookList }) => {
          return (
            <Map each={bookList.items}>
              {(book) => (
                <Card
                  key={book.isbn13}
                  item={book}
                  onClick={() => setBook(book)}
                  cardBox={<CardResultBox {...book} />}
                />
              )}
            </Map>
          );
        }}
      </Map>

      <div ref={myRef} />
    </div>
  );
}

function BookSearchForm({ setSearchKeyword }: { setSearchKeyword: Dispatch<SetStateAction<string>> }) {
  const keyword = "keyword" as const;

  return (
    <Form className={styles.form} onSubmit={handleSubmit(({ keyword }) => setSearchKeyword(keyword))}>
      <Form.InputWrapper htmlFor={keyword}>
        <Form.Input {...register(keyword)} placeholder="책 제목을 입력해주세요" />
      </Form.InputWrapper>

      <Clickable>검색</Clickable>
    </Form>
  );
}
