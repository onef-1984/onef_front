import fetcher from "@/apis/axios";
import Input from "@/components/inputs/Input";
import InputWrapper from "@/components/inputs/InputWrapper";
import { playDragon } from "sicilian";

const { register, handleSubmit } = playDragon({
  email: "",
  password: "",
  nickname: "",
});

export default function SignIn() {
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const res = await fetcher({
          url: "http://localhost:3000/api/auth/signin",
          method: "POST",
          data,
        });

        console.log(res);
      })}
    >
      <InputWrapper inputName="Email" htmlFor="email">
        <Input {...register("email")} />
      </InputWrapper>

      <InputWrapper inputName="Password" htmlFor="password">
        <Input {...register("password")} type="password" />
      </InputWrapper>

      <InputWrapper inputName="Nickname" htmlFor="password">
        <Input {...register("password")} type="password" />
      </InputWrapper>

      <button>로그인</button>
    </form>
  );
}
