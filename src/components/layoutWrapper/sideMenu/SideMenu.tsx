import { useBoardToggle } from "@/hooks/useCaroKann/useBoardToggle";
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import styles from "./SideMenu.module.css";
import clsx from "clsx";
import Dialog from "@/components/dialog/Dialog";
import { Show } from "utilinent";
import BookSearchModal from "@/components/dialog/BookSearch/BookSearchModal";
import { useUserQuery } from "@/apis/useDomain/useUser.query";
import { Guard } from "@/components/guard";
import Link from "next/link";

export default function SideMenu() {
  const [toggle, setToggle] = useBoardToggle();
  const { data } = useUserQuery().GetMe();
  const { push } = useRouterAdv();

  return (
    <aside className={clsx(styles.root, toggle.SideMenu && styles.open)}>
      <button
        type="button"
        className={styles.closeButton}
        onClick={() => setToggle((prev) => ({ ...prev, SideMenu: false }))}
      >
        <IoClose />
      </button>

      <menu className={styles.menu}>
        <button
          type="button"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setToggle((prev) => ({ ...prev, SideMenu: false }));
            push("/search");
          }}
        >
          리뷰 검색
        </button>

        <Guard.login>
          <button
            type="button"
            style={{ cursor: "pointer" }}
            onClick={() => setToggle((prev) => ({ ...prev, BookSearchModal: true }))}
          >
            리뷰 작성
          </button>
          <Show when={toggle.BookSearchModal}>
            <Dialog closeDialog={() => setToggle((prev) => ({ ...prev, BookSearchModal: false }))}>
              <BookSearchModal />
            </Dialog>
          </Show>

          <button
            type="button"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setToggle((prev) => ({ ...prev, SideMenu: false }));
              push(`/dashboard/${data?.user.nickname}`);
            }}
          >
            마이 페이지
          </button>
        </Guard.login>

        <Link href="/privacy_policy" style={{ fontWeight: "normal", fontSize: "0.8rem", marginTop: "auto" }}>
          개인정보 처리방침
        </Link>
      </menu>
    </aside>
  );
}
