import { useWhoAmIAdaptor } from "@/hooks/useAdaptor/user/useWhoAmIAdaptor";
import Logo from "../logo/Logo";
import Link from "next/link";
import styles from "./Header.module.css";
import { LuMenu } from "react-icons/lu";
import { useSideMenuToggle } from "@/hooks/useCaroKann/useSideMenuToggle";
import HeaderProfileImage from "./HeaderProfileImage";
import { useIsLogin } from "@/hooks/useIsLogin";
import { Show } from "../util/Show";

export default function Header() {
  const { user } = useWhoAmIAdaptor();
  const isLogin = useIsLogin();
  const [_, setToggle] = useSideMenuToggle();

  return (
    <header className={styles.root}>
      <button
        type="button"
        onClick={() => {
          setToggle((prev) => !prev);
        }}
        className={styles.hamburger}
      >
        <LuMenu />
      </button>

      <h1 className={styles.logo}>
        <Logo />
      </h1>

      <div className={styles.headerRightBox}>
        <Show when={!isLogin} fallback={<HeaderProfileImage {...user} />}>
          <div className={styles.signLink}>
            <Link href="/signin">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </div>
        </Show>
      </div>
    </header>
  );
}
