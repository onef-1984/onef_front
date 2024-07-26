import { User } from "@/types/auth.types";
import Image from "next/image";
import styles from "./HeaderProfileImage.module.css";
import testImage from "@/../public/images/test.jpg";

export default function HeaderProfileImage({ profileImage }: Pick<User, "profileImage">) {
  return (
    <div className={styles.root}>
      <Image fill src={profileImage ? testImage : testImage} alt="프로필 이미지" />
    </div>
  );
}
