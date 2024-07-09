import Input from "@/components/inputs/Input";
import InputWrapper from "@/components/inputs/InputWrapper";
import { useSignMutation } from "@/hooks/useMutation/useSignMutation";
import { playDragon } from "sicilian";

const signInFormController = playDragon({
  email: "",
  password: "",
});
const { register, handleSubmit } = signInFormController;

export default function SignIn() {
  const { mutate } = useSignMutation("/auth/signin");

  return (
    <form noValidate onSubmit={handleSubmit(async (data) => mutate(data))}>
      <InputWrapper inputName="이메일" htmlFor="email">
        {(type) => Input({ ...register("email"), type })}
      </InputWrapper>

      <InputWrapper inputName="비밀번호" htmlFor="password" type="password" typeToggler>
        {(type) => Input({ ...register("password"), type })}
      </InputWrapper>

      <button>로그인</button>
    </form>
  );
}
