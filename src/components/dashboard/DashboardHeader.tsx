import styles from "./DashboardHeader.module.css";
import { useUserAdaptor } from "@/hooks/useAdaptor/user/useUserAdaptor";
import Image from "next/image";
import Link from "next/link";
import { Show } from "../util/Show";
import ProfileImage from "../Profile/ProfileImage";

export default function DashboardHeader({ userNickname }: { userNickname: string }) {
  const { user } = useUserAdaptor(userNickname);

  return (
    <div className={styles.dashboardHeaderContainer}>
      <div className={styles.root}>
        <Link href={`/dashboard/${userNickname}`} className={styles.profileImage}>
          <ProfileImage profileImage={user.profileImage} size={150} />
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
