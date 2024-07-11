import Input from "@/components/forms/Input";
import InputWrapper from "@/components/forms/InputWrapper";
import { handleSubmit, register } from "@/hooks/useSicilian/signUp";
import { useSignMutation } from "@/hooks/useMutation/useSignMutation";
import { signArray } from "@/constants/sign/signArray";
import Link from "next/link";
import Form from "@/components/forms/Form";
import omit from "@/utils/omit";
import Clickable from "@/components/clickable/Clickable";
import Button from "@/components/clickable/Button";
import styles from "@/styles/Sign.module.css";

export default function SignUp() {
  const { mutate, isPending } = useSignMutation("/auth/signup");

  return (
    <div className={styles.root}>
      <p className={styles.notice}>
        이미 회원이신가요?{" "}
        <Link href="/signin" className={styles.link}>
          로그인 하기
        </Link>
      </p>

      <Form className={styles.form} onSubmit={handleSubmit(async (data) => mutate(omit(data, ["passwordCheck"])))}>
        {signArray.map(({ inputName, htmlFor, type, placeholder }) => {
          return (
            <InputWrapper inputName={inputName} htmlFor={htmlFor} type={type} key={htmlFor}>
              {(type) => Input({ ...register(htmlFor), type, placeholder })}
            </InputWrapper>
          );
        })}
        <Button disabled={isPending}>
          <Clickable>회원가입</Clickable>
        </Button>
      </Form>
    </div>
  );
}
