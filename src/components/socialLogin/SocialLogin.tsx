import Clickable from "@/components/clickable/Clickable";
import Link from "next/link";
import google from "../../../public/images/google.png";
import kakao from "../../../public/images/kakao.png";
import Image from "next/image";
import Map from "../util/Map";
import styles from "./SocialLogin.module.css";

export default function SocialLogin() {
  const socialList = [
    { color: "white", href: "google", src: google } as const,
    { color: "kakao", href: "kakao", src: kakao } as const,
  ];

  return (
    <div className={styles.root}>
      <div className={styles.title}>소셜 로그인</div>

      <Clickable.Container>
        <Map each={socialList}>
          {({ color, href, src }) => (
            <Clickable
              size="small"
              Component={Link}
              color={color}
              href={process.env.NEXT_PUBLIC_BASE_URL + "/auth/" + href}
            >
              <Image src={src} alt="google 로그인" width={36} />
            </Clickable>
          )}
        </Map>
      </Clickable.Container>
    </div>
  );
}
