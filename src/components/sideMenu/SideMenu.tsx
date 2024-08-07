import { useSideMenuToggle } from "@/hooks/useCaroKann/useSideMenuToggle";
import { useBookSearchModalToggle } from "@/hooks/useCaroKann/useBookSearchModalToggle";
import { IoClose } from "react-icons/io5";
import styles from "./SideMenu.module.css";
import clsx from "clsx";
import Link from "next/link";
import { useWhoAmIAdaptor } from "@/hooks/useAdaptor/useWhoAmIAdaptor";

export default function SideMenu() {
  const [toggle, setToggle] = useSideMenuToggle();
  const [_, setBookSearchModalState] = useBookSearchModalToggle();
  const { isError, user } = useWhoAmIAdaptor();

  return (
    <>
      <aside className={clsx(styles.root, toggle && styles.open)}>
        <button type="button" className={styles.closeButton} onClick={() => setToggle((prev) => !prev)}>
          <IoClose />
        </button>

        <menu className={styles.menu}>
          <Link href="/search">리뷰 검색</Link>
          {!isError && (
            <>
              <button
                type="button"
                style={{ cursor: "pointer" }}
                onClick={() => setBookSearchModalState((prev) => !prev)}
              >
                리뷰 작성
              </button>

              <Link href={`/dashboard/${user.nickname}`}>마이 페이지</Link>
            </>
          )}
        </menu>
      </aside>
    </>
  );
}
