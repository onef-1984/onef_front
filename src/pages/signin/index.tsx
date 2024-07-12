import Input from "@/components/forms/Input";
import InputWrapper from "@/components/forms/InputWrapper";
import { validator, ErrorState, register, handleSubmit } from "@/hooks/useSicilian/signIn";
import { useSignMutation } from "@/hooks/useMutation/useSignMutation";
import { signInArray } from "@/constants/sign/signArray";
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
        button={
          <Button disabled={isPending}>
            <Clickable>로그인</Clickable>
          </Button>
        }
        onSubmit={handleSubmit((data) => mutate(data))}
      />

      <p className={styles.notice}>
        아직 회원이 아니신가요?{" "}
        <Link href="/signup" className={styles.link}>
          회원가입 하기
        </Link>
      </p>
    </div>
  );
}
