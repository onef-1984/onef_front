import { User } from "@/types/auth.types";
import Image from "next/image";
import styles from "./HeaderProfileImage.module.css";
import { BsPersonCircle } from "react-icons/bs";
import PopUp from "../popUp/PopUp";
import HeaderPop from "../popUp/HeaderPop";
import { usePopUpToggle } from "@/hooks/usePopUpToggle";

export default function HeaderProfileImage({ profileImage }: Pick<User, "profileImage">) {
  const { toggle, handleToggle } = usePopUpToggle();

  return (
    <div className={styles.root}>
      <button type="button" className={styles.button} onClick={handleToggle}>
        {profileImage ? <Image draggable={false} fill src={profileImage} alt="프로필 이미지" /> : <BsPersonCircle />}
      </button>

      {toggle && (
        <PopUp position="right">
          <HeaderPop onClick={handleToggle} />
        </PopUp>
      )}
    </div>
  );
}
