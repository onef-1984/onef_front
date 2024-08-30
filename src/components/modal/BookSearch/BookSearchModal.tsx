import { useBookSearchModalToggle } from "@/hooks/useCaroKann/useBookSearchModalToggle";
import { useSelectedBook } from "@/hooks/useCaroKann/useSelectedBook";
import styles from "./BookSearchModal.module.css";
import BookSearchResult from "./BookSearchResult";
import BookSearchDetail from "./BookSearchDetail";
import BookSearchNull from "./BookSearchNull";
import BookSearchForm from "./BookSearchForm";
import ModalWrapper from "../ModalWrapper";
import { Item } from "@/types/book.types";
import { useState } from "react";
import { initValue, setValue } from "@/hooks/useSicilian/bookSearch";
import { useSideMenuToggle } from "@/hooks/useCaroKann/useSideMenuToggle";
import { Show } from "@/components/util/Show";

export default function BookSearchModal() {
  const [toggle, setToggle] = useSideMenuToggle();
  const [bookSearchModalState, setBookSearchModalState] = useBookSearchModalToggle();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [book, setBook] = useSelectedBook();

  const handleClose = () => {
    setToggle(false);
    setBookSearchModalState((prev) => !prev);
    setBook({} as Item);
    setValue(initValue);
  };

  return (
    <Show when={bookSearchModalState}>
      <ModalWrapper onClose={handleClose} size={styles.modalWrapperSize}>
        <div className={styles.root}>
          <BookSearchForm setSearchKeyword={setSearchKeyword} />

          <Show when={!!searchKeyword} fallback={<BookSearchNull />}>
            <Show when={!!Object.keys(book).length} fallback={<BookSearchResult searchKeyword={searchKeyword} />}>
              <BookSearchDetail onClose={handleClose} />
            </Show>
          </Show>
        </div>
      </ModalWrapper>
    </Show>
  );
}
