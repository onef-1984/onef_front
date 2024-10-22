import { User } from "@/types/auth.types";
import Image from "next/image";
import styles from "./HeaderProfileImage.module.css";
import { BsPeopleCircle } from "@react-icons/all-files/bs/BsPeopleCircle";
import { usePopUpToggle } from "@/hooks/usePopUpToggle";
import PopUp from "../popUp/PopUp";
import HeaderPop from "../popUp/HeaderPop";
import { Show } from "../util/Show";
import ProfileImage from "../Profile/ProfileImage";

export default function HeaderProfileImage({ profileImage }: Pick<User, "profileImage">) {
  const { toggle, handleToggle } = usePopUpToggle();

  return (
    <div className={styles.root}>
      <button type="button" className={styles.button} onClick={handleToggle}>
        <ProfileImage profileImage={profileImage} size={40} />
      </button>

      <Show when={toggle}>
        <PopUp position="right">
          <HeaderPop onClick={handleToggle} />
        </PopUp>
      </Show>
    </div>
  );
}
