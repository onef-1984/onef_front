import { SignValidate } from "@/constants/sign/signValidate";
import { playDragon } from "sicilian";

const initValue = {
  email: "",
  password: "",
  passwordCheck: "",
  nickname: "",
};

const { handleValidate, ErrorState, FormState, register, handleSubmit } = playDragon(initValue);

const validator = handleValidate(SignValidate());

export { initValue, validator, ErrorState, FormState, register, handleSubmit };
