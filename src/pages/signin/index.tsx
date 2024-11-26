import { ErrorState, register, handleSubmit } from "@/hooks/useSicilian/signIn";
import { useSignMutation } from "@/hooks/useMutation/useSignMutation";
import { signInArray } from "@/constants/sign/signArray";
import Link from "next/link";
import Form from "@/components/forms/Form";
import styles from "@/styles/Sign.module.css";
import Logo from "@/components/logo/Logo";
import Head from "next/head";
import Map from "@/components/util/Map";
import Show from "@/components/util/Show";
import Clickable from "@/components/clickable/Clickable";
import SocialLogin from "@/components/socialLogin/SocialLogin";

export default function SignIn() {
  const { mutate, isPending } = useSignMutation("/auth/signin");
  const errorState = ErrorState();

  return (
    <>
      <Head>
        <title>onef - 로그인</title>
      </Head>

      <div className={styles.root}>
        <section className={styles.logoLink}>
          <h1 className={styles.logo}>
            <Logo />
          </h1>

          <p className={styles.notice}>
            아직 회원이 아니신가요?{" "}
            <Link href="/signup" className={styles.link}>
              회원가입하기
            </Link>
          </p>
        </section>

        <Form className={styles.form} onSubmit={handleSubmit((data) => mutate(data))}>
          <Map each={signInArray}>
            {({ inputName, htmlFor, type, placeholder }) => {
              const inputProps = { ...register(htmlFor), placeholder, type };

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
          <Clickable disabled={isPending}>로그인</Clickable>
        </Form>

        <SocialLogin />
      </div>
    </>
  );
}

SignIn.useDefaultLayout = false;
