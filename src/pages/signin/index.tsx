import { ErrorState, register, handleSubmit } from "@/hooks/useSicilian/signIn";
import { useSignMutation } from "@/hooks/useMutation/useSignMutation";
import { signInArray } from "@/constants/sign/signArray";
import Link from "next/link";
import Form from "@/components/forms/Form";
import styles from "@/styles/Sign.module.css";
import Logo from "@/components/logo/Logo";
import { Show, Map } from "utilinent";
import Clickable from "@/components/clickable/Clickable";
import SocialLogin from "@/components/socialLogin/SocialLogin";
import HeadMetaTag from "@/components/HeadMetaTag/HeadMetaTag";
import { SicilianProvider } from "sicilian";

export default function SignIn() {
  const { mutate, isPending } = useSignMutation("/auth/signin");

  return (
    <>
      <HeadMetaTag title="로그인" />

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
              const inputProps = { placeholder, type };

              return (
                <SicilianProvider value={{ register, name: htmlFor, ErrorState }}>
                  <Form.InputWrapper inputName={inputName} key={htmlFor}>
                    <Show when={type === "password"} fallback={<Form.Input {...inputProps} />}>
                      <Form.InputTypeToggler Input={(toggleType) => <Form.Input {...inputProps} type={toggleType} />} />
                    </Show>
                  </Form.InputWrapper>
                </SicilianProvider>
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
