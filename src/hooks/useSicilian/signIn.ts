import { SignValidate } from "@/constants/sign/signValidate";
import { playDragon } from "sicilian";
import pick from "@/utils/pick";

const { handleValidate, ErrorState, FormState, register, handleSubmit } = playDragon({
  email: "",
  password: "",
  passwordCheck: "",
  nickname: "",
});

const validator = handleValidate({
  ...pick(SignValidate(), ["email", "password"]),
});

export { validator, ErrorState, FormState, register, handleSubmit };
