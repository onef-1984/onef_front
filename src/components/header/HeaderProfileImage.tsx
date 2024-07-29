import { User } from "@/types/auth.types";
import Image from "next/image";
import styles from "./HeaderProfileImage.module.css";
import { BsPersonCircle } from "react-icons/bs";

export default function HeaderProfileImage({ profileImage }: Pick<User, "profileImage">) {
  return (
    <div className={styles.root}>
      {profileImage ? <Image fill src={profileImage} alt="프로필 이미지" /> : <BsPersonCircle />}
    </div>
  );
}
