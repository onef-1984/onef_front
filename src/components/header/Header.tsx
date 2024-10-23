import { useWhoAmIAdaptor } from "@/hooks/useAdaptor/user/useWhoAmIAdaptor";
import Logo from "../logo/Logo";
import Link from "next/link";
import styles from "./Header.module.css";
import { LuMenu } from "react-icons/lu";
import { useSideMenuToggle } from "@/hooks/useCaroKann/useSideMenuToggle";
import { useIsLogin } from "@/hooks/useIsLogin";
import Show from "../util/Show";
import { User } from "@/types/auth.types";
import PopUp from "../popUp/PopUp";
import ProfileImage from "../Profile/ProfileImage";

export default function Header() {
  const { user } = useWhoAmIAdaptor();
  const isLogin = useIsLogin();

  return (
    <header className={styles.root}>
      <Header.SideMenuButton />

      <h1 className={styles.logo}>
        <Logo />
      </h1>

      <div className={styles.headerRightBox}>
        <Show when={!isLogin} fallback={<Header.ProfileImagePopUp {...user} />}>
          <Header.SignLink />
        </Show>
      </div>
    </header>
  );
}

Header.SideMenuButton = function SideMenuButton() {
  const [_, setToggle] = useSideMenuToggle();

  return (
    <button
      type="button"
      onClick={() => {
        setToggle((prev) => !prev);
      }}
      className={styles.hamburger}
    >
      <LuMenu />
    </button>
  );
};

Header.SignLink = () => {
  return (
    <div className={styles.signLink}>
      <Link href="/signin">로그인</Link>
      <Link href="/signup">회원가입</Link>
    </div>
  );
};

Header.ProfileImagePopUp = ({ profileImage }: Pick<User, "profileImage">) => {
  return (
    <PopUp position="right" id="Profile" className={styles.profileImagePopUp} popUp={<PopUp.Profile />}>
      {(id: string) => <ProfileImage id={id} profileImage={profileImage} size={40} />}
    </PopUp>
  );
};
