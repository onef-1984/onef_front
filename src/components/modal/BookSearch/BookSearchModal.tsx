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
    <>
      {bookSearchModalState && (
        <ModalWrapper onClose={handleClose} size={styles.modalWrapperSize}>
          <div className={styles.root}>
            <BookSearchForm setSearchKeyword={setSearchKeyword} />

            {searchKeyword ? (
              Object.keys(book).length ? (
                <BookSearchDetail onClose={handleClose} />
              ) : (
                <BookSearchResult searchKeyword={searchKeyword} />
              )
            ) : (
              <BookSearchNull />
            )}
          </div>
        </ModalWrapper>
      )}
    </>
  );
}
