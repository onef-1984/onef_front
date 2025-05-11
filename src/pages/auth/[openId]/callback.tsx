import SocialLogin from "@/components/socialLogin/SocialLogin";
import styles from "@/styles/Sign.module.css";
import { Show } from "utilinent";
import Clickable from "@/components/clickable/Clickable";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { useAuthMutation } from "@/apis/useDomain/useAuth.mutation";

export default function Callback() {
  const { asPath, isReady } = useRouterAdv();
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate: postSocialSignMutate } = useAuthMutation().PostSocialSign();

  useEffect(() => {
    if (!isReady) return;

    postSocialSignMutate({ url: process.env.NEXT_PUBLIC_BASE_URL + asPath, setErrorMessage });
  }, [asPath, postSocialSignMutate, isReady]);

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
