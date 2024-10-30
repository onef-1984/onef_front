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
import useNotification from "@/hooks/useSocket/useNotification";
import { AiOutlineBell } from "@react-icons/all-files/ai/AiOutlineBell";
import clsx from "clsx";
import Map from "../util/Map";

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
        <Show when={isLogin} fallback={<Header.SignLink />}>
          <Header.ProfileImagePopUp {...user} />

          <Header.Notification {...user} />
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

Header.Notification = function HeaderNotification({ id }: Pick<User, "id">) {
  const { data, isNew } = useNotification(id);

  return (
    <div className={styles.notificationRoot}>
      <div className={clsx(styles.redDot, isNew && styles.show)} />

      <PopUp
        position="right"
        id="Notification"
        className={styles.bell}
        popUp={
          <div className={styles.notificationList}>
            <Map
              each={data}
              fallback={
                <div style={{ textAlign: "center", width: "100%", height: "5rem", alignContent: "center" }}>
                  알림이 없어요!
                </div>
              }
            >
              {(item) => <PopUp.Notification key={item.id} {...item} />}
            </Map>
          </div>
        }
      >
        {(id: string) => <AiOutlineBell style={{ fontSize: "2rem", fontWeight: "bolder" }} id={id} />}
      </PopUp>
    </div>
  );
};

Header.ProfileImagePopUp = function HeaderProfileImagePopUp({ profileImage }: Pick<User, "profileImage">) {
  return (
    <PopUp position="right" id="Profile" className={styles.profileImagePopUp} popUp={<PopUp.Profile />}>
      {(id: string) => <ProfileImage id={id} profileImage={profileImage} size={40} />}
    </PopUp>
  );
};
