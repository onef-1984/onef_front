import { SignValidate } from "@/constants/sign/signValidate";
import { CreateForm } from "sicilian";

export const { getErrors, register, handleSubmit } = new CreateForm({
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
