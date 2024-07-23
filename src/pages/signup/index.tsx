import Input from "@/components/forms/Input";
import InputWrapper from "@/components/forms/InputWrapper";
import { handleValidate, ErrorState, register, handleSubmit } from "@/plays/playDragon/signUp";
import { useSignMutation } from "@/hooks/useMutation/useSignMutation";
import { signUpArray } from "@/constants/sign/signArray";
import Link from "next/link";
import Form from "@/components/forms/Form";
import omit from "@/utils/omit";
import Clickable from "@/components/clickable/Clickable";
import Button from "@/components/clickable/Button";
import styles from "@/styles/Sign.module.css";
import { SignValidate } from "@/constants/sign/signValidate";

export default function SignUp() {
  const { mutate, isPending } = useSignMutation("/auth/signup");
  const errorState = ErrorState();

  const validator = handleValidate(SignValidate());

  return (
    <div className={styles.root}>
      <Form
        className={styles.form}
        onSubmit={handleSubmit((data) => mutate(omit(data, ["passwordCheck"])))}
        inputWrapper={signUpArray.map(({ inputName, htmlFor, type, placeholder }) => (
          <InputWrapper
            inputName={inputName}
            input={(type) => Input({ ...register(htmlFor, validator[htmlFor]), type, placeholder })}
            errorMessage={errorState[htmlFor]}
            htmlFor={htmlFor}
            type={type}
            key={htmlFor}
          />
        ))}
        button={
          <Button disabled={isPending}>
            <Clickable>회원가입</Clickable>
          </Button>
        }
      >
        {signUpArray.map(({ inputName, htmlFor, type, placeholder }) => (
          <InputWrapper
            inputName={inputName}
            input={(type) => Input({ ...register(htmlFor, validator[htmlFor]), type, placeholder })}
            errorMessage={errorState[htmlFor]}
            htmlFor={htmlFor}
            type={type}
            key={htmlFor}
          />
        ))}
      </Form>

      <p className={styles.notice}>
        이미 회원이신가요?{" "}
        <Link href="/signin" className={styles.link}>
          로그인 하기
        </Link>
      </p>
    </div>
  );
}
