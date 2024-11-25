import { handleValidate, ErrorState, register, handleSubmit } from "@/hooks/useSicilian/signUp";
import { useSignMutation } from "@/hooks/useMutation/useSignMutation";
import { signUpArray } from "@/constants/sign/signArray";
import Link from "next/link";
import Form from "@/components/forms/Form";
import styles from "@/styles/Sign.module.css";
import { SignValidate } from "@/constants/sign/signValidate";
import Logo from "@/components/logo/Logo";
import Head from "next/head";
import Map from "@/components/util/Map";
import Clickable from "@/components/clickable/Clickable";
import Show from "@/components/util/Show";
import SocialLogin from "@/components/socialLogin/SocialLogin";

export default function SignUp() {
  const { mutate, isPending } = useSignMutation("/auth/signup");
  const errorState = ErrorState();
  const validator = handleValidate(SignValidate());

  return (
    <>
      <Head>
        <title>onef - 회원가입</title>
      </Head>

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

        <Form className={styles.form} onSubmit={handleSubmit((data) => mutate(data))}>
          <Map each={signUpArray}>
            {({ inputName, htmlFor, type, placeholder }) => {
              const inputProps = {
                ...register(htmlFor, validator[htmlFor]),
                placeholder,
                type,
              };

              return (
                <Form.InputWrapper
                  inputName={inputName}
                  errorMessage={errorState[htmlFor]}
                  htmlFor={htmlFor}
                  key={htmlFor}
                >
                  <Show when={type === "password"} fallback={<Form.Input {...inputProps} />}>
                    <Form.InputTypeToggler Input={(toggleType) => <Form.Input {...inputProps} type={toggleType} />} />
                  </Show>
                </Form.InputWrapper>
              );
            }}
          </Map>
          <Clickable disabled={isPending}>회원가입</Clickable>
        </Form>

        <SocialLogin />
      </div>
    </>
  );
}
