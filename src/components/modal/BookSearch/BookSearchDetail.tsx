import { useSelectedBook } from "@/hooks/useCaroKann/useSelectedBook";
import styles from "./BookSearchModal.module.css";
import clsx from "clsx";
import Image from "next/image";
import { Item } from "@/types/book.types";
import { formatAuthor } from "@/utils/formatAuthor";
import DoubleButton from "@/components/clickable/DoubleButton";
import { useRouter } from "next/router";
import Button from "@/components/clickable/Button";
import { useRouterAdv } from "@/hooks/useRouterAdv";

export default function BookSearchDetail({ onClose }: { onClose: () => void }) {
  const [book, setBook] = useSelectedBook();
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

      <DoubleButton
        button1={
          <Button type="button" color="white" onClick={() => setBook({} as Item)}>
            취소
          </Button>
        }
        button2={
          <Button
            type="button"
            onClick={() => {
              onClose();
              push(`/report/${book.isbn13}/create`);
            }}
          >
            리뷰 작성
          </Button>
        }
      />
    </div>
  );
}
