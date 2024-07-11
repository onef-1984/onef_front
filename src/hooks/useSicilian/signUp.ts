import { SignValidate } from "@/constants/sign/signValidate";
import { playDragon } from "sicilian";

const { handleValidate, ErrorState, FormState, register, handleSubmit } = playDragon({
  email: "",
  password: "",
  passwordCheck: "",
  nickname: "",
});

const validator = handleValidate({
  ...SignValidate(),
});

export { validator, ErrorState, FormState, register, handleSubmit };
