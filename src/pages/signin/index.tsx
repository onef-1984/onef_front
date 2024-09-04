import Input from "@/components/forms/Input";
import InputWrapper from "@/components/forms/InputWrapper";
import { ErrorState, handleValidate, register, handleSubmit } from "@/hooks/useSicilian/signIn";
import { useSignMutation } from "@/hooks/useMutation/useSignMutation";
import { signInArray } from "@/constants/sign/signArray";
import Link from "next/link";
import Form from "@/components/forms/Form";
import styles from "@/styles/Sign.module.css";
import { SignValidate } from "@/constants/sign/signValidate";
import pick from "@/utils/pick";
import Logo from "@/components/logo/Logo";
import Head from "next/head";
import { Map } from "@/components/util/Map";
import TypeToggle from "@/components/forms/TypeToggle";
import Clickable from "@/components/clickable/Clickable";

export default function SignIn() {
  const { mutate, isPending } = useSignMutation("/auth/signin");
  const errorState = ErrorState();

  const validator = handleValidate(pick(SignValidate(), ["email", "password"]));

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

        <Form
          className={styles.form}
          onSubmit={handleSubmit((data) => mutate(data))}
          inputWrapper={
            <Map each={signInArray}>
              {({ inputName, htmlFor, type, placeholder }) => (
                <InputWrapper inputName={inputName} errorMessage={errorState[htmlFor]} htmlFor={htmlFor} key={htmlFor}>
                  <TypeToggle
                    type={type}
                    Input={(toggleType) => (
                      <Input {...register(htmlFor, validator[htmlFor])} type={toggleType} placeholder={placeholder} />
                    )}
                  />
                </InputWrapper>
              )}
            </Map>
          }
          button={<Clickable disabled={isPending}>로그인</Clickable>}
        />
      </div>
    </>
  );
}
