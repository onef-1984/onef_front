import { useWhoAmIAdaptor } from "@/hooks/useAdaptor/user/useWhoAmIAdaptor";
import { LuMenu } from "react-icons/lu";
import { AiOutlineBell } from "@react-icons/all-files/ai/AiOutlineBell";
import { User } from "@/types/graphql.types";
import Logo from "@/components/logo/Logo";
import Popover from "@/components/popover/Popover";
import ProfileImage from "@/components/Profile/ProfileImage";
import { Show, Map } from "utilinent";
import clsx from "clsx";
import useNotification from "@/hooks/useSocket/useNotification";
import Link from "next/link";
import styles from "./Header.module.css";
import { useIsQualified } from "@/hooks/useIsQualified";
import { useBoardToggle } from "@/hooks/useCaroKann/useBoardToggle";

export default function Header() {
  const { user } = useWhoAmIAdaptor();
  const isLogin = useIsQualified("login");

  return (
    <header className={styles.root}>
      <Header.SideMenuButton />

      <h1 className={styles.logo}>
        <Logo />
      </h1>

      <div className={styles.headerRightBox}>
        <Show when={isLogin} fallback={<Header.SignLink />}>
          <Header.ProfileImagePopover {...user} />

          <Header.Notification {...user} />
        </Show>
      </div>
    </header>
  );
}

Header.SideMenuButton = function SideMenuButton() {
  const [_, setToggle] = useBoardToggle((store) => store.SideMenu);

  return (
    <button
      type="button"
      onClick={() => {
        setToggle(true);
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

      <Popover
        position="right"
        id="Notification"
        className={styles.bell}
        popover={
          <div className={styles.notificationList}>
            <Map
              each={data}
              fallback={
                <div style={{ textAlign: "center", width: "100%", height: "5rem", alignContent: "center" }}>
                  알림이 없어요!
                </div>
              }
            >
              {(item) => <Popover.Notification key={item.id} {...item} />}
            </Map>
          </div>
        }
      >
        {(id: string) => <AiOutlineBell style={{ fontSize: "2rem", fontWeight: "bolder" }} id={id} />}
      </Popover>
    </div>
  );
};

Header.ProfileImagePopover = function HeaderProfileImagePopover({ profileImage }: Pick<User, "profileImage">) {
  return (
    <Popover position="right" id="Profile" className={styles.profileImagePopover} popover={<Popover.Profile />}>
      {(id: string) => <ProfileImage id={id} profileImage={profileImage} size={40} />}
    </Popover>
  );
};
