import { useSideMenuToggle } from "@/hooks/useCaroKann/useSideMenuToggle";
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import styles from "./SideMenu.module.css";
import clsx from "clsx";
import { useWhoAmIAdaptor } from "@/hooks/useAdaptor/user/useWhoAmIAdaptor";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { useIsLogin } from "@/hooks/useIsLogin";
import Show from "../util/Show";
import Dialog from "../dialog/Dialog";
import BookSearchModal from "../BookSearchModal/BookSearchModal";
import { useBookSearchModalToggle } from "@/hooks/useCaroKann/useBookSearchModalToggle";

export default function SideMenu() {
  const [bookSearchModalState, setBookSearchModalState] = useBookSearchModalToggle();
  const [toggle, setToggle] = useSideMenuToggle();
  const { user } = useWhoAmIAdaptor();
  const { push } = useRouterAdv();
  const isLogin = useIsLogin();

  return (
    <aside className={clsx(styles.root, toggle && styles.open)}>
      <button type="button" className={styles.closeButton} onClick={() => setToggle((prev) => !prev)}>
        <IoClose />
      </button>

      <menu className={styles.menu}>
        <button
          type="button"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setToggle(false);
            push("/search");
          }}
        >
          리뷰 검색
        </button>

        <Show when={isLogin}>
          <button type="button" style={{ cursor: "pointer" }} onClick={() => setBookSearchModalState(true)}>
            리뷰 작성
          </button>
          <Show when={bookSearchModalState}>
            <Dialog closeDialog={() => setBookSearchModalState(false)}>
              <BookSearchModal />
            </Dialog>
          </Show>

          <button
            type="button"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setToggle(false);
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
