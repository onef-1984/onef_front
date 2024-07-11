import Input from "@/components/forms/Input";
import InputWrapper from "@/components/forms/InputWrapper";
import { handleSubmit, register, validator, ErrorState } from "@/hooks/useSicilian/signIn";
import { useSignMutation } from "@/hooks/useMutation/useSignMutation";
import { signArray } from "@/constants/sign/signArray";
import Link from "next/link";
import Form from "@/components/forms/Form";
import styles from "@/styles/Sign.module.css";
import Clickable from "@/components/clickable/Clickable";
import Button from "@/components/clickable/Button";

export default function SignIn() {
  const { mutate, isPending } = useSignMutation("/auth/signin");

  const errorState = ErrorState();

  return (
    <div className={styles.root}>
      <p className={styles.notice}>
        아직 회원이 아니신가요?{" "}
        <Link href="/signup" className={styles.link}>
          회원가입 하기
        </Link>
      </p>
      <Form className={styles.form} onSubmit={handleSubmit(async (data) => mutate(data))}>
        {signArray
          .filter((_, i) => i % 2 === 0)
          .map(({ inputName, htmlFor, type, placeholder }) => {
            return (
              <InputWrapper
                inputName={inputName}
                // @ts-ignore
                errorMessage={errorState[htmlFor]}
                htmlFor={htmlFor}
                type={type}
                key={htmlFor}
              >
                {/* @ts-ignore */}
                {(type) => Input({ ...register(htmlFor, validator[htmlFor]), type, placeholder })}
              </InputWrapper>
            );
          })}
        <Button disabled={isPending}>
          <Clickable>로그인</Clickable>
        </Button>
      </Form>
    </div>
  );
}
