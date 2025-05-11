import styles from "./DashboardHeader.module.css";
import Link from "next/link";
import ProfileImage from "../Profile/ProfileImage";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useUserQuery } from "@/apis/useDomain/useUser.query";

export default function DashboardHeader({ userNickname }: { userNickname: string }) {
  const { data } = useUserQuery().GetUser(userNickname);
  const [width, setWidth] = useState(0);
  const { windowWidth } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWidth(ref.current?.clientWidth ?? 0);
  }, [windowWidth]);

  if (!data) return null;

  return (
    <div className={styles.dashboardHeaderContainer} ref={ref}>
      <div className={styles.root}>
        <Link href={`/dashboard/${userNickname}`} className={styles.profileImage}>
          <ProfileImage profileImage={data.user.profileImage} size={width >= 768 ? 150 : 100} />
        </Link>

        <div className={styles.nickBio}>
          <Link href={`/dashboard/${userNickname}`} className={styles.nickname}>
            {data.user.nickname}
          </Link>

          <br />

          <p className={styles.bio}>{data.user.bio}</p>
        </div>
      </div>
    </div>
  );
}
