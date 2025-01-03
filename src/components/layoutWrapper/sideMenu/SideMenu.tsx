import { useBoardToggle } from "@/hooks/useCaroKann/useBoardToggle";
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import { useWhoAmIAdaptor } from "@/hooks/useAdaptor/user/useWhoAmIAdaptor";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import styles from "./SideMenu.module.css";
import clsx from "clsx";
import Dialog from "@/components/dialog/Dialog";
import { Show } from "utilinent";
import { useIsQualified } from "@/hooks/useIsQualified";
import BookSearchModal from "@/components/dialog/BookSearch/BookSearchModal";

export default function SideMenu() {
  const [toggle, setToggle] = useBoardToggle();
  const { user } = useWhoAmIAdaptor();
  const { push } = useRouterAdv();
  const isLogin = useIsQualified("login");

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

        <Show when={isLogin}>
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
              push(`/dashboard/${user.nickname}`);
            }}
          >
            마이 페이지
          </button>
        </Show>
      </menu>
    </aside>
  );
}
