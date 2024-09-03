import Input from "@/components/forms/Input";
import InputWrapper from "@/components/forms/InputWrapper";
import { handleValidate, ErrorState, register, handleSubmit } from "@/hooks/useSicilian/signUp";
import { useSignMutation } from "@/hooks/useMutation/useSignMutation";
import { signUpArray } from "@/constants/sign/signArray";
import Link from "next/link";
import Form from "@/components/forms/Form";
import omit from "@/utils/omit";
import Button from "@/components/clickable/Button";
import styles from "@/styles/Sign.module.css";
import { SignValidate } from "@/constants/sign/signValidate";
import Logo from "@/components/logo/Logo";
import Head from "next/head";
import { Map } from "@/components/util/Map";
import TypeToggle from "@/components/forms/TypeToggle";

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

        <Form
          className={styles.form}
          onSubmit={handleSubmit((data) => mutate(omit(data, ["passwordCheck"])))}
          inputWrapper={
            <Map each={signUpArray}>
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
          button={<Button disabled={isPending}>회원가입</Button>}
        />
      </div>
    </>
  );
}
