import { SignValidate } from "@/constants/sign/signValidate";
import { playDragon } from "sicilian";

export const { ErrorState, register, handleSubmit } = playDragon({
  initValue: {
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
  },
  validator: SignValidate(),
  validateOn: ["blur", "submit"],
  clearFormOn: ["submit", "routeChange"],
});
