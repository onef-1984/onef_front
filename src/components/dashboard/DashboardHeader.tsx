import styles from "./DashboardHeader.module.css";
import { useUserAdaptor } from "@/hooks/useAdaptor/useUserAdaptor";
import Image from "next/image";

export default function DashboardHeader({ userNickname }: { userNickname: string }) {
  const { user } = useUserAdaptor(userNickname);

  return (
    <div className={styles.dashboardHeaderContainer}>
      <div className={styles.root}>
        <div className={styles.profileImage}>
          <Image src={user.profileImage} alt={`${user.nickname}의 프로필 사진`} sizes="150" fill draggable="false" />
        </div>

        <div className={styles.nickBio}>
          <p className={styles.nickname}>{user.nickname}</p>
          <br />
          <p className={styles.bio}>{user.bio}</p>
        </div>
      </div>
    </div>
  );
}
