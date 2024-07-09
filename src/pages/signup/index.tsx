import Input from "@/components/inputs/Input";
import InputWrapper from "@/components/inputs/InputWrapper";
import { useSignMutation } from "@/hooks/useMutation/useSignMutation";
import { playDragon } from "sicilian";

const signInFormController = playDragon({
  email: "",
  password: "",
  passwordCheck: "",
  nickname: "",
});
const { register, handleSubmit } = signInFormController;

export default function SignUp() {
  const { mutate } = useSignMutation("/auth/signup");

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (data) =>
        mutate({ email: data.email, password: data.password, nickname: data.nickname })
      )}
    >
      <InputWrapper inputName="이메일" htmlFor="email">
        {(type) => Input({ ...register("email"), type })}
      </InputWrapper>

      <InputWrapper inputName="닉네임" htmlFor="nickname">
        {(type) => Input({ ...register("nickname"), type })}
      </InputWrapper>

      <InputWrapper inputName="비밀번호" htmlFor="password" type="password" typeToggler>
        {(type) => Input({ ...register("password"), type })}
      </InputWrapper>

      <InputWrapper inputName="비밀번호 확인" htmlFor="passwordCheck" type="password" typeToggler>
        {(type) => Input({ ...register("passwordCheck"), type })}
      </InputWrapper>

      <button>로그인</button>
    </form>
  );
}
