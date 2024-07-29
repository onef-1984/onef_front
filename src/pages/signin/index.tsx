import Input from "@/components/forms/Input";
import InputWrapper from "@/components/forms/InputWrapper";
import { ErrorState, handleValidate, register, handleSubmit } from "@/hooks/useSicilian/signIn";
import { useSignMutation } from "@/hooks/useMutation/useSignMutation";
import { signInArray } from "@/constants/sign/signArray";
import Link from "next/link";
import Form from "@/components/forms/Form";
import styles from "@/styles/Sign.module.css";
import Clickable from "@/components/clickable/Clickable";
import Button from "@/components/clickable/Button";
import { SignValidate } from "@/constants/sign/signValidate";
import pick from "@/utils/pick";
import Logo from "@/components/logo/Logo";

export default function SignIn() {
  const { mutate, isPending } = useSignMutation("/auth/signin");
  const errorState = ErrorState();

  const validator = handleValidate(pick(SignValidate(), ["email", "password"]));

  return (
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
        inputWrapper={signInArray.map(({ inputName, htmlFor, type, placeholder }) => {
          return (
            <InputWrapper
              inputName={inputName}
              errorMessage={errorState[htmlFor]}
              htmlFor={htmlFor}
              type={type}
              key={htmlFor}
              input={(type) => Input({ ...register(htmlFor, validator[htmlFor]), type, placeholder })}
            />
          );
        })}
        button={<Button disabled={isPending}>로그인</Button>}
        onSubmit={handleSubmit((data) => mutate(data))}
      />
    </div>
  );
}
