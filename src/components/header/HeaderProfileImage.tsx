import { User } from "@/types/auth.types";
import Image from "next/image";
import styles from "./HeaderProfileImage.module.css";
import { BsPeopleCircle } from "@react-icons/all-files/bs/BsPeopleCircle";
import { usePopUpToggle } from "@/hooks/usePopUpToggle";
import PopUp from "../popUp/PopUp";
import HeaderPop from "../popUp/HeaderPop";
import { Show } from "../util/Show";

export default function HeaderProfileImage({ profileImage }: Pick<User, "profileImage">) {
  const { toggle, handleToggle } = usePopUpToggle();

  return (
    <div className={styles.root}>
      <button type="button" className={styles.button} onClick={handleToggle}>
        <Show when={!!profileImage} fallback={<BsPeopleCircle />}>
          <Image draggable={false} fill src={profileImage!} sizes="40" alt="프로필 이미지" />
        </Show>
      </button>

      <Show when={toggle}>
        <PopUp position="right">
          <HeaderPop onClick={handleToggle} />
        </PopUp>
      </Show>
    </div>
  );
}
