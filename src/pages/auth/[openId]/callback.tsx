import fetcher from "@/apis/axios";
import SocialLogin from "@/components/socialLogin/SocialLogin";
import { Response } from "@/types/util.types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Sign.module.css";
import Show from "@/components/util/Show";
import Switch from "@/components/util/Switch";
import Clickable from "@/components/clickable/Clickable";
import Link from "next/link";

const switchChildren = (errorMessage: string) => ({
  "Internal server error": (
    <>
      <span className={styles.errorTitle}>잘못된 요청입니다</span>
      <div className={styles.errorExplanation}>
        로그인/회원가입을 다시 시도해주시거나
        <br />
        wpfekdml@me.com으로 문의 주세요.
        <br />
        감사합니다.
      </div>
    </>
  ),
  [errorMessage]: <></>,
});

export default function Callback() {
  const { asPath, query, push, isReady } = useRouter();
  const { openId } = query;
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isReady) return;

    fetcher<Response>({
      url: process.env.NEXT_PUBLIC_BASE_URL + asPath,
      method: "post",
    }).then((res) => {
      if (res.message === `${openId} 로그인 성공`) return push("/");
      else if (res.message === "Internal server error") push("/");
      else setErrorMessage(res.message);
    });
  }, [asPath, openId, push, isReady]);

  return (
    <Show when={!!errorMessage}>
      {
        <div className={styles.root}>
          <span className={styles.errorTitle}>{errorMessage}</span>

          <div className={styles.errorExplanation}>
            기존 회원이 아닌 경우
            <br />
            wpfekdml@me.com으로 문의 주세요.
            <br />
            감사합니다.
            <br />
            <br />
            새로 고침하면 메인 페이지로 이동합니다.
          </div>

          <Clickable.Container>
            <Clickable Component={Link} href="/signin">
              로그인
            </Clickable>

            <Clickable Component={Link} href="/signup">
              회원가입
            </Clickable>
          </Clickable.Container>

          <SocialLogin />
        </div>
      }
    </Show>
  );
}
