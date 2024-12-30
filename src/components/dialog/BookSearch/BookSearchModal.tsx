import { Dispatch, SetStateAction, useState } from "react";
import { useInfiniteBookListAdaptor } from "@/hooks/useAdaptor/useInfiniteBookListAdaptor";
import { useBoardToggle } from "@/hooks/useCaroKann/useBoardToggle";
import { register, handleSubmit } from "@/hooks/useSicilian/bookSearch";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Item } from "@/types/graphql.types";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { formatAuthor } from "@/utils/formatAuthor";
import { SicilianProvider } from "sicilian";
import CardResultBox from "@/components/card/CardResultBox";
import Clickable from "@/components/clickable/Clickable";
import styles from "./BookSearchModal.module.css";
import Form from "@/components/forms/Form";
import Card from "@/components/card/Card";
import Show from "@/components/util/Show";
import Map from "@/components/util/Map";
import Image from "next/image";
import clsx from "clsx";

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
  const [_, setState] = useBoardToggle();
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
            setState({ BookSearchModal: false, SideMenu: false });
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
  const ref = useInfiniteScroll<HTMLDivElement>(fetchNextPage);

  return (
    <div className={clsx(styles.bookSearchResult, styles.bookSearchSize)}>
      <Map each={pages}>
        {(book) => (
          <Card key={book.isbn13} item={book} onClick={() => setBook(book)} cardBox={<CardResultBox {...book} />} />
        )}
      </Map>

      <div ref={ref} />
    </div>
  );
}

function BookSearchForm({ setSearchKeyword }: { setSearchKeyword: Dispatch<SetStateAction<string>> }) {
  const keyword = "keyword" as const;

  return (
    <Form className={styles.form} onSubmit={handleSubmit(({ keyword }) => setSearchKeyword(keyword))}>
      <SicilianProvider value={{ register, name: keyword }}>
        <Form.InputWrapper>
          <Form.Input placeholder="책 제목을 입력해주세요" />
        </Form.InputWrapper>
      </SicilianProvider>

      <Clickable>검색</Clickable>
    </Form>
  );
}
