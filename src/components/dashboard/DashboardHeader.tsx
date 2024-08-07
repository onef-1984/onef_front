import styles from "./DashboardHeader.module.css";
import { useUserAdaptor } from "@/hooks/useAdaptor/useUserAdaptor";
import Image from "next/image";
import Link from "next/link";

export default function DashboardHeader({ userNickname }: { userNickname: string }) {
  const { user } = useUserAdaptor(userNickname);

  return (
    <div className={styles.dashboardHeaderContainer}>
      <div className={styles.root}>
        <Link href={`/dashboard/${userNickname}`} className={styles.profileImage}>
          {user.profileImage ? (
            <Image src={user.profileImage} alt={`${user.nickname}의 프로필 사진`} sizes="150" fill draggable="false" />
          ) : (
            <div style={{ background: "var(--gray-30)" }} />
          )}
        </Link>

        <div className={styles.nickBio}>
          <Link href={`/dashboard/${userNickname}`} className={styles.nickname}>
            {user.nickname}
          </Link>
          <br />
          <p className={styles.bio}>{user.bio}</p>
        </div>
      </div>
    </div>
  );
}
