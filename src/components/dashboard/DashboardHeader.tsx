import styles from "./DashboardHeader.module.css";
import { useUserAdaptor } from "@/hooks/useAdaptor/user/useUserAdaptor";
import Link from "next/link";
import ProfileImage from "../Profile/ProfileImage";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function DashboardHeader({ userNickname }: { userNickname: string }) {
  const { user } = useUserAdaptor(userNickname);
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const { windowWidth } = useWindowSize();

  useEffect(() => {
    setWidth(ref.current?.clientWidth ?? 0);
  }, [windowWidth]);

  return (
    <div className={styles.dashboardHeaderContainer} ref={ref}>
      <div className={styles.root}>
        <Link href={`/dashboard/${userNickname}`} className={styles.profileImage}>
          <ProfileImage profileImage={user.profileImage} size={width >= 768 ? 150 : 100} />
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
