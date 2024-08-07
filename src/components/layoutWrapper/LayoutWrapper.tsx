import { ReactNode } from "react";
import Header from "../header/Header";
import SideMenu from "../sideMenu/SideMenu";
import styles from "./LayoutWrapper.module.css";
import { useBookSearchModalToggle } from "@/hooks/useCaroKann/useBookSearchModalToggle";
import BookSearchModal from "../modal/BookSearch/BookSearchModal";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const [bookSearchModalState] = useBookSearchModalToggle();

  return (
    <>
      <Header />

      <SideMenu />

      <main className={styles.main}>{children}</main>

      {bookSearchModalState && <BookSearchModal />}
    </>
  );
}
