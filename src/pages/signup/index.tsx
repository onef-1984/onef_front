import Clickable from "@/components/clickable/Clickable";
import Form from "@/components/forms/Form";
import HeadMetaTag from "@/components/HeadMetaTag/HeadMetaTag";
import Logo from "@/components/logo/Logo";
import SocialLogin from "@/components/socialLogin/SocialLogin";
import { Show, Map } from "utilinent";
import { signUpArray } from "@/constants/sign/signArray";
import { getErrors, handleSubmit, register } from "@/hooks/useSicilian/signUp";
import styles from "@/styles/Sign.module.css";
import Link from "next/link";
import { SicilianProvider } from "sicilian/provider";
import { useAuthMutator } from "@/hooks/useMutator/useAuthMutator";

export default function SignUp() {
  const { postSignMutate, postSignIsPending } = useAuthMutator("/auth/signup");

  return (
    <>
      <HeadMetaTag title="회원가입" />

      <div className={styles.root}>
        <section className={styles.logoLink}>
          <h1 className={styles.logo}>
            <Logo />
          </h1>

          <p className={styles.notice}>
            이미 회원이신가요?{" "}
            <Link href="/signin" className={styles.link}>
              로그인하기
            </Link>
          </p>
        </section>

        <Form className={styles.form} onSubmit={handleSubmit((data) => postSignMutate(data))}>
          <Map each={signUpArray}>
            {({ inputName, htmlFor, type, placeholder }) => {
              const inputProps = {
                placeholder,
                type,
              };

              return (
                <SicilianProvider value={{ register, name: htmlFor, getErrors }}>
                  <Form.InputWrapper inputName={inputName} key={htmlFor}>
                    <Show when={type === "password"} fallback={<Form.Input {...inputProps} />}>
                      <Form.InputTypeToggler Input={(toggleType) => <Form.Input {...inputProps} type={toggleType} />} />
                    </Show>
                  </Form.InputWrapper>
                </SicilianProvider>
              );
            }}
          </Map>
          <Clickable disabled={postSignIsPending}>회원가입</Clickable>
        </Form>

        <SocialLogin />
      </div>
    </>
  );
}

SignUp.useDefaultLayout = false;
